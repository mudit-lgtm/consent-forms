"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface MedicalInfoStepProps {
  data: {
    medicalConditions: string
    medications: string
    allergies: string
    emergencyContactName: string
    emergencyContactPhone: string
  }
  onUpdate: (data: any) => void
}

export default function MedicalInfoStep({ data, onUpdate }: MedicalInfoStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="medicalConditions">Medical Conditions</Label>
        <Textarea
          id="medicalConditions"
          placeholder="e.g., Asthma, diabetes, etc. (leave blank if none)"
          value={data.medicalConditions}
          onChange={(e) => onUpdate({ medicalConditions: e.target.value })}
        />
      </div>

      <div>
        <Label htmlFor="medications">Current Medications</Label>
        <Textarea
          id="medications"
          placeholder="List any medications and dosages (leave blank if none)"
          value={data.medications}
          onChange={(e) => onUpdate({ medications: e.target.value })}
        />
      </div>

      <div>
        <Label htmlFor="allergies">Allergies *</Label>
        <Textarea
          id="allergies"
          placeholder="Food, medication, environmental allergies (or 'None')"
          value={data.allergies}
          onChange={(e) => onUpdate({ allergies: e.target.value })}
          required
        />
      </div>

      <div>
        <Label htmlFor="emergencyContactName">Emergency Contact Name *</Label>
        <Input
          id="emergencyContactName"
          placeholder="Name of emergency contact"
          value={data.emergencyContactName}
          onChange={(e) => onUpdate({ emergencyContactName: e.target.value })}
          required
        />
      </div>

      <div>
        <Label htmlFor="emergencyContactPhone">Emergency Contact Phone *</Label>
        <Input
          id="emergencyContactPhone"
          type="tel"
          placeholder="(555) 123-4567"
          value={data.emergencyContactPhone}
          onChange={(e) => onUpdate({ emergencyContactPhone: e.target.value })}
          required
        />
      </div>
    </div>
  )
}
