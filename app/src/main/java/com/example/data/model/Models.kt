package com.example.data.model

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "articles")
data class Article(
    @PrimaryKey val id: String,
    val slug: String,
    val title: String,
    val description: String,
    val content: String = "Welcome to Acarpo by Philemon. In this production article, we cover modern web development, software engineering best practices, architecture patterns, and step-by-step implementation techniques.", // MDX / Rich content text
    val category: String, // Software Engineering, Graphic Design, AI, Cybersecurity, etc.
    val tags: String, // Comma separated
    val author: String = "Philemon",
    val publishedDate: String = "2026-07-23",
    val updatedDate: String = "2026-07-23",
    val readingTime: String = "5 min read",
    val isFeatured: Boolean = false,
    val isTrending: Boolean = false,
    val isBookmarked: Boolean = false,
    val youtubeUrl: String? = null,
    val codeSnippets: String = "", // JSON or formatted code
    val faqs: String = "", // Q&A text formatted
    val views: Int = 1240
)

@Entity(tableName = "tools")
data class ToolItem(
    @PrimaryKey val id: String,
    val name: String,
    val description: String,
    val websiteUrl: String,
    val category: String, // AI Tools, Developer Tools, Design Tools, SEO Tools, Cybersecurity Tools, etc.
    val rating: Float = 4.8f,
    val isFree: Boolean = true,
    val badgeText: String = "Free Tier Available",
    val pros: String = "", // Comma or line separated
    val cons: String = "",
    val iconName: String = "code"
)

@Entity(tableName = "redirect_links")
data class RedirectLink(
    @PrimaryKey val id: String,
    val slug: String, // e.g., "chatgpt", "canva", "github", "linux"
    val destinationUrl: String,
    val title: String,
    val description: String,
    val clicks: Int = 0,
    val createdAt: String = "2026-07-23",
    val category: String = "General"
)

@Entity(tableName = "cyber_notes")
data class CyberNote(
    @PrimaryKey val id: String,
    val title: String,
    val category: String, // Writeups, CTF Walkthroughs, Cheatsheet, Lab Notes
    val content: String,
    val difficulty: String = "Beginner", // Beginner, Intermediate, Advanced
    val tags: String = "Linux, Networking",
    val isEducationalOnly: Boolean = true
)

@Entity(tableName = "subscribers")
data class Subscriber(
    @PrimaryKey val id: String,
    val email: String,
    val subscribedAt: Long = System.currentTimeMillis()
)

@Entity(tableName = "comments")
data class ArticleComment(
    @PrimaryKey val id: String,
    val articleId: String,
    val userName: String,
    val content: String,
    val createdAt: String = "Just now"
)
