"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import TravelFormWizard from "@/components/travel-form-wizard"
import { Download } from "lucide-react"

export default function TravelFormPage() {
  const [isComplete, setIsComplete] = useState(false)
  const [formData, setFormData] = useState(null)

  const handleFormComplete = (data: any) => {
    setFormData(data)
    setIsComplete(true)
  }

  const handleDownloadPDF = async () => {
    if (!formData) return

    try {
      const response = await fetch("/api/generate-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "travel",
          data: formData,
        }),
      })

      if (!response.ok) throw new Error("Failed to generate PDF")

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "travel-consent-form.pdf"
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error("Error downloading PDF:", error)
      alert("Failed to download PDF. Please try again.")
    }
  }

  if (isComplete) {
    return (
      <main className="min-h-screen bg-background">
        <nav className="border-b border-border bg-card">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-primary">
              ConsentForms
            </Link>
          </div>
        </nav>

        <div className="max-w-2xl mx-auto px-4 py-16">
          <Card className="p-8 text-center">
            <div className="text-5xl mb-4">✓</div>
            <h1 className="text-3xl font-bold mb-4">Form Complete!</h1>
            <p className="text-muted-foreground mb-8">
              Your travel consent form has been created successfully. Download it now and print to sign.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/">
                <Button variant="outline">Back to Home</Button>
              </Link>
              <Button onClick={handleDownloadPDF} className="gap-2">
                <Download className="w-4 h-4" />
                Download PDF
              </Button>
            </div>
          </Card>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <nav className="border-b border-border bg-card">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            ConsentForms
          </Link>
          <Link href="/" className="text-foreground hover:text-primary transition">
            Back to Home
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <TravelFormWizard onComplete={handleFormComplete} />
      </div>
    </main>
  )
}
