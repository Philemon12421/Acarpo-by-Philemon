package com.example.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Email
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

@Composable
fun FooterView(
    onNavigateLegal: (String) -> Unit,
    onSubscribeNewsletter: (String) -> Unit
) {
    var emailInput by remember { mutableStateOf("") }

    Column(
        modifier = Modifier
            .fillMaxWidth()
            .background(MaterialTheme.colorScheme.surfaceVariant)
            .border(width = 0.5.dp, color = MaterialTheme.colorScheme.outline.copy(alpha = 0.2f))
            .padding(24.dp)
    ) {
        // Brand & Newsletter block
        Row(
            modifier = Modifier.fillMaxWidth(),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(
                text = "Phantox Hub",
                fontWeight = FontWeight.Bold,
                fontSize = 20.sp,
                color = MaterialTheme.colorScheme.onSurface
            )
            Spacer(modifier = Modifier.width(8.dp))
            Box(
                modifier = Modifier
                    .clip(RoundedCornerShape(4.dp))
                    .background(PrimaryBlue.copy(alpha = 0.15f))
                    .padding(horizontal = 6.dp, vertical = 2.dp)
            ) {
                Text(
                    text = "Official Media Hub",
                    fontSize = 11.sp,
                    color = PrimaryBlue,
                    fontWeight = FontWeight.SemiBold
                )
            }
        }

        Spacer(modifier = Modifier.height(8.dp))

        Text(
            text = "Learn. Build. Secure. Design. Your central destination for YouTube, TikTok, social links, software engineering, AI tools, cybersecurity labs, and developer insights.",
            fontSize = 13.sp,
            color = MaterialTheme.colorScheme.onSurfaceVariant,
            lineHeight = 18.sp
        )

        Spacer(modifier = Modifier.height(20.dp))

        // Quick Newsletter Input
        Text(
            text = "Join 25,000+ Tech Enthusiasts & Engineers",
            fontWeight = FontWeight.SemiBold,
            fontSize = 14.sp,
            color = MaterialTheme.colorScheme.onSurface
        )

        Spacer(modifier = Modifier.height(8.dp))

        Row(
            modifier = Modifier.fillMaxWidth(),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            OutlinedTextField(
                value = emailInput,
                onValueChange = { emailInput = it },
                placeholder = { Text("Enter your email address...", fontSize = 12.sp) },
                singleLine = true,
                modifier = Modifier
                    .weight(1f)
                    .testTag("footer_email_input"),
                leadingIcon = { Icon(Icons.Default.Email, contentDescription = null) }
            )

            Button(
                onClick = {
                    onSubscribeNewsletter(emailInput)
                    emailInput = ""
                },
                colors = ButtonDefaults.buttonColors(containerColor = PrimaryBlue),
                modifier = Modifier.testTag("footer_subscribe_btn")
            ) {
                Text("Join Free", fontWeight = FontWeight.Bold, fontSize = 13.sp)
            }
        }

        Spacer(modifier = Modifier.height(24.dp))
        HorizontalDivider(color = MaterialTheme.colorScheme.outline.copy(alpha = 0.2f))
        Spacer(modifier = Modifier.height(16.dp))

        // Legal & Info Links
        Text(
            text = "Pages & Disclosures",
            fontWeight = FontWeight.Bold,
            fontSize = 13.sp,
            color = MaterialTheme.colorScheme.onSurface
        )

        Spacer(modifier = Modifier.height(8.dp))

        val legalPages = listOf(
            "About Us",
            "Contact Us",
            "Privacy Policy",
            "Terms of Service",
            "Disclaimer",
            "Affiliate Disclosure",
            "Cookie Policy",
            "Dynamic Sitemap"
        )

        Column(verticalArrangement = Arrangement.spacedBy(6.dp)) {
            legalPages.chunked(2).forEach { rowItems ->
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    rowItems.forEach { title ->
                        Text(
                            text = "• $title",
                            fontSize = 12.sp,
                            color = PrimaryBlue,
                            fontWeight = FontWeight.Medium,
                            modifier = Modifier
                                .weight(1f)
                                .clickable { onNavigateLegal(title) }
                                .padding(vertical = 4.dp)
                                .testTag("footer_link_$title")
                        )
                    }
                }
            }
        }

        Spacer(modifier = Modifier.height(20.dp))
        HorizontalDivider(color = MaterialTheme.colorScheme.outline.copy(alpha = 0.2f))
        Spacer(modifier = Modifier.height(16.dp))

        Text(
            text = "© 2026 Phantox Hub. All rights reserved. Educational and authorized security testing content only.",
            fontSize = 11.sp,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )
    }
}
