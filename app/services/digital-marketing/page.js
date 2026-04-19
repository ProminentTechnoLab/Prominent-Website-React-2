import ServicePagePremium from '../../../components/ServicePagePremium'

export const metadata = {
    title: 'Digital Marketing Services — SEO, PPC & Social Media | Prominent TechnoLabs',
    description: 'Data-driven digital marketing services including SEO, Google Ads, and social media marketing. Drive qualified traffic and grow your business with our ROI-focused strategies. Ahmedabad, India.',
    keywords: ['digital marketing agency India', 'SEO services Ahmedabad', 'Google Ads management', 'social media marketing India', 'PPC expert Ahmedabad', 'content marketing strategy', 'conversion rate optimisation', 'marketing ROI tracking'],
    alternates: { canonical: '/services/digital-marketing' },
    openGraph: {
        title: 'Digital Marketing Services — Prominent TechnoLabs',
        description: 'Grow your brand with data-driven digital marketing. Expert SEO and PPC from Ahmedabad, India.',
        url: 'https://prominenttechnolabs.com/services/digital-marketing',
    },
}

export default function DigitalMarketingPage() {
    return <ServicePagePremium slug="digital-marketing" />
}
