import Hero from '../components/Hero'
import QualityServices from '../components/QualityServices'
import ServicesSection from '../components/ServicesSection'
import Technologies from '../components/Technologies'
import CTABanner from '../components/CTABanner'
import WhyUs from '../components/WhyUs'
import HireSteps from '../components/HireSteps'
import Pricing from '../components/Pricing'
import Testimonials from '../components/Testimonials'
import Blog from '../components/Blog'

export const metadata = {
  title: 'Web & Mobile App Development Company in India | Prominent TechnoLabs',
  description: 'Prominent TechnoLabs — India\'s trusted web and mobile app development company. We build React, Laravel, Flutter apps, e-commerce, and digital marketing solutions. 30+ happy clients.',
  keywords: ['web development company India', 'mobile app development Ahmedabad', 'React developer', 'Laravel development', 'Flutter app', 'e-commerce development', 'digital marketing', 'SEO services'],
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Prominent TechnoLabs — Web & Mobile App Development',
    description: 'Elevate your business with our premier web and mobile app development services. 30+ happy clients, 99% satisfaction.',
    url: 'https://prominenttechnolabs.com',
  },
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <QualityServices />
      <ServicesSection />
      <Technologies />
      <CTABanner />
      <WhyUs />
      <HireSteps />
      <Pricing />
      <Testimonials />
      <Blog />
    </>
  )
}
