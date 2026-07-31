import type { Metadata } from 'next'
import Link from 'next/link'
import servicesData from '@/data/services.json'
import { Globe, Smartphone, Cloud, Cpu, Palette, Server, CheckCircle, ArrowRight, ShieldAlert, Sparkles } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Services | Enterprise Digital Solutions',
  description: 'บริการพัฒนาระบบซอฟต์แวร์ เว็บไซต์ SSR แอปพลิเคชันมือถือ Cloud Infrastructure และ AI Integration ครบวงจร',
}

const iconMap: Record<string, React.ReactNode> = {
  Globe: <Globe className="w-10 h-10 text-emerald-400" />,
  Smartphone: <Smartphone className="w-10 h-10 text-emerald-400" />,
  Cloud: <Cloud className="w-10 h-10 text-emerald-400" />,
  Cpu: <Cpu className="w-10 h-10 text-emerald-400" />,
  Palette: <Palette className="w-10 h-10 text-emerald-400" />,
  Server: <Server className="w-10 h-10 text-emerald-400" />,
}

export default function ServicesPage() {
  return (
    <div className="py-16 space-y-24">
      {/* Header */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-6">
        <h1 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-emerald-400">
          Our Full Capabilities
        </h1>
        <p className="text-4xl sm:text-6xl font-extrabold tracking-tight">
          Enterprise Grade <span className="text-code">Services</span>
        </p>
        <p className="max-w-3xl mx-auto text-zinc-400 text-base sm:text-xl leading-relaxed">
          พัฒนาซอฟต์แวร์มาตรฐานโลก รองรับการขยายตัวทางธุรกิจ ปลอดภัย โหลดเร็วด้วยเทคโนโลยี Next.js SSR, Microservices และ AI Custom Models
        </p>
      </section>

      {/* Services Breakdown List */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        {servicesData.map((service, index) => (
          <div
            key={service.id}
            id={service.id}
            className={`glass-card p-8 sm:p-12 rounded-3xl border border-emerald-500/20 glow-emerald-hover grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
              index % 2 === 1 ? 'lg:bg-emerald-950/20' : ''
            }`}
          >
            {/* Left Info */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-emerald-950/80 border border-emerald-500/30">
                  {iconMap[service.icon]}
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-100">{service.title}</h2>
                  <p className="text-xs sm:text-sm text-emerald-400 font-semibold">{service.subtitle}</p>
                </div>
              </div>

              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                {service.summary}
              </p>

              {/* Key Features */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Key Features</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs text-zinc-200">
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Deliverables Box */}
            <div className="lg:col-span-5 glass-card p-6 sm:p-8 rounded-2xl border border-emerald-500/30 bg-zinc-950/60 space-y-6">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-400">
                <Sparkles className="w-4 h-4" />
                <span>Deliverables (สิ่งที่คุณจะได้รับ)</span>
              </div>
              <ul className="space-y-3">
                {service.deliverables.map((item, i) => (
                  <li key={i} className="flex items-center justify-between text-xs sm:text-sm text-zinc-300 border-b border-zinc-800/60 pb-2">
                    <span>{item}</span>
                    <span className="text-emerald-400 font-semibold">Included</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-black bg-emerald-400 hover:bg-emerald-300 transition-colors shadow-lg shadow-emerald-500/20"
              >
                <span>Request Proposal</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}
