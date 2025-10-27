"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ChildInfoMedicalStepProps {
  data: {
    childName: string
    childDateOfBirth: string
    childGender: string
  }
  onUpdate: (data: any) => void
}

export default function ChildInfoMedicalStep({ data, onUpdate }: ChildInfoMedicalStepProps) {
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
        <Label htmlFor="childGender">Gender *</Label>
        <select
          id="childGender"
          value={data.childGender}
          onChange={(e) => onUpdate({ childGender: e.target.value })}
          className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
          required
        >
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
          <option value="prefer-not-to-say">Prefer not to say</option>
        </select>
      </div>
    </div>
  )
}
