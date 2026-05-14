import { motion } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'
import { formatCurrency, formatPercentage } from '../../utils/helpers'
import SparklineChart from './SparklineChart'

export default function CryptoCard({ coin, index = 0 }) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const isPositive = coin.price_change_percentage_24h >= 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`glass-card p-5 hover:scale-[1.02] transition-all duration-300 ${isDark ? 'hover:border-white/15' : 'hover:shadow-xl'}`}
    >
      <div className="flex items-center gap-3 mb-4">
        <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full" />
        <div>
          <h4 className="text-sm font-semibold">{coin.name}</h4>
          <p className={`text-xs uppercase ${isDark ? 'text-surface-500' : 'text-surface-400'}`}>{coin.symbol}</p>
        </div>
        <span className={`ml-auto text-xs font-bold px-2 py-1 rounded-lg ${
          isPositive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
        }`}>
          {formatPercentage(coin.price_change_percentage_24h)}
        </span>
      </div>
      <p className="text-2xl font-bold mb-3">{formatCurrency(coin.current_price)}</p>
      {coin.sparkline_in_7d?.price && (
        <SparklineChart data={coin.sparkline_in_7d.price} color={isPositive ? '#10b981' : '#ef4444'} height={50} />
      )}
      <div className={`flex justify-between mt-3 text-[11px] ${isDark ? 'text-surface-500' : 'text-surface-400'}`}>
        <span>MCap: {formatCurrency(coin.market_cap, 0)}</span>
        <span>Vol: {formatCurrency(coin.total_volume, 0)}</span>
      </div>
    </motion.div>
  )
}
