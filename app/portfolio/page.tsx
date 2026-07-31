'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import projectsData from '@/data/projects.json'
import { ArrowUpRight, Search, Sparkles } from 'lucide-react'

const categories = ['All', 'Web', 'Mobile', 'AI', 'Cloud']

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredProjects = projectsData.filter((project) => {
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tech.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-emerald-400">
          Our Portfolio & Case Studies
        </h1>
        <p className="text-4xl sm:text-6xl font-extrabold tracking-tight">
          Architected for <span className="text-code">Impact</span>
        </p>
        <p className="max-w-2xl mx-auto text-zinc-400 text-base sm:text-lg">
          ชมผลงานการออกแบบและพัฒนาแพลตฟอร์มซอฟต์แวร์จริงจากลูกค้าธุรกิจชั้นนำ
        </p>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 glass-card p-4 rounded-2xl border border-emerald-500/20">
        {/* Category Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-emerald-400 text-black shadow-md shadow-emerald-400/40'
                  : 'text-zinc-400 hover:text-emerald-400 hover:bg-zinc-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search project or tech stack..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-emerald-400 transition-colors"
          />
        </div>
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
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
                    {project.category}
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
                  {project.summary}
                </p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.tech.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded text-[10px] font-medium bg-zinc-900 text-zinc-300 border border-zinc-800"
                    >
                      {t}
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
                <span>Read Full Case Study</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-20 text-zinc-500 space-y-2">
          <p className="text-lg">No projects match your filter query.</p>
          <button
            onClick={() => {
              setSelectedCategory('All')
              setSearchQuery('')
            }}
            className="text-emerald-400 text-sm font-semibold hover:underline"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  )
}
