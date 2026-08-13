import { createContext, useContext } from 'react'

export type Theme = 'light' | 'dark'

export interface TransitionOrigin {
  x: number
  y: number
}

interface ThemeContextValue {
  theme: Theme
  toggleTheme: (origin?: TransitionOrigin) => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)
export const storageKey = 'marvin-theme'

export function getInitialTheme(): Theme {
  try {
    const savedTheme = window.localStorage.getItem(storageKey)
    if (savedTheme === 'dark') return 'dark'
    if (savedTheme === 'light' || savedTheme === 'light-gray') return 'light'
  } catch {
    // Storage can be unavailable in strict privacy modes; OS preference remains a safe default.
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within ThemeProvider')
  return context
}
