import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle2, FileText, Shield, Stethoscope, Plane, BookOpen, Trophy, ArrowRight } from "lucide-react"

export default function HomePage() {
  const categories = [
    {
      slug: "medical-consent",
      title: "Medical Consent",
      description: "For routine and emergency medical care authorization",
      icon: Stethoscope,
      keywords: "child medical consent, minor medical authorization",
    },
    {
      slug: "travel-consent",
      title: "Travel Consent",
      description: "For domestic and international travel, cruises, and flights",
      icon: Plane,
      keywords: "minor travel consent, child travel authorization",
    },
    {
      slug: "school-consent",
      title: "School Consent",
      description: "For school trips, activities, and educational programs",
      icon: BookOpen,
      keywords: "school consent form, child school authorization",
    },
    {
      slug: "sports-consent",
      title: "Sports Activities Consent",
      description: "For sports participation, camps, and athletic activities",
      icon: Trophy,
      keywords: "sports consent form, athletic activity authorization",
    },
  ]

  const popularTemplates = [
    {
      title: "Medical Consent Form for Minors",
      description: "Ensure your child's health is covered even when you're away.",
      slug: "general-medical-consent",
    },
    {
      title: "Travel Consent Form for Minors",
      description: "Let your child travel safely with relatives or friends.",
      slug: "domestic-travel-consent",
    },
    {
      title: "School Permission Form for Minors",
      description: "School trips and activities made easy.",
      slug: "field-trip-consent-form",
    },
    {
      title: "Sports Activity Consent Form for Children",
      description: "Protect your child during sporting events.",
      slug: "general-sports-consent-form",
    },
  ]

  const steps = [
    {
      number: "1",
      title: "Select Your Form Template",
      description: "Choose the type of consent form your child needs.",
    },
    {
      number: "2",
      title: "Fill in Details Online",
      description: "Enter parent and child information safely.",
    },
    {
      number: "3",
      title: "Download or Share",
      description: "Get your child consent form as a PDF, ready to use.",
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-600 via-indigo-500 to-purple-600 py-16 md:py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 text-balance">
            Create Child and Minor Consent Forms Online – Quick, Easy, and Free
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-6 md:mb-8 text-balance">
            Generate legally compliant child consent forms, minor consent templates, and parental consent forms in
            minutes. No notarization required.
          </p>

          <div className="flex gap-3 md:gap-4 justify-center flex-wrap mb-8 md:mb-12">
            <Link href="/category/medical-consent">
              <Button size="lg" variant="secondary" className="text-sm md:text-base">
                Create Your Form Now
              </Button>
            </Link>
            <Link href="/templates">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 bg-transparent text-sm md:text-base"
              >
                Browse Templates
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Use Our Forms Section */}
      <section className="py-12 md:py-20 px-4 bg-background">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-balance">
            Why Parents and Guardians Trust Us
          </h2>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {[
              {
                title: "Simple Online Templates",
                description: "Fill in the details online and download immediately.",
              },
              {
                title: "All Major Categories Covered",
                description: "Medical, Travel, School, Sports, and more.",
              },
              {
                title: "Fully Legal & Safe",
                description: "Our minor consent forms follow standard legal guidelines.",
              },
              {
                title: "Time-Saving",
                description: "No printing, mailing, or notarization required.",
              },
            ].map((feature, idx) => (
              <div key={idx} className="flex gap-4">
                <CheckCircle2 className="w-5 md:w-6 h-5 md:h-6 text-indigo-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-base md:text-lg font-bold mb-2">{feature.title}</h3>
                  <p className="text-sm md:text-base text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Cards Section */}
      <section className="py-12 md:py-20 px-4 bg-card">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-2 md:mb-4 text-balance">
            Choose Your Consent Form Type
          </h2>
          <p className="text-center text-sm md:text-base text-muted-foreground mb-8 md:mb-12 max-w-2xl mx-auto">
            Select from our comprehensive collection of child and minor consent templates
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <Link key={category.slug} href={`/category/${category.slug}`}>
                  <Card className="p-4 md:p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer h-full flex flex-col">
                    <Icon className="w-10 md:w-12 h-10 md:h-12 text-indigo-600 mb-3 md:mb-4" />
                    <h3 className="text-lg md:text-xl font-bold mb-2">{category.title}</h3>
                    <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6 flex-grow">
                      {category.description}
                    </p>
                    <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-sm md:text-base">
                      Generate Template
                    </Button>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Popular Templates Section */}
      <section className="py-12 md:py-20 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-2 md:mb-4 text-balance">
            Most Used Child Consent Forms
          </h2>
          <p className="text-center text-sm md:text-base text-muted-foreground mb-8 md:mb-12 max-w-2xl mx-auto">
            Explore our most popular consent form templates trusted by parents and schools
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {popularTemplates.map((template, idx) => (
              <Link key={idx} href={`/templates/${template.slug}`}>
                <Card className="p-4 md:p-6 hover:shadow-lg hover:border-indigo-600 transition-all duration-300 cursor-pointer h-full flex flex-col">
                  <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">{template.title}</h3>
                  <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6 flex-grow">
                    {template.description}
                  </p>
                  <Button variant="outline" className="w-full group bg-transparent text-sm md:text-base">
                    Generate Your Template
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 md:py-20 px-4 bg-card">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-balance">
            How to Create a Child or Minor Consent Form in 3 Steps
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {steps.map((step, idx) => (
              <div key={idx} className="text-center">
                <div className="w-14 md:w-16 h-14 md:h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xl md:text-2xl font-bold mx-auto mb-3 md:mb-4">
                  {step.number}
                </div>
                <h3 className="text-base md:text-xl font-bold mb-2 md:mb-3">{step.title}</h3>
                <p className="text-sm md:text-base text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 md:mt-12">
            <Link href="/category/medical-consent">
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-sm md:text-base">
                Start Your Form Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Preview Section */}
      <section className="py-12 md:py-20 px-4 bg-background">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-balance">
            Frequently Asked Questions About Child Consent Forms
          </h2>

          <div className="space-y-4 md:space-y-6 mb-8 md:mb-12">
            {[
              {
                question: "Who can sign a minor consent form?",
                answer: "Parents or legal guardians can sign minor consent forms to ensure legal validity.",
              },
              {
                question: "Are these forms legally valid?",
                answer: "Yes, our minor consent templates comply with standard legal guidelines.",
              },
              {
                question: "Can I fill these forms online?",
                answer: "Our tool is designed for easy online completion.",
              },
            ].map((faq, idx) => (
              <div key={idx} className="border-l-4 border-indigo-600 pl-4 md:pl-6">
                <h3 className="text-base md:text-lg font-bold mb-2">{faq.question}</h3>
                <p className="text-sm md:text-base text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/faq"
              className="text-indigo-600 hover:text-indigo-700 font-semibold flex items-center justify-center gap-2 text-sm md:text-base"
            >
              View All FAQs
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-12 md:py-16 px-4 bg-card">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">
            Trusted by Parents and Schools Across the Country
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {[
              {
                title: "Safe & Secure",
                description: "Your information is protected.",
                icon: Shield,
              },
              {
                title: "Free & Instant",
                description: "No hidden fees, no delays.",
                icon: CheckCircle2,
              },
              {
                title: "Bright, User-Friendly Interface",
                description: "Designed for parents, teachers, and guardians.",
                icon: FileText,
              },
              {
                title: "Always Updated",
                description: "Templates are regularly reviewed for legal accuracy.",
                icon: FileText,
              },
            ].map((feature, idx) => {
              const Icon = feature.icon
              return (
                <div key={idx} className="flex gap-4">
                  <Icon className="w-6 md:w-8 h-6 md:h-8 text-indigo-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-base md:text-lg font-bold mb-2">{feature.title}</h3>
                    <p className="text-sm md:text-base text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Ready to Protect Your Child?</h2>
          <p className="text-base md:text-lg mb-6 md:mb-8 opacity-90">Generate a minor consent form now – it's free!</p>
          <Link href="/category/medical-consent">
            <Button variant="secondary" size="lg" className="text-sm md:text-base">
              Generate a Minor Consent Form Now
            </Button>
          </Link>
        </div>
      </section>
    </main>
  )
}
