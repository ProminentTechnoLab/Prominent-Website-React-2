import { Inter, Space_Grotesk } from 'next/font/google'
import Script from 'next/script'

import './globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CustomCursor from '../components/animations/CustomCursor' // Commented out to boost speed

import AppWrapper from '../components/AppWrapper'
import PageTransition from '../components/animations/PageTransition'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' })

export const metadata = {
  metadataBase: new URL('https://prominenttechnolabs.com'),
  title: {
    default: 'Prominent TechnoLabs — Web & Mobile App Development Company',
    template: '%s | Prominent TechnoLabs',
  },
  description: 'Prominent TechnoLabs — India\'s trusted web and mobile app development company. We build React, Laravel, Flutter apps, e-commerce, and digital marketing solutions. 30+ happy clients.',
  keywords: ['web development company India', 'mobile app development', 'React developer', 'Laravel development', 'Flutter app', 'digital marketing', 'SEO services', 'IT company India'],
  authors: [{ name: 'Prominent TechnoLabs' }],
  creator: 'Prominent TechnoLabs',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://prominenttechnolabs.com',
    siteName: 'Prominent TechnoLabs',
    images: [{ url: '/images/logo-color.svg', width: 400, height: 100 }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@ProminentTechno',
  },
  robots: { index: true, follow: true },
  verification: {
    other: {
      'facebook-domain-verification': ['ka8ztjur1xprpwzve57szd0q729ucs'],
    },
  },
}

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Prominent TechnoLabs',
  url: 'https://prominenttechnolabs.com',
  logo: 'https://prominenttechnolabs.com/images/logo-color.svg',
  description: 'Web and mobile app development company offering React, Laravel, Flutter, WordPress, and digital marketing services.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'G-108, Titanium City Center, 100 Feet Anand Nagar Rd, near SACHIN TOWER',
    addressLocality: 'Ahmedabad',
    addressRegion: 'Gujarat',
    postalCode: '380015',
    addressCountry: 'IN',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-93276-03253',
    contactType: 'customer service',
    areaServed: ['IN', 'UK', 'US', 'AU', 'SG'],
    availableLanguage: 'English',
  },
  sameAs: [
    'https://www.facebook.com/people/Prominent-TechnoLabs/61556264138689/',
    'https://www.instagram.com/prominent_technolabs/',
    'https://www.youtube.com/@Prominentechnolabs',
  ],
}


export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body>
        <Script
          id="fb-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1007984794652617');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1007984794652617&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        
        {/* <CustomCursor /> Removed for maximum performance */}

        
        <div className="app-wrapper">
          <AppWrapper>
            <Navbar />
            <PageTransition>
              <main>{children}</main>
            </PageTransition>
            <Footer />
          </AppWrapper>
        </div>
      </body>
    </html>
  )
}

