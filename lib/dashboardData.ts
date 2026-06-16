import type {
  ConversationEvent,
  ConversationIntent,
  ConversationType,
  Language,
  Lead,
  LeadStatus,
} from "@/types/chat";

export interface CommonQuestion {
  id: string;
  topic: string;
  count: number;
  example: string;
}

export interface SummaryCardData {
  id: string;
  label: string;
  value: number;
  detail: string;
  tone: "standard" | "urgent" | "warm" | "success";
}

export interface LeadTag {
  label: string;
  tone: "neutral" | "success" | "warm" | "urgent";
}

const sourceLabels: Record<Language, Record<Lead["source"], string>> = {
  en: {
    demo_chat: "Chat simulator",
    demo_seed: "Demo example",
  },
  es: {
    demo_chat: "Simulador de chat",
    demo_seed: "Ejemplo demo",
  },
};

const conversationLabels: Record<Language, Record<ConversationType, string>> = {
  en: {
    appointment_request: "Appointment request",
    complex_question: "Complex question",
    emergency: "Emergency inquiry",
    faq: "FAQ conversation",
  },
  es: {
    appointment_request: "Solicitud de cita",
    complex_question: "Pregunta compleja",
    emergency: "Consulta de emergencia",
    faq: "Conversación de FAQ",
  },
};

const statusLabels: Record<Language, Record<LeadStatus, string>> = {
  en: {
    appointment_requested: "Appointment Requested",
    needs_human: "Needs Human Follow-Up",
    new: "New Lead",
  },
  es: {
    appointment_requested: "Solicitud de cita",
    needs_human: "Necesita seguimiento humano",
    new: "Nuevo prospecto",
  },
};

const intentLabels: Record<Language, Record<ConversationIntent, string>> = {
  en: {
    appointment_request: "Appointment requests",
    emergency: "Emergency questions",
    hours: "Working hours",
    human_escalation: "Human review",
    insurance: "Insurance",
    lead_completed: "Completed lead captures",
    location: "Location",
    payment_methods: "Payment methods",
    prices: "Prices",
    services: "Services",
    unknown: "Unknown questions",
  },
  es: {
    appointment_request: "Solicitudes de cita",
    emergency: "Preguntas de emergencia",
    hours: "Horario",
    human_escalation: "Revisión humana",
    insurance: "Seguro",
    lead_completed: "Leads completados",
    location: "Ubicación",
    payment_methods: "Métodos de pago",
    prices: "Precios",
    services: "Servicios",
    unknown: "Preguntas desconocidas",
  },
};

const summaryCopy = {
  en: {
    totalNewLeads: "Total new leads",
    totalNewLeadsDetail: "Patients captured while the clinic was busy",
    appointments: "Appointment requests",
    appointmentsDetail: "Ready for staff confirmation",
    hotLeads: "Hot leads",
    hotLeadsDetail: "Urgent or high-intent conversations",
    humanEscalations: "Human escalations",
    humanEscalationsDetail: "Needs staff follow-up instead of guessing",
  },
  es: {
    totalNewLeads: "Nuevos prospectos",
    totalNewLeadsDetail: "Pacientes capturados mientras la clínica estaba ocupada",
    appointments: "Solicitudes de cita",
    appointmentsDetail: "Listas para confirmación del equipo",
    hotLeads: "Prospectos calientes",
    hotLeadsDetail: "Conversaciones urgentes o de alta intención",
    humanEscalations: "Seguimiento humano",
    humanEscalationsDetail: "Necesita revisión del equipo en vez de adivinar",
  },
} satisfies Record<Language, Record<string, string>>;

const fallbackLeadCopy = {
  en: {
    notes:
      "Captured by the receptionist demo. Clinic staff can use this as the follow-up record.",
    lastMessage: (service: string) =>
      `Patient requested help with ${service.toLowerCase()}.`,
  },
  es: {
    notes:
      "Capturado por el demo del recepcionista. El equipo puede usarlo como registro de seguimiento.",
    lastMessage: (service: string) =>
      `El paciente pidió ayuda con ${service.toLowerCase()}.`,
  },
} satisfies Record<
  Language,
  { notes: string; lastMessage: (service: string) => string }
>;

