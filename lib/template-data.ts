export interface TemplateData {
  id: string
  slug: string
  title: string
  description: string
  category: string
  keywords: string[]
  metaDescription: string
  intro: string
  steps: Array<{
    number: number
    title: string
    description: string
  }>
  formFields: Array<{
    name: string
    label: string
    type: "text" | "email" | "phone" | "date" | "textarea" | "select"
    required: boolean
    placeholder?: string
    options?: string[]
  }>
  faqItems: Array<{
    question: string
    answer: string
  }>
  relatedTemplates: string[]
}

export const templateDatabase: Record<string, TemplateData> = {
  "general-medical-consent": {
    id: "general-medical",
    slug: "general-medical-consent",
    title: "General Medical Consent Form",
    description: "Professional medical authorization form for routine medical care",
    category: "medical-consent",
    keywords: [
      "medical consent form",
      "child medical consent",
      "minor medical authorization",
      "healthcare authorization",
    ],
    metaDescription:
      "Create a professional general medical consent form for your child. Authorize routine medical care with our easy-to-use template.",
    intro:
      "A general medical consent form authorizes healthcare providers to treat your child for routine medical conditions and procedures. This form is essential for parents and guardians who need to provide medical authorization when they cannot be present.",
    steps: [
      {
        number: 1,
        title: "Parent/Guardian Information",
        description: "Enter your full name, contact information, and relationship to the child",
      },
      {
        number: 2,
        title: "Child Information",
        description: "Provide your child's full name, date of birth, and identifying information",
      },
      {
        number: 3,
        title: "Medical History",
        description: "List any allergies, medications, and relevant medical conditions",
      },
      {
        number: 4,
        title: "Authorization Details",
        description: "Specify the scope of medical authorization and any restrictions",
      },
      {
        number: 5,
        title: "Review & Sign",
        description: "Review all information and add your signature",
      },
    ],
    formFields: [
      {
        name: "parentName",
        label: "Parent/Guardian Full Name",
        type: "text",
        required: true,
        placeholder: "John Doe",
      },
      {
        name: "parentEmail",
        label: "Email Address",
        type: "email",
        required: true,
        placeholder: "john@example.com",
      },
      {
        name: "parentPhone",
        label: "Phone Number",
        type: "phone",
        required: true,
        placeholder: "(555) 123-4567",
      },
      {
        name: "childName",
        label: "Child's Full Name",
        type: "text",
        required: true,
        placeholder: "Jane Doe",
      },
      {
        name: "childDOB",
        label: "Child's Date of Birth",
        type: "date",
        required: true,
      },
      {
        name: "allergies",
        label: "Known Allergies",
        type: "textarea",
        required: false,
        placeholder: "List any known allergies...",
      },
      {
        name: "medications",
        label: "Current Medications",
        type: "textarea",
        required: false,
        placeholder: "List any current medications...",
      },
      {
        name: "medicalConditions",
        label: "Medical Conditions",
        type: "textarea",
        required: false,
        placeholder: "List any relevant medical conditions...",
      },
    ],
    faqItems: [
      {
        question: "Who can sign a medical consent form?",
        answer:
          "A parent, legal guardian, or person with legal authority to make medical decisions for the child can sign a medical consent form.",
      },
      {
        question: "What is a minor medical consent form used for?",
        answer:
          "A minor medical consent form authorizes healthcare providers to treat a child when the parent or guardian cannot be present. It provides medical authorization for routine care and procedures.",
      },
      {
        question: "How long is a medical consent form valid?",
        answer:
          "The validity period depends on the healthcare provider and the specific authorization. Most forms are valid for 1-2 years unless otherwise specified.",
      },
      {
        question: "Can I limit the scope of medical authorization?",
        answer:
          "Yes, you can specify limitations on the medical authorization, such as excluding certain procedures or treatments.",
      },
    ],
    relatedTemplates: ["emergency-medical-consent", "surgery-consent-form"],
  },
  "emergency-medical-consent": {
    id: "emergency-medical",
    slug: "emergency-medical-consent",
    title: "Emergency Medical Consent Form",
    description: "Emergency medical authorization for urgent care situations",
    category: "medical-consent",
    keywords: ["emergency medical consent", "urgent care authorization", "emergency treatment", "child emergency care"],
    metaDescription:
      "Create an emergency medical consent form for your child. Authorize emergency medical treatment with our professional template.",
    intro:
      "An emergency medical consent form authorizes healthcare providers to provide emergency medical treatment for your child when you cannot be reached. This form is critical for emergency situations where immediate medical intervention is necessary.",
    steps: [
      {
        number: 1,
        title: "Parent/Guardian Information",
        description: "Enter your full name, contact information, and relationship to the child",
      },
      {
        number: 2,
        title: "Child Information",
        description: "Provide your child's full name, date of birth, and identifying information",
      },
      {
        number: 3,
        title: "Emergency Contacts",
        description: "List emergency contacts and their relationship to the child",
      },
      {
        number: 4,
        title: "Medical History",
        description: "List allergies, medications, and medical conditions",
      },
      {
        number: 5,
        title: "Emergency Authorization",
        description: "Authorize emergency medical treatment and procedures",
      },
    ],
    formFields: [
      {
        name: "parentName",
        label: "Parent/Guardian Full Name",
        type: "text",
        required: true,
      },
      {
        name: "parentPhone",
        label: "Primary Phone Number",
        type: "phone",
        required: true,
      },
      {
        name: "childName",
        label: "Child's Full Name",
        type: "text",
        required: true,
      },
      {
        name: "childDOB",
        label: "Child's Date of Birth",
        type: "date",
        required: true,
      },
      {
        name: "emergencyContact1",
        label: "Emergency Contact 1 Name",
        type: "text",
        required: true,
      },
      {
        name: "emergencyContact1Phone",
        label: "Emergency Contact 1 Phone",
        type: "phone",
        required: true,
      },
      {
        name: "allergies",
        label: "Known Allergies",
        type: "textarea",
        required: true,
      },
      {
        name: "medications",
        label: "Current Medications",
        type: "textarea",
        required: true,
      },
    ],
    faqItems: [
      {
        question: "When should I use an emergency medical consent form?",
        answer:
          "Use an emergency medical consent form when your child will be in situations where you may not be immediately available, such as school, sports, or camps.",
      },
      {
        question: "What medical procedures can be authorized in an emergency?",
        answer:
          "Emergency medical consent typically authorizes necessary medical procedures to stabilize and treat the child, including surgery, medication, and hospitalization.",
      },
      {
        question: "Can I revoke an emergency medical consent form?",
        answer:
          "Yes, you can revoke the form at any time by providing written notice to the healthcare provider or institution holding the form.",
      },
    ],
    relatedTemplates: ["general-medical-consent", "surgery-consent-form"],
  },
  "domestic-travel-consent": {
    id: "domestic-travel",
    slug: "domestic-travel-consent",
    title: "Domestic Travel Consent Form",
    description: "Travel authorization for children traveling within the United States",
    category: "travel-consent",
    keywords: ["domestic travel consent", "child travel authorization", "minor travel form", "parental consent travel"],
    metaDescription:
      "Create a domestic travel consent form for your child. Authorize travel within the US with our professional template.",
    intro:
      "A domestic travel consent form authorizes your child to travel within the United States without both parents present. This form is often required by airlines, hotels, and travel companies to verify parental consent.",
    steps: [
      {
        number: 1,
        title: "Parent/Guardian Information",
        description: "Enter your full name, contact information, and relationship to the child",
      },
      {
        number: 2,
        title: "Child Information",
        description: "Provide your child's full name, date of birth, and identifying information",
      },
      {
        number: 3,
        title: "Travel Details",
        description: "Specify travel dates, destinations, and travel companions",
      },
      {
        number: 4,
        title: "Supervisor Information",
        description: "Provide details of the adult supervising the child during travel",
      },
      {
        number: 5,
        title: "Medical Information",
        description: "List allergies, medications, and emergency contacts",
      },
    ],
    formFields: [
      {
        name: "parentName",
        label: "Parent/Guardian Full Name",
        type: "text",
        required: true,
      },
      {
        name: "parentPhone",
        label: "Phone Number",
        type: "phone",
        required: true,
      },
      {
        name: "childName",
        label: "Child's Full Name",
        type: "text",
        required: true,
      },
      {
        name: "childDOB",
        label: "Child's Date of Birth",
        type: "date",
        required: true,
      },
      {
        name: "travelDates",
        label: "Travel Dates",
        type: "text",
        required: true,
        placeholder: "MM/DD/YYYY - MM/DD/YYYY",
      },
      {
        name: "destination",
        label: "Destination(s)",
        type: "text",
        required: true,
      },
      {
        name: "supervisorName",
        label: "Supervising Adult Name",
        type: "text",
        required: true,
      },
      {
        name: "supervisorPhone",
        label: "Supervising Adult Phone",
        type: "phone",
        required: true,
      },
    ],
    faqItems: [
      {
        question: "Do I need a travel consent form for domestic travel?",
        answer:
          "While not always legally required, many airlines and hotels request a travel consent form when a minor is traveling without both parents.",
      },
      {
        question: "What information should be included in a travel consent form?",
        answer:
          "Include parent information, child details, travel dates and destinations, supervising adult information, and emergency contacts.",
      },
      {
        question: "How long is a travel consent form valid?",
        answer:
          "A travel consent form is typically valid for the specific trip dates listed. Create a new form for each trip.",
      },
    ],
    relatedTemplates: ["international-travel-consent", "flight-consent-form"],
  },
  "international-travel-consent": {
    id: "international-travel",
    slug: "international-travel-consent",
    title: "International Travel Consent Form",
    description: "Travel authorization for children traveling internationally",
    category: "travel-consent",
    keywords: [
      "international travel consent",
      "child passport authorization",
      "minor international travel",
      "parental consent international",
    ],
    metaDescription:
      "Create an international travel consent form for your child. Authorize international travel with our comprehensive template.",
    intro:
      "An international travel consent form authorizes your child to travel outside the United States. This form is often required by airlines, customs, and immigration authorities to verify parental consent for international travel.",
    steps: [
      {
        number: 1,
        title: "Parent/Guardian Information",
        description: "Enter your full name, contact information, and relationship to the child",
      },
      {
        number: 2,
        title: "Child Information",
        description: "Provide your child's full name, date of birth, and passport information",
      },
      {
        number: 3,
        title: "Travel Details",
        description: "Specify travel dates, destinations, and travel companions",
      },
      {
        number: 4,
        title: "Supervisor Information",
        description: "Provide details of the adult supervising the child during travel",
      },
      {
        number: 5,
        title: "International Authorization",
        description: "Authorize international travel and provide emergency contacts",
      },
    ],
    formFields: [
      {
        name: "parentName",
        label: "Parent/Guardian Full Name",
        type: "text",
        required: true,
      },
      {
        name: "parentPhone",
        label: "Phone Number",
        type: "phone",
        required: true,
      },
      {
        name: "childName",
        label: "Child's Full Name",
        type: "text",
        required: true,
      },
      {
        name: "passportNumber",
        label: "Child's Passport Number",
        type: "text",
        required: true,
      },
      {
        name: "travelDates",
        label: "Travel Dates",
        type: "text",
        required: true,
      },
      {
        name: "countries",
        label: "Countries to Visit",
        type: "textarea",
        required: true,
      },
      {
        name: "supervisorName",
        label: "Supervising Adult Name",
        type: "text",
        required: true,
      },
      {
        name: "supervisorPhone",
        label: "Supervising Adult Phone",
        type: "phone",
        required: true,
      },
    ],
    faqItems: [
      {
        question: "Is an international travel consent form required?",
        answer:
          "Yes, most countries require a travel consent form when a minor is traveling internationally without both parents.",
      },
      {
        question: "What documents do I need for international travel?",
        answer:
          "You'll need a valid passport, travel consent form, and possibly a notarized letter of consent depending on the destination country.",
      },
      {
        question: "Should the form be notarized?",
        answer:
          "Many countries recommend or require notarization of the travel consent form. Check with your destination country's requirements.",
      },
    ],
    relatedTemplates: ["domestic-travel-consent", "cruise-consent-form"],
  },

  "surgery-consent-form": {
    id: "surgery-consent",
    slug: "surgery-consent-form",
    title: "Surgery Consent Form",
    description: "Medical authorization for surgical procedures",
    category: "medical-consent",
    keywords: ["surgery consent", "surgical authorization", "child surgery", "parental surgical consent"],
    metaDescription:
      "Create a surgery consent form for your child. Authorize surgical procedures with our professional template.",
    intro:
      "A surgery consent form authorizes healthcare providers to perform surgical procedures on your child. This form documents your understanding of the procedure, risks, and benefits.",
    steps: [
      {
        number: 1,
        title: "Parent/Guardian Information",
        description: "Enter your full name, contact information, and relationship to the child",
      },
      {
        number: 2,
        title: "Child Information",
        description: "Provide your child's full name, date of birth, and medical record number",
      },
      { number: 3, title: "Surgical Details", description: "Specify the surgical procedure and surgeon information" },
      {
        number: 4,
        title: "Medical History",
        description: "List allergies, medications, and relevant medical conditions",
      },
      { number: 5, title: "Authorization & Signature", description: "Review and authorize the surgical procedure" },
    ],
    formFields: [
      { name: "parentName", label: "Parent/Guardian Full Name", type: "text", required: true },
      { name: "parentPhone", label: "Phone Number", type: "phone", required: true },
      { name: "childName", label: "Child's Full Name", type: "text", required: true },
      { name: "childDOB", label: "Child's Date of Birth", type: "date", required: true },
      { name: "surgeryType", label: "Type of Surgery", type: "text", required: true },
      { name: "surgeonName", label: "Surgeon's Name", type: "text", required: true },
      { name: "surgeryDate", label: "Scheduled Surgery Date", type: "date", required: true },
      { name: "allergies", label: "Known Allergies", type: "textarea", required: true },
      { name: "medications", label: "Current Medications", type: "textarea", required: true },
      { name: "medicalConditions", label: "Medical Conditions", type: "textarea", required: false },
    ],
    faqItems: [
      {
        question: "What is a surgery consent form?",
        answer:
          "A surgery consent form is a legal document that authorizes a healthcare provider to perform a surgical procedure on your child.",
      },
      {
        question: "What information should I provide?",
        answer:
          "Include your child's medical history, current medications, allergies, and any relevant medical conditions.",
      },
      {
        question: "Can I ask questions before signing?",
        answer:
          "Yes, you should ask the surgeon any questions about the procedure, risks, and recovery before signing the consent form.",
      },
    ],
    relatedTemplates: ["general-medical-consent", "emergency-medical-consent"],
  },

  "dental-consent-form": {
    id: "dental-consent",
    slug: "dental-consent-form",
    title: "Dental Consent Form",
    description: "Authorization for dental procedures and treatments",
    category: "medical-consent",
    keywords: ["dental consent", "dental authorization", "child dental", "pediatric dental consent"],
    metaDescription:
      "Create a dental consent form for your child. Authorize dental procedures with our professional template.",
    intro:
      "A dental consent form authorizes dentists to perform dental procedures and treatments on your child. This form ensures the dentist has your permission for necessary dental care.",
    steps: [
      {
        number: 1,
        title: "Parent/Guardian Information",
        description: "Enter your full name, contact information, and relationship to the child",
      },
      {
        number: 2,
        title: "Child Information",
        description: "Provide your child's full name, date of birth, and dental history",
      },
      { number: 3, title: "Dental Procedures", description: "Specify the dental procedures to be performed" },
      {
        number: 4,
        title: "Medical History",
        description: "List allergies, medications, and relevant medical conditions",
      },
      { number: 5, title: "Authorization & Signature", description: "Review and authorize the dental procedures" },
    ],
    formFields: [
      { name: "parentName", label: "Parent/Guardian Full Name", type: "text", required: true },
      { name: "parentPhone", label: "Phone Number", type: "phone", required: true },
      { name: "childName", label: "Child's Full Name", type: "text", required: true },
      { name: "childDOB", label: "Child's Date of Birth", type: "date", required: true },
      { name: "dentistName", label: "Dentist's Name", type: "text", required: true },
      { name: "procedures", label: "Dental Procedures", type: "textarea", required: true },
      { name: "allergies", label: "Known Allergies", type: "textarea", required: false },
      { name: "medications", label: "Current Medications", type: "textarea", required: false },
    ],
    faqItems: [
      {
        question: "Do I need a dental consent form?",
        answer: "Yes, dentists typically require a consent form for minors to authorize treatment.",
      },
      {
        question: "What procedures require consent?",
        answer:
          "Most dental procedures, including cleanings, fillings, extractions, and orthodontic treatment require parental consent.",
      },
    ],
    relatedTemplates: ["general-medical-consent", "medication-consent-form"],
  },

  "medication-consent-form": {
    id: "medication-consent",
    slug: "medication-consent-form",
    title: "Medication Consent Form",
    description: "Authorization for medication administration",
    category: "medical-consent",
    keywords: ["medication consent", "medication authorization", "child medication", "parental medication consent"],
    metaDescription:
      "Create a medication consent form for your child. Authorize medication administration with our professional template.",
    intro:
      "A medication consent form authorizes schools, camps, or caregivers to administer medication to your child. This form documents the medication, dosage, and administration instructions.",
    steps: [
      {
        number: 1,
        title: "Parent/Guardian Information",
        description: "Enter your full name, contact information, and relationship to the child",
      },
      {
        number: 2,
        title: "Child Information",
        description: "Provide your child's full name, date of birth, and weight",
      },
      {
        number: 3,
        title: "Medication Details",
        description: "Specify the medication, dosage, and administration instructions",
      },
      { number: 4, title: "Medical Conditions", description: "List relevant medical conditions and allergies" },
      { number: 5, title: "Authorization & Signature", description: "Review and authorize medication administration" },
    ],
    formFields: [
      { name: "parentName", label: "Parent/Guardian Full Name", type: "text", required: true },
      { name: "parentPhone", label: "Phone Number", type: "phone", required: true },
      { name: "childName", label: "Child's Full Name", type: "text", required: true },
      { name: "childDOB", label: "Child's Date of Birth", type: "date", required: true },
      { name: "childWeight", label: "Child's Weight (lbs)", type: "text", required: true },
      { name: "medicationName", label: "Medication Name", type: "text", required: true },
      { name: "dosage", label: "Dosage", type: "text", required: true },
      { name: "frequency", label: "Frequency of Administration", type: "text", required: true },
      { name: "sideEffects", label: "Known Side Effects", type: "textarea", required: false },
      { name: "allergies", label: "Known Allergies", type: "textarea", required: true },
    ],
    faqItems: [
      {
        question: "When do I need a medication consent form?",
        answer:
          "You need a medication consent form when your child will be in the care of others who need to administer medication.",
      },
      {
        question: "What information should I include?",
        answer:
          "Include the medication name, dosage, frequency, administration method, and any known side effects or allergies.",
      },
    ],
    relatedTemplates: ["general-medical-consent", "dental-consent-form"],
  },

  "vaccination-consent-form": {
    id: "vaccination-consent",
    slug: "vaccination-consent-form",
    title: "Vaccination Consent Form",
    description: "Authorization for vaccination and immunization procedures",
    category: "medical-consent",
    keywords: ["vaccination consent", "immunization authorization", "child vaccination", "vaccine consent form"],
    metaDescription:
      "Create a vaccination consent form for your child. Authorize vaccinations with our professional template.",
    intro:
      "A vaccination consent form authorizes healthcare providers to administer vaccines and immunizations to your child. This form documents your understanding of the vaccines and any potential side effects.",
    steps: [
      {
        number: 1,
        title: "Parent/Guardian Information",
        description: "Enter your full name, contact information, and relationship to the child",
      },
      {
        number: 2,
        title: "Child Information",
        description: "Provide your child's full name, date of birth, and medical record number",
      },
      { number: 3, title: "Vaccination Details", description: "Specify which vaccines are to be administered" },
      {
        number: 4,
        title: "Medical History",
        description: "List allergies, medications, and relevant medical conditions",
      },
      { number: 5, title: "Authorization & Signature", description: "Review and authorize vaccination" },
    ],
    formFields: [
      { name: "parentName", label: "Parent/Guardian Full Name", type: "text", required: true },
      { name: "parentPhone", label: "Phone Number", type: "phone", required: true },
      { name: "childName", label: "Child's Full Name", type: "text", required: true },
      { name: "childDOB", label: "Child's Date of Birth", type: "date", required: true },
      { name: "vaccines", label: "Vaccines to be Administered", type: "textarea", required: true },
      { name: "allergies", label: "Known Allergies", type: "textarea", required: true },
      { name: "medications", label: "Current Medications", type: "textarea", required: false },
      { name: "previousReactions", label: "Previous Vaccine Reactions", type: "textarea", required: false },
    ],
    faqItems: [
      {
        question: "Is vaccination consent required?",
        answer: "Yes, healthcare providers require parental consent before administering vaccines to minors.",
      },
      {
        question: "What vaccines are typically required?",
        answer:
          "Required vaccines vary by state and age, but typically include vaccines for measles, polio, and other preventable diseases.",
      },
    ],
    relatedTemplates: ["general-medical-consent", "emergency-medical-consent"],
  },

  "cruise-consent-form": {
    id: "cruise-consent",
    slug: "cruise-consent-form",
    title: "Cruise Travel Consent Form",
    description: "Travel authorization for children traveling on cruises",
    category: "travel-consent",
    keywords: ["cruise consent", "cruise travel authorization", "child cruise", "cruise parental consent"],
    metaDescription:
      "Create a cruise travel consent form for your child. Authorize cruise travel with our professional template.",
    intro:
      "A cruise travel consent form authorizes your child to travel on a cruise ship. This form is required by cruise lines when a minor is traveling without both parents.",
    steps: [
      {
        number: 1,
        title: "Parent/Guardian Information",
        description: "Enter your full name, contact information, and relationship to the child",
      },
      {
        number: 2,
        title: "Child Information",
        description: "Provide your child's full name, date of birth, and passport information",
      },
      { number: 3, title: "Cruise Details", description: "Specify cruise dates, ship name, and ports of call" },
      { number: 4, title: "Supervisor Information", description: "Provide details of the adult supervising the child" },
      {
        number: 5,
        title: "Emergency Authorization",
        description: "Authorize emergency medical treatment and provide emergency contacts",
      },
    ],
    formFields: [
      { name: "parentName", label: "Parent/Guardian Full Name", type: "text", required: true },
      { name: "parentPhone", label: "Phone Number", type: "phone", required: true },
      { name: "childName", label: "Child's Full Name", type: "text", required: true },
      { name: "passportNumber", label: "Child's Passport Number", type: "text", required: true },
      { name: "cruiseLine", label: "Cruise Line", type: "text", required: true },
      { name: "shipName", label: "Ship Name", type: "text", required: true },
      { name: "sailDate", label: "Sail Date", type: "date", required: true },
      { name: "returnDate", label: "Return Date", type: "date", required: true },
      { name: "supervisorName", label: "Supervising Adult Name", type: "text", required: true },
      { name: "supervisorPhone", label: "Supervising Adult Phone", type: "phone", required: true },
    ],
    faqItems: [
      {
        question: "Do cruise lines require consent forms?",
        answer: "Yes, most cruise lines require a travel consent form when a minor is traveling without both parents.",
      },
      {
        question: "What information do I need?",
        answer:
          "You'll need your child's passport information, cruise details, and information about the supervising adult.",
      },
    ],
    relatedTemplates: ["international-travel-consent", "domestic-travel-consent"],
  },

  "flight-consent-form": {
    id: "flight-consent",
    slug: "flight-consent-form",
    title: "Flight Travel Consent Form",
    description: "Travel authorization for children traveling by air",
    category: "travel-consent",
    keywords: ["flight consent", "air travel authorization", "child flight", "airline parental consent"],
    metaDescription:
      "Create a flight travel consent form for your child. Authorize air travel with our professional template.",
    intro:
      "A flight travel consent form authorizes your child to travel by air. This form is required by airlines when a minor is traveling without both parents.",
    steps: [
      {
        number: 1,
        title: "Parent/Guardian Information",
        description: "Enter your full name, contact information, and relationship to the child",
      },
      {
        number: 2,
        title: "Child Information",
        description: "Provide your child's full name, date of birth, and identification",
      },
      { number: 3, title: "Flight Details", description: "Specify flight dates, airlines, and destinations" },
      { number: 4, title: "Supervisor Information", description: "Provide details of the adult supervising the child" },
      { number: 5, title: "Emergency Contacts", description: "Provide emergency contact information" },
    ],
    formFields: [
      { name: "parentName", label: "Parent/Guardian Full Name", type: "text", required: true },
      { name: "parentPhone", label: "Phone Number", type: "phone", required: true },
      { name: "childName", label: "Child's Full Name", type: "text", required: true },
      { name: "childDOB", label: "Child's Date of Birth", type: "date", required: true },
      { name: "airline", label: "Airline", type: "text", required: true },
      { name: "flightNumber", label: "Flight Number", type: "text", required: true },
      { name: "departureDate", label: "Departure Date", type: "date", required: true },
      { name: "returnDate", label: "Return Date", type: "date", required: true },
      { name: "supervisorName", label: "Supervising Adult Name", type: "text", required: true },
      { name: "supervisorPhone", label: "Supervising Adult Phone", type: "phone", required: true },
    ],
    faqItems: [
      {
        question: "Do airlines require consent forms?",
        answer: "Yes, most airlines require a travel consent form when a minor is traveling without both parents.",
      },
      {
        question: "What is an unaccompanied minor?",
        answer:
          "An unaccompanied minor is a child traveling without a parent or legal guardian. Airlines have specific policies for unaccompanied minors.",
      },
    ],
    relatedTemplates: ["domestic-travel-consent", "international-travel-consent"],
  },

  "camp-consent-form": {
    id: "camp-consent",
    slug: "camp-consent-form",
    title: "Camp Travel Consent Form",
    description: "Travel authorization for children attending overnight camps",
    category: "travel-consent",
    keywords: ["camp consent", "camp authorization", "child camp", "overnight camp consent"],
    metaDescription:
      "Create a camp travel consent form for your child. Authorize camp attendance with our professional template.",
    intro:
      "A camp travel consent form authorizes your child to attend overnight camp. This form documents your consent for your child to travel to and stay at camp.",
    steps: [
      {
        number: 1,
        title: "Parent/Guardian Information",
        description: "Enter your full name, contact information, and relationship to the child",
      },
      {
        number: 2,
        title: "Child Information",
        description: "Provide your child's full name, date of birth, and emergency contact",
      },
      { number: 3, title: "Camp Details", description: "Specify camp name, location, and dates" },
      { number: 4, title: "Medical Information", description: "List allergies, medications, and medical conditions" },
      { number: 5, title: "Authorization & Signature", description: "Review and authorize camp attendance" },
    ],
    formFields: [
      { name: "parentName", label: "Parent/Guardian Full Name", type: "text", required: true },
      { name: "parentPhone", label: "Phone Number", type: "phone", required: true },
      { name: "childName", label: "Child's Full Name", type: "text", required: true },
      { name: "childDOB", label: "Child's Date of Birth", type: "date", required: true },
      { name: "campName", label: "Camp Name", type: "text", required: true },
      { name: "campLocation", label: "Camp Location", type: "text", required: true },
      { name: "startDate", label: "Camp Start Date", type: "date", required: true },
      { name: "endDate", label: "Camp End Date", type: "date", required: true },
      { name: "allergies", label: "Known Allergies", type: "textarea", required: false },
      { name: "medications", label: "Current Medications", type: "textarea", required: false },
    ],
    faqItems: [
      {
        question: "What should I include in a camp consent form?",
        answer: "Include your child's medical information, emergency contacts, and any special needs or restrictions.",
      },
      {
        question: "Can I revoke camp consent?",
        answer:
          "Yes, you can revoke consent by contacting the camp directly, though this may affect your child's participation.",
      },
    ],
    relatedTemplates: ["domestic-travel-consent", "activity-consent-form"],
  },

  "exchange-consent-form": {
    id: "exchange-consent",
    slug: "exchange-consent-form",
    title: "Exchange Program Consent Form",
    description: "Authorization for children participating in exchange programs",
    category: "travel-consent",
    keywords: [
      "exchange program consent",
      "student exchange authorization",
      "international exchange",
      "exchange student consent",
    ],
    metaDescription:
      "Create an exchange program consent form for your child. Authorize exchange program participation with our professional template.",
    intro:
      "An exchange program consent form authorizes your child to participate in a student exchange program. This form documents your consent for your child to travel and study abroad.",
    steps: [
      {
        number: 1,
        title: "Parent/Guardian Information",
        description: "Enter your full name, contact information, and relationship to the child",
      },
      {
        number: 2,
        title: "Child Information",
        description: "Provide your child's full name, date of birth, and passport information",
      },
      { number: 3, title: "Program Details", description: "Specify program name, location, and duration" },
      { number: 4, title: "Host Family Information", description: "Provide information about the host family" },
      { number: 5, title: "Medical & Emergency", description: "List medical information and emergency contacts" },
    ],
    formFields: [
      { name: "parentName", label: "Parent/Guardian Full Name", type: "text", required: true },
      { name: "parentPhone", label: "Phone Number", type: "phone", required: true },
      { name: "childName", label: "Child's Full Name", type: "text", required: true },
      { name: "passportNumber", label: "Child's Passport Number", type: "text", required: true },
      { name: "programName", label: "Exchange Program Name", type: "text", required: true },
      { name: "destination", label: "Destination Country", type: "text", required: true },
      { name: "startDate", label: "Program Start Date", type: "date", required: true },
      { name: "endDate", label: "Program End Date", type: "date", required: true },
      { name: "hostFamilyName", label: "Host Family Name", type: "text", required: true },
      { name: "hostFamilyPhone", label: "Host Family Phone", type: "phone", required: true },
    ],
    faqItems: [
      {
        question: "What is an exchange program?",
        answer: "An exchange program allows students to study and live in another country for a period of time.",
      },
      {
        question: "What documents do I need?",
        answer:
          "You'll need a valid passport, travel consent form, and possibly a visa depending on the destination country.",
      },
    ],
    relatedTemplates: ["international-travel-consent", "domestic-travel-consent"],
  },

  "field-trip-consent-form": {
    id: "field-trip-consent",
    slug: "field-trip-consent-form",
    title: "Field Trip Consent Form",
    description: "Authorization for children to participate in school field trips",
    category: "school-consent",
    keywords: [
      "field trip consent",
      "school field trip authorization",
      "child field trip",
      "parental field trip consent",
    ],
    metaDescription:
      "Create a field trip consent form for your child. Authorize school field trip participation with our professional template.",
    intro:
      "A field trip consent form authorizes your child to participate in school-sponsored field trips. This form documents your consent and provides emergency contact information.",
    steps: [
      {
        number: 1,
        title: "Parent/Guardian Information",
        description: "Enter your full name, contact information, and relationship to the child",
      },
      { number: 2, title: "Child Information", description: "Provide your child's full name, grade, and school" },
      { number: 3, title: "Trip Details", description: "Specify trip destination, date, and purpose" },
      { number: 4, title: "Medical Information", description: "List allergies, medications, and medical conditions" },
      { number: 5, title: "Authorization & Signature", description: "Review and authorize field trip participation" },
    ],
    formFields: [
      { name: "parentName", label: "Parent/Guardian Full Name", type: "text", required: true },
      { name: "parentPhone", label: "Phone Number", type: "phone", required: true },
      { name: "childName", label: "Child's Full Name", type: "text", required: true },
      { name: "grade", label: "Grade Level", type: "text", required: true },
      { name: "school", label: "School Name", type: "text", required: true },
      { name: "tripDestination", label: "Trip Destination", type: "text", required: true },
      { name: "tripDate", label: "Trip Date", type: "date", required: true },
      { name: "tripPurpose", label: "Trip Purpose", type: "textarea", required: true },
      { name: "allergies", label: "Known Allergies", type: "textarea", required: false },
      { name: "medications", label: "Current Medications", type: "textarea", required: false },
    ],
    faqItems: [
      {
        question: "Why do schools require field trip consent?",
        answer:
          "Schools require consent to ensure parents are aware of the trip and to have emergency contact information.",
      },
      {
        question: "Can I refuse to let my child go on a field trip?",
        answer:
          "Yes, you can refuse consent, though your child may need to participate in an alternative activity at school.",
      },
    ],
    relatedTemplates: ["activity-consent-form", "photo-consent-form"],
  },

  "activity-consent-form": {
    id: "activity-consent",
    slug: "activity-consent-form",
    title: "School Activity Consent Form",
    description: "Authorization for children to participate in school activities",
    category: "school-consent",
    keywords: ["activity consent", "school activity authorization", "child activity", "parental activity consent"],
    metaDescription:
      "Create a school activity consent form for your child. Authorize activity participation with our professional template.",
    intro:
      "A school activity consent form authorizes your child to participate in school-sponsored activities. This form documents your consent and provides emergency contact information.",
    steps: [
      {
        number: 1,
        title: "Parent/Guardian Information",
        description: "Enter your full name, contact information, and relationship to the child",
      },
      { number: 2, title: "Child Information", description: "Provide your child's full name, grade, and school" },
      { number: 3, title: "Activity Details", description: "Specify activity name, type, and schedule" },
      { number: 4, title: "Medical Information", description: "List allergies, medications, and medical conditions" },
      { number: 5, title: "Authorization & Signature", description: "Review and authorize activity participation" },
    ],
    formFields: [
      { name: "parentName", label: "Parent/Guardian Full Name", type: "text", required: true },
      { name: "parentPhone", label: "Phone Number", type: "phone", required: true },
      { name: "childName", label: "Child's Full Name", type: "text", required: true },
      { name: "grade", label: "Grade Level", type: "text", required: true },
      { name: "activityName", label: "Activity Name", type: "text", required: true },
      { name: "activityType", label: "Activity Type", type: "text", required: true },
      { name: "schedule", label: "Activity Schedule", type: "text", required: true },
      { name: "allergies", label: "Known Allergies", type: "textarea", required: false },
      { name: "medications", label: "Current Medications", type: "textarea", required: false },
    ],
    faqItems: [
      {
        question: "What activities require consent?",
        answer: "Most school activities, including clubs, sports, and special programs require parental consent.",
      },
      {
        question: "Can I limit my child's activities?",
        answer: "Yes, you can specify which activities your child can participate in on the consent form.",
      },
    ],
    relatedTemplates: ["field-trip-consent-form", "photo-consent-form"],
  },

  "photo-consent-form": {
    id: "photo-consent",
    slug: "photo-consent-form",
    title: "Photo & Video Consent Form",
    description: "Authorization for photography and video recording of children",
    category: "school-consent",
    keywords: ["photo consent", "video consent", "child photography", "media consent form"],
    metaDescription:
      "Create a photo and video consent form for your child. Authorize photography and recording with our professional template.",
    intro:
      "A photo and video consent form authorizes schools and organizations to photograph or record your child for educational or promotional purposes. This form documents your consent and any restrictions.",
    steps: [
      {
        number: 1,
        title: "Parent/Guardian Information",
        description: "Enter your full name, contact information, and relationship to the child",
      },
      { number: 2, title: "Child Information", description: "Provide your child's full name and school/organization" },
      { number: 3, title: "Media Usage", description: "Specify how photos/videos can be used" },
      { number: 4, title: "Restrictions", description: "Indicate any restrictions on media usage" },
      { number: 5, title: "Authorization & Signature", description: "Review and authorize media usage" },
    ],
    formFields: [
      { name: "parentName", label: "Parent/Guardian Full Name", type: "text", required: true },
      { name: "parentPhone", label: "Phone Number", type: "phone", required: true },
      { name: "childName", label: "Child's Full Name", type: "text", required: true },
      { name: "school", label: "School/Organization Name", type: "text", required: true },
      {
        name: "mediaUsage",
        label: "Approved Media Usage",
        type: "textarea",
        required: true,
        placeholder: "e.g., School website, yearbook, social media",
      },
      {
        name: "restrictions",
        label: "Any Restrictions",
        type: "textarea",
        required: false,
        placeholder: "e.g., No social media, no full name",
      },
    ],
    faqItems: [
      {
        question: "Can I restrict how my child's photo is used?",
        answer: "Yes, you can specify restrictions on the consent form, such as no social media or no full name.",
      },
      {
        question: "Can I revoke photo consent?",
        answer: "Yes, you can revoke consent at any time by contacting the school or organization.",
      },
    ],
    relatedTemplates: ["field-trip-consent-form", "activity-consent-form"],
  },

  "technology-consent-form": {
    id: "technology-consent",
    slug: "technology-consent-form",
    title: "Technology & Internet Consent Form",
    description: "Authorization for technology and internet usage at school",
    category: "school-consent",
    keywords: ["technology consent", "internet consent", "school technology", "acceptable use policy"],
    metaDescription:
      "Create a technology and internet consent form for your child. Authorize school technology usage with our professional template.",
    intro:
      "A technology and internet consent form authorizes your child to use school technology and internet resources. This form documents your understanding of acceptable use policies.",
    steps: [
      {
        number: 1,
        title: "Parent/Guardian Information",
        description: "Enter your full name, contact information, and relationship to the child",
      },
      { number: 2, title: "Child Information", description: "Provide your child's full name and school" },
      { number: 3, title: "Technology Access", description: "Specify which technologies and resources are approved" },
      { number: 4, title: "Acceptable Use", description: "Review acceptable use policies" },
      { number: 5, title: "Authorization & Signature", description: "Review and authorize technology usage" },
    ],
    formFields: [
      { name: "parentName", label: "Parent/Guardian Full Name", type: "text", required: true },
      { name: "parentPhone", label: "Phone Number", type: "phone", required: true },
      { name: "childName", label: "Child's Full Name", type: "text", required: true },
      { name: "school", label: "School Name", type: "text", required: true },
      {
        name: "approvedTech",
        label: "Approved Technologies",
        type: "textarea",
        required: true,
        placeholder: "e.g., School computers, tablets, learning apps",
      },
      { name: "restrictions", label: "Any Restrictions", type: "textarea", required: false },
    ],
    faqItems: [
      {
        question: "What is an acceptable use policy?",
        answer:
          "An acceptable use policy outlines rules for using school technology and internet resources responsibly.",
      },
      {
        question: "Can I restrict my child's technology access?",
        answer: "Yes, you can specify restrictions on the consent form.",
      },
    ],
    relatedTemplates: ["activity-consent-form", "special-program-consent-form"],
  },

  "special-program-consent-form": {
    id: "special-program-consent",
    slug: "special-program-consent-form",
    title: "Special Program Consent Form",
    description: "Authorization for children to participate in special school programs",
    category: "school-consent",
    keywords: ["special program consent", "gifted program consent", "special education", "program authorization"],
    metaDescription:
      "Create a special program consent form for your child. Authorize special program participation with our professional template.",
    intro:
      "A special program consent form authorizes your child to participate in special school programs such as gifted programs, special education, or enrichment programs.",
    steps: [
      {
        number: 1,
        title: "Parent/Guardian Information",
        description: "Enter your full name, contact information, and relationship to the child",
      },
      { number: 2, title: "Child Information", description: "Provide your child's full name and grade" },
      { number: 3, title: "Program Details", description: "Specify the program name and description" },
      { number: 4, title: "Program Requirements", description: "Review program requirements and expectations" },
      { number: 5, title: "Authorization & Signature", description: "Review and authorize program participation" },
    ],
    formFields: [
      { name: "parentName", label: "Parent/Guardian Full Name", type: "text", required: true },
      { name: "parentPhone", label: "Phone Number", type: "phone", required: true },
      { name: "childName", label: "Child's Full Name", type: "text", required: true },
      { name: "grade", label: "Grade Level", type: "text", required: true },
      { name: "programName", label: "Program Name", type: "text", required: true },
      { name: "programDescription", label: "Program Description", type: "textarea", required: true },
      { name: "requirements", label: "Program Requirements", type: "textarea", required: true },
    ],
    faqItems: [
      {
        question: "What special programs require consent?",
        answer: "Most special programs, including gifted programs and special education, require parental consent.",
      },
      {
        question: "Can I withdraw my child from a program?",
        answer: "Yes, you can withdraw your child by contacting the school.",
      },
    ],
    relatedTemplates: ["activity-consent-form", "technology-consent-form"],
  },

  "transportation-consent-form": {
    id: "transportation-consent",
    slug: "transportation-consent-form",
    title: "School Transportation Consent Form",
    description: "Authorization for school transportation and bus usage",
    category: "school-consent",
    keywords: ["transportation consent", "school bus consent", "bus authorization", "school transportation"],
    metaDescription:
      "Create a school transportation consent form for your child. Authorize bus and transportation usage with our professional template.",
    intro:
      "A school transportation consent form authorizes your child to use school buses and other school-provided transportation. This form documents your consent and provides emergency contact information.",
    steps: [
      {
        number: 1,
        title: "Parent/Guardian Information",
        description: "Enter your full name, contact information, and relationship to the child",
      },
      { number: 2, title: "Child Information", description: "Provide your child's full name and school" },
      { number: 3, title: "Transportation Details", description: "Specify bus routes and transportation methods" },
      { number: 4, title: "Emergency Contacts", description: "Provide emergency contact information" },
      { number: 5, title: "Authorization & Signature", description: "Review and authorize transportation usage" },
    ],
    formFields: [
      { name: "parentName", label: "Parent/Guardian Full Name", type: "text", required: true },
      { name: "parentPhone", label: "Phone Number", type: "phone", required: true },
      { name: "childName", label: "Child's Full Name", type: "text", required: true },
      { name: "school", label: "School Name", type: "text", required: true },
      { name: "busRoute", label: "Bus Route Number", type: "text", required: true },
      { name: "pickupLocation", label: "Pickup Location", type: "text", required: true },
      { name: "dropoffLocation", label: "Dropoff Location", type: "text", required: true },
      { name: "emergencyContact", label: "Emergency Contact Name", type: "text", required: true },
      { name: "emergencyPhone", label: "Emergency Contact Phone", type: "phone", required: true },
    ],
    faqItems: [
      {
        question: "Is school transportation safe?",
        answer: "Yes, school buses are equipped with safety features and drivers are trained in safety procedures.",
      },
      {
        question: "Can I change my child's bus route?",
        answer: "Yes, contact the school transportation department to request changes.",
      },
    ],
    relatedTemplates: ["field-trip-consent-form", "activity-consent-form"],
  },

  "general-sports-consent-form": {
    id: "general-sports-consent",
    slug: "general-sports-consent-form",
    title: "General Sports Consent Form",
    description: "Authorization for children to participate in sports",
    category: "sports-consent",
    keywords: ["sports consent", "athletic authorization", "child sports", "parental sports consent"],
    metaDescription:
      "Create a general sports consent form for your child. Authorize sports participation with our professional template.",
    intro:
      "A general sports consent form authorizes your child to participate in sports activities. This form documents your consent and provides medical and emergency information.",
    steps: [
      {
        number: 1,
        title: "Parent/Guardian Information",
        description: "Enter your full name, contact information, and relationship to the child",
      },
      {
        number: 2,
        title: "Child Information",
        description: "Provide your child's full name, date of birth, and grade",
      },
      { number: 3, title: "Sport Details", description: "Specify the sport and team information" },
      { number: 4, title: "Medical Information", description: "List allergies, medications, and medical conditions" },
      { number: 5, title: "Authorization & Signature", description: "Review and authorize sports participation" },
    ],
    formFields: [
      { name: "parentName", label: "Parent/Guardian Full Name", type: "text", required: true },
      { name: "parentPhone", label: "Phone Number", type: "phone", required: true },
      { name: "childName", label: "Child's Full Name", type: "text", required: true },
      { name: "childDOB", label: "Child's Date of Birth", type: "date", required: true },
      { name: "grade", label: "Grade Level", type: "text", required: true },
      { name: "sport", label: "Sport", type: "text", required: true },
      { name: "team", label: "Team Name", type: "text", required: true },
      { name: "coach", label: "Coach Name", type: "text", required: true },
      { name: "allergies", label: "Known Allergies", type: "textarea", required: false },
      { name: "medications", label: "Current Medications", type: "textarea", required: false },
    ],
    faqItems: [
      {
        question: "Why do sports require consent forms?",
        answer:
          "Sports consent forms ensure parents are aware of the risks and provide medical information for emergencies.",
      },
      {
        question: "What medical information should I provide?",
        answer: "Include allergies, medications, medical conditions, and any previous sports injuries.",
      },
    ],
    relatedTemplates: ["contact-sports-consent-form", "water-sports-consent-form"],
  },

  "contact-sports-consent-form": {
    id: "contact-sports-consent",
    slug: "contact-sports-consent-form",
    title: "Contact Sports Consent Form",
    description: "Authorization for children to participate in contact sports",
    category: "sports-consent",
    keywords: ["contact sports consent", "football consent", "soccer consent", "contact sports authorization"],
    metaDescription:
      "Create a contact sports consent form for your child. Authorize contact sports participation with our professional template.",
    intro:
      "A contact sports consent form authorizes your child to participate in contact sports such as football, soccer, or hockey. This form documents your understanding of the risks involved.",
    steps: [
      {
        number: 1,
        title: "Parent/Guardian Information",
        description: "Enter your full name, contact information, and relationship to the child",
      },
      {
        number: 2,
        title: "Child Information",
        description: "Provide your child's full name, date of birth, and weight",
      },
      { number: 3, title: "Sport Details", description: "Specify the contact sport and team information" },
      { number: 4, title: "Medical History", description: "List allergies, medications, and previous injuries" },
      { number: 5, title: "Risk Acknowledgment", description: "Acknowledge understanding of contact sports risks" },
    ],
    formFields: [
      { name: "parentName", label: "Parent/Guardian Full Name", type: "text", required: true },
      { name: "parentPhone", label: "Phone Number", type: "phone", required: true },
      { name: "childName", label: "Child's Full Name", type: "text", required: true },
      { name: "childDOB", label: "Child's Date of Birth", type: "date", required: true },
      { name: "childWeight", label: "Child's Weight (lbs)", type: "text", required: true },
      { name: "sport", label: "Contact Sport", type: "text", required: true },
      { name: "team", label: "Team Name", type: "text", required: true },
      { name: "allergies", label: "Known Allergies", type: "textarea", required: false },
      { name: "previousInjuries", label: "Previous Sports Injuries", type: "textarea", required: false },
      { name: "concussionHistory", label: "History of Concussions", type: "textarea", required: false },
    ],
    faqItems: [
      {
        question: "What are the risks of contact sports?",
        answer: "Contact sports carry risks of injury including concussions, fractures, and sprains.",
      },
      {
        question: "What should I do if my child has a concussion?",
        answer: "Seek immediate medical attention and follow the doctor's return-to-play protocol.",
      },
    ],
    relatedTemplates: ["general-sports-consent-form", "water-sports-consent-form"],
  },

  "water-sports-consent-form": {
    id: "water-sports-consent",
    slug: "water-sports-consent-form",
    title: "Water Sports Consent Form",
    description: "Authorization for children to participate in water sports",
    category: "sports-consent",
    keywords: ["water sports consent", "swimming consent", "water safety", "aquatic sports authorization"],
    metaDescription:
      "Create a water sports consent form for your child. Authorize water sports participation with our professional template.",
    intro:
      "A water sports consent form authorizes your child to participate in water sports such as swimming, diving, or water polo. This form documents your consent and swimming ability.",
    steps: [
      {
        number: 1,
        title: "Parent/Guardian Information",
        description: "Enter your full name, contact information, and relationship to the child",
      },
      {
        number: 2,
        title: "Child Information",
        description: "Provide your child's full name, date of birth, and swimming ability",
      },
      { number: 3, title: "Water Sport Details", description: "Specify the water sport and facility information" },
      { number: 4, title: "Medical Information", description: "List allergies, medications, and medical conditions" },
      { number: 5, title: "Authorization & Signature", description: "Review and authorize water sports participation" },
    ],
    formFields: [
      { name: "parentName", label: "Parent/Guardian Full Name", type: "text", required: true },
      { name: "parentPhone", label: "Phone Number", type: "phone", required: true },
      { name: "childName", label: "Child's Full Name", type: "text", required: true },
      { name: "childDOB", label: "Child's Date of Birth", type: "date", required: true },
      {
        name: "swimmingAbility",
        label: "Swimming Ability",
        type: "select",
        required: true,
        options: ["Non-swimmer", "Beginner", "Intermediate", "Advanced"],
      },
      { name: "waterSport", label: "Water Sport", type: "text", required: true },
      { name: "facility", label: "Facility Name", type: "text", required: true },
      { name: "allergies", label: "Known Allergies", type: "textarea", required: false },
      { name: "medications", label: "Current Medications", type: "textarea", required: false },
    ],
    faqItems: [
      {
        question: "Is swimming ability important?",
        answer:
          "Yes, knowing your child's swimming ability helps instructors provide appropriate supervision and instruction.",
      },
      {
        question: "What water safety precautions are in place?",
        answer: "Most facilities have lifeguards, safety equipment, and trained staff to ensure water safety.",
      },
    ],
    relatedTemplates: ["general-sports-consent-form", "extreme-sports-consent-form"],
  },

  "extreme-sports-consent-form": {
    id: "extreme-sports-consent",
    slug: "extreme-sports-consent-form",
    title: "Extreme Sports Consent Form",
    description: "Authorization for children to participate in extreme sports",
    category: "sports-consent",
    keywords: [
      "extreme sports consent",
      "skateboarding consent",
      "rock climbing consent",
      "extreme sports authorization",
    ],
    metaDescription:
      "Create an extreme sports consent form for your child. Authorize extreme sports participation with our professional template.",
    intro:
      "An extreme sports consent form authorizes your child to participate in extreme sports such as skateboarding, rock climbing, or BMX biking. This form documents your understanding of the higher risks involved.",
    steps: [
      {
        number: 1,
        title: "Parent/Guardian Information",
        description: "Enter your full name, contact information, and relationship to the child",
      },
      {
        number: 2,
        title: "Child Information",
        description: "Provide your child's full name, date of birth, and experience level",
      },
      { number: 3, title: "Extreme Sport Details", description: "Specify the extreme sport and facility information" },
      { number: 4, title: "Medical Information", description: "List allergies, medications, and previous injuries" },
      { number: 5, title: "Risk Acknowledgment", description: "Acknowledge understanding of extreme sports risks" },
    ],
    formFields: [
      { name: "parentName", label: "Parent/Guardian Full Name", type: "text", required: true },
      { name: "parentPhone", label: "Phone Number", type: "phone", required: true },
      { name: "childName", label: "Child's Full Name", type: "text", required: true },
      { name: "childDOB", label: "Child's Date of Birth", type: "date", required: true },
      {
        name: "experienceLevel",
        label: "Experience Level",
        type: "select",
        required: true,
        options: ["Beginner", "Intermediate", "Advanced"],
      },
      { name: "extremeSport", label: "Extreme Sport", type: "text", required: true },
      { name: "facility", label: "Facility Name", type: "text", required: true },
      { name: "allergies", label: "Known Allergies", type: "textarea", required: false },
      { name: "previousInjuries", label: "Previous Injuries", type: "textarea", required: false },
    ],
    faqItems: [
      {
        question: "What are extreme sports?",
        answer:
          "Extreme sports are high-risk activities such as skateboarding, rock climbing, BMX biking, and parkour.",
      },
      {
        question: "What safety equipment is required?",
        answer:
          "Most extreme sports require helmets and protective gear. Check with your facility for specific requirements.",
      },
    ],
    relatedTemplates: ["contact-sports-consent-form", "water-sports-consent-form"],
  },

  "camp-sports-consent-form": {
    id: "camp-sports-consent",
    slug: "camp-sports-consent-form",
    title: "Sports Camp Consent Form",
    description: "Authorization for children to attend sports camps",
    category: "sports-consent",
    keywords: ["sports camp consent", "summer camp sports", "athletic camp authorization", "sports camp consent"],
    metaDescription:
      "Create a sports camp consent form for your child. Authorize sports camp attendance with our professional template.",
    intro:
      "A sports camp consent form authorizes your child to attend a sports camp. This form documents your consent and provides medical and emergency information.",
    steps: [
      {
        number: 1,
        title: "Parent/Guardian Information",
        description: "Enter your full name, contact information, and relationship to the child",
      },
      {
        number: 2,
        title: "Child Information",
        description: "Provide your child's full name, date of birth, and skill level",
      },
      { number: 3, title: "Camp Details", description: "Specify camp name, location, and dates" },
      { number: 4, title: "Medical Information", description: "List allergies, medications, and medical conditions" },
      { number: 5, title: "Authorization & Signature", description: "Review and authorize camp attendance" },
    ],
    formFields: [
      { name: "parentName", label: "Parent/Guardian Full Name", type: "text", required: true },
      { name: "parentPhone", label: "Phone Number", type: "phone", required: true },
      { name: "childName", label: "Child's Full Name", type: "text", required: true },
      { name: "childDOB", label: "Child's Date of Birth", type: "date", required: true },
      {
        name: "skillLevel",
        label: "Skill Level",
        type: "select",
        required: true,
        options: ["Beginner", "Intermediate", "Advanced"],
      },
      { name: "campName", label: "Camp Name", type: "text", required: true },
      { name: "sport", label: "Sport", type: "text", required: true },
      { name: "startDate", label: "Camp Start Date", type: "date", required: true },
      { name: "endDate", label: "Camp End Date", type: "date", required: true },
      { name: "allergies", label: "Known Allergies", type: "textarea", required: false },
    ],
    faqItems: [
      {
        question: "What should my child bring to sports camp?",
        answer:
          "Check with the camp for a packing list, but typically include athletic clothing, shoes, and any required equipment.",
      },
      {
        question: "What if my child gets injured at camp?",
        answer: "The camp should have medical staff on site and will contact you immediately if your child is injured.",
      },
    ],
    relatedTemplates: ["general-sports-consent-form", "camp-consent-form"],
  },

  "tournament-consent-form": {
    id: "tournament-consent",
    slug: "tournament-consent-form",
    title: "Sports Tournament Consent Form",
    description: "Authorization for children to participate in sports tournaments",
    category: "sports-consent",
    keywords: [
      "tournament consent",
      "sports tournament authorization",
      "competition consent",
      "tournament participation",
    ],
    metaDescription:
      "Create a sports tournament consent form for your child. Authorize tournament participation with our professional template.",
    intro:
      "A sports tournament consent form authorizes your child to participate in sports tournaments and competitions. This form documents your consent and provides emergency contact information.",
    steps: [
      {
        number: 1,
        title: "Parent/Guardian Information",
        description: "Enter your full name, contact information, and relationship to the child",
      },
      { number: 2, title: "Child Information", description: "Provide your child's full name, date of birth, and team" },
      { number: 3, title: "Tournament Details", description: "Specify tournament name, location, and dates" },
      { number: 4, title: "Medical Information", description: "List allergies, medications, and medical conditions" },
      { number: 5, title: "Authorization & Signature", description: "Review and authorize tournament participation" },
    ],
    formFields: [
      { name: "parentName", label: "Parent/Guardian Full Name", type: "text", required: true },
      { name: "parentPhone", label: "Phone Number", type: "phone", required: true },
      { name: "childName", label: "Child's Full Name", type: "text", required: true },
      { name: "childDOB", label: "Child's Date of Birth", type: "date", required: true },
      { name: "team", label: "Team Name", type: "text", required: true },
      { name: "tournamentName", label: "Tournament Name", type: "text", required: true },
      { name: "location", label: "Tournament Location", type: "text", required: true },
      { name: "startDate", label: "Tournament Start Date", type: "date", required: true },
      { name: "endDate", label: "Tournament End Date", type: "date", required: true },
      { name: "allergies", label: "Known Allergies", type: "textarea", required: false },
    ],
    faqItems: [
      {
        question: "What is a sports tournament?",
        answer: "A sports tournament is a competitive event where teams or individuals compete against each other.",
      },
      {
        question: "What should I expect at a tournament?",
        answer:
          "Expect multiple games or matches over one or more days, with your child competing against other teams.",
      },
    ],
    relatedTemplates: ["general-sports-consent-form", "camp-sports-consent-form"],
  },
}

export function getTemplateBySlug(slug: string): TemplateData | null {
  return templateDatabase[slug] || null
}

export function getRelatedTemplates(templateSlug: string): TemplateData[] {
  const template = getTemplateBySlug(templateSlug)
  if (!template) return []
  return template.relatedTemplates.map((slug) => getTemplateBySlug(slug)).filter((t): t is TemplateData => t !== null)
}
