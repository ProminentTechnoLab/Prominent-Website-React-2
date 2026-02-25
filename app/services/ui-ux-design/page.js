import ServicePageLayout from '../../../components/ServicePageLayout'

export const metadata = {
    title: 'UI/UX Design Services — App & Web Design | Prominent TechnoLabs Ahmedabad',
    description: 'Professional UI/UX design services for web and mobile apps. Wireframing, prototyping, user research, brand identity & Figma design by expert designers in Ahmedabad, India.',
    keywords: ['UI UX design company Ahmedabad', 'web design services India', 'mobile app UI design', 'Figma design company', 'user experience design India', 'app interface design', 'wireframing prototyping India', 'brand identity design'],
    alternates: { canonical: '/services/ui-ux-design' },
    openGraph: {
        title: 'UI/UX Design Services — Prominent TechnoLabs',
        description: 'Stunning, intuitive UI/UX designs for web & mobile. Wireframes to high-fidelity Figma prototypes by expert designers in Ahmedabad.',
        url: 'https://prominenttechnolabs.com/services/ui-ux-design',
    },
}

export default function UiUxDesignPage() {
    return <ServicePageLayout slug="ui-ux-design" />
}
