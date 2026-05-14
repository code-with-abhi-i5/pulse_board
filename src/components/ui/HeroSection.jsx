import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { FiCloud, FiTrendingUp, FiFileText, FiSmile, FiArrowRight, FiZap } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import { getGreeting } from '../../utils/helpers'

// Animated floating orb
function FloatingOrb({ size, color, x, y, delay, duration }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size, height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        left: x, top: y,
        filter: 'blur(40px)',
      }}
      animate={{
        x: [0, 30, -20, 15, 0],
        y: [0, -25, 15, -10, 0],
        scale: [1, 1.2, 0.9, 1.1, 1],
        opacity: [0.4, 0.6, 0.3, 0.5, 0.4],
      }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}

// Animated stat card
function StatPill({ icon: Icon, label, value, color, delay }) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, type: 'spring', stiffness: 200 }}
      className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl backdrop-blur-xl border transition-all hover:scale-105 cursor-default ${
        isDark
          ? 'bg-white/[0.04] border-white/[0.08] hover:bg-white/[0.07]'
          : 'bg-white/60 border-white/40 shadow-lg shadow-black/5 hover:bg-white/80'
      }`}
    >
      <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg`}>
        <Icon className="w-4 h-4 text-white" />
      </div>
      <div>
        <p className={`text-[10px] font-medium uppercase tracking-wider ${isDark ? 'text-surface-500' : 'text-surface-400'}`}>{label}</p>
        <p className="text-sm font-bold">{value}</p>
      </div>
    </motion.div>
  )
}

// Grid pattern
function GridPattern() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  return (
    <div className="absolute inset-0 overflow-hidden opacity-[0.03]" aria-hidden>
      <svg width="100%" height="100%">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke={isDark ? '#fff' : '#000'} strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  )
}

