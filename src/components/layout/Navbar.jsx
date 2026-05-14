import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiMenu, FiSearch, FiX } from 'react-icons/fi'
import { motion } from 'framer-motion'
import ThemeToggle from '../ui/ThemeToggle'
import { useTheme } from '../../context/ThemeContext'

export default function Navbar({ onMenuToggle }) {
  const { theme } = useTheme()
  const [clock, setClock] = useState(new Date())
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => setClock(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <nav className={`sticky top-0 z-40 h-16 flex items-center justify-between px-4 md:px-6 backdrop-blur-xl border-b transition-colors duration-300 ${
      theme === 'dark'
        ? 'bg-surface-950/80 border-white/5'
        : 'bg-white/80 border-surface-200'
    }`}>
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          id="menu-toggle"
          onClick={onMenuToggle}
          className="lg:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
          aria-label="Toggle menu"
        >
          <FiMenu className="w-5 h-5" />
        </button>
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-sm">F</span>
          </div>
          <span className="font-bold text-lg tracking-tight hidden sm:block">
            <span className="gradient-text">Fusion</span>
            <span className={theme === 'dark' ? 'text-white' : 'text-surface-900'}>Board</span>
          </span>
        </Link>
      </div>

      {/* Center - Clock */}
      <div className={`hidden md:flex items-center gap-2 text-sm font-medium ${
        theme === 'dark' ? 'text-surface-400' : 'text-surface-500'
      }`}>
        <span className="tabular-nums">
          {clock.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
        </span>
        <span className="text-primary-500">•</span>
        <span className="tabular-nums">
          {clock.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
        </span>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <div className={`hidden md:flex items-center text-xs font-medium px-3 py-1.5 rounded-full ${
          theme === 'dark' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-50 text-emerald-600'
        }`}>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-2 animate-pulse" />
          Live
        </div>
      </div>
    </nav>
  )
}
