'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ArrowRight, Code2, Sparkles, } from 'lucide-react'
import companyData from '@/data/company.json'
import { useLanguage } from '@/lib/LanguageContext'

export default function HeroSection() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { t } = useLanguage()

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.2 }
      )
    }
  }, [])

  return (
    <section ref={containerRef} className="relative min-h-[90vh] flex flex-col justify-center items-center py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Decorative Glow Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-10 left-10 w-72 h-72 bg-emerald-600/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-400/5 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#141c1815_1px,transparent_1px),linear-gradient(to_bottom,#141c1815_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
        {/* Floating Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-medium shadow-lg shadow-emerald-950/40"
        >
          <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span>{t('พัฒนาเว็บไซต์และระบบที่ทันสมัย ใช้งานง่าย โหลดเร็ว', 'Next-Gen Web & Mobile Architecture')}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
        </motion.div>

        {/* Hero Title */}
        <h1 ref={titleRef} className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]">
          {t('พัฒนาเว็บไซต์ชิ้นเอกเพื่อ', 'Architecting High-Performance')} <br className="hidden sm:inline" />
          <span className="text-ld">{t('ธุรกิจและเป้าหมายของคุณ', 'Digital Platforms')}</span> {t('ร่วมกับ', 'with')}{' '}
          <span className="text-code relative">
            LDCode
            <svg className="absolute -bottom-2 left-0 w-full h-3 text-emerald-400/40" viewBox="0 0 100 20" preserveAspectRatio="none">
              <path d="M0 15 Q 50 0, 100 15" stroke="currentColor" strokeWidth="4" fill="none" />
            </svg>
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-3xl mx-auto text-base sm:text-xl text-zinc-400 font-normal leading-relaxed">
          {t(companyData.description)}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-base font-bold text-black bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-400 hover:from-emerald-300 hover:to-emerald-400 transition-all duration-300 shadow-xl shadow-emerald-500/30 hover:shadow-emerald-400/50 hover:scale-[1.03]"
          >
            <span>{t('เริ่มโครงการของคุณ', 'Start Your Project')}</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/portfolio"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-base font-semibold text-zinc-200 glass-card hover:bg-zinc-800/80 border border-emerald-500/30 hover:border-emerald-400/60 transition-all duration-300"
          >
            <Code2 className="w-5 h-5 text-emerald-400" />
            <span>{t('สำรวจผลงานล่าสุด', 'Explore Portfolio')}</span>
          </Link>
        </div>


      </div>
    </section>
  )
}
