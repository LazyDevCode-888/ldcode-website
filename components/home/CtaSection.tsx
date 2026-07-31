import Link from 'next/link'
import { ArrowRight, Sparkles, Code2 } from 'lucide-react'

export default function CtaSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="relative glass-card rounded-3xl p-8 sm:p-16 border border-emerald-500/30 overflow-hidden text-center glow-emerald-box">
        {/* Glow backdrop */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-emerald-400/5 to-emerald-500/10 pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Ready to Transform Your Digital Infrastructure?</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Let's Build Something <span className="text-code">Extraordinary</span> Together
          </h2>

          <p className="text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto">
            ปรึกษาทีมวิศวกรซอฟต์แวร์ LDCode วันนี้ เพื่อประเมินโครงสร้าง ประเมินงบประมาณ และวางแผนสถาปัตยกรรมระบบโดยไม่มีค่าใช้จ่าย
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-base font-bold text-black bg-gradient-to-r from-emerald-400 to-emerald-300 hover:from-emerald-300 hover:to-emerald-400 transition-all shadow-xl shadow-emerald-500/30 hover:scale-[1.03]"
            >
              <span>Book Free Architecture Consultation</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/pricing"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-base font-semibold text-zinc-200 glass-card hover:bg-zinc-800 border border-emerald-500/30 transition-all"
            >
              <span>View Packages</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
