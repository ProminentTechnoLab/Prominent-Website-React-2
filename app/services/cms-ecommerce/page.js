import ServicePagePremium from '../../../components/ServicePagePremium'

export const metadata = {
    title: 'CMS & E-Commerce Development — WooCommerce, Shopify | Prominent TechnoLabs',
    description: 'Professional CMS and e-commerce development on WooCommerce, Shopify, Magento, and custom Laravel. Build a scalable online store with payment gateways, inventory & order management. Ahmedabad, India.',
    keywords: ['WooCommerce development India', 'Shopify store development', 'e-commerce website development Ahmedabad', 'custom CMS development', 'Magento development India', 'online store development', 'WordPress WooCommerce developer', 'e-commerce website cost India'],
    alternates: { canonical: '/services/cms-ecommerce' },
    openGraph: {
        title: 'CMS & E-Commerce Development — Prominent TechnoLabs',
        description: 'WooCommerce, Shopify, and custom Laravel e-commerce solutions from Ahmedabad, India. Build your scalable online store with us.',
        url: 'https://prominenttechnolabs.com/services/cms-ecommerce',
    },
}

export default function CmsEcommercePage() {
    return <ServicePagePremium slug="cms-ecommerce" />
}
