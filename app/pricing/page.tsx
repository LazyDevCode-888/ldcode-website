'use client'

import { useState } from 'react'
import Link from 'next/link'
import pricingData from '@/data/pricing.json'
import { Check, ArrowRight, Calculator, Info, GraduationCap, ExternalLink } from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'
import { motion } from 'framer-motion'

type ServiceType = 'landing-page' | 'corporate-website' | 'web-application' | 'student-project' | 'wordpress-customization' | 'website-maintenance'

export default function PricingPage() {
  const { t } = useLanguage()
  
  // Interactive Quote Calculator State
  const [serviceType, setServiceType] = useState<ServiceType>('landing-page')

  // Calculator Parameters
  // Landing Page parameters
  const [lpForms, setLpForms] = useState<boolean>(false)
  const [lpExternalLine, setLpExternalLine] = useState<boolean>(false)
  const [lpExternalChatbot, setLpExternalChatbot] = useState<boolean>(false)

  // Corporate Website parameters
  const [corpPages, setCorpPages] = useState<number>(3)
  const [corpForms, setCorpForms] = useState<boolean>(false)
  const [corpExternalLine, setCorpExternalLine] = useState<boolean>(false)
  const [corpExternalChatbot, setCorpExternalChatbot] = useState<boolean>(false)

  // Web App parameters
  const [appApis, setAppApis] = useState<boolean>(false)

  // Student Project parameters
  const [studentManual, setStudentManual] = useState<boolean>(false)

  // WordPress parameters
  const [wpScopeSize, setWpScopeSize] = useState<'S' | 'M' | 'L'>('S')
  const [wpThemeFix, setWpThemeFix] = useState<boolean>(false)
  const [wpPlugins, setWpPlugins] = useState<boolean>(false)

  // Website Maintenance parameters
  const [maintScopeSize, setMaintScopeSize] = useState<'S' | 'M' | 'L'>('S')
  const [maintResponsive, setMaintResponsive] = useState<boolean>(false)
  const [maintDbRefactor, setMaintDbRefactor] = useState<boolean>(false)

  // Calculate estimated price based on service type
  const calculateEstimate = () => {
    switch (serviceType) {
      case 'landing-page': {
        let price = 1500
        if (lpForms) price += 300
        if (lpExternalLine) price += 300
        if (lpExternalChatbot) price += 300
        return price
      }
      case 'corporate-website': {
        let price = 4000
        if (corpPages > 5) {
          price += (corpPages - 5) * 800
        }
        if (corpForms) price += 300
        if (corpExternalLine) price += 300
        if (corpExternalChatbot) price += 300
        return price
      }
      case 'web-application': {
        let price = 15000
        if (appApis) price += 2500
        return price
      }
      case 'student-project': {
        let price = 1000
        if (studentManual) price += 500
        return price
      }
      case 'wordpress-customization': {
        let price = 1000
        if (wpScopeSize === 'M') price += 1500
        else if (wpScopeSize === 'L') price += 3000
        if (wpThemeFix) price += 800
        if (wpPlugins) price += 500
        return price
      }
      case 'website-maintenance': {
        let price = 1000
        if (maintScopeSize === 'M') price += 1500
        else if (maintScopeSize === 'L') price += 4000
        if (maintResponsive) price += 800
        if (maintDbRefactor) price += 1000
        return price
      }
      default:
        return 0
    }
  }

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-20">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-center space-y-4"
      >
        <h1 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-emerald-400">
          {t('แพ็กเกจราคาสุดคุ้มค่า', 'Budget-friendly Pricing Plans')}
        </h1>
        <p className="text-4xl sm:text-6xl font-extrabold tracking-tight">
          {t('อัตราค่าบริการและ', 'Pricing Rates &')}{' '}
          <span className="text-code">{t('การประเมินราคา', 'Cost Estimates')}</span>
        </p>
        <p className="max-w-2xl mx-auto text-zinc-400 text-base sm:text-lg">
          {t(
            'ราคาเริ่มต้นที่เข้าถึงได้จริงสำหรับทุกประเภทงาน ไม่มีค่าใช้จ่ายแอบแฝง สามารถประเมินราคาสุดท้ายตามจำนวนงานและฟังก์ชันที่คุณต้องการได้ทันที',
            'Affordable starting rates for every project type. Transparent estimation with zero hidden fees. Adjust parameters below to get instant quotes.'
          )}
        </p>
        <div className="pt-4 flex justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-bold text-center">
            <span>{t('สัญญาการรับประกันดูแลระบบและการดูแลความปลอดภัยเบื้องต้นรวมในราคาทุกชิ้นงาน', 'Support warranty and security monitoring are standard inclusions in all work')}</span>
          </div>
        </div>
      </motion.div>

      {/* Pricing Cards Grid */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch justify-center"
      >
        {pricingData.plans.map((plan) => {
          return (
            <motion.div
              key={plan.id}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    type: 'spring' as const,
                    stiffness: 80,
                    damping: 15,
                  },
                },
              }}
              className={`glass-card p-8 rounded-3xl border flex flex-col justify-between relative transition-all duration-300 ${
                plan.popular
                  ? 'border-emerald-400 bg-emerald-950/20 glow-emerald-box scale-[1.02] md:col-span-2 lg:col-span-1'
                  : 'border-emerald-500/20 hover:border-emerald-500/40'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-emerald-400 text-black text-xs font-extrabold tracking-wider uppercase shadow-lg shadow-emerald-400/50">
                  {t(plan.badge)}
                </div>
              )}

              {!plan.popular && (
                <div className="absolute -top-3.5 left-6 px-3 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-emerald-400 text-[10px] font-bold tracking-wide">
                  {t(plan.badge)}
                </div>
              )}

              <div className="space-y-6 mt-2">
                <div>
                  <h3 className="text-2xl font-bold text-zinc-100">{t(plan.name)}</h3>
                  <p className="text-xs text-zinc-400 mt-2 leading-relaxed h-12">{t(plan.description)}</p>
                </div>

                {/* Price Display */}
                <div className="flex items-baseline gap-1 pt-2">
                  <span className="text-xs text-zinc-400 font-semibold mr-1">{t('เริ่มต้น', 'Start')}</span>
                  <span className="text-3xl sm:text-5xl font-extrabold text-code tracking-tight">
                    ฿{plan.priceNum.toLocaleString()}
                  </span>
                  <span className="text-xs text-zinc-400 font-medium">
                    / {t('โครงการ', 'project')}
                  </span>
                </div>

                <div className="w-full h-px bg-zinc-800" />

                {/* Features List */}
                <ul className="space-y-3">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{t(feat)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8">
                <Link
                  href={`/services#${plan.id}`}
                  className={`w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${
                    plan.popular
                      ? 'bg-emerald-400 hover:bg-emerald-300 text-black shadow-lg shadow-emerald-400/30'
                      : 'glass-card hover:bg-zinc-800 text-zinc-100 border border-emerald-500/30'
                  }`}
                >
                  <span>{t('ดูรายละเอียดขอบเขตงาน', 'Explore Scope')}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Interactive Custom Quote Calculator Widget */}
      <div className="glass-card p-6 sm:p-10 lg:p-12 rounded-3xl border border-emerald-500/30 bg-zinc-950/80 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-emerald-950 border border-emerald-500/30 text-emerald-400">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-zinc-100">{t('เครื่องมือประเมินงบประมาณออนไลน์', 'Interactive Quote Estimator')}</h2>
              <p className="text-xs text-zinc-400">{t('คำนวณราคาร่างเบื้องต้นตามสเปกและระดับฟังก์ชันที่คุณต้องการได้ทันที', 'Estimate baseline costs dynamically based on your custom requirements & features')}</p>
            </div>
          </div>

          {/* Service Selector Tab */}
          <div className="flex flex-wrap gap-2 max-w-xl">
            {(['landing-page', 'corporate-website', 'web-application', 'student-project', 'wordpress-customization', 'website-maintenance'] as ServiceType[]).map((type) => (
              <button
                key={type}
                onClick={() => setServiceType(type)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                  serviceType === type
                    ? 'bg-emerald-400 text-black border-emerald-400 shadow-md shadow-emerald-400/20'
                    : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-zinc-200'
                }`}
              >
                {type === 'landing-page' && t('รับทำเว็บไซต์หน้าเดียว (Landing Page)', 'Landing Page')}
                {type === 'corporate-website' && t('รับทำเว็บไซต์บริษัท / องค์กร', 'Corporate Website')}
                {type === 'web-application' && t('รับทำ Web Application', 'Web Application')}
                {type === 'student-project' && t('รับทำโปรเจกต์นักศึกษา', 'Student Project')}
                {type === 'wordpress-customization' && t('รับแก้ไข ปรับแต่ง WordPress', 'WordPress Edit')}
                {type === 'website-maintenance' && t('รับแก้ไขและปรับปรุงระบบเดิม', 'System Maintenance')}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Dynamic Configuration Controls - Left (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 flex items-start gap-3">
              <Info className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div className="text-xs text-zinc-400 leading-relaxed">
                {serviceType === 'landing-page' && t('รับทำเว็บไซต์หน้าเดียว / Landing Page (เริ่มต้น ฿1,500): เหมาะสำหรับหน้าแนะนำสินค้า แนะนำธุรกิจ หรือแสดงผลงานเบื้องต้น เว็บไซต์หน้าเดียวสมบูรณ์แบบพร้อมใช้งาน', 'Landing Page (Starts at ฿1,500): Best for product showcases or profile intros. Complete single-page website ready to deploy.')}
                {serviceType === 'corporate-website' && t('รับทำเว็บไซต์บริษัท / องค์กร (เริ่มต้น ฿4,000): เว็บไซต์บริษัท 3-5 หน้า (รวม 5 หน้าแรกราคาเท่าเดิม ฿4,000) หากเพิ่มเติมจาก 5 หน้า คิดเพิ่มหน้าละ ฿800', 'Corporate Website (Starts at ฿4,000): Profile website for businesses (Includes 3-5 pages for ฿4,000). Extra pages beyond 5 are ฿800 each.')}
                {serviceType === 'web-application' && t('รับทำ Web Application (เริ่มต้น ฿15,000): ระบบเว็บแอปพลิเคชันที่มีระบบหลังบ้านจัดการข้อมูลและฐานข้อมูลจริง (รายละเอียดตารางข้อมูล/Entities สามารถคุยตกลงขอบเขตงานเพิ่มเติมได้)', 'Web Application (Starts at ฿15,000): Full-stack web system backed with relational database models. Specific entities/data scopes can be discussed during consultation.')}
                {serviceType === 'student-project' && t('รับทำโปรเจกต์นักศึกษา / โปรเจกต์จบ (เริ่มต้น ฿1,000): ระบบพร้อมส่งอาจารย์ / นำเสนองาน (รายละเอียดขอบเขตงานและฟังก์ชันสามารถส่งโจทย์เพื่อประเมินได้)', 'Student Project (Starts at ฿1,000): Fast codebase built for coursework, graduation reviews, or hackathons. Details & specifications can be submitted for review.')}
                {serviceType === 'wordpress-customization' && t('รับแก้ไข ปรับแต่ง WordPress (เริ่มต้น ฿1,000): งานปรับแต่งระบบเดิม แก้ไข Layout ติดตั้งปลั๊กอิน ราคาแปรผันตามสเกลปัญหาที่พบ', 'WordPress Customization (Starts at ฿1,000): Optimize layouts, configure plug-ins, or resolve issues. Quote adjusts per task severity.')}
                {serviceType === 'website-maintenance' && t('รับแก้ไขและปรับปรุงระบบเดิม (เริ่มต้น ฿1,000): แก้ไขข้อผิดพลาด เพิ่มฟีเจอร์ ปรับปรุงประสิทธิภาพ หรือพัฒนาต่อยอดระบบเดิมโดยไม่ต้องเริ่มใหม่', 'Website Maintenance (Starts at ฿1,000): Fix bugs, add features, optimize performance, or scale up existing systems without rebuilding.')}
              </div>
            </div>

            {serviceType === 'landing-page' && (
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={lpForms}
                      onChange={(e) => setLpForms(e.target.checked)}
                      className="w-4 h-4 rounded accent-emerald-400"
                    />
                    <span className="text-xs sm:text-sm text-zinc-300 group-hover:text-emerald-300 transition-colors">{t('เพิ่มระบบแบบฟอร์มติดต่อลูกค้าหลายส่วน (+฿300)', 'Add multi-section customer lead query forms (+฿300)')}</span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={lpExternalLine}
                      onChange={(e) => setLpExternalLine(e.target.checked)}
                      className="w-4 h-4 rounded accent-emerald-400"
                    />
                    <span className="text-xs sm:text-sm text-zinc-300 group-hover:text-emerald-300 transition-colors">{t('เชื่อมต่อบริการ Line Notify (+฿300)', 'Connect Line Notify (+฿300)')}</span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={lpExternalChatbot}
                      onChange={(e) => setLpExternalChatbot(e.target.checked)}
                      className="w-4 h-4 rounded accent-emerald-400"
                    />
                    <span className="text-xs sm:text-sm text-zinc-300 group-hover:text-emerald-300 transition-colors">{t('เชื่อมต่อบริการ Chat Bot (+฿300)', 'Connect Chat Bot (+฿300)')}</span>
                  </label>
                </div>
              </div>
            )}

            {serviceType === 'corporate-website' && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-zinc-300">{t('จำนวนหน้าเว็บไซต์ที่ต้องการ (รวมในราคาเริ่มต้น 3–5 หน้า):', 'Requested Website Pages (Includes 3–5 pages):')}</span>
                    <span className="text-emerald-400 font-bold">{corpPages} {t('หน้า', 'Pages')}</span>
                  </div>
                  <input
                    type="range"
                    min={3}
                    max={15}
                    value={corpPages}
                    onChange={(e) => setCorpPages(Number(e.target.value))}
                    className="w-full accent-emerald-400 bg-zinc-800 h-2 rounded-lg cursor-pointer"
                  />
                  <div className="text-[10px] text-zinc-500">{t('ฟรี 1–5 หน้าแรก (หากเกิน 5 หน้า คิดเพิ่มหน้าละ ฿800)', 'First 1–5 pages included in ฿4,000 baseline (Extra pages beyond 5 are ฿800 each)')}</div>
                </div>

                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={corpForms}
                      onChange={(e) => setCorpForms(e.target.checked)}
                      className="w-4 h-4 rounded accent-emerald-400"
                    />
                    <span className="text-xs sm:text-sm text-zinc-300 group-hover:text-emerald-300 transition-colors">{t('เพิ่มระบบแบบฟอร์มติดต่อลูกค้าหลายส่วน (+฿300)', 'Add multi-section customer lead query forms (+฿300)')}</span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={corpExternalLine}
                      onChange={(e) => setCorpExternalLine(e.target.checked)}
                      className="w-4 h-4 rounded accent-emerald-400"
                    />
                    <span className="text-xs sm:text-sm text-zinc-300 group-hover:text-emerald-300 transition-colors">{t('เชื่อมต่อบริการ Line Notify (+฿300)', 'Connect Line Notify (+฿300)')}</span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={corpExternalChatbot}
                      onChange={(e) => setCorpExternalChatbot(e.target.checked)}
                      className="w-4 h-4 rounded accent-emerald-400"
                    />
                    <span className="text-xs sm:text-sm text-zinc-300 group-hover:text-emerald-300 transition-colors">{t('เชื่อมต่อบริการ Chat Bot (+฿300)', 'Connect Chat Bot (+฿300)')}</span>
                  </label>
                </div>
              </div>
            )}

            {serviceType === 'web-application' && (
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={appApis}
                      onChange={(e) => setAppApis(e.target.checked)}
                      className="w-4 h-4 rounded accent-emerald-400"
                    />
                    <span className="text-xs sm:text-sm text-zinc-300 group-hover:text-emerald-300 transition-colors">{t('เชื่อมต่อ API ภายนอก (ระบบชำระเงิน, SMS, Google Maps) (+฿2,500)', 'External API linkages (Stripe payment, SMS gateway, maps) (+฿2,500)')}</span>
                  </label>
                </div>
              </div>
            )}

            {serviceType === 'student-project' && (
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={studentManual}
                      onChange={(e) => setStudentManual(e.target.checked)}
                      className="w-4 h-4 rounded accent-emerald-400"
                    />
                    <span className="text-xs sm:text-sm text-zinc-300 group-hover:text-emerald-300 transition-colors">{t('คู่มือแนะนำการติดตั้งและสไลด์อธิบายโค้ด (+฿500)', 'Installation guide documents & code orientation slides (+฿500)')}</span>
                  </label>
                </div>
              </div>
            )}

            {serviceType === 'wordpress-customization' && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-zinc-300 block mb-2">{t('ขนาดขอบเขตงานหรือความซับซ้อนของปัญหา:', 'Task Severity / Codebase Complexity Scale:')}</span>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { val: 'S', label: t('ขนาดเล็ก (S)', 'Small (S)'), note: t('แก้ข้อความ/รูปภาพ', 'Text/Image edits') },
                      { val: 'M', label: t('ขนาดกลาง (M)', 'Medium (M)'), note: t('เพิ่มหน้า/แก้ Layout (+฿1,500)', 'Extra page/CSS (+฿1,500)') },
                      { val: 'L', label: t('ขนาดใหญ่ (L)', 'Large (L)'), note: t('แก้โครงสร้าง/บั๊กซับซ้อน (+฿3,000)', 'Plugin bugs/Core fix (+฿3,000)') }
                    ].map((item) => (
                      <button
                        key={item.val}
                        type="button"
                        onClick={() => setWpScopeSize(item.val as 'S' | 'M' | 'L')}
                        className={`p-3 rounded-xl border text-center transition-all ${
                          wpScopeSize === item.val
                            ? 'bg-emerald-950/60 border-emerald-400 text-emerald-400'
                            : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                        }`}
                      >
                        <div className="text-xs font-bold">{item.label}</div>
                        <div className="text-[10px] text-zinc-500 mt-1">{item.note}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={wpThemeFix}
                      onChange={(e) => setWpThemeFix(e.target.checked)}
                      className="w-4 h-4 rounded accent-emerald-400"
                    />
                    <span className="text-xs sm:text-sm text-zinc-300 group-hover:text-emerald-300 transition-colors">{t('แก้ไขและปรับแต่ง Theme / CSS Layout ปัญหาหน้าจอเพี้ยน (+฿800)', 'Repair layout bugs & adjust broken mobile responsiveness layouts (+฿800)')}</span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={wpPlugins}
                      onChange={(e) => setWpPlugins(e.target.checked)}
                      className="w-4 h-4 rounded accent-emerald-400"
                    />
                    <span className="text-xs sm:text-sm text-zinc-300 group-hover:text-emerald-300 transition-colors">{t('ติดตั้ง ตั้งค่า Plugin เสริมฟังก์ชันใหม่ (เช่น ฟอร์มติดต่อ, SEO) (+฿500)', 'Install & configure security plugins or SEO engines extensions (+฿500)')}</span>
                  </label>
                </div>
              </div>
            )}

            {serviceType === 'website-maintenance' && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-zinc-300 block mb-2">{t('ขนาดขอบเขตงานหรือความซับซ้อนของระบบเดิม:', 'Task Severity / System Complexity Scale:')}</span>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { val: 'S', label: t('ขนาดเล็ก (S)', 'Small (S)'), note: t('แก้บั๊กจุดเดียว/แก้ข้อความ', 'Single bug fix/text edit') },
                      { val: 'M', label: t('ขนาดกลาง (M)', 'Medium (M)'), note: t('เพิ่มหน้า/เพิ่มระบบย่อย (+฿1,500)', 'Extra page/sub-system (+฿1,500)') },
                      { val: 'L', label: t('ขนาดใหญ่ (L)', 'Large (L)'), note: t('เพิ่มฟีเจอร์ซับซ้อน/เชื่อม API (+฿4,000)', 'Complex feature/API integration (+฿4,000)') }
                    ].map((item) => (
                      <button
                        key={item.val}
                        type="button"
                        onClick={() => setMaintScopeSize(item.val as 'S' | 'M' | 'L')}
                        className={`p-3 rounded-xl border text-center transition-all ${
                          maintScopeSize === item.val
                            ? 'bg-emerald-950/60 border-emerald-400 text-emerald-400'
                            : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                        }`}
                      >
                        <div className="text-xs font-bold">{item.label}</div>
                        <div className="text-[10px] text-zinc-500 mt-1">{item.note}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={maintResponsive}
                      onChange={(e) => setMaintResponsive(e.target.checked)}
                      className="w-4 h-4 rounded accent-emerald-400"
                    />
                    <span className="text-xs sm:text-sm text-zinc-300 group-hover:text-emerald-300 transition-colors">{t('แก้ไขปัญหา Responsive หน้าจอเพี้ยน (+฿800)', 'Fix broken responsiveness & layouts compatibility (+฿800)')}</span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={maintDbRefactor}
                      onChange={(e) => setMaintDbRefactor(e.target.checked)}
                      className="w-4 h-4 rounded accent-emerald-400"
                    />
                    <span className="text-xs sm:text-sm text-zinc-300 group-hover:text-emerald-300 transition-colors">{t('ปรับปรุงฐานข้อมูล / แก้ไขโครงสร้าง Database (+฿1,000)', 'Refactor database schema / adjust database structure (+฿1,000)')}</span>
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* Estimator Result Box - Right (5 cols) */}
          <div className="lg:col-span-5 w-full lg:sticky lg:top-24">
            <div className="glass-card p-6 sm:p-8 rounded-2xl border border-emerald-500/30 text-center space-y-6 bg-zinc-950/90 shadow-2xl">
              <div>
                <span className="text-xs uppercase tracking-widest text-zinc-400 font-bold block mb-1">
                  {t('ประมาณการราคาเริ่มต้น', 'Estimated Starting Price')}
                </span>
                <span className="text-emerald-400 text-xs font-semibold">
                  {t('(ตามตัวเลือกปัจจุบันของคุณ)', '(Based on current options)')}
                </span>
              </div>

              <div className="text-4xl sm:text-5xl font-extrabold text-code tracking-tight py-2 border-y border-zinc-800/80 my-2">
                ฿{calculateEstimate().toLocaleString()}
              </div>

              <div className="space-y-2 text-left">
                <span className="text-xs font-bold text-zinc-300 block">{t('สิ่งที่จะได้รับในตัวเลือกนี้:', 'What is included in this selection:')}</span>
                <ul className="space-y-1.5">
                  <li className="flex items-start gap-2 text-[11px] text-zinc-400">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{t('ได้รับ Source Code ทั้งหมด โครงสร้างโค้ดเป็นระเบียบแยก Component', '100% full source code delivery with modular component files')}</span>
                  </li>
                  <li className="flex items-start gap-2 text-[11px] text-zinc-400">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{t('การดีไซน์แบบ Responsive รองรับการใช้งานมือถือและแท็บเล็ต', 'Responsive layouts fully optimized for mobile devices & tablets')}</span>
                  </li>
                  <li className="flex items-start gap-2 text-[11px] text-zinc-400">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{t('ติดตั้งขึ้นเซิร์ฟเวอร์ Deploy ฟรี หรือช่วยเชื่อมโยงโดเมนเดิมของลูกค้า', 'Free server publishing setups or domain mapping support')}</span>
                  </li>
                </ul>
              </div>

              <p className="text-[11px] text-zinc-500 max-w-xs mx-auto leading-relaxed">
                {t('*ราคานี้เป็นราคาประเมินราคาร่างเริ่มต้นเท่านั้น ราคาสุดท้ายจะขึ้นอยู่กับขอบเขตงานจริงและการวิเคราะห์รายละเอียดเพิ่มเติม', '*This is an approximate starting estimate. Final quotation depends on actual work complexity analysis.')}
              </p>

              <Link
                href={`/contact?service=${serviceType}&estimate=${calculateEstimate()}`}
                className="w-full inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold text-black bg-emerald-400 hover:bg-emerald-300 transition-colors shadow-lg shadow-emerald-400/30"
              >
                <span>{t('ส่งใบเสนอราคาชิ้นนี้', 'Request Final Quote')}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Ecosystem Cross Promotion Banner */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-emerald-500/20 text-center space-y-4 max-w-4xl mx-auto mt-12">
        <h3 className="text-xl font-bold text-zinc-100">
          {t('ต้องการประหยัดงบในการเริ่มต้นสร้างโปรเจกต์?', 'Looking for Cost-Effective Starter Solutions?')}
        </h3>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto leading-relaxed">
          {t('เลือกซื้อซอร์สโค้ด Next.js, Golang API และเทมเพลตพร้อมใช้งานราคาประหยัดได้ที่ LDCode Hub',
             'Browse affordable Next.js starter codes, Golang APIs, and ready-to-use templates at LDCode Hub.')}
        </p>
        <a
          href="https://ldcode-hub.vercel.app/products"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold text-black bg-gradient-to-r from-emerald-400 to-emerald-300 hover:scale-105 transition-all shadow-md shadow-emerald-400/20"
        >
          <GraduationCap className="w-4 h-4 text-black" />
          <span>{t('เลือกดูซอร์สโค้ดสำเร็จรูปที่ LDCode Hub', 'Browse Source Codes at LDCode Hub')}</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

    </div>
  )
}