const commonQuestions: Record<Language, CommonQuestion[]> = {
  en: [
    {
      id: "prices",
      topic: "Prices",
      count: 9,
      example: "How much is a cleaning or whitening?",
    },
    {
      id: "availability",
      topic: "Availability",
      count: 7,
      example: "Do you have anything this week?",
    },
    {
      id: "insurance",
      topic: "Insurance",
      count: 5,
      example: "Do you accept PPO insurance?",
    },
    {
      id: "emergencies",
      topic: "Emergencies",
      count: 4,
      example: "Can I be seen today for tooth pain?",
    },
  ],
  es: [
    {
      id: "prices",
      topic: "Precios",
      count: 9,
      example: "¿Cuánto cuesta una limpieza o un blanqueamiento?",
    },
    {
      id: "availability",
      topic: "Disponibilidad",
      count: 7,
      example: "¿Tienen algún espacio esta semana?",
    },
    {
      id: "insurance",
      topic: "Seguro",
      count: 5,
      example: "¿Aceptan seguro dental PPO?",
    },
    {
      id: "emergencies",
      topic: "Emergencias",
      count: 4,
      example: "¿Me pueden ver hoy por dolor dental?",
    },
  ],
};

export function getDemoSeedLeads(language: Language = "en"): Lead[] {
  if (language === "es") {
    return [
      {
        id: "seed-lead-1",
        name: "Ana Rodríguez",
        phone: "(555) 010-7788",
        service: "Evaluación dental de emergencia",
        preferredTime: "Hoy después de las 3 PM",
        status: "appointment_requested",
        createdAt: "2026-06-16T13:42:00.000Z",
        source: "demo_seed",
        conversationType: "emergency",
        needsHumanFollowUp: true,
        isHot: true,
        questionTopic: "Emergencia",
        notes:
          "La paciente reportó hinchazón y pidió disponibilidad para el mismo día. Buen ejemplo de seguimiento urgente.",
        lastMessage:
          "Tengo hinchazón cerca de una muela y necesito saber si me pueden ver hoy.",
      },
      {
        id: "seed-lead-2",
        name: "Carlos Méndez",
        phone: "(555) 018-4412",
        service: "Limpieza dental",
        preferredTime: "Jueves en la mañana",
        status: "appointment_requested",
        createdAt: "2026-06-16T13:14:00.000Z",
        source: "demo_seed",
        conversationType: "appointment_request",
        needsHumanFollowUp: false,
        isHot: false,
        questionTopic: "Disponibilidad",
        notes:
          "Solicitud sencilla de limpieza. La clínica debe confirmar una hora exacta.",
        lastMessage: "Quisiera agendar una limpieza esta semana si es posible.",
      },
      {
        id: "seed-lead-3",
        name: "Priya Shah",
        phone: "(555) 017-9021",
        service: "Consulta de blanqueamiento",
        preferredTime: "Viernes al mediodía",
        status: "new",
        createdAt: "2026-06-16T12:44:00.000Z",
        source: "demo_seed",
        conversationType: "faq",
        needsHumanFollowUp: false,
        isHot: true,
        questionTopic: "Precios",
        notes:
          "Hizo varias preguntas de precios y mostró interés en blanqueamiento antes de un evento.",
        lastMessage:
          "¿Puedo hacerme un blanqueamiento antes del próximo fin de semana y cuánto cuesta?",
      },
      {
        id: "seed-lead-4",
        name: "Luis Fernández",
        phone: "(555) 012-6609",
        service: "Pregunta clínica compleja",
        preferredTime: "Flexible",
        status: "needs_human",
        createdAt: "2026-06-16T12:05:00.000Z",
        source: "demo_seed",
        conversationType: "complex_question",
        needsHumanFollowUp: true,
        isHot: false,
        questionTopic: "Revisión humana",
        notes:
          "El asistente evitó adivinar y marcó la conversación para revisión del equipo.",
        lastMessage:
          "Tengo un historial médico complejo y necesito orientación clínica antes de decidir qué hacer.",
      },
    ];
  }

  return [
    {
      id: "seed-lead-1",
      name: "Ana Rodriguez",
      phone: "(555) 010-7788",
      service: "Emergency dental evaluation",
      preferredTime: "Today after 3 PM",
      status: "appointment_requested",
      createdAt: "2026-06-16T13:42:00.000Z",
      source: "demo_seed",
      conversationType: "emergency",
      needsHumanFollowUp: true,
      isHot: true,
      questionTopic: "Emergency",
      notes:
        "Patient reported swelling and asked for same-day availability. Best demo example of urgent follow-up.",
      lastMessage:
        "I have swelling near a back tooth and need to know if I can be seen today.",
    },
    {
      id: "seed-lead-2",
      name: "Carlos Mendez",
      phone: "(555) 018-4412",
      service: "Dental cleaning",
      preferredTime: "Thursday morning",
      status: "appointment_requested",
      createdAt: "2026-06-16T13:14:00.000Z",
      source: "demo_seed",
      conversationType: "appointment_request",
      needsHumanFollowUp: false,
      isHot: false,
      questionTopic: "Availability",
      notes:
        "Straightforward cleaning request. Clinic should confirm an exact time.",
      lastMessage: "I would like to schedule a cleaning this week if possible.",
    },
    {
      id: "seed-lead-3",
      name: "Priya Shah",
      phone: "(555) 017-9021",
      service: "Whitening consultation",
      preferredTime: "Friday at lunch",
      status: "new",
      createdAt: "2026-06-16T12:44:00.000Z",
      source: "demo_seed",
      conversationType: "faq",
      needsHumanFollowUp: false,
      isHot: true,
      questionTopic: "Prices",
      notes:
        "Asked several pricing questions and showed interest in whitening before an event.",
      lastMessage: "Can I get whitening before next weekend, and what does it cost?",
    },
    {
      id: "seed-lead-4",
      name: "Luis Fernandez",
      phone: "(555) 012-6609",
      service: "Complex clinical question",
      preferredTime: "Flexible",
      status: "needs_human",
      createdAt: "2026-06-16T12:05:00.000Z",
      source: "demo_seed",
      conversationType: "complex_question",
      needsHumanFollowUp: true,
      isHot: false,
      questionTopic: "Human review",
      notes:
        "The assistant avoided guessing and flagged the conversation for staff review.",
      lastMessage:
        "I have a complicated medical history and need clinical guidance before deciding what to do next.",
    },
  ];
}

