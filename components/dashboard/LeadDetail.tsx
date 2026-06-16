import {
  getConversationTypeLabel,
  getLeadTags,
  getSourceLabel,
} from "@/lib/dashboardData";
import type { Language, Lead } from "@/types/chat";

interface LeadDetailProps {
  lead?: Lead;
  language: Language;
}

const copy = {
  en: {
    ariaLabel: "Lead detail",
    emptyTitle: "No lead selected",
    emptyBody: "Captured leads will appear here when a patient starts a request.",
    kicker: "Selected lead",
    phone: "Phone",
    service: "Service",
    preferredTime: "Preferred time",
    conversationType: "Conversation type",
    source: "Source",
    humanFollowUp: "Human follow-up",
    yes: "Yes",
    no: "No",
    lastMessage: "Last patient message",
    staffNote: "Staff note",
  },
  es: {
    ariaLabel: "Detalle del prospecto",
    emptyTitle: "No hay prospecto seleccionado",
    emptyBody:
      "Los prospectos capturados aparecerán aquí cuando un paciente inicie una solicitud.",
    kicker: "Prospecto seleccionado",
    phone: "Teléfono",
    service: "Servicio",
    preferredTime: "Horario preferido",
    conversationType: "Tipo de conversación",
    source: "Origen",
    humanFollowUp: "Seguimiento humano",
    yes: "Sí",
    no: "No",
    lastMessage: "Último mensaje del paciente",
    staffNote: "Nota para el equipo",
  },
} satisfies Record<Language, Record<string, string>>;

export function LeadDetail({ lead, language }: LeadDetailProps) {
  const text = copy[language];

  if (!lead) {
    return (
      <section className="detail-panel" aria-label={text.ariaLabel}>
        <h2>{text.emptyTitle}</h2>
        <p>{text.emptyBody}</p>
      </section>
    );
  }

  const conversationType = lead.conversationType || "faq";

  return (
    <section className="detail-panel" aria-labelledby="lead-detail-title">
      <div className="section-heading-row">
        <div>
          <p className="panel-kicker">{text.kicker}</p>
          <h2 id="lead-detail-title">{lead.name}</h2>
        </div>
        <span className="detail-time">
          {formatLeadTime(lead.createdAt, language)}
        </span>
      </div>

      <div className="tag-row detail-tags">
        {getLeadTags(lead, language).map((tag) => (
          <span className={`status-tag tag-${tag.tone}`} key={tag.label}>
            {tag.label}
          </span>
        ))}
      </div>

      <dl className="detail-list">
        <div>
          <dt>{text.phone}</dt>
          <dd>{lead.phone}</dd>
        </div>
        <div>
          <dt>{text.service}</dt>
          <dd>{lead.service}</dd>
        </div>
        <div>
          <dt>{text.preferredTime}</dt>
          <dd>{lead.preferredTime}</dd>
        </div>
        <div>
          <dt>{text.conversationType}</dt>
          <dd>{getConversationTypeLabel(conversationType, language)}</dd>
        </div>
        <div>
          <dt>{text.source}</dt>
          <dd>{getSourceLabel(lead.source, language)}</dd>
        </div>
        <div>
          <dt>{text.humanFollowUp}</dt>
          <dd>{lead.needsHumanFollowUp ? text.yes : text.no}</dd>
        </div>
      </dl>

      <div className="conversation-note">
        <h3>{text.lastMessage}</h3>
        <p>{lead.lastMessage}</p>
      </div>

      <div className="conversation-note conversation-note-soft">
        <h3>{text.staffNote}</h3>
        <p>{lead.notes}</p>
      </div>
    </section>
  );
}

function formatLeadTime(value: string, language: Language) {
  return new Intl.DateTimeFormat(language === "es" ? "es" : "en", {
    hour: "numeric",
    minute: "2-digit",
    month: "short",
    day: "numeric",
  }).format(new Date(value));
}
