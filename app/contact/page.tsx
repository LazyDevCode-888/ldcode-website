'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import companyData from '@/data/company.json'
import faqsData from '@/data/faqs.json'
import { Mail, Phone, MapPin, Send, CheckCircle2, ChevronDown, Clock, ExternalLink, ShieldCheck } from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'
import { motion } from 'framer-motion'

function ContactFormContent() {
  const { t } = useLanguage()
  const searchParams = useSearchParams()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: 'Landing Page',
    budget: '< ฿5k',
    message: '',
    botcheck: '', // Honeypot field for free spam protection
  })

  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const [isServiceOpen, setIsServiceOpen] = useState(false)
  const [isBudgetOpen, setIsBudgetOpen] = useState(false)

  useEffect(() => {
    const serviceParam = searchParams.get('service')
    const estimateParam = searchParams.get('estimate')

    let mappedService = formData.service
    let mappedBudget = formData.budget
    let mappedMessage = formData.message

    if (serviceParam) {
      if (serviceParam === 'landing-page') mappedService = 'Landing Page'
      else if (serviceParam === 'corporate-website') mappedService = 'Corporate Web'
      else if (serviceParam === 'web-application') mappedService = 'Web App'
      else if (serviceParam === 'student-project') mappedService = 'Student Project'
      else if (serviceParam === 'wordpress-customization') mappedService = 'WordPress Optimize'
      else if (serviceParam === 'website-maintenance') mappedService = 'Website Maintenance'
    }

    if (estimateParam) {
      const estNum = Number(estimateParam)
      if (estNum > 0) {
        if (estNum < 5000) mappedBudget = '< ฿5k'
        else if (estNum >= 5000 && estNum < 15000) mappedBudget = '฿5k - ฿15k'
        else if (estNum >= 15000 && estNum <= 50000) mappedBudget = '฿15k - ฿50k'
        else if (estNum > 50000) mappedBudget = '> ฿50k'
        
        mappedMessage = `[ประเมินราคาร่างเริ่มต้นจากหน้าเว็บ: ฿${estNum.toLocaleString()}]\n`
      }
    }

    setFormData((prev) => ({
      ...prev,
      service: mappedService,
      budget: mappedBudget,
      message: mappedMessage,
    }))
  }, [searchParams])

  useEffect(() => {
    const handleGlobalClick = () => {
      setIsServiceOpen(false)
      setIsBudgetOpen(false)
    }
    window.addEventListener('click', handleGlobalClick)
    return () => window.removeEventListener('click', handleGlobalClick)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError(null)

    // Honeypot check: If bot filled hidden input, silently ignore
    if (formData.botcheck) {
      return
    }

    setIsSubmitting(true)

    // คีย์สำหรับส่งเมล
    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "e4c6c09b-1d7d-419b-abfc-f8cb5f87b8d0" 

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `New LDCode Web Inquiry from ${formData.name}`,
          from_name: "LDCode Website Form",
          ...formData,
        }),
      })

      const result = await response.json()
      if (result.success) {
        setSubmitted(true)
      } else {
        setSubmitError(result.message || t('การส่งข้อมูลล้มเหลว กรุณาลองใหม่อีกครั้ง', 'Submission failed. Please try again.'))
      }
    } catch (err) {
      setSubmitError(t('เกิดข้อผิดพลาดในการเชื่อมต่อเครือข่าย', 'A network error occurred. Please check your connection.'))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-24">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-center space-y-4"
      >
        <h1 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-emerald-400">
          {t('ติดต่อเรา', 'Get In Touch')}
        </h1>
        <p className="text-4xl sm:text-6xl font-extrabold tracking-tight">
          {t('เริ่มพัฒนาโครงการ', 'Start Your Digital')}{' '}
          <span className="text-code">{t('ของคุณวันนี้', 'Transformation')}</span>
        </p>
        <p className="max-w-2xl mx-auto text-zinc-400 text-base sm:text-lg">
          {t(
            'ส่งข้อมูลโครงการของคุณเพื่อรับการประเมินราคาและข้อเสนอทางเทคนิคโดยไม่คิดค่าใช้จ่ายภายใน 24 ชั่วโมง',
            'Send your project briefs to receive technical solutions advice and baseline budget estimates for free within 24 hours.'
          )}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Info & Channels */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="lg:col-span-5 space-y-8"
        >
          <div className="glass-card p-8 rounded-3xl border border-emerald-500/20 glow-emerald-hover space-y-6">
            <h2 className="text-2xl font-bold text-zinc-100">{t('ช่องทางการติดต่อตรง', 'Direct Contact')}</h2>
            <p className="text-sm text-zinc-400">
              {t(
                'สอบถามข้อมูล ปรึกษาข้อกำหนดทางเทคนิค หรือนัดหมายประชุมปรึกษาหารือออนไลน์',
                'Inquire about details, discuss coding criteria, or book virtual screen share meetings.'
              )}
            </p>

            <ul className="space-y-5">
              <li className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase text-zinc-400">{t('อีเมลสำหรับติดต่อ', 'Email Address')}</h3>
                  <a href={`mailto:${companyData.contact.email}`} className="text-sm font-semibold text-zinc-100 hover:text-emerald-400 transition-colors">
                    {companyData.contact.email}
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase text-zinc-400">{t('เบอร์โทรศัพท์', 'Phone Number')}</h3>
                  <a href={`tel:${companyData.contact.phone}`} className="text-sm font-semibold text-zinc-100 hover:text-emerald-400 transition-colors">
                    {companyData.contact.phone}
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 shrink-0">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 4.269 8.846 10.036 9.608.391.084.922.258 1.057.592.121.303.079.778.039 1.085l-.171 1.027c-.053.303-.242 1.186 1.039.647 1.281-.54 6.911-4.069 9.428-6.967 1.748-1.921 2.572-3.87 2.572-6.002z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase text-zinc-400">{t('LINE Official Account', 'LINE Official')}</h3>
                  <a href={`https://page.line.me/${companyData.contact.line.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-zinc-100 hover:text-emerald-400 transition-colors">
                    {companyData.contact.line}
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase text-zinc-400">{t('ที่ตั้งสำนักงาน', 'Office Location')}</h3>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {t(companyData.contact.address)}
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase text-zinc-400">{t('เวลาทำการ', 'Working Hours')}</h3>
                  <p className="text-xs text-zinc-300">
                    {t(companyData.contact.workingHours)}
                  </p>
                </div>
              </li>
            </ul>

            {/* Social Media Channels */}
            <div className="pt-2 border-t border-emerald-500/10 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                {t('ติดตามเราบนโซเชียลมีเดีย', 'Follow Us on Social Media')}
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {/* LINE Official */}
                <a
                  href={`https://page.line.me/${companyData.contact.line.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-4 rounded-2xl bg-[#00B900]/10 border border-[#00B900]/30 hover:bg-[#00B900]/20 hover:border-[#00B900]/60 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#00B900] flex items-center justify-center shrink-0 shadow-lg shadow-[#00B900]/30">
                    <svg className="w-5 h-5 text-white fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 4.269 8.846 10.036 9.608.391.084.922.258 1.057.592.121.303.079.778.039 1.085l-.171 1.027c-.053.303-.242 1.186 1.039.647 1.281-.54 6.911-4.069 9.428-6.967 1.748-1.921 2.572-3.87 2.572-6.002z"/>
                    </svg>
                  </div>
                  <div className="flex-grow">
                    <p className="text-sm font-bold text-zinc-100 group-hover:text-[#00B900] transition-colors">LINE Official Account</p>
                    <p className="text-xs text-zinc-500">{companyData.contact.line}</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-zinc-600 group-hover:text-[#00B900] transition-colors shrink-0" />
                </a>

                {/* Facebook */}
                <a
                  href={companyData.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-4 rounded-2xl bg-[#1877F2]/10 border border-[#1877F2]/30 hover:bg-[#1877F2]/20 hover:border-[#1877F2]/60 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#1877F2] flex items-center justify-center shrink-0 shadow-lg shadow-[#1877F2]/30">
                    <svg className="w-5 h-5 text-white fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </div>
                  <div className="flex-grow">
                    <p className="text-sm font-bold text-zinc-100 group-hover:text-[#1877F2] transition-colors">Facebook</p>
                    <p className="text-xs text-zinc-500">LDCode Official Page</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-zinc-600 group-hover:text-[#1877F2] transition-colors shrink-0" />
                </a>

                {/* TikTok */}
                <a
                  href={companyData.socials.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/25 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center shrink-0 border border-white/10 shadow-lg">
                    <svg className="w-5 h-5 text-white fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
                    </svg>
                  </div>
                  <div className="flex-grow">
                    <p className="text-sm font-bold text-zinc-100 group-hover:text-white transition-colors">TikTok</p>
                    <p className="text-xs text-zinc-500">@ldcode</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-zinc-600 group-hover:text-white transition-colors shrink-0" />
                </a>

                {/* Instagram */}
                <a
                  href={companyData.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-[#833AB4]/10 via-[#FD1D1D]/10 to-[#F77737]/10 border border-[#E1306C]/30 hover:from-[#833AB4]/20 hover:via-[#FD1D1D]/20 hover:to-[#F77737]/20 hover:border-[#E1306C]/60 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737] flex items-center justify-center shrink-0 shadow-lg shadow-[#E1306C]/30">
                    <svg className="w-5 h-5 text-white fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </div>
                  <div className="flex-grow">
                    <p className="text-sm font-bold text-zinc-100 group-hover:text-[#E1306C] transition-colors">Instagram</p>
                    <p className="text-xs text-zinc-500">@ldcode.dev</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-zinc-600 group-hover:text-[#E1306C] transition-colors shrink-0" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Contact Form */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="lg:col-span-7"
        >
          <div className="glass-card p-8 sm:p-12 rounded-3xl border border-emerald-500/30 glow-emerald-box">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-400 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h2 className="text-2xl font-bold text-zinc-100">{t('ขอบคุณสำหรับข้อมูล!', 'Thank You!')}</h2>
                <p className="text-sm text-zinc-400 max-w-md mx-auto">
                  {t(
                    'ทีมงาน LDCode ได้รับข้อความเรียบร้อยแล้ว วิศวกรของเราจะติดต่อกลับภายใน 24 ชั่วโมง',
                    'LDCode engineers have received your inquiry. We will contact you back via email or phone within 24 hours.'
                  )}
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2.5 rounded-full text-xs font-bold text-black bg-emerald-400 hover:bg-emerald-300 transition-colors"
                >
                  {t('ส่งข้อมูลเพิ่มเติม', 'Send Another Inquiry')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="text-2xl font-bold text-zinc-100">{t('แบบฟอร์มประเมินราคาร่างโครงการ', 'Project Estimation Form')}</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase text-zinc-300">{t('ชื่อ-นามสกุลของคุณ *', 'Your Name *')}</label>
                    <input
                      type="text"
                      required
                      placeholder={t('สมชาย ใจดี', 'John Doe')}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-emerald-400 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase text-zinc-300">{t('อีเมลสำหรับติดต่อ *', 'Contact Email *')}</label>
                    <input
                      type="email"
                      required
                      placeholder="somchai@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-emerald-400 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase text-zinc-300">{t('เบอร์โทรศัพท์ติดต่อ', 'Phone Number')}</label>
                    <input
                      type="tel"
                      placeholder="081-234-5678"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-emerald-400 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase text-zinc-300">{t('ชื่อบริษัท / องค์กร', 'Company Name')}</label>
                    <input
                      type="text"
                      placeholder="Company Co., Ltd."
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-emerald-400 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase text-zinc-300">{t('ประเภทงานบริการ', 'Target Service')}</label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          setIsServiceOpen(!isServiceOpen)
                          setIsBudgetOpen(false)
                        }}
                        className={`w-full flex items-center justify-between bg-zinc-950 border rounded-xl px-4 py-3 text-sm text-zinc-100 focus:outline-none transition-colors text-left cursor-pointer ${
                          isServiceOpen ? 'border-emerald-400 ring-1 ring-emerald-400/30' : 'border-zinc-800 hover:border-zinc-700'
                        }`}
                      >
                        <span>
                          {formData.service === 'Landing Page' && t('รับทำเว็บไซต์หน้าเดียว (Landing Page)', 'Landing Page Development')}
                          {formData.service === 'Corporate Web' && t('รับทำเว็บไซต์บริษัท / องค์กร', 'Corporate Website Development')}
                          {formData.service === 'Web App' && t('รับทำ Web Application', 'Full-Stack Web Application')}
                          {formData.service === 'Student Project' && t('รับทำโปรเจกต์นักศึกษา / โปรเจกต์จบ', 'Student Project Support')}
                          {formData.service === 'WordPress Optimize' && t('แก้ไข ปรับแต่ง WordPress', 'WordPress Customization')}
                          {formData.service === 'Website Maintenance' && t('แก้ไขและปรับปรุงระบบเดิม', 'Website Maintenance & Fixes')}
                        </span>
                        <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform ${isServiceOpen ? 'rotate-180' : ''}`} />
                      </button>

                      {isServiceOpen && (
                        <div className="absolute z-50 mt-2 w-full glass-card bg-zinc-950/95 border border-emerald-500/20 rounded-xl overflow-hidden shadow-2xl py-1">
                          {[
                            { value: 'Landing Page', label: t('รับทำเว็บไซต์หน้าเดียว (Landing Page)', 'Landing Page Development') },
                            { value: 'Corporate Web', label: t('รับทำเว็บไซต์บริษัท / องค์กร', 'Corporate Website Development') },
                            { value: 'Web App', label: t('รับทำ Web Application', 'Full-Stack Web Application') },
                            { value: 'Student Project', label: t('รับทำโปรเจกต์นักศึกษา / โปรเจกต์จบ', 'Student Project Support') },
                            { value: 'WordPress Optimize', label: t('แก้ไข ปรับแต่ง WordPress', 'WordPress Customization') },
                            { value: 'Website Maintenance', label: t('แก้ไขและปรับปรุงระบบเดิม', 'Website Maintenance & Fixes') },
                          ].map((opt) => (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() => {
                                setFormData({ ...formData, service: opt.value })
                                setIsServiceOpen(false)
                              }}
                              className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-emerald-950/40 hover:text-emerald-400 ${
                                formData.service === opt.value ? 'bg-emerald-950/20 text-emerald-400 font-semibold' : 'text-zinc-300'
                              }`}
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase text-zinc-300">{t('งบประมาณประมาณการ', 'Estimated Budget')}</label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          setIsBudgetOpen(!isBudgetOpen)
                          setIsServiceOpen(false)
                        }}
                        className={`w-full flex items-center justify-between bg-zinc-950 border rounded-xl px-4 py-3 text-sm text-zinc-100 focus:outline-none transition-colors text-left cursor-pointer ${
                          isBudgetOpen ? 'border-emerald-400 ring-1 ring-emerald-400/30' : 'border-zinc-800 hover:border-zinc-700'
                        }`}
                      >
                        <span>
                          {formData.budget === '< ฿5k' && t('น้อยกว่า ฿5,000', 'Less than ฿5,000')}
                          {formData.budget === '฿5k - ฿15k' && '฿5,000 - ฿15,000'}
                          {formData.budget === '฿15k - ฿50k' && '฿15,000 - ฿50,000'}
                          {formData.budget === '> ฿50k' && t('มากกว่า ฿50,000', 'More than ฿50,000')}
                        </span>
                        <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform ${isBudgetOpen ? 'rotate-180' : ''}`} />
                      </button>

                      {isBudgetOpen && (
                        <div className="absolute z-50 mt-2 w-full glass-card bg-zinc-950/95 border border-emerald-500/20 rounded-xl overflow-hidden shadow-2xl py-1">
                          {[
                            { value: '< ฿5k', label: t('น้อยกว่า ฿5,000', 'Less than ฿5,000') },
                            { value: '฿5k - ฿15k', label: '฿5,000 - ฿15,000' },
                            { value: '฿15k - ฿50k', label: '฿15,000 - ฿50,000' },
                            { value: '> ฿50k', label: t('มากกว่า ฿50,000', 'More than ฿50,000') },
                          ].map((opt) => (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() => {
                                setFormData({ ...formData, budget: opt.value })
                                setIsBudgetOpen(false)
                              }}
                              className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-emerald-950/40 hover:text-emerald-400 ${
                                formData.budget === opt.value ? 'bg-emerald-950/20 text-emerald-400 font-semibold' : 'text-zinc-300'
                              }`}
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase text-zinc-300">{t('ขอบเขตความต้องการโครงการ', 'Project Scope & Requirements')}</label>
                  <textarea
                    rows={4}
                    placeholder={t('อธิบายรายละเอียดโครงการ หรือฟีเจอร์การทำงานที่คุณต้องการย่อ ๆ...', 'Briefly explain your project targets, modules, or reference layouts...')}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-emerald-400 transition-colors"
                  />
                </div>

                {/* Web3Forms Free Spam Protection (Honeypot) - Hidden from humans, traps bots */}
                <input
                  type="checkbox"
                  name="botcheck"
                  className="hidden"
                  style={{ display: 'none' }}
                  onChange={(e) => setFormData({ ...formData, botcheck: e.target.checked ? 'true' : '' })}
                />

                {submitError && (
                  <p className="text-sm font-semibold text-red-500 text-center py-2 bg-red-950/20 border border-red-500/30 rounded-xl">
                    {submitError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-3 py-4 rounded-xl text-base font-bold text-black bg-gradient-to-r from-emerald-400 to-emerald-300 hover:from-emerald-300 hover:to-emerald-400 transition-all shadow-xl shadow-emerald-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>{isSubmitting ? t('กำลังส่งข้อมูล...', 'Submitting...') : t('ส่งข้อมูลแบบสอบถาม', 'Submit Inquiry')}</span>
                  <Send className={`w-5 h-5 ${isSubmitting ? 'animate-pulse' : ''}`} />
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>

      {/* FAQ Accordion */}
      <motion.div 
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="space-y-8 max-w-4xl mx-auto"
      >
        <div className="text-center space-y-3">
          <h2 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-emerald-400">
            {t('คำถามที่พบบ่อย (FAQs)', 'Frequently Asked Questions')}
          </h2>
          <p className="text-3xl font-extrabold text-zinc-100">
            {t('คำถามที่พบบ่อย (FAQs)', 'Frequently Asked')} <span className="text-code">{t('', 'Questions')}</span>
          </p>
        </div>

        <div className="space-y-4">
          {faqsData.map((faq, index) => {
            const isOpen = openFaq === index
            return (
              <div
                key={index}
                className="glass-card rounded-2xl border border-emerald-500/20 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-zinc-100 hover:text-emerald-400 transition-colors"
                >
                  <span className="text-base sm:text-lg">{t(faq.q)}</span>
                  <ChevronDown className={`w-5 h-5 text-emerald-400 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-sm text-zinc-400 leading-relaxed border-t border-zinc-800/60 pt-4">
                    {t(faq.a)}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}

export default function ContactPage() {
  return (
    <Suspense fallback={
      <div className="py-32 text-center text-zinc-400 animate-pulse">
        Loading Contact Form...
      </div>
    }>
      <ContactFormContent />
    </Suspense>
  )
}
