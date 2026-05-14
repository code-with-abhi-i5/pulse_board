import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { useJokes } from '../hooks/useJokes'
import { JOKE_CATEGORIES } from '../utils/constants'
import JokeCard from '../components/jokes/JokeCard'
import JokeHistory from '../components/jokes/JokeHistory'

export default function Jokes() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const { joke, loading, error, favorites, history, getJoke, toggleFavorite, isFavorite, copyJoke } = useJokes()
  const [category, setCategory] = useState('Any')
  const [showFavs, setShowFavs] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => { getJoke('Any') }, [])

  const handleCopy = async (text) => {
    const ok = await copyJoke(text)
    if (ok) { setCopied(true); setTimeout(() => setCopied(false), 2000) }
  }

  const handleShare = (text) => {
    if (navigator.share) {
      navigator.share({ title: 'Check out this joke!', text })
    }
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl md:text-3xl font-bold mb-2">😂 Joke Generator</h1>
        <p className={`text-sm ${isDark ? 'text-surface-400' : 'text-surface-500'}`}>Get random jokes from various categories</p>
      </motion.div>

      {/* Category Selector */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="flex flex-wrap gap-2">
        {JOKE_CATEGORIES.map((cat) => (
          <button key={cat} onClick={() => { setCategory(cat); getJoke(cat) }}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              category === cat
                ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg'
                : isDark ? 'bg-white/5 text-surface-400 hover:bg-white/10' : 'bg-surface-100 text-surface-500 hover:bg-surface-200'
            }`}>{cat}</button>
        ))}
      </motion.div>

      {/* Copied toast */}
      {copied && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/10 text-emerald-400 text-sm font-medium">
          ✓ Copied to clipboard!
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Joke Card */}
        <div className="lg:col-span-2">
          <JokeCard
            joke={joke} loading={loading}
            isFavorite={joke ? isFavorite(joke.id) : false}
            onNext={() => getJoke(category)}
            onCopy={handleCopy}
            onToggleFavorite={toggleFavorite}
            onShare={handleShare}
          />
          {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
        </div>

        {/* History Sidebar */}
        <div>
          <JokeHistory history={history} favorites={favorites} showFavorites={showFavs} onToggle={setShowFavs} />
        </div>
      </div>
    </div>
  )
}
