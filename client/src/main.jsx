import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"
import './index.css'
import "./styles/ui.css";
import "./styles/auth.css";
import App from './App.jsx'
import { Toaster } from "react-hot-toast"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "rgba(18, 24, 44, 0.75)",
            color: "var(--text)",
            border: "1px solid rgba(255,255,255,0.14)",
            backdropFilter: "blur(12px)",
          },
        }}
      />
    </BrowserRouter>
  </StrictMode>,
)
