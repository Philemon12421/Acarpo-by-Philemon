package com.example.ui.screens

import android.content.Intent
import android.net.Uri
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.filled.Launch
import androidx.compose.material.icons.filled.Link
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.data.model.Article
import com.example.data.model.RedirectLink
import com.example.ui.components.ArticleCard
import com.example.ui.components.BannerAdPlaceholder
import com.example.ui.components.FooterView
import com.example.ui.theme.PrimaryBlue
import com.example.ui.theme.SuccessGreen
import kotlinx.coroutines.delay

@Composable
fun RedirectPageScreen(
    redirect: RedirectLink?,
    recommendedArticles: List<Article>,
    onBack: () -> Unit,
    onOpenArticle: (Article) -> Unit,
    onToggleBookmark: (Article) -> Unit,
    onNavigateLegal: (String) -> Unit,
    onSubscribeNewsletter: (String) -> Unit
) {
    if (redirect == null) {
        Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
            Text("Redirect Link Not Found")
        }
        return
    }

    val context = LocalContext.current
    var secondsLeft by remember { mutableIntStateOf(5) }
    var countdownFinished by remember { mutableStateOf(false) }

    LaunchedEffect(key1 = redirect.slug) {
        while (secondsLeft > 0) {
            delay(1000L)
            secondsLeft--
        }
        countdownFinished = true
    }

    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .background(MaterialTheme.colorScheme.background)
            .testTag("redirect_page_screen_column"),
        contentPadding = PaddingValues(bottom = 32.dp)
    ) {
        // Back Header
        item {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(16.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                IconButton(onClick = onBack, modifier = Modifier.testTag("back_from_redirect_btn")) {
                    Icon(Icons.Default.ArrowBack, contentDescription = "Back")
                }
                Spacer(modifier = Modifier.width(8.dp))
                Text(
                    text = "phantoxhub.com/go/${redirect.slug}",
                    fontWeight = FontWeight.Bold,
                    fontSize = 15.sp,
                    color = PrimaryBlue
                )
            }
        }

        // Redirect Main Card
        item {
            Card(
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant),
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(16.dp)
                    .border(width = 1.dp, color = PrimaryBlue.copy(alpha = 0.3f), shape = RoundedCornerShape(16.dp))
            ) {
                Column(
                    modifier = Modifier.padding(20.dp),
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    Box(
                        modifier = Modifier
                            .size(56.dp)
                            .clip(CircleShape)
                            .background(PrimaryBlue.copy(alpha = 0.15f)),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(
                            imageVector = Icons.Default.Link,
                            contentDescription = null,
                            tint = PrimaryBlue,
                            modifier = Modifier.size(28.dp)
                        )
                    }

                    Spacer(modifier = Modifier.height(12.dp))

                    Text(
                        text = redirect.title,
                        fontWeight = FontWeight.ExtraBold,
                        fontSize = 20.sp,
                        color = MaterialTheme.colorScheme.onSurface
                    )

                    Spacer(modifier = Modifier.height(6.dp))

                    Text(
                        text = redirect.description,
                        fontSize = 13.sp,
                        color = MaterialTheme.colorScheme.onSurfaceVariant,
                        lineHeight = 18.sp
                    )

                    Spacer(modifier = Modifier.height(16.dp))

                    // Countdown Ring / Status
                    if (!countdownFinished) {
                        Box(
                            modifier = Modifier
                                .clip(RoundedCornerShape(20.dp))
                                .background(MaterialTheme.colorScheme.surface)
                                .border(width = 1.dp, color = MaterialTheme.colorScheme.outline.copy(alpha = 0.3f), shape = RoundedCornerShape(20.dp))
                                .padding(horizontal = 16.dp, vertical = 8.dp)
                        ) {
                            Text(
                                text = "⏱️ Continuing in $secondsLeft seconds...",
                                fontWeight = FontWeight.Bold,
                                fontSize = 13.sp,
                                color = PrimaryBlue
                            )
                        }
                    } else {
                        Box(
                            modifier = Modifier
                                .clip(RoundedCornerShape(20.dp))
                                .background(SuccessGreen.copy(alpha = 0.15f))
                                .padding(horizontal = 16.dp, vertical = 8.dp)
                        ) {
                            Text(
                                text = "✓ Destination Ready!",
                                fontWeight = FontWeight.Bold,
                                fontSize = 13.sp,
                                color = SuccessGreen
                            )
                        }
                    }

                    Spacer(modifier = Modifier.height(20.dp))

                    // Continue Button
                    Button(
                        onClick = {
                            try {
                                val intent = Intent(Intent.ACTION_VIEW, Uri.parse(redirect.destinationUrl))
                                context.startActivity(intent)
                            } catch (e: Exception) {
                                // Fallback
                            }
                        },
                        colors = ButtonDefaults.buttonColors(containerColor = PrimaryBlue),
                        shape = RoundedCornerShape(10.dp),
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(48.dp)
                            .testTag("continue_to_destination_btn")
                    ) {
                        Icon(Icons.Default.Launch, contentDescription = null, modifier = Modifier.size(18.dp))
                        Spacer(modifier = Modifier.width(8.dp))
                        Text(
                            text = "Continue to Destination",
                            fontSize = 14.sp,
                            fontWeight = FontWeight.Bold
                        )
                    }

                    Spacer(modifier = Modifier.height(8.dp))

                    Text(
                        text = "Destination: ${redirect.destinationUrl}",
                        fontSize = 11.sp,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }
            }
        }

        // Ad Placeholder
        item {
            Box(modifier = Modifier.padding(16.dp)) {
                BannerAdPlaceholder(label = "Redirect Page Sponsor Banner (AdSense Placement)")
            }
        }

        // Recommended Articles
        item {
            Column(modifier = Modifier.padding(16.dp)) {
                Text(
                    text = "Before You Leave — Read Latest Insights",
                    fontWeight = FontWeight.Bold,
                    fontSize = 18.sp,
                    color = MaterialTheme.colorScheme.onSurface
                )

                Spacer(modifier = Modifier.height(6.dp))

                Text(
                    text = "Discover articles and tools recommended for developers and designers.",
                    fontSize = 12.sp,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
        }

        items(recommendedArticles.take(3)) { article ->
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
