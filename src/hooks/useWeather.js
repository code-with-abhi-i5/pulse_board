import { useState, useCallback, useEffect } from 'react'
import { fetchWeather, fetchForecast } from '../services/api'
import { DEMO_WEATHER } from '../utils/constants'

export function useWeather() {
  const [weather, setWeather] = useState(null)
  const [forecast, setForecast] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const search = useCallback(async (city) => {
    if (!city?.trim()) return
    setLoading(true)
    setError(null)
    try {
      const [weatherRes, forecastRes] = await Promise.all([
        fetchWeather(city),
        fetchForecast(city),
      ])
      setWeather(weatherRes.data)
      setForecast(forecastRes.data)
      localStorage.setItem('fusionboard-last-city', city)
      localStorage.setItem('fusionboard-weather-cache', JSON.stringify({
        weather: weatherRes.data,
        forecast: forecastRes.data,
        ts: Date.now(),
      }))
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to fetch weather'
      setError(msg)
      // Try cache
      const cached = localStorage.getItem('fusionboard-weather-cache')
      if (cached) {
        const data = JSON.parse(cached)
        setWeather(data.weather)
        setForecast(data.forecast)
      } else {
        setWeather(DEMO_WEATHER)
      }
    } finally {
      setLoading(false)
    }
  }, [])

  // Load last searched city on mount
  useEffect(() => {
    const lastCity = localStorage.getItem('fusionboard-last-city') || 'London'
    search(lastCity)
  }, [search])

  return { weather, forecast, loading, error, search }
}
