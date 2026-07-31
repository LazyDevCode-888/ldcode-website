'use client'

import { useState } from 'react'
import Link from 'next/link'
import pricingData from '@/data/pricing.json'
import { Check, ArrowRight, Calculator, Info } from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'

type ServiceType = 'landing-page' | 'corporate-website' | 'web-application' | 'student-project' | 'wordpress-customization'

export default function PricingPage() {
  const { t } = useLanguage()
  
  // Interactive Quote Calculator State
  const [serviceType, setServiceType] = useState<ServiceType>('landing-page')

  // Calculator Parameters
  // Landing Page parameters
  const [lpSections, setLpSections] = useState<number>(3)
  const [lpAnimation, setLpAnimation] = useState<boolean>(false)
  const [lpExternal, setLpExternal] = useState<boolean>(false)

  // Corporate Website parameters
  const [corpPages, setCorpPages] = useState<number>(3)
  const [corpAnimation, setCorpAnimation] = useState<boolean>(false)
  const [corpForms, setCorpForms] = useState<boolean>(false)
  const [corpMaps, setCorpMaps] = useState<boolean>(true)

  // Web App parameters
  const [appEntities, setAppEntities] = useState<number>(5)
  const [appDashboard, setAppDashboard] = useState<boolean>(true)
  const [appAuth, setAppAuth] = useState<boolean>(true)
  const [appApis, setAppApis] = useState<boolean>(false)

  // Student Project parameters
  const [studentPages, setStudentPages] = useState<number>(3)
  const [studentDashboard, setStudentDashboard] = useState<boolean>(true)
  const [studentAuth, setStudentAuth] = useState<boolean>(false)
  const [studentManual, setStudentManual] = useState<boolean>(false)

  // WordPress parameters
  const [wpScopeSize, setWpScopeSize] = useState<'S' | 'M' | 'L'>('S')
  const [wpSpeed, setWpSpeed] = useState<boolean>(false)
  const [wpThemeFix, setWpThemeFix] = useState<boolean>(false)
  const [wpPlugins, setWpPlugins] = useState<boolean>(false)

  // Calculate estimated price based on service type
  const calculateEstimate = () => {
    switch (serviceType) {
      case 'landing-page': {
        let price = 1500
        price += (lpSections - 3) * 300
        if (lpAnimation) price += 500
        if (lpExternal) price += 1000
        return price
      }
      case 'corporate-website': {
        let price = 4000
        price += (corpPages - 3) * 800
        if (corpAnimation) price += 1000
        if (corpForms) price += 500
        if (corpMaps) price += 500
        return price
      }
      case 'web-application': {
        let price = 15000
        price += (appEntities - 5) * 1500
        if (appDashboard) price += 5000
        if (appAuth) price += 3000
        if (appApis) price += 4000
        return price
      }
      case 'student-project': {
        let price = 2500
        price += (studentPages - 3) * 400
        if (studentDashboard) price += 1000
        if (studentAuth) price += 500
        if (studentManual) price += 500
        return price
      }
      case 'wordpress-customization': {
        let price = 1000
        if (wpScopeSize === 'M') price += 1500
        else if (wpScopeSize === 'L') price += 3000
        if (wpSpeed) price += 1000
        if (wpThemeFix) price += 800
        if (wpPlugins) price += 500
        return price
      }
      default:
        return 0
    }
  }

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-20">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-emerald-400">
          Budget-friendly Pricing Plans
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
        <div className="pt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
          <span>{t('สัญญาการรับประกันดูแลระบบและการดูแลความปลอดภัยเบื้องต้นรวมในราคาทุกชิ้นงาน', 'Support warranty and security monitoring are standard inclusions in all work')}</span>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch justify-center">
        {pricingData.plans.map((plan) => {
          return (
            <div
              key={plan.id}
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
                  <h3 className="text-2xl font-bold text-zinc-100">{plan.name}</h3>
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
            </div>
          )
        })}
      </div>

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
            {(['landing-page', 'corporate-website', 'web-application', 'student-project', 'wordpress-customization'] as ServiceType[]).map((type) => (
              <button
                key={type}
                onClick={() => setServiceType(type)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                  serviceType === type
                    ? 'bg-emerald-400 text-black border-emerald-400 shadow-md shadow-emerald-400/20'
                    : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-zinc-200'
                }`}
              >
                {type === 'landing-page' && 'Landing Page'}
                {type === 'corporate-website' && t('Corporate (3-5 หน้า)', 'Corporate (3-5 Pages)')}
                {type === 'web-application' && 'Web Application'}
                {type === 'student-project' && 'Student Project'}
                {type === 'wordpress-customization' && 'WordPress Edit'}
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
                {serviceType === 'landing-page' && t('Landing Page (เริ่มต้น ฿1,500): เหมาะสำหรับหน้าแนะนำสินค้า แนะนำธุรกิจ หรือแสดงผลงานเบื้องต้น ราคาคำนวณตามจำนวน Section เพิ่มเติม ระบบอนิเมชั่น และการเชื่อมต่อภายนอก', 'Landing Page (Starts at ฿1,500): Best for product showcases or profile intros. Price scales on sections count, custom animations, and API integrations.')}
                {serviceType === 'corporate-website' && t('Corporate Website (เริ่มต้น ฿4,000): เว็บไซต์บริษัท 3-5 หน้า ราคาจะขึ้นอยู่กับจำนวนหน้าเพิ่มเติม, การจัดทำฟอร์มติดต่อ, และระบบอนิเมชั่นการเปลี่ยนหน้า', 'Corporate Website (Starts at ฿4,000): Profile website for businesses (3-5 pages). Scaled based on extra pages, custom query forms, and page transition effects.')}
                {serviceType === 'web-application' && t('Web Application (เริ่มต้น ฿15,000): ระบบเว็บแอปพลิเคชันที่มีระบบหลังบ้านจัดการข้อมูลและฐานข้อมูลจริง ราคาแปรผันตามความซับซ้อนของข้อมูล (Entities), แดชบอร์ด และสิทธิ์ผู้ใช้งาน', 'Web Application (Starts at ฿15,000): Full-stack web system backed with relational database models. Scales on data complexity (Entities), dashboard reports, and roles logic.')}
                {serviceType === 'student-project' && t('Student Project (เริ่มต้น ฿2,500): ระบบพร้อมส่งอาจารย์ / นำเสนองาน ราคาคำนวณตามจำนวนหน้า, ระบบหลังบ้านสำหรับจัดการข้อมูลแบบ CRUD, และคู่มืออธิบายโค้ด', 'Student Project (Starts at ฿2,500): Fast codebase built for coursework, graduation reviews, or hackathons. Cost scales on page paths, CRUD requirements, and manuals.')}
                {serviceType === 'wordpress-customization' && t('WordPress Customization (เริ่มต้น ฿1,000): งานปรับแต่งระบบเดิม แก้ไข Layout ติดตั้งปลั๊กอิน หรือสปีดความเร็วเว็บ ราคาแปรผันตามสเกลปัญหาที่พบ', 'WordPress Customization (Starts at ฿1,000): Optimize layouts, configure plug-ins, or resolve speed delays. Quote adjusts per task severity.')}
              </div>
            </div>

            {/* Config Fields based on selected ServiceType */}
            {serviceType === 'landing-page' && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-zinc-300">{t('จำนวน Section ของเว็บ (เริ่มต้น 3 Section):', 'Number of Web Sections (Starts at 3):')}</span>
                    <span className="text-emerald-400 font-bold">{lpSections} Sections</span>
                  </div>
                  <input
                    type="range"
                    min={3}
                    max={12}
                    value={lpSections}
                    onChange={(e) => setLpSections(Number(e.target.value))}
                    className="w-full accent-emerald-400 bg-zinc-800 h-2 rounded-lg cursor-pointer"
                  />
                  <div className="text-[10px] text-zinc-500">{t('เพิ่มเติม Section ละ ฿300 (ฟรี 3 Section แรก)', 'Extra sections are ฿300 each (first 3 sections free)')}</div>
                </div>

                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={lpAnimation}
                      onChange={(e) => setLpAnimation(e.target.checked)}
                      className="w-4 h-4 rounded accent-emerald-400"
                    />
                    <div>
                      <span className="text-xs sm:text-sm text-zinc-300 group-hover:text-emerald-300 transition-colors">{t('เพิ่มระบบอนิเมชั่น / เอฟเฟกต์การเลื่อนขยับ (+฿500)', 'Add scroll animations & movement effects (+฿500)')}</span>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={lpExternal}
                      onChange={(e) => setLpExternal(e.target.checked)}
                      className="w-4 h-4 rounded accent-emerald-400"
                    />
                    <div>
                      <span className="text-xs sm:text-sm text-zinc-300 group-hover:text-emerald-300 transition-colors">{t('เชื่อมต่อบริการภายนอก เช่น Line Notify, Chat Bot (+฿1,000)', 'Connect third-party channels, e.g. Line Notify (+฿1,000)')}</span>
                    </div>
                  </label>
                </div>
              </div>
            )}

            {serviceType === 'corporate-website' && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-zinc-300">{t('จำนวนหน้าเว็บไซต์ที่ต้องการ (เริ่มต้น 3 หน้า):', 'Requested Website Pages (Starts at 3):')}</span>
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
                  <div className="text-[10px] text-zinc-500">{t('เพิ่มเติมหน้าละ ฿800 (ฟรี 3 หน้าแรก)', 'Extra pages are ฿800 each (first 3 pages free)')}</div>
                </div>

                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={corpAnimation}
                      onChange={(e) => setCorpAnimation(e.target.checked)}
                      className="w-4 h-4 rounded accent-emerald-400"
                    />
                    <span className="text-xs sm:text-sm text-zinc-300 group-hover:text-emerald-300 transition-colors">{t('อนิเมชั่นระดับพรีเมียม / Interactive GSAP (+฿1,000)', 'Premium interaction effects / GSAP scroll trigger (+฿1,000)')}</span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={corpForms}
                      onChange={(e) => setCorpForms(e.target.checked)}
                      className="w-4 h-4 rounded accent-emerald-400"
                    />
                    <span className="text-xs sm:text-sm text-zinc-300 group-hover:text-emerald-300 transition-colors">{t('เพิ่มระบบแบบฟอร์มติดต่อลูกค้าหลายส่วน (+฿500)', 'Add multi-section customer lead query forms (+฿500)')}</span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={corpMaps}
                      onChange={(e) => setCorpMaps(e.target.checked)}
                      className="w-4 h-4 rounded accent-emerald-400"
                    />
                    <span className="text-xs sm:text-sm text-zinc-300 group-hover:text-emerald-300 transition-colors">{t('เชื่อมต่อ Google Maps API และ Social Media (+฿500)', 'Google Maps API integration & Social panels (+฿500)')}</span>
                  </label>
                </div>
              </div>
            )}

            {serviceType === 'web-application' && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-zinc-300">{t('จำนวนตารางข้อมูล / Entities ในฐานข้อมูล (เริ่มต้น 5):', 'Database Entities / Schema Tables (Starts at 5):')}</span>
                    <span className="text-emerald-400 font-bold">{appEntities} Entities</span>
                  </div>
                  <input
                    type="range"
                    min={5}
                    max={25}
                    value={appEntities}
                    onChange={(e) => setAppEntities(Number(e.target.value))}
                    className="w-full accent-emerald-400 bg-zinc-800 h-2 rounded-lg cursor-pointer"
                  />
                  <div className="text-[10px] text-zinc-500">{t('เพิ่มเติม Entity ละ ฿1,500 (รวมการจัดการ CRUD ใน Dashboard หลังบ้าน)', 'Extra Entities are ฿1,500 each (includes related panel CRUD integration)')}</div>
                </div>

                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={appDashboard}
                      onChange={(e) => setAppDashboard(e.target.checked)}
                      className="w-4 h-4 rounded accent-emerald-400"
                    />
                    <span className="text-xs sm:text-sm text-zinc-300 group-hover:text-emerald-300 transition-colors">{t('ระบบ Admin Dashboard สรุปผลหลังบ้าน (+฿5,000)', 'Admin dashboard metrics panel backend (+฿5,000)')}</span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={appAuth}
                      onChange={(e) => setAppAuth(e.target.checked)}
                      className="w-4 h-4 rounded accent-emerald-400"
                    />
                    <span className="text-xs sm:text-sm text-zinc-300 group-hover:text-emerald-300 transition-colors">{t('ระบบสมาชิก & กำหนดสิทธิ์การใช้งาน (Role-based Authorization) (+฿3,000)', 'Member accounts & Role-based authentication gateways (+฿3,000)')}</span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={appApis}
                      onChange={(e) => setAppApis(e.target.checked)}
                      className="w-4 h-4 rounded accent-emerald-400"
                    />
                    <span className="text-xs sm:text-sm text-zinc-300 group-hover:text-emerald-300 transition-colors">{t('เชื่อมต่อ API ภายนอก (ระบบชำระเงิน, SMS, Google Maps) (+฿4,000)', 'External API linkages (Stripe payment, SMS gateway, maps) (+฿4,000)')}</span>
                  </label>
                </div>
              </div>
            )}

            {serviceType === 'student-project' && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-zinc-300">{t('จำนวนหน้าการทำงานของระบบ (เริ่มต้น 3 หน้า):', 'Application Working Views (Starts at 3):')}</span>
                    <span className="text-emerald-400 font-bold">{studentPages} {t('หน้า', 'Pages')}</span>
                  </div>
                  <input
                    type="range"
                    min={3}
                    max={15}
                    value={studentPages}
                    onChange={(e) => setStudentPages(Number(e.target.value))}
                    className="w-full accent-emerald-400 bg-zinc-800 h-2 rounded-lg cursor-pointer"
                  />
                  <div className="text-[10px] text-zinc-500">{t('เพิ่มเติมหน้าละ ฿400', 'Extra views are ฿400 each')}</div>
                </div>

                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={studentDashboard}
                      onChange={(e) => setStudentDashboard(e.target.checked)}
                      className="w-4 h-4 rounded accent-emerald-400"
                    />
                    <span className="text-xs sm:text-sm text-zinc-300 group-hover:text-emerald-300 transition-colors">{t('ระบบแอดมินหลังบ้าน (Admin CRUD Panel) (+฿1,000)', 'Admin CRUD panel features interface (+฿1,000)')}</span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={studentAuth}
                      onChange={(e) => setStudentAuth(e.target.checked)}
                      className="w-4 h-4 rounded accent-emerald-400"
                    />
                    <span className="text-xs sm:text-sm text-zinc-300 group-hover:text-emerald-300 transition-colors">{t('ระบบล็อกอินและลงทะเบียน (Login/Register Auth) (+฿500)', 'Login / signup session security handlers (+฿500)')}</span>
                  </label>

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
                      checked={wpSpeed}
                      onChange={(e) => setWpSpeed(e.target.checked)}
                      className="w-4 h-4 rounded accent-emerald-400"
                    />
                    <span className="text-xs sm:text-sm text-zinc-300 group-hover:text-emerald-300 transition-colors">{t('เพิ่มสปีดการโหลดและทำ PageSpeed Optimization (+฿1,000)', 'Improve caching & PageSpeed load scores optimization (+฿1,000)')}</span>
                  </label>

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
    </div>
  )
}
