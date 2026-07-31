'use client'

import Link from 'next/link'
import servicesData from '@/data/services.json'
import { useLanguage } from '@/lib/LanguageContext'
import {
  Globe,
  Building2,
  Database,
  GraduationCap,
  Settings,
  CheckCircle,
  ArrowRight,
  Sparkles,
  XCircle,
  ClipboardList,
  CloudLightning,
  HelpCircle,
  AlertCircle
} from 'lucide-react'

const iconMap: Record<string, React.ReactNode> = {
  Globe: <Globe className="w-10 h-10 text-emerald-400" />,
  Building2: <Building2 className="w-10 h-10 text-emerald-400" />,
  Database: <Database className="w-10 h-10 text-emerald-400" />,
  GraduationCap: <GraduationCap className="w-10 h-10 text-emerald-400" />,
  Settings: <Settings className="w-10 h-10 text-emerald-400" />,
}

export default function ServicesPage() {
  const { t } = useLanguage()

  return (
    <div className="py-16 space-y-24">
      {/* Header */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-6">
        <h1 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-emerald-400">
          Our Capabilities & Scope
        </h1>
        <p className="text-4xl sm:text-6xl font-extrabold tracking-tight">
          {t('รายละเอียด', 'Service')}{' '}
          <span className="text-code">{t('ขอบเขตบริการ', 'Details & Scope')}</span>
        </p>
        <p className="max-w-3xl mx-auto text-zinc-400 text-base sm:text-xl leading-relaxed">
          {t(
            'ยินดีให้คำปรึกษาก่อนเริ่มงาน พัฒนาเว็บไซต์ที่เน้น User Experience (UX) ความเร็ว โครงสร้างโค้ดเป็นระเบียบ และสามารถต่อยอดได้ในอนาคต',
            'Consult with us before starting. We develop sites focused on User Experience (UX), performance, modular coding, and scalable architectures.'
          )}
        </p>
      </section>

      {/* Services Breakdown List */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
        {servicesData.map((service, index) => (
          <div
            key={service.id}
            id={service.id}
            className={`glass-card p-6 sm:p-10 lg:p-12 rounded-3xl border border-emerald-500/20 glow-emerald-hover flex flex-col lg:flex-row gap-10 items-stretch scroll-mt-24 ${
              index % 2 === 1 ? 'lg:bg-emerald-950/10' : ''
            }`}
          >
            {/* Left Info Column - 60% Width */}
            <div className="flex-1 space-y-8">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-emerald-950/80 border border-emerald-500/30 shrink-0">
                  {iconMap[service.icon] || <Globe className="w-10 h-10 text-emerald-400" />}
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-100">{t(service.title)}</h2>
                  <p className="text-sm text-emerald-400 font-semibold">{t(service.subtitle)}</p>
                </div>
              </div>

              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                {t(service.summary)}
              </p>

              {/* Price Tag Highlight */}
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-400">
                <span className="text-xs font-semibold uppercase tracking-wider">{t('ราคาเริ่มต้น:', 'Starting Price:')}</span>
                <span className="text-lg font-extrabold tracking-tight">{t(service.price)}</span>
              </div>

              {/* Suitable For - badge list */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
                  <span className="w-1 h-3 bg-emerald-400 rounded-full" />
                  {t('เหมาะสำหรับ', 'Suitable for')}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {service.suitableFor.map((item, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full text-xs font-semibold bg-zinc-900 border border-zinc-800 text-zinc-300"
                    >
                      {t(item)}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Features */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
                  <span className="w-1 h-3 bg-emerald-400 rounded-full" />
                  {t('จุดเด่นของบริการ', 'Service Highlights')}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-200">
                      <CheckCircle className="w-4.5 h-4.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{t(feat)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Timeline Steps */}
              <div className="space-y-4 pt-4 border-t border-zinc-800/60">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
                  <span className="w-1 h-3 bg-emerald-400 rounded-full" />
                  {t('ขั้นตอนการทำงาน', 'Working Timeline')}
                </h3>
                <div className="relative pl-6 border-l border-zinc-800 space-y-5">
                  {service.steps.map((step, idx) => {
                    const stepText = t(step)
                    const [title, desc] = stepText.split(': ')
                    return (
                      <div key={idx} className="relative group/step">
                        {/* Timeline node dot */}
                        <div className="absolute -left-[30px] top-1 w-2.5 h-2.5 rounded-full bg-zinc-800 group-hover/step:bg-emerald-400 border border-zinc-950 transition-colors" />
                        <h4 className="text-xs sm:text-sm font-bold text-zinc-200">{title}</h4>
                        {desc && <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">{desc}</p>}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Right Side Column - 40% Width */}
            <div className="w-full lg:w-96 shrink-0 flex flex-col gap-6">
              {/* Deliverables Box */}
              <div className="glass-card p-6 sm:p-8 rounded-2xl border border-emerald-500/20 bg-zinc-950/60 space-y-5">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-400">
                  <Sparkles className="w-4 h-4" />
                  <span>{t('สิ่งที่ลูกค้าจะได้รับ (Included)', 'What You Will Receive')}</span>
                </div>
                <ul className="space-y-3">
                  {service.deliverables.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300 border-b border-zinc-800/40 pb-2.5 last:border-0 last:pb-0">
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{t(item)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Prep Checklist */}
              <div className="glass-card p-6 sm:p-8 rounded-2xl border border-zinc-800 bg-zinc-950/40 space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-400">
                  <ClipboardList className="w-4 h-4" />
                  <span>{t('สิ่งที่ลูกค้าควรเตรียม', 'Client Preparation')}</span>
                </div>
                <ul className="space-y-2.5">
                  {service.prepNeeded.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-zinc-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-600 mt-1.5 shrink-0" />
                      <span>{t(item)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Exclusions / Not Included */}
              <div className="glass-card p-6 sm:p-8 rounded-2xl border border-red-500/10 bg-red-950/5 space-y-4">
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

              {/* Deployment info */}
              <div className="glass-card p-5 rounded-2xl border border-zinc-800 bg-zinc-950/40 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-400">
                  <CloudLightning className="w-4 h-4" />
                  <span>{t('การ Deploy ระบบ', 'Hosting & Deployment')}</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {t(service.deployment)}
                </p>
              </div>

              <Link
                href={`/contact?service=${service.id}`}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-sm font-bold text-black bg-emerald-400 hover:bg-emerald-300 transition-colors shadow-lg shadow-emerald-500/20"
              >
                <span>{t('ติดต่อสอบถามข้อมูล', 'Contact For Inquiry')}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </section>

      {/* Consult Banner */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="glass-card p-8 sm:p-12 rounded-3xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/40 via-zinc-950 to-emerald-950/40 text-center space-y-6">
          <HelpCircle className="w-12 h-12 text-emerald-400 mx-auto" />
          <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-100">{t('พร้อมให้คำปรึกษาก่อนเริ่มงาน ฟรี!', 'Free Consultation Before Coding')}</h2>
          <p className="max-w-2xl mx-auto text-zinc-400 text-sm sm:text-base leading-relaxed">
            {t(
              'หากคุณยังไม่แน่ใจว่าควรเริ่มต้นอย่างไร หรือยังไม่มีโครงสร้าง/ความต้องการของระบบที่ชัดเจน สามารถติดต่อเข้ามาคุยรายละเอียดเพื่อรับแนวทางการออกแบบ โครงสร้างระบบ และฟังก์ชันที่เหมาะสมกับธุรกิจหรือการใช้งานของคุณได้ฟรี ไม่มีค่าใช้จ่ายใด ๆ',
              'If you are not yet sure how to start or lack a concrete requirements document, get in touch with us to receive structural outlines, user flow planning, and feature scopes advice for free.'
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
      </section>
    </div>
  )
}
