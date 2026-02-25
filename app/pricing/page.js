import Pricing from '../../components/Pricing'
import CTABanner from '../../components/CTABanner'

export const metadata = {
    title: 'Pricing Plans — Affordable Web & App Development Packages',
    description: 'Transparent pricing for web development, mobile app development, remote hiring, and digital marketing services. Starting from $69. No hidden costs. Based in Ahmedabad, India.',
    keywords: ['web development pricing India', 'affordable website packages', 'mobile app development cost India', 'digital marketing pricing', 'remote developer hire'],
    alternates: { canonical: '/pricing' },
    openGraph: { title: 'Pricing — Prominent TechnoLabs', description: 'Transparent web & mobile development pricing starting from $69.', url: 'https://prominenttechnolabs.com/pricing' },
}

export default function PricingPage() {
    return (
        <>
            <div className="page-hero">
                <div className="container">
                    <div className="page-hero-content">
                        <div className="section-badge">Simple Pricing</div>
                        <h1 className="page-hero-title">Transparent <span style={{ color: 'var(--orange)' }}>Pricing Plans</span></h1>
                        <p className="page-hero-subtitle">No hidden fees. No lock-ins. Just straightforward pricing in USD ($).</p>
                        <div className="page-hero-breadcrumb"><a href="/">Home</a> / <span>Pricing</span></div>
                    </div>
                </div>
                <div className="page-hero-wave"><svg viewBox="0 0 1440 80" preserveAspectRatio="none"><path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="white" /></svg></div>
            </div>
            <Pricing />
            <CTABanner />
        </>
    )
}
