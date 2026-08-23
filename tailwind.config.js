/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: {
        background: 'var(--background)', foreground: 'var(--foreground)', surface: 'var(--surface)', muted: 'var(--muted)',
        'muted-foreground': 'var(--muted-foreground)', border: 'var(--border)', primary: 'var(--primary)',
        'primary-foreground': 'var(--primary-foreground)', ring: 'var(--ring)',
        'profile-mark': 'var(--profile-mark)', 'profile-mark-foreground': 'var(--profile-mark-foreground)',
      },
      borderRadius: { card: 'var(--radius)' },
      boxShadow: { card: 'var(--shadow-card)' },
      fontFamily: {
        sans: ['Geist Variable', 'Geist', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['Geist Mono Variable', 'Geist Mono', 'ui-monospace', 'monospace'],
      },
    },
  },
}
