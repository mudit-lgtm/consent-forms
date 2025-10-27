"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface AuthorizationStepProps {
  data: {
    physicianName: string
    physicianPhone: string
    hospitalPreference: string
    treatmentAuthorization: string
    emergencyContactName: string
    emergencyContactPhone: string
    emergencyContactRelationship: string
  }
  onUpdate: (data: any) => void
}

export default function AuthorizationStep({ data, onUpdate }: AuthorizationStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="physicianName">Primary Physician Name *</Label>
        <Input
          id="physicianName"
          placeholder="Dr. Smith"
          value={data.physicianName}
          onChange={(e) => onUpdate({ physicianName: e.target.value })}
          required
        />
      </div>

      <div>
        <Label htmlFor="physicianPhone">Physician Phone Number *</Label>
        <Input
          id="physicianPhone"
          type="tel"
          placeholder="(555) 123-4567"
          value={data.physicianPhone}
          onChange={(e) => onUpdate({ physicianPhone: e.target.value })}
          required
        />
      </div>

      <div>
        <Label htmlFor="hospitalPreference">Preferred Hospital/Clinic</Label>
        <Input
          id="hospitalPreference"
          placeholder="Hospital or clinic name"
          value={data.hospitalPreference}
          onChange={(e) => onUpdate({ hospitalPreference: e.target.value })}
        />
      </div>

      <div>
        <Label htmlFor="treatmentAuthorization">Treatment Authorization *</Label>
        <Textarea
          id="treatmentAuthorization"
          placeholder="Describe what medical treatments you authorize (e.g., routine care, emergency procedures, etc.)"
          value={data.treatmentAuthorization}
          onChange={(e) => onUpdate({ treatmentAuthorization: e.target.value })}
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

      <div>
        <Label htmlFor="emergencyContactRelationship">Emergency Contact Relationship *</Label>
        <Input
          id="emergencyContactRelationship"
          placeholder="e.g., Spouse, Parent, Sibling"
          value={data.emergencyContactRelationship}
          onChange={(e) => onUpdate({ emergencyContactRelationship: e.target.value })}
          required
        />
      </div>
    </div>
  )
}
