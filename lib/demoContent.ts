import type { Language } from "@/types/chat";

type Localized<T> = Record<Language, T>;

export type DemoScenarioId =
  | "pricing"
  | "appointment"
  | "emergency"
  | "complex";

export function isDemoScenarioId(value: string | null): value is DemoScenarioId {
  return (
    value === "pricing" ||
    value === "appointment" ||
    value === "emergency" ||
    value === "complex"
  );
}

export const demoContent = {
  nav: {
    en: {
      patientChat: "Patient chat demo",
      dashboard: "Clinic owner dashboard",
      requestDemo: "Request a demo",
      languageLabel: "Sales demo language",
    },
    es: {
      patientChat: "Demo de chat del paciente",
      dashboard: "Panel del dueño",
      requestDemo: "Solicitar demo",
      languageLabel: "Idioma del demo comercial",
    },
  } satisfies Localized<Record<string, string>>,

  hero: {
    en: {
      eyebrow: "Dental clinic demo",
      headline: "Stop losing patients to slow replies",
      subheadline:
        "This AI receptionist answers instantly, captures appointment requests, identifies hot leads, and tells your team who needs follow-up.",
      primaryCta: "Start the patient demo",
      secondaryCta: "View owner dashboard",
      proofPoints: [
        { value: "24/7", label: "instant FAQ answers" },
        { value: "4 fields", label: "captured per appointment request" },
        { value: "Daily", label: "owner-ready lead summary" },
      ],
      visualMessages: [
        "New WhatsApp message",
        "Appointment request captured",
        "Needs follow-up",
      ],
    },
    es: {
      eyebrow: "Demo para clínica dental",
      headline: "Deja de perder pacientes por respuestas lentas",
      subheadline:
        "Este recepcionista de IA responde al instante, captura solicitudes de cita, identifica leads calientes y le dice a tu equipo quién necesita seguimiento.",
      primaryCta: "Iniciar demo del paciente",
      secondaryCta: "Ver panel del dueño",
      proofPoints: [
        { value: "24/7", label: "respuestas instantáneas a FAQs" },
        { value: "4 datos", label: "capturados por solicitud de cita" },
        { value: "Diario", label: "resumen listo para el dueño" },
      ],
      visualMessages: [
        "Nuevo mensaje de WhatsApp",
        "Solicitud de cita capturada",
        "Necesita seguimiento",
      ],
    },
  } satisfies Localized<{
    eyebrow: string;
    headline: string;
    subheadline: string;
    primaryCta: string;
    secondaryCta: string;
    proofPoints: { value: string; label: string }[];
    visualMessages: string[];
  }>,

  value: {
    en: {
      eyebrow: "MVP value",
      headline: "A receptionist that never forgets to follow up",
      intro:
        "The demo is built around the highest-value job: turning WhatsApp conversations into organized appointment opportunities.",
      items: [
        {
          title: "Answers common questions",
          description:
            "Prices, hours, location, insurance, services, payment methods, and emergencies are answered immediately.",
        },
        {
          title: "Captures the lead",
          description:
            "Name, phone, service of interest, and preferred appointment time are collected in a structured way.",
        },
        {
          title: "Highlights what matters",
          description:
            "Hot leads and uncertain questions are surfaced so the clinic team knows who to call first.",
        },
      ],
    },
    es: {
      eyebrow: "Valor del MVP",
      headline: "Un recepcionista que no olvida dar seguimiento",
      intro:
        "El demo se enfoca en el trabajo de mayor valor: convertir conversaciones de WhatsApp en oportunidades de cita organizadas.",
      items: [
        {
          title: "Responde preguntas comunes",
          description:
            "Precios, horario, ubicación, seguro, servicios, métodos de pago y emergencias se responden al instante.",
        },
        {
          title: "Captura el lead",
          description:
            "Nombre, teléfono, servicio de interés y horario preferido se recopilan de forma estructurada.",
        },
        {
          title: "Resalta lo importante",
          description:
            "Los leads calientes y preguntas inciertas se muestran para que el equipo sepa a quien llamar primero.",
        },
      ],
    },
  } satisfies Localized<{
    eyebrow: string;
    headline: string;
    intro: string;
    items: { title: string; description: string }[];
  }>,

  problem: {
    en: {
      headline: "Why clinics lose patients in WhatsApp",
      description:
        "The problem is not only missed messages. It is missing structure when someone is ready to book.",
      items: [
        {
          title: "Late replies",
          description:
            "Patients ask after hours, wait too long, and book with the next clinic that responds.",
        },
        {
          title: "Lost appointment intent",
          description:
            "A patient says they want a visit, but nobody collects the details needed to follow up.",
        },
        {
          title: "No escalation queue",
          description:
            "Complex questions stay mixed in with routine messages instead of being reviewed by the team.",
        },
        {
          title: "No daily summary",
          description:
            "The owner cannot quickly see new leads, hot leads, and missed follow-up opportunities.",
        },
      ],
    },
    es: {
      headline: "Por qué las clínicas pierden pacientes en WhatsApp",
      description:
        "El problema no es solo perder mensajes. Es perder estructura cuando alguien está listo para reservar.",
      items: [
        {
          title: "Respuestas tardías",
          description:
            "Los pacientes preguntan fuera de horario, esperan demasiado y reservan con la próxima clínica que responde.",
        },
        {
          title: "Intencion de cita perdida",
          description:
            "Un paciente dice que quiere una visita, pero nadie recopila los datos necesarios para dar seguimiento.",
        },
        {
          title: "Sin cola de escalación",
          description:
            "Las preguntas complejas quedan mezcladas con mensajes rutinarios en vez de ser revisadas por el equipo.",
        },
        {
          title: "Sin resumen diario",
          description:
            "El dueño no puede ver rápidamente nuevos leads, leads calientes y oportunidades pendientes.",
        },
      ],
    },
  } satisfies Localized<{
    headline: string;
    description: string;
    items: { title: string; description: string }[];
  }>,

  beforeAfter: {
    en: {
      headline: "Before vs After",
      before: {
        label: "Before",
        title: "Manual WhatsApp",
        items: [
          "Missed messages after hours",
          "Slow replies and unclear ownership",
          "Appointment requests buried in chat",
          "No reliable follow-up list",
          "Lost appointments from patients who moved on",
        ],
      },
      after: {
        label: "After",
        title: "AI receptionist demo",
        items: [
          "Instant answers for common questions",
          "Structured appointment requests",
          "Captured leads with service and preferred time",
          "Human escalation queue for uncertain questions",
          "Owner summary showing who needs follow-up",
        ],
      },
    },
    es: {
      headline: "Antes vs después",
      before: {
        label: "Antes",
        title: "WhatsApp manual",
        items: [
          "Mensajes perdidos fuera de horario",
          "Respuestas lentas y poca responsabilidad clara",
          "Solicitudes de cita enterradas en el chat",
          "Sin lista confiable de seguimiento",
          "Citas perdidas porque el paciente siguió buscando",
        ],
      },
      after: {
        label: "Despues",
        title: "Demo de recepcionista IA",
        items: [
          "Respuestas instantáneas a preguntas comunes",
          "Solicitudes de cita estructuradas",
          "Leads capturados con servicio y horario preferido",
          "Cola de escalación para preguntas inciertas",
          "Resumen del dueño con quién necesita seguimiento",
        ],
      },
    },
  } satisfies Localized<{
    headline: string;
    before: { label: string; title: string; items: string[] };
    after: { label: string; title: string; items: string[] };
  }>,

  scenarios: {
    en: {
      headline: "Three-minute demo path",
      description:
        "Use these cards to guide a clinic owner through the patient experience and the owner summary.",
      chatHint: "Opens the patient chat demo",
      dashboardHint: "Opens the owner dashboard",
      openChat: "Open chat",
      openDashboard: "Open dashboard",
      items: [
        {
          id: "pricing",
          title: "Ask about prices",
          description:
            "Shows instant FAQ handling and a prompt to capture an appointment request.",
        },
        {
          id: "appointment",
          title: "Request appointment",
          description:
            "Shows the structured flow for name, phone, service, and preferred time.",
        },
        {
          id: "emergency",
          title: "Ask about emergency",
          description:
            "Shows urgent guidance while still collecting a follow-up opportunity.",
        },
        {
          id: "complex",
          title: "Ask a complex question",
          description:
            "Shows safe human escalation instead of the bot guessing.",
        },
        {
          id: "dashboard",
          title: "View clinic owner summary",
          description:
            "Shows captured leads, hot leads, common questions, and follow-up needs.",
        },
      ],
    },
    es: {
      headline: "Ruta de demo en tres minutos",
      description:
        "Usa estas tarjetas para guiar al dueño por la experiencia del paciente y el resumen del negocio.",
      chatHint: "Abre el demo del chat",
      dashboardHint: "Abre el panel del dueño",
      openChat: "Abrir chat",
      openDashboard: "Abrir panel",
      items: [
        {
          id: "pricing",
          title: "Preguntar precios",
          description:
            "Muestra respuestas instantáneas a FAQs y una invitación para capturar una cita.",
        },
        {
          id: "appointment",
          title: "Solicitar cita",
          description:
            "Muestra el flujo estructurado para nombre, teléfono, servicio y horario preferido.",
        },
        {
          id: "emergency",
          title: "Preguntar por emergencia",
          description:
            "Muestra orientación urgente sin perder la oportunidad de seguimiento.",
        },
        {
          id: "complex",
          title: "Hacer una pregunta compleja",
          description:
            "Muestra escalación humana segura en vez de que el bot adivine.",
        },
        {
          id: "dashboard",
          title: "Ver resumen del dueño",
          description:
            "Muestra leads capturados, leads calientes, preguntas frecuentes y seguimiento pendiente.",
        },
      ],
    },
  } satisfies Localized<{
    headline: string;
    description: string;
    chatHint: string;
    dashboardHint: string;
    openChat: string;
    openDashboard: string;
    items: {
      id: string;
      title: string;
      description: string;
    }[];
  }>,

  howItWorks: {
    en: {
      headline: "How the demo explains the product",
      steps: [
        {
          number: "1",
          title: "Patient asks on WhatsApp",
          description:
            "The chat simulator represents the patient experience without a real WhatsApp integration.",
        },
        {
          number: "2",
          title: "Receptionist answers or collects details",
          description:
            "FAQ answers, appointment requests, and lead capture are handled in one simple flow.",
        },
        {
          number: "3",
          title: "Events become owner insight",
          description:
            "The dashboard summarizes leads, hot opportunities, common questions, and escalation needs.",
        },
      ],
    },
    es: {
      headline: "Cómo el demo explica el producto",
      steps: [
        {
          number: "1",
          title: "El paciente pregunta por WhatsApp",
          description:
            "El simulador de chat representa la experiencia del paciente sin una integración real de WhatsApp.",
        },
        {
          number: "2",
          title: "El recepcionista responde o toma datos",
          description:
            "FAQs, solicitudes de cita y captura de leads viven en un flujo simple.",
        },
        {
          number: "3",
          title: "Los eventos se convierten en información",
          description:
            "El panel resume leads, oportunidades calientes, preguntas comunes y necesidades de escalación.",
        },
      ],
    },
  } satisfies Localized<{
    headline: string;
    steps: { number: string; title: string; description: string }[];
  }>,

  chatSection: {
    en: {
      eyebrow: "Live demo",
      headline: "Patient chat simulator",
      description:
        "Run one or two scenarios, then open the dashboard to show what the clinic captured while the team was busy.",
    },
    es: {
      eyebrow: "Demo en vivo",
      headline: "Simulador de chat del paciente",
      description:
        "Corre uno o dos escenarios y luego abre el panel para mostrar lo que la clínica capturó mientras el equipo estaba ocupado.",
    },
  } satisfies Localized<Record<string, string>>,

  cta: {
    en: {
      headline: "Request a demo",
      description:
        "Want to see how this would work for a dental clinic? Message me directly and I will walk you through the demo.",
      formTitle: "Local demo only request form",
      clinicName: "Clinic name",
      contactName: "Contact name",
      phone: "Phone or WhatsApp",
      email: "Email",
      preferredLanguage: "Preferred language",
      message: "Message",
      submitButton: "Save local demo request",
      success: "Saved locally only. This does not send data.",
      primaryButton: "Request demo on WhatsApp",
      secondaryButton: "Send email",
      realContactTitle: "Real validation contact",
      realContactBody:
        "No setup required for the demo. I’ll show you how it works in 3 minutes.",
      whatsappLink: "Contact by WhatsApp",
      emailLink: "Send email",
      footnote:
        "Demo only. Responses, leads, events, and summaries are simulated locally with no external integrations.",
    },
    es: {
      headline: "Solicitar demo",
      description:
        "¿Quieres ver cómo funcionaría para una clínica dental? Escríbeme directamente y te muestro el demo.",
      formTitle: "Formulario local de demo",
      clinicName: "Nombre de la clínica",
      contactName: "Nombre de contacto",
      phone: "Teléfono o WhatsApp",
      email: "Email",
      preferredLanguage: "Idioma preferido",
      message: "Mensaje",
      submitButton: "Guardar solicitud local",
      success: "Guardado solo localmente. Esto no envía datos.",
      primaryButton: "Solicitar demo por WhatsApp",
      secondaryButton: "Enviar correo",
      realContactTitle: "Contacto real para validación",
      realContactBody:
        "No necesitas configurar nada para ver la demo. Te muestro cómo funciona en 3 minutos.",
      whatsappLink: "Contactar por WhatsApp",
      emailLink: "Enviar email",
      footnote:
        "Solo demo. Respuestas, leads, eventos y resúmenes se simulan localmente sin integraciones externas.",
    },
  } satisfies Localized<Record<string, string>>,
};

export const demoScenarioMessages: Record<
  DemoScenarioId,
  Record<Language, string>
> = {
  pricing: {
    en: "How much does a cleaning cost?",
    es: "¿Cuánto cuesta una limpieza dental?",
  },
  appointment: {
    en: "I want to request an appointment this Friday afternoon.",
    es: "Quiero solicitar una cita este viernes en la tarde.",
  },
  emergency: {
    en: "I have a bad toothache. Do you handle dental emergencies?",
    es: "Tengo un dolor de muela fuerte. ¿Atienden emergencias dentales?",
  },
  complex: {
    en: "I have a complicated medical history and need clinical guidance before deciding what to do next.",
    es: "Tuve un tratamiento en otra clínica y necesito orientación clínica antes de decidir qué hacer.",
  },
};
