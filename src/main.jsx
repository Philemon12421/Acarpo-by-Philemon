import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css' 

// Note: BrowserRouter now lives inside App.jsx itself (wrapping AppShell),
// so this file doesn't need to import react-router-dom directly.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
