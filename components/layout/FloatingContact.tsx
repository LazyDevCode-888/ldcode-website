'use client'

import { useState, useEffect } from 'react'
import companyData from '@/data/company.json'
import { useLanguage } from '@/lib/LanguageContext'
import { motion, AnimatePresence } from 'framer-motion'

export default function FloatingContact() {
  const { t } = useLanguage()
  const [showTooltip, setShowTooltip] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const lineLink = `https://line.me/ti/p/~${companyData.contact.line.replace('@', '')}`

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 select-none">
      {/* Tooltip speech bubble */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="glass-card px-4 py-2 rounded-2xl border border-emerald-500/30 text-emerald-400 font-bold text-xs shadow-2xl backdrop-blur-md flex items-center gap-2 whitespace-nowrap mb-1"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#00B900] animate-pulse" />
            {t('คุยกับเราทาง LINE', 'Chat with us on LINE')}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.a
        href={lineLink}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        whileHover={{ y: -4, scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="relative group p-3.5 sm:p-4 rounded-full bg-emerald-950/80 border border-emerald-500/40 hover:border-emerald-400 text-emerald-400 shadow-2xl hover:shadow-emerald-500/30 transition-shadow duration-300 flex items-center justify-center cursor-pointer overflow-visible"
        aria-label="Contact on LINE"
      >
        {/* Animated outer pulsing ring */}
        <span className="absolute inset-0 rounded-full border border-emerald-400/40 group-hover:scale-125 group-hover:opacity-0 transition-all duration-700 ease-out" />
        
        {/* Pulsing indicator dot */}
        <span className="absolute top-1 right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00B900] opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00B900]" />
        </span>

        {/* LINE SVG Icon */}
        <svg
          className="w-7 h-7 sm:w-8 sm:h-8 fill-current text-emerald-400 group-hover:text-emerald-300 transition-colors"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 4.269 8.846 10.036 9.608.391.084.922.258 1.057.592.121.303.079.778.039 1.085l-.171 1.027c-.053.303-.242 1.186 1.039.647 1.281-.54 6.911-4.069 9.428-6.967 1.748-1.921 2.572-3.87 2.572-6.002z" />
        </svg>
      </motion.a>
    </div>
  )
}
