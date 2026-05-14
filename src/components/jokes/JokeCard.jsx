import { motion, AnimatePresence } from 'framer-motion'
import { FiCopy, FiHeart, FiShare2, FiRefreshCw } from 'react-icons/fi'
import { useTheme } from '../../context/ThemeContext'

export default function JokeCard({ joke, loading, isFavorite, onNext, onCopy, onToggleFavorite, onShare }) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <motion.div layout className={`glass-card p-6 md:p-8 relative overflow-hidden ${isDark ? '' : 'shadow-lg'}`}>
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary-500/10 to-transparent rounded-bl-full" />

      {joke && (
        <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-6 ${
          isDark ? 'bg-primary-500/10 text-primary-400' : 'bg-primary-50 text-primary-600'
        }`}>{joke.category}</span>
      )}

      <div className="relative z-10 min-h-[120px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3 w-full">
              <div className="skeleton h-4 w-3/4 mx-auto" />
              <div className="skeleton h-4 w-1/2 mx-auto" />
            </motion.div>
          ) : joke ? (
            <motion.div key={joke.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="text-center">
              {joke.setup ? (
                <>
                  <p className="text-base md:text-lg font-medium mb-4">{joke.setup}</p>
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-lg md:text-xl font-bold gradient-text">{joke.delivery}</motion.p>
                </>
              ) : (
                <p className="text-base md:text-lg font-medium">{joke.text}</p>
              )}
            </motion.div>
          ) : (
            <p className="text-surface-500 text-center">Click the button to get a joke! 😄</p>
          )}
        </AnimatePresence>
      </div>

      <div className="relative z-10 flex items-center justify-center gap-3 mt-8">
        <motion.button whileTap={{ scale: 0.95 }} onClick={onNext} disabled={loading}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 text-white text-sm font-semibold shadow-lg flex items-center gap-2 disabled:opacity-50">
          <FiRefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Next Joke
        </motion.button>
        {joke && (
          <>
            <button onClick={() => onCopy(joke.text)} className={`p-2.5 rounded-xl ${isDark ? 'bg-white/5 hover:bg-white/10 text-surface-400' : 'bg-surface-100 hover:bg-surface-200'}`}><FiCopy className="w-4 h-4" /></button>
            <button onClick={() => onToggleFavorite(joke)} className={`p-2.5 rounded-xl ${isFavorite ? 'bg-red-500/10 text-red-400' : isDark ? 'bg-white/5 hover:bg-white/10 text-surface-400' : 'bg-surface-100 hover:bg-surface-200'}`}><FiHeart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} /></button>
            <button onClick={() => onShare?.(joke.text)} className={`p-2.5 rounded-xl ${isDark ? 'bg-white/5 hover:bg-white/10 text-surface-400' : 'bg-surface-100 hover:bg-surface-200'}`}><FiShare2 className="w-4 h-4" /></button>
          </>
        )}
      </div>
    </motion.div>
  )
}
