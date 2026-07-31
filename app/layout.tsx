import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import SmoothScroll from '@/components/layout/SmoothScroll'
import JsonLd from '@/components/seo/JsonLd'
import companyData from '@/data/company.json'

export const metadata: Metadata = {
  metadataBase: new URL('https://ldcode.dev'),
  title: {
    default: 'LDCode - Custom Web & Mobile Architecture | Premium Digital Solutions',
    template: '%s | LDCode Technology',
  },
  description: companyData.description,
  keywords: [
    'LDCode',
    'Web Development Thailand',
    'Next.js Software House',
    'React Native Mobile App',
    'Cloud DevOps AWS',
    'AI RAG Integration',
    'TypeScript Custom Software',
  ],
  authors: [{ name: 'LDCode Team', url: 'https://ldcode.dev' }],
  creator: 'LDCode Tech',
  openGraph: {
    type: 'website',
    locale: 'th_TH',
    url: 'https://ldcode.dev',
    title: 'LDCode - Architecting Digital Excellence with Modern Tech Stack',
    description: companyData.description,
    siteName: 'LDCode',
    images: [
      {
        url: '/image/LDCode_Logo.png',
        width: 1200,
        height: 630,
        alt: 'LDCode Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LDCode - Modern Web Architecture',
    description: companyData.description,
    images: ['/image/LDCode_Logo.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="th" className="dark scroll-smooth">
      <body className="bg-[#080c0a] text-zinc-100 antialiased selection:bg-emerald-400 selection:text-black min-h-screen flex flex-col">
        <JsonLd />
        <SmoothScroll>
          <Navbar />
          <main className="flex-grow pt-20">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  )
}
