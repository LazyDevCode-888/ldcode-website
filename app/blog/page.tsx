'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import blogData from '@/data/blog.json'
import { Calendar, Clock, ArrowRight, Search } from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'
import { motion, AnimatePresence } from 'framer-motion'

export default function BlogPage() {
  const { t } = useLanguage()
  const [selectedTag, setSelectedTag] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  // Gather unique tags
  const allTags = ['All', ...Array.from(new Set(blogData.flatMap((post) => post.tags)))]

  const filteredPosts = blogData.filter((post) => {
    const matchesTag = selectedTag === 'All' || post.tags.includes(selectedTag)
    
    const title = t(post.title).toLowerCase()
    const excerpt = t(post.excerpt).toLowerCase()
    const matchesSearch =
      title.includes(searchQuery.toLowerCase()) ||
      excerpt.includes(searchQuery.toLowerCase())

    return matchesTag && matchesSearch
  })

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-center space-y-4"
      >
        <h1 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-emerald-400">
          Knowledge &amp; Insights
        </h1>
        <p className="text-4xl sm:text-6xl font-extrabold tracking-tight">
          {t('บทความและ', 'Articles &')}{' '}
          <span className="text-code">{t('ความรู้เทคโนโลยี', 'Insights')}</span>
        </p>
        <p className="max-w-2xl mx-auto text-zinc-400 text-base sm:text-lg">
          {t(
            'แชร์เทคนิคการทำเว็บไซต์ การเพิ่มความเร็วเว็บ SEO และการพัฒนาซอฟต์แวร์แบบมืออาชีพ',
            'Technical guides on Next.js performance tuning, security practices, and bespoke digital architectures.'
          )}
        </p>
      </motion.div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 glass-card p-4 rounded-2xl border border-emerald-500/20">
        {/* Tag Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`relative px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                selectedTag === tag
                  ? 'text-black font-bold'
                  : 'text-zinc-400 hover:text-emerald-400'
              }`}
            >
              {selectedTag === tag && (
                <motion.span
                  layoutId="activeBlogTag"
                  className="absolute inset-0 bg-emerald-400 rounded-xl -z-10 shadow-sm shadow-emerald-400/30"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              {tag === 'All' ? t('ทั้งหมด', 'All') : tag}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder={t('ค้นหาบทความ...', 'Search articles...')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-emerald-400 transition-colors"
          />
        </div>
      </div>

      {/* Articles Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredPosts.map((post) => (
            <motion.article
              layout
              key={post.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="group glass-card rounded-3xl overflow-hidden border border-emerald-500/20 glow-emerald-hover flex flex-col justify-between"
            >
              <div>
                {/* Cover Image */}
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={post.image}
                    alt={t(post.title)}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080c0a] via-transparent to-transparent opacity-80" />
                </div>

                {/* Body details */}
                <div className="p-6 space-y-4">
                  {/* Meta tags details */}
                  <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400 font-medium">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-emerald-400" />
                      {t(post.readTime)}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-zinc-100 group-hover:text-emerald-400 transition-colors line-clamp-2 leading-snug">
                    {t(post.title)}
                  </h2>

                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                    {t(post.excerpt)}
                  </p>

                  {/* Tags list */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-950/40 text-emerald-300 border border-emerald-500/20"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href={`/blog/${post.id}`}
                  className="w-full inline-flex items-center justify-center gap-2 text-xs font-bold text-black bg-emerald-400 hover:bg-emerald-300 py-3 rounded-xl transition-colors shadow-lg shadow-emerald-500/10"
                >
                  <span>{t('อ่านบทความเพิ่มเติม', 'Read Article')}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-20 text-zinc-500 space-y-2">
          <p className="text-lg">{t('ไม่พบข้อมูลบทความที่ต้องการค้นหา', 'No articles match your selection.')}</p>
          <button
            onClick={() => {
              setSelectedTag('All')
              setSearchQuery('')
            }}
            className="text-emerald-400 text-sm font-semibold hover:underline"
          >
            {t('ล้างการค้นหา', 'Clear Filters')}
          </button>
        </div>
      )}
    </div>
  )
}
