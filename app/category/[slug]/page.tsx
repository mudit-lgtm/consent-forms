import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

const categoryData: Record<
  string,
  {
    title: string
    description: string
    intro: string
    templates: Array<{ id: string; name: string; description: string }>
  }
> = {
  "medical-consent": {
    title: "Child Medical Consent Forms",
    description: "Professional medical authorization forms for minors",
    intro:
      "Medical consent forms are essential for parents and guardians to authorize medical treatment for their children. Our child medical consent templates ensure healthcare providers have proper authorization for routine and emergency care.",
    templates: [
      {
        id: "general-medical",
        name: "General Medical Consent",
        description: "For routine medical care and check-ups",
      },
      {
        id: "emergency-medical",
        name: "Emergency Medical Consent",
        description: "For emergency medical situations and urgent care",
      },
      {
        id: "surgery-consent",
        name: "Surgery Consent Form",
        description: "For surgical procedures and anesthesia authorization",
      },
      {
        id: "dental-consent",
        name: "Dental Consent Form",
        description: "For dental procedures and orthodontic treatment",
      },
      {
        id: "medication-consent",
        name: "Medication Consent",
        description: "For prescription medication authorization",
      },
      {
        id: "vaccination-consent",
        name: "Vaccination Consent",
        description: "For immunization and vaccine authorization",
      },
    ],
  },
  "travel-consent": {
    title: "Minor Travel Consent Forms",
    description: "Travel authorization forms for children and minors",
    intro:
      "Travel consent forms are required when minors travel without both parents or guardians. Our parental consent templates cover domestic flights, international travel, cruises, and more.",
    templates: [
      {
        id: "domestic-travel",
        name: "Domestic Travel Consent",
        description: "For travel within the United States",
      },
      {
        id: "international-travel",
        name: "International Travel Consent",
        description: "For travel outside the United States",
      },
      {
        id: "cruise-consent",
        name: "Cruise Travel Consent",
        description: "For cruise ship travel and maritime activities",
      },
      {
        id: "flight-consent",
        name: "Flight Consent Form",
        description: "For air travel authorization",
      },
      {
        id: "camp-consent",
        name: "Summer Camp Consent",
        description: "For overnight camp and extended trips",
      },
      {
        id: "exchange-consent",
        name: "Exchange Program Consent",
        description: "For student exchange and study abroad programs",
      },
    ],
  },
  "school-consent": {
    title: "School Consent Forms for Minors",
    description: "Educational authorization forms for children",
    intro:
      "School consent forms authorize educational activities, field trips, and programs. Our templates help parents provide proper authorization for school-related activities and events.",
    templates: [
      {
        id: "field-trip-consent",
        name: "Field Trip Consent",
        description: "For school field trips and educational outings",
      },
      {
        id: "activity-consent",
        name: "School Activity Consent",
        description: "For extracurricular activities and clubs",
      },
      {
        id: "photo-consent",
        name: "Photo/Video Consent",
        description: "For photography and video recording at school events",
      },
      {
        id: "technology-consent",
        name: "Technology Use Consent",
        description: "For computer and internet usage at school",
      },
      {
        id: "special-program-consent",
        name: "Special Program Consent",
        description: "For gifted programs, special education, and advanced courses",
      },
      {
        id: "transportation-consent",
        name: "Transportation Consent",
        description: "For school bus and transportation authorization",
      },
    ],
  },
  "sports-consent": {
    title: "Sports Activity Consent Forms",
    description: "Athletic authorization forms for young athletes",
    intro:
      "Sports consent forms authorize participation in athletic activities and competitive sports. Our templates include liability waivers and medical authorization for youth sports programs.",
    templates: [
      {
        id: "general-sports",
        name: "General Sports Participation",
        description: "For team sports and athletic programs",
      },
      {
        id: "contact-sports",
        name: "Contact Sports Consent",
        description: "For football, soccer, hockey, and contact sports",
      },
      {
        id: "water-sports",
        name: "Water Sports Consent",
        description: "For swimming, diving, and water activities",
      },
      {
        id: "extreme-sports",
        name: "Extreme Sports Consent",
        description: "For skateboarding, rock climbing, and extreme activities",
      },
      {
        id: "camp-sports",
        name: "Sports Camp Consent",
        description: "For sports camps and training programs",
      },
      {
        id: "tournament-consent",
        name: "Tournament Consent",
        description: "For competitive tournaments and championships",
      },
    ],
  },
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const category = categoryData[slug]

  if (!category) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
          >
            ConsentForms
          </Link>
          <div className="flex gap-6">
            <Link href="/about" className="text-foreground hover:text-indigo-600 transition">
              About
            </Link>
            <Link href="/faq" className="text-foreground hover:text-indigo-600 transition">
              FAQ
            </Link>
            <Link href="/templates" className="text-foreground hover:text-indigo-600 transition">
              Templates
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-600 via-indigo-500 to-purple-600 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-white hover:opacity-80 transition mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-balance">{category.title}</h1>
          <p className="text-xl text-white/90 text-balance">{category.description}</p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-12 px-4 bg-card">
        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-foreground leading-relaxed">{category.intro}</p>
        </div>
      </section>

      {/* Templates Grid */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12">Available Templates</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.templates.map((template) => (
              <Card key={template.id} className="p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold mb-2">{template.name}</h3>
                <p className="text-muted-foreground mb-6">{template.description}</p>
                <Link
                  href={`/templates/${template.id.replace(/_/g, "-")}-${template.id.includes("medical") ? "consent" : template.id.includes("travel") ? "consent" : "form"}`}
                >
                  <Button className="w-full bg-indigo-600 hover:bg-indigo-700">View Template</Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Create Your Form?</h2>
          <p className="text-lg mb-8 opacity-90">Choose a template above and get started in minutes</p>
          <Link href="/">
            <Button variant="secondary" size="lg">
              View All Categories
            </Button>
          </Link>
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
