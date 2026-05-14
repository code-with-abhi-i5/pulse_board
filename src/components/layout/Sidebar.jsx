import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiHome, FiCloud, FiFileText, FiSmile, FiTrendingUp, FiX, FiGithub } from 'react-icons/fi'
import { useTheme } from '../../context/ThemeContext'

const navItems = [
  { path: '/', label: 'Dashboard', icon: FiHome },
  { path: '/weather', label: 'Weather', icon: FiCloud },
  { path: '/news', label: 'News', icon: FiFileText },
  { path: '/jokes', label: 'Jokes', icon: FiSmile },
  { path: '/crypto', label: 'Crypto', icon: FiTrendingUp },
]

export default function Sidebar({ isOpen, onClose }) {
  const { theme } = useTheme()
  const location = useLocation()

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`fixed top-16 left-0 z-50 h-[calc(100vh-4rem)] w-64 flex flex-col transition-transform duration-300 ease-in-out border-r ${
        theme === 'dark'
          ? 'bg-surface-950/95 backdrop-blur-xl border-white/5'
          : 'bg-white/95 backdrop-blur-xl border-surface-200'
      } ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        {/* Mobile close button */}
        <div className="flex items-center justify-end p-3 lg:hidden">
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/5 transition-colors">
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          <p className={`text-[10px] font-semibold uppercase tracking-widest px-3 mb-3 ${
            theme === 'dark' ? 'text-surface-500' : 'text-surface-400'
          }`}>
            Navigation
          </p>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className="relative block"
              >
                <div className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? theme === 'dark'
                      ? 'text-white'
                      : 'text-primary-700'
                    : theme === 'dark'
                      ? 'text-surface-400 hover:text-white hover:bg-white/5'
                      : 'text-surface-500 hover:text-surface-900 hover:bg-surface-100'
                }`}>
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active"
                      className={`absolute inset-0 rounded-xl ${
                        theme === 'dark'
                          ? 'bg-gradient-to-r from-primary-500/15 to-accent-500/10 border border-primary-500/20'
                          : 'bg-primary-50 border border-primary-200'
                      }`}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <item.icon className={`w-5 h-5 relative z-10 ${isActive ? 'text-primary-400' : ''}`} />
                  <span className="relative z-10">{item.label}</span>
                  {isActive && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-400 relative z-10" />
                  )}
                </div>
              </NavLink>
            )
          })}
        </nav>

        {/* Footer section */}
        <div className={`p-4 border-t ${theme === 'dark' ? 'border-white/5' : 'border-surface-200'}`}>
          <div className={`rounded-xl p-4 ${
            theme === 'dark'
              ? 'bg-gradient-to-br from-primary-500/10 to-accent-500/5 border border-primary-500/10'
              : 'bg-gradient-to-br from-primary-50 to-accent-50 border border-primary-100'
          }`}>
            <p className="text-xs font-semibold mb-1">FusionBoard v1.0</p>
            <p className={`text-[11px] ${theme === 'dark' ? 'text-surface-400' : 'text-surface-500'}`}>
              Multi-API Dashboard
            </p>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className={`inline-flex items-center gap-1.5 text-[11px] mt-2 ${
                theme === 'dark' ? 'text-primary-400 hover:text-primary-300' : 'text-primary-600 hover:text-primary-500'
              } transition-colors`}
            >
              <FiGithub className="w-3 h-3" /> View on GitHub
            </a>
          </div>
        </div>
      </aside>
    </>
  )
}
