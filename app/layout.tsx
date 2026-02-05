import React from "react"
import type { Metadata, Viewport } from 'next'
import { Outfit } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { CartProvider } from '@/components/cart-context'
import { Header } from '@/components/header'
import LightPillar from '@/components/LightPillar'

const outfit = Outfit({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-outfit'
});

export const metadata: Metadata = {
  title: 'LUXE | Premium Collection',
  description: 'Discover our curated collection of premium goods',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#1a1625',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${outfit.variable} font-sans antialiased bg-black`}>
        <CartProvider>
          {/* Persistent Background Effect */}
          <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
            <LightPillar 
              topColor="#5227FF"
              bottomColor="#ffea00"
              intensity={0.5}
              rotationSpeed={0.3}
              glowAmount={0.001}
              pillarWidth={10}
              pillarHeight={0.4}
              noiseIntensity={0.5}
              pillarRotation={25}
              interactive={false}
              mixBlendMode="screen"
              quality="high"
            />
          </div>

          <Header />
          <div className="relative z-10">
            {children}
          </div>
        </CartProvider>
        <Analytics />
      </body>
    </html>
  )
}
