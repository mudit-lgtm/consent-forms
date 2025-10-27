"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { useState } from "react"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <Link href="/" className="flex items-center gap-2">
            <div className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              ConsentForms
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8 items-center">
            <Link
              href="/category/medical-consent"
              className="text-foreground hover:text-indigo-600 transition font-medium"
            >
              Medical
            </Link>
            <Link
              href="/category/travel-consent"
              className="text-foreground hover:text-indigo-600 transition font-medium"
            >
              Travel
            </Link>
            <Link
              href="/category/school-consent"
              className="text-foreground hover:text-indigo-600 transition font-medium"
            >
              School
            </Link>
            <Link
              href="/category/sports-consent"
              className="text-foreground hover:text-indigo-600 transition font-medium"
            >
              Sports
            </Link>
            <Link href="/templates" className="text-foreground hover:text-indigo-600 transition font-medium">
              Templates
            </Link>
            <Link href="/faq" className="text-foreground hover:text-indigo-600 transition font-medium">
              FAQ
            </Link>
            <Link href="/about" className="text-foreground hover:text-indigo-600 transition font-medium">
              About
            </Link>
          </nav>

          {/* CTA Button */}
          <Link href="/category/medical-consent" className="hidden md:block">
            <Button className="bg-indigo-600 hover:bg-indigo-700">Get Started</Button>
          </Link>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 space-y-3 border-t border-border pt-4">
            <Link
              href="/category/medical-consent"
              className="block text-foreground hover:text-indigo-600 transition py-2"
            >
              Medical Consent
            </Link>
            <Link
              href="/category/travel-consent"
              className="block text-foreground hover:text-indigo-600 transition py-2"
            >
              Travel Consent
            </Link>
            <Link
              href="/category/school-consent"
              className="block text-foreground hover:text-indigo-600 transition py-2"
            >
              School Consent
            </Link>
            <Link
              href="/category/sports-consent"
              className="block text-foreground hover:text-indigo-600 transition py-2"
            >
              Sports Consent
            </Link>
            <Link href="/templates" className="block text-foreground hover:text-indigo-600 transition py-2">
              All Templates
            </Link>
            <Link href="/faq" className="block text-foreground hover:text-indigo-600 transition py-2">
              FAQ
            </Link>
            <Link href="/about" className="block text-foreground hover:text-indigo-600 transition py-2">
              About Us
            </Link>
            <Link href="/category/medical-consent" className="block pt-2">
              <Button className="w-full bg-indigo-600 hover:bg-indigo-700">Get Started</Button>
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
