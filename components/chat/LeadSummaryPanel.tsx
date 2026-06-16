import type { ConversationState, Language, Lead } from "@/types/chat";

interface LeadSummaryPanelProps {
  conversationState: ConversationState;
  language: Language;
  leads: Lead[];
  onReset: () => void;
}

const copy = {
  en: {
    ariaLabel: "Captured lead summary",
    kicker: "Clinic view",
    title: "Lead summary",
    reset: "Reset",
    capturedLeads: "Captured leads",
    captureState: "Capture state",
    live: "Live",
    idle: "Idle",
    currentRequest: "Current request",
    name: "Name",
    phone: "Phone",
    service: "Service",
    preferredTime: "Preferred time",
    preferred: "Preferred",
    waiting: "Waiting",
    newLead: "New",
    emptyTitle: "No leads yet",
    emptyBody:
      "Request an appointment in the chat to see the lead appear here.",
  },
  es: {
    ariaLabel: "Resumen de prospectos capturados",
    kicker: "Vista de la clínica",
    title: "Resumen de prospectos",
    reset: "Reiniciar",
    capturedLeads: "Prospectos capturados",
    captureState: "Estado de captura",
    live: "En vivo",
    idle: "Inactivo",
    currentRequest: "Solicitud actual",
    name: "Nombre",
    phone: "Teléfono",
    service: "Servicio",
    preferredTime: "Horario preferido",
    preferred: "Preferido",
    waiting: "En espera",
    newLead: "Nuevo",
    emptyTitle: "Aún no hay prospectos",
    emptyBody: "Solicita una cita en el chat para ver el prospecto aquí.",
  },
} satisfies Record<Language, Record<string, string>>;

export function LeadSummaryPanel({
  conversationState,
  language,
  leads,
  onReset,
}: LeadSummaryPanelProps) {
  const text = copy[language];
  const latestLead = leads[0];
  const isCapturing = conversationState.mode === "collecting_lead";

  return (
    <aside className="lead-panel" aria-label={text.ariaLabel}>
      <div className="panel-header">
        <div>
          <p className="panel-kicker">{text.kicker}</p>
          <h2>{text.title}</h2>
        </div>
        <button className="ghost-button" onClick={onReset} type="button">
          {text.reset}
        </button>
      </div>

      <div className="metric-grid">
        <div className="metric">
          <span>{leads.length}</span>
          <p>{text.capturedLeads}</p>
        </div>
        <div className="metric">
          <span>{isCapturing ? text.live : text.idle}</span>
          <p>{text.captureState}</p>
        </div>
      </div>

      {isCapturing ? (
        <div className="draft-box">
          <h3>{text.currentRequest}</h3>
          <dl>
            <div>
              <dt>{text.name}</dt>
              <dd>{conversationState.leadDraft.name || text.waiting}</dd>
            </div>
            <div>
              <dt>{text.phone}</dt>
              <dd>{conversationState.leadDraft.phone || text.waiting}</dd>
            </div>
            <div>
              <dt>{text.service}</dt>
              <dd>{conversationState.leadDraft.service || text.waiting}</dd>
            </div>
            <div>
              <dt>{text.preferredTime}</dt>
              <dd>{conversationState.leadDraft.preferredTime || text.waiting}</dd>
            </div>
          </dl>
        </div>
      ) : null}

      {latestLead ? (
        <div className="lead-card">
          <div className="lead-card-header">
            <h3>{latestLead.name}</h3>
            <span>{text.newLead}</span>
          </div>
          <dl>
            <div>
              <dt>{text.phone}</dt>
              <dd>{latestLead.phone}</dd>
            </div>
            <div>
              <dt>{text.service}</dt>
              <dd>{latestLead.service}</dd>
            </div>
            <div>
              <dt>{text.preferred}</dt>
              <dd>{latestLead.preferredTime}</dd>
            </div>
          </dl>
        </div>
      ) : (
        <div className="empty-state">
          <h3>{text.emptyTitle}</h3>
          <p>{text.emptyBody}</p>
        </div>
      )}
    </aside>
  );
}
