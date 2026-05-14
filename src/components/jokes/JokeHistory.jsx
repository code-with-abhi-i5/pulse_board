import { motion } from 'framer-motion'
import { FiHeart, FiClock } from 'react-icons/fi'
import { useTheme } from '../../context/ThemeContext'

export default function JokeHistory({ history, favorites, showFavorites, onToggle }) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const items = showFavorites ? favorites : history

  return (
    <div className="glass-card p-4">
      <div className="flex items-center gap-2 mb-4">
        <button onClick={() => onToggle(false)}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
            !showFavorites ? 'bg-primary-500/20 text-primary-400' : isDark ? 'text-surface-400 hover:bg-white/5' : 'text-surface-500 hover:bg-surface-100'
          }`}>
          <FiClock className="w-3 h-3 inline mr-1" /> History
        </button>
        <button onClick={() => onToggle(true)}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
            showFavorites ? 'bg-red-500/20 text-red-400' : isDark ? 'text-surface-400 hover:bg-white/5' : 'text-surface-500 hover:bg-surface-100'
          }`}>
          <FiHeart className="w-3 h-3 inline mr-1" /> Favorites ({favorites.length})
        </button>
      </div>
      <div className="space-y-2 max-h-[400px] overflow-y-auto">
        {items.length === 0 ? (
          <p className={`text-xs text-center py-6 ${isDark ? 'text-surface-500' : 'text-surface-400'}`}>
            {showFavorites ? 'No favorites yet' : 'No jokes yet'}
          </p>
        ) : (
          items.map((j, i) => (
            <motion.div key={`${j.id}-${i}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className={`p-3 rounded-lg text-xs leading-relaxed ${isDark ? 'bg-white/3 hover:bg-white/5' : 'bg-surface-50 hover:bg-surface-100'} transition-colors`}>
              <span className={`text-[10px] font-bold uppercase ${isDark ? 'text-primary-400' : 'text-primary-600'}`}>{j.category}</span>
              <p className="mt-1 line-clamp-2">{j.text}</p>
            </motion.div>
          ))
        )}
      </div>
    </div>
  )
}
