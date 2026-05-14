import { motion } from 'framer-motion'
import { FiSun, FiMoon } from 'react-icons/fi'
import { useTheme } from '../../context/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <motion.button
      id="theme-toggle"
      onClick={toggleTheme}
      className={`relative w-14 h-7 rounded-full p-1 transition-colors duration-300 ${
        isDark
          ? 'bg-surface-700 border border-surface-600'
          : 'bg-primary-100 border border-primary-200'
      }`}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      <motion.div
        className={`w-5 h-5 rounded-full flex items-center justify-center ${
          isDark ? 'bg-primary-500' : 'bg-amber-400'
        }`}
        animate={{ x: isDark ? 0 : 26 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      >
        {isDark ? (
          <FiMoon className="w-3 h-3 text-white" />
        ) : (
          <FiSun className="w-3 h-3 text-white" />
        )}
      </motion.div>
    </motion.button>
  )
}
