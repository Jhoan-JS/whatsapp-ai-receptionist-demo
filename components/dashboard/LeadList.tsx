import {
  getConversationTypeLabel,
  getLeadTags,
  getSourceLabel,
} from "@/lib/dashboardData";
import type { Language, Lead } from "@/types/chat";

interface LeadListProps {
  leads: Lead[];
  selectedLeadId?: string;
  language: Language;
  onSelectLead: (leadId: string) => void;
}

const copy = {
  en: {
    ariaLabel: "Lead queue",
    kicker: "Captured automatically",
    title: "Lead queue",
    total: "total",
    humanNeeded: "Human follow-up needed",
    ready: "Ready for staff",
  },
  es: {
    ariaLabel: "Cola de prospectos",
    kicker: "Capturado automáticamente",
    title: "Cola de prospectos",
    total: "en total",
    humanNeeded: "Necesita seguimiento humano",
    ready: "Listo para el equipo",
  },
} satisfies Record<Language, Record<string, string>>;

export function LeadList({
  leads,
  language,
  selectedLeadId,
  onSelectLead,
}: LeadListProps) {
  const text = copy[language];

  return (
    <section
      className="lead-list-panel"
      aria-label={text.ariaLabel}
      aria-labelledby="lead-list-title"
    >
      <div className="section-heading-row">
        <div>
          <p className="panel-kicker">{text.kicker}</p>
          <h2 id="lead-list-title">{text.title}</h2>
        </div>
        <span>
          {leads.length} {text.total}
        </span>
      </div>

      <div className="lead-list">
        {leads.map((lead) => {
          const isSelected = lead.id === selectedLeadId;
          const conversationType = lead.conversationType || "faq";

          return (
            <button
              className={`lead-row ${isSelected ? "lead-row-selected" : ""}`}
              key={lead.id}
              onClick={() => onSelectLead(lead.id)}
              type="button"
            >
              <div className="lead-row-main">
                <div>
                  <h3>{lead.name}</h3>
                  <p>{lead.phone}</p>
                </div>
                <div className="lead-row-service">
                  <strong>{lead.service}</strong>
                  <span>{lead.preferredTime}</span>
                </div>
              </div>

              <div className="lead-row-meta">
                <span>
                  {getConversationTypeLabel(conversationType, language)}
                </span>
                <span>{getSourceLabel(lead.source, language)}</span>
                <span>
                  {lead.needsHumanFollowUp
                    ? text.humanNeeded
                    : text.ready}
                </span>
              </div>

              <div className="tag-row">
                {getLeadTags(lead, language).map((tag) => (
                  <span className={`status-tag tag-${tag.tone}`} key={tag.label}>
                    {tag.label}
                  </span>
                ))}
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
