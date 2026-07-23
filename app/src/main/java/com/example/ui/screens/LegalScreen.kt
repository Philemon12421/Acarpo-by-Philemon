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
                            Text("About Acarpo by Philemon", fontWeight = FontWeight.Bold, fontSize = 18.sp, color = PrimaryBlue)
                            Text(
                                "Acarpo by Philemon is a modern web application and engineering hub founded by Philemon. " +
                                "We publish production-ready web tools, developer guides, cybersecurity research, software architecture tutorials, and AI tool reviews. " +
                                "Acarpo brings together dynamic link redirects, developer playgrounds, and curated software tools into a single progressive web application experience.",
                                fontSize = 13.sp, lineHeight = 20.sp
                            )
                        }
                        "Contact Us" -> {
                            Text("Contact & Media Inquiries", fontWeight = FontWeight.Bold, fontSize = 18.sp, color = PrimaryBlue)
                            Text("For sponsorships, technical writing, or engineering inquiries, contact Philemon at:", fontSize = 13.sp)
                            Text("Email: philemonkusi292@gmail.com", fontWeight = FontWeight.Bold, fontSize = 14.sp, color = PrimaryBlue)
                            Text("GitHub: github.com/philemon", fontSize = 13.sp)
                            Text("Web App: https://acarpo.app", fontSize = 13.sp)
                        }
                        "Privacy Policy" -> {
                            Text("Privacy Policy", fontWeight = FontWeight.Bold, fontSize = 18.sp, color = PrimaryBlue)
                            Text(
                                "Last updated: July 2026. Acarpo by Philemon respects your privacy. " +
                                "We collect minimal anonymous usage analytics and newsletter email subscriptions. " +
                                "We do not share your personal information with third parties. Google AdSense and analytics comply with GDPR and CCPA guidelines.",
                                fontSize = 13.sp, lineHeight = 20.sp
                            )
                        }
                        "Terms of Service" -> {
                            Text("Terms of Service", fontWeight = FontWeight.Bold, fontSize = 18.sp, color = PrimaryBlue)
                            Text(
                                "By accessing Acarpo by Philemon, you agree to comply with our terms. " +
                                "All code samples are provided as-is under open MIT licensing. " +
                                "Cybersecurity writeups and lab notes are strictly for authorized testing and educational purposes.",
                                fontSize = 13.sp, lineHeight = 20.sp
                            )
                        }
                        "Disclaimer" -> {
                            Text("Disclaimer & Educational Use", fontWeight = FontWeight.Bold, fontSize = 18.sp, color = PrimaryBlue)
                            Text(
                                "All content provided on Acarpo by Philemon is for educational, informational, and research purposes only. " +
                                "Philemon assumes no liability for misuse of code, scripts, or tools provided on this application.",
                                fontSize = 13.sp, lineHeight = 20.sp
                            )
                        }
                        "Affiliate Disclosure" -> {
                            Text("Affiliate Disclosure", fontWeight = FontWeight.Bold, fontSize = 18.sp, color = PrimaryBlue)
                            Text(
                                "Some links in our Tools Directory or Link Hub may be affiliate referral links. " +
                                "If you purchase a subscription through these links, Acarpo by Philemon may earn a small commission at no extra cost to you.",
                                fontSize = 13.sp, lineHeight = 20.sp
                            )
                        }
                        "Cookie Policy" -> {
                            Text("Cookie Policy", fontWeight = FontWeight.Bold, fontSize = 18.sp, color = PrimaryBlue)
                            Text(
                                "Acarpo by Philemon uses essential local state storage (Room DB) to persist your bookmarks, dark mode preference, and reading history locally on your device.",
                                fontSize = 13.sp, lineHeight = 20.sp
                            )
                        }
                        else -> { // Dynamic Sitemap
                            Text("Dynamic Sitemap & Web Manifest", fontWeight = FontWeight.Bold, fontSize = 18.sp, color = PrimaryBlue)
                            Text("Web App URL: https://acarpo.app", fontSize = 13.sp)
                            Text("PWA Manifest: https://acarpo.app/manifest.json", fontSize = 13.sp)
                            Text("Sitemap XML: https://acarpo.app/sitemap.xml", fontSize = 13.sp)
                            Text("RSS Feed: https://acarpo.app/rss.xml", fontSize = 13.sp)
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
