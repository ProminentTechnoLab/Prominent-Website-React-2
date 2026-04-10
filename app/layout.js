import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CustomCursor from '../components/animations/CustomCursor'
import AppWrapper from '../components/AppWrapper'
import PageTransition from '../components/animations/PageTransition'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
})

export const metadata = {
  metadataBase: new URL('https://prominenttechnolabs.com'),
  title: {
    default: 'Prominent TechnoLabs — Web & Mobile App Development Company',
    template: '%s | Prominent TechnoLabs',
  },
  description: 'Prominent TechnoLabs — India\'s trusted web and mobile app development company.',
  authors: [{ name: 'Prominent TechnoLabs' }],
  creator: 'Prominent TechnoLabs',
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
      <body>
        <CustomCursor />
        <AppWrapper>
          <Navbar />
          <PageTransition>
            <main>{children}</main>
          </PageTransition>
          <Footer />
        </AppWrapper>
      </body>
    </html>
  )
}
