'use client'

import { useState } from 'react'
import Link from 'next/link'
import pricingData from '@/data/pricing.json'
import { Check, Sparkles, HelpCircle, ArrowRight, Calculator } from 'lucide-react'

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false)

  // Interactive Quote Calculator State
  const [selectedPages, setSelectedPages] = useState<number>(5)
  const [needCms, setNeedCms] = useState<boolean>(true)
  const [needMobile, setNeedMobile] = useState<boolean>(false)
  const [needAi, setNeedAi] = useState<boolean>(false)

  // Calculate estimated price
  const calculateEstimate = () => {
    let base = 35000
    base += (selectedPages - 5) * 4000
    if (needCms) base += 20000
    if (needMobile) base += 60000
    if (needAi) base += 35000
    return base
  }

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-20">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-emerald-400">
          Transparent Pricing Tiers
        </h1>
        <p className="text-4xl sm:text-6xl font-extrabold tracking-tight">
          Invest in High-ROI <span className="text-code">Technology</span>
        </p>
        <p className="max-w-2xl mx-auto text-zinc-400 text-base sm:text-lg">
          ไม่มีค่าใช้จ่ายแอบแฝง มาพร้อมสัญญาการดูแลซอฟต์แวร์และการรับประกันเต็มรูปแบบ
        </p>

        {/* Monthly / Annual Switch */}
        <div className="pt-6 inline-flex items-center gap-3 glass-card p-1.5 rounded-full border border-emerald-500/30">
          <button
            onClick={() => setIsAnnual(false)}
            className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
              !isAnnual
                ? 'bg-emerald-400 text-black shadow-md shadow-emerald-400/40'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Monthly Billing
          </button>
          <button
            onClick={() => setIsAnnual(true)}
            className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
              isAnnual
                ? 'bg-emerald-400 text-black shadow-md shadow-emerald-400/40'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <span>Annual Billing</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-950 text-emerald-300 font-extrabold border border-emerald-500/40">
              {pricingData.discountAnnually}
            </span>
          </button>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {pricingData.plans.map((plan) => {
          const price = isAnnual ? plan.annualPrice : plan.monthlyPrice
          return (
            <div
              key={plan.id}
              className={`glass-card p-8 rounded-3xl border flex flex-col justify-between relative transition-all duration-300 ${
                plan.popular
                  ? 'border-emerald-400 bg-emerald-950/20 glow-emerald-box scale-[1.02]'
                  : 'border-emerald-500/20 hover:border-emerald-500/40'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-emerald-400 text-black text-xs font-extrabold tracking-wider uppercase shadow-lg shadow-emerald-400/50">
                  {plan.badge}
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-zinc-100">{plan.name}</h3>
                  <p className="text-xs text-zinc-400 mt-2 leading-relaxed">{plan.description}</p>
                </div>

                {/* Price Display */}
                <div className="flex items-baseline gap-1 pt-2">
                  <span className="text-3xl sm:text-5xl font-extrabold text-code tracking-tight">
                    ฿{price.toLocaleString()}
                  </span>
                  <span className="text-xs text-zinc-400 font-medium">
                    / project base
                  </span>
                </div>

                <div className="w-full h-px bg-zinc-800" />

                {/* Features List */}
                <ul className="space-y-3">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8">
                <Link
                  href="/contact"
                  className={`w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-full text-sm font-bold transition-all ${
                    plan.popular
                      ? 'bg-emerald-400 hover:bg-emerald-300 text-black shadow-lg shadow-emerald-400/30'
                      : 'glass-card hover:bg-zinc-800 text-zinc-100 border border-emerald-500/30'
                  }`}
                >
                  <span>Choose Plan</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )
        })}
      </div>

      {/* Interactive Custom Quote Calculator Widget */}
      <div className="glass-card p-8 sm:p-12 rounded-3xl border border-emerald-500/30 bg-zinc-950/80 space-y-8">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-emerald-950 border border-emerald-500/30 text-emerald-400">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-zinc-100">Interactive Price Estimator</h2>
            <p className="text-xs text-zinc-400">คำนวณงบประมาณเบื้องต้นตามสเปกที่คุณต้องการ</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            {/* Pages Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-zinc-300">Number of Custom Pages:</span>
                <span className="text-emerald-400 font-bold">{selectedPages} Pages</span>
              </div>
              <input
                type="range"
                min={1}
                max={30}
                value={selectedPages}
                onChange={(e) => setSelectedPages(Number(e.target.value))}
                className="w-full accent-emerald-400 bg-zinc-800 h-2 rounded-lg cursor-pointer"
              />
            </div>

            {/* Checkbox Options */}
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={needCms}
                  onChange={(e) => setNeedCms(e.target.checked)}
                  className="w-4 h-4 rounded accent-emerald-400"
                />
                <span className="text-xs sm:text-sm text-zinc-300">Headless CMS & Admin Control Panel (+฿20,000)</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={needMobile}
                  onChange={(e) => setNeedMobile(e.target.checked)}
                  className="w-4 h-4 rounded accent-emerald-400"
                />
                <span className="text-xs sm:text-sm text-zinc-300">Companion iOS & Android App (+฿60,000)</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={needAi}
                  onChange={(e) => setNeedAi(e.target.checked)}
                  className="w-4 h-4 rounded accent-emerald-400"
                />
                <span className="text-xs sm:text-sm text-zinc-300">Custom AI Bot / RAG System Integration (+฿35,000)</span>
              </label>
            </div>
          </div>

          {/* Result Box */}
          <div className="glass-card p-6 sm:p-8 rounded-2xl border border-emerald-500/30 text-center space-y-4">
            <div className="text-xs uppercase tracking-wider text-zinc-400 font-semibold">
              Estimated Total Investment
            </div>
            <div className="text-4xl sm:text-5xl font-extrabold text-code tracking-tight">
              ฿{calculateEstimate().toLocaleString()}
            </div>
            <p className="text-xs text-zinc-400 max-w-xs mx-auto">
              ราคานี้รวมการทำ SSR SEO, Responsive Design และบริการฟรี Maintenance 1 เดือนแล้ว
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full text-sm font-bold text-black bg-emerald-400 hover:bg-emerald-300 transition-colors shadow-lg shadow-emerald-400/30"
            >
              <span>Get Formal Quote</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
