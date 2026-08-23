import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { ThemeProvider } from './contexts/ThemeProvider'
import { RouterProvider } from './lib/router'
import { syncDocumentMotionPreference } from './lib/motionPreference'
import 'lenis/dist/lenis.css'
import './index.css'

syncDocumentMotionPreference()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </RouterProvider>
  </StrictMode>,
)
