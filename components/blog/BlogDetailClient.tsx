'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, User, ArrowLeft } from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'
import { motion } from 'framer-motion'

interface Translation {
  th: string
  en: string
}

interface BlogPost {
  id: string
  title: Translation
  excerpt: Translation
  date: string
  author: string
  readTime: Translation
  tags: string[]
  image: string
  content: Translation
}

export default function BlogDetailClient({ post }: { post: BlogPost }) {
  const { t } = useLanguage()

  // Split content by double newlines to render as separate paragraphs
  const paragraphs = t(post.content).split('\n\n')

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-emerald-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {t('กลับหน้าบทความทั้งหมด', 'Back to All Articles')}
        </Link>
      </motion.div>

      {/* Main Article Container */}
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-8"
      >
        {/* Title & Metadata */}
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/60 text-emerald-300 border border-emerald-500/20"
              >
                #{tag}
              </span>
            ))}
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-zinc-100 leading-tight">
            {t(post.title)}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-zinc-400 font-medium pt-2 border-b border-zinc-800/60 pb-6">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-400" />
              {post.date}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-400" />
              {t(post.readTime)}
            </span>
            <span className="flex items-center gap-2">
              <User className="w-4 h-4 text-emerald-400" />
              {post.author}
            </span>
          </div>
        </div>

        {/* Feature Image */}
        <div className="relative h-[18rem] sm:h-[25rem] w-full rounded-3xl overflow-hidden border border-emerald-500/10 shadow-2xl">
          <Image
            src={post.image}
            alt={t(post.title)}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080c0a]/40 via-transparent to-transparent" />
        </div>

        {/* Content Body */}
        <div className="prose prose-invert max-w-none text-zinc-300 space-y-6 leading-relaxed text-base sm:text-lg">
          {paragraphs.map((p, idx) => {
            // Render markdown headers if present
            if (p.startsWith('### ')) {
              return (
                <h3 key={idx} className="text-xl sm:text-2xl font-bold text-zinc-100 pt-4 flex items-center gap-2">
                  <span className="w-1.5 h-4 bg-emerald-400 rounded-full" />
                  {p.replace('### ', '')}
                </h3>
              )
            }
            if (p.startsWith('## ')) {
              return (
                <h2 key={idx} className="text-2xl sm:text-3xl font-extrabold text-zinc-100 pt-6 flex items-center gap-2">
                  <span className="w-2.5 h-6 bg-emerald-400 rounded-full" />
                  {p.replace('## ', '')}
                </h2>
              )
            }
            return (
              <p key={idx} className="whitespace-pre-line text-zinc-300">
                {p}
              </p>
            )
          })}
        </div>
      </motion.article>
    </div>
  )
}
