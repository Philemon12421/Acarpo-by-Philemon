package com.example.data.local

import androidx.room.*
import com.example.data.model.*
import kotlinx.coroutines.flow.Flow

@Dao
interface PhantoxDao {

    // Articles
    @Query("SELECT * FROM articles ORDER BY publishedDate DESC")
    fun getAllArticles(): Flow<List<Article>>

    @Query("SELECT * FROM articles WHERE category = :category ORDER BY publishedDate DESC")
    fun getArticlesByCategory(category: String): Flow<List<Article>>

    @Query("SELECT * FROM articles WHERE isFeatured = 1")
    fun getFeaturedArticles(): Flow<List<Article>>

    @Query("SELECT * FROM articles WHERE isTrending = 1")
    fun getTrendingArticles(): Flow<List<Article>>

    @Query("SELECT * FROM articles WHERE isBookmarked = 1")
    fun getBookmarkedArticles(): Flow<List<Article>>

    @Query("SELECT * FROM articles WHERE slug = :slug LIMIT 1")
    suspend fun getArticleBySlug(slug: String): Article?

    @Query("SELECT * FROM articles WHERE id = :id LIMIT 1")
    suspend fun getArticleById(id: String): Article?

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertArticles(articles: List<Article>)

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertArticle(article: Article)

    @Update
    suspend fun updateArticle(article: Article)

    @Query("UPDATE articles SET isBookmarked = :isBookmarked WHERE id = :id")
    suspend fun updateBookmark(id: String, isBookmarked: Boolean)

    @Query("UPDATE articles SET views = views + 1 WHERE id = :id")
    suspend fun incrementArticleViews(id: String)

    // Tools
    @Query("SELECT * FROM tools ORDER BY rating DESC")
    fun getAllTools(): Flow<List<ToolItem>>

    @Query("SELECT * FROM tools WHERE category = :category")
    fun getToolsByCategory(category: String): Flow<List<ToolItem>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertTools(tools: List<ToolItem>)

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertTool(tool: ToolItem)

    // Redirect Links (/go/...)
    @Query("SELECT * FROM redirect_links ORDER BY clicks DESC")
    fun getAllRedirectLinks(): Flow<List<RedirectLink>>

    @Query("SELECT * FROM redirect_links WHERE slug = :slug LIMIT 1")
    suspend fun getRedirectBySlug(slug: String): RedirectLink?

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertRedirectLinks(links: List<RedirectLink>)

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertRedirectLink(link: RedirectLink)

    @Query("UPDATE redirect_links SET clicks = clicks + 1 WHERE slug = :slug")
    suspend fun incrementRedirectClick(slug: String)

    // Cyber Notes
    @Query("SELECT * FROM cyber_notes ORDER BY title ASC")
    fun getAllCyberNotes(): Flow<List<CyberNote>>

    @Query("SELECT * FROM cyber_notes WHERE category = :category")
    fun getCyberNotesByCategory(category: String): Flow<List<CyberNote>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertCyberNotes(notes: List<CyberNote>)

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertCyberNote(note: CyberNote)

    // Subscribers
    @Query("SELECT * FROM subscribers ORDER BY subscribedAt DESC")
    fun getAllSubscribers(): Flow<List<Subscriber>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertSubscriber(subscriber: Subscriber)

    // Comments
    @Query("SELECT * FROM comments WHERE articleId = :articleId ORDER BY createdAt DESC")
    fun getCommentsForArticle(articleId: String): Flow<List<ArticleComment>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertComment(comment: ArticleComment)
}
