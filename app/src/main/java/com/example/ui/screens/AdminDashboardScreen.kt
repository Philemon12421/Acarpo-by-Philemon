package com.example.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
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
import com.example.data.model.RedirectLink
import com.example.data.model.Subscriber
import com.example.ui.theme.AccentCyan
import com.example.ui.theme.PrimaryBlue

@Composable
fun AdminDashboardScreen(
    articlesCount: Int,
    redirectsCount: Int,
    subscribers: List<Subscriber>,
    onCreateArticle: (String, String, String, String, String) -> Unit,
    onCreateRedirect: (String, String, String, String) -> Unit,
    onCreateTool: (String, String, String, String, String, String) -> Unit
) {
    var selectedTab by remember { mutableIntStateOf(0) }

    // Article Form State
    var articleTitle by remember { mutableStateOf("") }
    var articleCategory by remember { mutableStateOf("Software Engineering") }
    var articleDesc by remember { mutableStateOf("") }
    var articleContent by remember { mutableStateOf("") }
    var articleTags by remember { mutableStateOf("React, Next.js") }

    // Redirect Form State
    var redirectSlug by remember { mutableStateOf("") }
    var redirectUrl by remember { mutableStateOf("https://") }
    var redirectTitle by remember { mutableStateOf("") }
    var redirectDesc by remember { mutableStateOf("") }

    // Tool Form State
    var toolName by remember { mutableStateOf("") }
    var toolCategory by remember { mutableStateOf("AI Tools") }
    var toolUrl by remember { mutableStateOf("https://") }
    var toolDesc by remember { mutableStateOf("") }
    var toolPros by remember { mutableStateOf("") }
    var toolCons by remember { mutableStateOf("") }

    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .background(MaterialTheme.colorScheme.background)
            .testTag("admin_screen_column"),
        contentPadding = PaddingValues(20.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        item {
            Column {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Icon(
                        imageVector = Icons.Default.AdminPanelSettings,
                        contentDescription = null,
                        tint = PrimaryBlue,
                        modifier = Modifier.size(28.dp)
                    )
                    Spacer(modifier = Modifier.width(8.dp))
                    Text(
                        text = "Acarpo Web App Creator Admin",
                        fontWeight = FontWeight.ExtraBold,
                        fontSize = 24.sp,
                        color = MaterialTheme.colorScheme.onSurface
                    )
                }

                Spacer(modifier = Modifier.height(6.dp))

                Text(
                    text = "Manage articles, create link hub redirects, add tools, and view newsletter subscribers.",
                    fontSize = 13.sp,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
        }

        // Metrics Grid Cards
        item {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                MetricCard(
                    title = "Published Posts",
                    value = "$articlesCount",
                    color = PrimaryBlue,
                    modifier = Modifier.weight(1f)
                )
                MetricCard(
                    title = "Redirect Links",
                    value = "$redirectsCount",
                    color = AccentCyan,
                    modifier = Modifier.weight(1f)
                )
                MetricCard(
                    title = "Subscribers",
                    value = "${subscribers.size}",
                    color = Color(0xFF10B981),
                    modifier = Modifier.weight(1f)
                )
            }
        }

        // Tabs
        item {
            TabRow(selectedTabIndex = selectedTab) {
                Tab(
                    selected = selectedTab == 0,
                    onClick = { selectedTab = 0 },
                    text = { Text("New Article", fontSize = 12.sp) }
                )
                Tab(
                    selected = selectedTab == 1,
                    onClick = { selectedTab = 1 },
                    text = { Text("New Redirect (/go)", fontSize = 12.sp) }
                )
                Tab(
                    selected = selectedTab == 2,
                    onClick = { selectedTab = 2 },
                    text = { Text("New Tool", fontSize = 12.sp) }
                )
                Tab(
                    selected = selectedTab == 3,
                    onClick = { selectedTab = 3 },
                    text = { Text("Subscribers", fontSize = 12.sp) }
                )
            }
        }

        // Tab Content
        when (selectedTab) {
            0 -> {
                item {
                    Card(
                        shape = RoundedCornerShape(12.dp),
                        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant),
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Column(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(10.dp)) {
                            Text("Create & Publish New Blog Post", fontWeight = FontWeight.Bold, fontSize = 16.sp)

                            OutlinedTextField(
                                value = articleTitle,
                                onValueChange = { articleTitle = it },
                                placeholder = { Text("Article Title") },
                                modifier = Modifier.fillMaxWidth().testTag("admin_article_title_input")
                            )

                            OutlinedTextField(
                                value = articleCategory,
                                onValueChange = { articleCategory = it },
                                placeholder = { Text("Category (e.g. Software Engineering, AI, Graphic Design)") },
                                modifier = Modifier.fillMaxWidth().testTag("admin_article_cat_input")
                            )

                            OutlinedTextField(
                                value = articleDesc,
                                onValueChange = { articleDesc = it },
                                placeholder = { Text("Meta Description / Summary") },
                                modifier = Modifier.fillMaxWidth().testTag("admin_article_desc_input")
                            )

                            OutlinedTextField(
                                value = articleContent,
                                onValueChange = { articleContent = it },
                                placeholder = { Text("Full Article Content (MDX / Rich Text)") },
                                modifier = Modifier.fillMaxWidth().height(120.dp).testTag("admin_article_content_input")
                            )

                            OutlinedTextField(
                                value = articleTags,
                                onValueChange = { articleTags = it },
                                placeholder = { Text("Tags (comma separated)") },
                                modifier = Modifier.fillMaxWidth()
                            )

                            Button(
                                onClick = {
                                    onCreateArticle(articleTitle, articleCategory, articleDesc, articleContent, articleTags)
                                    articleTitle = ""
                                    articleDesc = ""
                                    articleContent = ""
                                },
                                colors = ButtonDefaults.buttonColors(containerColor = PrimaryBlue),
                                modifier = Modifier.fillMaxWidth().testTag("admin_publish_article_btn")
                            ) {
                                Text("Publish Article Now", fontWeight = FontWeight.Bold)
                            }
                        }
                    }
                }
            }

            1 -> {
                item {
                    Card(
                        shape = RoundedCornerShape(12.dp),
                        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant),
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Column(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(10.dp)) {
                            Text("Create Redirect Link (phantoxhub.com/go/{slug})", fontWeight = FontWeight.Bold, fontSize = 16.sp)

                            OutlinedTextField(
                                value = redirectSlug,
                                onValueChange = { redirectSlug = it },
                                placeholder = { Text("Slug (e.g. chatgpt, canva, github)") },
                                modifier = Modifier.fillMaxWidth().testTag("admin_redirect_slug_input")
                            )

                            OutlinedTextField(
                                value = redirectUrl,
                                onValueChange = { redirectUrl = it },
                                placeholder = { Text("Destination URL (e.g. https://chatgpt.com)") },
                                modifier = Modifier.fillMaxWidth().testTag("admin_redirect_url_input")
                            )

                            OutlinedTextField(
                                value = redirectTitle,
                                onValueChange = { redirectTitle = it },
                                placeholder = { Text("Link Title") },
                                modifier = Modifier.fillMaxWidth()
                            )

                            OutlinedTextField(
                                value = redirectDesc,
                                onValueChange = { redirectDesc = it },
                                placeholder = { Text("Description") },
                                modifier = Modifier.fillMaxWidth()
                            )

                            Button(
                                onClick = {
                                    onCreateRedirect(redirectSlug, redirectUrl, redirectTitle, redirectDesc)
                                    redirectSlug = ""
                                    redirectUrl = "https://"
                                    redirectTitle = ""
                                    redirectDesc = ""
                                },
                                colors = ButtonDefaults.buttonColors(containerColor = PrimaryBlue),
                                modifier = Modifier.fillMaxWidth().testTag("admin_create_redirect_btn")
                            ) {
                                Text("Create Redirect Link", fontWeight = FontWeight.Bold)
                            }
                        }
                    }
                }
            }

            2 -> {
                item {
                    Card(
                        shape = RoundedCornerShape(12.dp),
                        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant),
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Column(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(10.dp)) {
                            Text("Add New Tool to Directory", fontWeight = FontWeight.Bold, fontSize = 16.sp)

                            OutlinedTextField(
                                value = toolName,
                                onValueChange = { toolName = it },
                                placeholder = { Text("Tool Name") },
                                modifier = Modifier.fillMaxWidth()
                            )

                            OutlinedTextField(
                                value = toolCategory,
                                onValueChange = { toolCategory = it },
                                placeholder = { Text("Category (e.g. AI Tools, Dev Tools, Design)") },
                                modifier = Modifier.fillMaxWidth()
                            )

                            OutlinedTextField(
                                value = toolUrl,
                                onValueChange = { toolUrl = it },
                                placeholder = { Text("Website URL") },
                                modifier = Modifier.fillMaxWidth()
                            )

                            OutlinedTextField(
                                value = toolDesc,
                                onValueChange = { toolDesc = it },
                                placeholder = { Text("Short Description") },
                                modifier = Modifier.fillMaxWidth()
                            )

                            OutlinedTextField(
                                value = toolPros,
                                onValueChange = { toolPros = it },
                                placeholder = { Text("Pros") },
                                modifier = Modifier.fillMaxWidth()
                            )

                            OutlinedTextField(
                                value = toolCons,
                                onValueChange = { toolCons = it },
                                placeholder = { Text("Cons") },
                                modifier = Modifier.fillMaxWidth()
                            )

                            Button(
                                onClick = {
                                    onCreateTool(toolName, toolCategory, toolUrl, toolDesc, toolPros, toolCons)
                                    toolName = ""
                                    toolUrl = "https://"
                                    toolDesc = ""
                                },
                                colors = ButtonDefaults.buttonColors(containerColor = PrimaryBlue),
                                modifier = Modifier.fillMaxWidth()
                            ) {
                                Text("Save Tool to Directory", fontWeight = FontWeight.Bold)
                            }
                        }
                    }
                }
            }

            3 -> {
                if (subscribers.isEmpty()) {
                    item {
                        Text("No newsletter subscribers recorded yet.", color = MaterialTheme.colorScheme.onSurfaceVariant)
                    }
                } else {
                    items(subscribers) { sub ->
                        Card(
                            shape = RoundedCornerShape(8.dp),
                            colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant),
                            modifier = Modifier.fillMaxWidth()
                        ) {
                            Row(
                                modifier = Modifier.padding(12.dp),
                                horizontalArrangement = Arrangement.SpaceBetween,
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Text(text = sub.email, fontWeight = FontWeight.Bold, fontSize = 13.sp)
                                Text(text = "Subscribed", fontSize = 10.sp, color = Color(0xFF10B981))
                            }
                        }
                    }
                }
            }
        }
    }
}

@Composable
fun MetricCard(
    title: String,
    value: String,
    color: Color,
    modifier: Modifier = Modifier
) {
    Card(
        shape = RoundedCornerShape(12.dp),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant),
        modifier = modifier.border(width = 1.dp, color = color.copy(alpha = 0.3f), shape = RoundedCornerShape(12.dp))
    ) {
        Column(
            modifier = Modifier.padding(12.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Text(text = value, fontWeight = FontWeight.ExtraBold, fontSize = 20.sp, color = color)
            Spacer(modifier = Modifier.height(2.dp))
            Text(text = title, fontSize = 10.sp, color = MaterialTheme.colorScheme.onSurfaceVariant)
        }
    }
}
