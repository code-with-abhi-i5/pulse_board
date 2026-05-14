import { motion } from 'framer-motion'
import { FiAlertTriangle, FiRefreshCw } from 'react-icons/fi'

export default function ErrorMessage({ message, onRetry }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 border-red-500/20 text-center"
    >
      <FiAlertTriangle className="w-8 h-8 text-red-400 mx-auto mb-3" />
      <p className="text-red-300 mb-4 text-sm">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-sm font-medium transition-colors"
        >
          <FiRefreshCw className="w-4 h-4" />
          Retry
        </button>
      )}
    </motion.div>
  )
}
