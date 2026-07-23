package com.example

import android.os.Bundle
import android.widget.Toast
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.activity.viewModels
import androidx.compose.animation.*
import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material.icons.outlined.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.unit.dp
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.example.ui.components.TopHeaderBar
import com.example.ui.screens.*
import com.example.ui.theme.PhantoxHubTheme
import com.example.ui.viewmodel.NavigationScreen
import com.example.ui.viewmodel.PhantoxViewModel

class MainActivity : ComponentActivity() {

    private val viewModel: PhantoxViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()

        setContent {
            var isDarkTheme by remember { mutableStateOf(false) }

            val currentScreen by viewModel.currentScreen.collectAsStateWithLifecycle()
            val searchQuery by viewModel.searchQuery.collectAsStateWithLifecycle()
            val selectedCategory by viewModel.selectedCategory.collectAsStateWithLifecycle()

            val articles by viewModel.articles.collectAsStateWithLifecycle()
            val featuredArticles by viewModel.featuredArticles.collectAsStateWithLifecycle()
            val trendingArticles by viewModel.trendingArticles.collectAsStateWithLifecycle()
            val selectedArticle by viewModel.selectedArticle.collectAsStateWithLifecycle()

            val tools by viewModel.tools.collectAsStateWithLifecycle()
            val redirects by viewModel.redirects.collectAsStateWithLifecycle()
            val selectedRedirect by viewModel.selectedRedirect.collectAsStateWithLifecycle()

            val cyberNotes by viewModel.cyberNotes.collectAsStateWithLifecycle()
            val subscribers by viewModel.subscribers.collectAsStateWithLifecycle()
            val legalPageTitle by viewModel.legalPageType.collectAsStateWithLifecycle()

            val toastMsg by viewModel.toastMessage.collectAsStateWithLifecycle()
            val context = LocalContext.current

            LaunchedEffect(toastMsg) {
                toastMsg?.let { msg ->
                    Toast.makeText(context, msg, Toast.LENGTH_SHORT).show()
                    viewModel.clearToast()
                }
            }

            PhantoxHubTheme(darkTheme = isDarkTheme) {
                Scaffold(
                    modifier = Modifier
                        .fillMaxSize()
                        .windowInsetsPadding(WindowInsets.safeDrawing),
                    topBar = {
                        TopHeaderBar(
                            currentScreen = currentScreen,
                            selectedCategory = selectedCategory,
                            readingProgress = if (currentScreen == NavigationScreen.ARTICLE_DETAIL) 0.65f else 0f,
                            isDarkTheme = isDarkTheme,
                            onToggleDarkTheme = { isDarkTheme = !isDarkTheme },
                            onNavigate = { viewModel.navigateTo(it) },
                            onCategorySelected = { category ->
                                viewModel.setSelectedCategory(category)
                                when (category) {
                                    "Software Engineering" -> viewModel.navigateTo(NavigationScreen.SOFTWARE_ENG)
                                    "Graphic Design" -> viewModel.navigateTo(NavigationScreen.GRAPHIC_DESIGN)
                                    "Artificial Intelligence" -> viewModel.navigateTo(NavigationScreen.AI_HUB)
                                    "Cybersecurity" -> viewModel.navigateTo(NavigationScreen.CYBERSECURITY)
                                    "Tools" -> viewModel.navigateTo(NavigationScreen.TOOLS_DIRECTORY)
                                    else -> viewModel.navigateTo(NavigationScreen.HOME)
                                }
                            },
                            onOpenSearch = { viewModel.navigateTo(NavigationScreen.SEARCH) }
                        )
                    },
                    bottomBar = {
                        NavigationBar(
                            containerColor = MaterialTheme.colorScheme.surface,
                            modifier = Modifier.testTag("bottom_navigation_bar")
                        ) {
                            NavigationBarItem(
                                selected = currentScreen == NavigationScreen.HOME,
                                onClick = { viewModel.navigateTo(NavigationScreen.HOME) },
                                icon = { Icon(if (currentScreen == NavigationScreen.HOME) Icons.Filled.Home else Icons.Outlined.Home, contentDescription = "Home") },
                                label = { Text("Home") },
                                modifier = Modifier.testTag("nav_item_home")
                            )
                            NavigationBarItem(
                                selected = currentScreen == NavigationScreen.SOFTWARE_ENG || currentScreen == NavigationScreen.ARTICLES,
                                onClick = { viewModel.navigateTo(NavigationScreen.SOFTWARE_ENG) },
                                icon = { Icon(if (currentScreen == NavigationScreen.SOFTWARE_ENG) Icons.Filled.Code else Icons.Outlined.Code, contentDescription = "Engineering") },
                                label = { Text("Engineering") },
                                modifier = Modifier.testTag("nav_item_engineering")
                            )
                            NavigationBarItem(
                                selected = currentScreen == NavigationScreen.AI_HUB,
                                onClick = { viewModel.navigateTo(NavigationScreen.AI_HUB) },
                                icon = { Icon(if (currentScreen == NavigationScreen.AI_HUB) Icons.Filled.AutoAwesome else Icons.Outlined.AutoAwesome, contentDescription = "AI") },
                                label = { Text("AI Hub") },
                                modifier = Modifier.testTag("nav_item_ai")
                            )
                            NavigationBarItem(
                                selected = currentScreen == NavigationScreen.CYBERSECURITY || currentScreen == NavigationScreen.SECURITY_LAB,
                                onClick = { viewModel.navigateTo(NavigationScreen.CYBERSECURITY) },
                                icon = { Icon(if (currentScreen == NavigationScreen.CYBERSECURITY) Icons.Filled.Security else Icons.Outlined.Security, contentDescription = "Security") },
                                label = { Text("Security") },
                                modifier = Modifier.testTag("nav_item_security")
                            )
                            NavigationBarItem(
                                selected = currentScreen == NavigationScreen.LINK_HUB || currentScreen == NavigationScreen.REDIRECT_PAGE,
                                onClick = { viewModel.navigateTo(NavigationScreen.LINK_HUB) },
                                icon = { Icon(if (currentScreen == NavigationScreen.LINK_HUB) Icons.Filled.Link else Icons.Outlined.Link, contentDescription = "Links") },
                                label = { Text("Link Hub") },
                                modifier = Modifier.testTag("nav_item_links")
                            )
                        }
                    }
                ) { innerPadding ->
                    Box(
                        modifier = Modifier
                            .fillMaxSize()
                            .padding(innerPadding)
                    ) {
                        AnimatedContent(
                            targetState = currentScreen,
                            label = "screen_transition"
                        ) { screen ->
                            when (screen) {
                                NavigationScreen.HOME -> {
                                    HomeScreen(
                                        featuredArticles = featuredArticles,
                                        latestArticles = articles,
                                        trendingArticles = trendingArticles,
                                        tools = tools,
                                        selectedCategory = selectedCategory,
                                        onNavigate = { viewModel.navigateTo(it) },
                                        onOpenArticle = { viewModel.openArticle(it) },
                                        onToggleBookmark = { viewModel.toggleBookmark(it) },
                                        onNavigateLegal = { viewModel.openLegalPage(it) },
                                        onSubscribeNewsletter = { viewModel.subscribeNewsletter(it) }
                                    )
                                }

                                NavigationScreen.SOFTWARE_ENG, NavigationScreen.ARTICLES -> {
                                    SoftwareEngineeringScreen(
                                        articles = articles,
                                        onOpenArticle = { viewModel.openArticle(it) },
                                        onToggleBookmark = { viewModel.toggleBookmark(it) },
                                        onNavigateLegal = { viewModel.openLegalPage(it) },
                                        onSubscribeNewsletter = { viewModel.subscribeNewsletter(it) }
                                    )
                                }

                                NavigationScreen.GRAPHIC_DESIGN -> {
                                    GraphicDesignScreen(
                                        articles = articles,
                                        onOpenArticle = { viewModel.openArticle(it) },
                                        onToggleBookmark = { viewModel.toggleBookmark(it) },
                                        onNavigateLegal = { viewModel.openLegalPage(it) },
                                        onSubscribeNewsletter = { viewModel.subscribeNewsletter(it) }
                                    )
                                }

                                NavigationScreen.AI_HUB -> {
                                    AiPageScreen(
                                        articles = articles,
                                        onOpenArticle = { viewModel.openArticle(it) },
                                        onToggleBookmark = { viewModel.toggleBookmark(it) },
                                        onShowToast = { viewModel.showToast(it) },
                                        onNavigateLegal = { viewModel.openLegalPage(it) },
                                        onSubscribeNewsletter = { viewModel.subscribeNewsletter(it) }
                                    )
                                }

                                NavigationScreen.CYBERSECURITY -> {
                                    CybersecurityScreen(
                                        articles = articles,
                                        onOpenArticle = { viewModel.openArticle(it) },
                                        onToggleBookmark = { viewModel.toggleBookmark(it) },
                                        onNavigate = { viewModel.navigateTo(it) },
                                        onNavigateLegal = { viewModel.openLegalPage(it) },
                                        onSubscribeNewsletter = { viewModel.subscribeNewsletter(it) }
                                    )
                                }

                                NavigationScreen.SECURITY_LAB -> {
                                    SecurityLabScreen(
                                        cyberNotes = cyberNotes,
                                        onShowToast = { viewModel.showToast(it) },
                                        onNavigateLegal = { viewModel.openLegalPage(it) },
                                        onSubscribeNewsletter = { viewModel.subscribeNewsletter(it) }
                                    )
                                }

                                NavigationScreen.TOOLS_DIRECTORY -> {
                                    ToolsDirectoryScreen(
                                        tools = tools,
                                        onNavigateLegal = { viewModel.openLegalPage(it) },
                                        onSubscribeNewsletter = { viewModel.subscribeNewsletter(it) }
                                    )
                                }

                                NavigationScreen.LINK_HUB -> {
                                    LinkHubScreen(
                                        redirects = redirects,
                                        onOpenRedirectPage = { viewModel.openRedirect(it) },
                                        onShowToast = { viewModel.showToast(it) },
                                        onNavigateLegal = { viewModel.openLegalPage(it) },
                                        onSubscribeNewsletter = { viewModel.subscribeNewsletter(it) }
                                    )
                                }

                                NavigationScreen.REDIRECT_PAGE -> {
                                    RedirectPageScreen(
                                        redirect = selectedRedirect,
                                        recommendedArticles = featuredArticles,
                                        onBack = { viewModel.navigateTo(NavigationScreen.LINK_HUB) },
                                        onOpenArticle = { viewModel.openArticle(it) },
                                        onToggleBookmark = { viewModel.toggleBookmark(it) },
                                        onNavigateLegal = { viewModel.openLegalPage(it) },
                                        onSubscribeNewsletter = { viewModel.subscribeNewsletter(it) }
                                    )
                                }

                                NavigationScreen.ADMIN_PANEL -> {
                                    AdminDashboardScreen(
                                        articlesCount = articles.size,
                                        redirectsCount = redirects.size,
                                        subscribers = subscribers,
                                        onCreateArticle = { title, cat, desc, content, tags ->
                                            viewModel.createNewArticle(title, cat, desc, content, tags)
                                        },
                                        onCreateRedirect = { slug, dest, title, desc ->
                                            viewModel.createNewRedirect(slug, dest, title, desc)
                                        },
                                        onCreateTool = { name, cat, url, desc, pros, cons ->
                                            viewModel.createNewTool(name, cat, url, desc, pros, cons)
                                        }
                                    )
                                }

                                NavigationScreen.SEARCH -> {
                                    SearchScreen(
                                        searchQuery = searchQuery,
                                        articles = articles,
                                        onQueryChange = { viewModel.setSearchQuery(it) },
                                        onBack = { viewModel.navigateTo(NavigationScreen.HOME) },
                                        onOpenArticle = { viewModel.openArticle(it) },
                                        onToggleBookmark = { viewModel.toggleBookmark(it) },
                                        onNavigateLegal = { viewModel.openLegalPage(it) },
                                        onSubscribeNewsletter = { viewModel.subscribeNewsletter(it) }
                                    )
                                }

                                NavigationScreen.ARTICLE_DETAIL -> {
                                    val currentArticleId = selectedArticle?.id ?: ""
                                    val articleComments by viewModel.getCommentsForArticle(currentArticleId)
                                        .collectAsStateWithLifecycle(initialValue = emptyList())

                                    ArticleDetailScreen(
                                        article = selectedArticle,
                                        comments = articleComments,
                                        onBack = { viewModel.navigateTo(NavigationScreen.HOME) },
                                        onToggleBookmark = { viewModel.toggleBookmark(it) },
                                        onAddComment = { artId, name, text ->
                                            viewModel.addComment(artId, name, text)
                                        },
                                        onShowToast = { viewModel.showToast(it) },
                                        onNavigateLegal = { viewModel.openLegalPage(it) },
                                        onSubscribeNewsletter = { viewModel.subscribeNewsletter(it) }
                                    )
                                }

                                NavigationScreen.LEGAL -> {
                                    LegalScreen(
                                        pageTitle = legalPageTitle,
                                        onBack = { viewModel.navigateTo(NavigationScreen.HOME) },
                                        onNavigateLegal = { viewModel.openLegalPage(it) },
                                        onSubscribeNewsletter = { viewModel.subscribeNewsletter(it) }
                                    )
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
