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

# Acarpo by Philemon

### *Progressive Web Application & Developer Ecosystem*

<p align="center">
  A high-performance, minimalist web application platform engineered for software developers, security researchers, AI practitioners, and content creators.
</p>

[![Release](https://img.shields.io/badge/Release-v2.5.0-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://acarpo.app)
[![Platform](https://img.shields.io/badge/Platform-Web%20%2F%20PWA-000000?style=for-the-badge&logo=googlechrome&logoColor=white)](https://acarpo.app)
[![Build](https://img.shields.io/badge/Build-Passing-000000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/philemon)
[![License](https://img.shields.io/badge/License-MIT-000000?style=for-the-badge&logo=opensourceinitiative&logoColor=white)](LICENSE)

---

</div>

## ───── Overview ─────

**Acarpo by Philemon** brings modern web architecture, developer tooling, security labs, AI workflow curation, and social media link redirection into a unified, high-speed application interface. Designed with a clean, high-contrast Vercel/Apple aesthetic, Acarpo serves as an edge-ready portal for engineering insights and technical resources.

---

## ───── Key Highlights ─────

- **🌐 Progressive Web Application (PWA)**: Built-in URL router (`https://acarpo.app/{route}`) with active SSL indicators and browser simulation mode.
- **⚡ Developer & AI Curation Hub**: Structured directories covering Gemini 3 Flash, Claude, ChatGPT, Docker, Figma, and security utilities.
- **🛡️ Cybersecurity & CTF Labs**: Hands-on writeups, cheat sheets (Nmap, Burp Suite, Linux privesc), and OWASP remediation guidelines.
- **🔗 Short Link Hub (`/go/{slug}`)**: High-conversion link router with click analytics and instant clipboard sharing for media channels.
- **🛠️ Embedded Creator Admin CMS**: In-app local persistence engine powered by Room DB for real-time article and redirect management.
- **🎨 Minimalist Typography & Theme**: High-contrast, accessibility-compliant Material 3 system with adaptive dark/light themes.

---

## ───── Architecture & Tech Stack ─────

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       ACARPO WEB APP SYSTEM ARCHITECTURE                    │
├──────────────────────────────────┬──────────────────────────────────────────┤
│ Core Engine                      │ Kotlin 2.0 / Jetpack Compose M3          │
│ Local Persistence                │ Room SQLite Database (Offline-First)     │
│ State & Reactive Flow            │ StateFlow / ViewModel / Coroutines       │
│ Navigation                       │ Type-Safe Custom Route Stack             │
│ Web Application Protocol         │ PWA Router / SSL Indicator / Meta Schema │
└──────────────────────────────────┴──────────────────────────────────────────┘
```

---

## ───── Getting Started ─────

### Prerequisites

- **Java Development Kit**: JDK 17 or 21
- **Gradle**: 8.x or above
- **Android Studio / Web Container**: Ladybug 2024.2.1+

### Installation & Local Run

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/philemon/acarpo-web-app.git
   cd acarpo-web-app
   ```

2. **Sync Dependencies & Compile**:
   ```bash
   ./gradlew assembleDebug
   ```

3. **Launch Project**:
   Open in Android Studio or deploy directly via web container preview.

---

## ───── Project Structure ─────

```
.
├── app/
│   └── src/main/java/com/example/
│       ├── data/             # Data Layer: Room DB, Entities & Seed Stores
│       ├── ui/
│       │   ├── components/   # Header, Footer, Cards, Web PWA Bar
│       │   ├── screens/      # Home, Articles, AI, Security, Admin, Legal
│       │   ├── theme/        # Apple/Vercel High-Contrast Palette
│       │   └── viewmodel/    # State Management Engine
│       └── MainActivity.kt   # Web App Entry Scaffold
├── metadata.json             # AI Studio Platform Metadata
└── README.md                 # System Documentation
```

---

<div align="center">

Designed & Engineered by **Philemon**  
*© 2026 Acarpo. All rights reserved.*

</div>
