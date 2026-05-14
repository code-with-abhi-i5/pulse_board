import { motion } from 'framer-motion'

export default function Loader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <motion.div
          className="relative w-16 h-16 mx-auto mb-4"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        >
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary-500 border-r-accent-400" />
          <div className="absolute inset-2 rounded-full border-2 border-transparent border-b-primary-400 border-l-accent-500 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
        </motion.div>
        <motion.p
          className="text-surface-400 text-sm font-medium"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Loading...
        </motion.p>
      </div>
    </div>
  )
}
