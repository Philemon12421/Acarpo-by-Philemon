package com.example.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.data.model.Article
import com.example.ui.components.ArticleCard
import com.example.ui.components.BannerAdPlaceholder
import com.example.ui.components.CodeBlockView
import com.example.ui.components.FooterView
import com.example.ui.theme.AccentCyan

@Composable
fun AiPageScreen(
    articles: List<Article>,
    onOpenArticle: (Article) -> Unit,
    onToggleBookmark: (Article) -> Unit,
    onShowToast: (String) -> Unit,
    onNavigateLegal: (String) -> Unit,
    onSubscribeNewsletter: (String) -> Unit
) {
    val aiArticles = articles.filter { it.category == "Artificial Intelligence" }

    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .background(MaterialTheme.colorScheme.background)
            .testTag("ai_screen_column"),
        contentPadding = PaddingValues(bottom = 32.dp)
    ) {
        item {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .background(MaterialTheme.colorScheme.surface)
                    .padding(20.dp)
            ) {
                Text(
                    text = "Artificial Intelligence & AI Agents",
                    fontWeight = FontWeight.ExtraBold,
                    fontSize = 26.sp,
                    color = MaterialTheme.colorScheme.onSurface
                )

                Spacer(modifier = Modifier.height(6.dp))

                Text(
                    text = "ChatGPT, Google AI Studio, Gemini 3, Claude, OpenAI, AI Coding, AI Agents, Prompt Engineering, Multimodal Workflows, and Prompt Library.",
                    fontSize = 13.sp,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                    lineHeight = 18.sp
                )
            }
        }

        item {
            Box(modifier = Modifier.padding(16.dp)) {
                BannerAdPlaceholder(label = "AI & Developer Tools Sponsor Banner")
            }
        }

        // Prompt Library Spotlight Box
        item {
            Card(
                shape = RoundedCornerShape(12.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant),
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(16.dp)
                    .border(width = 1.dp, color = AccentCyan.copy(alpha = 0.3f), shape = RoundedCornerShape(12.dp))
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Text(
                        text = "⚡ Featured AI Prompt Library Template",
                        fontWeight = FontWeight.Bold,
                        fontSize = 15.sp,
                        color = AccentCyan
                    )

                    Spacer(modifier = Modifier.height(6.dp))

                    Text(
                        text = "Use this prompt in Gemini or ChatGPT to perform a production code refactor & security review:",
                        fontSize = 12.sp,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )

                    Spacer(modifier = Modifier.height(10.dp))

                    CodeBlockView(
                        code = "You are an expert Senior Security Architect. Review the following code for OWASP vulnerabilities, memory leaks, performance bottlenecks, and refactor for production scalability:\n[Insert Code Here]",
                        language = "Prompt Template",
                        onShowToast = onShowToast
                    )
                }
            }
        }

        items(aiArticles) { article ->
            Box(modifier = Modifier.padding(horizontal = 16.dp, vertical = 6.dp)) {
                ArticleCard(
                    article = article,
                    onClick = { onOpenArticle(article) },
                    onToggleBookmark = { onToggleBookmark(article) }
                )
            }
        }

        item {
            Spacer(modifier = Modifier.height(24.dp))
            FooterView(
                onNavigateLegal = onNavigateLegal,
                onSubscribeNewsletter = onSubscribeNewsletter
            )
        }
    }
}
