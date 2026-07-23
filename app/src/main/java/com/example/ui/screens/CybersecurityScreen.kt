package com.example.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Shield
import androidx.compose.material.icons.filled.Terminal
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
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
import com.example.ui.viewmodel.NavigationScreen

@Composable
fun CybersecurityScreen(
    articles: List<Article>,
    onOpenArticle: (Article) -> Unit,
    onToggleBookmark: (Article) -> Unit,
    onNavigate: (NavigationScreen) -> Unit,
    onNavigateLegal: (String) -> Unit,
    onSubscribeNewsletter: (String) -> Unit
) {
    val cyberArticles = articles.filter { it.category == "Cybersecurity" }

    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .background(MaterialTheme.colorScheme.background)
            .testTag("cyber_screen_column"),
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
                    text = "Cybersecurity & Security Research",
                    fontWeight = FontWeight.ExtraBold,
                    fontSize = 26.sp,
                    color = MaterialTheme.colorScheme.onSurface
                )

                Spacer(modifier = Modifier.height(6.dp))

                Text(
                    text = "Ethical Hacking, OSINT, Linux, Kali Linux, Burp Suite, Nmap, Wireshark, Password Security, OWASP Top 10, Web Security & Secure Coding.",
                    fontSize = 13.sp,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                    lineHeight = 18.sp
                )

                Spacer(modifier = Modifier.height(16.dp))

                // MANDATORY Educational Purpose Disclaimer
                Card(
                    shape = RoundedCornerShape(8.dp),
                    colors = CardDefaults.cardColors(containerColor = Color(0xFFEF4444).copy(alpha = 0.1f)),
                    modifier = Modifier
                        .fillMaxWidth()
                        .border(width = 1.dp, color = Color(0xFFEF4444).copy(alpha = 0.4f), shape = RoundedCornerShape(8.dp))
                ) {
                    Row(
                        modifier = Modifier.padding(12.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Icon(
                            imageVector = Icons.Default.Shield,
                            contentDescription = null,
                            tint = Color(0xFFEF4444),
                            modifier = Modifier.size(24.dp)
                        )
                        Spacer(modifier = Modifier.width(10.dp))
                        Column {
                            Text(
                                text = "EDUCATIONAL PURPOSES ONLY",
                                fontWeight = FontWeight.Bold,
                                fontSize = 12.sp,
                                color = Color(0xFFEF4444)
                            )
                            Text(
                                text = "All technical articles and lab notes are strictly for educational research and authorized security testing on systems you own or have explicit permission to audit.",
                                fontSize = 11.sp,
                                color = MaterialTheme.colorScheme.onSurface,
                                lineHeight = 15.sp
                            )
                        }
                    }
                }

                Spacer(modifier = Modifier.height(16.dp))

                // Security Lab Shortcut Button
                Button(
                    onClick = { onNavigate(NavigationScreen.SECURITY_LAB) },
                    colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF0F172A)),
                    shape = RoundedCornerShape(8.dp),
                    modifier = Modifier.fillMaxWidth().testTag("open_security_lab_btn")
                ) {
                    Icon(Icons.Default.Terminal, contentDescription = null, tint = Color(0xFF38BDF8))
                    Spacer(modifier = Modifier.width(8.dp))
                    Text(
                        text = "Access Security Lab (CTFs & Cheatsheets)",
                        color = Color.White,
                        fontWeight = FontWeight.Bold,
                        fontSize = 13.sp
                    )
                }
            }
        }

        item {
            Box(modifier = Modifier.padding(16.dp)) {
                BannerAdPlaceholder(label = "Cybersecurity Ad Placement")
            }
        }

        items(cyberArticles) { article ->
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
