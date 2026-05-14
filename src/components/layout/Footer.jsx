import { useTheme } from '../../context/ThemeContext'

export default function Footer() {
  const { theme } = useTheme()
  return (
    <footer className={`ml-0 lg:ml-64 py-6 px-6 text-center text-xs border-t transition-colors ${
      theme === 'dark'
        ? 'text-surface-500 border-white/5'
        : 'text-surface-400 border-surface-200'
    }`}>
      <p>© {new Date().getFullYear()} <span className="gradient-text font-semibold">FusionBoard</span>. Built with React, Tailwind CSS & ❤️</p>
    </footer>
  )
}
