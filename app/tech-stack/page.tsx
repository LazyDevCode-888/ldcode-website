'use client'

import { useState } from 'react'
import techData from '@/data/tech-stack.json'
import { ShieldCheck } from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'
import { motion, AnimatePresence } from 'framer-motion'

export default function TechStackPage() {
  const { t } = useLanguage()
  const [activeCategory, setActiveCategory] = useState<string>('all')

  const categories = techData.categories

  const displayedItems =
    activeCategory === 'all'
      ? categories.flatMap((c) => c.items)
      : categories.find((c) => c.id === activeCategory)?.items || []

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-center space-y-4"
      >
        <h1 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-emerald-400">
          {t('โครงสร้างเทคโนโลยี', 'Technology Infrastructure')}
        </h1>
        <p className="text-4xl sm:text-6xl font-extrabold tracking-tight">
          {t('เทคโนโลยีที่เรา', 'Our Tech')}{' '}
          <span className="text-code">{t('เลือกใช้พัฒนา', 'Ecosystem')}</span>
        </p>
        <p className="max-w-2xl mx-auto text-zinc-400 text-base sm:text-lg">
          {t(
            'เราเลือกใช้ภาษา เครื่องมือ และเฟรมเวิร์กระดับสากล เพื่อให้มั่นใจว่าซอฟต์แวร์ของคุณมีความเร็ว ปลอดภัย และขยายตัวได้ยั่งยืน',
            'We select premium languages, tools, and frameworks ensuring your website remains fast, secure, and extensible.'
          )}
        </p>
      </motion.div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2">
        <button
          onClick={() => setActiveCategory('all')}
          className={`relative px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
            activeCategory === 'all'
              ? 'text-black font-bold'
              : 'glass-card text-zinc-300 hover:text-emerald-400 hover:bg-zinc-900 border border-emerald-500/20'
          }`}
        >
          {activeCategory === 'all' && (
            <motion.span
              layoutId="activeTechCategory"
              className="absolute inset-0 bg-emerald-400 rounded-full -z-10 shadow-sm shadow-emerald-400/30"
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            />
          )}
          {t('เทคโนโลยีทั้งหมด', 'All Technologies')} ({techData.categories.flatMap((c) => c.items).length})
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`relative px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
              activeCategory === cat.id
                ? 'text-black font-bold'
                : 'glass-card text-zinc-300 hover:text-emerald-400 hover:bg-zinc-900 border border-emerald-500/20'
            }`}
          >
            {activeCategory === cat.id && (
              <motion.span
                layoutId="activeTechCategory"
                className="absolute inset-0 bg-emerald-400 rounded-full -z-10 shadow-sm shadow-emerald-400/30"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            {t(cat.name)} ({cat.items.length})
          </button>
        ))}
      </div>

      {/* Grid Display */}
      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {displayedItems.map((item, index) => (
            <motion.div
              layout
              key={`${item.name}-${index}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="group glass-card p-6 rounded-2xl border border-emerald-500/20 glow-emerald-hover space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-zinc-950 p-2 border border-zinc-800 group-hover:border-emerald-500/50 transition-colors flex items-center justify-center">
                    <img
                      src={item.icon}
                      alt={item.name}
                      className="w-full h-full object-contain p-1 group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-950/80 text-emerald-400 border border-emerald-500/30">
                    {item.level}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-zinc-100 group-hover:text-emerald-400 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
                    {t(item.desc)}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-800/60 flex items-center gap-1.5 text-[11px] text-emerald-400 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{t('ผ่านการใช้งานจริง', 'Production Verified')}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
