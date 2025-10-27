"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronDown } from "lucide-react"

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (id: number) => {
    setOpenItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const faqs = [
    {
      id: 1,
      category: "General",
      question: "What is ConsentForms?",
      answer:
        "ConsentForms is a platform that helps parents and guardians create professional, legally sound consent forms for child travel and medical care. Our templates are designed by legal experts and can be completed in just 5-10 minutes.",
    },
    {
      id: 2,
      category: "General",
      question: "Are the forms legally binding?",
      answer:
        "Our forms are drafted by legal professionals and comply with standard consent documentation practices. However, we recommend consulting with a local attorney if you have specific legal concerns or requirements in your jurisdiction.",
    },
    {
      id: 3,
      category: "General",
      question: "Can I customize the forms?",
      answer:
        "Yes! Our forms are fully customizable. You can edit any section to add specific details, requirements, or conditions relevant to your situation.",
    },
    {
      id: 4,
      category: "Travel",
      question: "What information do I need for a travel consent form?",
      answer:
        "You'll need: parent/guardian information, child's details, travel destination and dates, supervisor/chaperone information, medical history, allergies, medications, and emergency contacts.",
    },
    {
      id: 5,
      category: "Travel",
      question: "Do I need a travel consent form for domestic travel?",
      answer:
        "While not always legally required, a travel consent form is highly recommended for domestic travel, especially if the child is traveling with someone other than their parent or guardian.",
    },
    {
      id: 6,
      category: "Travel",
      question: "Is a travel consent form required for international travel?",
      answer:
        "Many countries require a travel consent form (also called a letter of consent) when a child travels with someone other than both parents. Some airlines also require it. We recommend checking with your destination country and airline.",
    },
    {
      id: 7,
      category: "Medical",
      question: "When do I need a medical consent form?",
      answer:
        "You need a medical consent form when someone other than the parent/guardian will be responsible for the child's medical care, such as during school trips, sports events, or when staying with relatives.",
    },
    {
      id: 8,
      category: "Medical",
      question: "What medical information should I include?",
      answer:
        "Include all relevant medical information: existing conditions, current medications, allergies, vaccination status, insurance details, preferred physician, and emergency contacts. The more complete, the better.",
    },
    {
      id: 9,
      category: "Medical",
      question: "Can I specify treatment limitations?",
      answer:
        "Yes, you can specify what treatments you authorize or restrict. For example, you can indicate whether emergency surgery is authorized or if certain procedures require your direct approval.",
    },
    {
      id: 10,
      category: "Technical",
      question: "How do I download my form?",
      answer:
        "After completing the form, you can download it as a PDF directly from the platform. The PDF is ready to print and sign.",
    },
    {
      id: 11,
      category: "Technical",
      question: "Is my information secure?",
      answer:
        "Yes, your information is encrypted and stored securely. We never share your data with third parties. You can delete your information at any time.",
    },
    {
      id: 12,
      category: "Technical",
      question: "Can I save my form and come back to it later?",
      answer:
        "Currently, forms are completed in one session. However, you can download your completed form and edit it later using any PDF editor if needed.",
    },
  ]

  const categories = ["All", ...new Set(faqs.map((faq) => faq.category))]

  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            ConsentForms
          </Link>
          <div className="flex gap-4">
            <Link href="/about" className="text-foreground hover:text-primary transition">
              About
            </Link>
            <Link href="/faq" className="text-foreground hover:text-primary transition font-semibold">
              FAQ
            </Link>
            <Link href="/templates" className="text-foreground hover:text-primary transition">
              Templates
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-accent/10 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">Frequently Asked Questions</h1>
          <p className="text-lg text-muted-foreground text-balance">
            Find answers to common questions about ConsentForms and our consent documents
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Category Filter */}
          <div className="flex gap-2 mb-12 justify-center flex-wrap">
            {categories.map((category) => (
              <Button key={category} variant={category === "All" ? "default" : "outline"} className="rounded-full">
                {category}
              </Button>
            ))}
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {faqs.map((faq) => (
              <Card key={faq.id} className="overflow-hidden">
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-muted/50 transition"
                >
                  <div className="text-left">
                    <p className="text-xs font-semibold text-primary mb-1">{faq.category}</p>
                    <h3 className="font-semibold text-foreground">{faq.question}</h3>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform ${
                      openItems.includes(faq.id) ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openItems.includes(faq.id) && (
                  <div className="px-6 py-4 border-t border-border bg-muted/30">
                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary text-primary-foreground">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Still have questions?</h2>
          <p className="text-lg mb-8 opacity-90">Contact our support team or start creating your form</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/forms/travel">
              <Button variant="secondary" size="lg">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-8 px-4">
        <div className="max-w-6xl mx-auto text-center text-muted-foreground text-sm">
          <p>&copy; 2025 ConsentForms. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
