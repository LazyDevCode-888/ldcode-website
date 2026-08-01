'use client'

import Link from 'next/link'
import { useLanguage } from '@/lib/LanguageContext'
import { motion } from 'framer-motion'
import {
  Globe,
  Building2,
  Database,
  GraduationCap,
  Settings,
  Wrench,
  CheckCircle,
  ArrowRight,
  Sparkles,
  XCircle,
  ClipboardList,
  CloudLightning,
  AlertCircle,
  ArrowLeft,
} from 'lucide-react'

interface Translation {
  th: string
  en: string
}

interface Service {
  id: string
  title: Translation
  subtitle: Translation
  icon: string
  summary: Translation
  price: Translation
  priceNum: number
  features: Translation[]
  deliverables: Translation[]
  suitableFor: Translation[]
  steps: Translation[]
  notIncluded: Translation[]
  prepNeeded: Translation[]
  deployment: Translation
  popular: boolean
}

const iconMap: Record<string, React.ReactNode> = {
  Globe: <Globe className="w-10 h-10 text-emerald-400" />,
  Building2: <Building2 className="w-10 h-10 text-emerald-400" />,
  Database: <Database className="w-10 h-10 text-emerald-400" />,
  GraduationCap: <GraduationCap className="w-10 h-10 text-emerald-400" />,
  Settings: <Settings className="w-10 h-10 text-emerald-400" />,
  Wrench: <Wrench className="w-10 h-10 text-emerald-400" />,
}

