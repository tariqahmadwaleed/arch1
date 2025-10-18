import type React from "react"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import { ComparePanel } from "@/components/compare-panel"
import { Providers } from "@/app/providers"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

export const metadata = {
  title: "ArchNet Jordan - Architectural Community Platform",
  description: "Gathering all architectural resources, competitions, books, and opportunities in Jordan",
  keywords: "architecture, Jordan, competitions, projects, research, books, courses",
  authors: [{ name: "ArchNet Jordan" }],
  openGraph: {
    title: "ArchNet Jordan - Architectural Community Platform",
    description: "Gathering all architectural resources, competitions, books, and opportunities in Jordan",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "ArchNet Jordan - Architectural Community Platform",
    description: "Gathering all architectural resources, competitions, books, and opportunities in Jordan",
  },
  robots: {
    index: true,
    follow: true,
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <Providers>
          {children}
          <ComparePanel />
        </Providers>
      </body>
    </html>
  )
}
