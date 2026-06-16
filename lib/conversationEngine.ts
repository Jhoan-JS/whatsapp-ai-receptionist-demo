import { clinicProfile } from "@/lib/clinicProfile";
import type {
  ConversationEvent,
  ConversationIntent,
  ConversationResult,
  ConversationState,
  Lead,
  LeadCaptureField,
  LeadDraft,
  Language,
} from "@/types/chat";

type EventPayload = Omit<ConversationEvent, "id" | "createdAt" | "language">;

export const initialConversationState: ConversationState = {
  mode: "idle",
  leadDraft: {},
};

const leadFieldPrompts: Record<Language, Record<LeadCaptureField, string>> = {
  en: {
    name: "Great. What is the patient's full name?",
    phone: "Thanks. What phone number should the clinic use to follow up?",
    service: "What dental service do you need?",
    preferredTime: "What date and time would you prefer for the appointment?",
  },
  es: {
    name: "Perfecto. ¿Cuál es el nombre completo del paciente?",
    phone: "Gracias. ¿A qué número debe llamar la clínica para dar seguimiento?",
    service: "¿Qué servicio dental necesitas?",
    preferredTime: "¿Qué fecha y hora prefieres para la cita?",
  },
};

const localizedCopy = {
  en: {
    appointmentIntro:
      "Absolutely. I can collect the appointment request and send it to the clinic team.",
    restart:
      "Something went off track. Let's restart the appointment request.",
    priceIntro: `Here is the approximate self-pay price guide for ${clinicProfile.name}:`,
    priceOutro:
      "Final pricing depends on the dentist's evaluation and insurance coverage.",
    appointmentNudge:
      "Would you like me to collect your details for an appointment request?",
    hours: `Our hours are ${clinicProfile.hours.weekdays.en}, ${clinicProfile.hours.saturday.en}, and ${clinicProfile.hours.sunday.en}.`,
    location: `${clinicProfile.name} is located at ${clinicProfile.location}.`,
    servicesIntro: "We can help with",
    servicesOutro:
      "If you want, I can collect a quick appointment request for the clinic team.",
    emergencyOutro:
      "If you want an emergency appointment request, send me the patient's name and I will start the request.",
    unknown:
      "I am not fully sure about that, so I would flag this for a human team member instead of guessing.",
    unknownFollowUp:
      "For the demo, this conversation would appear in the clinic's follow-up queue as Needs human review.",
    cancelLeadCapture:
      "No problem. I will not collect your details right now. If you want an appointment later, just tell me.",
    capturedPrefix: "Thanks",
    capturedMiddle: "I have captured your request for",
    capturedAround: "around",
    capturedFollowUp:
      "The clinic team would now receive this lead and follow up to confirm availability.",
    serviceFallback: "General dental request",
    unknownPatient: "Unknown patient",
    notProvided: "Not provided",
    flexible: "Flexible",
    pricingTopic: "Prices",
    hoursTopic: "Working hours",
    locationTopic: "Location",
    servicesTopic: "Services",
    insuranceTopic: "Insurance",
    emergencyTopic: "Emergency",
    paymentTopic: "Payment methods",
    appointmentTopic: "Appointment request",
    humanTopic: "Human review",
  },
  es: {
    appointmentIntro:
      "Claro. Puedo tomar la solicitud de cita y enviarla al equipo de la clínica.",
    restart:
      "Algo se salió del flujo. Vamos a reiniciar la solicitud de cita.",
    priceIntro: `Esta es una guía aproximada de precios sin seguro para ${clinicProfile.name}:`,
    priceOutro:
      "El precio final depende de la evaluación del dentista y la cobertura del seguro.",
    appointmentNudge:
      "¿Quieres que tome tus datos para solicitar una cita?",
    hours: `Nuestro horario es ${clinicProfile.hours.weekdays.es}, ${clinicProfile.hours.saturday.es} y ${clinicProfile.hours.sunday.es}.`,
    location: `${clinicProfile.name} está ubicada en ${clinicProfile.location}.`,
    servicesIntro: "Podemos ayudar con",
    servicesOutro:
      "Si quieres, puedo tomar una solicitud rápida de cita para el equipo de la clínica.",
    emergencyOutro:
      "Si quieres solicitar una cita de emergencia, envíame el nombre del paciente y empiezo la solicitud.",
    unknown:
      "No estoy totalmente seguro sobre eso, así que lo marcaría para que una persona del equipo lo revise en vez de adivinar.",
    unknownFollowUp:
      "Para el demo, esta conversación aparecería en la cola de seguimiento como Necesita revisión humana.",
    cancelLeadCapture:
      "Está bien. No tomaré tus datos ahora. Si quieres solicitar una cita más tarde, solo dime.",
    capturedPrefix: "Gracias",
    capturedMiddle: "He registrado tu solicitud para",
    capturedAround: "alrededor de",
    capturedFollowUp:
      "El equipo de la clínica recibiría este prospecto y daría seguimiento para confirmar disponibilidad.",
    serviceFallback: "Solicitud dental general",
    unknownPatient: "Paciente sin nombre",
    notProvided: "No proporcionado",
    flexible: "Flexible",
    pricingTopic: "Precios",
    hoursTopic: "Horario",
    locationTopic: "Ubicación",
    servicesTopic: "Servicios",
    insuranceTopic: "Seguro",
    emergencyTopic: "Emergencia",
    paymentTopic: "Métodos de pago",
    appointmentTopic: "Solicitud de cita",
    humanTopic: "Revisión humana",
  },
} satisfies Record<Language, Record<string, string>>;

