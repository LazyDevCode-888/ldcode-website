import type { Metadata } from 'next'
import Image from 'next/image'
import companyData from '@/data/company.json'
import teamData from '@/data/team.json'
import { Target, Eye, ShieldCheck, Zap, Award, Users, HeartHandshake } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us | LDCode Technology',
  description: 'ทำความรู้จักกับ LDCode ทีมวิศวกรซอฟต์แวร์ผู้หลงใหลในเทคโนโลยีล้ำสมัย การสร้างสถาปัตยกรรมดิจิทัลระดับสูง และการส่งมอบซอฟต์แวร์ทรงประสิทธิภาพ',
}

export default function AboutPage() {
  return (
    <div className="py-16 space-y-24">
      {/* Hero Header */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-6">
        <h1 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-emerald-400">
          About LDCode
        </h1>
        <p className="text-4xl sm:text-6xl font-extrabold tracking-tight">
          Pioneering the Next Era of <br className="hidden sm:inline" />
          <span className="text-code">Digital Engineering</span>
        </p>
        <p className="max-w-3xl mx-auto text-zinc-400 text-base sm:text-xl leading-relaxed">
          LDCode คือกลุ่มวิศวกรซอฟต์แวร์ สถาปนิกคลาวด์ และนักออกแบบ UX/UI ที่ผนึกกำลังเพื่อเปลี่ยนไอเดียทางธุรกิจให้กลายเป็นแพลตฟอร์มดิจิทัลระดับพรีเมียม ไร้ข้อจำกัดด้านความเร็วและสเกล
        </p>
      </section>

      {/* Vision & Mission */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-card p-8 sm:p-12 rounded-3xl border border-emerald-500/20 glow-emerald-hover space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Eye className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-zinc-100">Our Vision (วิสัยทัศน์)</h2>
          <p className="text-zinc-400 leading-relaxed">
            มุ่งสู่การเป็นพันธมิตรทางเทคโนโลยีชั้นนำระดับภูมิภาค ที่เปลี่ยนมาตรฐานการพัฒนาซอฟต์แวร์องค์กรด้วยสถาปัตยกรรม SSR, Cloud-Native Microservices และ AI เพื่อขับเคลื่อนธุรกิจให้พร้อมสำหรับอนาคต
          </p>
        </div>

        <div className="glass-card p-8 sm:p-12 rounded-3xl border border-emerald-500/20 glow-emerald-hover space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Target className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-zinc-100">Our Mission (พันธกิจ)</h2>
          <p className="text-zinc-400 leading-relaxed">
            สร้างสรรค์ซอฟต์แวร์ที่มีคุณภาพโค้ดสูงสุด (Clean Architecture) มุ่งเน้นการปฏิบัติตามมาตรฐานความปลอดภัยระดับทหาร มอบประสบการณ์ผู้ใช้งานที่โดดเด่น และสร้างคุณค่าทางธุรกิจที่วัดผลได้จริง
          </p>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-[#050806] py-20 border-y border-emerald-950/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-emerald-400">
              Guiding Principles
            </h2>
            <p className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Our Core <span className="text-code">Values</span>
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-card p-6 rounded-2xl border border-emerald-500/20 space-y-3">
              <Zap className="w-8 h-8 text-emerald-400" />
              <h3 className="text-lg font-bold text-zinc-100">Speed & Performance</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                การตอบสนองที่รวดเร็วระดับ milliseconds ในทุกองค์ประกอบ
              </p>
            </div>
            <div className="glass-card p-6 rounded-2xl border border-emerald-500/20 space-y-3">
              <ShieldCheck className="w-8 h-8 text-emerald-400" />
              <h3 className="text-lg font-bold text-zinc-100">Uncompromised Security</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                วางระบบด้วยมาตรฐานความปลอดภัยระดับการเงินและ HIPAA
              </p>
            </div>
            <div className="glass-card p-6 rounded-2xl border border-emerald-500/20 space-y-3">
              <Award className="w-8 h-8 text-emerald-400" />
              <h3 className="text-lg font-bold text-zinc-100">Craftsmanship</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                ใส่ใจในรายละเอียดโค้ด ทุกบรรทัดผ่านการทำ Code Review & Testing
              </p>
            </div>
            <div className="glass-card p-6 rounded-2xl border border-emerald-500/20 space-y-3">
              <HeartHandshake className="w-8 h-8 text-emerald-400" />
              <h3 className="text-lg font-bold text-zinc-100">Long-term Partnership</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                เคียงข้างและดูแลระบบของลูกค้าให้เติบโตต่อเนื่องด้วย SLA 24/7
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Showcase */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-emerald-400">
            Engineers & Creators
          </h2>
          <p className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Meet Our <span className="text-code">Leadership Team</span>
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamData.map((member) => (
            <div
              key={member.id}
              className="glass-card rounded-3xl overflow-hidden border border-emerald-500/20 glow-emerald-hover flex flex-col group"
            >
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={member.avatar}
                  alt={member.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6 space-y-2 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-zinc-100">{member.name}</h3>
                  <p className="text-xs font-semibold text-emerald-400 mb-3">{member.role}</p>
                  <p className="text-xs text-zinc-400 leading-relaxed">{member.bio}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
