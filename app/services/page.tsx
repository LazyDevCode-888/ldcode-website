'use client'

import Link from 'next/link'
import servicesData from '@/data/services.json'
import { useLanguage } from '@/lib/LanguageContext'
import { motion } from 'framer-motion'
import {
  Globe,
  Building2,
  Database,
  GraduationCap,
  Settings,
  ArrowRight,
  HelpCircle,
  ChevronRight,
} from 'lucide-react'

const iconMap: Record<string, React.ReactNode> = {
  Globe: <Globe className="w-8 h-8 text-emerald-400" />,
  Building2: <Building2 className="w-8 h-8 text-emerald-400" />,
  Database: <Database className="w-8 h-8 text-emerald-400" />,
  GraduationCap: <GraduationCap className="w-8 h-8 text-emerald-400" />,
  Settings: <Settings className="w-8 h-8 text-emerald-400" />,
}

export default function ServicesPage() {
  const { t } = useLanguage()

  return (
    <div className="py-16 space-y-24">
      {/* Header */}
      <motion.section
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-6"
      >
        <h1 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-emerald-400">
          Our Capabilities &amp; Scope
        </h1>
        <p className="text-4xl sm:text-6xl font-extrabold tracking-tight">
          {t('รายการ', 'Our')}{' '}
          <span className="text-code">{t('บริการทั้งหมด', 'Services')}</span>
        </p>
        <p className="max-w-3xl mx-auto text-zinc-400 text-base sm:text-xl leading-relaxed">
          {t(
            'เลือกบริการที่ตรงกับความต้องการของคุณ แล้วกดเพื่อดูขอบเขต ราคา และสิ่งที่จะได้รับอย่างละเอียด',
            'Select a service that fits your needs and explore the full details, scope, pricing, and deliverables.'
          )}
        </p>
      </motion.section>

      {/* Service Cards Grid */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {servicesData.map((service) => (
            <motion.div
              key={service.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
              }}
            >
              <Link
                href={`/services/${service.id}`}
                className="group text-left glass-card p-6 sm:p-8 rounded-3xl border border-emerald-500/20 hover:border-emerald-400/50 hover:bg-emerald-950/20 transition-all duration-300 glow-emerald-hover flex flex-col gap-5 h-full"
              >
                {/* Icon */}
                <div className="p-3 rounded-2xl bg-emerald-950/80 border border-emerald-500/30 w-fit">
                  {iconMap[service.icon] ?? <Globe className="w-8 h-8 text-emerald-400" />}
                </div>

                {/* Title & Subtitle */}
                <div className="space-y-1 flex-grow">
                  <h2 className="text-lg sm:text-xl font-extrabold text-zinc-100 group-hover:text-emerald-300 transition-colors leading-tight">
                    {t(service.title)}
                  </h2>
                  <p className="text-xs text-emerald-400 font-semibold">{t(service.subtitle)}</p>
                </div>

                {/* Summary snippet */}
                <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2">
                  {t(service.summary)}
                </p>

                {/* Price + Arrow */}
                <div className="flex items-center justify-between pt-2 border-t border-zinc-800/60">
                  <span className="text-sm font-bold text-emerald-400">{t(service.price)}</span>
                  <div className="flex items-center gap-1 text-xs font-semibold text-zinc-400 group-hover:text-emerald-400 transition-colors">
                    {t('ดูรายละเอียด', 'View Details')}
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Consult Banner */}
      <motion.section
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <div className="glass-card p-8 sm:p-12 rounded-3xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/40 via-zinc-950 to-emerald-950/40 text-center space-y-6">
          <HelpCircle className="w-12 h-12 text-emerald-400 mx-auto" />
          <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-100">
            {t('พร้อมให้คำปรึกษาก่อนเริ่มงาน ฟรี!', 'Free Consultation Before Coding')}
          </h2>
          <p className="max-w-2xl mx-auto text-zinc-400 text-sm sm:text-base leading-relaxed">
            {t(
              'หากคุณยังไม่แน่ใจว่าควรเริ่มต้นอย่างไร สามารถติดต่อเข้ามาคุยรายละเอียดเพื่อรับแนวทางการออกแบบและโครงสร้างระบบฟรี',
              'Not sure how to start? Get in touch to receive structural outlines, user flow planning, and feature scopes advice for free.'
            )}
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold text-black bg-emerald-400 hover:bg-emerald-300 transition-all shadow-md shadow-emerald-400/25"
            >
              <span>{t('คุยรายละเอียดกับเรา', 'Discuss Your Concept')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  )
}
