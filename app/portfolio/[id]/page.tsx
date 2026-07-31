import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import projectsData from '@/data/projects.json'
import { ArrowLeft, CheckCircle2, Award, Zap, Code2, ExternalLink } from 'lucide-react'

type Props = {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    id: project.id,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params
  const project = projectsData.find((p) => p.id === resolvedParams.id)

  if (!project) {
    return {
      title: 'Project Not Found | LDCode',
    }
  }

  return {
    title: `${project.title} - Case Study | LDCode`,
    description: project.summary,
    openGraph: {
      title: `${project.title} - ${project.subtitle}`,
      description: project.summary,
      images: [{ url: project.image }],
    },
  }
}

export default async function ProjectDetailPage({ params }: Props) {
  const resolvedParams = await params
  const project = projectsData.find((p) => p.id === resolvedParams.id)

  if (!project) {
    notFound()
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-16">
      {/* Back button */}
      <div>
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-emerald-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Projects</span>
        </Link>
      </div>

      {/* Hero Header */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
            {project.category}
          </span>
          <span className="text-xs text-zinc-500">•</span>
          <span className="text-xs text-zinc-400">{project.client}</span>
          <span className="text-xs text-zinc-500">•</span>
          <span className="text-xs text-zinc-400">{project.year}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-zinc-100 leading-tight">
          {project.title}
        </h1>
        <p className="text-lg sm:text-xl text-emerald-400 font-medium">
          {project.subtitle}
        </p>

        {/* Key Stats Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          {project.stats.map((stat) => (
            <div
              key={stat.label}
              className="glass-card p-4 rounded-2xl border border-emerald-500/20 text-center"
            >
              <div className="text-2xl sm:text-3xl font-extrabold text-code">{stat.value}</div>
              <div className="text-xs text-zinc-400 font-medium mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Image */}
      <div className="relative h-72 sm:h-[450px] w-full rounded-3xl overflow-hidden border border-emerald-500/30 shadow-2xl">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Challenge vs Solution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-card p-8 rounded-3xl border border-emerald-500/20 space-y-4">
          <h2 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" />
            <span>The Challenge (โจทย์และความท้าทาย)</span>
          </h2>
          <p className="text-sm text-zinc-300 leading-relaxed">
            {project.challenge}
          </p>
        </div>

        <div className="glass-card p-8 rounded-3xl border border-emerald-500/20 space-y-4 bg-emerald-950/20">
          <h2 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>LDCode Architecture & Solution</span>
          </h2>
          <p className="text-sm text-zinc-300 leading-relaxed">
            {project.solution}
          </p>
        </div>
      </div>

      {/* Tech Stack Used */}
      <div className="glass-card p-8 rounded-3xl border border-emerald-500/20 space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400">
          Technologies Employed
        </h3>
        <div className="flex flex-wrap gap-3">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-4 py-2 rounded-xl text-sm font-semibold bg-zinc-900 text-zinc-200 border border-zinc-800"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Image Gallery */}
      {project.gallery && project.gallery.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-zinc-100">Project Interface Showcase</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {project.gallery.map((img, index) => (
              <div key={index} className="relative h-64 rounded-2xl overflow-hidden border border-zinc-800">
                <Image src={img} alt={`${project.title} screenshot ${index + 1}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
