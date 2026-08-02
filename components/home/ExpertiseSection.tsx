'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/lib/LanguageContext'
import {
  Code2,
  Layers,
  Server,
  Database,
  Smartphone,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react'
import Link from 'next/link'

const expertise = [
  {
    icon: Code2,
    color: 'from-emerald-500/20 to-emerald-500/5',
    borderColor: 'border-emerald-500/30',
    iconColor: 'text-emerald-400',
    title: { th: 'Full-Stack Development', en: 'Full-Stack Development' },
    desc: {
      th: 'พัฒนาทั้ง Frontend และ Backend ด้วย Next.js, Node.js, Go และ TypeScript ตั้งแต่ออกแบบ UI จนถึง REST API และ Database',
      en: 'End-to-end development with Next.js, Node.js, Go & TypeScript — from pixel-perfect UI to scalable REST APIs.',
    },
    tags: ['Next.js', 'TypeScript', 'Node.js', 'Go'],
  },
  {
    icon: Layers,
    color: 'from-sky-500/20 to-sky-500/5',
    borderColor: 'border-sky-500/30',
    iconColor: 'text-sky-400',
    title: { th: 'UI/UX & Design System', en: 'UI/UX & Design Systems' },
    desc: {
      th: 'ออกแบบ UI ที่สวยงาม ทันสมัย ใช้งานง่าย พร้อม Design System ที่สอดคล้องกันทั้งระบบ รองรับทุกขนาดหน้าจอ',
      en: 'Crafting beautiful, intuitive interfaces with consistent design systems — responsive across all devices.',
    },
    tags: ['Figma', 'Tailwind CSS', 'Framer Motion', 'Responsive'],
  },
  {
    icon: Server,
    color: 'from-violet-500/20 to-violet-500/5',
    borderColor: 'border-violet-500/30',
    iconColor: 'text-violet-400',
    title: { th: 'Backend & API Architecture', en: 'Backend & API Architecture' },
    desc: {
      th: 'ออกแบบสถาปัตยกรรม Backend และ API ที่ Scalable ปลอดภัย และรองรับผู้ใช้งานจำนวนมาก ด้วย Docker และ CI/CD',
      en: 'Architecting scalable, secure backend systems with REST & GraphQL APIs, containerized with Docker.',
    },
    tags: ['REST API', 'GraphQL', 'Docker', 'ElysiaJS'],
  },
  {
    icon: Database,
    color: 'from-amber-500/20 to-amber-500/5',
    borderColor: 'border-amber-500/30',
    iconColor: 'text-amber-400',
    title: { th: 'Database Design', en: 'Database Design' },
    desc: {
      th: 'ออกแบบและบริหารฐานข้อมูลทั้ง SQL และ NoSQL เพื่อประสิทธิภาพสูงสุด ครอบคลุม PostgreSQL, MongoDB และ Redis',
      en: 'Designing high-performance SQL & NoSQL schemas with PostgreSQL, MongoDB, Redis and Prisma ORM.',
    },
    tags: ['PostgreSQL', 'MongoDB', 'Redis', 'Prisma'],
  },
  {
    icon: Smartphone,
    color: 'from-rose-500/20 to-rose-500/5',
    borderColor: 'border-rose-500/30',
    iconColor: 'text-rose-400',
    title: { th: 'ระบบธุรกิจครบวงจร', en: 'Business Systems' },
    desc: {
      th: 'พัฒนาระบบสำหรับธุรกิจ เช่น ระบบสมาชิก, ระบบออเดอร์, ระบบแดชบอร์ด, E-Commerce และระบบ ERP ขนาดเล็กถึงกลาง',
      en: 'Building complete business systems — membership, order management, dashboards, E-Commerce & ERP solutions.',
    },
    tags: ['E-Commerce', 'Dashboard', 'ERP', 'CMS'],
  },
  {
    icon: ShieldCheck,
    color: 'from-teal-500/20 to-teal-500/5',
    borderColor: 'border-teal-500/30',
    iconColor: 'text-teal-400',
    title: { th: 'Security & Performance', en: 'Security & Performance' },
    desc: {
      th: 'ดูแลความปลอดภัยของระบบในทุกชั้น ตั้งแต่ Authentication, Authorization จนถึง Rate Limiting, Caching และ Load Optimization',
      en: 'End-to-end security from Auth & JWT to rate limiting, caching strategies and Core Web Vitals optimization.',
    },
    tags: ['JWT / OAuth', 'HTTPS', 'Caching', 'SEO'],
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 80, damping: 16 },
  },
}

export default function ExpertiseSection() {
  const { t } = useLanguage()

  return (
    <section className="py-24 bg-[#050806] border-y border-emerald-950/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-emerald-400">
            {t('ความเชี่ยวชาญของเรา', 'Our Expertise')}
          </h2>
          <p className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            {t('ทักษะและ', 'Skills &')}{' '}
            <span className="text-code">{t('ความเชี่ยวชาญ', 'Expertise')}</span>
          </p>
          <p className="max-w-2xl mx-auto text-zinc-400 text-base sm:text-lg">
            {t(
              'LDCode พัฒนาระบบครบวงจรด้วยทีมที่มีความเชี่ยวชาญจริง ครอบคลุมทุกมิติของการพัฒนาซอฟต์แวร์สมัยใหม่',
              'LDCode delivers full-cycle software development with deep, real-world expertise across every dimension of modern engineering.'
            )}
          </p>
        </motion.div>

        {/* Expertise Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {expertise.map((item, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              className={`group relative glass-card rounded-3xl border ${item.borderColor} glow-emerald-hover p-7 flex flex-col gap-4 overflow-hidden`}
            >
              {/* Gradient bg blob */}
              <div
                className={`absolute -top-10 -right-10 w-40 h-40 rounded-full bg-gradient-to-br ${item.color} blur-2xl opacity-40 group-hover:opacity-70 transition-opacity duration-500 pointer-events-none`}
              />

              {/* Icon */}
              <div className={`relative w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br ${item.color} border ${item.borderColor} group-hover:scale-110 transition-transform duration-300`}>
                <item.icon className={`w-6 h-6 ${item.iconColor}`} />
              </div>

              {/* Title & Desc */}
              <div className="relative space-y-2">
                <h3 className="text-lg font-bold text-zinc-100 group-hover:text-emerald-300 transition-colors">
                  {t(item.title.th, item.title.en)}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {t(item.desc.th, item.desc.en)}
                </p>
              </div>

              {/* Tags */}
              <div className="relative flex flex-wrap gap-2 mt-auto pt-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/25 text-emerald-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mt-14"
        >
          <Link
            href="/tech-stack"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-emerald-500/40 text-emerald-400 font-semibold text-sm hover:bg-emerald-950/60 hover:border-emerald-400 transition-all duration-300 group"
          >
            <span>{t('ดูเทคโนโลยีทั้งหมดที่เราใช้', 'View Full Tech Stack')}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
