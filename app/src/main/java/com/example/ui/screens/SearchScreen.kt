package com.example.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.filled.Clear
import androidx.compose.material.icons.filled.Search
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
import com.example.ui.components.FooterView
import com.example.ui.theme.PrimaryBlue

@Composable
fun SearchScreen(
    searchQuery: String,
    articles: List<Article>,
    onQueryChange: (String) -> Unit,
    onBack: () -> Unit,
    onOpenArticle: (Article) -> Unit,
    onToggleBookmark: (Article) -> Unit,
    onNavigateLegal: (String) -> Unit,
    onSubscribeNewsletter: (String) -> Unit
) {
    val popularSearches = listOf("Next.js", "Gemini", "Ethical Hacking", "Figma", "Burp Suite", "Docker", "Nmap")

    val searchResults = if (searchQuery.isBlank()) {
        emptyList()
    } else {
        articles.filter { article ->
            article.title.contains(searchQuery, ignoreCase = true) ||
            article.description.contains(searchQuery, ignoreCase = true) ||
            article.category.contains(searchQuery, ignoreCase = true) ||
            article.tags.contains(searchQuery, ignoreCase = true)
        }
    }

    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .background(MaterialTheme.colorScheme.background)
            .testTag("search_screen_column"),
        contentPadding = PaddingValues(bottom = 32.dp)
    ) {
        // Search Header
        item {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .background(MaterialTheme.colorScheme.surface)
                    .padding(16.dp)
            ) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    IconButton(onClick = onBack, modifier = Modifier.testTag("back_from_search_btn")) {
                        Icon(Icons.Default.ArrowBack, contentDescription = "Back")
                    }
                    Text(
                        text = "Global Search",
                        fontWeight = FontWeight.Bold,
                        fontSize = 18.sp,
                        color = MaterialTheme.colorScheme.onSurface
                    )
                }

                Spacer(modifier = Modifier.height(12.dp))

                OutlinedTextField(
                    value = searchQuery,
                    onValueChange = onQueryChange,
                    placeholder = { Text("Search articles, tools, tutorials...", fontSize = 13.sp) },
                    singleLine = true,
                    leadingIcon = { Icon(Icons.Default.Search, contentDescription = null) },
                    trailingIcon = {
                        if (searchQuery.isNotBlank()) {
                            IconButton(onClick = { onQueryChange("") }) {
                                Icon(Icons.Default.Clear, contentDescription = "Clear")
                            }
                        }
                    },
                    modifier = Modifier.fillMaxWidth().testTag("main_search_input")
                )

                Spacer(modifier = Modifier.height(12.dp))

                Text("Popular Searches:", fontSize = 12.sp, fontWeight = FontWeight.Bold, color = MaterialTheme.colorScheme.onSurfaceVariant)

                Spacer(modifier = Modifier.height(6.dp))

                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .horizontalScroll(rememberScrollState()),
                    horizontalArrangement = Arrangement.spacedBy(6.dp)
                ) {
                    popularSearches.forEach { tag ->
                        FilterChip(
                            selected = searchQuery == tag,
                            onClick = { onQueryChange(tag) },
                            label = { Text(tag, fontSize = 11.sp) },
                            colors = FilterChipDefaults.filterChipColors(
                                selectedContainerColor = PrimaryBlue,
                                selectedLabelColor = Color.White
                            )
                        )
                    }
                }
            }
        }

        if (searchQuery.isNotBlank()) {
            item {
                Text(
                    text = "Search Results (${searchResults.size})",
                    fontWeight = FontWeight.Bold,
                    fontSize = 16.sp,
                    modifier = Modifier.padding(16.dp)
                )
            }

            if (searchResults.isEmpty()) {
                item {
                    Box(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(32.dp),
                        contentAlignment = Alignment.Center
                    ) {
                        Text("No matching content found for '$searchQuery'. Try another term!", color = MaterialTheme.colorScheme.onSurfaceVariant)
                    }
                }
            } else {
                items(searchResults) { article ->
                    Box(modifier = Modifier.padding(horizontal = 16.dp, vertical = 6.dp)) {
                        ArticleCard(
                            article = article,
                            onClick = { onOpenArticle(article) },
                            onToggleBookmark = { onToggleBookmark(article) }
                        )
                    }
                }
            }
        } else {
            item {
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(32.dp),
                    contentAlignment = Alignment.Center
                ) {
                    Text("Type a keyword above or select a popular tag to search.", color = MaterialTheme.colorScheme.onSurfaceVariant)
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
