<!-- Animated Badges & Stats -->
<p align="center">
  <img src="https://img.shields.io/badge/Platform-Vercel_Serverless-black?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel Serverless" />
  <img src="https://img.shields.io/badge/Frontend-React_18_%2B_Vite-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 18" />
  <img src="https://img.shields.io/badge/Styling-Tailwind_CSS-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Backend-Node.js_API-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Status-Active_Deploy-10B981?style=for-the-badge&logo=githubactions&logoColor=white" alt="Status Active" />
</p>

</div>

---

## ⚡ Key Web Features & Serverless Architecture

```
                      +------------------------------------------+
                      |          Client Browser (React 18)       |
                      |   Vite SPA • Tailwind CSS • Responsive   |
                      +------------------------------------------+
                                           |
                                 REST API Requests (/api/*)
                                           v
                      +------------------------------------------+
                      |        Vercel Serverless Edge Engine     |
                      |        /api/health.js  •  /api/hub.js    |
                      +------------------------------------------+
```

### 🚀 Core Utilities Included
- 🛠 **JSON Formatter & Minifier**: Instant client-side JSON formatting & structure validation.
- 🔐 **Base64 Encoder / Decoder**: Real-time UTF-8 Base64 string transformer.
- 🔑 **Cryptographic Hash Engine**: MD5, SHA-1, and SHA-256 generation.
- 🧪 **Regex Pattern Evaluator**: Live regular expression match testing.
- 🎨 **Color & Gradient Generator**: Custom CSS gradient builder with instant clipboard copy.
- 🤖 **AI Prompt Studio**: Curated system prompts for code refactoring, SOLID principles, and security audits.
- 🛡 **Security Lab**: Interactive password entropy analyzer and OWASP Web Defense Checklist.
- 🌐 **Vercel Serverless Backend**: Node.js micro-functions running on Vercel (`/api/health`, `/api/hub`).

---

## ⚡ Deployment to Vercel

This project is optimized for **Vercel Serverless Platform** with zero configuration required.

### Option 1: Direct GitHub + Vercel Integration (Recommended)
1. Push this repository to **GitHub**.
2. Go to [Vercel Dashboard](https://vercel.com/new).
3. Import your GitHub repository.
4. Vercel automatically detects **Vite** and configures:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Serverless API Directory**: `api/`
5. Click **Deploy**!

### Option 2: Deploy via Vercel CLI
```bash
# Install Vercel CLI globally
npm i -g vercel

# Deploy preview environment
vercel

# Deploy production environment
vercel --prod
```

---

## 🛠 Local Development Setup

```bash
# 1. Install project dependencies
npm install

# 2. Launch Vite local development server
npm run dev

# 3. Build for production distribution
npm run build

# 4. Preview production build locally
npm run preview
```

---

## 📁 Project Structure

```
.
├── api/                # Vercel Serverless Functions (Node.js API)
│   ├── health.js       # Health Check Endpoint (/api/health)
│   └── hub.js          # Platform Metadata Endpoint (/api/hub)
├── src/
│   ├── main.jsx        # React DOM Root Entry
│   ├── App.jsx         # Main Interactive Workstation SPA Component
│   └── index.css       # Tailwind Directives & Global Dark Theme
├── index.html          # Main HTML Document Entry
├── vercel.json         # Vercel Platform Config (rewrites, framework, dist output)
├── vite.config.js      # Vite Bundler Settings
├── tailwind.config.js  # Tailwind CSS Theme Extensions
├── package.json        # Dependencies & Build Scripts
└── README.md           # Animated Documentation
```

---

<div align="center">

### 💡 Serverless API Endpoints Test

| Endpoint | Method | Description |
| :--- | :---: | :--- |
| `/api/health` | `GET` | Returns serverless runtime status and ISO timestamp |
| `/api/hub` | `GET` | Returns platform capabilities and engine metadata |

<br/>

<p align="center">
  <sub>Developed by <b>Drenchack Tech Company</b> • Powered by <b>Acarpo Web Platform &amp; Vercel Serverless</b></sub>
</p>

</div>
