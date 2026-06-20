import PortfolioContent from '../../components/PortfolioContent'

export const metadata = {
    title: 'Portfolio — Our Work & Case Studies',
    description: 'Explore the portfolio of Prominent TechnoLabs. We build premium web and mobile experiences for global brands.',
    keywords: ['portfolio', 'web development case studies', 'mobile app projects', 'UI/UX design portfolio', 'Biobonz', 'Propleadz', 'BB Signs', 'YOYO Fashion', 'Antyodaya News'],
    alternates: { canonical: '/portfolio' },
    openGraph: { title: 'Portfolio — Prominent TechnoLabs', description: 'Selected works and case studies from Prominent TechnoLabs.', url: 'https://prominenttechnolabs.com/portfolio' },
}

export default function PortfolioPage() {
    return (
        <>
            <PortfolioContent />
        </>
    )
}
