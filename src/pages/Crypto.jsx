import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiRefreshCw, FiGrid, FiList } from 'react-icons/fi'
import { useTheme } from '../context/ThemeContext'
import { useCrypto } from '../hooks/useCrypto'
import CryptoTable from '../components/crypto/CryptoTable'
import CryptoCard from '../components/crypto/CryptoCard'
import { SkeletonGrid } from '../components/ui/Skeleton'
import ErrorMessage from '../components/ui/ErrorMessage'

export default function Crypto() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const { coins, trending, loading, error, refresh } = useCrypto()
  const [view, setView] = useState('table')

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-1">💰 Crypto Markets</h1>
          <p className={`text-sm ${isDark ? 'text-surface-400' : 'text-surface-500'}`}>Track top cryptocurrencies in real-time</p>
        </div>
        <div className="flex items-center gap-3">
          <div className={`flex rounded-xl overflow-hidden ${isDark ? 'bg-white/5' : 'bg-surface-100'}`}>
            <button onClick={() => setView('table')} className={`px-3 py-2 text-xs font-medium transition-colors ${view === 'table' ? 'bg-primary-500 text-white' : isDark ? 'text-surface-400' : 'text-surface-500'}`}>
              <FiList className="w-4 h-4" />
            </button>
            <button onClick={() => setView('grid')} className={`px-3 py-2 text-xs font-medium transition-colors ${view === 'grid' ? 'bg-primary-500 text-white' : isDark ? 'text-surface-400' : 'text-surface-500'}`}>
              <FiGrid className="w-4 h-4" />
            </button>
          </div>
          <motion.button whileTap={{ scale: 0.95 }} onClick={refresh} disabled={loading}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 text-white text-xs font-semibold shadow-lg flex items-center gap-2 disabled:opacity-50">
            <FiRefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} /> Refresh
          </motion.button>
        </div>
      </motion.div>

      {/* Trending */}
      {trending.length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
          <h2 className="text-sm font-semibold mb-3 flex items-center gap-2">🔥 Trending</h2>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {trending.map((t) => {
              const item = t.item
              return (
                <div key={item.id} className={`glass-card p-3 flex items-center gap-3 shrink-0 min-w-[180px] ${isDark ? 'hover:bg-white/5' : 'hover:shadow-md'} transition-all`}>
                  <img src={item.small || item.thumb} alt={item.name} className="w-7 h-7 rounded-full" />
                  <div>
                    <p className="text-xs font-semibold">{item.name}</p>
                    <p className={`text-[10px] uppercase ${isDark ? 'text-surface-500' : 'text-surface-400'}`}>{item.symbol}</p>
                  </div>
                  <span className={`ml-auto text-[10px] font-bold px-2 py-0.5 rounded-md ${isDark ? 'bg-white/5 text-surface-300' : 'bg-surface-100 text-surface-600'}`}>
                    #{item.market_cap_rank || '—'}
                  </span>
                </div>
              )
            })}
          </div>
        </motion.div>
      )}

      {error && <ErrorMessage message={error} onRetry={refresh} />}

      {/* Coins */}
      {loading && coins.length === 0 ? (
        <SkeletonGrid count={6} />
      ) : view === 'table' ? (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <CryptoTable coins={coins} />
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {coins.map((coin, i) => <CryptoCard key={coin.id} coin={coin} index={i} />)}
        </div>
      )}
    </div>
  )
}
