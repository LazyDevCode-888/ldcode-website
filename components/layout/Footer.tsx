'use client'

import Link from 'next/link'
import Image from 'next/image'
import companyData from '@/data/company.json'
import { Mail, Phone, MapPin, Share2, Globe, MessageSquare, Code2 } from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="relative bg-[#050806] border-t border-emerald-950/60 pt-16 pb-12 overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-emerald-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-zinc-800/80">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-emerald-500/30">
                <Image
                  src="/image/LDCode_Logo.png"
                  alt="LDCode Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex items-center text-2xl font-bold tracking-tight">
                <span className="text-ld">LD</span>
                <span className="text-code ml-0.5">Code</span>
              </div>
            </Link>
            <p className="text-sm text-zinc-400 max-w-md leading-relaxed">
              {t(companyData.description)}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href={companyData.socials.github} target="_blank" rel="noreferrer" className="p-2.5 rounded-full bg-zinc-900 text-zinc-400 hover:text-emerald-400 hover:bg-emerald-950/50 border border-zinc-800 transition-colors" title="GitHub">
                <Code2 className="w-4 h-4" />
              </a>
              <a href={companyData.socials.linkedin} target="_blank" rel="noreferrer" className="p-2.5 rounded-full bg-zinc-900 text-zinc-400 hover:text-emerald-400 hover:bg-emerald-950/50 border border-zinc-800 transition-colors" title="LinkedIn">
                <Share2 className="w-4 h-4" />
              </a>
              <a href={companyData.socials.facebook} target="_blank" rel="noreferrer" className="p-2.5 rounded-full bg-zinc-900 text-zinc-400 hover:text-emerald-400 hover:bg-emerald-950/50 border border-zinc-800 transition-colors" title="Facebook">
                <Globe className="w-4 h-4" />
              </a>
              <a href={companyData.socials.twitter} target="_blank" rel="noreferrer" className="p-2.5 rounded-full bg-zinc-900 text-zinc-400 hover:text-emerald-400 hover:bg-emerald-950/50 border border-zinc-800 transition-colors" title="Twitter">
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-zinc-200 uppercase tracking-wider mb-4">{t('ลิงก์เมนู', 'Quick Links')}</h3>
            <ul className="space-y-2.5 text-sm text-zinc-400">
              <li><Link href="/" className="hover:text-emerald-400 transition-colors">{t('หน้าแรก', 'Home')}</Link></li>
              <li><Link href="/about" className="hover:text-emerald-400 transition-colors">{t('เกี่ยวกับเรา', 'About Us')}</Link></li>
              <li><Link href="/services" className="hover:text-emerald-400 transition-colors">{t('ขอบเขตบริการ', 'Services')}</Link></li>
              <li><Link href="/portfolio" className="hover:text-emerald-400 transition-colors">{t('ผลงานเด่น', 'Portfolio')}</Link></li>
              <li><Link href="/pricing" className="hover:text-emerald-400 transition-colors">{t('ประเมินราคา', 'Pricing Plans')}</Link></li>
              <li><Link href="/tech-stack" className="hover:text-emerald-400 transition-colors">{t('เทคโนโลยี', 'Tech Stack')}</Link></li>
              <li><Link href="/contact" className="hover:text-emerald-400 transition-colors">{t('ติดต่อเรา', 'Contact Us')}</Link></li>
            </ul>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="text-sm font-semibold text-zinc-200 uppercase tracking-wider mb-4">{t('บริการรับทำเว็บ', 'Core Services')}</h3>
            <ul className="space-y-2.5 text-sm text-zinc-400">
              <li><Link href="/services#landing-page" className="hover:text-emerald-400 transition-colors">{t('ทำ Landing Page', 'Landing Page')}</Link></li>
              <li><Link href="/services#corporate-website" className="hover:text-emerald-400 transition-colors">{t('ทำเว็บแนะนำบริษัท', 'Corporate Website')}</Link></li>
              <li><Link href="/services#web-application" className="hover:text-emerald-400 transition-colors">{t('ทำ Web Application', 'Web Applications')}</Link></li>
              <li><Link href="/services#student-project" className="hover:text-emerald-400 transition-colors">{t('ทำโปรเจกต์นักศึกษา', 'Student Project')}</Link></li>
              <li><Link href="/services#wordpress-customization" className="hover:text-emerald-400 transition-colors">{t('แก้ไข WordPress', 'WordPress Edits')}</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-sm font-semibold text-zinc-200 uppercase tracking-wider mb-4">{t('ข้อมูลติดต่อ', 'Contact Info')}</h3>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{t(companyData.contact.address)}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`mailto:${companyData.contact.email}`} className="hover:text-emerald-400 transition-colors">{companyData.contact.email}</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`tel:${companyData.contact.phone}`} className="hover:text-emerald-400 transition-colors">{companyData.contact.phone}</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} {companyData.name} Co., Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-zinc-300 transition-colors">{t('นโยบายความเป็นส่วนตัว', 'Privacy Policy')}</a>
            <a href="#" className="hover:text-zinc-300 transition-colors">{t('เงื่อนไขการใช้บริการ', 'Terms of Service')}</a>
            <a href="#" className="hover:text-zinc-300 transition-colors">{t('การตรวจสอบความปลอดภัย', 'Security Audit')}</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
