import ServicePagePremium from '../../../components/ServicePagePremium'

export const metadata = {
    title: 'Mobile App Development Services — Flutter, React Native, iOS | Prominent TechnoLabs',
    description: 'Expert mobile app development using Flutter, React Native, and Swift. We build high-performance iOS and Android apps with beautiful UI and rock-solid backend integration. Ahmedabad, India.',
    keywords: ['mobile app development India', 'Flutter developer Ahmedabad', 'React Native development company', 'iOS app development', 'Android app developer', 'custom mobile apps', 'hybrid app development', 'SwiftUI developer'],
    alternates: { canonical: '/services/mobile-app-development' },
    openGraph: {
        title: 'Mobile App Development Services — Prominent TechnoLabs',
        description: 'Build premium iOS and Android apps with Flutter and React Native. Expert development from Ahmedabad, India.',
        url: 'https://prominenttechnolabs.com/services/mobile-app-development',
    },
}

export default function MobileAppDevelopmentPage() {
    return <ServicePagePremium slug="mobile-app-development" />
}
