import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, CheckCircle, Shield, Clock } from "lucide-react"
import { notFound } from "next/navigation"
import { getTemplateBySlug, getRelatedTemplates } from "@/lib/template-data"
import TemplateForm from "@/components/template-form"

interface TemplatePageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: TemplatePageProps): Promise<Metadata> {
  const { slug } = await params
  const template = getTemplateBySlug(slug)

  if (!template) {
    return {
      title: "Template Not Found",
    }
  }

  return {
    title: `${template.title} | ConsentForms`,
    description: template.metaDescription,
    keywords: template.keywords,
    openGraph: {
      title: template.title,
      description: template.metaDescription,
      type: "website",
    },
  }
}

export default async function TemplatePage({ params }: TemplatePageProps) {
  const { slug } = await params
  const template = getTemplateBySlug(slug)
  const relatedTemplates = getRelatedTemplates(slug)

  if (!template) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section with Gradient */}
      <section className="bg-gradient-to-br from-indigo-600 via-indigo-500 to-purple-600 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <Link
            href={`/category/${template.category}`}
            className="inline-flex items-center gap-2 text-white hover:opacity-80 transition mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Category
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-balance">{template.title}</h1>
          <p className="text-xl text-white/90 text-balance mb-8">{template.description}</p>

          {/* Trust Factors */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="flex items-center gap-3 text-white">
              <Shield className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm">SSL Secure & Encrypted</span>
            </div>
            <div className="flex items-center gap-3 text-white">
              <Clock className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm">24/7 Customer Support</span>
            </div>
            <div className="flex items-center gap-3 text-white">
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm">US Government Compliant</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 bg-card">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-600 text-white font-bold text-xl mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold mb-2">Choose Your State</h3>
              <p className="text-muted-foreground">
                Select your state to get a form that complies with local laws and regulations
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-600 text-white font-bold text-xl mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold mb-2">Answer Simple Questions</h3>
              <p className="text-muted-foreground">
                Fill in your information and your child's details in our easy-to-use form
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-600 text-white font-bold text-xl mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold mb-2">Download Your Document</h3>
              <p className="text-muted-foreground">
                Get your completed form in PDF or Word format, ready to print and sign
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-12 px-4 bg-background">
        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-foreground leading-relaxed">{template.intro}</p>
        </div>
      </section>

      {/* When You Need This Form */}
      <section className="py-16 px-4 bg-card">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">When You Need a {template.title}</h2>
          <div className="space-y-4">
            <p className="text-foreground leading-relaxed">
              A {template.title.toLowerCase()} is essential in several situations where your child will be away from
              your direct supervision. Understanding when to use this form helps protect your child and ensures proper
              authorization for care.
            </p>
            <ul className="space-y-3 text-foreground">
              <li className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                <span>When your child is traveling with another adult or guardian</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                <span>For school-approved trips and educational programs</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                <span>When attending camps or overnight programs</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                <span>For airline and travel company requirements</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* What to Include */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">What to Include in Your Form</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Parent/Guardian Information</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Full legal name</li>
                <li>• Contact phone number</li>
                <li>• Email address</li>
                <li>• Relationship to child</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Child Information</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Full legal name</li>
                <li>• Date of birth</li>
                <li>• Physical description</li>
                <li>• Identifying information</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Medical Information</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Known allergies</li>
                <li>• Current medications</li>
                <li>• Medical conditions</li>
                <li>• Insurance information</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Authorization Details</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Travel dates and destinations</li>
                <li>• Supervising adult information</li>
                <li>• Emergency contacts</li>
                <li>• Scope of authorization</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* US Government Requirements */}
      <section className="py-16 px-4 bg-card">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">US Government Requirements for Minors</h2>
          <div className="space-y-6">
            <div className="border-l-4 border-indigo-600 pl-6">
              <h3 className="text-xl font-bold mb-2">Passport Requirements</h3>
              <p className="text-muted-foreground mb-3">
                All children traveling internationally must have a valid U.S. passport. Learn more at the{" "}
                <a
                  href="https://travel.state.gov/content/travel/en/passports.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:underline"
                >
                  U.S. State Department Passport Services
                </a>
              </p>
            </div>
            <div className="border-l-4 border-indigo-600 pl-6">
              <h3 className="text-xl font-bold mb-2">Notarization Requirements</h3>
              <p className="text-muted-foreground mb-3">
                Many countries require notarized consent forms. Check with your destination country's embassy or
                consulate for specific requirements. Visit{" "}
                <a
                  href="https://www.state.gov/embassies-consulates/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:underline"
                >
                  U.S. State Department Embassies & Consulates
                </a>
              </p>
            </div>
            <div className="border-l-4 border-indigo-600 pl-6">
              <h3 className="text-xl font-bold mb-2">Custody & Legal Authority</h3>
              <p className="text-muted-foreground mb-3">
                Only individuals with legal custody or guardianship can authorize travel. If there are custody disputes,
                consult with an attorney. Learn more at the{" "}
                <a
                  href="https://www.justice.gov/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:underline"
                >
                  U.S. Department of Justice
                </a>
              </p>
            </div>
            <div className="border-l-4 border-indigo-600 pl-6">
              <h3 className="text-xl font-bold mb-2">Airline Requirements</h3>
              <p className="text-muted-foreground">
                Airlines have specific policies for unaccompanied minors. Contact your airline directly for their
                requirements and procedures.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Travel Scenarios */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Travel Scenarios and What to Prepare</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold mb-3">If a Child is Traveling Alone</h3>
              <p className="text-muted-foreground mb-3">
                When a child travels alone, airlines require an unaccompanied minor form. The child must be at least 5
                years old for most airlines. Ensure the child has:
              </p>
              <ul className="space-y-2 text-muted-foreground ml-4">
                <li>• Valid ID or passport</li>
                <li>• Notarized consent form</li>
                <li>• Emergency contact information</li>
                <li>• Medical information</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-3">If a Child is Traveling With One Parent</h3>
              <p className="text-muted-foreground mb-3">
                When a child travels with only one parent, some countries may require a notarized consent form from the
                other parent. This prevents parental abduction. Prepare:
              </p>
              <ul className="space-y-2 text-muted-foreground ml-4">
                <li>• Notarized consent from the non-traveling parent</li>
                <li>• Birth certificate showing both parents</li>
                <li>• Custody documentation if applicable</li>
                <li>• Passport for the child</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-3">If a Child is Traveling With Another Adult</h3>
              <p className="text-muted-foreground mb-3">
                When a child travels with an adult who is not a parent, a notarized consent form from both parents is
                typically required. Include:
              </p>
              <ul className="space-y-2 text-muted-foreground ml-4">
                <li>• Notarized consent from both parents</li>
                <li>• Relationship of the traveling adult to the child</li>
                <li>• Contact information for both parents</li>
                <li>• Medical authorization for the traveling adult</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-3">If a Legal Guardian is Traveling With the Child</h3>
              <p className="text-muted-foreground mb-3">
                When a legal guardian travels with a child, guardianship documentation must be provided. Ensure you
                have:
              </p>
              <ul className="space-y-2 text-muted-foreground ml-4">
                <li>• Court-issued guardianship papers</li>
                <li>• Notarized consent from parents if required</li>
                <li>• Proof of guardianship status</li>
                <li>• Medical authorization documents</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Notarization Section */}
      <section className="py-16 px-4 bg-card">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Does a Child Travel Consent Form Need to be Notarized?</h2>
          <div className="space-y-4 text-foreground">
            <p>
              Whether a consent form needs to be notarized depends on several factors, including the destination country
              and the specific circumstances of the travel.
            </p>
            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6">
              <h3 className="font-bold mb-2">When Notarization is Required:</h3>
              <ul className="space-y-2 text-sm">
                <li>• International travel, especially to countries with strict child protection laws</li>
                <li>• Travel with only one parent or a non-parent adult</li>
                <li>• Custody disputes or complex family situations</li>
                <li>• Travel to countries that specifically require notarized documents</li>
              </ul>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
              <h3 className="font-bold mb-2">When Notarization May Not Be Required:</h3>
              <ul className="space-y-2 text-sm">
                <li>• Domestic travel within the United States</li>
                <li>• Travel with both parents</li>
                <li>• School-approved field trips</li>
                <li>• Some airline policies for unaccompanied minors</li>
              </ul>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              <strong>Recommendation:</strong> When in doubt, have your consent form notarized. It provides additional
              legal protection and is accepted in all situations.
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Create Your {template.title}</h2>
          <TemplateForm template={template} />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-card">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {template.faqItems.map((item, idx) => (
              <div key={idx} className="border border-border rounded-lg p-6 hover:shadow-md transition">
                <h3 className="text-lg font-bold mb-3 text-indigo-600">{item.question}</h3>
                <p className="text-muted-foreground">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Templates Section */}
      {relatedTemplates.length > 0 && (
        <section className="py-16 px-4 bg-background">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12">Related Templates</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedTemplates.map((relatedTemplate) => (
                <Card key={relatedTemplate.slug} className="p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-lg font-bold mb-2">{relatedTemplate.title}</h3>
                  <p className="text-muted-foreground text-sm mb-6">{relatedTemplate.description}</p>
                  <Link href={`/templates/${relatedTemplate.slug}`}>
                    <Button className="w-full bg-indigo-600 hover:bg-indigo-700">View Template</Button>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
