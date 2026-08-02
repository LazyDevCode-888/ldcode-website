'use client'

import Link from 'next/link'
import techData from '@/data/tech-stack.json'
import { ArrowUpRight } from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'

export default function TechMarquee() {
  const { t } = useLanguage()
  const allTechs = techData.categories.flatMap((c) => c.items)

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-emerald-400">
          {t('ขับเคลื่อนด้วยเทคโนโลยีสมัยใหม่', 'Powered By Modern Stack')}
        </h2>
        <p className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          {t('เทคโนโลยีที่เรา', 'Technologies We')}{' '}
          <span className="text-code">{t('เชี่ยวชาญ', 'Master')}</span>
        </p>
      </div>

      {/* Infinite Scrolling Track */}
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        <div className="flex w-max gap-8 animate-[marquee_30s_linear_infinite] hover:[animation-play-state:paused]">
          {[...allTechs, ...allTechs].map((tech, idx) => (
            <div
              key={`${tech.name}-${idx}`}
              className="flex items-center gap-3 glass-card px-5 py-3 rounded-2xl border border-emerald-500/20 hover:border-emerald-400/60 transition-all shrink-0 group"
            >
              <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0 flex items-center justify-center">
                <img
                  src={tech.icon}
                  alt={tech.name}
                  className="w-full h-full object-contain p-0.5 group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <span className="text-sm font-bold text-zinc-200 group-hover:text-emerald-400 transition-colors">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mt-12">
        <Link
          href="/tech-stack"
          className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-emerald-400 transition-colors"
        >
          <span>{t('ดูเทคโนโลยีและความสามารถทั้งหมด', 'View All Core Technologies & Competencies')}</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  )
}

