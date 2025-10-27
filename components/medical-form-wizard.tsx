"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"
import ParentInfoMedicalStep from "./medical-form-steps/parent-info-medical-step"
import ChildInfoMedicalStep from "./medical-form-steps/child-info-medical-step"
import MedicalHistoryStep from "./medical-form-steps/medical-history-step"
import AuthorizationStep from "./medical-form-steps/authorization-step"
import ReviewMedicalStep from "./medical-form-steps/review-medical-step"

interface MedicalFormData {
  parentName: string
  parentEmail: string
  parentPhone: string
  parentRelationship: string
  childName: string
  childDateOfBirth: string
  childGender: string
  medicalConditions: string
  surgeries: string
  medications: string
  allergies: string
  vaccinations: string
  insuranceProvider: string
  insurancePolicyNumber: string
  physicianName: string
  physicianPhone: string
  hospitalPreference: string
  treatmentAuthorization: string
  emergencyContactName: string
  emergencyContactPhone: string
  emergencyContactRelationship: string
}

const steps = [
  { id: 1, title: "Parent Information", description: "Your details" },
  { id: 2, title: "Child Information", description: "Child details" },
  { id: 3, title: "Medical History", description: "Health information" },
  { id: 4, title: "Authorization", description: "Medical authorization" },
  { id: 5, title: "Review", description: "Confirm details" },
]

export default function MedicalFormWizard({ onComplete }: { onComplete: (data: MedicalFormData) => void }) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<MedicalFormData>({
    parentName: "",
    parentEmail: "",
    parentPhone: "",
    parentRelationship: "",
    childName: "",
    childDateOfBirth: "",
    childGender: "",
    medicalConditions: "",
    surgeries: "",
    medications: "",
    allergies: "",
    vaccinations: "",
    insuranceProvider: "",
    insurancePolicyNumber: "",
    physicianName: "",
    physicianPhone: "",
    hospitalPreference: "",
    treatmentAuthorization: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    emergencyContactRelationship: "",
  })

  const updateFormData = (data: Partial<MedicalFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    onComplete(formData)
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <ParentInfoMedicalStep data={formData} onUpdate={updateFormData} />
      case 2:
        return <ChildInfoMedicalStep data={formData} onUpdate={updateFormData} />
      case 3:
        return <MedicalHistoryStep data={formData} onUpdate={updateFormData} />
      case 4:
        return <AuthorizationStep data={formData} onUpdate={updateFormData} />
      case 5:
        return <ReviewMedicalStep data={formData} />
      default:
        return null
    }
  }

  return (
    <div className="space-y-8">
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="font-medium">
            Step {currentStep} of {steps.length}
          </span>
          <span className="text-muted-foreground">{steps[currentStep - 1].title}</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Step Indicators */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {steps.map((step) => (
          <button
            key={step.id}
            onClick={() => setCurrentStep(step.id)}
            className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              currentStep === step.id
                ? "bg-primary text-primary-foreground"
                : currentStep > step.id
                  ? "bg-primary/20 text-primary"
                  : "bg-muted text-muted-foreground"
            }`}
          >
            {step.id}
          </button>
        ))}
      </div>

      {/* Form Content */}
      <Card className="p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">{steps[currentStep - 1].title}</h2>
          <p className="text-muted-foreground">{steps[currentStep - 1].description}</p>
        </div>

        {renderStep()}
      </Card>

      {/* Navigation Buttons */}
      <div className="flex gap-4 justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 1}
          className="gap-2 bg-transparent"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Button>

        {currentStep === steps.length ? (
          <Button onClick={handleSubmit} className="gap-2">
            Complete Form
            <ChevronRight className="w-4 h-4" />
          </Button>
        ) : (
          <Button onClick={handleNext} className="gap-2">
            Next
            <ChevronRight className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
