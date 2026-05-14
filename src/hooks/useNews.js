import { useState, useCallback } from 'react'
import { fetchHeadlines, fetchNewsSearch } from '../services/api'
import { DEMO_NEWS } from '../utils/constants'

export function useNews() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  const [activeCategory, setActiveCategory] = useState('general')

  const fetchByCategory = useCallback(async (category = 'general', pageNum = 1) => {
    setLoading(true)
    setError(null)
    setActiveCategory(category)
    try {
      const res = await fetchHeadlines(category, pageNum)
      const valid = (res.data.articles || []).filter(a => a.title !== '[Removed]')
      if (pageNum === 1) {
        setArticles(valid)
      } else {
        setArticles(prev => [...prev, ...valid])
      }
      setTotalResults(res.data.totalResults || 0)
      setPage(pageNum)
    } catch (err) {
      setError('Failed to fetch news. Using demo data.')
      if (pageNum === 1) setArticles(DEMO_NEWS)
    } finally {
      setLoading(false)
    }
  }, [])

  const searchArticles = useCallback(async (query, pageNum = 1) => {
    if (!query?.trim()) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetchNewsSearch(query, pageNum)
      const valid = (res.data.articles || []).filter(a => a.title !== '[Removed]')
      if (pageNum === 1) {
        setArticles(valid)
      } else {
        setArticles(prev => [...prev, ...valid])
      }
      setTotalResults(res.data.totalResults || 0)
      setPage(pageNum)
    } catch (err) {
      setError('Failed to search news. Using demo data.')
      if (pageNum === 1) setArticles(DEMO_NEWS)
    } finally {
      setLoading(false)
    }
  }, [])

  const loadMore = useCallback(() => {
    fetchByCategory(activeCategory, page + 1)
  }, [fetchByCategory, activeCategory, page])

  return { articles, loading, error, page, totalResults, activeCategory, fetchByCategory, searchArticles, loadMore }
}
