import type { ConversationState, Lead } from "@/types/chat";

interface LeadSummaryPanelProps {
  conversationState: ConversationState;
  leads: Lead[];
  onReset: () => void;
}

export function LeadSummaryPanel({
  conversationState,
  leads,
  onReset,
}: LeadSummaryPanelProps) {
  const latestLead = leads[0];
  const isCapturing = conversationState.mode === "collecting_lead";

  return (
    <aside className="lead-panel" aria-label="Captured lead summary">
      <div className="panel-header">
        <div>
          <p className="panel-kicker">Clinic view</p>
          <h2>Lead summary</h2>
        </div>
        <button className="ghost-button" onClick={onReset} type="button">
          Reset
        </button>
      </div>

      <div className="metric-grid">
        <div className="metric">
          <span>{leads.length}</span>
          <p>Captured leads</p>
        </div>
        <div className="metric">
          <span>{isCapturing ? "Live" : "Idle"}</span>
          <p>Capture state</p>
        </div>
      </div>

      {isCapturing ? (
        <div className="draft-box">
          <h3>Current request</h3>
          <dl>
            <div>
              <dt>Name</dt>
              <dd>{conversationState.leadDraft.name || "Waiting"}</dd>
            </div>
            <div>
              <dt>Phone</dt>
              <dd>{conversationState.leadDraft.phone || "Waiting"}</dd>
            </div>
            <div>
              <dt>Service</dt>
              <dd>{conversationState.leadDraft.service || "Waiting"}</dd>
            </div>
            <div>
              <dt>Preferred time</dt>
              <dd>{conversationState.leadDraft.preferredTime || "Waiting"}</dd>
            </div>
          </dl>
        </div>
      ) : null}

      {latestLead ? (
        <div className="lead-card">
          <div className="lead-card-header">
            <h3>{latestLead.name}</h3>
            <span>New</span>
          </div>
          <dl>
            <div>
              <dt>Phone</dt>
              <dd>{latestLead.phone}</dd>
            </div>
            <div>
              <dt>Service</dt>
              <dd>{latestLead.service}</dd>
            </div>
            <div>
              <dt>Preferred</dt>
              <dd>{latestLead.preferredTime}</dd>
            </div>
          </dl>
        </div>
      ) : (
        <div className="empty-state">
          <h3>No leads yet</h3>
          <p>Request an appointment in the chat to see the lead appear here.</p>
        </div>
      )}
    </aside>
  );
}
