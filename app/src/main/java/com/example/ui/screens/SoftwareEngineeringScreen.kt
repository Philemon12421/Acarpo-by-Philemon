package com.example.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.data.model.Article
import com.example.ui.components.ArticleCard
import com.example.ui.components.BannerAdPlaceholder
import com.example.ui.components.FooterView
import com.example.ui.theme.PrimaryBlue

@Composable
fun SoftwareEngineeringScreen(
    articles: List<Article>,
    onOpenArticle: (Article) -> Unit,
    onToggleBookmark: (Article) -> Unit,
    onNavigateLegal: (String) -> Unit,
    onSubscribeNewsletter: (String) -> Unit
) {
    var selectedTopic by remember { mutableStateOf("All Topics") }

    val topics = listOf(
        "All Topics",
        "Web Development",
        "React & Next.js",
        "Python",
        "DevOps & Docker",
        "System Design",
        "Database & Git"
    )

    val seArticles = articles.filter { it.category == "Software Engineering" }
    val filteredList = if (selectedTopic == "All Topics") {
        seArticles
    } else {
        seArticles.filter { it.tags.contains(selectedTopic, ignoreCase = true) || it.title.contains(selectedTopic, ignoreCase = true) }
    }

    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .background(MaterialTheme.colorScheme.background)
            .testTag("se_screen_column"),
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
                    text = "Software Engineering",
                    fontWeight = FontWeight.ExtraBold,
                    fontSize = 26.sp,
                    color = MaterialTheme.colorScheme.onSurface
                )

                Spacer(modifier = Modifier.height(6.dp))

                Text(
                    text = "Web Development, React, Next.js, Node.js, Python, Java, Spring Boot, Databases, Docker, Kubernetes, System Design & Coding Challenges.",
                    fontSize = 13.sp,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                    lineHeight = 18.sp
                )

                Spacer(modifier = Modifier.height(16.dp))

                // Topic Selector Chips
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .horizontalScroll(rememberScrollState()),
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    topics.forEach { topic ->
                        val isSelected = selectedTopic == topic
                        FilterChip(
                            selected = isSelected,
                            onClick = { selectedTopic = topic },
                            label = { Text(topic, fontSize = 12.sp) },
                            colors = FilterChipDefaults.filterChipColors(
                                selectedContainerColor = PrimaryBlue,
                                selectedLabelColor = Color.White
                            )
                        )
                    }
                }
            }
        }

        item {
            Box(modifier = Modifier.padding(16.dp)) {
                BannerAdPlaceholder(label = "Software Engineering Sponsored Banner")
            }
        }

        if (filteredList.isEmpty()) {
            item {
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(32.dp),
                    contentAlignment = Alignment.Center
                ) {
                    Text("No articles found for '$selectedTopic'. Check back soon!", color = MaterialTheme.colorScheme.onSurfaceVariant)
                }
            }
        } else {
            items(filteredList) { article ->
                Box(modifier = Modifier.padding(horizontal = 16.dp, vertical = 6.dp)) {
                    ArticleCard(
                        article = article,
                        onClick = { onOpenArticle(article) },
                        onToggleBookmark = { onToggleBookmark(article) }
                    )
                }
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
