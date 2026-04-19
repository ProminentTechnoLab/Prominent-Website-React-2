import ServicePagePremium from '../../../components/ServicePagePremium'

export const metadata = {
    title: 'Custom Website Development Services | Prominent TechnoLabs',
    description: 'Expert website development in React, Next.js, and Laravel. We build fast, secure, and SEO-optimised corporate websites and complex web applications. Ahmedabad, India.',
    keywords: ['web development services India', 'Next.js developer', 'React development company', 'Laravel web development', 'custom website design India', 'PHP website development Ahmedabad', 'responsive web design', 'enterprise web applications'],
    alternates: { canonical: '/services/website-development' },
    openGraph: {
        title: 'Website Development Services — Prominent TechnoLabs',
        description: 'Modern, fast, and SEO-optimised web development using React, Next.js, and Laravel.',
        url: 'https://prominenttechnolabs.com/services/website-development',
    },
}

export default function WebsiteDevelopmentPage() {
    return <ServicePagePremium slug="website-development" />
}
