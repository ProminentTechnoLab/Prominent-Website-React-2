import AboutContent from '../../components/AboutContent'

export const metadata = {
    title: 'About Us — Web & Mobile Development Company Since 2018',
    description: 'Learn about Prominent TechnoLabs — a trusted web and mobile app development company based in Ahmedabad, India. 30+ happy clients, 50+ projects, 99% satisfaction since 2018.',
    keywords: ['about prominent technolabs', 'web development company Ahmedabad', 'IT company Gujarat India', 'software development company', 'mobile app company India'],
    alternates: { canonical: '/about' },
    openGraph: { title: 'About Prominent TechnoLabs', description: '30+ clients, 50+ projects, 99% satisfaction since 2018.', url: 'https://prominenttechnolabs.com/about' },
}

export default function AboutPage() {
    return <AboutContent />
}
