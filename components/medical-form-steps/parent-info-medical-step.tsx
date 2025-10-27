"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ParentInfoMedicalStepProps {
  data: {
    parentName: string
    parentEmail: string
    parentPhone: string
    parentRelationship: string
  }
  onUpdate: (data: any) => void
}

export default function ParentInfoMedicalStep({ data, onUpdate }: ParentInfoMedicalStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="parentName">Full Name *</Label>
        <Input
          id="parentName"
          placeholder="John Doe"
          value={data.parentName}
          onChange={(e) => onUpdate({ parentName: e.target.value })}
          required
        />
      </div>

      <div>
        <Label htmlFor="parentRelationship">Relationship to Child *</Label>
        <Input
          id="parentRelationship"
          placeholder="e.g., Parent, Guardian, Grandparent"
          value={data.parentRelationship}
          onChange={(e) => onUpdate({ parentRelationship: e.target.value })}
          required
        />
      </div>

      <div>
        <Label htmlFor="parentEmail">Email Address *</Label>
        <Input
          id="parentEmail"
          type="email"
          placeholder="john@example.com"
          value={data.parentEmail}
          onChange={(e) => onUpdate({ parentEmail: e.target.value })}
          required
        />
      </div>

      <div>
        <Label htmlFor="parentPhone">Phone Number *</Label>
        <Input
          id="parentPhone"
          type="tel"
          placeholder="(555) 123-4567"
          value={data.parentPhone}
          onChange={(e) => onUpdate({ parentPhone: e.target.value })}
          required
        />
      </div>
    </div>
  )
}
