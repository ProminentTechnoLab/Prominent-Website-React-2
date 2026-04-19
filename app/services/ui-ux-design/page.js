import ServicePagePremium from '../../../components/ServicePagePremium'

export const metadata = {
    title: 'UI/UX Design Services — Figma, Web & Mobile Design | Prominent TechnoLabs',
    description: 'Bespoke UI/UX design services for websites and mobile apps. We create intuitive, user-centered designs using Figma and Adobe XD that enhance user engagement and conversion. Ahmedabad, India.',
    keywords: ['UI/UX design services India', 'Figma designer Ahmedabad', 'website UI design', 'mobile app UX design', 'custom interface design', 'user research & prototyping', 'UX audit services', 'design system creation'],
    alternates: { canonical: '/services/ui-ux-design' },
    openGraph: {
        title: 'UI/UX Design Services — Prominent TechnoLabs',
        description: 'Intuitive and beautiful UI/UX design for web and mobile. Modern design from Ahmedabad, India.',
        url: 'https://prominenttechnolabs.com/services/ui-ux-design',
    },
}

export default function UiUxDesignPage() {
    return <ServicePagePremium slug="ui-ux-design" />
}
