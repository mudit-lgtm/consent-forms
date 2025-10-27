import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle2, Shield, Zap } from "lucide-react"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            ConsentForms
          </Link>
          <div className="flex gap-4">
            <Link href="/about" className="text-foreground hover:text-primary transition font-semibold">
              About
            </Link>
            <Link href="/faq" className="text-foreground hover:text-primary transition">
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
          <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">About ConsentForms</h1>
          <p className="text-lg text-muted-foreground text-balance">
            Making consent documentation simple, secure, and accessible for families everywhere
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                ConsentForms was created to solve a real problem: parents and guardians need quick, reliable, and
                legally sound consent forms for their children's travel and medical care.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                We believe that important documents shouldn't require expensive lawyers or hours of research. Our
                platform provides professionally drafted templates that give you peace of mind.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Whether you're planning a school trip, family vacation, or authorizing medical care, ConsentForms makes
                it easy to create the right documentation in minutes.
              </p>
            </div>
            <Card className="p-8 bg-primary/5">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <Shield className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Legally Sound</h3>
                    <p className="text-sm text-muted-foreground">Drafted by legal experts</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Zap className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Quick & Easy</h3>
                    <p className="text-sm text-muted-foreground">Complete in 5-10 minutes</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Instant Download</h3>
                    <p className="text-sm text-muted-foreground">Get your PDF immediately</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4 bg-card">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose ConsentForms?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Expert Drafted",
                description:
                  "Our forms are created and reviewed by legal professionals to ensure compliance and protection.",
              },
              {
                title: "Time Saving",
                description: "No need to hire lawyers or spend hours researching. Get professional forms in minutes.",
              },
              {
                title: "Comprehensive",
                description: "Covers all essential information for travel and medical consent scenarios.",
              },
              {
                title: "Easy to Use",
                description: "Our intuitive wizard guides you through each step with clear instructions.",
              },
              {
                title: "Secure",
                description: "Your information is encrypted and never shared with third parties.",
              },
              {
                title: "Affordable",
                description: "Professional consent forms at a fraction of the cost of legal services.",
              },
            ].map((item, idx) => (
              <Card key={idx} className="p-6">
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-8">Create your first consent form today</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/forms/travel">
              <Button size="lg">Travel Consent</Button>
            </Link>
            <Link href="/forms/medical">
              <Button variant="outline" size="lg">
                Medical Consent
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
