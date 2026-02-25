import ServicePageLayout from '../../../components/ServicePageLayout'

export const metadata = {
    title: 'Custom Website Development Services — Prominent TechnoLabs | Ahmedabad, India',
    description: 'Professional website development services using React, Next.js & Laravel. We build fast, SEO-friendly corporate websites, web apps, WordPress sites, and landing pages. Based in Ahmedabad, India.',
    keywords: ['website development company Ahmedabad', 'custom web development India', 'React developer India', 'Next.js development', 'Laravel web development', 'WordPress development India', 'corporate website design', 'SEO website development'],
    alternates: { canonical: '/services/website-development' },
    openGraph: {
        title: 'Custom Website Development — Prominent TechnoLabs',
        description: 'High-performance, SEO-optimised websites built with React, Next.js, and Laravel by expert developers in Ahmedabad, India.',
        url: 'https://prominenttechnolabs.com/services/website-development',
    },
}

export default function WebsiteDevelopmentPage() {
    return <ServicePageLayout slug="website-development" />
}
