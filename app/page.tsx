import HeroSection from '@/components/home/HeroSection'
import ServicePreview from '@/components/home/ServicePreview'
import ProjectShowcase from '@/components/home/ProjectShowcase'
import TechMarquee from '@/components/home/TechMarquee'
import ExpertiseSection from '@/components/home/ExpertiseSection'
import CtaSection from '@/components/home/CtaSection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicePreview />
      <ProjectShowcase />
      <TechMarquee />
      <ExpertiseSection />
      <CtaSection />
    </>
  )
}
