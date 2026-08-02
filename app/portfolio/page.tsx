'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import projectsData from '@/data/projects.json'
import { ArrowUpRight, Search } from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'
import { motion, AnimatePresence } from 'framer-motion'

export default function PortfolioPage() {
  const { t } = useLanguage()
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const categories = [
    { id: 'All', label: t('ทั้งหมด', 'All') },
    { id: 'Web', label: t('เว็บแอปพลิเคชัน', 'Web App') },
    { id: 'Ecommerce', label: t('อีคอมเมิร์ซ', 'E-Commerce') },
    { id: 'Government', label: t('ระบบราชการ', 'Government') },
    { id: 'Mobile', label: t('มือถือ', 'Mobile') },
  ]

  const filteredProjects = projectsData.filter((project) => {
    const categoryEn = project.category.en
    const matchesCategory =
      selectedCategory === 'All' ||
      (selectedCategory === 'Web' && categoryEn.includes('Web')) ||
      (selectedCategory === 'Ecommerce' && categoryEn.includes('E-Commerce')) ||
      (selectedCategory === 'Government' && categoryEn.includes('Government')) ||
      (selectedCategory === 'Mobile' && categoryEn.includes('Mobile'))

    const title = project.title.toLowerCase()
    const summary = t(project.summary).toLowerCase()
    const tech = project.tech.join(' ').toLowerCase()
    const matchesSearch =
      title.includes(searchQuery.toLowerCase()) ||
      summary.includes(searchQuery.toLowerCase()) ||
      tech.includes(searchQuery.toLowerCase())

    return matchesCategory && matchesSearch
  })

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-center space-y-4"
      >
        <h1 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-emerald-400">
          {t('ผลงานและกรณีศึกษาของเรา', 'Our Portfolio & Case Studies')}
        </h1>
        <p className="text-4xl sm:text-6xl font-extrabold tracking-tight">
          {t('โปรเจกต์และกรณีศึกษา', 'Architected for')}{' '}
          <span className="text-code">{t('ความสำเร็จ', 'Impact')}</span>
        </p>
        <p className="max-w-2xl mx-auto text-zinc-400 text-base sm:text-lg">
          {t(
            'ชมตัวอย่างโปรเจกต์การดีไซน์ พัฒนาเว็บไซต์ และระบบเว็บแอปพลิเคชันจากประสบการณ์จริง',
            'Explore our latest project handoffs, from bespoke responsive layout styles to complex cloud databases integration.'
          )}
        </p>
      </motion.div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 glass-card p-4 rounded-2xl border border-emerald-500/20">
        {/* Category Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`relative px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${selectedCategory === cat.id
                  ? 'text-black font-bold'
                  : 'text-zinc-400 hover:text-emerald-400'
                }`}
            >
              {selectedCategory === cat.id && (
                <motion.span
                  layoutId="activePortfolioCategory"
                  className="absolute inset-0 bg-emerald-400 rounded-xl -z-10 shadow-sm shadow-emerald-400/30"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder={t('ค้นหาโครงการหรือ Stack...', 'Search project or tech stack...')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-emerald-400 transition-colors"
          />
        </div>
      </div>

      {/* Project Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              layout
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="group glass-card rounded-3xl overflow-hidden border border-emerald-500/20 glow-emerald-hover flex flex-col justify-between"
            >
              <div>
                {/* Image */}
                <div className="relative h-60 w-full overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
                      {t(project.category)}
                    </span>
                  </div>
                </div>

                {/* Text */}
                <div className="p-6 space-y-3">
                  <div className="text-xs text-emerald-400 font-semibold">
                    {project.client} • {project.year}
                  </div>
                  <h2 className="text-xl font-bold text-zinc-100 group-hover:text-emerald-400 transition-colors">
                    {project.title}
                  </h2>
                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                    {t(project.summary)}
                  </p>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.tech.slice(0, 4).map((tCode) => (
                      <span
                        key={tCode}
                        className="px-2 py-0.5 rounded text-[10px] font-medium bg-zinc-900 text-zinc-300 border border-zinc-800"
                      >
                        {tCode}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href={`/portfolio/${project.id}`}
                  className="w-full inline-flex items-center justify-center gap-2 text-xs font-bold text-black bg-emerald-400 hover:bg-emerald-300 py-2.5 rounded-xl transition-colors shadow-md shadow-emerald-500/20"
                >
                  <span>{t('อ่านกรณีศึกษาเพิ่มเติม', 'Read Full Case Study')}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-20 text-zinc-500 space-y-2">
          <p className="text-lg">{t('ไม่พบโครงการที่คุณต้องการค้นหา', 'No projects match your filter query.')}</p>
          <button
            onClick={() => {
              setSelectedCategory('All')
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
