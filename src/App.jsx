import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense, useState } from 'react'
import Navbar from './components/layout/Navbar'
import Sidebar from './components/layout/Sidebar'
import Loader from './components/ui/Loader'
import ScrollToTop from './components/ui/ScrollToTop'
import Chatbot from './components/ui/Chatbot'
import { useTheme } from './context/ThemeContext'

const Home = lazy(() => import('./pages/Home'))
const Weather = lazy(() => import('./pages/Weather'))
const News = lazy(() => import('./pages/News'))
const Jokes = lazy(() => import('./pages/Jokes'))
const Crypto = lazy(() => import('./pages/Crypto'))

function App() {
  const { theme } = useTheme()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-surface-950 text-white' 
        : 'bg-surface-100 text-surface-900'
    }`}>
      <Navbar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 min-h-[calc(100vh-4rem)] ml-0 lg:ml-64 p-4 md:p-6 lg:p-8 transition-all duration-300">
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/weather" element={<Weather />} />
              <Route path="/news" element={<News />} />
              <Route path="/jokes" element={<Jokes />} />
              <Route path="/crypto" element={<Crypto />} />
            </Routes>
          </Suspense>
        </main>
      </div>
      <Chatbot />
      <ScrollToTop />
    </div>
  )
}

export default App
