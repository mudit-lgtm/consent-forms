"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { FileText } from "lucide-react"
import type { TemplateData } from "@/lib/template-data"
import { generateAndDownloadPDF } from "@/lib/pdf-utils"
import DownloadOptions from "@/components/download-options"

interface TemplateFormProps {
  template: TemplateData
}

export default function TemplateForm({ template }: TemplateFormProps) {
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [showPreview, setShowPreview] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleDownloadPDF = async () => {
    setIsDownloading(true)
    try {
      await generateAndDownloadPDF(template, formData, `${template.slug}.pdf`)
    } catch (error) {
      console.error("Error generating PDF:", error)
      alert("Failed to generate PDF. Please try again.")
    } finally {
      setIsDownloading(false)
    }
  }

  const requiredFields = template.formFields.filter((f) => f.required)
  const filledRequiredFields = requiredFields.filter((f) => formData[f.name])
  const isFormValid = filledRequiredFields.length === requiredFields.length

  return (
    <div className="space-y-8">
      {/* Form Fields */}
      <Card className="p-8">
        <form className="space-y-6">
          {template.formFields.map((field) => (
            <div key={field.name} className="space-y-2">
              <Label htmlFor={field.name}>
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </Label>
              {field.type === "textarea" ? (
                <Textarea
                  id={field.name}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={formData[field.name] || ""}
                  onChange={handleInputChange}
                  required={field.required}
                  className="min-h-24"
                />
              ) : field.type === "select" ? (
                <select
                  id={field.name}
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleInputChange}
                  required={field.required}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select an option</option>
                  {field.options?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <Input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={formData[field.name] || ""}
                  onChange={handleInputChange}
                  required={field.required}
                />
              )}
            </div>
          ))}
        </form>
      </Card>

      <DownloadOptions
        template={template}
        formData={formData}
        isFormValid={isFormValid}
        onDownloadPDF={handleDownloadPDF}
      />

      {/* Validation Message */}
      {!isFormValid && (
        <Card className="p-4 bg-amber-50 border-amber-200">
          <p className="text-sm text-amber-800">
            Please fill in all required fields ({filledRequiredFields.length}/{requiredFields.length}) to download the
            form.
          </p>
        </Card>
      )}

      {/* Preview Section */}
      {showPreview && (
        <Card className="p-8 bg-white text-black border-2 border-indigo-200">
          <div className="flex items-center gap-2 mb-6">
            <FileText className="w-5 h-5 text-indigo-600" />
            <h3 className="text-2xl font-bold text-indigo-600">{template.title}</h3>
          </div>

          <div className="space-y-4">
            {template.formFields.map((field) => {
              const value = formData[field.name]
              if (!value) return null
              return (
                <div key={field.name} className="border-b border-gray-200 pb-3">
                  <p className="font-semibold text-sm text-gray-600">{field.label}</p>
                  <p className="text-gray-900 whitespace-pre-wrap">{value}</p>
                </div>
              )
            })}
          </div>

          <div className="mt-8 pt-8 border-t-2 border-gray-300">
            <p className="text-sm text-gray-600 mb-6">Signature: _________________________ Date: _________</p>
            <p className="text-sm text-gray-600">Printed Name: _____________________________________</p>
          </div>
        </Card>
      )}
    </div>
  )
}