export function normalizeLeadForDashboard(
  lead: Lead,
  language: Language = "en",
): Lead {
  const conversationType =
    lead.conversationType || inferConversationType(lead.status, lead.service);
  const needsHumanFollowUp =
    lead.needsHumanFollowUp ?? lead.status === "needs_human";
  const fallback = fallbackLeadCopy[language];

  return {
    ...lead,
    conversationType,
    needsHumanFollowUp,
    isHot: lead.isHot ?? inferHotLead(lead),
    questionTopic:
      lead.questionTopic || getConversationTypeLabel(conversationType, language),
    notes: lead.notes || fallback.notes,
    lastMessage: lead.lastMessage || fallback.lastMessage(lead.service),
  };
}

export function buildDashboardLeads(
  storedLeads: Lead[],
  language: Language = "en",
) {
  const normalizedStoredLeads = storedLeads.map((lead) =>
    normalizeLeadForDashboard(lead, language),
  );
  const seedLeads = getDemoSeedLeads(language).map((lead) =>
    normalizeLeadForDashboard(lead, language),
  );

  return [...normalizedStoredLeads, ...seedLeads];
}

export function buildSummaryCards(
  leads: Lead[],
  events: ConversationEvent[] = [],
  language: Language = "en",
): SummaryCardData[] {
  const totalNewLeads = leads.length;
  const leadAppointmentRequests = leads.filter(
    (lead) => lead.status === "appointment_requested",
  ).length;
  const eventAppointmentRequests = events.filter(
    (event) => event.type === "appointment_requested",
  ).length;
  const leadHotCount = leads.filter((lead) => lead.isHot).length;
  const eventHotCount = events.filter((event) =>
    ["appointment_request", "emergency", "lead_completed"].includes(event.intent),
  ).length;
  const leadHumanEscalations = leads.filter(
    (lead) => lead.needsHumanFollowUp || lead.status === "needs_human",
  ).length;
  const eventHumanEscalations = events.filter(
    (event) => event.needsHumanFollowUp || event.type === "human_escalation",
  ).length;
  const appointmentRequests = Math.max(
    leadAppointmentRequests,
    eventAppointmentRequests,
  );
  const hotLeads = Math.max(leadHotCount, eventHotCount);
  const humanEscalations = Math.max(
    leadHumanEscalations,
    eventHumanEscalations,
  );
  const copy = summaryCopy[language];

  return [
    {
      id: "new-leads",
      label: copy.totalNewLeads,
      value: totalNewLeads,
      detail: copy.totalNewLeadsDetail,
      tone: "standard",
    },
    {
      id: "appointments",
      label: copy.appointments,
      value: appointmentRequests,
      detail: copy.appointmentsDetail,
      tone: "success",
    },
    {
      id: "hot-leads",
      label: copy.hotLeads,
      value: hotLeads,
      detail: copy.hotLeadsDetail,
      tone: "warm",
    },
    {
      id: "human-escalations",
      label: copy.humanEscalations,
      value: humanEscalations,
      detail: copy.humanEscalationsDetail,
      tone: "urgent",
    },
  ];
}