export default function HeroSection({ weatherTemp, btcPrice, newsCount }) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [clock, setClock] = useState(new Date())

  useEffect(() => {
    const t = setInterval(() => setClock(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const greeting = getGreeting()
  const dateStr = clock.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
  const timeStr = clock.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })

  const orbs = useMemo(() => [
    { size: 300, color: 'rgba(99,102,241,0.3)', x: '10%', y: '-10%', delay: 0, duration: 12 },
    { size: 250, color: 'rgba(6,182,212,0.25)', x: '60%', y: '20%', delay: 2, duration: 15 },
    { size: 200, color: 'rgba(168,85,247,0.2)', x: '80%', y: '-20%', delay: 4, duration: 18 },
    { size: 180, color: 'rgba(236,72,153,0.15)', x: '30%', y: '60%', delay: 1, duration: 14 },
    { size: 150, color: 'rgba(16,185,129,0.15)', x: '0%', y: '40%', delay: 3, duration: 16 },
  ], [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className={`relative overflow-hidden rounded-3xl border ${
        isDark
          ? 'bg-gradient-to-br from-surface-900 via-surface-950 to-primary-950/50 border-white/[0.06]'
          : 'bg-gradient-to-br from-white via-primary-50/50 to-accent-50/30 border-surface-200'
      }`}
    >
      {/* Animated orbs */}
      {orbs.map((orb, i) => <FloatingOrb key={i} {...orb} />)}

      {/* Grid pattern */}
      <GridPattern />

      {/* Gradient mesh overlay */}
      <div className={`absolute inset-0 ${
        isDark
          ? 'bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.08),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(6,182,212,0.06),transparent_50%)]'
          : 'bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.06),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(6,182,212,0.04),transparent_50%)]'
      }`} />

      {/* Content */}
      <div className="relative z-10 px-6 py-10 md:px-10 md:py-14 lg:px-14 lg:py-16">
        {/* Top bar: date + time */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap items-center gap-3 mb-8"
        >
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-medium backdrop-blur-md border ${
            isDark ? 'bg-white/[0.04] border-white/[0.08] text-surface-300' : 'bg-white/60 border-white/30 text-surface-600 shadow-sm'
          }`}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>{dateStr}</span>
          </div>
          <div className={`px-3 py-1.5 rounded-full text-[11px] font-mono font-medium backdrop-blur-md border tabular-nums ${
            isDark ? 'bg-white/[0.04] border-white/[0.08] text-primary-300' : 'bg-white/60 border-white/30 text-primary-600 shadow-sm'
          }`}>
            {timeStr}
          </div>
        </motion.div>

        {/* Main heading */}
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-xl shadow-primary-500/20"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <FiZap className="w-5 h-5 text-white" />
              </motion.div>
              <span className={`text-xs font-bold uppercase tracking-[0.2em] ${isDark ? 'text-primary-400' : 'text-primary-600'}`}>
                Pulse Board
              </span>
            </div>
            
            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mt-4 flex justify-center lg:justify-start"
            >
              <span className={`px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide border shadow-sm ${
                isDark 
                  ? 'bg-primary-500/10 border-primary-500/30 text-primary-300' 
                  : 'bg-primary-50 border-primary-200 text-primary-700'
              }`}>
                ✨ Your world, one dashboard
              </span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight mb-4">
              {greeting},{' '}
              <span className="relative inline-block">
                <span className="gradient-text">Explorer</span>
                <motion.span
                  className="absolute -bottom-1 left-0 right-0 h-1 rounded-full bg-gradient-to-r from-primary-500 to-accent-500"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.6, ease: 'easeOut' }}
                  style={{ originX: 0 }}
                />
              </span>{' '}
              <motion.span
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, type: 'spring', stiffness: 300 }}
                className="inline-block"
              >
                👋
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className={`text-base md:text-lg leading-relaxed max-w-xl ${isDark ? 'text-surface-400' : 'text-surface-500'}`}
            >
              Your all-in-one command center. Track weather, markets, news, and
              unwind with jokes — all in one{' '}
              <span className={`font-semibold ${isDark ? 'text-white' : 'text-surface-800'}`}>beautiful dashboard</span>.
            </motion.p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap gap-3 mt-8"
          >
            <Link to="/crypto">
              <motion.button
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                className="group px-6 py-3 rounded-2xl bg-gradient-to-r from-primary-500 to-accent-500 text-white text-sm font-semibold shadow-xl shadow-primary-500/20 flex items-center gap-2 transition-shadow hover:shadow-2xl hover:shadow-primary-500/30"
              >
                Explore Markets
                <FiArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </motion.button>
            </Link>
            <Link to="/weather">
              <motion.button
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                className={`px-6 py-3 rounded-2xl text-sm font-semibold flex items-center gap-2 border backdrop-blur-md transition-all ${
                  isDark
                    ? 'bg-white/[0.04] border-white/[0.1] text-white hover:bg-white/[0.08]'
                    : 'bg-white/70 border-surface-200 text-surface-700 hover:bg-white shadow-md'
                }`}
              >
                <FiCloud className="w-4 h-4" />
                Check Weather
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Floating stat pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="flex flex-wrap gap-3 mt-10"
        >
          <StatPill icon={FiCloud} label="Weather" value={weatherTemp || '—'} color="from-blue-500 to-cyan-400" delay={1.0} />
          <StatPill icon={FiTrendingUp} label="Bitcoin" value={btcPrice || '—'} color="from-amber-500 to-orange-400" delay={1.1} />
          <StatPill icon={FiFileText} label="Headlines" value={newsCount ? `${newsCount}+` : '—'} color="from-purple-500 to-pink-400" delay={1.2} />
          <StatPill icon={FiSmile} label="Jokes" value="∞" color="from-emerald-500 to-teal-400" delay={1.3} />
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className={`absolute bottom-0 left-0 right-0 h-20 pointer-events-none ${
        isDark
          ? 'bg-gradient-to-t from-surface-950 to-transparent'
          : 'bg-gradient-to-t from-surface-100 to-transparent'
      }`} />
    </motion.div>
  )
}