export default function ServiceDetailClient({
  service,
  otherServices,
}: {
  service: Service
  otherServices: { id: string; title: Translation; price: Translation; icon: string }[]
}) {
  const { t } = useLanguage()

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-12">
      {/* Back */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-emerald-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {t('กลับหน้าบริการทั้งหมด', 'Back to All Services')}
        </Link>
      </motion.div>

      {/* Hero Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="glass-card p-8 sm:p-12 rounded-3xl border border-emerald-500/30 space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-5">
          <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/30 w-fit shrink-0">
            {iconMap[service.icon] ?? <Globe className="w-10 h-10 text-emerald-400" />}
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-1">
              LDCode Services
            </p>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-100 leading-tight">
              {t(service.title)}
            </h1>
            <p className="text-base text-emerald-400 font-semibold mt-1">{t(service.subtitle)}</p>
          </div>
        </div>

        <p className="text-zinc-300 text-sm sm:text-base leading-relaxed max-w-3xl">
          {t(service.summary)}
        </p>

        <div className="flex flex-wrap items-center gap-4">
          {/* Price badge */}
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-400">
            <span className="text-xs font-semibold uppercase tracking-wider">
              {t('ราคาเริ่มต้น:', 'Starting Price:')}
            </span>
            <span className="text-xl font-extrabold tracking-tight">{t(service.price)}</span>
          </div>

          <Link
            href={`/contact?service=${service.id}`}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-black bg-emerald-400 hover:bg-emerald-300 transition-colors shadow-lg shadow-emerald-500/20"
          >
            <span>{t('ติดต่อสอบถาม', 'Inquire Now')}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
        {/* Left: Details */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-3 space-y-10"
        >
          {/* Suitable For */}
          <div className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
              <span className="w-1 h-3 bg-emerald-400 rounded-full" />
              {t('เหมาะสำหรับ', 'Suitable for')}
            </h2>
            <div className="flex flex-wrap gap-2">
              {service.suitableFor.map((item, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold bg-zinc-900 border border-zinc-800 text-zinc-300"
                >
                  {t(item)}
                </span>
              ))}
            </div>
          </div>

          {/* Key Features */}
          <div className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
              <span className="w-1 h-3 bg-emerald-400 rounded-full" />
              {t('จุดเด่นของบริการ', 'Service Highlights')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {service.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-sm text-zinc-200">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{t(feat)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline Steps */}
          <div className="space-y-5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
              <span className="w-1 h-3 bg-emerald-400 rounded-full" />
              {t('ขั้นตอนการทำงาน', 'Working Timeline')}
            </h2>
            <div className="relative pl-6 border-l border-zinc-800 space-y-6">
              {service.steps.map((step, idx) => {
                const stepText = t(step)
                const [title, desc] = stepText.split(': ')
                return (
                  <div key={idx} className="relative group/step">
                    <div className="absolute -left-[30px] top-1.5 w-3 h-3 rounded-full bg-zinc-800 group-hover/step:bg-emerald-400 border-2 border-zinc-950 transition-colors" />
                    <h3 className="text-sm font-bold text-zinc-100">{title}</h3>
                    {desc && (
                      <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{desc}</p>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </motion.div>

        {/* Right: Info Boxes */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-2 flex flex-col gap-5"
        >
          {/* Deliverables */}
          <div className="glass-card p-6 rounded-2xl border border-emerald-500/20 bg-zinc-950/60 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-400">
              <Sparkles className="w-4 h-4" />
              <span>{t('สิ่งที่จะได้รับ', 'What You Receive')}</span>
            </div>
            <ul className="space-y-3">
              {service.deliverables.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-xs text-zinc-300 border-b border-zinc-800/40 pb-3 last:border-0 last:pb-0"
                >
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{t(item)}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Prep Checklist */}
          <div className="glass-card p-6 rounded-2xl border border-zinc-800 bg-zinc-950/40 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-400">
              <ClipboardList className="w-4 h-4" />
              <span>{t('สิ่งที่ลูกค้าควรเตรียม', 'Client Preparation')}</span>
            </div>
            <ul className="space-y-2.5">
              {service.prepNeeded.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-zinc-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-600 mt-1.5 shrink-0" />
                  <span>{t(item)}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Not Included */}
          <div className="glass-card p-6 rounded-2xl border border-red-500/10 bg-red-950/5 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-400">
              <AlertCircle className="w-4 h-4" />
              <span>{t('สิ่งที่ไม่รวมในราคา', 'Price Exclusions')}</span>
            </div>
            <ul className="space-y-2">
              {service.notIncluded.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-zinc-400">
                  <XCircle className="w-4 h-4 text-red-500/60 shrink-0 mt-0.5" />
                  <span>{t(item)}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Deployment */}
          <div className="glass-card p-5 rounded-2xl border border-zinc-800 bg-zinc-950/40 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-400">
              <CloudLightning className="w-4 h-4" />
              <span>{t('การ Deploy ระบบ', 'Hosting & Deployment')}</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">{t(service.deployment)}</p>
          </div>

          {/* CTA */}
          <Link
            href={`/contact?service=${service.id}`}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-sm font-bold text-black bg-emerald-400 hover:bg-emerald-300 transition-colors shadow-lg shadow-emerald-500/20"
          >
            <span>{t('ติดต่อสอบถามข้อมูล', 'Contact For Inquiry')}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>

      {/* Other Services */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="space-y-6 pt-4 border-t border-zinc-800/60"
      >
        <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-400">
          {t('บริการอื่น ๆ', 'Other Services')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {otherServices.map((other) => (
            <Link
              key={other.id}
              href={`/services/${other.id}`}
              className="group glass-card p-5 rounded-2xl border border-zinc-800 hover:border-emerald-500/40 transition-all duration-300 flex flex-col gap-3"
            >
              <div className="p-2 rounded-xl bg-emerald-950/60 border border-emerald-500/20 w-fit">
                {iconMap[other.icon] ?? <Globe className="w-6 h-6 text-emerald-400" />}
              </div>
              <div>
                <p className="text-sm font-bold text-zinc-200 group-hover:text-emerald-300 transition-colors leading-tight">
                  {t(other.title)}
                </p>
                <p className="text-xs text-emerald-400 mt-0.5">{t(other.price)}</p>
              </div>
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
