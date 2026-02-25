import ServicePageLayout from '../../../components/ServicePageLayout'

export const metadata = {
    title: 'Digital Marketing Services — SEO, Google Ads & Social Media | Prominent TechnoLabs',
    description: 'Data-driven digital marketing services: SEO, Google Ads (PPC), Facebook & Instagram Ads, Social Media Marketing, and Content Strategy. Measurable ROI for businesses in India.',
    keywords: ['digital marketing agency Ahmedabad', 'SEO services India', 'Google Ads management India', 'Facebook Ads agency', 'social media marketing India', 'PPC management Ahmedabad', 'content marketing India', 'SEO company Gujarat'],
    alternates: { canonical: '/services/digital-marketing' },
    openGraph: {
        title: 'Digital Marketing Services — Prominent TechnoLabs',
        description: 'Data-driven SEO, Google Ads, social media marketing, and content strategy from Ahmedabad, India. Measurable ROI guaranteed.',
        url: 'https://prominenttechnolabs.com/services/digital-marketing',
    },
}

export default function DigitalMarketingPage() {
    return <ServicePageLayout slug="digital-marketing" />
}
