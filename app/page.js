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
  keywords: ['web development company India', 'React developer', 'Laravel development', 'Flutter app', 'e-commerce development', 'digital marketing', 'SEO services'],
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

      {/* 2. QualityServices (Dark) */}
      <div className="section-wrapper wrapper-light" style={{ position: 'relative', zIndex: 2 }}>
        <div className="section-curved section-dark" data-reveal data-delay="0.1">
          <QualityServices />
        </div>
      </div>

      {/* 3. ServicesSection (Light) */}
      <div className="section-wrapper wrapper-dark" style={{ position: 'relative', zIndex: 3 }}>
        <div className="section-curved section-light" data-reveal data-delay="0.2">
          <ServicesSection />
        </div>
      </div>
      
      {/* 4. Technologies (Dark) */}
      <div className="section-wrapper wrapper-light" style={{ position: 'relative', zIndex: 4 }}>
        <div className="section-curved section-dark" data-reveal data-delay="0.1" data-float>
          <Technologies />
        </div>
      </div>

      {/* 5. CTABanner (Light) */}
      <div className="section-wrapper wrapper-dark" style={{ position: 'relative', zIndex: 5 }}>
        <div className="section-curved section-light" data-reveal data-delay="0.1">
          <CTABanner />
        </div>
      </div>

      {/* 6. WhyUs (Dark) */}
      <div className="section-wrapper wrapper-light" style={{ position: 'relative', zIndex: 6 }}>
        <div className="section-curved section-dark" data-reveal data-delay="0.2" data-float>
          <WhyUs />
        </div>
      </div>

      {/* 7. HireSteps (Light) */}
      <div className="section-wrapper wrapper-dark" style={{ position: 'relative', zIndex: 7 }}>
        <div className="section-curved section-light" data-reveal data-delay="0.1">
          <HireSteps />
        </div>
      </div>

      {/* 8. Pricing (Dark) */}
      <div className="section-wrapper wrapper-light" style={{ position: 'relative', zIndex: 8 }}>
        <div className="section-curved section-dark" data-reveal data-delay="0.2">
          <Pricing />
        </div>
      </div>

      {/* 9. Testimonials (Light) */}
      <div className="section-wrapper wrapper-dark" style={{ position: 'relative', zIndex: 9 }}>
        <div className="section-curved section-light" data-reveal data-delay="0.1" data-float>
          <Testimonials />
        </div>
      </div>

      {/* 10. Blog (Dark) */}
      <div className="section-wrapper wrapper-light" style={{ position: 'relative', zIndex: 10 }}>
        <div className="section-curved section-dark" data-reveal data-delay="0.2">
          <Blog />
        </div>
      </div>
    </>
  )
}
