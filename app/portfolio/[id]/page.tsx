import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import projectsData from '@/data/projects.json'
import ProjectDetailClient from '@/components/portfolio/ProjectDetailClient'

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

  const desc = typeof project.summary === 'string' ? project.summary : project.summary.th
  const titleSub = typeof project.subtitle === 'string' ? project.subtitle : project.subtitle.th

  return {
    title: `${project.title} - Case Study | LDCode`,
    description: desc,
    openGraph: {
      title: `${project.title} - ${titleSub}`,
      description: desc,
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

  // Cast properties matching expectations in client component
  const typedProject = {
    ...project,
    subtitle: typeof project.subtitle === 'string' ? { th: project.subtitle, en: project.subtitle } : project.subtitle,
    category: typeof project.category === 'string' ? { th: project.category, en: project.category } : project.category,
    summary: typeof project.summary === 'string' ? { th: project.summary, en: project.summary } : project.summary,
    challenge: typeof project.challenge === 'string' ? { th: project.challenge, en: project.challenge } : project.challenge,
    solution: typeof project.solution === 'string' ? { th: project.solution, en: project.solution } : project.solution,
    stats: project.stats.map(s => ({
      ...s,
      label: typeof s.label === 'string' ? { th: s.label, en: s.label } : s.label
    }))
  }

  return <ProjectDetailClient project={typedProject} />
}
