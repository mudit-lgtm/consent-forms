export async function generateTravelConsentPDF(formData: Record<string, any>) {
  const pdfContent = `
TRAVEL CONSENT FORM FOR MINOR

CHILD INFORMATION:
Name: ${formData.childFullName}
Date of Birth: ${formData.childDOB}
Passport/ID Number: ${formData.childPassport || "N/A"}

TRAVEL DETAILS:
Destination(s): ${formData.destination}
Departure Date: ${formData.departureDate}
Return Date: ${formData.returnDate}
Accompanied By: ${formData.accompaniedBy}
Type of Travel: ${formData.travelType}

PARENT/GUARDIAN INFORMATION:
Name: ${formData.parentName}
Email: ${formData.parentEmail}
Phone: ${formData.parentPhone}
Address: ${formData.parentAddress}

EMERGENCY CONTACT:
Name: ${formData.emergencyContact || "N/A"}
Phone: ${formData.emergencyPhone || "N/A"}

SPECIAL INSTRUCTIONS:
${formData.specialInstructions || "None"}

CONSENT:
I hereby authorize the above-named individual to travel with my child and make routine decisions regarding their care and safety during this trip.

Parent/Guardian Signature: _________________________ Date: _________

Parent/Guardian Printed Name: _____________________________________
  `

  downloadPDF(pdfContent, "travel-consent-form.txt")
}

export async function generateMedicalConsentPDF(formData: Record<string, any>) {
  const pdfContent = `
MEDICAL CONSENT FORM FOR MINOR

CHILD INFORMATION:
Name: ${formData.childFullName}
Date of Birth: ${formData.childDOB}
Gender: ${formData.childGender || "N/A"}

PARENT/GUARDIAN INFORMATION:
Name: ${formData.parentName}
Email: ${formData.parentEmail}
Phone: ${formData.parentPhone}

MEDICAL INFORMATION:
Known Allergies: ${formData.allergies || "None"}
Current Medications: ${formData.medications || "None"}
Primary Doctor: ${formData.doctorName || "N/A"}
Doctor's Phone: ${formData.doctorPhone || "N/A"}

SCOPE OF CONSENT:
Type: ${formData.consentType}

ADDITIONAL NOTES:
${formData.additionalNotes || "None"}

CONSENT:
I hereby authorize medical treatment for my child as described above. I understand that this consent covers ${formData.consentType.toLowerCase()}.

Parent/Guardian Signature: _________________________ Date: _________

Parent/Guardian Printed Name: _____________________________________
  `

  downloadPDF(pdfContent, "medical-consent-form.txt")
}

function downloadPDF(content: string, filename: string) {
  const element = document.createElement("a")
  const file = new Blob([content], { type: "text/plain" })
  element.href = URL.createObjectURL(file)
  element.download = filename
  document.body.appendChild(element)
  element.click()
  document.body.removeChild(element)
}
