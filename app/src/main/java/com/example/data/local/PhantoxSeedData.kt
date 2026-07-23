package com.example.data.local

import com.example.data.model.*

object PhantoxSeedData {

    fun getInitialArticles(): List<Article> = listOf(
        // Software Engineering
        Article(
            id = "se-1",
            slug = "nextjs-15-app-router-masterclass",
            title = "Next.js 15 & App Router: Enterprise Full-Stack Architecture",
            description = "Master modern web development using Next.js Server Components, Server Actions, Dynamic Caching, and TailwindCSS for production scale.",
            category = "Software Engineering",
            tags = "Next.js, React, Web Development, Architecture",
            author = "Phantox",
            publishedDate = "2026-07-20",
            readingTime = "8 min read",
            isFeatured = true,
            isTrending = true,
            codeSnippets = """// Next.js Server Action Example
'use server'

import { revalidatePath } from 'next/cache'

export async function createPost(formData: FormData) {
  const title = formData.get('title') as string
  const content = formData.get('content') as string
  
  await db.post.create({ data: { title, content } })
  revalidatePath('/blog')
}""",
            faqs = "Q: What is the main benefit of Server Actions?\nA: They allow direct server execution without building manual API endpoints.\n\nQ: How does caching work in App Router?\nA: Request memoization, Data Cache, Full Route Cache, and Router Cache work in tandem.",
            views = 3420
        ),
        Article(
            id = "se-2",
            slug = "system-design-microservices-guide",
            title = "System Design 101: Designing Resilient Microservices at Scale",
            description = "An architectural deep-dive into load balancing, message queues, distributed caching with Redis, and saga pattern for transactions.",
            category = "Software Engineering",
            tags = "System Design, Microservices, Cloud, Architecture",
            author = "Phantox",
            publishedDate = "2026-07-18",
            readingTime = "12 min read",
            isFeatured = false,
            isTrending = true,
            codeSnippets = """# Docker Compose for Microservices Architecture
version: '3.8'
services:
  redis-cache:
    image: redis:alpine
    ports:
      - "6379:6379"
  kafka-broker:
    image: confluentinc/cp-kafka:latest
    ports:
      - "9092:9092"""",
            faqs = "Q: When should I choose microservices over monoliths?\nA: Only when teams need independent deployments and scaled resource isolation.",
            views = 2890
        ),
        Article(
            id = "se-3",
            slug = "docker-kubernetes-devops-roadmap",
            title = "The 2026 DevOps Roadmap: Docker, Kubernetes & CI/CD Pipelines",
            description = "Step-by-step guide to containerizing microservices, setting up GitHub Actions workflows, and orchestrating clusters with K8s.",
            category = "Software Engineering",
            tags = "DevOps, Docker, Kubernetes, Git",
            author = "Phantox",
            publishedDate = "2026-07-15",
            readingTime = "10 min read",
            views = 1950
        ),

        // Graphic Design
        Article(
            id = "gd-1",
            slug = "figma-ui-design-system-2026",
            title = "Building Scalable Design Systems in Figma & Auto-Layout 5.0",
            description = "Learn how to build modular UI components, manage design tokens, responsive layouts, dark mode variants, and smooth handover.",
            category = "Graphic Design",
            tags = "Figma, UI Design, UX Design, Design Systems",
            author = "Phantox Design",
            publishedDate = "2026-07-21",
            readingTime = "7 min read",
            isFeatured = true,
            isTrending = false,
            faqs = "Q: How do variables simplify dark mode in Figma?\nA: Design tokens map colors directly to mode variables for instantaneous switching.",
            views = 4120
        ),
        Article(
            id = "gd-2",
            slug = "brand-identity-logo-design-process",
            title = "The Golden Ratio in Logo Design & Modern Brand Identity",
            description = "Explore sacred geometry, golden rectangles, vector precision in Illustrator, typography pairing, and memorable brand storytelling.",
            category = "Graphic Design",
            tags = "Illustrator, Logo Design, Typography, Branding",
            author = "Phantox Design",
            publishedDate = "2026-07-14",
            readingTime = "6 min read",
            views = 1780
        ),

        // Artificial Intelligence
        Article(
            id = "ai-1",
            slug = "gemini-3-flash-ai-agents-guide",
            title = "Building Autonomous AI Agents with Google Gemini & Function Calling",
            description = "A practical tutorial on prompt engineering, structured tool declarations, memory context windows, and real-time agent execution.",
            category = "Artificial Intelligence",
            tags = "Gemini, AI Agents, AI Coding, Prompt Engineering",
            author = "Phantox AI",
            publishedDate = "2026-07-22",
            readingTime = "9 min read",
            isFeatured = true,
            isTrending = true,
            codeSnippets = """// Gemini Function Declaration in Kotlin / REST
val toolDeclaration = JsonObject().apply {
    addProperty("name", "fetchLiveWeather")
    addProperty("description", "Fetches current weather for location")
}""",
            faqs = "Q: What is Function Calling?\nA: It allows LLMs to return structured JSON args to execute code functions locally or via APIs.",
            views = 5600
        ),
        Article(
            id = "ai-2",
            slug = "prompt-engineering-library-2026",
            title = "Master Prompt Engineering: 50+ High-Yield AI Prompts for Developers",
            description = "Curated prompt templates for refactoring legacy code, generating unit tests, architectural reviews, and automated technical writing.",
            category = "Artificial Intelligence",
            tags = "ChatGPT, Prompt Library, Productivity, OpenAI",
            author = "Phantox AI",
            publishedDate = "2026-07-19",
            readingTime = "11 min read",
            views = 3100
        ),

        // Cybersecurity
        Article(
            id = "cs-1",
            slug = "owasp-top-10-web-security-2026",
            title = "OWASP Top 10 Web Vulnerabilities: Remediation & Secure Coding",
            description = "In-depth breakdown of Injection, Broken Authentication, SSRF, XSS, and Access Control flaws with vulnerable code vs patched code.",
            category = "Cybersecurity",
            tags = "OWASP, Web Security, Ethical Hacking, Secure Coding",
            author = "Phantox Security",
            publishedDate = "2026-07-22",
            readingTime = "14 min read",
            isFeatured = true,
            isTrending = true,
            codeSnippets = """// ❌ Vulnerable SQL Query
String query = "SELECT * FROM users WHERE id = '" + userInput + "'";

// ✅ Secure Prepared Statement
PreparedStatement pstmt = conn.prepareStatement("SELECT * FROM users WHERE id = ?");
pstmt.setString(1, userInput);""",
            faqs = "Q: Is SQL Injection still prevalent?\nA: Yes, especially in legacy ORMs and dynamic query builders without parameterization.",
            views = 4890
        ),
        Article(
            id = "cs-2",
            slug = "burp-suite-pro-web-pentesting-guide",
            title = "Web Application Penetration Testing using Burp Suite & Nmap",
            description = "Educational walkthrough of intercepting HTTP proxies, intruder payloads, repeater testing, and network port scanning.",
            category = "Cybersecurity",
            tags = "Burp Suite, Nmap, Kali Linux, Ethical Hacking",
            author = "Phantox Security",
            publishedDate = "2026-07-17",
            readingTime = "10 min read",
            views = 3800
        ),

        // Productivity & Developer Tools
        Article(
            id = "prod-1",
            slug = "ultimate-developer-workstation-setup",
            title = "Top 15 CLI Tools & Dotfiles to 10x Your Engineering Workflow",
            description = "Transform your terminal with Zsh, Starship, Neovim, Fzf, Tmux, eza, and custom automated scripting.",
            category = "Productivity",
            tags = "Developer Tools, Linux, Productivity, Terminal",
            author = "Phantox",
            publishedDate = "2026-07-16",
            readingTime = "6 min read",
            views = 2200
        )
    )

