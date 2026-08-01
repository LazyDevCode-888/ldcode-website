import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import servicesData from '@/data/services.json'
import ServiceDetailClient from '@/components/services/ServiceDetailClient'

type Props = {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  return servicesData.map((service) => ({
    id: service.id,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params
  const service = servicesData.find((s) => s.id === resolvedParams.id)

  if (!service) {
    return {
      title: 'Service Not Found | LDCode',
    }
  }

  return {
    title: `${service.title.th} | LDCode Technology`,
    description: service.summary.th,
    openGraph: {
      title: `${service.title.th} - ${service.subtitle.th}`,
      description: service.summary.th,
    },
  }
}

export default async function ServiceDetailPage({ params }: Props) {
  const resolvedParams = await params
  const service = servicesData.find((s) => s.id === resolvedParams.id)

  if (!service) {
    notFound()
  }

  // Filter other services to display at the bottom
  const otherServices = servicesData
    .filter((s) => s.id !== service.id)
    .map((other) => ({
      id: other.id,
      title: other.title,
      price: other.price,
      icon: other.icon,
    }))

  return (
    <ServiceDetailClient
      service={service as any}
      otherServices={otherServices}
    />
  )
}
