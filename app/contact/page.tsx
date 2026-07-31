'use client'

import { useState } from 'react'
import companyData from '@/data/company.json'
import faqsData from '@/data/faqs.json'
import { Mail, Phone, MapPin, Send, CheckCircle2, ChevronDown, MessageSquare, Clock } from 'lucide-react'

export default function ContactPage() {
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
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-24">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-emerald-400">
          Get In Touch
        </h1>
        <p className="text-4xl sm:text-6xl font-extrabold tracking-tight">
          Start Your Digital <span className="text-code">Transformation</span>
        </p>
        <p className="max-w-2xl mx-auto text-zinc-400 text-base sm:text-lg">
          ส่งข้อมูลโครงการของคุณเพื่อรับการประเมินราคาและข้อเสนอทางเทคนิคโดยไม่คิดค่าใช้จ่ายภายใน 24 ชั่วโมง
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Info & Channels */}
        <div className="lg:col-span-5 space-y-8">
          <div className="glass-card p-8 rounded-3xl border border-emerald-500/20 glow-emerald-hover space-y-6">
            <h2 className="text-2xl font-bold text-zinc-100">Direct Contact Channels</h2>
            <p className="text-sm text-zinc-400">
              สอบถามข้อมูล ปรึกษาข้อกำหนดทางเทคนิค หรือนัดหมายประชุม Online / On-site
            </p>

            <ul className="space-y-5">
              <li className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase text-zinc-400">Email Address</h3>
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
                  <h3 className="text-xs font-bold uppercase text-zinc-400">Phone Number</h3>
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
                  <h3 className="text-xs font-bold uppercase text-zinc-400">Office Location</h3>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {companyData.contact.address}
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase text-zinc-400">Working Hours</h3>
                  <p className="text-xs text-zinc-300">
                    {companyData.contact.workingHours}
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
                <h2 className="text-2xl font-bold text-zinc-100">ขอบคุณสำหรับข้อมูล!</h2>
                <p className="text-sm text-zinc-400 max-w-md mx-auto">
                  ทีมงาน LDCode ได้รับข้อความเรียบร้อยแล้ว วิศวกรของเราจะติดต่อกลับภายใน 24 ชั่วโมง
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2.5 rounded-full text-xs font-bold text-black bg-emerald-400 hover:bg-emerald-300 transition-colors"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="text-2xl font-bold text-zinc-100">Project Estimation Form</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase text-zinc-300">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="สมชาย ใจดี"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-emerald-400 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase text-zinc-300">Work Email *</label>
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
                    <label className="text-xs font-bold uppercase text-zinc-300">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="081-234-5678"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-emerald-400 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase text-zinc-300">Company Name</label>
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
                    <label className="text-xs font-bold uppercase text-zinc-300">Target Service</label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-100 focus:outline-none focus:border-emerald-400 transition-colors"
                    >
                      <option value="Web Development">Next.js Web Development</option>
                      <option value="Mobile App">React Native Mobile App</option>
                      <option value="Cloud DevOps">Cloud & DevOps Scaling</option>
                      <option value="AI Solution">AI & RAG Integration</option>
                      <option value="Enterprise Microservices">Enterprise Microservices</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase text-zinc-300">Estimated Budget</label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-100 focus:outline-none focus:border-emerald-400 transition-colors"
                    >
                      <option value="< ฿50k">น้อยกว่า ฿50,000</option>
                      <option value="฿50k - ฿100k">฿50,000 - ฿100,000</option>
                      <option value="฿100k - ฿250k">฿100,000 - ฿250,000</option>
                      <option value="> ฿250k">มากกว่า ฿250,000</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase text-zinc-300">Project Requirements & Scope</label>
                  <textarea
                    rows={4}
                    placeholder="อธิบายรายละเอียดโครงการ ฟีเจอร์ที่ต้องการ หรือเป้าหมายทางธุรกิจ..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-emerald-400 transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-3 py-4 rounded-xl text-base font-bold text-black bg-gradient-to-r from-emerald-400 to-emerald-300 hover:from-emerald-300 hover:to-emerald-400 transition-all shadow-xl shadow-emerald-500/30"
                >
                  <span>Submit Inquiry</span>
                  <Send className="w-5 h-5" />
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
            คำถามที่พบบ่อย (FAQs)
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
                  <span className="text-base sm:text-lg">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-emerald-400 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-sm text-zinc-400 leading-relaxed border-t border-zinc-800/60 pt-4">
                    {faq.a}
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
