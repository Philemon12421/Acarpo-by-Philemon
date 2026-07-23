package com.example.ui.viewmodel

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import com.example.data.local.PhantoxDatabase
import com.example.data.model.*
import com.example.data.repository.PhantoxRepository
import kotlinx.coroutines.flow.*
import kotlinx.coroutines.launch

enum class NavigationScreen {
    HOME,
    ARTICLES,
    SOFTWARE_ENG,
    GRAPHIC_DESIGN,
    AI_HUB,
    CYBERSECURITY,
    SECURITY_LAB,
    TOOLS_DIRECTORY,
    LINK_HUB,
    ADMIN_PANEL,
    SEARCH,
    ARTICLE_DETAIL,
    REDIRECT_PAGE,
    LEGAL
}

class PhantoxViewModel(application: Application) : AndroidViewModel(application) {

    private val db = PhantoxDatabase.getDatabase(application)
    private val repository = PhantoxRepository(db.phantoxDao())

    // Active Screen
    private val _currentScreen = MutableStateFlow(NavigationScreen.HOME)
    val currentScreen: StateFlow<NavigationScreen> = _currentScreen.asStateFlow()

    // Search & Category Filters
    private val _searchQuery = MutableStateFlow("")
    val searchQuery: StateFlow<String> = _searchQuery.asStateFlow()

    private val _selectedCategory = MutableStateFlow("All")
    val selectedCategory: StateFlow<String> = _selectedCategory.asStateFlow()

    // Selected Details
    private val _selectedArticle = MutableStateFlow<Article?>(null)
    val selectedArticle: StateFlow<Article?> = _selectedArticle.asStateFlow()

    private val _selectedRedirect = MutableStateFlow<RedirectLink?>(null)
    val selectedRedirect: StateFlow<RedirectLink?> = _selectedRedirect.asStateFlow()

    private val _legalPageType = MutableStateFlow("Privacy Policy")
    val legalPageType: StateFlow<String> = _legalPageType.asStateFlow()

    // UI Status messages (e.g. newsletter toast / admin alert)
    private val _toastMessage = MutableStateFlow<String?>(null)
    val toastMessage: StateFlow<String?> = _toastMessage.asStateFlow()