const fieldOrder: LeadCaptureField[] = [
  "name",
  "phone",
  "service",
  "preferredTime",
];

export function getConversationReply(
  userText: string,
  state: ConversationState,
  language: Language = "en",
): ConversationResult {
  const normalized = normalize(userText);

  if (state.mode === "collecting_lead" && state.nextField) {
    return continueLeadCapture(userText, state, language);
  }

  if (state.mode === "awaiting_appointment_confirmation") {
    return handlePendingAppointmentConfirmation(userText, normalized, language);
  }

  if (isAppointmentIntent(normalized)) {
    return startLeadCapture(userText, language);
  }

  const faqIntent = classifyFaqIntent(normalized);

  if (faqIntent) {
    return buildFaqReply(userText, faqIntent, language);
  }

  return idleReply(
    [localizedCopy[language].unknown, localizedCopy[language].unknownFollowUp],
    {
      type: "human_escalation",
      question: userText,
      intent: "human_escalation",
      serviceInterest: localizedCopy[language].humanTopic,
      needsHumanFollowUp: true,
    },
  );
}

function startLeadCapture(
  userText: string,
  language: Language,
): ConversationResult {
  return {
    botMessages: [
      localizedCopy[language].appointmentIntro,
      leadFieldPrompts[language].name,
    ],
    nextState: {
      mode: "collecting_lead",
      nextField: "name",
      leadDraft: {},
    },
    event: {
      type: "appointment_requested",
      question: userText,
      intent: "appointment_request",
      serviceInterest: localizedCopy[language].appointmentTopic,
      needsHumanFollowUp: false,
    },
  };
}

