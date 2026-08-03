'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, X } from 'lucide-react'
import Image from 'next/image'

export default function BusinessIntroModal() {
  const [mounted, setMounted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [stage, setStage] = useState(0) // 0: 01.mp4, 1: 02.mp4, 2: 03.mp4, 3: Logo Reveal
  const [progress, setProgress] = useState(0)
  
  const videoRef1 = useRef<HTMLVideoElement | null>(null)
  const videoRef2 = useRef<HTMLVideoElement | null>(null)
  const videoRef3 = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    setMounted(true)
    
    // Check 1-hour expiration logic with localStorage
    const INTRO_KEY = 'ldcode_intro_timestamp'
    const ONE_HOUR_MS = 60 * 60 * 1000 // 1 hour in milliseconds
    const savedTimestamp = localStorage.getItem(INTRO_KEY)
    const now = Date.now()

    if (savedTimestamp) {
      const elapsed = now - parseInt(savedTimestamp, 10)
      if (elapsed < ONE_HOUR_MS) {
        // Less than 1 hour has passed -> Hide intro
        setIsVisible(false)
        return
      }
    }

    // First time entry or 1 hour expired -> Show intro & record timestamp
    setIsVisible(true)
    localStorage.setItem(INTRO_KEY, now.toString())
  }, [])

  // 22-second total duration playback (220ms * 100 steps = 22,000ms)
  useEffect(() => {
    if (!mounted || !isVisible) return

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          handleClose()
          return 100
        }
        return prev + 1
      })
    }, 220)

    return () => clearInterval(interval)
  }, [mounted, isVisible])

  // Timings across stages
  useEffect(() => {
    if (progress > 73) {
      setStage(3)
    } else if (progress > 46) {
      setStage(2)
    } else if (progress > 23) {
      setStage(1)
    } else {
      setStage(0)
    }
  }, [progress])

  // Play video smoothly and slow down video 3 playback rate
  useEffect(() => {
    if (!mounted || !isVisible) return

    if (stage === 0 && videoRef1.current) {
      videoRef1.current.currentTime = 0
      videoRef1.current.playbackRate = 1.0
      videoRef1.current.play().catch(() => {})
    } else if (stage === 1 && videoRef2.current) {
      videoRef2.current.currentTime = 0
      videoRef2.current.playbackRate = 1.0
      videoRef2.current.play().catch(() => {})
    } else if (stage === 2 && videoRef3.current) {
      videoRef3.current.currentTime = 0
      videoRef3.current.playbackRate = 0.85 // Slow motion (85% speed)
      videoRef3.current.play().catch(() => {})
    }
  }, [stage, mounted, isVisible])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.code === 'Space') {
        handleClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
  }

  if (!mounted || !isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] } }}
        className="fixed inset-0 z-[99999] w-screen h-screen bg-black overflow-hidden select-none font-[family-name:var(--font-noto-thai)] text-white"
      >
        {/* Fullscreen Video Player with Perfectly Timed Crossfades */}
        <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
          <AnimatePresence mode="wait">
            
            {/* VIDEO ACT 1: 01.mp4 */}
            {stage === 0 && (
              <motion.div
                key="vdo_stage_0"
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full relative"
              >
                <video
                  ref={videoRef1}
                  src="/Vdo/01.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover brightness-90 saturate-120"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/60" />
              </motion.div>
            )}

            {/* VIDEO ACT 2: 02.mp4 */}
            {stage === 1 && (
              <motion.div
                key="vdo_stage_1"
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full relative"
              >
                <video
                  ref={videoRef2}
                  src="/Vdo/02.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover brightness-90 saturate-120"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/60" />
              </motion.div>
            )}

            {/* VIDEO ACT 3: 03.mp4 */}
            {stage === 2 && (
              <motion.div
                key="vdo_stage_2"
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full relative"
              >
                <video
                  ref={videoRef3}
                  src="/Vdo/03.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover brightness-90 saturate-120"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/60" />
              </motion.div>
            )}

            {/* ACT 4: LOGO REVEAL & WELCOME MESSAGE */}
            {stage === 3 && (
              <motion.div
                key="vdo_stage_3"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full relative bg-zinc-950 flex items-center justify-center overflow-hidden"
              >
                {/* Background Ambient Glow */}
                <motion.div
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: [1, 1.25, 1], opacity: [0.35, 0.65, 0.35] }}
                  transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                  className="absolute w-[700px] h-[700px] bg-emerald-500/20 rounded-full blur-[160px]"
                />

                {/* Real LDCode Logo Display */}
                <div className="relative z-10 text-center space-y-5 px-6 flex flex-col items-center max-w-3xl">
                  <motion.div
                    initial={{ y: 30, opacity: 0, scale: 0.85 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="relative w-40 h-40 sm:w-56 sm:h-56 drop-shadow-[0_0_60px_rgba(16,185,129,0.55)]"
                  >
                    <Image
                      src="/image/LDCode_Logo.png"
                      alt="LDCode Official Logo"
                      fill
                      priority
                      className="object-contain"
                    />
                  </motion.div>

                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="text-lg sm:text-2xl font-light text-emerald-300 tracking-wider font-[family-name:var(--font-noto-thai)]"
                  >
                    ยินดีต้อนรับสู่
                  </motion.p>

                  <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1.2, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="text-5xl sm:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-200 to-emerald-400 tracking-tighter font-[family-name:var(--font-noto-thai)]"
                  >
                    LDCode
                  </motion.h1>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Top Header - Skip Button */}
        <div className="absolute top-0 inset-x-0 z-30 p-6 sm:p-10 flex items-center justify-end">
          <button
            onClick={handleClose}
            className="group flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/10 hover:bg-emerald-500/30 border border-white/20 hover:border-emerald-400/50 text-xs font-semibold tracking-wider transition-all backdrop-blur-md cursor-pointer shadow-lg font-[family-name:var(--font-noto-thai)]"
          >
            <span>Skip Intro (ข้าม)</span>
            <X className="w-4 h-4 group-hover:rotate-90 transition-transform" />
          </button>
        </div>

        {/* Clean Subtitles Overlay */}
        {stage < 3 && (
          <div className="relative z-30 w-full h-full flex flex-col justify-end pb-24 sm:pb-32 px-6 sm:px-16 max-w-5xl mx-auto font-[family-name:var(--font-noto-thai)]">
            <AnimatePresence mode="wait">
              {stage === 0 && (
                <motion.div
                  key="vdo_text0"
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="max-w-3xl font-[family-name:var(--font-noto-thai)]"
                >
                  <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight drop-shadow-2xl font-[family-name:var(--font-noto-thai)]">
                    ขับเคลื่อนธุรกิจสู่ความสำเร็จด้วยเทคโนโลยียุคใหม่
                  </h2>
                </motion.div>
              )}

              {stage === 1 && (
                <motion.div
                  key="vdo_text1"
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="max-w-3xl font-[family-name:var(--font-noto-thai)]"
                >
                  <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight drop-shadow-2xl font-[family-name:var(--font-noto-thai)]">
                    ใส่ใจทุกรายละเอียด วางโครงสร้างระบบอย่างมืออาชีพ
                  </h2>
                </motion.div>
              )}

              {stage === 2 && (
                <motion.div
                  key="vdo_text2"
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="max-w-3xl font-[family-name:var(--font-noto-thai)]"
                >
                  <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight drop-shadow-2xl font-[family-name:var(--font-noto-thai)]">
                    ส่งมอบงานสมบูรณ์แบบ ไร้ข้อผิดพลาด เพื่อองค์กรของคุณ
                  </h2>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Clean Bottom Button */}
        <div className="absolute bottom-0 inset-x-0 z-30 p-6 sm:p-10 bg-gradient-to-t from-black via-black/80 to-transparent flex items-center justify-end font-[family-name:var(--font-noto-thai)]">
          <button
            onClick={handleClose}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-emerald-500 text-black hover:bg-emerald-400 font-bold text-xs tracking-wider transition-all cursor-pointer shadow-[0_0_25px_rgba(16,185,129,0.5)] hover:scale-105 font-[family-name:var(--font-noto-thai)]"
          >
            <span>เข้าสู่เว็บไซต์</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
