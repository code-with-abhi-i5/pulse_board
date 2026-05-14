import { useState, useEffect, createContext, useContext, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiCheck, FiX, FiInfo, FiAlertTriangle } from 'react-icons/fi'

const ToastContext = createContext()

const icons = {
  success: <FiCheck className="w-5 h-5 text-emerald-400" />,
  error: <FiX className="w-5 h-5 text-red-400" />,
  info: <FiInfo className="w-5 h-5 text-blue-400" />,
  warning: <FiAlertTriangle className="w-5 h-5 text-amber-400" />,
}

const bgColors = {
  success: 'border-emerald-500/30',
  error: 'border-red-500/30',
  info: 'border-blue-500/30',
  warning: 'border-amber-500/30',
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((message, type = 'info', duration = 3000) => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, duration)
  }, [])

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed top-4 right-4 z-[100] space-y-2 max-w-sm">
        <AnimatePresence>
          {toasts.map(toast => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 100, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.8 }}
              className={`glass-card flex items-center gap-3 px-4 py-3 border ${bgColors[toast.type]}`}
            >
              {icons[toast.type]}
              <p className="text-sm font-medium flex-1 dark:text-white text-surface-800">{toast.message}</p>
              <button onClick={() => removeToast(toast.id)} className="text-surface-400 hover:text-white">
                <FiX className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) throw new Error('useToast must be used within ToastProvider')
  return context
}
