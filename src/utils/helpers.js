/**
 * Format a number as currency
 */
export function formatCurrency(value, decimals = 2) {
  if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`
  if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`
  if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`
  if (value >= 1000) return `$${value.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}`
  if (value >= 1) return `$${value.toFixed(decimals)}`
  return `$${value.toFixed(6)}`
}

/**
 * Format a percentage
 */
export function formatPercentage(value) {
  const sign = value >= 0 ? '+' : ''
  return `${sign}${value.toFixed(2)}%`
}

/**
 * Format temperature
 */
export function formatTemp(temp) {
  return `${Math.round(temp)}°C`
}

/**
 * Format wind speed
 */
export function formatWind(speed) {
  return `${speed.toFixed(1)} m/s`
}

/**
 * Get time-based greeting
 */
export function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 6) return 'Good Night'
  if (hour < 12) return 'Good Morning'
  if (hour < 17) return 'Good Afternoon'
  if (hour < 21) return 'Good Evening'
  return 'Good Night'
}

/**
 * Format relative time
 */
export function timeAgo(dateString) {
  const date = new Date(dateString)
  const now = new Date()
  const seconds = Math.floor((now - date) / 1000)

  if (seconds < 60) return 'Just now'
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`
  return date.toLocaleDateString()
}

/**
 * Format unix timestamp to readable time
 */
export function formatUnixTime(timestamp) {
  return new Date(timestamp * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

/**
 * Debounce function
 */
export function debounce(fn, delay) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
}

/**
 * Get weather icon URL from OpenWeatherMap
 */
export function getWeatherIconUrl(iconCode) {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`
}

/**
 * Get weather gradient based on condition
 */
export function getWeatherGradient(weatherId) {
  if (!weatherId) return 'from-indigo-500 to-purple-600'
  if (weatherId >= 200 && weatherId < 300) return 'from-gray-700 to-gray-900'
  if (weatherId >= 300 && weatherId < 400) return 'from-blue-400 to-blue-600'
  if (weatherId >= 500 && weatherId < 600) return 'from-blue-500 to-indigo-700'
  if (weatherId >= 600 && weatherId < 700) return 'from-blue-100 to-blue-300'
  if (weatherId >= 700 && weatherId < 800) return 'from-gray-400 to-gray-600'
  if (weatherId === 800) return 'from-amber-400 to-orange-500'
  if (weatherId > 800) return 'from-blue-400 to-indigo-500'
  return 'from-indigo-500 to-purple-600'
}

/**
 * Truncate text
 */
export function truncate(str, len = 100) {
  if (!str) return ''
  return str.length > len ? str.substring(0, len) + '...' : str
}
