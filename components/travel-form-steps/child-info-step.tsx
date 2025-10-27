"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ChildInfoStepProps {
  data: {
    childName: string
    childDateOfBirth: string
    childPassportNumber: string
  }
  onUpdate: (data: any) => void
}

export default function ChildInfoStep({ data, onUpdate }: ChildInfoStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="childName">Child's Full Name *</Label>
        <Input
          id="childName"
          placeholder="Jane Doe"
          value={data.childName}
          onChange={(e) => onUpdate({ childName: e.target.value })}
          required
        />
      </div>

      <div>
        <Label htmlFor="childDateOfBirth">Date of Birth *</Label>
        <Input
          id="childDateOfBirth"
          type="date"
          value={data.childDateOfBirth}
          onChange={(e) => onUpdate({ childDateOfBirth: e.target.value })}
          required
        />
      </div>

      <div>
        <Label htmlFor="childPassportNumber">Passport Number (if applicable)</Label>
        <Input
          id="childPassportNumber"
          placeholder="ABC123456"
          value={data.childPassportNumber}
          onChange={(e) => onUpdate({ childPassportNumber: e.target.value })}
        />
      </div>
    </div>
  )
}
