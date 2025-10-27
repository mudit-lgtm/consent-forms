"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface TravelDetailsStepProps {
  data: {
    travelDestination: string
    travelStartDate: string
    travelEndDate: string
    travelPurpose: string
    supervisorName: string
    supervisorPhone: string
  }
  onUpdate: (data: any) => void
}

export default function TravelDetailsStep({ data, onUpdate }: TravelDetailsStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="travelDestination">Destination(s) *</Label>
        <Input
          id="travelDestination"
          placeholder="e.g., New York, USA"
          value={data.travelDestination}
          onChange={(e) => onUpdate({ travelDestination: e.target.value })}
          required
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="travelStartDate">Start Date *</Label>
          <Input
            id="travelStartDate"
            type="date"
            value={data.travelStartDate}
            onChange={(e) => onUpdate({ travelStartDate: e.target.value })}
            required
          />
        </div>

        <div>
          <Label htmlFor="travelEndDate">End Date *</Label>
          <Input
            id="travelEndDate"
            type="date"
            value={data.travelEndDate}
            onChange={(e) => onUpdate({ travelEndDate: e.target.value })}
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="travelPurpose">Purpose of Travel *</Label>
        <Textarea
          id="travelPurpose"
          placeholder="e.g., School trip, family vacation, sports competition"
          value={data.travelPurpose}
          onChange={(e) => onUpdate({ travelPurpose: e.target.value })}
          required
        />
      </div>

      <div>
        <Label htmlFor="supervisorName">Supervisor/Chaperone Name *</Label>
        <Input
          id="supervisorName"
          placeholder="Name of adult supervising the child"
          value={data.supervisorName}
          onChange={(e) => onUpdate({ supervisorName: e.target.value })}
          required
        />
      </div>

      <div>
        <Label htmlFor="supervisorPhone">Supervisor Phone Number *</Label>
        <Input
          id="supervisorPhone"
          type="tel"
          placeholder="(555) 123-4567"
          value={data.supervisorPhone}
          onChange={(e) => onUpdate({ supervisorPhone: e.target.value })}
          required
        />
      </div>
    </div>
  )
}
