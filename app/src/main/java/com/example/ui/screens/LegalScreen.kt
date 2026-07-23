package com.example.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.ui.components.FooterView
import com.example.ui.theme.PrimaryBlue

@Composable
fun LegalScreen(
    pageTitle: String,
    onBack: () -> Unit,
    onNavigateLegal: (String) -> Unit,
    onSubscribeNewsletter: (String) -> Unit
) {
    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .background(MaterialTheme.colorScheme.background)
            .testTag("legal_screen_column"),
        contentPadding = PaddingValues(bottom = 32.dp)
    ) {
        item {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(16.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                IconButton(onClick = onBack, modifier = Modifier.testTag("back_from_legal_btn")) {
                    Icon(Icons.Default.ArrowBack, contentDescription = "Back")
                }
                Spacer(modifier = Modifier.width(8.dp))
                Text(
                    text = pageTitle,
                    fontWeight = FontWeight.Bold,
                    fontSize = 20.sp,
                    color = MaterialTheme.colorScheme.onSurface
                )
            }
        }

        item {
            Card(
                shape = RoundedCornerShape(12.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant),
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(16.dp)
                    .border(width = 1.dp, color = MaterialTheme.colorScheme.outline.copy(alpha = 0.2f), shape = RoundedCornerShape(12.dp))
            ) {
                Column(
                    modifier = Modifier.padding(20.dp),
                    verticalArrangement = Arrangement.spacedBy(12.dp)
                ) {
                    when (pageTitle) {
                        "About Us" -> {
                            Text("About Phantox Hub", fontWeight = FontWeight.Bold, fontSize = 18.sp, color = PrimaryBlue)
                            Text(
                                "Phantox Hub is a central digital media and engineering destination founded by Phantox. " +
                                "We publish production-ready tutorials, developer guides, cybersecurity research, and AI tool reviews. " +
                                "Instead of sending users directly to external links mentioned across YouTube, TikTok, Facebook, Instagram, " +
                                "and LinkedIn, Phantox Hub offers in-depth context, code snippets, and structured resources.",
                                fontSize = 13.sp, lineHeight = 20.sp
                            )
                        }
                        "Contact Us" -> {
                            Text("Contact & Media Inquiries", fontWeight = FontWeight.Bold, fontSize = 18.sp, color = PrimaryBlue)
                            Text("For sponsorships, technical writing, or security research inquiries, contact us at:", fontSize = 13.sp)
                            Text("Email: philemonkusi292@gmail.com", fontWeight = FontWeight.Bold, fontSize = 14.sp, color = PrimaryBlue)
                            Text("YouTube: @PhantoxHub", fontSize = 13.sp)
                            Text("GitHub: github.com/phantoxhub", fontSize = 13.sp)
                        }
                        "Privacy Policy" -> {
                            Text("Privacy Policy", fontWeight = FontWeight.Bold, fontSize = 18.sp, color = PrimaryBlue)
                            Text(
                                "Last updated: July 2026. Phantox Hub respects your privacy. " +
                                "We collect minimal anonymous usage analytics and newsletter email subscriptions. " +
                                "We do not share your personal information with third parties. Google AdSense ads may use cookies for personalized advertising in compliance with GDPR and CCPA guidelines.",
                                fontSize = 13.sp, lineHeight = 20.sp
                            )
                        }
                        "Terms of Service" -> {
                            Text("Terms of Service", fontWeight = FontWeight.Bold, fontSize = 18.sp, color = PrimaryBlue)
                            Text(
                                "By accessing Phantox Hub, you agree to comply with our terms. " +
                                "All code samples are provided as-is under open MIT licensing. " +
                                "Cybersecurity writeups and CTF notes are strictly for authorized security testing and education.",
                                fontSize = 13.sp, lineHeight = 20.sp
                            )
                        }
                        "Disclaimer" -> {
                            Text("Disclaimer & Educational Use", fontWeight = FontWeight.Bold, fontSize = 18.sp, color = PrimaryBlue)
                            Text(
                                "All content provided on Phantox Hub is for educational, informational, and research purposes only. " +
                                "The author assumes no liability for misuse of code, scripts, or penetration testing tools provided on this hub.",
                                fontSize = 13.sp, lineHeight = 20.sp
                            )
                        }
                        "Affiliate Disclosure" -> {
                            Text("Affiliate Disclosure", fontWeight = FontWeight.Bold, fontSize = 18.sp, color = PrimaryBlue)
                            Text(
                                "Some links in our Tools Directory or Link Hub may be affiliate referral links. " +
                                "If you purchase a subscription through these links, Phantox Hub may earn a small commission at no extra cost to you.",
                                fontSize = 13.sp, lineHeight = 20.sp
                            )
                        }
                        "Cookie Policy" -> {
                            Text("Cookie Policy", fontWeight = FontWeight.Bold, fontSize = 18.sp, color = PrimaryBlue)
                            Text(
                                "Phantox Hub uses essential local state storage (Room DB) to persist your bookmarks, dark mode preference, and reading history locally on your device.",
                                fontSize = 13.sp, lineHeight = 20.sp
                            )
                        }
                        else -> { // Dynamic Sitemap
                            Text("Dynamic Sitemap & RSS Feed", fontWeight = FontWeight.Bold, fontSize = 18.sp, color = PrimaryBlue)
                            Text("XML Sitemap URL: https://phantoxhub.com/sitemap.xml", fontSize = 13.sp)
                            Text("RSS Feed URL: https://phantoxhub.com/rss.xml", fontSize = 13.sp)
                            Text("Robots.txt URL: https://phantoxhub.com/robots.txt", fontSize = 13.sp)
                        }
                    }
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
