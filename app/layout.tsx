import type { Metadata } from 'next'
import { Noto_Sans_Thai } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import SmoothScroll from '@/components/layout/SmoothScroll'
import FloatingContact from '@/components/layout/FloatingContact'
import JsonLd from '@/components/seo/JsonLd'
import companyData from '@/data/company.json'
import { LanguageProvider } from '@/lib/LanguageContext'
import BusinessIntroModal from '@/components/ui/BusinessIntroModal'

const notoColorFont = Noto_Sans_Thai({
  subsets: ['thai', 'latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
  variable: '--font-noto-thai',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://ldcode.tech'),
  title: {
    default: 'LDCode - Custom Web & Mobile Architecture | Premium Digital Solutions',
    template: '%s | LDCode Technology',
  },
  description: companyData.description.th, // Let's default to th for metadata or standard string
  keywords: [
    'LDCode',
    'Web Development Thailand',
    'Next.js Software House',
    'React Native Mobile App',
    'Cloud DevOps AWS',
    'AI RAG Integration',
    'TypeScript Custom Software',
  ],
  authors: [{ name: 'LDCode Team', url: 'https://ldcode.tech' }],
  creator: 'LDCode Tech',
  openGraph: {
    type: 'website',
    locale: 'th_TH',
    url: 'https://ldcode.tech',
    title: 'LDCode - Architecting Digital Excellence with Modern Tech Stack',
    description: companyData.description.th,
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
    description: companyData.description.th,
    images: ['/image/LDCode_Logo.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/image/LDCode_Logo.png',
    shortcut: '/image/LDCode_Logo.png',
    apple: '/image/LDCode_Logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="th" className={`dark scroll-smooth ${notoColorFont.variable}`}>
      <body className="bg-[#080c0a] text-zinc-100 antialiased selection:bg-emerald-400 selection:text-black min-h-screen flex flex-col">
        <LanguageProvider>
          <JsonLd />
          <BusinessIntroModal />
          <SmoothScroll>
            <Navbar />
            <main className="flex-grow pt-20">{children}</main>
            <Footer />
            <FloatingContact />
          </SmoothScroll>
        </LanguageProvider>
      </body>
    </html>
  )
}
