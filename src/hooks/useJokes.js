import { useState, useCallback } from 'react'
import { fetchJoke } from '../services/api'

export function useJokes() {
  const [joke, setJoke] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('fusionboard-fav-jokes')
    return saved ? JSON.parse(saved) : []
  })
  const [history, setHistory] = useState([])

  const getJoke = useCallback(async (category = 'Any') => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetchJoke(category)
      const data = res.data
      const jokeObj = {
        id: data.id,
        category: data.category,
        type: data.type,
        text: data.type === 'single' ? data.joke : `${data.setup}\n\n${data.delivery}`,
        setup: data.setup || null,
        delivery: data.delivery || null,
        timestamp: Date.now(),
      }
      setJoke(jokeObj)
      setHistory(prev => [jokeObj, ...prev].slice(0, 50))
    } catch (err) {
      setError('Failed to fetch joke. Try again!')
      setJoke({
        id: Date.now(),
        category: 'Programming',
        type: 'single',
        text: 'Why do programmers prefer dark mode? Because light attracts bugs! 🐛',
        timestamp: Date.now(),
      })
    } finally {
      setLoading(false)
    }
  }, [])

  const toggleFavorite = useCallback((jokeItem) => {
    setFavorites(prev => {
      const exists = prev.find(j => j.id === jokeItem.id)
      const next = exists ? prev.filter(j => j.id !== jokeItem.id) : [...prev, jokeItem]
      localStorage.setItem('fusionboard-fav-jokes', JSON.stringify(next))
      return next
    })
  }, [])

  const isFavorite = useCallback((id) => {
    return favorites.some(j => j.id === id)
  }, [favorites])

  const copyJoke = useCallback(async (text) => {
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch {
      return false
    }
  }, [])

  return { joke, loading, error, favorites, history, getJoke, toggleFavorite, isFavorite, copyJoke }
}
