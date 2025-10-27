import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Download, FileText, Shield, Zap } from "lucide-react"

export default function TemplatesPage() {
  const templates = [
    {
      id: 1,
      title: "Basic Travel Consent",
      description: "Simple travel consent form for domestic trips",
      category: "Travel",
      features: ["Domestic travel", "Basic medical info", "Emergency contacts"],
      icon: FileText,
      slug: "domestic-travel-consent",
    },
    {
      id: 2,
      title: "International Travel Consent",
      description: "Comprehensive form for international travel",
      category: "Travel",
      features: ["Passport info", "Visa details", "Travel insurance", "International emergency contacts"],
      icon: FileText,
      slug: "international-travel-consent",
    },
    {
      id: 3,
      title: "Cruise Travel Consent",
      description: "Specialized form for cruise ship travel",
      category: "Travel",
      features: ["Cruise line info", "Cabin details", "Port information", "Sea sickness medication"],
      icon: FileText,
      slug: "cruise-consent-form",
    },
    {
      id: 4,
      title: "Routine Medical Consent",
      description: "For routine medical appointments and procedures",
      category: "Medical",
      features: ["Medical history", "Current medications", "Allergies", "Insurance info"],
      icon: Shield,
      slug: "general-medical-consent",
    },
    {
      id: 5,
      title: "Emergency Medical Consent",
      description: "For emergency medical situations",
      category: "Medical",
      features: ["Emergency procedures", "Treatment authorization", "Hospital preferences", "DNR options"],
      icon: Shield,
      slug: "emergency-medical-consent",
    },
    {
      id: 6,
      title: "Surgical Consent",
      description: "For planned surgical procedures",
      category: "Medical",
      features: ["Procedure details", "Surgeon info", "Anesthesia consent", "Post-op care"],
      icon: Shield,
      slug: "surgery-consent-form",
    },
  ]

  const categories = ["All", "Travel", "Medical"]

  return (
    <main className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="bg-gradient-to-br from-indigo-600 via-indigo-500 to-purple-600 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-balance">Consent Form Templates</h1>
          <p className="text-lg md:text-xl text-white/90 text-balance">
            Choose from our collection of professionally designed templates for travel and medical consent forms
          </p>
        </div>
      </section>

      {/* Templates Grid */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          {/* Category Filter */}
          <div className="flex gap-2 mb-12 justify-center flex-wrap">
            {categories.map((category) => (
              <Button key={category} variant={category === "All" ? "default" : "outline"} className="rounded-full">
                {category}
              </Button>
            ))}
          </div>

          {/* Templates Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => {
              const Icon = template.icon
              return (
                <Link key={template.id} href={`/templates/${template.slug}`}>
                  <Card className="p-6 hover:shadow-lg hover:border-indigo-600 transition-all duration-300 cursor-pointer h-full flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                      <Icon className="w-8 h-8 text-indigo-600" />
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-100 text-indigo-600">
                        {template.category}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold mb-2">{template.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4 flex-grow">{template.description}</p>

                    <div className="mb-6">
                      <p className="text-xs font-semibold text-muted-foreground mb-2">Features:</p>
                      <ul className="space-y-1">
                        {template.features.map((feature, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                            <span className="w-1 h-1 bg-indigo-600 rounded-full" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex gap-2">
                      <Button className="flex-1 gap-2 bg-indigo-600 hover:bg-indigo-700">
                        <Zap className="w-4 h-4" />
                        Use Template
                      </Button>
                      <Button variant="outline" size="icon">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Create Your Form?</h2>
          <p className="text-lg mb-8 opacity-90">Start with a template or create a custom form from scratch</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/category/travel-consent">
              <Button variant="secondary" size="lg">
                Travel Consent
              </Button>
            </Link>
            <Link href="/category/medical-consent">
              <Button variant="secondary" size="lg">
                Medical Consent
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
