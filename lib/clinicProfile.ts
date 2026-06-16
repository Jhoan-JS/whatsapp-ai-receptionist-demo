import type { Language, QuickReplyOption } from "@/types/chat";

type LocalizedString = Record<Language, string>;

export const clinicProfile = {
  name: "Sonrisa Dental Studio",
  whatsappNumber: "(555) 014-2026",
  location: "1840 Coral Avenue, Suite 204, Miami, FL",
  hours: {
    weekdays: {
      en: "Monday to Friday, 8:00 AM to 6:00 PM",
      es: "lunes a viernes, 8:00 AM a 6:00 PM",
    },
    saturday: {
      en: "Saturday, 9:00 AM to 2:00 PM",
      es: "sábado, 9:00 AM a 2:00 PM",
    },
    sunday: {
      en: "Closed on Sunday",
      es: "cerrado los domingos",
    },
  },
  services: {
    en: [
      "Dental cleaning",
      "Whitening",
      "Fillings",
      "Root canals",
      "Crowns",
      "Braces and clear aligner consults",
      "Emergency dental evaluations",
    ],
    es: [
      "Limpieza dental",
      "Blanqueamiento",
      "Empastes",
      "Endodoncias",
      "Coronas",
      "Consultas de brackets y alineadores",
      "Evaluaciones dentales de emergencia",
    ],
  },
  insurance: {
    en: "We accept many PPO dental plans. For the demo, the clinic team would verify coverage before confirming treatment.",
    es: "Aceptamos muchos planes dentales PPO. Para el demo, el equipo de la clínica verificaría la cobertura antes de confirmar el tratamiento.",
  },
  paymentMethods: {
    en: "Patients can pay by card, cash, Zelle, and most HSA/FSA cards. Payment plans may be available for larger treatments.",
    es: "Los pacientes pueden pagar con tarjeta, efectivo, Zelle y la mayoría de tarjetas HSA/FSA. Puede haber planes de pago para tratamientos grandes.",
  },
  emergency: {
    en: "If you have severe pain, major swelling, bleeding, dental trauma, or an urgent dental emergency, contact the clinic directly or visit an emergency center.",
    es: "Si tienes dolor fuerte, inflamación severa, sangrado, golpe en un diente o una emergencia dental, contacta directamente a la clínica o acude a un centro de emergencia.",
  },
  priceGuide: {
    en: [
      "Prices vary depending on the evaluation and treatment needed",
      "The clinic team should confirm pricing and availability before treatment",
    ],
    es: [
      "Los precios varían según la evaluación y el tratamiento necesario",
      "El equipo de la clínica debe confirmar costo y disponibilidad antes del tratamiento",
    ],
  },
};

export const quickReplyOptions: QuickReplyOption[] = [
  {
    label: {
      en: "Ask about prices",
      es: "Preguntar precios",
    },
    prompt: {
      en: "Can you tell me your prices?",
      es: "¿Me puedes decir los precios?",
    },
  },
  {
    label: {
      en: "Request appointment",
      es: "Solicitar cita",
    },
    prompt: {
      en: "I want to request an appointment.",
      es: "Quiero solicitar una cita.",
    },
  },
  {
    label: {
      en: "Ask about emergency",
      es: "Preguntar por emergencia",
    },
    prompt: {
      en: "Do you handle dental emergencies?",
      es: "¿Atienden emergencias dentales?",
    },
  },
  {
    label: {
      en: "Ask complex question",
      es: "Pregunta compleja",
    },
    prompt: {
      en: "I had previous treatment at another office and need clinical guidance before deciding what to do next.",
      es: "Tuve un tratamiento en otra clínica y necesito orientación clínica antes de decidir qué hacer.",
    },
  },
];

export const languageLabels: Record<Language, LocalizedString> = {
  en: {
    en: "English",
    es: "Inglés",
  },
  es: {
    en: "Spanish",
    es: "Español",
  },
};