function continueLeadCapture(
  userText: string,
  state: ConversationState,
  language: Language,
): ConversationResult {
  const field = state.nextField;

  if (!field) {
    return idleReply([localizedCopy[language].restart]);
  }

  const updatedDraft = {
    ...state.leadDraft,
    [field]: userText.trim(),
  };
  const nextField = getNextLeadField(updatedDraft);

  if (nextField) {
    return {
      botMessages: [leadFieldPrompts[language][nextField]],
      nextState: {
        mode: "collecting_lead",
        nextField,
        leadDraft: updatedDraft,
      },
    };
  }

  const capturedLead = buildLead(updatedDraft, language);

  return {
    botMessages: [
      `${localizedCopy[language].capturedPrefix}, ${capturedLead.name}. ${localizedCopy[language].capturedMiddle} ${capturedLead.service} ${localizedCopy[language].capturedAround} ${capturedLead.preferredTime}.`,
      localizedCopy[language].capturedFollowUp,
    ],
    nextState: initialConversationState,
    capturedLead,
    followUpEvent: {
      type: "lead_capture_completed",
      question: `${capturedLead.name} - ${capturedLead.service}`,
      intent: "lead_completed",
      serviceInterest: capturedLead.service,
      needsHumanFollowUp: false,
      leadId: capturedLead.id,
    },
  };
}

function buildFaqReply(
  userText: string,
  intent: Exclude<ConversationIntent, "appointment_request" | "lead_completed" | "human_escalation" | "unknown">,
  language: Language,
): ConversationResult {
  const copy = localizedCopy[language];

  if (intent === "prices") {
    return idleReply(
      [
        `${copy.priceIntro} ${clinicProfile.priceGuide[language].join("; ")}. ${copy.priceOutro}`,
        copy.appointmentNudge,
      ],
      faqEvent(userText, intent, copy.pricingTopic),
      appointmentConfirmationState(userText, copy.pricingTopic),
    );
  }

  if (intent === "hours") {
    return idleReply([copy.hours], faqEvent(userText, intent, copy.hoursTopic));
  }

  if (intent === "location") {
    return idleReply(
      [copy.location],
      faqEvent(userText, intent, copy.locationTopic),
    );
  }

  if (intent === "services") {
    return idleReply(
      [
        `${copy.servicesIntro} ${clinicProfile.services[language].join(", ")}.`,
        copy.servicesOutro,
      ],
      faqEvent(userText, intent, copy.servicesTopic),
      appointmentConfirmationState(userText, copy.servicesTopic),
    );
  }

  if (intent === "insurance") {
    return idleReply(
      [clinicProfile.insurance[language]],
      faqEvent(userText, intent, copy.insuranceTopic),
    );
  }

  if (intent === "emergency") {
    return idleReply(
      [clinicProfile.emergency[language], copy.emergencyOutro],
      faqEvent(userText, intent, copy.emergencyTopic),
      appointmentConfirmationState(userText, copy.emergencyTopic),
    );
  }

  return idleReply(
    [clinicProfile.paymentMethods[language]],
    faqEvent(userText, intent, copy.paymentTopic),
  );
}

function faqEvent(
  question: string,
  intent: ConversationIntent,
  serviceInterest: string,
): EventPayload {
  return {
    type: "faq_asked",
    question,
    intent,
    serviceInterest,
    needsHumanFollowUp: false,
  };
}

function getNextLeadField(draft: LeadDraft): LeadCaptureField | undefined {
  return fieldOrder.find((field) => !draft[field]?.trim());
}

function buildLead(draft: LeadDraft, language: Language): Lead {
  return {
    id: `lead-${Date.now()}`,
    name: draft.name?.trim() || localizedCopy[language].unknownPatient,
    phone: draft.phone?.trim() || localizedCopy[language].notProvided,
    service: draft.service?.trim() || localizedCopy[language].serviceFallback,
    preferredTime: draft.preferredTime?.trim() || localizedCopy[language].flexible,
    status: "appointment_requested",
    createdAt: new Date().toISOString(),
    source: "demo_chat",
    conversationType: "appointment_request",
    needsHumanFollowUp: false,
    isHot: true,
    questionTopic: localizedCopy[language].appointmentTopic,
    language,
  };
}

