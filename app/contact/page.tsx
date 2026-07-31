'use client'

import { useState } from 'react'
import companyData from '@/data/company.json'
import faqsData from '@/data/faqs.json'
import { Mail, Phone, MapPin, Send, CheckCircle2, ChevronDown, Clock } from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'

export default function ContactPage() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: 'Web Development',
    budget: '฿50k - ฿100k',
    message: '',
  })

  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)

    // คีย์สำหรับส่งเมล (ผู้ใช้นำไปสมัครฟรีและใส่ตรงนี้ได้เลย)
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
      <div className="text-center space-y-4">
        <h1 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-emerald-400">
          Get In Touch
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
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Info & Channels */}
        <div className="lg:col-span-5 space-y-8">
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
          </div>
        </div>

        {/* Right Contact Form */}
        <div className="lg:col-span-7">
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
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-100 focus:outline-none focus:border-emerald-400 transition-colors"
                    >
                      <option value="Landing Page">Landing Page Development</option>
                      <option value="Corporate Web">Corporate Website Development</option>
                      <option value="Web App">Full-Stack Web Application</option>
                      <option value="Student Project">Student Project Support</option>
                      <option value="WordPress Optimize">WordPress Customization</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase text-zinc-300">{t('งบประมาณประมาณการ', 'Estimated Budget')}</label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-100 focus:outline-none focus:border-emerald-400 transition-colors"
                    >
                      <option value="< ฿5k">{t('น้อยกว่า ฿5,000', 'Less than ฿5,000')}</option>
                      <option value="฿5k - ฿15k">฿5,000 - ฿15,000</option>
                      <option value="฿15k - ฿50k">฿15,000 - ฿50,000</option>
                      <option value="> ฿50k">{t('มากกว่า ฿50,000', 'More than ฿50,000')}</option>
                    </select>
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
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="space-y-8 max-w-4xl mx-auto">
        <div className="text-center space-y-3">
          <h2 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-emerald-400">
            Frequently Asked Questions
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
      </div>
    </div>
  )
}
