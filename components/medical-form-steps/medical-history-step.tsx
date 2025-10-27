"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface MedicalHistoryStepProps {
  data: {
    medicalConditions: string
    surgeries: string
    medications: string
    allergies: string
    vaccinations: string
    insuranceProvider: string
    insurancePolicyNumber: string
  }
  onUpdate: (data: any) => void
}

export default function MedicalHistoryStep({ data, onUpdate }: MedicalHistoryStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="medicalConditions">Medical Conditions</Label>
        <Textarea
          id="medicalConditions"
          placeholder="e.g., Asthma, diabetes, heart condition (leave blank if none)"
          value={data.medicalConditions}
          onChange={(e) => onUpdate({ medicalConditions: e.target.value })}
        />
      </div>

      <div>
        <Label htmlFor="surgeries">Previous Surgeries</Label>
        <Textarea
          id="surgeries"
          placeholder="List any surgeries and dates (leave blank if none)"
          value={data.surgeries}
          onChange={(e) => onUpdate({ surgeries: e.target.value })}
        />
      </div>

      <div>
        <Label htmlFor="medications">Current Medications *</Label>
        <Textarea
          id="medications"
          placeholder="List medications, dosages, and frequency (or 'None')"
          value={data.medications}
          onChange={(e) => onUpdate({ medications: e.target.value })}
          required
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
        <Label htmlFor="vaccinations">Vaccination Status</Label>
        <Textarea
          id="vaccinations"
          placeholder="e.g., Up to date, missing vaccines, dates of recent vaccinations"
          value={data.vaccinations}
          onChange={(e) => onUpdate({ vaccinations: e.target.value })}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="insuranceProvider">Insurance Provider</Label>
          <Input
            id="insuranceProvider"
            placeholder="e.g., Blue Cross, Aetna"
            value={data.insuranceProvider}
            onChange={(e) => onUpdate({ insuranceProvider: e.target.value })}
          />
        </div>

        <div>
          <Label htmlFor="insurancePolicyNumber">Policy Number</Label>
          <Input
            id="insurancePolicyNumber"
            placeholder="Insurance policy number"
            value={data.insurancePolicyNumber}
            onChange={(e) => onUpdate({ insurancePolicyNumber: e.target.value })}
          />
        </div>
      </div>
    </div>
  )
}
