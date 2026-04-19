import ServicesContent from '../../components/ServicesContent'

export const metadata = {
    title: 'Our Services — Web, Mobile App, UI/UX & Digital Marketing',
    description: 'Explore Prominent TechnoLabs services: custom web development, mobile apps (Flutter/React Native/iOS), UI/UX design, CMS & e-commerce, payment APIs, and digital marketing in India.',
    keywords: ['web development services India', 'mobile app development', 'Flutter developer', 'React developer', 'UI/UX design company', 'digital marketing agency India', 'Laravel development', 'WordPress development'],
    alternates: { canonical: '/services' },
    openGraph: { title: 'Services — Prominent TechnoLabs', description: 'Custom web, mobile app, design, and digital marketing services from India.', url: 'https://prominenttechnolabs.com/services' },
}

export default function ServicesPage() {
    return (
        <>
            <ServicesContent />
        </>
    )
}
