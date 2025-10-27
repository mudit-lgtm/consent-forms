"use client"

import { Card } from "@/components/ui/card"

interface ReviewMedicalStepProps {
  data: {
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
}

export default function ReviewMedicalStep({ data }: ReviewMedicalStepProps) {
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
              <p className="text-muted-foreground">Relationship</p>
              <p className="font-medium">{data.parentRelationship}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Email</p>
              <p className="font-medium">{data.parentEmail}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Phone</p>
              <p className="font-medium">{data.parentPhone}</p>
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
            <div>
              <p className="text-muted-foreground">Gender</p>
              <p className="font-medium capitalize">{data.childGender}</p>
            </div>
          </div>
        </Card>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Medical History</h3>
        <Card className="p-4 bg-muted/50">
          <div className="space-y-3 text-sm">
            {data.medicalConditions && (
              <div>
                <p className="text-muted-foreground">Medical Conditions</p>
                <p className="font-medium">{data.medicalConditions}</p>
              </div>
            )}
            {data.surgeries && (
              <div>
                <p className="text-muted-foreground">Previous Surgeries</p>
                <p className="font-medium">{data.surgeries}</p>
              </div>
            )}
            <div>
              <p className="text-muted-foreground">Current Medications</p>
              <p className="font-medium">{data.medications}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Allergies</p>
              <p className="font-medium">{data.allergies}</p>
            </div>
            {data.vaccinations && (
              <div>
                <p className="text-muted-foreground">Vaccination Status</p>
                <p className="font-medium">{data.vaccinations}</p>
              </div>
            )}
            {data.insuranceProvider && (
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-muted-foreground">Insurance Provider</p>
                  <p className="font-medium">{data.insuranceProvider}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Policy Number</p>
                  <p className="font-medium">{data.insurancePolicyNumber}</p>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Medical Authorization</h3>
        <Card className="p-4 bg-muted/50">
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-muted-foreground">Primary Physician</p>
              <p className="font-medium">{data.physicianName}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Physician Phone</p>
              <p className="font-medium">{data.physicianPhone}</p>
            </div>
            {data.hospitalPreference && (
              <div>
                <p className="text-muted-foreground">Preferred Hospital/Clinic</p>
                <p className="font-medium">{data.hospitalPreference}</p>
              </div>
            )}
            <div>
              <p className="text-muted-foreground">Treatment Authorization</p>
              <p className="font-medium">{data.treatmentAuthorization}</p>
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
            <div>
              <p className="text-muted-foreground">Emergency Contact Relationship</p>
              <p className="font-medium">{data.emergencyContactRelationship}</p>
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
