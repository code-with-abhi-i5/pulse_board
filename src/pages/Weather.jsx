import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { FiSearch } from 'react-icons/fi'
import { useTheme } from '../context/ThemeContext'
import { useWeather } from '../hooks/useWeather'
import WeatherCard from '../components/weather/WeatherCard'
import ForecastCard from '../components/weather/ForecastCard'
import WeatherDetails from '../components/weather/WeatherDetails'
import { SkeletonGrid } from '../components/ui/Skeleton'
import ErrorMessage from '../components/ui/ErrorMessage'

export default function Weather() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const { weather, forecast, loading, error, search } = useWeather()
  const [query, setQuery] = useState('')

  const handleSearch = useCallback((e) => {
    e.preventDefault()
    if (query.trim()) search(query.trim())
  }, [query, search])

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl md:text-3xl font-bold mb-2">🌦️ Weather Dashboard</h1>
        <p className={`text-sm ${isDark ? 'text-surface-400' : 'text-surface-500'}`}>Search any city for real-time weather data and forecasts</p>
      </motion.div>

      {/* Search */}
      <motion.form onSubmit={handleSearch} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className={`flex gap-3 ${isDark ? '' : ''}`}>
        <div className={`flex-1 flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
          isDark ? 'bg-white/5 border border-white/10 focus-within:border-primary-500/50' : 'bg-white border border-surface-200 focus-within:border-primary-400 shadow-sm'
        }`}>
          <FiSearch className="w-4 h-4 text-surface-400 shrink-0" />
          <input type="text" value={query} onChange={e => setQuery(e.target.value)}
            placeholder="Search city... (e.g., London, Tokyo, New York)"
            className="w-full bg-transparent outline-none text-sm placeholder:text-surface-500" />
        </div>
        <motion.button whileTap={{ scale: 0.95 }} type="submit" disabled={loading}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 text-white text-sm font-semibold shadow-lg disabled:opacity-50 shrink-0">
          {loading ? 'Searching...' : 'Search'}
        </motion.button>
      </motion.form>

      {error && <ErrorMessage message={error} onRetry={() => search(query || 'London')} />}

      {loading && !weather ? (
        <SkeletonGrid count={4} />
      ) : weather ? (
        <div className="space-y-8">
          <WeatherCard weather={weather} />
          <WeatherDetails weather={weather} />
          <ForecastCard forecast={forecast} />
        </div>
      ) : null}
    </div>
  )
}
