'use client'

import Link from 'next/link'
import Image from 'next/image'
import projectsData from '@/data/projects.json'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import { useLanguage } from '@/lib/LanguageContext'
import { motion } from 'framer-motion'

import 'swiper/css'
import 'swiper/css/pagination'
import { ArrowUpRight } from 'lucide-react'

export default function ProjectShowcase() {
  const { t } = useLanguage()
  const featuredProjects = projectsData.filter((p) => p.featured)

  return (
    <section className="py-24 bg-[#050806] border-y border-emerald-950/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-emerald-400">
              {t('โปรเจกต์', 'Selected Works')}
            </h2>
            <p className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              {t('โปรเจกต์ที่น่าสนใจ', 'Featured')} <span className="text-code">{t('ของเรา', 'Projects')}</span>
            </p>
          </motion.div>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <span>{t('ดูโปรเจกต์ทั้งหมด', 'View All Projects')}</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Swiper Slider Wrapper with motion */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 2 },
            }}
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            className="pb-16"
          >
            {featuredProjects.map((project) => (
              <SwiperSlide key={project.id}>
                <div className="group glass-card rounded-3xl overflow-hidden border border-emerald-500/20 glow-emerald-hover flex flex-col h-full">
                  {/* Project Cover Image */}
                  <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080c0a] via-transparent to-transparent opacity-80" />
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
                        {t(project.category)}
                      </span>
                    </div>
                  </div>

                  {/* Body Details */}
                  <div className="p-8 flex flex-col justify-between flex-grow">
                    <div className="space-y-3">
                      <div className="text-xs text-emerald-400 font-semibold tracking-wider">
                        {project.client} • {project.year}
                      </div>
                      <h3 className="text-2xl font-bold text-zinc-100 group-hover:text-emerald-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-zinc-400 line-clamp-2">
                        {t(project.summary)}
                      </p>

                      {/* Tech Badges */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {project.tech.slice(0, 4).map((tCode) => (
                          <span
                            key={tCode}
                            className="px-2.5 py-1 rounded-lg text-xs font-medium bg-zinc-900 text-zinc-300 border border-zinc-800"
                          >
                            {tCode}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6">
                      <Link
                        href={`/portfolio/${project.id}`}
                        className="inline-flex items-center gap-2 text-sm font-bold text-black bg-emerald-400 hover:bg-emerald-300 px-5 py-2.5 rounded-full transition-all shadow-md shadow-emerald-500/20"
                      >
                        <span>{t('กรณีศึกษา', 'Case Study')}</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

      </div>
    </section>
  )
}