    fun getInitialTools(): List<ToolItem> = listOf(
        ToolItem(
            id = "tool-1",
            name = "ChatGPT",
            description = "State-of-the-art conversational AI assistant for code generation, writing, and problem solving.",
            websiteUrl = "https://chatgpt.com",
            category = "AI Tools",
            rating = 4.9f,
            isFree = true,
            badgeText = "Free & Plus Tier",
            pros = "Versatile model, custom GPTs, code execution, voice interaction",
            cons = "Rate limits on free tier during peak hours",
            iconName = "smart_toy"
        ),
        ToolItem(
            id = "tool-2",
            name = "Google AI Studio",
            description = "Fastest prototyping environment for Google's Gemini models with system instructions and JSON schemas.",
            websiteUrl = "https://aistudio.google.com",
            category = "AI Tools",
            rating = 5.0f,
            isFree = true,
            badgeText = "Generous Free Tier",
            pros = "2M context window, fast multimodal, native function calling",
            cons = "Requires API key setup for web integration",
            iconName = "auto_awesome"
        ),
        ToolItem(
            id = "tool-3",
            name = "Canva",
            description = "All-in-one graphic design platform with AI image generation, presentation design, and brand kits.",
            websiteUrl = "https://canva.com",
            category = "Design Tools",
            rating = 4.8f,
            isFree = true,
            badgeText = "Free & Pro",
            pros = "Thousands of templates, drag and drop, collaborative magic studio",
            cons = "Vector export requires Pro",
            iconName = "palette"
        ),
        ToolItem(
            id = "tool-4",
            name = "Burp Suite",
            description = "Industry standard web security vulnerability scanner and proxy tool for security researchers.",
            websiteUrl = "https://portswigger.net/burp",
            category = "Cybersecurity Tools",
            rating = 4.9f,
            isFree = true,
            badgeText = "Community & Pro",
            pros = "Interceptor proxy, repeater, extensibility, BApp store",
            cons = "Pro license required for automated scanner",
            iconName = "security"
        ),
        ToolItem(
            id = "tool-5",
            name = "Figma",
            description = "Collaborative web-based interface design tool for UI/UX teams with real-time editing and prototyping.",
            websiteUrl = "https://figma.com",
            category = "Design Tools",
            rating = 4.9f,
            isFree = true,
            badgeText = "Free Tier Available",
            pros = "Auto-layout, variables, dev mode, extensive plugin ecosystem",
            cons = "Limited draft files on free plan",
            iconName = "dashboard"
        ),
        ToolItem(
            id = "tool-6",
            name = "Docker Desktop",
            description = "Containerization platform to build, share, and run applications in lightweight isolated environments.",
            websiteUrl = "https://docker.com",
            category = "Developer Tools",
            rating = 4.7f,
            isFree = true,
            badgeText = "Free Personal",
            pros = "Consistent runtime, compose support, wide image repository",
            cons = "Resource heavy on older laptops",
            iconName = "dns"
        )
    )

