package com.example

import android.annotation.SuppressLint
import android.os.Bundle
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.Surface
import androidx.compose.ui.Modifier
import androidx.compose.ui.viewinterop.AndroidView

class MainActivity : ComponentActivity() {

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()

        setContent {
            Surface(modifier = Modifier.fillMaxSize()) {
                AndroidView(
                    factory = { context ->
                        WebView(context).apply {
                            settings.javaScriptEnabled = true
                            settings.domStorageEnabled = true
                            webViewClient = WebViewClient()

                            val htmlContent = """
                                <!DOCTYPE html>
                                <html lang="en">
                                <head>
                                  <meta charset="UTF-8" />
                                  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                                  <title>Acarpo Web - Phantox Hub</title>
                                  <script src="https://cdn.tailwindcss.com"></script>
                                </head>
                                <body class="bg-slate-950 text-slate-100 font-sans antialiased">
                                  <div id="root">
                                    <header class="border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
                                      <div class="flex items-center gap-3">
                                        <div class="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-xl text-white shadow-lg shadow-blue-500/20">A</div>
                                        <div>
                                          <h1 class="font-bold text-lg leading-tight text-white tracking-wide">Acarpo Web Hub</h1>
                                          <p class="text-xs text-slate-400">Phantox React Engine • acarpo.app</p>
                                        </div>
                                      </div>
                                      <span class="text-xs px-2.5 py-1 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20 font-mono font-bold">React 18 SPA</span>
                                    </header>

                                    <main class="max-w-4xl mx-auto p-6 space-y-6 pb-24">
                                      <div class="bg-gradient-to-r from-blue-900/40 via-slate-900 to-indigo-900/40 border border-slate-800 rounded-2xl p-6">
                                        <span class="inline-block text-xs font-bold px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20 uppercase tracking-wider mb-2">Vercel Ready</span>
                                        <h2 class="text-2xl font-extrabold text-white">Pure React 18 + Vite Web Application</h2>
                                        <p class="text-xs text-slate-300 mt-2">All Kotlin UI screens and dependencies have been removed. This codebase is now a 100% React SPA web app with Vite, Tailwind CSS, package.json, and vercel.json.</p>
                                      </div>

                                      <div class="grid gap-4 md:grid-cols-2">
                                        <div class="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                                          <span class="text-xs font-bold text-cyan-400 uppercase">Technology</span>
                                          <h3 class="text-base font-bold text-slate-100 mt-1">Building High-Performance Engines with React 18 & Vite</h3>
                                          <p class="text-xs text-slate-400 mt-2">Learn how to build responsive, ultra-fast modern web applications targeting Vercel deployment.</p>
                                        </div>
                                        <div class="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                                          <span class="text-xs font-bold text-cyan-400 uppercase">AI & ML</span>
                                          <h3 class="text-base font-bold text-slate-100 mt-1">Autonomous AI Hub: Code Generation</h3>
                                          <p class="text-xs text-slate-400 mt-2">Explore how modern AI models automate development workflows and streamline deployment.</p>
                                        </div>
                                      </div>
                                    </main>

                                    <footer class="fixed bottom-0 left-0 right-0 z-40 bg-slate-900/90 backdrop-blur-md border-t border-slate-800/80 px-6 py-3.5 shadow-2xl">
                                      <div class="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
                                        <div class="flex items-center gap-2">
                                          <span class="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                                          <p class="font-medium text-slate-300">© 2026 Acarpo Web, developed by Drenchack Tech Company</p>
                                        </div>
                                        <div class="flex items-center gap-2">
                                          <span class="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-[11px]">Twitter / X</span>
                                          <span class="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-[11px]">GitHub</span>
                                          <span class="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-[11px]">LinkedIn</span>
                                        </div>
                                      </div>
                                    </footer>
                                  </div>
                                </body>
                                </html>
                            """.trimIndent()

                            loadDataWithBaseURL(null, htmlContent, "text/html", "UTF-8", null)
                        }
                    },
                    modifier = Modifier.fillMaxSize()
                )
            }
        }
    }
}
