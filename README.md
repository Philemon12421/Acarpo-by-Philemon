<div align="center">

```
   █████╗  ██████╗█████╗ ██████╗ ██████╗  ██████╗ 
  ██╔══██╗██╔════╝██╔══██╗██╔══██╗██╔══██╗██╔═══██╗
  ███████║██║     ███████║██████╔╝██████╔╝██║   ██║
  ██╔══██║██║     ██╔══██║██╔══██╗██╔═══╝ ██║   ██║
  ██║  ██║╚██████╗██║  ██║██║  ██║██║     ╚██████╔╝
  ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝      ╚═════╝ 
                 BY PHILEMON
```

# 🚀 Acarpo by Philemon — Progressive Web Application & Hub

<p align="center">
  <b>A Modern Production-Grade Web Application & Developer Ecosystem</b>
</p>

[![Typing SVG](https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=600&size=20&duration=3000&pause=1000&color=2563EB&center=true&vCenter=true&width=500&lines=Welcome+to+Acarpo+by+Philemon;Software+Engineering+%26+Architecture;AI+Tools+%26+Gemini+Integrations;Cybersecurity+Labs+%26+CTF+Notes;Dynamic+Redirects+%26+Link+Shortener;Full-Stack+Web+App+PWA+Hub)](https://git.io/typing-svg)

<br/>

[![Build Status](https://img.shields.io/badge/Build-Passing-10B981?style=for-the-badge&logo=githubactions&logoColor=white)](https://github.com/philemon)
[![Web App](https://img.shields.io/badge/PWA-Ready-3B82F6?style=for-the-badge&logo=pwa&logoColor=white)](https://acarpo.app)
[![Kotlin](https://img.shields.io/badge/Kotlin-2.0.0-7F52FF?style=for-the-badge&logo=kotlin&logoColor=white)](https://kotlinlang.org)
[![Jetpack Compose](https://img.shields.io/badge/Compose-M3-4285F4?style=for-the-badge&logo=android&logoColor=white)](https://developer.android.com/jetpack/compose)
[![Room DB](https://img.shields.io/badge/Room-Database-FF6F00?style=for-the-badge&logo=sqlite&logoColor=white)](https://developer.android.com/training/data-storage/room)
[![License](https://img.shields.io/badge/License-MIT-F59E0B?style=for-the-badge&logo=open-source-initiative&logoColor=white)](LICENSE)

</div>

---

## 🌟 Overview

**Acarpo by Philemon** is an all-in-one Progressive Web Application (PWA) and digital hub engineered for developers, security researchers, graphic designers, and tech creators. Built with modern Kotlin, Jetpack Compose, Material Design 3, and Room local persistence, Acarpo serves as a high-speed central web app for technical articles, AI tool curation, cybersecurity labs, link redirects (`acarpo.app/go/`), and an embedded content creator dashboard.

---

## ✨ Key Features

```
┌─────────────────────────────────────────────────────────────────────────┐
│                      ACARPO WEB APP ARCHITECTURE                        │
├────────────────────────────────┬────────────────────────────────────────┤
│ 🌐 PWA & Web Browser Simulator │ Active URL bar, SSL status, PWA badge  │
│ 📰 Production Article Engine  │ Category tabs, reading progress, FAQs  │
│ 🛠️ Developer Tools Directory   │ Ratings, pros/cons, direct URL launches│
│ 🔗 Link Hub & Shortener (/go)  │ Analytics view count, quick clip copy  │
│ 🛡️ Cybersecurity & CTF Labs   │ OWASP Top 10, Nmap, Burp Suite notes   │
│ ⚡ Admin Creator Panel         │ In-app post, tool & redirect publisher  │
└────────────────────────────────┴────────────────────────────────────────┘
```

### 1. 🌐 Interactive Web Application Experience
- **PWA Address Bar Indicator**: Real-time URL synchronization (`https://acarpo.app/{screen}`) with SSL lock and PWA active indicators.
- **Responsive Layout**: Designed mobile-first with adaptive wide-screen layout support for desktop, tablets, and mobile devices.

### 2. 📰 Dynamic Tech Articles & Code Snippets
- **Multi-Category Hubs**: Software Engineering (Next.js, Microservices, DevOps), Graphic Design (Figma, Typography, Golden Ratio), Artificial Intelligence (Gemini 3 Flash, Function Calling), Cybersecurity (OWASP, Burp Suite), and Productivity.
- **Rich Content Viewer**: Interactive code blocks with single-tap copy, reading progress indicator, Q&A FAQ accordions, and comment section.

### 3. 🛠️ AI & Developer Tools Directory
- Curated index of industry-leading software tools (ChatGPT, Google AI Studio, Canva, Burp Suite, Docker, Figma).
- Interactive filter chips, rating badges, pros/cons breakdowns, and direct launch links.

### 4. 🔗 Link Hub & Redirect Shortener (`/go/{slug}`)
- High-conversion link hub designed for YouTube, TikTok, and social media traffic redirection.
- Real-time click counters, clipboard sharing, and detailed redirection preview pages.

### 5. 🛡️ Cybersecurity & Authorized Testing Lab
- Comprehensive cybersecurity notes, CTF walkthroughs, cheat sheets (Nmap, Burp Suite, Linux privilege escalation), and OWASP remediation guidelines.
- Mandatory legal and authorized testing disclaimers.

### 6. ⚡ Admin Creator Dashboard
- Fully functional local CMS to publish new articles, create short links, register tools, and view newsletter subscribers stored locally in Room SQLite database.

---

## 🛠️ Technology Stack

| Component | Technology / Library | Description |
| :--- | :--- | :--- |
| **Language** | Kotlin 2.x | 100% Type-safe Kotlin |
| **UI Framework** | Jetpack Compose + Material 3 | Modern declarative UI design system |
| **State Management** | StateFlow + ViewModel | Reactive architecture with lifecycle awareness |
| **Database** | Room SQLite Persistence | Offline-first local data caching and management |
| **Asynchrony** | Kotlin Coroutines & Flow | Non-blocking reactive background operations |
| **Navigation** | Custom Screen Navigation | Fast stateful backstack routing |
| **Target Runtime** | Android & Web App Simulator | Edge-to-edge support with custom window insets |

---

## 📁 Project Directory Structure

```
Acarpo-by-Philemon/
├── app/
│   ├── src/
│   │   └── main/
│   │       ├── java/com/example/
│   │       │   ├── data/
│   │       │   │   ├── local/          # Room DB, Dao, Seed Data
│   │       │   │   ├── model/          # Kotlin Data Models (Article, Tool, Redirect)
│   │       │   │   └── repository/     # Data Layer Repository Pattern
│   │       │   ├── ui/
│   │       │   │   ├── components/     # Header, Footer, Cards, Search Modal
│   │       │   │   ├── screens/        # Home, Detail, Admin, Lab, Redirect, Legal
│   │       │   │   ├── theme/          # Material Design 3 Color Schemes & Typography
│   │       │   │   └── viewmodel/      # PhantoxViewModel & Screen Navigation State
│   │       │   └── MainActivity.kt     # App Entry Point & Scaffold Container
│   │       └── res/
│   │           └── values/
│   │               └── strings.xml     # Brand App Name String Resource
├── build.gradle.kts                    # Root Gradle Configuration
├── settings.gradle.kts                 # Project Settings ("Acarpo by Philemon")
├── metadata.json                       # AI Studio Platform Metadata
└── README.md                           # Documentation & Project Overview
```

---

## 🚀 Quick Start Guide

### Prerequisites
- **Android Studio** Ladybug (2024.2.1+) or newer
- **JDK**: Java 17 or Java 21
- **Gradle**: 8.x +

### Running locally
1. Clone the repository:
   ```bash
   git clone https://github.com/philemon/acarpo-web-app.git
   ```
2. Open the project directory in **Android Studio**.
3. Sync Gradle and build project:
   ```bash
   ./gradlew assembleDebug
   ```
4. Run on an Android Emulator or connected physical device.

---

## 👨‍💻 Author & Credits

Created with ❤️ by **Philemon**

- **Web App Hub**: [https://acarpo.app](https://acarpo.app)
- **Email**: [philemonkusi292@gmail.com](mailto:philemonkusi292@gmail.com)
- **GitHub**: [@philemon](https://github.com/philemon)

---

<div align="center">
  <sub>© 2026 Acarpo by Philemon. All rights reserved.</sub>
</div>
