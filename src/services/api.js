import axios from 'axios'
import { WEATHER_API_BASE, NEWS_API_BASE, JOKE_API_BASE, CRYPTO_API_BASE } from '../utils/constants'

// Axios instances
const weatherApi = axios.create({ baseURL: WEATHER_API_BASE, timeout: 10000 })
const newsApi = axios.create({ baseURL: NEWS_API_BASE, timeout: 10000 })
const jokeApi = axios.create({ baseURL: JOKE_API_BASE, timeout: 10000 })
const cryptoApi = axios.create({ baseURL: CRYPTO_API_BASE, timeout: 10000 })

// ─── Weather ────────────────────────────────────────
export const fetchWeather = (city) =>
  weatherApi.get('/weather', {
    params: {
      q: city,
      appid: import.meta.env.VITE_WEATHER_API_KEY,
      units: 'metric',
    },
  })

export const fetchForecast = (city) =>
  weatherApi.get('/forecast', {
    params: {
      q: city,
      appid: import.meta.env.VITE_WEATHER_API_KEY,
      units: 'metric',
    },
  })

// ─── News ───────────────────────────────────────────
export const fetchHeadlines = (category = 'general', page = 1) =>
  newsApi.get('/top-headlines', {
    params: {
      country: 'us',
      category,
      page,
      pageSize: 12,
      apiKey: import.meta.env.VITE_NEWS_API_KEY,
    },
  })

export const fetchNewsSearch = (query, page = 1) =>
  newsApi.get('/everything', {
    params: {
      q: query,
      page,
      pageSize: 12,
      sortBy: 'publishedAt',
      apiKey: import.meta.env.VITE_NEWS_API_KEY,
    },
  })

// ─── Jokes ──────────────────────────────────────────
export const fetchJoke = (category = 'Any') =>
  jokeApi.get(`/${category}`, {
    params: { type: 'single,twopart' },
  })

// ─── Crypto ─────────────────────────────────────────
export const fetchCryptoMarkets = (page = 1, perPage = 20) =>
  cryptoApi.get('/coins/markets', {
    params: {
      vs_currency: 'usd',
      order: 'market_cap_desc',
      per_page: perPage,
      page,
      sparkline: true,
      price_change_percentage: '24h,7d',
    },
  })

export const fetchTrendingCoins = () =>
  cryptoApi.get('/search/trending')

export const fetchCoinSearch = (query) =>
  cryptoApi.get('/search', { params: { query } })
