'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ArrowRight, Code2, Sparkles } from 'lucide-react'
import companyData from '@/data/company.json'
import { useLanguage } from '@/lib/LanguageContext'

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const spotlightRef = useRef<HTMLDivElement>(null)
  const { t } = useLanguage()

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !spotlightRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      // Spotlight position tracking with smooth GSAP transition
      gsap.to(spotlightRef.current, {
        x: x - 250,
        y: y - 250,
        duration: 0.6,
        ease: 'power2.out',
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Create coordinates for floating particles
  const particles = [
    { id: 1, size: 4, x: 10, y: 80, duration: 15, delay: 0 },
    { id: 2, size: 6, x: 25, y: 40, duration: 18, delay: 2 },
    { id: 3, size: 3, x: 45, y: 90, duration: 14, delay: 1 },
    { id: 4, size: 8, x: 70, y: 30, duration: 22, delay: 4 },
    { id: 5, size: 5, x: 85, y: 70, duration: 16, delay: 3 },
    { id: 6, size: 4, x: 15, y: 20, duration: 20, delay: 5 },
    { id: 7, size: 7, x: 60, y: 80, duration: 19, delay: 2.5 },
    { id: 8, size: 5, x: 90, y: 15, duration: 17, delay: 1.5 },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 80,
        damping: 15,
      },
    },
  }

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-[95vh] flex flex-col justify-center items-center py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background Decorative Glow Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-emerald-500/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-10 left-10 w-72 h-72 bg-emerald-600/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-400/5 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Spotlight Cursor Follower */}
      <div
        ref={spotlightRef}
        className="absolute top-0 left-0 w-[500px] h-[500px] bg-emerald-500/12 blur-[120px] rounded-full pointer-events-none mix-blend-screen hidden md:block"
        style={{ transform: 'translate3d(-999px, -999px, 0)' }}
      />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#141c1815_1px,transparent_1px),linear-gradient(to_bottom,#141c1815_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_80%,transparent_100%)] pointer-events-none" />

      {/* Floating Particles in Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-emerald-400/20"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.x}%`,
              top: `${p.y}%`,
            }}
            animate={{
              y: [0, -120, 0],
              x: [0, Math.random() * 40 - 20, 0],
              opacity: [0.1, 0.6, 0.1],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-5xl mx-auto text-center space-y-8"
      >
        {/* Floating Badge */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-medium shadow-lg shadow-emerald-950/40"
        >
          <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span>{t('พัฒนาเว็บไซต์และระบบที่ทันสมัย ใช้งานง่าย โหลดเร็ว', 'Next-Gen Web & Mobile Architecture')}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
        </motion.div>

        {/* Hero Title */}
        <motion.h1 
          variants={itemVariants}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]"
        >
          {t('พัฒนาเว็บไซต์ชิ้นเอกเพื่อ', 'Architecting High-Performance')} <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-emerald-400 via-emerald-300 to-teal-400 bg-clip-text text-transparent">{t('ธุรกิจและเป้าหมายของคุณ', 'Digital Platforms')}</span> {t('ร่วมกับ', 'with')}{' '}
          <span className="text-code relative inline-block">
            LDCode
            <svg className="absolute -bottom-2 left-0 w-full h-3 text-emerald-400/50" viewBox="0 0 100 20" preserveAspectRatio="none">
              <path d="M0 15 Q 50 0, 100 15" stroke="currentColor" strokeWidth="4" fill="none" />
            </svg>
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          variants={itemVariants}
          className="max-w-3xl mx-auto text-base sm:text-xl text-zinc-400 font-normal leading-relaxed"
        >
          {t(companyData.description)}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-base font-bold text-black bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-400 hover:from-emerald-300 hover:to-emerald-400 transition-all duration-300 shadow-xl shadow-emerald-500/30 hover:shadow-emerald-400/50 hover:scale-[1.04]"
          >
            <span>{t('เริ่มโครงการของคุณ', 'Start Your Project')}</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/portfolio"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-base font-semibold text-zinc-200 glass-card hover:bg-zinc-800/80 border border-emerald-500/30 hover:border-emerald-400/60 transition-all duration-300 hover:scale-[1.04]"
          >
            <Code2 className="w-5 h-5 text-emerald-400" />
            <span>{t('สำรวจผลงานล่าสุด', 'Explore Portfolio')}</span>
          </Link>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-16 max-w-4xl mx-auto w-full"
        >
          {companyData.stats.map((stat, idx) => (
            <div
              key={idx}
              className="glass-card p-5 sm:p-6 rounded-2xl border border-emerald-500/10 bg-zinc-950/40 text-center hover:border-emerald-500/30 hover:bg-emerald-950/10 transition-all duration-300 group"
            >
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono tracking-tight mb-2 group-hover:scale-105 transition-transform duration-300">
                {stat.value}
              </div>
              <div className="text-xs text-zinc-400 font-medium">
                {t(stat.label)}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
