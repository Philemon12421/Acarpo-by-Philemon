import React, { useState } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');

  const articles = [
    {
      id: 1,
      title: 'Building High-Performance Engines with React 18, Vite & Tailwind',
      category: 'Technology',
      author: 'Philemon',
      readTime: '4 min read',
      excerpt: 'Learn how to build responsive, ultra-fast modern web applications targeting Vercel deployment with Vite and Tailwind CSS.'
    },
    {
      id: 2,
      title: 'Autonomous AI Hub: Harnessing LLMs for Code Generation',
      category: 'AI & ML',
      author: 'Philemon',
      readTime: '6 min read',
      excerpt: 'Explore how modern AI models can automate development workflows and streamline web application deployment.'
    }
  ];

  const tools = [
    { name: 'Phantox Search', desc: 'AI-assisted deep web search engine', category: 'AI' },
    { name: 'Blogger Backup', desc: 'Automated blog export & sync tool', category: 'Publishing' },
    { name: 'Vercel Deploy', desc: 'One-click CI/CD production pipelines', category: 'DevOps' }
  ];

  const filteredArticles = articles.filter(a =>
    a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Top Header */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-50 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-xl text-white shadow-lg shadow-blue-500/20">
            A
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight text-white tracking-wide">Acarpo Web Hub</h1>
            <p className="text-xs text-slate-400">Phantox React Engine • acarpo.app</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1.5 bg-slate-950/60 p-1.5 rounded-xl border border-slate-800">
          {['home', 'articles', 'ai-hub', 'tools', 'admin'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold capitalize transition ${
                activeTab === tab
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {tab.replace('-', ' ')}
            </button>
          ))}
        </nav>
      </header>

      {/* Main Container */}
      <main className="max-w-5xl mx-auto p-6 space-y-8 pb-24">
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search articles, tools, AI prompts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900/80 border border-slate-800 rounded-2xl px-5 py-3.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-slate-500 transition"
          />
        </div>

        {/* Hero Banner */}
        <section className="bg-gradient-to-r from-blue-900/40 via-slate-900 to-indigo-900/40 border border-slate-800 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="inline-block text-xs font-bold px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20 uppercase tracking-wider">
              React + Vite + Vercel Ready
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">Phantox Web Hub & Content Engine</h2>
            <p className="text-sm text-slate-300 max-w-xl">
              Fully responsive modern web interface with seamless Tailwind CSS styling, instant client-side routing, and zero build configuration needed for Vercel deployment.
            </p>
          </div>
          <button className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-600/20 transition whitespace-nowrap">
            Explore AI Hub
          </button>
        </section>

        {/* Articles Section */}
        <section className="space-y-4">
          <h3 className="text-lg font-bold text-slate-200 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            Featured Articles
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            {filteredArticles.map((art) => (
              <article
                key={art.id}
                className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-6 hover:border-slate-700 transition cursor-pointer flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">{art.category}</span>
                    <span className="text-xs text-slate-500">{art.readTime}</span>
                  </div>
                  <h4 className="text-base font-bold text-slate-100 hover:text-blue-400 transition">{art.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{art.excerpt}</p>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-500">
                  <span>Author: {art.author}</span>
                  <span className="text-blue-400 font-semibold">Read article →</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Tools Section */}
        <section className="space-y-4">
          <h3 className="text-lg font-bold text-slate-200 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Phantox Tools & Integrations
          </h3>
          <div className="grid gap-4 sm:grid-cols-3">
            {tools.map((tool, idx) => (
              <div
                key={idx}
                className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition space-y-2"
              >
                <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-800 text-slate-300 rounded border border-slate-700">
                  {tool.category}
                </span>
                <h4 className="text-sm font-bold text-slate-100">{tool.name}</h4>
                <p className="text-xs text-slate-400">{tool.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Fixed Bottom Footer */}
      <footer className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900/90 backdrop-blur-md border-t border-slate-800/80 px-6 py-3.5 shadow-2xl">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            <p className="font-medium text-slate-300">
              © 2026 Acarpo Web, developed by Drenchack Tech Company
            </p>
          </div>

          {/* Social Media Link Placeholders */}
          <div className="flex items-center gap-2">
            <a href="#twitter" className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-blue-600/20 hover:text-blue-400 border border-slate-700/60 transition font-medium text-[11px]">
              Twitter / X
            </a>
            <a href="#github" className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 hover:text-white border border-slate-700/60 transition font-medium text-[11px]">
              GitHub
            </a>
            <a href="#linkedin" className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-blue-600/20 hover:text-blue-400 border border-slate-700/60 transition font-medium text-[11px]">
              LinkedIn
            </a>
            <a href="#discord" className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-indigo-600/20 hover:text-indigo-400 border border-slate-700/60 transition font-medium text-[11px]">
              Discord
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
