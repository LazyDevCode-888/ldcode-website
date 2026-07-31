'use client'

import Link from 'next/link'
import servicesData from '@/data/services.json'
import { Globe, Building2, Database, GraduationCap, Settings, ArrowRight, CheckCircle2 } from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'

const iconMap: Record<string, React.ReactNode> = {
  Globe: <Globe className="w-8 h-8 text-emerald-400" />,
  Building2: <Building2 className="w-8 h-8 text-emerald-400" />,
  Database: <Database className="w-8 h-8 text-emerald-400" />,
  GraduationCap: <GraduationCap className="w-8 h-8 text-emerald-400" />,
  Settings: <Settings className="w-8 h-8 text-emerald-400" />,
}

export default function ServicePreview() {
  const { t } = useLanguage()

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center space-y-4 mb-16">
        <h2 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-emerald-400">
          {t('บริการของเรา', 'Our Services')}
        </h2>
        <p className="text-3xl sm:text-5xl font-extrabold tracking-tight">
          {t('บริการพัฒนาเว็บไซต์และ', 'Professional Web &')}{' '}
          <span className="text-code">{t('ระบบครบวงจร', 'Systems')}</span>
        </p>
        <p className="max-w-2xl mx-auto text-zinc-400 text-base sm:text-lg">
          {t(
            'ออกแบบตามความต้องการของลูกค้า ดีไซน์ทันสมัย ใช้งานง่าย รองรับทุกอุปกรณ์ พร้อมขึ้นระบบให้ใช้งานจริงในราคามิตรภาพ',
            'Custom web designs, modern layouts, responsive viewports, and zero-downtime deployment at friendly prices.'
          )}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {servicesData.map((service) => (
          <div
            key={service.id}
            className="group relative glass-card p-8 rounded-3xl border border-emerald-500/20 glow-emerald-hover flex flex-col justify-between"
          >
            <div>
              {/* Header Icon & Price Badge */}
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-900/50 transition-all duration-300">
                  {iconMap[service.icon] || <Globe className="w-8 h-8 text-emerald-400" />}
                </div>
                <div className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-bold shadow-md shadow-emerald-500/5">
                  {t(service.price)}
                </div>
              </div>

              {/* Titles */}
              <h3 className="text-xl font-bold text-zinc-100 group-hover:text-emerald-400 transition-colors mb-2">
                {t(service.title)}
              </h3>
              <p className="text-xs text-emerald-300 font-semibold mb-4">
                {t(service.subtitle)}
              </p>
              <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                {t(service.summary)}
              </p>

              {/* Feature Highlights */}
              <ul className="space-y-2 mb-8">
                {service.features.slice(0, 3).map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{t(feat)}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Learn More link */}
            <Link
              href={`/services#${service.id}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 group-hover:text-emerald-300 transition-colors"
            >
              <span>{t('ดูรายละเอียดเพิ่มเติม', 'View Details')}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}
