import { motion } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'
import { formatTemp, getWeatherIconUrl } from '../../utils/helpers'

export default function ForecastCard({ forecast }) {
  const { theme } = useTheme()
  if (!forecast?.list) return null

  // Group by day and pick midday forecast
  const daily = []
  const seen = new Set()
  for (const item of forecast.list) {
    const date = new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
    if (!seen.has(date) && daily.length < 5) {
      seen.add(date)
      daily.push({ ...item, dateLabel: date })
    }
  }

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold">5-Day Forecast</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {daily.map((day, index) => (
          <motion.div
            key={day.dt}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`glass-card p-4 text-center group hover:scale-[1.02] transition-transform ${
              theme === 'dark' ? 'hover:bg-white/5' : 'hover:shadow-lg'
            }`}
          >
            <p className={`text-xs font-medium mb-2 ${theme === 'dark' ? 'text-surface-400' : 'text-surface-500'}`}>
              {day.dateLabel}
            </p>
            <img
              src={getWeatherIconUrl(day.weather[0].icon)}
              alt={day.weather[0].description}
              className="w-12 h-12 mx-auto mb-2"
            />
            <p className="text-xl font-bold">{formatTemp(day.main.temp)}</p>
            <p className={`text-[11px] capitalize mt-1 ${theme === 'dark' ? 'text-surface-400' : 'text-surface-500'}`}>
              {day.weather[0].description}
            </p>
            <div className={`flex justify-center gap-2 mt-2 text-[10px] ${
              theme === 'dark' ? 'text-surface-500' : 'text-surface-400'
            }`}>
              <span>💧 {day.main.humidity}%</span>
              <span>💨 {day.wind.speed}m/s</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