    // Data Flows from Repository
    val articles: StateFlow<List<Article>> = repository.allArticles
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())

    val featuredArticles: StateFlow<List<Article>> = repository.featuredArticles
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())

    val trendingArticles: StateFlow<List<Article>> = repository.trendingArticles
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())

    val bookmarkedArticles: StateFlow<List<Article>> = repository.bookmarkedArticles
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())

    val tools: StateFlow<List<ToolItem>> = repository.allTools
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())

    val redirects: StateFlow<List<RedirectLink>> = repository.allRedirects
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())

    val cyberNotes: StateFlow<List<CyberNote>> = repository.allCyberNotes
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())

    val subscribers: StateFlow<List<Subscriber>> = repository.allSubscribers
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())

    init {
        viewModelScope.launch {
            repository.seedDatabaseIfNeeded()
        }
    }

    fun navigateTo(screen: NavigationScreen) {
        _currentScreen.value = screen
    }

    fun setSearchQuery(query: String) {
        _searchQuery.value = query
    }

    fun setSelectedCategory(category: String) {
        _selectedCategory.value = category
    }

    fun openArticle(article: Article) {
        _selectedArticle.value = article
        _currentScreen.value = NavigationScreen.ARTICLE_DETAIL
        viewModelScope.launch {
            repository.incrementArticleViews(article.id)
        }
    }

    fun openRedirect(redirect: RedirectLink) {
        _selectedRedirect.value = redirect
        _currentScreen.value = NavigationScreen.REDIRECT_PAGE
        viewModelScope.launch {
            repository.incrementRedirectClick(redirect.slug)
        }
    }

    fun openLegalPage(title: String) {
        _legalPageType.value = title
        _currentScreen.value = NavigationScreen.LEGAL
    }

    fun toggleBookmark(article: Article) {
        viewModelScope.launch {
            repository.toggleBookmark(article.id, article.isBookmarked)
            showToast(if (article.isBookmarked) "Removed from bookmarks" else "Saved to bookmarks")
        }
    }

    fun subscribeNewsletter(email: String) {
        viewModelScope.launch {
            val success = repository.subscribeNewsletter(email)
            if (success) {
                showToast("Welcome to Acarpo by Philemon Newsletter!")
            } else {
                showToast("Please enter a valid email address.")
            }
        }
    }

    fun addComment(articleId: String, name: String, text: String) {
        viewModelScope.launch {
            repository.addComment(articleId, name, text)
            showToast("Comment posted!")
        }
    }

    fun getCommentsForArticle(articleId: String): Flow<List<ArticleComment>> {
        return repository.getCommentsForArticle(articleId)
    }

    // Admin Actions
    fun createNewArticle(title: String, category: String, description: String, content: String, tags: String) {
        if (title.isBlank()) return
        val slug = title.lowercase().replace(" ", "-").replace(Regex("[^a-z0-9-]"), "")
        val newArt = Article(
            id = System.currentTimeMillis().toString(),
            slug = slug,
            title = title,
            description = description,
            content = content,
            category = category,
            tags = tags
        )
        viewModelScope.launch {
            repository.insertArticle(newArt)
            showToast("Published post '$title' successfully!")
        }
    }

    fun createNewRedirect(slug: String, destinationUrl: String, title: String, description: String) {
        if (slug.isBlank() || destinationUrl.isBlank()) return
        val cleanSlug = slug.lowercase().trim().replace(" ", "-")
        val link = RedirectLink(
            id = System.currentTimeMillis().toString(),
            slug = cleanSlug,
            destinationUrl = destinationUrl,
            title = title.ifBlank { "Redirect to $destinationUrl" },
            description = description
        )
        viewModelScope.launch {
            repository.insertRedirectLink(link)
            showToast("Created redirect acarpo.app/go/$cleanSlug")
        }
    }

    fun importBloggerOrJsonData(dataString: String) {
        if (dataString.isBlank()) {
            showToast("Please paste Blogger XML or JSON backup content.")
            return
        }

        viewModelScope.launch {
            var importedCount = 0
            try {
                if (dataString.contains("<entry>", ignoreCase = true) || dataString.contains("<feed", ignoreCase = true)) {
                    // Simple Blogger XML / Atom Feed Parser
                    val entryRegex = Regex("<entry[\\s\\S]*?<\\/entry>", RegexOption.IGNORE_CASE)
                    val matches = entryRegex.findAll(dataString).toList()

                    for ((idx, match) in matches.withIndex()) {
                        val entryXml = match.value

                        val title = Regex("<title[^\n>]*>([\\s\\S]*?)<\\/title>", RegexOption.IGNORE_CASE)
                            .find(entryXml)?.groupValues?.get(1)?.replace(Regex("<[^>]*>"), "")?.trim() ?: "Blogger Import ${idx + 1}"

                        val content = Regex("<content[^\n>]*>([\\s\\S]*?)<\\/content>", RegexOption.IGNORE_CASE)
                            .find(entryXml)?.groupValues?.get(1)?.replace(Regex("<!\\[CDATA\\[|\\]\\]>"), "")?.trim()
                            ?: Regex("<summary[^\n>]*>([\\s\\S]*?)<\\/summary>", RegexOption.IGNORE_CASE)
                                .find(entryXml)?.groupValues?.get(1)?.replace(Regex("<!\\[CDATA\\[|\\]\\]>"), "")?.trim()
                            ?: "Imported content from Blogger."

                        val category = Regex("<category[^\n>]*term=['\"]([^'\"]+)['\"]", RegexOption.IGNORE_CASE)
                            .find(entryXml)?.groupValues?.get(1) ?: "Blogger Imports"

                        val cleanContent = content.replace(Regex("<[^>]*>"), " ").take(1200)
                        val slug = title.lowercase().replace(" ", "-").replace(Regex("[^a-z0-9-]"), "")

                        val art = Article(
                            id = "blogger-${System.currentTimeMillis()}-$idx",
                            slug = slug.ifBlank { "blogger-$idx" },
                            title = title,
                            description = cleanContent.take(160) + "...",
                            content = cleanContent,
                            category = category,
                            tags = "Blogger, Import, CMS",
                            author = "Philemon"
                        )
                        repository.insertArticle(art)
                        importedCount++
                    }
                } else {
                    // Generic JSON / Text key-value or raw article import
                    val lines = dataString.lines().filter { it.isNotBlank() }
                    if (lines.isNotEmpty()) {
                        val title = lines.firstOrNull() ?: "Imported Article"
                        val content = lines.drop(1).joinToString("\n")
                        val art = Article(
                            id = "imp-${System.currentTimeMillis()}",
                            slug = title.lowercase().replace(" ", "-").replace(Regex("[^a-z0-9-]"), ""),
                            title = title,
                            description = content.take(150),
                            content = content.ifBlank { title },
                            category = "Blogger Imports",
                            tags = "Imported",
                            author = "Philemon"
                        )
                        repository.insertArticle(art)
                        importedCount = 1
                    }
                }

                if (importedCount > 0) {
                    showToast("Successfully imported $importedCount items into Acarpo DB!")
                } else {
                    showToast("No valid Blogger entries found in text.")
                }
            } catch (e: Exception) {
                showToast("Import error: ${e.localizedMessage}")
            }
        }
    }

    fun createNewTool(name: String, category: String, url: String, desc: String, pros: String, cons: String) {
        if (name.isBlank() || url.isBlank()) return
        val tool = ToolItem(
            id = System.currentTimeMillis().toString(),
            name = name,
            description = desc,
            websiteUrl = url,
            category = category,
            pros = pros,
            cons = cons
        )
        viewModelScope.launch {
            repository.insertTool(tool)
            showToast("Added tool '$name'")
        }
    }

    fun showToast(msg: String) {
        _toastMessage.value = msg
    }

    fun clearToast() {
        _toastMessage.value = null
    }
}
