'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, ArrowUpRight, Code2 } from 'lucide-react'

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Tech Stack', href: '/tech-stack' },
  { name: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

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
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-black bg-emerald-400 font-semibold shadow-sm shadow-emerald-400/50'
                      : 'text-zinc-300 hover:text-emerald-400 hover:bg-emerald-950/30'
                  }`}
                >
                  {link.name}
                </Link>
              )
            })}
          </nav>

          {/* Action CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/contact"
              className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-black bg-gradient-to-r from-emerald-400 to-emerald-300 hover:from-emerald-300 hover:to-emerald-400 transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-400/40 hover:scale-[1.02]"
            >
              <span>Estimate Project</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-zinc-300 hover:text-emerald-400 hover:bg-zinc-900 border border-zinc-800"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-nav border-b border-emerald-500/20 px-4 pt-4 pb-6 mt-2 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
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
                <span>Estimate Project</span>
                <ArrowUpRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
