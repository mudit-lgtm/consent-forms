"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"
import ParentInfoStep from "./travel-form-steps/parent-info-step"
import ChildInfoStep from "./travel-form-steps/child-info-step"
import TravelDetailsStep from "./travel-form-steps/travel-details-step"
import MedicalInfoStep from "./travel-form-steps/medical-info-step"
import ReviewStep from "./travel-form-steps/review-step"

interface FormData {
  parentName: string
  parentEmail: string
  parentPhone: string
  parentAddress: string
  childName: string
  childDateOfBirth: string
  childPassportNumber: string
  travelDestination: string
  travelStartDate: string
  travelEndDate: string
  travelPurpose: string
  supervisorName: string
  supervisorPhone: string
  medicalConditions: string
  medications: string
  allergies: string
  emergencyContactName: string
  emergencyContactPhone: string
}

const steps = [
  { id: 1, title: "Parent Information", description: "Your details" },
  { id: 2, title: "Child Information", description: "Child details" },
  { id: 3, title: "Travel Details", description: "Trip information" },
  { id: 4, title: "Medical Information", description: "Health & emergency" },
  { id: 5, title: "Review", description: "Confirm details" },
]

export default function TravelFormWizard({ onComplete }: { onComplete: (data: FormData) => void }) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    parentName: "",
    parentEmail: "",
    parentPhone: "",
    parentAddress: "",
    childName: "",
    childDateOfBirth: "",
    childPassportNumber: "",
    travelDestination: "",
    travelStartDate: "",
    travelEndDate: "",
    travelPurpose: "",
    supervisorName: "",
    supervisorPhone: "",
    medicalConditions: "",
    medications: "",
    allergies: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
  })

  const updateFormData = (data: Partial<FormData>) => {
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
        return <ParentInfoStep data={formData} onUpdate={updateFormData} />
      case 2:
        return <ChildInfoStep data={formData} onUpdate={updateFormData} />
      case 3:
        return <TravelDetailsStep data={formData} onUpdate={updateFormData} />
      case 4:
        return <MedicalInfoStep data={formData} onUpdate={updateFormData} />
      case 5:
        return <ReviewStep data={formData} />
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
