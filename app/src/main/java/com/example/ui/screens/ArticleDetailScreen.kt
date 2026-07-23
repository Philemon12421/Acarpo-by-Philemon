package com.example.ui.screens

import android.content.ClipData
import android.content.ClipboardManager
import android.content.Context
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
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
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.data.model.Article
import com.example.data.model.ArticleComment
import com.example.ui.components.BannerAdPlaceholder
import com.example.ui.components.CodeBlockView
import com.example.ui.components.FooterView
import com.example.ui.theme.PrimaryBlue
import com.example.ui.theme.SuccessGreen

@Composable
fun ArticleDetailScreen(
    article: Article?,
    comments: List<ArticleComment>,
    onBack: () -> Unit,
    onToggleBookmark: (Article) -> Unit,
    onAddComment: (String, String, String) -> Unit,
    onShowToast: (String) -> Unit,
    onNavigateLegal: (String) -> Unit,
    onSubscribeNewsletter: (String) -> Unit
) {
    if (article == null) {
        Box(
            modifier = Modifier.fillMaxSize(),
            contentAlignment = Alignment.Center
        ) {
            Text("Article not found.")
        }
        return
    }

    val context = LocalContext.current
    var commentName by remember { mutableStateOf("") }
    var commentText by remember { mutableStateOf("") }

    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .background(MaterialTheme.colorScheme.background)
            .testTag("article_detail_column"),
        contentPadding = PaddingValues(bottom = 32.dp)
    ) {
        // Back Navigation & Top Actions
        item {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(16.dp),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                IconButton(
                    onClick = onBack,
                    modifier = Modifier.testTag("back_from_article_btn")
                ) {
                    Icon(Icons.Default.ArrowBack, contentDescription = "Back")
                }

                Row(verticalAlignment = Alignment.CenterVertically) {
                    IconButton(
                        onClick = { onToggleBookmark(article) },
                        modifier = Modifier.testTag("article_bookmark_detail_btn")
                    ) {
                        Icon(
                            imageVector = if (article.isBookmarked) Icons.Default.Bookmark else Icons.Default.BookmarkBorder,
                            contentDescription = "Bookmark",
                            tint = if (article.isBookmarked) PrimaryBlue else MaterialTheme.colorScheme.onSurface
                        )
                    }

                    IconButton(
                        onClick = {
                            val clipboard = context.getSystemService(Context.CLIPBOARD_SERVICE) as ClipboardManager
                            val clip = ClipData.newPlainText("Article URL", "https://phantoxhub.com/blog/${article.slug}")
                            clipboard.setPrimaryClip(clip)
                            onShowToast("Article link copied!")
                        },
                        modifier = Modifier.testTag("article_share_btn")
                    ) {
                        Icon(Icons.Default.Share, contentDescription = "Share Link")
                    }
                }
            }
        }

        // Header Metadata
        item {
            Column(modifier = Modifier.padding(horizontal = 16.dp)) {
                Box(
                    modifier = Modifier
                        .clip(RoundedCornerShape(6.dp))
                        .background(PrimaryBlue.copy(alpha = 0.15f))
                        .padding(horizontal = 8.dp, vertical = 4.dp)
                ) {
                    Text(
                        text = article.category,
                        fontSize = 12.sp,
                        fontWeight = FontWeight.Bold,
                        color = PrimaryBlue
                    )
                }

                Spacer(modifier = Modifier.height(12.dp))

                Text(
                    text = article.title,
                    fontWeight = FontWeight.ExtraBold,
                    fontSize = 24.sp,
                    lineHeight = 30.sp,
                    color = MaterialTheme.colorScheme.onSurface
                )

                Spacer(modifier = Modifier.height(8.dp))

                Text(
                    text = "Published on ${article.publishedDate} • ${article.readingTime} • ${article.views} Views",
                    fontSize = 12.sp,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )

                Spacer(modifier = Modifier.height(16.dp))

                // Author Info Box
                Card(
                    shape = RoundedCornerShape(12.dp),
                    colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant),
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Row(
                        modifier = Modifier.padding(12.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Box(
                            modifier = Modifier
                                .size(40.dp)
                                .clip(CircleShape)
                                .background(PrimaryBlue),
                            contentAlignment = Alignment.Center
                        ) {
                            Text("P", color = Color.White, fontWeight = FontWeight.Bold)
                        }
                        Spacer(modifier = Modifier.width(12.dp))
                        Column {
                            Text(text = "Written by ${article.author}", fontWeight = FontWeight.Bold, fontSize = 14.sp)
                            Text(text = "Senior Software Engineer & Cybersecurity Researcher", fontSize = 11.sp, color = MaterialTheme.colorScheme.onSurfaceVariant)
                        }
                    }
                }

                Spacer(modifier = Modifier.height(16.dp))
                HorizontalDivider(color = MaterialTheme.colorScheme.outline.copy(alpha = 0.2f))
                Spacer(modifier = Modifier.height(16.dp))
            }
        }

        // Header Ad Slot
        item {
            Box(modifier = Modifier.padding(horizontal = 16.dp)) {
                BannerAdPlaceholder(label = "Top In-Article Sponsor Banner")
            }
        }

        // Table of Contents
        item {
            Card(
                shape = RoundedCornerShape(8.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.6f)),
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(16.dp)
                    .border(width = 1.dp, color = PrimaryBlue.copy(alpha = 0.2f), shape = RoundedCornerShape(8.dp))
            ) {
                Column(modifier = Modifier.padding(14.dp)) {
                    Text(
                        text = "Table of Contents",
                        fontWeight = FontWeight.Bold,
                        fontSize = 14.sp,
                        color = MaterialTheme.colorScheme.onSurface
                    )
                    Spacer(modifier = Modifier.height(6.dp))
                    Text("1. Overview & Key Concepts", fontSize = 12.sp, color = PrimaryBlue)
                    Text("2. Architectural Patterns & Implementation", fontSize = 12.sp, color = PrimaryBlue)
                    Text("3. Code Snippets & Best Practices", fontSize = 12.sp, color = PrimaryBlue)
                    Text("4. Frequently Asked Questions (FAQ)", fontSize = 12.sp, color = PrimaryBlue)
                }
            }
        }

        // Main Content Description & Body
        item {
            Column(modifier = Modifier.padding(horizontal = 16.dp)) {
                Text(
                    text = article.description,
                    fontSize = 15.sp,
                    lineHeight = 22.sp,
                    fontWeight = FontWeight.Medium,
                    color = MaterialTheme.colorScheme.onSurface
                )

                Spacer(modifier = Modifier.height(16.dp))

                Text(
                    text = article.content,
                    fontSize = 14.sp,
                    lineHeight = 22.sp,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )

                Spacer(modifier = Modifier.height(20.dp))
            }
        }

        // Code Snippet Section
        if (article.codeSnippets.isNotBlank()) {
            item {
                Column(modifier = Modifier.padding(horizontal = 16.dp)) {
                    Text(
                        text = "Code Implementation",
                        fontWeight = FontWeight.Bold,
                        fontSize = 16.sp,
                        color = MaterialTheme.colorScheme.onSurface
                    )
                    Spacer(modifier = Modifier.height(8.dp))
                    CodeBlockView(
                        code = article.codeSnippets,
                        language = "Production Snippet",
                        onShowToast = onShowToast
                    )
                    Spacer(modifier = Modifier.height(20.dp))
                }
            }
        }

        // Mid-Content Ad
        item {
            Box(modifier = Modifier.padding(horizontal = 16.dp)) {
                BannerAdPlaceholder(label = "Mid-Article Ad Placement (AdSense Responsive)")
            }
        }

        // FAQ Section
        if (article.faqs.isNotBlank()) {
            item {
                Column(modifier = Modifier.padding(16.dp)) {
                    Text(
                        text = "Frequently Asked Questions",
                        fontWeight = FontWeight.Bold,
                        fontSize = 16.sp,
                        color = MaterialTheme.colorScheme.onSurface
                    )
                    Spacer(modifier = Modifier.height(8.dp))
                    Card(
                        shape = RoundedCornerShape(8.dp),
                        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant),
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Text(
                            text = article.faqs,
                            fontSize = 13.sp,
                            lineHeight = 20.sp,
                            modifier = Modifier.padding(14.dp),
                            color = MaterialTheme.colorScheme.onSurface
                        )
                    }
                }
            }
        }

        // Comments Section
        item {
            Column(modifier = Modifier.padding(16.dp)) {
                Text(
                    text = "Discussion & Comments (${comments.size})",
                    fontWeight = FontWeight.Bold,
                    fontSize = 18.sp,
                    color = MaterialTheme.colorScheme.onSurface
                )

                Spacer(modifier = Modifier.height(12.dp))

                // Post comment form
                OutlinedTextField(
                    value = commentName,
                    onValueChange = { commentName = it },
                    placeholder = { Text("Your Name (Optional)", fontSize = 12.sp) },
                    singleLine = true,
                    modifier = Modifier.fillMaxWidth().testTag("comment_name_input")
                )

                Spacer(modifier = Modifier.height(8.dp))

                OutlinedTextField(
                    value = commentText,
                    onValueChange = { commentText = it },
                    placeholder = { Text("Write a comment or question...", fontSize = 12.sp) },
                    modifier = Modifier.fillMaxWidth().height(80.dp).testTag("comment_text_input")
                )

                Spacer(modifier = Modifier.height(8.dp))

                Button(
                    onClick = {
                        onAddComment(article.id, commentName, commentText)
                        commentName = ""
                        commentText = ""
                    },
                    colors = ButtonDefaults.buttonColors(containerColor = PrimaryBlue),
                    modifier = Modifier.align(Alignment.End).testTag("post_comment_btn")
                ) {
                    Text("Post Comment", fontSize = 12.sp, fontWeight = FontWeight.Bold)
                }

                Spacer(modifier = Modifier.height(16.dp))
            }
        }

        // List of comments
        items(comments) { comment ->
            Card(
                shape = RoundedCornerShape(8.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant),
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 16.dp, vertical = 4.dp)
            ) {
                Column(modifier = Modifier.padding(12.dp)) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Text(text = comment.userName, fontWeight = FontWeight.Bold, fontSize = 13.sp)
                        Text(text = comment.createdAt, fontSize = 10.sp, color = MaterialTheme.colorScheme.onSurfaceVariant)
                    }
                    Spacer(modifier = Modifier.height(4.dp))
                    Text(text = comment.content, fontSize = 12.sp, color = MaterialTheme.colorScheme.onSurfaceVariant)
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
