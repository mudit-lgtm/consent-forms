"use client"

import { Card } from "@/components/ui/card"

interface ReviewStepProps {
  data: {
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
}

export default function ReviewStep({ data }: ReviewStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Parent Information</h3>
        <Card className="p-4 bg-muted/50">
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Name</p>
              <p className="font-medium">{data.parentName}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Email</p>
              <p className="font-medium">{data.parentEmail}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Phone</p>
              <p className="font-medium">{data.parentPhone}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Address</p>
              <p className="font-medium">{data.parentAddress}</p>
            </div>
          </div>
        </Card>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Child Information</h3>
        <Card className="p-4 bg-muted/50">
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Name</p>
              <p className="font-medium">{data.childName}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Date of Birth</p>
              <p className="font-medium">{data.childDateOfBirth}</p>
            </div>
            {data.childPassportNumber && (
              <div>
                <p className="text-muted-foreground">Passport Number</p>
                <p className="font-medium">{data.childPassportNumber}</p>
              </div>
            )}
          </div>
        </Card>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Travel Details</h3>
        <Card className="p-4 bg-muted/50">
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-muted-foreground">Destination</p>
              <p className="font-medium">{data.travelDestination}</p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-muted-foreground">Start Date</p>
                <p className="font-medium">{data.travelStartDate}</p>
              </div>
              <div>
                <p className="text-muted-foreground">End Date</p>
                <p className="font-medium">{data.travelEndDate}</p>
              </div>
            </div>
            <div>
              <p className="text-muted-foreground">Purpose</p>
              <p className="font-medium">{data.travelPurpose}</p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-muted-foreground">Supervisor</p>
                <p className="font-medium">{data.supervisorName}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Supervisor Phone</p>
                <p className="font-medium">{data.supervisorPhone}</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Medical Information</h3>
        <Card className="p-4 bg-muted/50">
          <div className="space-y-3 text-sm">
            {data.medicalConditions && (
              <div>
                <p className="text-muted-foreground">Medical Conditions</p>
                <p className="font-medium">{data.medicalConditions}</p>
              </div>
            )}
            {data.medications && (
              <div>
                <p className="text-muted-foreground">Medications</p>
                <p className="font-medium">{data.medications}</p>
              </div>
            )}
            <div>
              <p className="text-muted-foreground">Allergies</p>
              <p className="font-medium">{data.allergies}</p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-muted-foreground">Emergency Contact</p>
                <p className="font-medium">{data.emergencyContactName}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Emergency Phone</p>
                <p className="font-medium">{data.emergencyContactPhone}</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <p className="text-sm text-blue-900 dark:text-blue-100">
          Please review all information carefully. You can go back to edit any section before submitting.
        </p>
      </div>
    </div>
  )
}
