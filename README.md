# Acarpo Web - Developed by Drenchack Tech Company

A modern, high-performance React 18 + Vite + Tailwind CSS Single Page Application (SPA), configured for instant deployment on Vercel.

---

## ⚡ Deployment to Vercel

This repository is fully configured for zero-config Vercel deployment using standard Vite settings:

### Option 1: Direct GitHub + Vercel Integration (Recommended)
1. Push this repository to **GitHub**.
2. Go to [Vercel Dashboard](https://vercel.com/new).
3. Import your GitHub repository.
4. Vercel will automatically detect **Vite** and setting `buildCommand: npm run build`, `outputDirectory: dist`.
5. Click **Deploy**. Your app will be live in seconds!

### Option 2: Deploy via Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

---

## 🛠 Local Development Setup

```bash
# Install dependencies
npm install

# Start local dev server
npm run dev

# Build for production
npm run build

# Preview build locally
npm run preview
```

---

## 📁 Web Project Structure

```
.
├── index.html          # HTML Entry Point
├── package.json        # Dependencies & Scripts (Vite, React 18, Tailwind CSS)
├── vercel.json         # Vercel Configuration (dist output directory, Vite SPA routing)
├── vite.config.js      # Vite React Configuration
├── tailwind.config.js  # Tailwind CSS Theme & Styling
├── postcss.config.js   # PostCSS Config
└── src/
    ├── main.jsx        # React DOM Root
    ├── App.jsx         # Main App Component
    └── index.css       # Tailwind Directives & Global Styles
```

---

© 2026 Acarpo Web • Developed by **Drenchack Tech Company**