export function buildCommonQuestionsFromEvents(
  events: ConversationEvent[],
  language: Language = "en",
): CommonQuestion[] {
  const questionEvents = events.filter((event) =>
    ["faq_asked", "human_escalation", "complex_question_asked"].includes(
      event.type,
    ),
  );

  if (questionEvents.length === 0) {
    return commonQuestions[language];
  }

  const groupedEvents = new Map<
    ConversationIntent,
    { count: number; latestQuestion: string; languages: Set<string> }
  >();

  for (const event of questionEvents) {
    const existing = groupedEvents.get(event.intent);

    if (existing) {
      existing.count += 1;
      existing.languages.add(event.language.toUpperCase());
      continue;
    }

    groupedEvents.set(event.intent, {
      count: 1,
      latestQuestion: event.question,
      languages: new Set([event.language.toUpperCase()]),
    });
  }

  return Array.from(groupedEvents.entries())
    .map(([intent, group]) => ({
      id: intent,
      topic: `${intentLabels[language][intent] || intentLabels[language].unknown} (${formatLanguages(
        group.languages,
      )})`,
      count: group.count,
      example: group.latestQuestion,
    }))
    .sort((a, b) => b.count - a.count);
}

function formatLanguages(languages: Set<string>) {
  return Array.from(languages).sort().join("/");
}

export function getStatusLabel(status: LeadStatus, language: Language = "en") {
  return statusLabels[language][status];
}

export function getConversationTypeLabel(
  type: ConversationType,
  language: Language = "en",
) {
  return conversationLabels[language][type];
}

export function getSourceLabel(
  source: Lead["source"],
  language: Language = "en",
) {
  return sourceLabels[language][source];
}

export function getLeadTags(
  lead: Lead,
  language: Language = "en",
): LeadTag[] {
  const tags: LeadTag[] = [
    {
      label: getStatusLabel(lead.status, language),
      tone: lead.status === "needs_human" ? "urgent" : "success",
    },
  ];

  if (lead.status !== "appointment_requested" && lead.conversationType) {
    tags.push({
      label: getConversationTypeLabel(lead.conversationType, language),
      tone: "neutral",
    });
  }

  if (lead.isHot) {
    tags.push({
      label: language === "es" ? "Prospecto caliente" : "Hot Lead",
      tone: "warm",
    });
  }

  if (lead.needsHumanFollowUp) {
    tags.push({
      label:
        language === "es"
          ? "Necesita seguimiento humano"
          : "Needs Human Follow-Up",
      tone: "urgent",
    });
  }

  return dedupeTags(tags);
}

function inferConversationType(
  status: LeadStatus,
  service: string,
): ConversationType {
  const serviceText = service.toLowerCase();

  if (status === "needs_human") {
    return "complex_question";
  }

  if (
    serviceText.includes("emergency") ||
    serviceText.includes("emergencia") ||
    serviceText.includes("pain") ||
    serviceText.includes("dolor")
  ) {
    return "emergency";
  }

  if (status === "appointment_requested") {
    return "appointment_request";
  }

  return "faq";
}

function inferHotLead(lead: Lead) {
  const serviceText = lead.service.toLowerCase();

  return (
    lead.status === "appointment_requested" ||
    serviceText.includes("emergency") ||
    serviceText.includes("emergencia") ||
    serviceText.includes("pain") ||
    serviceText.includes("dolor") ||
    serviceText.includes("root canal") ||
    serviceText.includes("endodoncia") ||
    serviceText.includes("whitening") ||
    serviceText.includes("blanqueamiento")
  );
}

function dedupeTags(tags: LeadTag[]) {
  const seen = new Set<string>();

  return tags.filter((tag) => {
    if (seen.has(tag.label)) {
      return false;
    }

    seen.add(tag.label);
    return true;
  });
}
