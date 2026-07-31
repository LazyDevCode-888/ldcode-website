import Link from 'next/link'
import Image from 'next/image'
import companyData from '@/data/company.json'
import { Mail, Phone, MapPin, ArrowRight, Globe, Share2, MessageSquare, Code2 } from 'lucide-react'

export default function Footer() {
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
              {companyData.description}
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
            <h3 className="text-sm font-semibold text-zinc-200 uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2.5 text-sm text-zinc-400">
              <li><Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-emerald-400 transition-colors">About Us</Link></li>
              <li><Link href="/services" className="hover:text-emerald-400 transition-colors">Services</Link></li>
              <li><Link href="/portfolio" className="hover:text-emerald-400 transition-colors">Portfolio Showcase</Link></li>
              <li><Link href="/pricing" className="hover:text-emerald-400 transition-colors">Pricing Packages</Link></li>
              <li><Link href="/tech-stack" className="hover:text-emerald-400 transition-colors">Tech Stack</Link></li>
              <li><Link href="/contact" className="hover:text-emerald-400 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="text-sm font-semibold text-zinc-200 uppercase tracking-wider mb-4">Core Services</h3>
            <ul className="space-y-2.5 text-sm text-zinc-400">
              <li><Link href="/services" className="hover:text-emerald-400 transition-colors">Next.js Web Dev</Link></li>
              <li><Link href="/services" className="hover:text-emerald-400 transition-colors">Mobile App Development</Link></li>
              <li><Link href="/services" className="hover:text-emerald-400 transition-colors">Cloud & DevOps Scaling</Link></li>
              <li><Link href="/services" className="hover:text-emerald-400 transition-colors">AI & LLM Integration</Link></li>
              <li><Link href="/services" className="hover:text-emerald-400 transition-colors">Enterprise Microservices</Link></li>
              <li><Link href="/services" className="hover:text-emerald-400 transition-colors">UI/UX Product Design</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-sm font-semibold text-zinc-200 uppercase tracking-wider mb-4">Contact Info</h3>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{companyData.contact.address}</span>
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
            <a href="#" className="hover:text-zinc-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-zinc-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-zinc-300 transition-colors">Security Audit</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
