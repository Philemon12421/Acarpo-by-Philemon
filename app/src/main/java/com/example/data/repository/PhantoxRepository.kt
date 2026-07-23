package com.example.data.repository

import com.example.data.local.PhantoxDao
import com.example.data.local.PhantoxSeedData
import com.example.data.model.*
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.firstOrNull

class PhantoxRepository(private val dao: PhantoxDao) {

    val allArticles: Flow<List<Article>> = dao.getAllArticles()
    val featuredArticles: Flow<List<Article>> = dao.getFeaturedArticles()
    val trendingArticles: Flow<List<Article>> = dao.getTrendingArticles()
    val bookmarkedArticles: Flow<List<Article>> = dao.getBookmarkedArticles()

    val allTools: Flow<List<ToolItem>> = dao.getAllTools()
    val allRedirects: Flow<List<RedirectLink>> = dao.getAllRedirectLinks()
    val allCyberNotes: Flow<List<CyberNote>> = dao.getAllCyberNotes()
    val allSubscribers: Flow<List<Subscriber>> = dao.getAllSubscribers()

    suspend fun seedDatabaseIfNeeded() {
        val currentArticles = dao.getAllArticles().firstOrNull()
        if (currentArticles.isNullOrEmpty()) {
            dao.insertArticles(PhantoxSeedData.getInitialArticles())
        }

        val currentTools = dao.getAllTools().firstOrNull()
        if (currentTools.isNullOrEmpty()) {
            dao.insertTools(PhantoxSeedData.getInitialTools())
        }

        val currentRedirects = dao.getAllRedirectLinks().firstOrNull()
        if (currentRedirects.isNullOrEmpty()) {
            dao.insertRedirectLinks(PhantoxSeedData.getInitialRedirects())
        }

        val currentNotes = dao.getAllCyberNotes().firstOrNull()
        if (currentNotes.isNullOrEmpty()) {
            dao.insertCyberNotes(PhantoxSeedData.getInitialCyberNotes())
        }
    }

    fun getArticlesByCategory(category: String): Flow<List<Article>> =
        dao.getArticlesByCategory(category)

    suspend fun getArticleBySlug(slug: String): Article? =
        dao.getArticleBySlug(slug)

    suspend fun getArticleById(id: String): Article? =
        dao.getArticleById(id)

    suspend fun toggleBookmark(articleId: String, currentStatus: Boolean) {
        dao.updateBookmark(articleId, !currentStatus)
    }

    suspend fun incrementArticleViews(articleId: String) {
        dao.incrementArticleViews(articleId)
    }

    suspend fun insertArticle(article: Article) {
        dao.insertArticle(article)
    }

    suspend fun insertTool(tool: ToolItem) {
        dao.insertTool(tool)
    }

    suspend fun getRedirectBySlug(slug: String): RedirectLink? =
        dao.getRedirectBySlug(slug)

    suspend fun insertRedirectLink(link: RedirectLink) {
        dao.insertRedirectLink(link)
    }

    suspend fun incrementRedirectClick(slug: String) {
        dao.incrementRedirectClick(slug)
    }

    suspend fun insertCyberNote(note: CyberNote) {
        dao.insertCyberNote(note)
    }

    suspend fun subscribeNewsletter(email: String): Boolean {
        if (email.isBlank() || !email.contains("@")) return false
        val sub = Subscriber(id = System.currentTimeMillis().toString(), email = email)
        dao.insertSubscriber(sub)
        return true
    }

    fun getCommentsForArticle(articleId: String): Flow<List<ArticleComment>> =
        dao.getCommentsForArticle(articleId)

    suspend fun addComment(articleId: String, userName: String, content: String) {
        if (content.isBlank()) return
        val comment = ArticleComment(
            id = System.currentTimeMillis().toString(),
            articleId = articleId,
            userName = userName.ifBlank { "Anonymous Techie" },
            content = content
        )
        dao.insertComment(comment)
    }
}
