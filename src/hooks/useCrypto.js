import { useState, useCallback, useEffect } from 'react'
import { fetchCryptoMarkets, fetchTrendingCoins } from '../services/api'
import { DEMO_CRYPTO } from '../utils/constants'

export function useCrypto() {
  const [coins, setCoins] = useState([])
  const [trending, setTrending] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchCoins = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const [marketsRes, trendingRes] = await Promise.all([
        fetchCryptoMarkets(),
        fetchTrendingCoins(),
      ])
      setCoins(marketsRes.data)
      setTrending(trendingRes.data?.coins?.slice(0, 7) || [])
      localStorage.setItem('fusionboard-crypto-cache', JSON.stringify({
        coins: marketsRes.data,
        trending: trendingRes.data?.coins?.slice(0, 7) || [],
        ts: Date.now(),
      }))
    } catch (err) {
      setError('Failed to fetch crypto data')
      const cached = localStorage.getItem('fusionboard-crypto-cache')
      if (cached) {
        const data = JSON.parse(cached)
        setCoins(data.coins)
        setTrending(data.trending)
      } else {
        setCoins(DEMO_CRYPTO)
      }
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchCoins()
  }, [fetchCoins])

  return { coins, trending, loading, error, refresh: fetchCoins }
}
