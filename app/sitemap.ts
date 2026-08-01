import { MetadataRoute } from 'next'
import servicesData from '@/data/services.json'
import projectsData from '@/data/projects.json'
import blogData from '@/data/blog.json'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ldcode.tech'

  // 1. Static routes
  const staticRoutes = [
    '',
    '/about',
    '/contact',
    '/pricing',
    '/services',
    '/tech-stack',
    '/portfolio',
    '/blog',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }))

  // 2. Dynamic Services
  const services = servicesData.map((service) => ({
    url: `${baseUrl}/services/${service.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // 3. Dynamic Projects
  const projects = projectsData.map((project) => ({
    url: `${baseUrl}/portfolio/${project.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // 4. Dynamic Blog Posts
  const blogs = blogData.map((post) => ({
    url: `${baseUrl}/blog/${post.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticRoutes, ...services, ...projects, ...blogs]
}
