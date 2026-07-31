'use client'

import Image from 'next/image'
import testimonialsData from '@/data/testimonials.json'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import { Star, Quote } from 'lucide-react'

import 'swiper/css'
import 'swiper/css/pagination'

export default function TestimonialSlider() {
  return (
    <section className="py-24 bg-[#050806] border-y border-emerald-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-emerald-400">
            Client Endorsements
          </h2>
          <p className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Trusted by <span className="text-code">Visionary Leaders</span>
          </p>
        </div>

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          className="pb-16"
        >
          {testimonialsData.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="glass-card p-8 rounded-3xl border border-emerald-500/20 glow-emerald-hover flex flex-col justify-between h-full relative">
                <Quote className="absolute top-6 right-6 w-10 h-10 text-emerald-500/10 pointer-events-none" />

                <div className="space-y-4">
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  <p className="text-sm sm:text-base text-zinc-300 leading-relaxed italic">
                    "{item.content}"
                  </p>
                </div>

                <div className="flex items-center gap-4 pt-6 border-t border-zinc-800/80 mt-6">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border border-emerald-500/30 shrink-0">
                    <Image
                      src={item.avatar}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-zinc-100">{item.name}</h4>
                    <p className="text-xs text-emerald-400">{item.role} • {item.company}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
