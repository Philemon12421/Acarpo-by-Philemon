package com.example.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.platform.LocalClipboardManager
import androidx.compose.ui.text.AnnotatedString
import com.example.data.model.Article
import com.example.data.model.RedirectLink
import com.example.data.model.Subscriber
import com.example.data.model.ToolItem
import com.example.ui.theme.AccentCyan
import com.example.ui.theme.PrimaryBlue

@Composable
fun AdminDashboardScreen(
    articlesCount: Int,
    redirectsCount: Int,
    subscribers: List<Subscriber>,
    articles: List<Article> = emptyList(),
    redirects: List<RedirectLink> = emptyList(),
    tools: List<ToolItem> = emptyList(),
    onCreateArticle: (String, String, String, String, String) -> Unit,
    onCreateRedirect: (String, String, String, String) -> Unit,
    onCreateTool: (String, String, String, String, String, String) -> Unit,
    onImportBloggerData: (String) -> Unit = {},
    onShowToast: (String) -> Unit = {}
) {
    var selectedTab by remember { mutableIntStateOf(0) }
    val clipboardManager = LocalClipboardManager.current

    // Article Form State
    var articleTitle by remember { mutableStateOf("") }
    var articleCategory by remember { mutableStateOf("Software Engineering") }
    var articleDesc by remember { mutableStateOf("") }
    var articleContent by remember { mutableStateOf("") }
    var articleTags by remember { mutableStateOf("React, Next.js") }

    // Redirect Form State
    var redirectSlug by remember { mutableStateOf("") }
    var redirectUrl by remember { mutableStateOf("https://") }
    var redirectTitle by remember { mutableStateOf("") }
    var redirectDesc by remember { mutableStateOf("") }

    // Tool Form State
    var toolName by remember { mutableStateOf("") }
    var toolCategory by remember { mutableStateOf("AI Tools") }
    var toolUrl by remember { mutableStateOf("https://") }
    var toolDesc by remember { mutableStateOf("") }
    var toolPros by remember { mutableStateOf("") }
    var toolCons by remember { mutableStateOf("") }

    // Blogger / Backup Import State
    var bloggerImportText by remember { mutableStateOf("") }

    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .background(MaterialTheme.colorScheme.background)
            .testTag("admin_screen_column"),
        contentPadding = PaddingValues(20.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        item {
            Column {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Icon(
                        imageVector = Icons.Default.AdminPanelSettings,
                        contentDescription = null,
                        tint = PrimaryBlue,
                        modifier = Modifier.size(28.dp)
                    )
                    Spacer(modifier = Modifier.width(8.dp))
                    Text(
                        text = "Acarpo Web App Creator Admin",
                        fontWeight = FontWeight.ExtraBold,
                        fontSize = 24.sp,
                        color = MaterialTheme.colorScheme.onSurface
                    )
                }

                Spacer(modifier = Modifier.height(6.dp))

                Text(
                    text = "Manage articles, create link hub redirects, add tools, and view newsletter subscribers.",
                    fontSize = 13.sp,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
        }

        // Metrics Grid Cards
        item {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                MetricCard(
                    title = "Published Posts",
                    value = "$articlesCount",
                    color = PrimaryBlue,
                    modifier = Modifier.weight(1f)
                )
                MetricCard(
                    title = "Redirect Links",
                    value = "$redirectsCount",
                    color = AccentCyan,
                    modifier = Modifier.weight(1f)
                )
                MetricCard(
                    title = "Subscribers",
                    value = "${subscribers.size}",
                    color = Color(0xFF10B981),
                    modifier = Modifier.weight(1f)
                )
            }
        }

        // Tabs
        item {
            TabRow(selectedTabIndex = selectedTab) {
                Tab(
                    selected = selectedTab == 0,
                    onClick = { selectedTab = 0 },
                    text = { Text("New Article", fontSize = 12.sp) }
                )
                Tab(
                    selected = selectedTab == 1,
                    onClick = { selectedTab = 1 },
                    text = { Text("New Redirect (/go)", fontSize = 12.sp) }
                )
                Tab(
                    selected = selectedTab == 2,
                    onClick = { selectedTab = 2 },
                    text = { Text("New Tool", fontSize = 12.sp) }
                )
                Tab(
                    selected = selectedTab == 3,
                    onClick = { selectedTab = 3 },
                    text = { Text("Subscribers", fontSize = 11.sp) }
                )
                Tab(
                    selected = selectedTab == 4,
                    onClick = { selectedTab = 4 },
                    text = { Text("Blogger", fontSize = 11.sp) }
                )
                Tab(
                    selected = selectedTab == 5,
                    onClick = { selectedTab = 5 },
                    text = { Text("React & Vercel", fontSize = 11.sp) }
                )
            }
        }

        // Tab Content
        when (selectedTab) {
            0 -> {
                item {
                    Card(
                        shape = RoundedCornerShape(12.dp),
                        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant),
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Column(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(10.dp)) {
                            Text("Create & Publish New Blog Post", fontWeight = FontWeight.Bold, fontSize = 16.sp)

                            OutlinedTextField(
                                value = articleTitle,
                                onValueChange = { articleTitle = it },
                                placeholder = { Text("Article Title") },
                                modifier = Modifier.fillMaxWidth().testTag("admin_article_title_input")
                            )

                            OutlinedTextField(
                                value = articleCategory,
                                onValueChange = { articleCategory = it },
                                placeholder = { Text("Category (e.g. Software Engineering, AI, Graphic Design)") },
                                modifier = Modifier.fillMaxWidth().testTag("admin_article_cat_input")
                            )

                            OutlinedTextField(
                                value = articleDesc,
                                onValueChange = { articleDesc = it },
                                placeholder = { Text("Meta Description / Summary") },
                                modifier = Modifier.fillMaxWidth().testTag("admin_article_desc_input")
                            )

                            OutlinedTextField(
                                value = articleContent,
                                onValueChange = { articleContent = it },
                                placeholder = { Text("Full Article Content (MDX / Rich Text)") },
                                modifier = Modifier.fillMaxWidth().height(120.dp).testTag("admin_article_content_input")
                            )

                            OutlinedTextField(
                                value = articleTags,
                                onValueChange = { articleTags = it },
                                placeholder = { Text("Tags (comma separated)") },
                                modifier = Modifier.fillMaxWidth()
                            )

                            Button(
                                onClick = {
                                    onCreateArticle(articleTitle, articleCategory, articleDesc, articleContent, articleTags)
                                    articleTitle = ""
                                    articleDesc = ""
                                    articleContent = ""
                                },
                                colors = ButtonDefaults.buttonColors(containerColor = PrimaryBlue),
                                modifier = Modifier.fillMaxWidth().testTag("admin_publish_article_btn")
                            ) {
                                Text("Publish Article Now", fontWeight = FontWeight.Bold)
                            }
                        }
                    }
                }
            }

            1 -> {
                item {
                    Card(
                        shape = RoundedCornerShape(12.dp),
                        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant),
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Column(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(10.dp)) {
                            Text("Create Redirect Link (phantoxhub.com/go/{slug})", fontWeight = FontWeight.Bold, fontSize = 16.sp)

                            OutlinedTextField(
                                value = redirectSlug,
                                onValueChange = { redirectSlug = it },
                                placeholder = { Text("Slug (e.g. chatgpt, canva, github)") },
                                modifier = Modifier.fillMaxWidth().testTag("admin_redirect_slug_input")
                            )

                            OutlinedTextField(
                                value = redirectUrl,
                                onValueChange = { redirectUrl = it },
                                placeholder = { Text("Destination URL (e.g. https://chatgpt.com)") },
                                modifier = Modifier.fillMaxWidth().testTag("admin_redirect_url_input")
                            )

                            OutlinedTextField(
                                value = redirectTitle,
                                onValueChange = { redirectTitle = it },
                                placeholder = { Text("Link Title") },
                                modifier = Modifier.fillMaxWidth()
                            )

                            OutlinedTextField(
                                value = redirectDesc,
                                onValueChange = { redirectDesc = it },
                                placeholder = { Text("Description") },
                                modifier = Modifier.fillMaxWidth()
                            )

                            Button(
                                onClick = {
                                    onCreateRedirect(redirectSlug, redirectUrl, redirectTitle, redirectDesc)
                                    redirectSlug = ""
                                    redirectUrl = "https://"
                                    redirectTitle = ""
                                    redirectDesc = ""
                                },
                                colors = ButtonDefaults.buttonColors(containerColor = PrimaryBlue),
                                modifier = Modifier.fillMaxWidth().testTag("admin_create_redirect_btn")
                            ) {
                                Text("Create Redirect Link", fontWeight = FontWeight.Bold)
                            }
                        }
                    }
                }
            }

            2 -> {
                item {
                    Card(
                        shape = RoundedCornerShape(12.dp),
                        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant),
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Column(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(10.dp)) {
                            Text("Add New Tool to Directory", fontWeight = FontWeight.Bold, fontSize = 16.sp)

                            OutlinedTextField(
                                value = toolName,
                                onValueChange = { toolName = it },
                                placeholder = { Text("Tool Name") },
                                modifier = Modifier.fillMaxWidth()
                            )

                            OutlinedTextField(
                                value = toolCategory,
                                onValueChange = { toolCategory = it },
                                placeholder = { Text("Category (e.g. AI Tools, Dev Tools, Design)") },
                                modifier = Modifier.fillMaxWidth()
                            )

                            OutlinedTextField(
                                value = toolUrl,
                                onValueChange = { toolUrl = it },
                                placeholder = { Text("Website URL") },
                                modifier = Modifier.fillMaxWidth()
                            )

                            OutlinedTextField(
                                value = toolDesc,
                                onValueChange = { toolDesc = it },
                                placeholder = { Text("Short Description") },
                                modifier = Modifier.fillMaxWidth()
                            )

                            OutlinedTextField(
                                value = toolPros,
                                onValueChange = { toolPros = it },
                                placeholder = { Text("Pros") },
                                modifier = Modifier.fillMaxWidth()
                            )

                            OutlinedTextField(
                                value = toolCons,
                                onValueChange = { toolCons = it },
                                placeholder = { Text("Cons") },
                                modifier = Modifier.fillMaxWidth()
                            )

                            Button(
                                onClick = {
                                    onCreateTool(toolName, toolCategory, toolUrl, toolDesc, toolPros, toolCons)
                                    toolName = ""
                                    toolUrl = "https://"
                                    toolDesc = ""
                                },
                                colors = ButtonDefaults.buttonColors(containerColor = PrimaryBlue),
                                modifier = Modifier.fillMaxWidth()
                            ) {
                                Text("Save Tool to Directory", fontWeight = FontWeight.Bold)
                            }
                        }
                    }
                }
            }

            3 -> {
                if (subscribers.isEmpty()) {
                    item {
                        Text("No newsletter subscribers recorded yet.", color = MaterialTheme.colorScheme.onSurfaceVariant)
                    }
                } else {
                    items(subscribers) { sub ->
                        Card(
                            shape = RoundedCornerShape(8.dp),
                            colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant),
                            modifier = Modifier.fillMaxWidth()
                        ) {
                            Row(
                                modifier = Modifier.padding(12.dp),
                                horizontalArrangement = Arrangement.SpaceBetween,
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Text(text = sub.email, fontWeight = FontWeight.Bold, fontSize = 13.sp)
                                Text(text = "Subscribed", fontSize = 10.sp, color = Color(0xFF10B981))
                            }
                        }
                    }
                }
            }

            4 -> {
                item {
                    Card(
                        shape = RoundedCornerShape(12.dp),
                        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant),
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Column(
                            modifier = Modifier.padding(16.dp),
                            verticalArrangement = Arrangement.spacedBy(14.dp)
                        ) {
                            Row(verticalAlignment = Alignment.CenterVertically) {
                                Icon(
                                    imageVector = Icons.Default.CloudSync,
                                    contentDescription = null,
                                    tint = PrimaryBlue,
                                    modifier = Modifier.size(22.dp)
                                )
                                Spacer(modifier = Modifier.width(8.dp))
                                Text("Blogger & CMS Sync / Backup Engine", fontWeight = FontWeight.Bold, fontSize = 16.sp)
                            }

                            // Standalone indicator banner
                            Surface(
                                color = MaterialTheme.colorScheme.primaryContainer.copy(alpha = 0.5f),
                                shape = RoundedCornerShape(8.dp),
                                modifier = Modifier.fillMaxWidth()
                            ) {
                                Row(
                                    modifier = Modifier.padding(10.dp),
                                    verticalAlignment = Alignment.CenterVertically
                                ) {
                                    Icon(
                                        imageVector = Icons.Default.CheckCircle,
                                        contentDescription = null,
                                        tint = PrimaryBlue,
                                        modifier = Modifier.size(16.dp)
                                    )
                                    Spacer(modifier = Modifier.width(8.dp))
                                    Text(
                                        text = "Acarpo operates 100% autonomously on local Room DB storage. You can backup to or import from Blogger at any time.",
                                        fontSize = 11.sp,
                                        lineHeight = 15.sp,
                                        color = MaterialTheme.colorScheme.onPrimaryContainer
                                    )
                                }
                            }

                            Divider(color = MaterialTheme.colorScheme.outline.copy(alpha = 0.2f))

                            // Export to Blogger XML Feed (Atom 1.0)
                            Text("1. Export Posts to Blogger XML Feed", fontWeight = FontWeight.Bold, fontSize = 13.sp)
                            Text(
                                text = "Generates a standard Blogger Atom XML feed containing all ${articles.size} published articles. Import this file directly into Blogger (Settings -> Manage Blog -> Import Content).",
                                fontSize = 11.sp,
                                color = MaterialTheme.colorScheme.onSurfaceVariant
                            )

                            Button(
                                onClick = {
                                    val xmlBuilder = StringBuilder()
                                    xmlBuilder.append("<?xml version='1.0' encoding='UTF-8'?>\n")
                                    xmlBuilder.append("<feed xmlns='http://www.w3.org/2005/Atom'>\n")
                                    xmlBuilder.append("  <title>Acarpo by Philemon</title>\n")
                                    xmlBuilder.append("  <subtitle>Web App & Developer Engine</subtitle>\n")
                                    for (art in articles) {
                                        xmlBuilder.append("  <entry>\n")
                                        xmlBuilder.append("    <title>${art.title.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")}</title>\n")
                                        xmlBuilder.append("    <category term='${art.category}'/>\n")
                                        xmlBuilder.append("    <content type='html'><![CDATA[${art.content}]]></content>\n")
                                        xmlBuilder.append("  </entry>\n")
                                    }
                                    xmlBuilder.append("</feed>")

                                    clipboardManager.setText(AnnotatedString(xmlBuilder.toString()))
                                    onShowToast("Copied Blogger XML Feed (${articles.size} posts) to clipboard!")
                                },
                                colors = ButtonDefaults.buttonColors(containerColor = PrimaryBlue),
                                modifier = Modifier.fillMaxWidth().testTag("copy_blogger_xml_btn")
                            ) {
                                Icon(imageVector = Icons.Default.Code, contentDescription = null, modifier = Modifier.size(16.dp))
                                Spacer(modifier = Modifier.width(6.dp))
                                Text("Copy Blogger XML Backup to Clipboard", fontSize = 12.sp, fontWeight = FontWeight.Bold)
                            }

                            Divider(color = MaterialTheme.colorScheme.outline.copy(alpha = 0.2f))

                            // Import / Restore from Blogger or JSON
                            Text("2. Import & Restore from Blogger or JSON", fontWeight = FontWeight.Bold, fontSize = 13.sp)
                            Text(
                                text = "Paste Blogger XML feed or JSON backup data below to automatically parse and restore posts into Acarpo DB.",
                                fontSize = 11.sp,
                                color = MaterialTheme.colorScheme.onSurfaceVariant
                            )

                            OutlinedTextField(
                                value = bloggerImportText,
                                onValueChange = { bloggerImportText = it },
                                placeholder = { Text("Paste Blogger XML feed or JSON backup here...") },
                                modifier = Modifier.fillMaxWidth().height(100.dp).testTag("blogger_import_input")
                            )

                            Button(
                                onClick = {
                                    onImportBloggerData(bloggerImportText)
                                    bloggerImportText = ""
                                },
                                colors = ButtonDefaults.buttonColors(containerColor = AccentCyan),
                                modifier = Modifier.fillMaxWidth().testTag("import_blogger_btn")
                            ) {
                                Icon(imageVector = Icons.Default.FileDownload, contentDescription = null, modifier = Modifier.size(16.dp))
                                Spacer(modifier = Modifier.width(6.dp))
                                Text("Import / Restore Content Now", fontSize = 12.sp, fontWeight = FontWeight.Bold)
                            }

                            Divider(color = MaterialTheme.colorScheme.outline.copy(alpha = 0.2f))

                            // Blogger Widget Embed
                            Text("3. Blogger Custom Gadget Widget Code", fontWeight = FontWeight.Bold, fontSize = 13.sp)
                            Text(
                                text = "Copy this snippet into Blogger Layout -> Add a Gadget -> HTML/JavaScript to display Acarpo Web App directly on your Blogger blog.",
                                fontSize = 11.sp,
                                color = MaterialTheme.colorScheme.onSurfaceVariant
                            )

                            val gadgetCode = "<!-- Acarpo Web App Blogger Gadget -->\n" +
                                    "<div id='acarpo-blog-widget'></div>\n" +
                                    "<iframe src='https://acarpo.app' width='100%' height='650px' style='border:0; border-radius:12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);' title='Acarpo by Philemon Web App'></iframe>"

                            OutlinedTextField(
                                value = gadgetCode,
                                onValueChange = {},
                                readOnly = true,
                                modifier = Modifier.fillMaxWidth().height(80.dp)
                            )

                            OutlinedButton(
                                onClick = {
                                    clipboardManager.setText(AnnotatedString(gadgetCode))
                                    onShowToast("Copied Blogger Widget Embed HTML code to clipboard!")
                                },
                                modifier = Modifier.fillMaxWidth()
                            ) {
                                Icon(imageVector = Icons.Default.ContentCopy, contentDescription = null, modifier = Modifier.size(16.dp))
                                Spacer(modifier = Modifier.width(6.dp))
                                Text("Copy Blogger Widget HTML Code", fontSize = 12.sp, fontWeight = FontWeight.Bold)
                            }
                        }
                    }
                }
            }

            5 -> {
                item {
                    Card(
                        shape = RoundedCornerShape(12.dp),
                        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant),
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Column(
                            modifier = Modifier.padding(16.dp),
                            verticalArrangement = Arrangement.spacedBy(14.dp)
                        ) {
                            Row(verticalAlignment = Alignment.CenterVertically) {
                                Icon(
                                    imageVector = Icons.Default.Code,
                                    contentDescription = null,
                                    tint = PrimaryBlue,
                                    modifier = Modifier.size(22.dp)
                                )
                                Spacer(modifier = Modifier.width(8.dp))
                                Text("React + Vite + Vercel Web Export", fontWeight = FontWeight.Bold, fontSize = 16.sp)
                            }

                            Text(
                                text = "Acarpo React Web Code: Copy these files to run Acarpo natively as a React 18 / Vite SPA deployed on Vercel or Netlify.",
                                fontSize = 11.sp,
                                color = MaterialTheme.colorScheme.onSurfaceVariant
                            )

                            // App.jsx React component export
                            val d = '$'
                            val reactAppJsx = """
import React, { useState } from 'react';

// Acarpo Web App in React 18 + Tailwind / CSS
export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [searchTerm, setSearchTerm] = useState('');

  const articles = [
    { id: 1, title: 'Building Scalable Web Engines with React & Vite', category: 'Tech', author: 'Philemon' },
    { id: 2, title: 'The Future of Autonomous AI Tools', category: 'AI', author: 'Philemon' }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Top Header */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-xl text-white">A</div>
          <div>
            <h1 className="font-bold text-lg leading-tight">Acarpo Web</h1>
            <p className="text-xs text-slate-400">by Philemon • acarpo.app</p>
          </div>
        </div>
        <nav className="flex gap-2">
          {['home', 'articles', 'ai-hub', 'tools', 'admin'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition ${d}{
                activeTab === tab ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 text-slate-300'
              }`}
            >
              {d}{tab.replace('-', ' ')}
            </button>
          ))}
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto p-6">
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search articles, tools, links..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500"
          />
        </div>

        <section className="grid gap-4 md:grid-cols-2">
          {articles.map(art => (
            <article key={art.id} className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">{d}{art.category}</span>
              <h2 className="text-lg font-bold mt-1 text-slate-100">{d}{art.title}</h2>
              <p className="text-xs text-slate-400 mt-2">By {d}{art.author}</p>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
                            """.trimIndent()

                            Button(
                                onClick = {
                                    clipboardManager.setText(AnnotatedString(reactAppJsx))
                                    onShowToast("Copied React App.jsx code to clipboard!")
                                },
                                colors = ButtonDefaults.buttonColors(containerColor = PrimaryBlue),
                                modifier = Modifier.fillMaxWidth().testTag("copy_react_code_btn")
                            ) {
                                Icon(imageVector = Icons.Default.ContentCopy, contentDescription = null, modifier = Modifier.size(16.dp))
                                Spacer(modifier = Modifier.width(6.dp))
                                Text("Copy React App.jsx Code", fontSize = 12.sp, fontWeight = FontWeight.Bold)
                            }

                            Divider(color = MaterialTheme.colorScheme.outline.copy(alpha = 0.2f))

                            // vercel.json export
                            val vercelJson = """
{
  "version": 2,
  "builds": [
    { "src": "package.json", "use": "@vercel/static-build", "config": { "distDir": "dist" } }
  ],
  "routes": [
    { "handle": "filesystem" },
    { "src": "/(.*)", "dest": "/index.html" }
  ]
}
                            """.trimIndent()

                            Text("vercel.json Configuration:", fontWeight = FontWeight.Bold, fontSize = 12.sp)
                            OutlinedTextField(
                                value = vercelJson,
                                onValueChange = {},
                                readOnly = true,
                                modifier = Modifier.fillMaxWidth().height(100.dp)
                            )

                            OutlinedButton(
                                onClick = {
                                    clipboardManager.setText(AnnotatedString(vercelJson))
                                    onShowToast("Copied vercel.json configuration to clipboard!")
                                },
                                modifier = Modifier.fillMaxWidth()
                            ) {
                                Icon(imageVector = Icons.Default.ContentCopy, contentDescription = null, modifier = Modifier.size(16.dp))
                                Spacer(modifier = Modifier.width(6.dp))
                                Text("Copy vercel.json Config", fontSize = 12.sp, fontWeight = FontWeight.Bold)
                            }
                        }
                    }
                }
            }
        }
    }
}

@Composable
fun MetricCard(
    title: String,
    value: String,
    color: Color,
    modifier: Modifier = Modifier
) {
    Card(
        shape = RoundedCornerShape(12.dp),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant),
        modifier = modifier.border(width = 1.dp, color = color.copy(alpha = 0.3f), shape = RoundedCornerShape(12.dp))
    ) {
        Column(
            modifier = Modifier.padding(12.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Text(text = value, fontWeight = FontWeight.ExtraBold, fontSize = 20.sp, color = color)
            Spacer(modifier = Modifier.height(2.dp))
            Text(text = title, fontSize = 10.sp, color = MaterialTheme.colorScheme.onSurfaceVariant)
        }
    }
}
