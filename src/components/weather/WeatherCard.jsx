import { motion } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'
import { formatTemp, getWeatherIconUrl, getWeatherGradient } from '../../utils/helpers'

export default function WeatherCard({ weather, compact = false }) {
  const { theme } = useTheme()
  if (!weather) return null

  const weatherId = weather.weather?.[0]?.id
  const gradient = getWeatherGradient(weatherId)
  const iconUrl = getWeatherIconUrl(weather.weather?.[0]?.icon || '01d')

  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`glass-card p-4 flex items-center gap-4 ${
          theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-white'
        } transition-all cursor-default`}
      >
        <img src={iconUrl} alt="weather" className="w-12 h-12" />
        <div>
          <p className="text-2xl font-bold">{formatTemp(weather.main.temp)}</p>
          <p className={`text-xs ${theme === 'dark' ? 'text-surface-400' : 'text-surface-500'}`}>
            {weather.name}, {weather.sys?.country}
          </p>
        </div>
        <div className={`ml-auto text-right text-xs ${theme === 'dark' ? 'text-surface-400' : 'text-surface-500'}`}>
          <p className="capitalize">{weather.weather[0].description}</p>
          <p>Feels like {formatTemp(weather.main.feels_like)}</p>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${gradient} p-6 md:p-8 text-white shadow-2xl`}
    >
      {/* Background decoration */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/5 rounded-full blur-2xl" />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <p className="text-white/70 text-sm font-medium mb-1">Current Weather</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-1">{weather.name}, {weather.sys?.country}</h2>
          <p className="text-white/80 capitalize text-sm">{weather.weather[0].description}</p>
        </div>
        <div className="flex items-center gap-4">
          <motion.img
            src={iconUrl}
            alt={weather.weather[0].description}
            className="w-20 h-20 md:w-24 md:h-24 drop-shadow-lg"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="text-right">
            <p className="text-5xl md:text-6xl font-bold tracking-tight">{formatTemp(weather.main.temp)}</p>
            <p className="text-white/70 text-sm">Feels like {formatTemp(weather.main.feels_like)}</p>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/20">
        {[
          { label: 'Humidity', value: `${weather.main.humidity}%` },
          { label: 'Wind', value: `${weather.wind.speed} m/s` },
          { label: 'Pressure', value: `${weather.main.pressure} hPa` },
          { label: 'Visibility', value: `${(weather.visibility / 1000).toFixed(1)} km` },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-white/60 text-xs mb-1">{stat.label}</p>
            <p className="text-lg font-semibold">{stat.value}</p>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
