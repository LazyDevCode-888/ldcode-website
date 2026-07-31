'use client'

import Image from 'next/image'
import teamData from '@/data/team.json'
import { Target, Eye, ShieldCheck, Zap, Award, HeartHandshake } from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'

export default function AboutPage() {
  const { t } = useLanguage()

  return (
    <div className="py-16 space-y-24">
      {/* Hero Header */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-6">
        <h1 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-emerald-400">
          About LDCode
        </h1>
        <p className="text-4xl sm:text-6xl font-extrabold tracking-tight">
          {t('ผู้นำด้านการพัฒนา', 'Pioneering the Next Era of')} <br className="hidden sm:inline" />
          <span className="text-code">{t('เว็บไซต์และระบบระดับพรีเมียม', 'Digital Engineering')}</span>
        </p>
        <p className="max-w-3xl mx-auto text-zinc-400 text-base sm:text-xl leading-relaxed">
          {t(
            'LDCode คือกลุ่มวิศวกรซอฟต์แวร์และนักออกแบบผู้หลงใหลในการทำเว็บไซต์หน้าเดียว (Landing Page), เว็บไซต์บริษัท, และระบบเว็บแอปพลิเคชันที่มีดีไซน์ทันสมัย โหลดเร็ว ปลอดภัย และตอบโจทย์ทุกความต้องการของธุรกิจคุณ',
            'LDCode is a dedicated team of software developers and designers specializing in modern, fast, responsive landing pages, corporate websites, and custom full-stack web applications tailored for your business success.'
          )}
        </p>
      </section>

      {/* Vision & Mission */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-card p-8 sm:p-12 rounded-3xl border border-emerald-500/20 glow-emerald-hover space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Eye className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-zinc-100">{t('วิสัยทัศน์ (Our Vision)', 'Our Vision')}</h2>
          <p className="text-zinc-400 leading-relaxed">
            {t(
              'มุ่งสร้างสรรค์ผลงานพัฒนาเว็บไซต์และซอฟต์แวร์ระดับชั้นนำ ที่โดดเด่นด้วยดีไซน์อันล้ำสมัย ใส่ใจในความเร็วและประสิทธิภาพการทำงานสูงสุด พร้อมรองรับการเติบโตอย่างไร้ขีดจำกัด',
              'To be the leading modern web agency delivering premium digital platforms, combining elegant aesthetics with maximum page performance to scale your online presence.'
            )}
          </p>
        </div>

        <div className="glass-card p-8 sm:p-12 rounded-3xl border border-emerald-500/20 glow-emerald-hover space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Target className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-zinc-100">{t('พันธกิจ (Our Mission)', 'Our Mission')}</h2>
          <p className="text-zinc-400 leading-relaxed">
            {t(
              'มุ่งมั่นส่งมอบเว็บไซต์และเว็บแอปพลิเคชันที่มีโครงสร้างโค้ดสะอาด เป็นระเบียบเรียบร้อย ปลอดภัย ต่อยอดง่าย เพื่อให้ลูกค้าได้รับบริการระดับพรีเมียมและสร้างความคุ้มค่าสูงสุดแก่ผู้ใช้งานจริง',
              'To engineer custom codebases adhering to clean architecture standards, assuring secure, accessible, responsive websites that deliver real business growth.'
            )}
          </p>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-[#050806] py-20 border-y border-emerald-950/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-emerald-400">
              Guiding Principles
            </h2>
            <p className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              {t('คุณค่าหลัก', 'Our Core')} <span className="text-code">{t('ในการทำงาน', 'Values')}</span>
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-card p-6 rounded-2xl border border-emerald-500/20 space-y-3">
              <Zap className="w-8 h-8 text-emerald-400" />
              <h3 className="text-lg font-bold text-zinc-100">{t('ความเร็วและประสิทธิภาพ', 'Speed & Performance')}</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {t('พัฒนาเว็บไซต์ที่โหลดรวดเร็วลื่นไหล เพื่อลดอัตรา Bounce Rate', 'Lightning-fast loading speeds to retain visitors and rank higher.')}
              </p>
            </div>
            <div className="glass-card p-6 rounded-2xl border border-emerald-500/20 space-y-3">
              <ShieldCheck className="w-8 h-8 text-emerald-400" />
              <h3 className="text-lg font-bold text-zinc-100">{t('ความปลอดภัยสูงสุด', 'Uncompromised Security')}</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {t('ออกแบบและติดตั้งระบบที่มีความรัดกุม ปลอดภัยจากภัยคุกคาม', 'Adhering to standard web security practices to keep your data safe.')}
              </p>
            </div>
            <div className="glass-card p-6 rounded-2xl border border-emerald-500/20 space-y-3">
              <Award className="w-8 h-8 text-emerald-400" />
              <h3 className="text-lg font-bold text-zinc-100">{t('ประณีตและเป็นสากล', 'Craftsmanship')}</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {t('ใส่ใจในการออกแบบ UI/UX ที่สวยงามทันสมัยและตอบโจทย์แบรนด์', 'Modern web designs with customized details to wow every customer.')}
              </p>
            </div>
            <div className="glass-card p-6 rounded-2xl border border-emerald-500/20 space-y-3">
              <HeartHandshake className="w-8 h-8 text-emerald-400" />
              <h3 className="text-lg font-bold text-zinc-100">{t('ความรับผิดชอบและดูแลใจใส่', 'Reliable Support')}</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {t('ส่งมอบงานตรงเวลา ยินดีให้คำแนะนำในการดูแลระบบหลังการขาย', 'On-time delivery and dedicated support guides for your peace of mind.')}
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Developer Showcase */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-emerald-400">
            About the Developer
          </h2>
          <p className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            {t('ผู้สร้างสรรค์ผลงาน', 'Meet the Developer')}
          </p>
        </div>

        <div className="flex justify-center">
          {teamData.map((member) => (
            <div
              key={member.id}
              className="glass-card rounded-3xl overflow-hidden border border-emerald-500/20 glow-emerald-hover flex flex-col md:flex-row group max-w-2xl w-full"
            >
              <div className="relative h-64 md:h-auto md:w-64 shrink-0 overflow-hidden">
                <Image
                  src={member.avatar}
                  alt={member.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-8 space-y-4 flex-grow flex flex-col justify-center">
                <div>
                  <h3 className="text-xl font-bold text-zinc-100">{member.name}</h3>
                  <p className="text-xs font-semibold text-emerald-400 mt-1">{t(member.role)}</p>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed">{t(member.bio)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
