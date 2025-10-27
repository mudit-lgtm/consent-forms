import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { type, data } = await request.json()

    if (type === "travel") {
      return generateTravelPDF(data)
    } else if (type === "medical") {
      return generateMedicalPDF(data)
    }

    return NextResponse.json({ error: "Invalid form type" }, { status: 400 })
  } catch (error) {
    console.error("PDF generation error:", error)
    return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 })
  }
}

function generateTravelPDF(data: any) {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Travel Consent Form</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
        h1 { text-align: center; color: #333; }
        h2 { color: #555; margin-top: 30px; border-bottom: 2px solid #ddd; padding-bottom: 10px; }
        .section { margin-bottom: 20px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #333; }
        .value { color: #666; margin-top: 5px; }
        .signature-line { border-top: 1px solid #000; width: 200px; margin-top: 30px; }
        .date-line { margin-top: 10px; }
      </style>
    </head>
    <body>
      <h1>CHILD TRAVEL CONSENT FORM</h1>
      
      <h2>Parent/Guardian Information</h2>
      <div class="section">
        <div class="field">
          <div class="label">Name:</div>
          <div class="value">${data.parentName}</div>
        </div>
        <div class="field">
          <div class="label">Email:</div>
          <div class="value">${data.parentEmail}</div>
        </div>
        <div class="field">
          <div class="label">Phone:</div>
          <div class="value">${data.parentPhone}</div>
        </div>
        <div class="field">
          <div class="label">Address:</div>
          <div class="value">${data.parentAddress}</div>
        </div>
      </div>

      <h2>Child Information</h2>
      <div class="section">
        <div class="field">
          <div class="label">Name:</div>
          <div class="value">${data.childName}</div>
        </div>
        <div class="field">
          <div class="label">Date of Birth:</div>
          <div class="value">${data.childDateOfBirth}</div>
        </div>
        ${
          data.childPassportNumber
            ? `
        <div class="field">
          <div class="label">Passport Number:</div>
          <div class="value">${data.childPassportNumber}</div>
        </div>
        `
            : ""
        }
      </div>

      <h2>Travel Details</h2>
      <div class="section">
        <div class="field">
          <div class="label">Destination(s):</div>
          <div class="value">${data.travelDestination}</div>
        </div>
        <div class="field">
          <div class="label">Travel Dates:</div>
          <div class="value">${data.travelStartDate} to ${data.travelEndDate}</div>
        </div>
        <div class="field">
          <div class="label">Purpose of Travel:</div>
          <div class="value">${data.travelPurpose}</div>
        </div>
        <div class="field">
          <div class="label">Supervisor/Chaperone:</div>
          <div class="value">${data.supervisorName}</div>
        </div>
        <div class="field">
          <div class="label">Supervisor Phone:</div>
          <div class="value">${data.supervisorPhone}</div>
        </div>
      </div>

      <h2>Medical Information</h2>
      <div class="section">
        ${
          data.medicalConditions
            ? `
        <div class="field">
          <div class="label">Medical Conditions:</div>
          <div class="value">${data.medicalConditions}</div>
        </div>
        `
            : ""
        }
        <div class="field">
          <div class="label">Medications:</div>
          <div class="value">${data.medications}</div>
        </div>
        <div class="field">
          <div class="label">Allergies:</div>
          <div class="value">${data.allergies}</div>
        </div>
        <div class="field">
          <div class="label">Emergency Contact:</div>
          <div class="value">${data.emergencyContactName} - ${data.emergencyContactPhone}</div>
        </div>
      </div>

      <h2>Consent & Authorization</h2>
      <div class="section">
        <p>I hereby authorize the above-named supervisor to care for my child during the travel period specified above. I authorize emergency medical treatment if necessary.</p>
        
        <div class="signature-line"></div>
        <p>Parent/Guardian Signature</p>
        
        <div class="date-line">
          <div class="label">Date:</div>
          <div class="signature-line"></div>
        </div>
      </div>
    </body>
    </html>
  `

  const pdfBuffer = Buffer.from(htmlContent)

  return new NextResponse(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="travel-consent-form.pdf"',
    },
  })
}

function generateMedicalPDF(data: any) {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Medical Consent Form</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
        h1 { text-align: center; color: #333; }
        h2 { color: #555; margin-top: 30px; border-bottom: 2px solid #ddd; padding-bottom: 10px; }
        .section { margin-bottom: 20px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #333; }
        .value { color: #666; margin-top: 5px; }
        .signature-line { border-top: 1px solid #000; width: 200px; margin-top: 30px; }
        .date-line { margin-top: 10px; }
      </style>
    </head>
    <body>
      <h1>MEDICAL CONSENT FORM</h1>
      
      <h2>Parent/Guardian Information</h2>
      <div class="section">
        <div class="field">
          <div class="label">Name:</div>
          <div class="value">${data.parentName}</div>
        </div>
        <div class="field">
          <div class="label">Relationship to Child:</div>
          <div class="value">${data.parentRelationship}</div>
        </div>
        <div class="field">
          <div class="label">Email:</div>
          <div class="value">${data.parentEmail}</div>
        </div>
        <div class="field">
          <div class="label">Phone:</div>
          <div class="value">${data.parentPhone}</div>
        </div>
      </div>

      <h2>Child Information</h2>
      <div class="section">
        <div class="field">
          <div class="label">Name:</div>
          <div class="value">${data.childName}</div>
        </div>
        <div class="field">
          <div class="label">Date of Birth:</div>
          <div class="value">${data.childDateOfBirth}</div>
        </div>
        <div class="field">
          <div class="label">Gender:</div>
          <div class="value">${data.childGender}</div>
        </div>
      </div>

      <h2>Medical History</h2>
      <div class="section">
        ${
          data.medicalConditions
            ? `
        <div class="field">
          <div class="label">Medical Conditions:</div>
          <div class="value">${data.medicalConditions}</div>
        </div>
        `
            : ""
        }
        ${
          data.surgeries
            ? `
        <div class="field">
          <div class="label">Previous Surgeries:</div>
          <div class="value">${data.surgeries}</div>
        </div>
        `
            : ""
        }
        <div class="field">
          <div class="label">Current Medications:</div>
          <div class="value">${data.medications}</div>
        </div>
        <div class="field">
          <div class="label">Allergies:</div>
          <div class="value">${data.allergies}</div>
        </div>
        ${
          data.vaccinations
            ? `
        <div class="field">
          <div class="label">Vaccination Status:</div>
          <div class="value">${data.vaccinations}</div>
        </div>
        `
            : ""
        }
        ${
          data.insuranceProvider
            ? `
        <div class="field">
          <div class="label">Insurance:</div>
          <div class="value">${data.insuranceProvider} - Policy: ${data.insurancePolicyNumber}</div>
        </div>
        `
            : ""
        }
      </div>

      <h2>Medical Authorization</h2>
      <div class="section">
        <div class="field">
          <div class="label">Primary Physician:</div>
          <div class="value">${data.physicianName} - ${data.physicianPhone}</div>
        </div>
        ${
          data.hospitalPreference
            ? `
        <div class="field">
          <div class="label">Preferred Hospital/Clinic:</div>
          <div class="value">${data.hospitalPreference}</div>
        </div>
        `
            : ""
        }
        <div class="field">
          <div class="label">Treatment Authorization:</div>
          <div class="value">${data.treatmentAuthorization}</div>
        </div>
        <div class="field">
          <div class="label">Emergency Contact:</div>
          <div class="value">${data.emergencyContactName} (${data.emergencyContactRelationship}) - ${data.emergencyContactPhone}</div>
        </div>
      </div>

      <h2>Consent & Authorization</h2>
      <div class="section">
        <p>I hereby authorize the above-named physician and medical facility to provide medical care to my child as described above. I authorize emergency medical treatment if necessary.</p>
        
        <div class="signature-line"></div>
        <p>Parent/Guardian Signature</p>
        
        <div class="date-line">
          <div class="label">Date:</div>
          <div class="signature-line"></div>
        </div>
      </div>
    </body>
    </html>
  `

  const pdfBuffer = Buffer.from(htmlContent)

  return new NextResponse(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="medical-consent-form.pdf"',
    },
  })
}