function handlePendingAppointmentConfirmation(
  userText: string,
  normalized: string,
  language: Language,
): ConversationResult {
  if (isAffirmativeReply(normalized)) {
    return {
      botMessages: [getConfirmationNamePrompt(language)],
      nextState: {
        mode: "collecting_lead",
        nextField: "name",
        leadDraft: {},
      },
      event: {
        type: "appointment_requested",
        question: userText,
        intent: "appointment_request",
        serviceInterest: localizedCopy[language].appointmentTopic,
        needsHumanFollowUp: false,
      },
    };
  }

  if (isNegativeReply(normalized)) {
    return idleReply([localizedCopy[language].cancelLeadCapture]);
  }

  return idleReply(
    [localizedCopy[language].unknown, localizedCopy[language].unknownFollowUp],
    {
      type: "human_escalation",
      question: userText,
      intent: "human_escalation",
      serviceInterest: localizedCopy[language].humanTopic,
      needsHumanFollowUp: true,
    },
  );
}

function appointmentConfirmationState(
  question: string,
  serviceInterest: string,
): ConversationState {
  return {
    mode: "awaiting_appointment_confirmation",
    leadDraft: {},
    pendingQuestion: question,
    pendingServiceInterest: serviceInterest,
  };
}

function idleReply(
  botMessages: string[],
  event?: EventPayload,
  nextState: ConversationState = initialConversationState,
): ConversationResult {
  return {
    botMessages,
    nextState,
    event,
  };
}

function classifyFaqIntent(
  normalized: string,
): Exclude<ConversationIntent, "appointment_request" | "lead_completed" | "human_escalation" | "unknown"> | undefined {
  if (matchesAny(normalized, ["price", "precio", "costo", "cost", "how much", "cuanto", "charge", "fee", "tarifa"])) {
    return "prices";
  }

  if (matchesAny(normalized, ["hour", "horario", "hora", "open", "abren", "close", "cierran", "schedule"])) {
    return "hours";
  }

  if (matchesAny(normalized, ["location", "ubicacion", "direccion", "address", "where", "donde", "directions"])) {
    return "location";
  }

  if (matchesAny(normalized, ["service", "servicio", "cleaning", "limpieza", "whitening", "blanqueamiento", "filling", "empaste", "root canal", "endodoncia", "braces", "brackets", "aligner", "alineador", "crown", "corona"])) {
    return "services";
  }

  if (matchesAny(normalized, ["insurance", "seguro", "ppo", "coverage", "cobertura", "plan"])) {
    return "insurance";
  }

  if (matchesAny(normalized, ["emergency", "emergencia", "emergencias", "urgent", "urgente", "pain", "dolor", "swelling", "hinchazon", "bleeding", "sangrado", "trauma", "broken tooth", "diente roto"])) {
    return "emergency";
  }

  if (matchesAny(normalized, ["payment", "pago", "pay", "pagar", "card", "tarjeta", "cash", "efectivo", "zelle", "financing", "financiamiento"])) {
    return "payment_methods";
  }

  return undefined;
}

function isAppointmentIntent(normalized: string) {
  return matchesAny(normalized, [
    "appointment",
    "cita",
    "book",
    "reservar",
    "schedule",
    "agendar",
    "programar",
    "visit",
    "visita",
    "consult",
    "consulta",
    "reserve",
  ]);
}

function isAffirmativeReply(normalized: string) {
  const reply = normalizeShortReply(normalized);

  return [
    "si",
    "claro",
    "dale",
    "ok",
    "okay",
    "perfecto",
    "yes",
    "yeah",
    "sure",
    "please do",
  ].includes(reply);
}

function isNegativeReply(normalized: string) {
  const reply = normalizeShortReply(normalized);

  return [
    "no",
    "ahora no",
    "luego",
    "no gracias",
    "not now",
    "later",
    "no thanks",
  ].includes(reply);
}

function getConfirmationNamePrompt(language: Language) {
  if (language === "es") {
    return "Perfecto. ¿Cuál es tu nombre?";
  }

  return leadFieldPrompts.en.name;
}

function matchesAny(value: string, terms: string[]) {
  return terms.some((term) => value.includes(term));
}

function normalizeShortReply(value: string) {
  return value.replace(/[.!?¡¿]/g, "").trim();
}

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}
