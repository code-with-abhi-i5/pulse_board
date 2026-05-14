import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMessageSquare, FiX, FiSend, FiMinimize2 } from 'react-icons/fi'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { useTheme } from '../../context/ThemeContext'
import ReactMarkdown from 'react-markdown'

// Initialize Gemini
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || 'dummy_key')

export default function Chatbot() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content: "Hi! I'm your FusionBoard AI assistant. You can ask me about crypto prices, weather facts, or just ask me to tell a joke! 🤖",
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (isOpen) scrollToBottom()
  }, [messages, isOpen])

  const handleSend = async (e) => {
    e?.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput('')
    
    const newMessages = [
      ...messages,
      { id: Date.now(), role: 'user', content: userMessage },
    ]
    setMessages(newMessages)
    setIsLoading(true)

    try {
      if (!import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.VITE_GEMINI_API_KEY === 'your_gemini_api_key_here') {
        throw new Error('Please add your Gemini API key to the .env file first!')
      }

      // We use gemini-pro for stable text responses
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
      
      // Provide some context about the dashboard
      const prompt = `
        You are a helpful AI assistant built into a dashboard called "FusionBoard".
        The dashboard features Weather, Crypto, News, and Jokes.
        Be concise, friendly, and use emojis occasionally.
        User message: ${userMessage}
      `

      const result = await model.generateContent(prompt)
      const response = result.response.text()

      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: 'assistant', content: response },
      ])
    } catch (error) {
      console.error(error)
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: 'assistant',
          content: `⚠️ Error: ${error.message || 'Something went wrong. Please try again.'}`,
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: isOpen ? 0 : 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-xl shadow-primary-500/20 flex items-center justify-center glow-primary"
        aria-label="Open AI Assistant"
      >
        <FiMessageSquare className="w-6 h-6" />
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-accent-500"></span>
        </span>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`fixed bottom-6 right-6 z-50 w-[90vw] max-w-[400px] h-[550px] max-h-[80vh] flex flex-col rounded-2xl shadow-2xl border backdrop-blur-2xl overflow-hidden ${
              isDark
                ? 'bg-surface-900/90 border-white/10'
                : 'bg-white/90 border-surface-200'
            }`}
          >
            {/* Header */}
            <div className={`flex items-center justify-between p-4 border-b ${isDark ? 'border-white/10 bg-surface-800/50' : 'border-surface-200 bg-surface-50/50'}`}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-lg">
                  <span className="text-white text-xs font-bold">AI</span>
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Fusion Assistant</h3>
                  <p className="text-[10px] text-emerald-500 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Online
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-surface-400">
                <button onClick={() => setIsOpen(false)} className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-white/10' : 'hover:bg-surface-200'}`}>
                  <FiMinimize2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-tr-sm shadow-md'
                        : isDark
                        ? 'bg-white/5 border border-white/5 text-surface-200 rounded-tl-sm'
                        : 'bg-white border border-surface-200 text-surface-800 rounded-tl-sm shadow-sm'
                    }`}
                  >
                    {msg.role === 'assistant' ? (
                      <div className="prose prose-sm dark:prose-invert max-w-none">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                    ) : (
                      <p>{msg.content}</p>
                    )}
                  </div>
                </motion.div>
              ))}
              
              {isLoading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className={`rounded-2xl px-4 py-3 rounded-tl-sm flex gap-1 ${isDark ? 'bg-white/5 border border-white/5' : 'bg-white border border-surface-200'}`}>
                    <span className="w-2 h-2 rounded-full bg-primary-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-primary-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-primary-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className={`p-4 border-t ${isDark ? 'border-white/10 bg-surface-900' : 'border-surface-200 bg-white'}`}>
              <form onSubmit={handleSend} className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  disabled={isLoading}
                  className={`w-full pr-12 pl-4 py-3 rounded-xl outline-none transition-all text-sm ${
                    isDark
                      ? 'bg-white/5 border border-white/10 focus:border-primary-500/50 focus:bg-white/10 text-white placeholder-surface-500'
                      : 'bg-surface-50 border border-surface-200 focus:border-primary-400 focus:bg-white text-surface-900 placeholder-surface-400'
                  }`}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className={`absolute right-2 p-2 rounded-lg transition-colors ${
                    input.trim() && !isLoading
                      ? 'bg-primary-500 text-white hover:bg-primary-600 shadow-md'
                      : 'text-surface-400 cursor-not-allowed'
                  }`}
                >
                  <FiSend className="w-4 h-4" />
                </button>
              </form>
              <div className="text-center mt-2">
                <p className={`text-[10px] ${isDark ? 'text-surface-600' : 'text-surface-400'}`}>
                  Powered by Gemini AI
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
