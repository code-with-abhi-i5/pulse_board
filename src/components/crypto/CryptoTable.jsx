import { motion } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'
import { formatCurrency, formatPercentage } from '../../utils/helpers'
import SparklineChart from './SparklineChart'

export default function CryptoTable({ coins }) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div className="glass-card overflow-hidden">
      {/* Mobile View (Cards) */}
      <div className="md:hidden divide-y divide-surface-100 dark:divide-white/5">
        {coins.map((coin, i) => {
          const isPositive = coin.price_change_percentage_24h >= 0
          return (
            <motion.div
              key={coin.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className={`p-4 flex items-center gap-3 transition-colors ${isDark ? 'hover:bg-white/5' : 'hover:bg-surface-50'}`}
            >
              <span className={`text-xs font-bold w-4 ${isDark ? 'text-surface-500' : 'text-surface-400'}`}>{i + 1}</span>
              <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full shadow-sm" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-sm truncate">{coin.name}</p>
                  <p className="font-semibold text-sm">{formatCurrency(coin.current_price)}</p>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <p className={`text-[11px] uppercase font-medium ${isDark ? 'text-surface-500' : 'text-surface-400'}`}>{coin.symbol}</p>
                  <p className={`text-xs font-bold ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
                    {formatPercentage(coin.price_change_percentage_24h)}
                  </p>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Desktop View (Table) */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className={`text-xs uppercase tracking-wider ${isDark ? 'text-surface-500 border-b border-white/5' : 'text-surface-400 border-b border-surface-200'}`}>
              <th className="text-left p-4">#</th>
              <th className="text-left p-4">Coin</th>
              <th className="text-right p-4">Price</th>
              <th className="text-right p-4">24h</th>
              <th className="text-right p-4 hidden md:table-cell">Market Cap</th>
              <th className="text-right p-4 hidden lg:table-cell w-32">7d Chart</th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin, i) => {
              const isPositive = coin.price_change_percentage_24h >= 0
              return (
                <motion.tr key={coin.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className={`${isDark ? 'hover:bg-white/3 border-b border-white/3' : 'hover:bg-surface-50 border-b border-surface-100'} transition-colors`}
                >
                  <td className={`p-4 ${isDark ? 'text-surface-500' : 'text-surface-400'}`}>{i + 1}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={coin.image} alt={coin.name} className="w-7 h-7 rounded-full" />
                      <div>
                        <p className="font-semibold text-sm">{coin.name}</p>
                        <p className={`text-xs uppercase ${isDark ? 'text-surface-500' : 'text-surface-400'}`}>{coin.symbol}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-right font-semibold">{formatCurrency(coin.current_price)}</td>
                  <td className={`p-4 text-right font-semibold ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
                    {formatPercentage(coin.price_change_percentage_24h)}
                  </td>
                  <td className={`p-4 text-right hidden md:table-cell ${isDark ? 'text-surface-400' : 'text-surface-500'}`}>
                    {formatCurrency(coin.market_cap, 0)}
                  </td>
                  <td className="p-4 hidden lg:table-cell">
                    {coin.sparkline_in_7d?.price && (
                      <SparklineChart data={coin.sparkline_in_7d.price} color={isPositive ? '#10b981' : '#ef4444'} height={32} />
                    )}
                  </td>
                </motion.tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
