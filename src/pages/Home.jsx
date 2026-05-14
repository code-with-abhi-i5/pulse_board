import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowRight, FiMove } from 'react-icons/fi'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import { useTheme } from '../context/ThemeContext'
import { useWeather } from '../hooks/useWeather'
import { useCrypto } from '../hooks/useCrypto'
import { useNews } from '../hooks/useNews'
import { useJokes } from '../hooks/useJokes'
import { formatTemp, formatCurrency, formatPercentage } from '../utils/helpers'
import HeroSection from '../components/ui/HeroSection'
import WeatherCard from '../components/weather/WeatherCard'
import NewsCard from '../components/news/NewsCard'
import { SkeletonCard } from '../components/ui/Skeleton'

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }

const initialLayout = {
  col1: ['weather', 'crypto'],
  col2: ['joke', 'news']
}

export default function Home() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const { weather } = useWeather()
  const { coins } = useCrypto()
  const { articles, fetchByCategory } = useNews()
  const { joke, getJoke } = useJokes()

  const [layout, setLayout] = useState(() => {
    const saved = localStorage.getItem('fusionboard-layout')
    return saved ? JSON.parse(saved) : initialLayout
  })

  useEffect(() => {
    fetchByCategory('general', 1)
    getJoke('Any')
  }, [])

  useEffect(() => {
    localStorage.setItem('fusionboard-layout', JSON.stringify(layout))
  }, [layout])

  const topCoins = coins.slice(0, 4)
  const topNews = articles.slice(0, 4)

  const onDragEnd = (result) => {
    if (!result.destination) return

    const { source, destination } = result

    if (source.droppableId === destination.droppableId) {
      // Reordering in the same column
      const column = Array.from(layout[source.droppableId])
      const [removed] = column.splice(source.index, 1)
      column.splice(destination.index, 0, removed)
      setLayout(prev => ({ ...prev, [source.droppableId]: column }))
    } else {
      // Moving between columns
      const sourceCol = Array.from(layout[source.droppableId])
      const destCol = Array.from(layout[destination.droppableId])
      const [removed] = sourceCol.splice(source.index, 1)
      destCol.splice(destination.index, 0, removed)
      setLayout({
        ...layout,
        [source.droppableId]: sourceCol,
        [destination.droppableId]: destCol
      })
    }
  }

  // Component Map for widgets
  const widgets = {
    weather: (
      <div className="w-full">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            🌤️ Weather
          </h2>
          <Link to="/weather" className="text-xs text-primary-400 hover:text-primary-300 flex items-center gap-1">
            View all <FiArrowRight className="w-3 h-3" />
          </Link>
        </div>
        {weather ? <WeatherCard weather={weather} compact /> : <SkeletonCard />}
      </div>
    ),
    joke: (
      <div className="w-full">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            😂 Joke
          </h2>
          <Link to="/jokes" className="text-xs text-primary-400 hover:text-primary-300 flex items-center gap-1">
            More <FiArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className={`glass-card p-5 min-h-[100px] flex items-center ${isDark ? '' : 'shadow-sm'}`}>
          {joke ? <p className="text-sm leading-relaxed">{joke.text}</p> : <div className="skeleton h-4 w-3/4" />}
        </div>
      </div>
    ),
    crypto: (
      <div className="w-full">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            💰 Top Crypto
          </h2>
          <Link to="/crypto" className="text-xs text-primary-400 hover:text-primary-300 flex items-center gap-1">
            View all <FiArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className={`glass-card overflow-hidden ${isDark ? 'divide-y divide-white/5' : 'divide-y divide-surface-100'}`}>
          {topCoins.length > 0 ? topCoins.map((coin, i) => (
            <div key={coin.id} className={`flex items-center gap-3 p-4 ${isDark ? 'hover:bg-white/3' : 'hover:bg-surface-50'} transition-colors`}>
              <span className={`text-xs font-bold w-5 ${isDark ? 'text-surface-600' : 'text-surface-300'}`}>{i + 1}</span>
              <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold">{coin.name}</p>
                <p className={`text-xs uppercase ${isDark ? 'text-surface-500' : 'text-surface-400'}`}>{coin.symbol}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold">{formatCurrency(coin.current_price)}</p>
                <p className={`text-xs font-semibold ${coin.price_change_percentage_24h >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {formatPercentage(coin.price_change_percentage_24h)}
                </p>
              </div>
            </div>
          )) : Array.from({ length: 4 }).map((_, i) => <div key={i} className="p-4"><div className="skeleton h-10 w-full" /></div>)}
        </div>
      </div>
    ),
    news: (
      <div className="w-full">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            📰 Latest News
          </h2>
          <Link to="/news" className="text-xs text-primary-400 hover:text-primary-300 flex items-center gap-1">
            View all <FiArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="glass-card overflow-hidden">
          {topNews.length > 0 ? topNews.map((a, i) => (
            <NewsCard key={`${a.title}-${i}`} article={a} index={i} compact />
          )) : Array.from({ length: 4 }).map((_, i) => <div key={i} className="p-3"><div className="skeleton h-12 w-full" /></div>)}
        </div>
      </div>
    )
  }

  // Render a column
  const renderColumn = (colId, items) => (
    <Droppable droppableId={colId}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`flex flex-col gap-6 p-2 rounded-2xl transition-colors min-h-[200px] ${snapshot.isDraggingOver ? (isDark ? 'bg-white/5' : 'bg-surface-50') : ''
            }`}
        >
          {items.map((id, index) => (
            <Draggable key={id} draggableId={id} index={index}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  className={`relative group ${snapshot.isDragging ? 'z-50' : ''}`}
                >
                  {/* Drag Handle */}
                  <div
                    {...provided.dragHandleProps}
                    className="absolute -left-2 top-0 bottom-0 w-8 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing"
                  >
                    <div className={`p-1.5 rounded-lg backdrop-blur-md ${isDark ? 'bg-white/10 text-white' : 'bg-surface-200 text-surface-800'}`}>
                      <FiMove className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Widget Content */}
                  <div className={`transition-transform ${snapshot.isDragging ? 'scale-[1.02] shadow-2xl ring-2 ring-primary-500' : ''}`}>
                    {widgets[id]}
                  </div>
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-10">
      {/* Next-Level Hero */}
      <HeroSection
        weatherTemp={weather ? formatTemp(weather.main.temp) : null}
        btcPrice={topCoins[0] ? formatCurrency(topCoins[0].current_price) : null}
        newsCount={articles.length || null}
      />

      <div className="flex items-center justify-between px-2">
        <p className={`text-sm font-medium flex items-center gap-2 ${isDark ? 'text-surface-400' : 'text-surface-500'}`}>
          <FiMove className="w-4 h-4" /> Hover left of any widget to drag & reorganize
        </p>
      </div>

      {/* Draggable Grid */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {renderColumn('col1', layout.col1)}
          {renderColumn('col2', layout.col2)}
        </div>
      </DragDropContext>
    </div>
  )
}
