import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import blogData from '@/data/blog.json'
import BlogDetailClient from '@/components/blog/BlogDetailClient'

type Props = {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  return blogData.map((post) => ({
    id: post.id,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params
  const post = blogData.find((p) => p.id === resolvedParams.id)

  if (!post) {
    return {
      title: 'Article Not Found | LDCode',
    }
  }

  return {
    title: `${post.title.th} | LDCode Article`,
    description: post.excerpt.th,
    openGraph: {
      title: `${post.title.th} | LDCode Insights`,
      description: post.excerpt.th,
      images: post.image ? [{ url: post.image }] : [],
    },
  }
}

export default async function BlogDetailPage({ params }: Props) {
  const resolvedParams = await params
  const post = blogData.find((p) => p.id === resolvedParams.id)

  if (!post) {
    notFound()
  }

  return <BlogDetailClient post={post} />
}
