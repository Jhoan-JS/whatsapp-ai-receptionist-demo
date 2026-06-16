"use client";

import { useEffect, useMemo, useState } from "react";
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
    leadActions: "Lead actions",
    call: "Call",
    whatsapp: "WhatsApp",
    copyPhone: "Copy phone",
    copied: "Copied",
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
    leadActions: "Acciones del prospecto",
    call: "Llamar",
    whatsapp: "WhatsApp",
    copyPhone: "Copiar teléfono",
    copied: "Copiado",
    lastMessage: "Último mensaje del paciente",
    staffNote: "Nota para el equipo",
  },
} satisfies Record<Language, Record<string, string>>;

export function LeadDetail({ lead, language }: LeadDetailProps) {
  const text = copy[language];
  const [wasCopied, setWasCopied] = useState(false);
  const phoneDigits = useMemo(() => getPhoneDigits(lead?.phone || ""), [lead]);
  const hasUsablePhone = phoneDigits.length >= 7;
  const phoneHref = hasUsablePhone ? `tel:${phoneDigits}` : undefined;
  const whatsappHref = hasUsablePhone
    ? `https://wa.me/${formatWhatsAppDigits(phoneDigits)}`
    : undefined;

  useEffect(() => {
    setWasCopied(false);
  }, [lead?.id]);

  async function handleCopyPhone() {
    if (!lead?.phone || !navigator.clipboard) {
      return;
    }

    try {
      await navigator.clipboard.writeText(lead.phone);
      setWasCopied(true);
      window.setTimeout(() => setWasCopied(false), 1600);
    } catch {
      setWasCopied(false);
    }
  }

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

      <div className="lead-action-row" aria-label={text.leadActions}>
        {phoneHref ? (
          <a className="lead-action-link" href={phoneHref}>
            {text.call}
          </a>
        ) : (
          <span className="lead-action-disabled">{text.call}</span>
        )}
        {whatsappHref ? (
          <a
            className="lead-action-link lead-action-whatsapp"
            href={whatsappHref}
            rel="noreferrer"
            target="_blank"
          >
            {text.whatsapp}
          </a>
        ) : (
          <span className="lead-action-disabled">{text.whatsapp}</span>
        )}
        <button
          className="lead-action-button"
          disabled={!hasUsablePhone}
          onClick={handleCopyPhone}
          type="button"
        >
          {wasCopied ? text.copied : text.copyPhone}
        </button>
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

function getPhoneDigits(value: string) {
  return value.replace(/\D/g, "");
}

function formatWhatsAppDigits(value: string) {
  if (value.length === 10) {
    return `1${value}`;
  }

  return value;
}
