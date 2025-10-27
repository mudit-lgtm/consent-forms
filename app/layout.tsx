import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import Header from "@/components/header"
import Footer from "@/components/footer"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Child & Minor Consent Forms Online | Easy Parental Consent Templates",
  description:
    "Generate legally compliant Child and Minor Consent Forms online in minutes. Access free templates for medical, travel, school, and sports activities. No notarization required.",
  generator: "v0.app",
  keywords:
    "child consent forms, minor consent templates, parental consent forms, medical consent, travel consent, school consent, sports consent",
  openGraph: {
    title: "Child & Minor Consent Forms Online | Easy Parental Consent Templates",
    description:
      "Generate legally compliant Child and Minor Consent Forms online in minutes. Access free templates for medical, travel, school, and sports activities. No notarization required.",
    url: "https://consentforms.app",
    siteName: "ConsentForms",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Child & Minor Consent Forms Online",
    description:
      "Generate legally compliant Child and Minor Consent Forms online in minutes. Access free templates for medical, travel, school, and sports activities. No notarization required.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Child & Minor Consent Forms Online",
    url: "https://consentforms.app",
    description:
      "Generate legally compliant Child and Minor Consent Forms online in minutes. Access free templates for medical, travel, school, and sports activities. No notarization required.",
    publisher: {
      "@type": "Organization",
      name: "ConsentForms",
    },
    mainEntity: {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Who can sign a minor consent form?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Parents or legal guardians can sign minor consent forms to ensure legal validity.",
          },
        },
        {
          "@type": "Question",
          name: "Are these forms legally valid?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, our minor consent templates comply with standard legal guidelines.",
          },
        },
        {
          "@type": "Question",
          name: "Can I fill these forms online?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Our platform allows you to fill in and download forms online easily.",
          },
        },
      ],
    },
  }

  return (
    <html lang="en">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className={`font-sans antialiased flex flex-col min-h-screen`}>
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
