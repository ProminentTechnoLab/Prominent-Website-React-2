'use client'

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

export default function Home() {
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
