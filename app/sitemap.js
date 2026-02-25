export const dynamic = 'force-static'

export default function sitemap() {
    const baseUrl = 'https://prominenttechnolabs.com'
    const now = new Date()

    const mainPages = [
        { path: '', priority: 1.0, freq: 'weekly' },
        { path: '/about', priority: 0.8, freq: 'monthly' },
        { path: '/services', priority: 0.9, freq: 'weekly' },
        { path: '/pricing', priority: 0.8, freq: 'monthly' },
        { path: '/contact', priority: 0.7, freq: 'monthly' },
    ]

    const servicePages = [
        '/services/website-development',
        '/services/mobile-app-development',
        '/services/ui-ux-design',
        '/services/cms-ecommerce',
        '/services/payment-shipping-api',
        '/services/digital-marketing',
    ]

    const main = mainPages.map(p => ({
        url: `${baseUrl}${p.path}`,
        lastModified: now,
        changeFrequency: p.freq,
        priority: p.priority,
    }))

    const services = servicePages.map(path => ({
        url: `${baseUrl}${path}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.85,
    }))

    return [...main, ...services]
}
