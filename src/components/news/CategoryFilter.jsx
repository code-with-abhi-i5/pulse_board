import { motion } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'
import { NEWS_CATEGORIES } from '../../utils/constants'

export default function CategoryFilter({ active, onChange }) {
  const { theme } = useTheme()

  return (
    <div className="flex flex-wrap gap-2">
      {NEWS_CATEGORIES.map((cat) => {
        const isActive = active === cat.id
        return (
          <motion.button
            key={cat.id}
            onClick={() => onChange(cat.id)}
            whileTap={{ scale: 0.95 }}
            className={`relative px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
              isActive
                ? 'text-white shadow-lg'
                : theme === 'dark'
                  ? 'text-surface-400 hover:text-white bg-white/5 hover:bg-white/10'
                  : 'text-surface-500 hover:text-surface-900 bg-surface-100 hover:bg-surface-200'
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="category-active"
                className="absolute inset-0 bg-gradient-to-r from-primary-500 to-accent-500 rounded-xl"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              <span>{cat.emoji}</span>
              <span>{cat.label}</span>
            </span>
          </motion.button>
        )
      })}
    </div>
  )
}
