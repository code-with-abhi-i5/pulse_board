import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowRight } from 'react-icons/fi'
import { useTheme } from '../context/ThemeContext'
import { useWeather } from '../hooks/useWeather'
import { useCrypto } from '../hooks/useCrypto'
import { useNews } from '../hooks/useNews'
import { useJokes } from '../hooks/useJokes'
import { formatTemp, formatCurrency, formatPercentage, timeAgo } from '../utils/helpers'
import HeroSection from '../components/ui/HeroSection'
import WeatherCard from '../components/weather/WeatherCard'
import NewsCard from '../components/news/NewsCard'
import { SkeletonCard } from '../components/ui/Skeleton'

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }

export default function Home() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const { weather } = useWeather()
  const { coins } = useCrypto()
  const { articles, fetchByCategory } = useNews()
  const { joke, getJoke } = useJokes()

  useEffect(() => {
    fetchByCategory('general', 1)
    getJoke('Any')
  }, [])

  const topCoins = coins.slice(0, 4)
  const topNews = articles.slice(0, 4)

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* 🔥 Next-Level Hero */}
      <HeroSection
        weatherTemp={weather ? formatTemp(weather.main.temp) : null}
        btcPrice={topCoins[0] ? formatCurrency(topCoins[0].current_price) : null}
        newsCount={articles.length || null}
      />

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weather Widget */}
        <motion.div {...fadeUp} transition={{ delay: 0.2 }} className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">🌤️ Weather</h2>
            <Link to="/weather" className="text-xs text-primary-400 hover:text-primary-300 flex items-center gap-1">
              View all <FiArrowRight className="w-3 h-3" />
            </Link>
          </div>
          {weather ? <WeatherCard weather={weather} compact /> : <SkeletonCard />}
        </motion.div>

        {/* Random Joke */}
        <motion.div {...fadeUp} transition={{ delay: 0.3 }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">😂 Joke</h2>
            <Link to="/jokes" className="text-xs text-primary-400 hover:text-primary-300 flex items-center gap-1">
              More <FiArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className={`glass-card p-5 min-h-[100px] flex items-center ${isDark ? '' : 'shadow-sm'}`}>
            {joke ? (
              <p className="text-sm leading-relaxed">{joke.text}</p>
            ) : (
              <div className="skeleton h-4 w-3/4" />
            )}
          </div>
        </motion.div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Crypto */}
        <motion.div {...fadeUp} transition={{ delay: 0.4 }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">💰 Top Crypto</h2>
            <Link to="/crypto" className="text-xs text-primary-400 hover:text-primary-300 flex items-center gap-1">
              View all <FiArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className={`glass-card overflow-hidden ${isDark ? 'divide-y divide-white/5' : 'divide-y divide-surface-100'}`}>
            {topCoins.length > 0 ? topCoins.map((coin, i) => (
              <div key={coin.id} className={`flex items-center gap-3 p-4 ${isDark ? 'hover:bg-white/3' : 'hover:bg-surface-50'} transition-colors`}>
                <span className={`text-xs font-bold w-5 ${isDark ? 'text-surface-600' : 'text-surface-300'}`}>{i + 1}</span>
                <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold">{coin.name}</p>
                  <p className={`text-xs uppercase ${isDark ? 'text-surface-500' : 'text-surface-400'}`}>{coin.symbol}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold">{formatCurrency(coin.current_price)}</p>
                  <p className={`text-xs font-semibold ${coin.price_change_percentage_24h >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {formatPercentage(coin.price_change_percentage_24h)}
                  </p>
                </div>
              </div>
            )) : Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="p-4"><div className="skeleton h-10 w-full" /></div>
            ))}
          </div>
        </motion.div>

        {/* Latest News */}
        <motion.div {...fadeUp} transition={{ delay: 0.5 }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">📰 Latest News</h2>
            <Link to="/news" className="text-xs text-primary-400 hover:text-primary-300 flex items-center gap-1">
              View all <FiArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="glass-card overflow-hidden">
            {topNews.length > 0 ? topNews.map((a, i) => (
              <NewsCard key={`${a.title}-${i}`} article={a} index={i} compact />
            )) : Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="p-3"><div className="skeleton h-12 w-full" /></div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
