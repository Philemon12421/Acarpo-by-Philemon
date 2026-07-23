package com.example.data.local

import android.content.Context
import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase
import com.example.data.model.*

@Database(
    entities = [
        Article::class,
        ToolItem::class,
        RedirectLink::class,
        CyberNote::class,
        Subscriber::class,
        ArticleComment::class
    ],
    version = 1,
    exportSchema = false
)
abstract class PhantoxDatabase : RoomDatabase() {

    abstract fun phantoxDao(): PhantoxDao

    companion object {
        @Volatile
        private var INSTANCE: PhantoxDatabase? = null

        fun getDatabase(context: Context): PhantoxDatabase {
            return INSTANCE ?: synchronized(this) {
                val instance = Room.databaseBuilder(
                    context.applicationContext,
                    PhantoxDatabase::class.java,
                    "phantox_hub_database"
                )
                .fallbackToDestructiveMigration()
                .build()
                INSTANCE = instance
                instance
            }
        }
    }
}
