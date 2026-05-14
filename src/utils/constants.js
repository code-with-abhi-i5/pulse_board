export const WEATHER_API_BASE = 'https://api.openweathermap.org/data/2.5'
export const NEWS_API_BASE = 'https://newsapi.org/v2'
export const JOKE_API_BASE = 'https://v2.jokeapi.dev/joke'
export const CRYPTO_API_BASE = 'https://api.coingecko.com/api/v3'

export const NEWS_CATEGORIES = [
  { id: 'general', label: 'General', emoji: '📰' },
  { id: 'technology', label: 'Technology', emoji: '💻' },
  { id: 'business', label: 'Business', emoji: '💼' },
  { id: 'sports', label: 'Sports', emoji: '⚽' },
  { id: 'science', label: 'Science', emoji: '🔬' },
  { id: 'entertainment', label: 'Entertainment', emoji: '🎬' },
]

export const JOKE_CATEGORIES = ['Any', 'Programming', 'Dark', 'Pun', 'Misc', 'Spooky']

export const NAV_ITEMS = [
  { path: '/', label: 'Dashboard', icon: 'home' },
  { path: '/weather', label: 'Weather', icon: 'cloud' },
  { path: '/news', label: 'News', icon: 'newspaper' },
  { path: '/jokes', label: 'Jokes', icon: 'smile' },
  { path: '/crypto', label: 'Crypto', icon: 'trending' },
]

// Demo data for when APIs are unavailable
export const DEMO_WEATHER = {
  name: 'San Francisco',
  sys: { country: 'US', sunrise: 1700000000, sunset: 1700040000 },
  main: { temp: 18, feels_like: 16, humidity: 72, pressure: 1013, temp_min: 14, temp_max: 21 },
  weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }],
  wind: { speed: 5.2, deg: 270 },
  visibility: 10000,
  clouds: { all: 10 },
}

export const DEMO_NEWS = [
  { title: 'AI Revolution Continues to Transform Industries', source: { name: 'TechCrunch' }, author: 'Sarah Chen', publishedAt: new Date().toISOString(), urlToImage: null, url: '#', description: 'New breakthroughs in artificial intelligence are reshaping how businesses operate across sectors.' },
  { title: 'Global Markets Rally on Economic Optimism', source: { name: 'Reuters' }, author: 'John Smith', publishedAt: new Date().toISOString(), urlToImage: null, url: '#', description: 'Stock markets around the world surge as economic indicators show positive trends.' },
  { title: 'SpaceX Launches New Satellite Constellation', source: { name: 'Space.com' }, author: 'Mike Johnson', publishedAt: new Date().toISOString(), urlToImage: null, url: '#', description: 'The latest batch of satellites will expand global internet coverage.' },
  { title: 'Breakthrough in Renewable Energy Storage', source: { name: 'Nature' }, author: 'Dr. Emily Park', publishedAt: new Date().toISOString(), urlToImage: null, url: '#', description: 'Scientists develop new battery technology that could revolutionize clean energy.' },
]

export const DEMO_CRYPTO = [
  { id: 'bitcoin', symbol: 'btc', name: 'Bitcoin', image: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png', current_price: 67234, market_cap: 1320000000000, price_change_percentage_24h: 2.34, total_volume: 28000000000, sparkline_in_7d: { price: Array.from({length: 168}, (_, i) => 65000 + Math.sin(i/10) * 2000 + Math.random() * 500) } },
  { id: 'ethereum', symbol: 'eth', name: 'Ethereum', image: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png', current_price: 3456, market_cap: 415000000000, price_change_percentage_24h: -1.23, total_volume: 15000000000, sparkline_in_7d: { price: Array.from({length: 168}, (_, i) => 3300 + Math.sin(i/8) * 200 + Math.random() * 50) } },
  { id: 'solana', symbol: 'sol', name: 'Solana', image: 'https://assets.coingecko.com/coins/images/4128/small/solana.png', current_price: 172, market_cap: 78000000000, price_change_percentage_24h: 5.67, total_volume: 3200000000, sparkline_in_7d: { price: Array.from({length: 168}, (_, i) => 160 + Math.sin(i/12) * 15 + Math.random() * 5) } },
  { id: 'cardano', symbol: 'ada', name: 'Cardano', image: 'https://assets.coingecko.com/coins/images/975/small/cardano.png', current_price: 0.62, market_cap: 22000000000, price_change_percentage_24h: -0.45, total_volume: 520000000, sparkline_in_7d: { price: Array.from({length: 168}, (_, i) => 0.58 + Math.sin(i/10) * 0.05 + Math.random() * 0.02) } },
  { id: 'ripple', symbol: 'xrp', name: 'XRP', image: 'https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png', current_price: 0.52, market_cap: 28000000000, price_change_percentage_24h: 1.1, total_volume: 1100000000, sparkline_in_7d: { price: Array.from({length: 168}, (_, i) => 0.50 + Math.sin(i/9) * 0.03 + Math.random() * 0.01) } },
]
