'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, CheckCircle2, Zap, ChevronLeft, ChevronRight } from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'
import { motion, AnimatePresence } from 'framer-motion'

type ProjectDetailClientProps = {
  project: {
    id: string
    title: string
    subtitle: { th: string; en: string }
    category: { th: string; en: string }
    client: string
    year: string
    summary: { th: string; en: string }
    image: string
    gallery?: string[]
    tech: string[]
    challenge: { th: string; en: string }
    solution: { th: string; en: string }
  }
}

function ImageSlider({ image, gallery, title }: { image: string; gallery?: string[]; title: string }) {
  const slides = (gallery && gallery.length > 0) ? gallery : [image]
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  if (slides.length === 0) return null

  const go = (dir: number) => {
    setDirection(dir)
    setCurrent((prev) => (prev + dir + slides.length) % slides.length)
  }

  return (
    <div className="space-y-3">
      {/* Main Slide */}
      <div className="relative w-full rounded-3xl overflow-hidden border border-emerald-500/30 shadow-2xl bg-zinc-950/80 backdrop-blur-sm">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            initial={{ opacity: 0, x: direction * 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -direction * 60 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex items-center justify-center p-2 sm:p-4"
          >
            <Image
              src={slides[current]}
              alt={`${title} — ${current + 1}`}
              width={1600}
              height={1000}
              className="w-full h-auto max-h-[75vh] object-contain rounded-2xl shadow-lg"
              priority={current === 0}
            />
          </motion.div>
        </AnimatePresence>

        {/* Prev / Next — only show if more than 1 slide */}
        {slides.length > 1 && (
          <>
            <button
              onClick={() => go(-1)}
              aria-label="Previous"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-black/50 border border-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Next"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-black/50 border border-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Dot indicators */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i) }}
                  aria-label={`Slide ${i + 1}`}
                  className={`rounded-full transition-all duration-300 ${
                    i === current
                      ? 'w-5 h-1.5 bg-emerald-400'
                      : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Slide counter */}
        {slides.length > 1 && (
          <div className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm text-xs font-semibold text-white/80">
            {current + 1} / {slides.length}
          </div>
        )}
      </div>

      {/* Thumbnail strip */}
      {slides.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {slides.map((src, i) => (
            <button
              key={i}
              onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i) }}
              className={`relative shrink-0 w-20 h-14 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                i === current ? 'border-emerald-400 opacity-100' : 'border-zinc-800 opacity-50 hover:opacity-75'
              }`}
            >
              <Image src={src} alt={`thumb ${i + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  const { t } = useLanguage()

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-16">
      {/* Back button */}
      <div>
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-emerald-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t('กลับหน้าผลงาน', 'Back to All Projects')}</span>
        </Link>
      </div>

      {/* Hero Header */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
            {t(project.category)}
          </span>
          <span className="text-xs text-zinc-500">•</span>
          <span className="text-xs text-zinc-400">{project.client}</span>
          <span className="text-xs text-zinc-500">•</span>
          <span className="text-xs text-zinc-400">{project.year}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-zinc-100 leading-tight">
          {project.title}
        </h1>
        <p className="text-lg sm:text-xl text-emerald-400 font-medium">
          {t(project.subtitle)}
        </p>
      </div>

      {/* Image Slider */}
      <ImageSlider image={project.image} gallery={project.gallery} title={project.title} />

      {/* Challenge vs Solution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-card p-8 rounded-3xl border border-emerald-500/20 space-y-4">
          <h2 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" />
            <span>{t('โจทย์และความท้าทาย', 'The Challenge')}</span>
          </h2>
          <p className="text-sm text-zinc-300 leading-relaxed">
            {t(project.challenge)}
          </p>
        </div>

        <div className="glass-card p-8 rounded-3xl border border-emerald-500/20 space-y-4 bg-emerald-950/20">
          <h2 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>LDCode Architecture &amp; Solution</span>
          </h2>
          <p className="text-sm text-zinc-300 leading-relaxed">
            {t(project.solution)}
          </p>
        </div>
      </div>

      {/* Tech Stack Used */}
      <div className="glass-card p-8 rounded-3xl border border-emerald-500/20 space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400">
          {t('เทคโนโลยีที่ใช้พัฒนา', 'Technologies Employed')}
        </h3>
        <div className="flex flex-wrap gap-3">
          {project.tech.map((tCode) => (
            <span
              key={tCode}
              className="px-4 py-2 rounded-xl text-sm font-semibold bg-zinc-900 text-zinc-200 border border-zinc-800"
            >
              {tCode}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
