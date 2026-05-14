import { motion } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'
import { formatTemp, formatUnixTime } from '../../utils/helpers'
import { FiSunrise, FiSunset, FiThermometer, FiDroplet, FiWind, FiEye, FiCloud } from 'react-icons/fi'

export default function WeatherDetails({ weather }) {
  const { theme } = useTheme()
  if (!weather) return null

  const details = [
    { icon: FiThermometer, label: 'Min / Max', value: `${formatTemp(weather.main.temp_min)} / ${formatTemp(weather.main.temp_max)}`, color: 'text-orange-400' },
    { icon: FiDroplet, label: 'Humidity', value: `${weather.main.humidity}%`, color: 'text-blue-400' },
    { icon: FiWind, label: 'Wind Speed', value: `${weather.wind.speed} m/s`, color: 'text-cyan-400' },
    { icon: FiEye, label: 'Visibility', value: `${(weather.visibility / 1000).toFixed(1)} km`, color: 'text-green-400' },
    { icon: FiCloud, label: 'Cloudiness', value: `${weather.clouds?.all || 0}%`, color: 'text-purple-400' },
    { icon: FiSunrise, label: 'Sunrise', value: formatUnixTime(weather.sys.sunrise), color: 'text-amber-400' },
    { icon: FiSunset, label: 'Sunset', value: formatUnixTime(weather.sys.sunset), color: 'text-rose-400' },
    { icon: FiThermometer, label: 'Pressure', value: `${weather.main.pressure} hPa`, color: 'text-indigo-400' },
  ]

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold">Weather Details</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {details.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`glass-card p-4 flex items-center gap-3 ${
              theme === 'dark' ? 'hover:bg-white/5' : 'hover:shadow-md'
            } transition-all`}
          >
            <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-white/5' : 'bg-surface-100'}`}>
              <item.icon className={`w-4 h-4 ${item.color}`} />
            </div>
            <div>
              <p className={`text-[11px] ${theme === 'dark' ? 'text-surface-400' : 'text-surface-500'}`}>{item.label}</p>
              <p className="text-sm font-semibold">{item.value}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
