package com.example.ui.components

import androidx.compose.animation.*
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material.icons.outlined.*
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
import com.example.ui.theme.PrimaryBlue
import com.example.ui.viewmodel.NavigationScreen

@Composable
fun TopHeaderBar(
    currentScreen: NavigationScreen,
    selectedCategory: String,
    readingProgress: Float = 0f,
    isDarkTheme: Boolean,
    onToggleDarkTheme: () -> Unit,
    onNavigate: (NavigationScreen) -> Unit,
    onCategorySelected: (String) -> Unit,
    onOpenSearch: () -> Unit
) {
    var menuExpanded by remember { mutableStateOf(false) }

    Column(
        modifier = Modifier
            .fillMaxWidth()
            .background(MaterialTheme.colorScheme.surface)
            .border(
                width = 0.5.dp,
                color = MaterialTheme.colorScheme.outline.copy(alpha = 0.3f)
            )
    ) {
        // Main Navigation Bar
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 16.dp, vertical = 12.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            // Brand Logo
            Row(
                verticalAlignment = Alignment.CenterVertically,
                modifier = Modifier
                    .clip(RoundedCornerShape(8.dp))
                    .clickable { onNavigate(NavigationScreen.HOME) }
                    .padding(vertical = 4.dp, horizontal = 6.dp)
                    .testTag("brand_logo_click")
            ) {
                Box(
                    modifier = Modifier
                        .size(32.dp)
                        .clip(CircleShape)
                        .background(PrimaryBlue),
                    contentAlignment = Alignment.Center
                ) {
                    Text(
                        text = "P",
                        color = Color.White,
                        fontWeight = FontWeight.ExtraBold,
                        fontSize = 18.sp
                    )
                }
                Spacer(modifier = Modifier.width(8.dp))
                Column {
                    Text(
                        text = "Phantox Hub",
                        fontWeight = FontWeight.Bold,
                        fontSize = 16.sp,
                        color = MaterialTheme.colorScheme.onSurface
                    )
                    Text(
                        text = "Learn. Build. Secure.",
                        fontSize = 10.sp,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }
            }

            // Right Actions: Search, Theme Toggle, Navigation Menu
            Row(
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(4.dp)
            ) {
                IconButton(
                    onClick = onOpenSearch,
                    modifier = Modifier.testTag("header_search_btn")
                ) {
                    Icon(
                        imageVector = Icons.Outlined.Search,
                        contentDescription = "Search",
                        tint = MaterialTheme.colorScheme.onSurface
                    )
                }

                IconButton(
                    onClick = onToggleDarkTheme,
                    modifier = Modifier.testTag("header_theme_toggle_btn")
                ) {
                    Icon(
                        imageVector = if (isDarkTheme) Icons.Outlined.LightMode else Icons.Outlined.DarkMode,
                        contentDescription = "Toggle Theme",
                        tint = MaterialTheme.colorScheme.onSurface
                    )
                }

                Box {
                    IconButton(
                        onClick = { menuExpanded = true },
                        modifier = Modifier.testTag("header_menu_btn")
                    ) {
                        Icon(
                            imageVector = Icons.Default.Menu,
                            contentDescription = "Menu",
                            tint = MaterialTheme.colorScheme.onSurface
                        )
                    }

                    DropdownMenu(
                        expanded = menuExpanded,
                        onDismissRequest = { menuExpanded = false },
                        modifier = Modifier.background(MaterialTheme.colorScheme.surface)
                    ) {
                        DropdownMenuItem(
                            text = { Text("Home", fontWeight = FontWeight.SemiBold) },
                            leadingIcon = { Icon(Icons.Default.Home, null) },
                            onClick = {
                                menuExpanded = false
                                onNavigate(NavigationScreen.HOME)
                            }
                        )
                        DropdownMenuItem(
                            text = { Text("Software Engineering") },
                            leadingIcon = { Icon(Icons.Default.Code, null) },
                            onClick = {
                                menuExpanded = false
                                onNavigate(NavigationScreen.SOFTWARE_ENG)
                            }
                        )
                        DropdownMenuItem(
                            text = { Text("Graphic Design") },
                            leadingIcon = { Icon(Icons.Default.Palette, null) },
                            onClick = {
                                menuExpanded = false
                                onNavigate(NavigationScreen.GRAPHIC_DESIGN)
                            }
                        )
                        DropdownMenuItem(
                            text = { Text("Artificial Intelligence") },
                            leadingIcon = { Icon(Icons.Default.AutoAwesome, null) },
                            onClick = {
                                menuExpanded = false
                                onNavigate(NavigationScreen.AI_HUB)
                            }
                        )
                        DropdownMenuItem(
                            text = { Text("Cybersecurity & Labs") },
                            leadingIcon = { Icon(Icons.Default.Security, null) },
                            onClick = {
                                menuExpanded = false
                                onNavigate(NavigationScreen.CYBERSECURITY)
                            }
                        )
                        DropdownMenuItem(
                            text = { Text("Tools Directory") },
                            leadingIcon = { Icon(Icons.Default.Build, null) },
                            onClick = {
                                menuExpanded = false
                                onNavigate(NavigationScreen.TOOLS_DIRECTORY)
                            }
                        )
                        DropdownMenuItem(
                            text = { Text("Link Hub / Redirects (/go)") },
                            leadingIcon = { Icon(Icons.Default.Link, null) },
                            onClick = {
                                menuExpanded = false
                                onNavigate(NavigationScreen.LINK_HUB)
                            }
                        )
                        DropdownMenuItem(
                            text = { Text("Admin Creator Panel") },
                            leadingIcon = { Icon(Icons.Default.AdminPanelSettings, null) },
                            onClick = {
                                menuExpanded = false
                                onNavigate(NavigationScreen.ADMIN_PANEL)
                            }
                        )
                    }
                }
            }
        }

        // Category Filter Chips Carousel
        val categoryList = listOf(
            "All",
            "Software Engineering",
            "Graphic Design",
            "Artificial Intelligence",
            "Cybersecurity",
            "Productivity",
            "Tools",
            "Free Downloads"
        )

        Row(
            modifier = Modifier
                .fillMaxWidth()
                .horizontalScroll(rememberScrollState())
                .padding(horizontal = 16.dp, vertical = 6.dp),
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            categoryList.forEach { category ->
                val isSelected = selectedCategory == category
                FilterChip(
                    selected = isSelected,
                    onClick = { onCategorySelected(category) },
                    label = { Text(category, fontSize = 12.sp) },
                    colors = FilterChipDefaults.filterChipColors(
                        selectedContainerColor = PrimaryBlue,
                        selectedLabelColor = Color.White,
                        containerColor = MaterialTheme.colorScheme.surfaceVariant,
                        labelColor = MaterialTheme.colorScheme.onSurfaceVariant
                    ),
                    modifier = Modifier.testTag("category_chip_$category")
                )
            }
        }

        // Article Reading Progress Bar (when viewing article details)
        if (currentScreen == NavigationScreen.ARTICLE_DETAIL && readingProgress > 0f) {
            LinearProgressIndicator(
                progress = { readingProgress },
                modifier = Modifier
                    .fillMaxWidth()
                    .height(3.dp),
                color = PrimaryBlue,
                trackColor = Color.Transparent
            )
        }
    }
}
