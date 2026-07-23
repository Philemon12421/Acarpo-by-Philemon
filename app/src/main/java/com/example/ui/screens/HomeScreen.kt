package com.example.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.data.model.Article
import com.example.data.model.ToolItem
import com.example.ui.components.ArticleCard
import com.example.ui.components.BannerAdPlaceholder
import com.example.ui.components.FooterView
import com.example.ui.components.ToolCard
import com.example.ui.theme.AccentCyan
import com.example.ui.theme.PrimaryBlue
import com.example.ui.viewmodel.NavigationScreen

@Composable
fun HomeScreen(
    featuredArticles: List<Article>,
    latestArticles: List<Article>,
    trendingArticles: List<Article>,
    tools: List<ToolItem>,
    selectedCategory: String,
    onNavigate: (NavigationScreen) -> Unit,
    onOpenArticle: (Article) -> Unit,
    onToggleBookmark: (Article) -> Unit,
    onNavigateLegal: (String) -> Unit,
    onSubscribeNewsletter: (String) -> Unit
) {
    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .background(MaterialTheme.colorScheme.background)
            .testTag("home_screen_column"),
        contentPadding = PaddingValues(bottom = 32.dp)
    ) {
        // Hero Section
        item {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .background(MaterialTheme.colorScheme.surface)
                    .padding(24.dp),
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                Box(
                    modifier = Modifier
                        .clip(RoundedCornerShape(20.dp))
                        .background(PrimaryBlue.copy(alpha = 0.1f))
                        .padding(horizontal = 12.dp, vertical = 6.dp)
                ) {
                    Text(
                        text = "🚀 ACARPO WEB APP BY PHILEMON",
                        fontSize = 11.sp,
                        fontWeight = FontWeight.Bold,
                        color = PrimaryBlue
                    )
                }

                Spacer(modifier = Modifier.height(16.dp))

                Text(
                    text = "Acarpo Engineering & Web App Hub",
                    fontWeight = FontWeight.ExtraBold,
                    fontSize = 26.sp,
                    color = MaterialTheme.colorScheme.onSurface,
                    lineHeight = 32.sp
                )

                Spacer(modifier = Modifier.height(8.dp))

                Text(
                    text = "Created by Philemon • Interactive Web App, AI Tools, Cybersecurity Labs, Software Architecture & Redirects",
                    fontSize = 13.sp,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                    lineHeight = 18.sp,
                    modifier = Modifier.padding(horizontal = 8.dp)
                )

                Spacer(modifier = Modifier.height(20.dp))

                // Hero CTA Buttons
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    Button(
                        onClick = { onNavigate(NavigationScreen.ARTICLES) },
                        colors = ButtonDefaults.buttonColors(containerColor = PrimaryBlue),
                        modifier = Modifier.weight(1f).testTag("explore_articles_hero_btn")
                    ) {
                        Icon(Icons.Default.Explore, contentDescription = null, modifier = Modifier.size(16.dp))
                        Spacer(modifier = Modifier.width(6.dp))
                        Text("Explore Articles", fontSize = 12.sp, fontWeight = FontWeight.Bold)
                    }

                    OutlinedButton(
                        onClick = { onNavigate(NavigationScreen.TOOLS_DIRECTORY) },
                        modifier = Modifier.weight(1f).testTag("browse_tools_hero_btn")
                    ) {
                        Icon(Icons.Default.Build, contentDescription = null, modifier = Modifier.size(16.dp))
                        Spacer(modifier = Modifier.width(6.dp))
                        Text("Browse Tools", fontSize = 12.sp, fontWeight = FontWeight.Bold)
                    }
                }
            }
        }

        // Header Ad Slot
        item {
            Box(modifier = Modifier.padding(16.dp)) {
                BannerAdPlaceholder(label = "Top Header Banner Ad (AdSense Responsive)")
            }
        }

        // Quick Hub Categories Grid
        item {
            Column(modifier = Modifier.padding(horizontal = 16.dp, vertical = 8.dp)) {
                Text(
                    text = "Featured Hubs",
                    fontWeight = FontWeight.Bold,
                    fontSize = 18.sp,
                    color = MaterialTheme.colorScheme.onSurface
                )

                Spacer(modifier = Modifier.height(12.dp))

                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    CategoryHubBox(
                        title = "Software Eng",
                        subtitle = "React, Next, Python",
                        icon = Icons.Default.Code,
                        color = PrimaryBlue,
                        onClick = { onNavigate(NavigationScreen.SOFTWARE_ENG) },
                        modifier = Modifier.weight(1f)
                    )
                    CategoryHubBox(
                        title = "Graphic Design",
                        subtitle = "Figma, Canva, Branding",
                        icon = Icons.Default.Palette,
                        color = Color(0xFFEC4899),
                        onClick = { onNavigate(NavigationScreen.GRAPHIC_DESIGN) },
                        modifier = Modifier.weight(1f)
                    )
                }

                Spacer(modifier = Modifier.height(8.dp))

                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    CategoryHubBox(
                        title = "AI Hub",
                        subtitle = "Gemini, Prompts, Agents",
                        icon = Icons.Default.Memory,
                        color = AccentCyan,
                        onClick = { onNavigate(NavigationScreen.AI_HUB) },
                        modifier = Modifier.weight(1f)
                    )
                    CategoryHubBox(
                        title = "Cybersecurity",
                        subtitle = "Ethical Hacking, OWASP",
                        icon = Icons.Default.Security,
                        color = Color(0xFFEF4444),
                        onClick = { onNavigate(NavigationScreen.CYBERSECURITY) },
                        modifier = Modifier.weight(1f)
                    )
                }
            }
        }

        // Featured Articles Header & Carousel
        item {
            Column(modifier = Modifier.padding(16.dp)) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Text(
                        text = "Featured Insights",
                        fontWeight = FontWeight.Bold,
                        fontSize = 18.sp,
                        color = MaterialTheme.colorScheme.onSurface
                    )
                    TextButton(onClick = { onNavigate(NavigationScreen.ARTICLES) }) {
                        Text("View All", fontSize = 13.sp, color = PrimaryBlue)
                    }
                }
            }
        }

        item {
            LazyRow(
                contentPadding = PaddingValues(horizontal = 16.dp),
                horizontalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                items(featuredArticles) { article ->
                    Box(modifier = Modifier.width(280.dp)) {
                        ArticleCard(
                            article = article,
                            onClick = { onOpenArticle(article) },
                            onToggleBookmark = { onToggleBookmark(article) }
                        )
                    }
                }
            }
        }

        // In-Content Ad Placeholder
        item {
            Box(modifier = Modifier.padding(16.dp)) {
                BannerAdPlaceholder(label = "In-Content Native Ad Placement (AdSense Compatible)")
            }
        }

        // Latest Articles Section
        item {
            Column(modifier = Modifier.padding(16.dp)) {
                Text(
                    text = "Latest Articles & Tutorials",
                    fontWeight = FontWeight.Bold,
                    fontSize = 18.sp,
                    color = MaterialTheme.colorScheme.onSurface
                )
            }
        }

        val filteredArticles = if (selectedCategory == "All") latestArticles else latestArticles.filter { it.category == selectedCategory }

        items(filteredArticles) { article ->
            Box(modifier = Modifier.padding(horizontal = 16.dp, vertical = 6.dp)) {
                ArticleCard(
                    article = article,
                    onClick = { onOpenArticle(article) },
                    onToggleBookmark = { onToggleBookmark(article) }
                )
            }
        }

        // Recommended Tools Carousel
        item {
            Column(modifier = Modifier.padding(16.dp)) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Text(
                        text = "Newest & Popular Tools",
                        fontWeight = FontWeight.Bold,
                        fontSize = 18.sp,
                        color = MaterialTheme.colorScheme.onSurface
                    )
                    TextButton(onClick = { onNavigate(NavigationScreen.TOOLS_DIRECTORY) }) {
                        Text("All Tools", fontSize = 13.sp, color = PrimaryBlue)
                    }
                }
            }
        }

        item {
            LazyRow(
                contentPadding = PaddingValues(horizontal = 16.dp),
                horizontalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                items(tools) { tool ->
                    Box(modifier = Modifier.width(260.dp)) {
                        ToolCard(tool = tool)
                    }
                }
            }
        }

        // Footer Section
        item {
            Spacer(modifier = Modifier.height(24.dp))
            FooterView(
                onNavigateLegal = onNavigateLegal,
                onSubscribeNewsletter = onSubscribeNewsletter
            )
        }
    }
}

@Composable
fun CategoryHubBox(
    title: String,
    subtitle: String,
    icon: androidx.compose.ui.graphics.vector.ImageVector,
    color: Color,
    onClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    Card(
        shape = RoundedCornerShape(12.dp),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant),
        modifier = modifier
            .border(width = 1.dp, color = color.copy(alpha = 0.3f), shape = RoundedCornerShape(12.dp))
            .clickable { onClick() }
            .testTag("hub_box_$title")
    ) {
        Row(
            modifier = Modifier.padding(12.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Box(
                modifier = Modifier
                    .size(36.dp)
                    .clip(CircleShape)
                    .background(color.copy(alpha = 0.15f)),
                contentAlignment = Alignment.Center
            ) {
                Icon(imageVector = icon, contentDescription = null, tint = color, modifier = Modifier.size(20.dp))
            }

            Spacer(modifier = Modifier.width(10.dp))

            Column {
                Text(text = title, fontWeight = FontWeight.Bold, fontSize = 13.sp, color = MaterialTheme.colorScheme.onSurface)
                Text(text = subtitle, fontSize = 10.sp, color = MaterialTheme.colorScheme.onSurfaceVariant)
            }
        }
    }
}
