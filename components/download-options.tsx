"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Download, FileText, Printer } from "lucide-react"
import type { TemplateData } from "@/lib/template-data"

interface DownloadOptionsProps {
  template: TemplateData
  formData: Record<string, string>
  isFormValid: boolean
  onDownloadPDF: () => Promise<void>
}

export default function DownloadOptions({ template, formData, isFormValid, onDownloadPDF }: DownloadOptionsProps) {
  const handleDownloadHTML = () => {
    const htmlContent = generatePrintableHTML(template, formData)
    const blob = new Blob([htmlContent], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${template.slug}-printable.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleDownloadText = () => {
    const textContent = generatePlainText(template, formData)
    const blob = new Blob([textContent], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${template.slug}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handlePrint = () => {
    const printWindow = window.open("", "", "height=600,width=800")
    if (printWindow) {
      printWindow.document.write(generatePrintableHTML(template, formData))
      printWindow.document.close()
      printWindow.print()
    }
  }

  return (
    <Card className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-indigo-900">Download Your Form</h3>
        <p className="text-sm text-indigo-800">Choose your preferred format to download or print your consent form.</p>

        <div className="grid md:grid-cols-3 gap-4">
          {/* PDF Download */}
          <Button
            onClick={onDownloadPDF}
            disabled={!isFormValid}
            className="gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed h-auto py-4 flex-col"
          >
            <Download className="w-5 h-5" />
            <span className="text-sm">Download PDF</span>
            <span className="text-xs opacity-90">Professional format</span>
          </Button>

          {/* Printable HTML */}
          <Button
            onClick={handleDownloadHTML}
            disabled={!isFormValid}
            variant="outline"
            className="gap-2 disabled:opacity-50 disabled:cursor-not-allowed h-auto py-4 flex-col bg-transparent"
          >
            <FileText className="w-5 h-5" />
            <span className="text-sm">Download HTML</span>
            <span className="text-xs opacity-90">Printable version</span>
          </Button>

          {/* Print */}
          <Button
            onClick={handlePrint}
            disabled={!isFormValid}
            variant="outline"
            className="gap-2 disabled:opacity-50 disabled:cursor-not-allowed h-auto py-4 flex-col bg-transparent"
          >
            <Printer className="w-5 h-5" />
            <span className="text-sm">Print Form</span>
            <span className="text-xs opacity-90">Direct print</span>
          </Button>
        </div>

        {/* Plain Text Option */}
        <div className="pt-2">
          <Button
            onClick={handleDownloadText}
            disabled={!isFormValid}
            variant="ghost"
            className="w-full gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="w-4 h-4" />
            Download as Plain Text
          </Button>
        </div>
      </div>
    </Card>
  )
}

function generatePrintableHTML(template: TemplateData, formData: Record<string, string>): string {
  const fieldsHTML = template.formFields
    .map(
      (field) => `
    <div style="margin-bottom: 20px; page-break-inside: avoid;">
      <label style="font-weight: bold; color: #333; display: block; margin-bottom: 5px;">${field.label}</label>
      <p style="color: #666; margin: 0; padding: 8px; border-bottom: 1px solid #ddd; min-height: 20px;">
        ${formData[field.name] || ""}
      </p>
    </div>
  `,
    )
    .join("")

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>${template.title}</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 8.5in;
          margin: 0.5in auto;
          padding: 0;
        }
        h1 {
          color: #4F46E5;
          border-bottom: 3px solid #4F46E5;
          padding-bottom: 10px;
          margin-bottom: 30px;
        }
        .form-section {
          margin-bottom: 30px;
        }
        .signature-section {
          margin-top: 40px;
          padding-top: 20px;
          border-top: 2px solid #333;
        }
        .signature-line {
          display: inline-block;
          width: 200px;
          border-bottom: 1px solid #333;
          margin-right: 40px;
        }
        @media print {
          body { margin: 0; }
          h1 { page-break-after: avoid; }
        }
      </style>
    </head>
    <body>
      <h1>${template.title}</h1>
      <div class="form-section">
        ${fieldsHTML}
      </div>
      <div class="signature-section">
        <p><strong>Signature:</strong> <span class="signature-line"></span> <strong>Date:</strong> <span class="signature-line"></span></p>
        <p><strong>Printed Name:</strong> <span class="signature-line"></span></p>
      </div>
    </body>
    </html>
  `
}

function generatePlainText(template: TemplateData, formData: Record<string, string>): string {
  const lines = [
    template.title.toUpperCase(),
    "=".repeat(template.title.length),
    "",
    ...template.formFields.map((field) => `${field.label}:\n${formData[field.name] || ""}`),
    "",
    "Signature: _________________________ Date: _________",
    "Printed Name: _____________________________________",
  ]
  return lines.join("\n")
}
