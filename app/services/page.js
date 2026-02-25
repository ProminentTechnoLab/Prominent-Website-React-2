import ServicesSection from '../../components/ServicesSection'
import QualityServices from '../../components/QualityServices'
import CTABanner from '../../components/CTABanner'

export const metadata = {
    title: 'Our Services — Web, Mobile App, UI/UX & Digital Marketing',
    description: 'Explore Prominent TechnoLabs services: custom web development, mobile apps (Flutter/React Native/iOS), UI/UX design, CMS & e-commerce, payment APIs, and digital marketing in Ahmedabad, India.',
    keywords: ['web development services India', 'mobile app development Ahmedabad', 'Flutter developer', 'React developer', 'UI/UX design company', 'digital marketing agency India', 'Laravel development', 'WordPress development'],
    alternates: { canonical: '/services' },
    openGraph: { title: 'Services — Prominent TechnoLabs', description: 'Custom web, mobile app, design, and digital marketing services from Ahmedabad, India.', url: 'https://prominenttechnolabs.com/services' },
}

export default function ServicesPage() {
    return (
        <>
            <div className="page-hero">
                <div className="container">
                    <div className="page-hero-content">
                        <div className="section-badge">What We Do</div>
                        <h1 className="page-hero-title">Our Services</h1>
                        <p className="page-hero-subtitle">End-to-end digital solutions — from concept to code to launch.</p>
                        <div className="page-hero-breadcrumb"><a href="/">Home</a> / <span>Services</span></div>
                    </div>
                </div>
                <div className="page-hero-wave"><svg viewBox="0 0 1440 80" preserveAspectRatio="none"><path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="white" /></svg></div>
            </div>
            <QualityServices />
            <ServicesSection />
            <CTABanner />
        </>
    )
}
