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
    en: "For severe pain, swelling, bleeding, or dental trauma, we recommend requesting an emergency visit. If symptoms are life-threatening, call emergency services first.",
    es: "Para dolor fuerte, hinchazón, sangrado o trauma dental, recomendamos solicitar una visita de emergencia. Si los síntomas ponen en riesgo la vida, llama primero a emergencias.",
  },
  priceGuide: {
    en: [
      "Routine cleaning: about $90 to $150 without insurance",
      "Teeth whitening: about $250 to $450",
      "Filling: about $150 to $350 depending on size and material",
      "Emergency evaluation: about $75 to $125",
      "Root canal: usually starts around $850, depending on the tooth",
    ],
    es: [
      "Limpieza rutinaria: aprox. $90 a $150 sin seguro",
      "Blanqueamiento dental: aprox. $250 a $450",
      "Empaste: aprox. $150 a $350 según tamaño y material",
      "Evaluación de emergencia: aprox. $75 a $125",
      "Endodoncia: usualmente empieza alrededor de $850, según la pieza dental",
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
      es: "Preguntar emergencia",
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
