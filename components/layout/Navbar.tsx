'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, ArrowUpRight, Globe } from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'
import { motion } from 'framer-motion'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { language, setLanguage, t } = useLanguage()

  const localizedLinks = [
    { name: t('หน้าแรก', 'Home'), href: '/' },
    { name: t('เกี่ยวกับเรา', 'About'), href: '/about' },
    { name: t('บริการ', 'Services'), href: '/services' },
    { name: t('โปรเจกต์', 'Portfolio'), href: '/portfolio' },
    { name: t('ราคา', 'Pricing'), href: '/pricing' },
    { name: t('เทคโนโลยี', 'Tech Stack'), href: '/tech-stack' },
    { name: t('ติดต่อเรา', 'Contact'), href: '/contact' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-nav py-3 shadow-2xl shadow-emerald-950/20' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-emerald-500/30 group-hover:border-emerald-400 transition-all shadow-md shadow-emerald-500/10">
              <Image
                src="/image/LDCode_Logo.png"
                alt="LDCode Logo"
                fill
                sizes="40px"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex items-center text-xl font-bold tracking-tight">
              <span className="text-ld">LD</span>
              <span className="text-code ml-0.5">Code</span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 glass-card px-4 py-1.5 rounded-full border border-emerald-500/20">
            {localizedLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-black font-semibold'
                      : 'text-zinc-300 hover:text-emerald-400'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeNavBackground"
                      className="absolute inset-0 bg-emerald-400 rounded-full -z-10 shadow-sm shadow-emerald-400/50"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {link.name}
                </Link>
              )
            })}
          </nav>

          {/* Action CTA Button & Language Switcher */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language Switcher */}
            <div className="flex items-center gap-1 glass-card p-1 rounded-full border border-emerald-500/20 text-xs font-bold shadow-md shadow-emerald-500/5">
              <button
                onClick={() => setLanguage('th')}
                className={`relative px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                  language === 'th'
                    ? 'text-black'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {language === 'th' && (
                  <motion.span
                    layoutId="activeLangBackground"
                    className="absolute inset-0 bg-emerald-400 rounded-full -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                TH
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`relative px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                  language === 'en'
                    ? 'text-black'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {language === 'en' && (
                  <motion.span
                    layoutId="activeLangBackground"
                    className="absolute inset-0 bg-emerald-400 rounded-full -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                EN
              </button>
            </div>

            <Link
              href="/contact"
              className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-black bg-gradient-to-r from-emerald-400 to-emerald-300 hover:from-emerald-300 hover:to-emerald-400 transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-400/40 hover:scale-[1.02]"
            >
              <span>{t('ประเมินราคาโครงการ', 'Estimate Project')}</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          {/* Mobile Navigation Control */}
          <div className="flex md:hidden items-center gap-2">
            {/* Mobile Language Switcher */}
            <div className="flex items-center gap-1 glass-card p-0.5 rounded-full border border-emerald-500/20 text-[10px] font-bold">
              <button
                onClick={() => setLanguage('th')}
                className={`relative px-2 py-0.5 rounded-full transition-all ${
                  language === 'th' ? 'text-black' : 'text-zinc-400'
                }`}
              >
                {language === 'th' && (
                  <motion.span
                    layoutId="activeLangBackgroundMobile"
                    className="absolute inset-0 bg-emerald-400 rounded-full -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                TH
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`relative px-2 py-0.5 rounded-full transition-all ${
                  language === 'en' ? 'text-black' : 'text-zinc-400'
                }`}
              >
                {language === 'en' && (
                  <motion.span
                    layoutId="activeLangBackgroundMobile"
                    className="absolute inset-0 bg-emerald-400 rounded-full -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                EN
              </button>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-zinc-300 hover:text-emerald-400 hover:bg-zinc-900 border border-zinc-800"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-nav border-b border-emerald-500/20 px-4 pt-4 pb-6 mt-2 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-2">
            {localizedLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-xl text-base font-medium transition-all ${
                    isActive
                      ? 'text-black bg-emerald-400 font-semibold'
                      : 'text-zinc-300 hover:text-emerald-400 hover:bg-zinc-900/80'
                  }`}
                >
                  {link.name}
                </Link>
              )
            })}
            <div className="pt-2">
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-base font-semibold text-black bg-emerald-400 shadow-lg shadow-emerald-500/30"
              >
                <span>{t('ประเมินราคาโครงการ', 'Estimate Project')}</span>
                <ArrowUpRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
