package com.example.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Search
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.data.model.ToolItem
import com.example.ui.components.BannerAdPlaceholder
import com.example.ui.components.FooterView
import com.example.ui.components.ToolCard
import com.example.ui.theme.PrimaryBlue

@Composable
fun ToolsDirectoryScreen(
    tools: List<ToolItem>,
    onNavigateLegal: (String) -> Unit,
    onSubscribeNewsletter: (String) -> Unit
) {
    var toolQuery by remember { mutableStateOf("") }
    var selectedToolCategory by remember { mutableStateOf("All") }

    val toolCategories = listOf(
        "All",
        "AI Tools",
        "Developer Tools",
        "Design Tools",
        "Cybersecurity Tools",
        "Productivity Tools",
        "SEO Tools"
    )

    val filteredTools = tools.filter { tool ->
        val matchesCategory = (selectedToolCategory == "All" || tool.category == selectedToolCategory)
        val matchesSearch = toolQuery.isBlank() || tool.name.contains(toolQuery, ignoreCase = true) || tool.description.contains(toolQuery, ignoreCase = true)
        matchesCategory && matchesSearch
    }

    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .background(MaterialTheme.colorScheme.background)
            .testTag("tools_screen_column"),
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
                    text = "Tools Directory",
                    fontWeight = FontWeight.ExtraBold,
                    fontSize = 26.sp,
                    color = MaterialTheme.colorScheme.onSurface
                )

                Spacer(modifier = Modifier.height(6.dp))

                Text(
                    text = "Searchable directory of AI Tools, Developer Tools, Design Software, Cybersecurity Utilities, and Productivity extensions.",
                    fontSize = 13.sp,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                    lineHeight = 18.sp
                )

                Spacer(modifier = Modifier.height(16.dp))

                // Search Box
                OutlinedTextField(
                    value = toolQuery,
                    onValueChange = { toolQuery = it },
                    placeholder = { Text("Search tools by name, description...", fontSize = 13.sp) },
                    singleLine = true,
                    leadingIcon = { Icon(Icons.Default.Search, contentDescription = null) },
                    modifier = Modifier.fillMaxWidth().testTag("tools_directory_search_input")
                )

                Spacer(modifier = Modifier.height(12.dp))

                // Filter Categories
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .horizontalScroll(rememberScrollState()),
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    toolCategories.forEach { cat ->
                        val isSelected = selectedToolCategory == cat
                        FilterChip(
                            selected = isSelected,
                            onClick = { selectedToolCategory = cat },
                            label = { Text(cat, fontSize = 12.sp) },
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
                BannerAdPlaceholder(label = "Tools Directory Sponsor Banner")
            }
        }

        items(filteredTools) { tool ->
            Box(modifier = Modifier.padding(horizontal = 16.dp, vertical = 6.dp)) {
                ToolCard(tool = tool)
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