    fun getInitialRedirects(): List<RedirectLink> = listOf(
        RedirectLink(
            id = "red-1",
            slug = "chatgpt",
            destinationUrl = "https://chatgpt.com",
            title = "ChatGPT Official Workspace",
            description = "Direct official link to access ChatGPT AI assistant mentioned in recent YouTube tutorial.",
            clicks = 1840,
            category = "AI Resources"
        ),
        RedirectLink(
            id = "red-2",
            slug = "canva",
            destinationUrl = "https://canva.com",
            title = "Canva Graphic Design Studio",
            description = "Access Canva templates and design toolkits featured in my Instagram and TikTok posts.",
            clicks = 1420,
            category = "Design Tools"
        ),
        RedirectLink(
            id = "red-3",
            slug = "github",
            destinationUrl = "https://github.com/philemon",
            title = "Acarpo Official GitHub Repositories",
            description = "Explore open source code, project templates, and cybersecurity scripts.",
            clicks = 3210,
            category = "Code Repositories"
        ),
        RedirectLink(
            id = "red-4",
            slug = "linux",
            destinationUrl = "https://www.kernel.org",
            title = "Linux Kernel & Distro Resources",
            description = "Download official Linux ISOs and terminal configuration guides.",
            clicks = 980,
            category = "Cybersecurity & OS"
        ),
        RedirectLink(
            id = "red-5",
            slug = "burpsuite",
            destinationUrl = "https://portswigger.net/burp/communitydownload",
            title = "Burp Suite Community Edition",
            description = "Download the official security testing framework for ethical hacking walkthroughs.",
            clicks = 2150,
            category = "Cybersecurity"
        )
    )

    fun getInitialCyberNotes(): List<CyberNote> = listOf(
        CyberNote(
            id = "cn-1",
            title = "Nmap Network Reconnaissance Cheatsheet",
            category = "Cheatsheet",
            content = """# Nmap Essential Commands
nmap -sV -sC -p- 10.10.10.1 # Full TCP port scan with scripts & version detection
nmap -sU --top-ports 20 10.10.10.1 # Fast UDP top 20 ports scan
nmap -sn 192.168.1.0/24 # Ping sweep subnet discovery
nmap --script vuln 10.10.10.1 # Run basic vulnerability scripts""",
            difficulty = "Beginner",
            tags = "Nmap, Recon, Networking"
        ),
        CyberNote(
            id = "cn-2",
            title = "Burp Suite Repeater & Interceptor Workflow",
            category = "Cheatsheet",
            content = """# Burp Suite Key Highlights
1. Proxy Tab -> Intercept On to capture incoming HTTP requests
2. Ctrl+R (or Cmd+R) -> Send captured request to Repeater
3. Modify headers (e.g. X-Forwarded-For, Authorization Bearer)
4. Use Intruder for payload fuzzing (Sniper or Pitchfork attack type)""",
            difficulty = "Intermediate",
            tags = "Burp Suite, Web Security"
        ),
        CyberNote(
            id = "cn-3",
            title = "Linux Security & Terminal Commands Matrix",
            category = "Cheatsheet",
            content = """# Essential Linux Commands
chmod 600 id_rsa # Restrict SSH key permissions
find / -perm -u=s -type f 2>/dev/null # Find SUID binaries for privilege escalation audit
sudo netstat -tulpn # List listening network services and PID
grep -i -r "password" /var/log/ # Search sensitive log files""",
            difficulty = "Beginner",
            tags = "Linux, Sysadmin, CLI"
        ),
        CyberNote(
            id = "cn-4",
            title = "HTB / TryHackMe CTF Walkthrough: HackTheBox Lame",
            category = "CTF Walkthroughs",
            content = """# HackTheBox - Lame Lab Notes
Target IP: 10.10.10.3
Service Scan: Samba 3.0.20 listening on port 139/445
Exploitation: Samba username map script vulnerability (CVE-2007-2447)
Payload: smbclient //10.10.10.3/tmp with nohup payload
Result: Root privilege shell achieved.""",
            difficulty = "Intermediate",
            tags = "CTF, Samba, Metasploit"
        )
    )
}
