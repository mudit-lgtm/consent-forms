import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-card">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <div className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
              ConsentForms
            </div>
            <p className="text-muted-foreground text-sm">
              Making child and minor consent forms simple, fast, and accessible for parents and guardians.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-indigo-600 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/templates" className="text-muted-foreground hover:text-indigo-600 transition">
                  All Templates
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-indigo-600 transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-indigo-600 transition">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-bold mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/category/medical-consent"
                  className="text-muted-foreground hover:text-indigo-600 transition"
                >
                  Medical Consent
                </Link>
              </li>
              <li>
                <Link
                  href="/category/travel-consent"
                  className="text-muted-foreground hover:text-indigo-600 transition"
                >
                  Travel Consent
                </Link>
              </li>
              <li>
                <Link
                  href="/category/school-consent"
                  className="text-muted-foreground hover:text-indigo-600 transition"
                >
                  School Consent
                </Link>
              </li>
              <li>
                <Link
                  href="/category/sports-consent"
                  className="text-muted-foreground hover:text-indigo-600 transition"
                >
                  Sports Consent
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2 items-start">
                <Mail className="w-4 h-4 text-indigo-600 mt-0.5 flex-shrink-0" />
                <a
                  href="mailto:support@consentforms.app"
                  className="text-muted-foreground hover:text-indigo-600 transition"
                >
                  support@consentforms.app
                </a>
              </li>
              <li className="flex gap-2 items-start">
                <Phone className="w-4 h-4 text-indigo-600 mt-0.5 flex-shrink-0" />
                <a href="tel:+1-800-CONSENT" className="text-muted-foreground hover:text-indigo-600 transition">
                  1-800-CONSENT
                </a>
              </li>
              <li className="flex gap-2 items-start">
                <MapPin className="w-4 h-4 text-indigo-600 mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">San Francisco, CA</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>&copy; {currentYear} ConsentForms. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-indigo-600 transition">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-indigo-600 transition">
                Terms of Service
              </Link>
              <Link href="/contact" className="hover:text-indigo-600 transition">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
