import { motion } from 'framer-motion'
import { FiExternalLink, FiClock } from 'react-icons/fi'
import { useTheme } from '../../context/ThemeContext'
import { timeAgo, truncate } from '../../utils/helpers'

export default function NewsCard({ article, index = 0, compact = false }) {
  const { theme } = useTheme()
  if (!article) return null

  if (compact) {
    return (
      <motion.a
        href={article.url}
        target="_blank"
        rel="noreferrer"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.05 }}
        className={`flex items-start gap-3 p-3 rounded-xl transition-all ${
          theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-surface-100'
        }`}
      >
        <span className={`text-xs font-bold mt-0.5 ${theme === 'dark' ? 'text-primary-400' : 'text-primary-600'}`}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium leading-snug line-clamp-2">{article.title}</p>
          <div className={`flex items-center gap-2 mt-1 text-[11px] ${
            theme === 'dark' ? 'text-surface-500' : 'text-surface-400'
          }`}>
            <span>{article.source?.name}</span>
            <span>•</span>
            <span>{timeAgo(article.publishedAt)}</span>
          </div>
        </div>
      </motion.a>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className={`glass-card overflow-hidden group hover:scale-[1.01] transition-all duration-300 ${
        theme === 'dark' ? 'hover:border-white/15' : 'hover:shadow-xl'
      }`}
    >
      {/* Image */}
      {article.urlToImage && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={article.urlToImage}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => { e.target.style.display = 'none' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <span className={`absolute top-3 left-3 text-[10px] font-semibold px-2.5 py-1 rounded-full backdrop-blur-md ${
            theme === 'dark' ? 'bg-white/10 text-white' : 'bg-black/30 text-white'
          }`}>
            {article.source?.name}
          </span>
        </div>
      )}

      {/* Content */}
      <div className="p-5">
        {!article.urlToImage && (
          <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full inline-block mb-3 ${
            theme === 'dark' ? 'bg-primary-500/10 text-primary-400' : 'bg-primary-50 text-primary-600'
          }`}>
            {article.source?.name}
          </span>
        )}
        <h3 className="font-semibold text-sm leading-snug mb-2 line-clamp-2 group-hover:text-primary-400 transition-colors">
          {article.title}
        </h3>
        <p className={`text-xs leading-relaxed mb-4 line-clamp-2 ${
          theme === 'dark' ? 'text-surface-400' : 'text-surface-500'
        }`}>
          {truncate(article.description, 120)}
        </p>
        <div className="flex items-center justify-between">
          <div className={`flex items-center gap-1.5 text-[11px] ${
            theme === 'dark' ? 'text-surface-500' : 'text-surface-400'
          }`}>
            <FiClock className="w-3 h-3" />
            <span>{timeAgo(article.publishedAt)}</span>
            {article.author && (
              <>
                <span>•</span>
                <span className="truncate max-w-[100px]">{article.author}</span>
              </>
            )}
          </div>
          <a
            href={article.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-[11px] font-medium text-primary-400 hover:text-primary-300 transition-colors"
          >
            Read <FiExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </motion.div>
  )
}
