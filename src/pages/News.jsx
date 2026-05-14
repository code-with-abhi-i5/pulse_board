import { useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { FiSearch } from 'react-icons/fi'
import { useTheme } from '../context/ThemeContext'
import { useNews } from '../hooks/useNews'
import NewsCard from '../components/news/NewsCard'
import CategoryFilter from '../components/news/CategoryFilter'
import { SkeletonGrid } from '../components/ui/Skeleton'
import ErrorMessage from '../components/ui/ErrorMessage'
import { debounce } from '../utils/helpers'

export default function News() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const { articles, loading, error, totalResults, activeCategory, fetchByCategory, searchArticles, loadMore } = useNews()
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => { fetchByCategory('general') }, [])

  const debouncedSearch = useCallback(debounce((q) => {
    if (q.trim()) searchArticles(q)
    else fetchByCategory(activeCategory)
  }, 500), [activeCategory])

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
    debouncedSearch(e.target.value)
  }

  const handleCategoryChange = (cat) => {
    setSearchQuery('')
    fetchByCategory(cat)
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl md:text-3xl font-bold mb-2">📰 News Feed</h1>
        <p className={`text-sm ${isDark ? 'text-surface-400' : 'text-surface-500'}`}>Stay updated with the latest headlines from around the world</p>
      </motion.div>

      {/* Search */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className={`flex items-center gap-3 px-4 py-3 rounded-xl ${
          isDark ? 'bg-white/5 border border-white/10 focus-within:border-primary-500/50' : 'bg-white border border-surface-200 focus-within:border-primary-400 shadow-sm'
        }`}>
        <FiSearch className="w-4 h-4 text-surface-400" />
        <input type="text" value={searchQuery} onChange={handleSearchChange}
          placeholder="Search news..." className="w-full bg-transparent outline-none text-sm placeholder:text-surface-500" />
      </motion.div>

      {/* Categories */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <CategoryFilter active={activeCategory} onChange={handleCategoryChange} />
      </motion.div>

      {error && <ErrorMessage message={error} onRetry={() => fetchByCategory(activeCategory)} />}

      {/* Articles Grid */}
      {loading && articles.length === 0 ? (
        <SkeletonGrid count={6} />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, i) => (
              <NewsCard key={`${article.title}-${i}`} article={article} index={i} />
            ))}
          </div>
          {articles.length > 0 && articles.length < totalResults && (
            <div className="text-center pt-4">
              <motion.button whileTap={{ scale: 0.95 }} onClick={loadMore} disabled={loading}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 text-white text-sm font-semibold shadow-lg disabled:opacity-50">
                {loading ? 'Loading...' : 'Load More'}
              </motion.button>
            </div>
          )}
          {articles.length === 0 && !loading && (
            <p className="text-center text-surface-500 py-12">No articles found</p>
          )}
        </>
      )}
    </div>
  )
}
