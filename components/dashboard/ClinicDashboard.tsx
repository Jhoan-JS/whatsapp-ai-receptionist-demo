"use client";

import { useEffect, useMemo, useState } from "react";
import {
  buildDashboardLeads,
  buildCommonQuestionsFromEvents,
  buildSummaryCards,
} from "@/lib/dashboardData";
import {
  readStoredEvents,
} from "@/lib/conversationEvents";
import { resetLocalDemoData } from "@/lib/demoReset";
import { readStoredLeads } from "@/lib/leadStorage";
import type { ConversationEvent, Language, Lead } from "@/types/chat";
import { CommonQuestions } from "@/components/dashboard/CommonQuestions";
import { LeadDetail } from "@/components/dashboard/LeadDetail";
import { LeadList } from "@/components/dashboard/LeadList";
import { SummaryCards } from "@/components/dashboard/SummaryCards";

const copy = {
  en: {
    eyebrow: "Clinic owner dashboard",
    title: "Follow-up command center",
    description:
      "See the patients the AI receptionist captured, which requests need confirmation, and where a human should step in.",
    openChat: "Open chat demo",
    reset: "Reset demo",
    resetDone: "Demo reset",
    languageLabel: "Dashboard language",
    valueStrong: "No missed opportunities:",
    valueBody:
      "the receptionist turns late replies, FAQ chats, urgent questions, and appointment requests into a clear follow-up queue.",
    summaryAria: "Dashboard summary",
    leadManagementAria: "Lead management",
  },
  es: {
    eyebrow: "Panel del dueño de la clínica",
    title: "Centro de seguimiento",
    description:
      "Consulta los pacientes que capturó el recepcionista de IA, cuáles solicitudes necesitan confirmación y dónde debe intervenir una persona.",
    openChat: "Abrir demo del chat",
    reset: "Reiniciar demo",
    resetDone: "Demo reiniciado",
    languageLabel: "Idioma del panel",
    valueStrong: "Sin oportunidades perdidas:",
    valueBody:
      "el recepcionista convierte respuestas tardías, preguntas frecuentes, urgencias y solicitudes de cita en una cola clara de seguimiento.",
    summaryAria: "Resumen diario",
    leadManagementAria: "Gestión de prospectos",
  },
} satisfies Record<Language, Record<string, string>>;

export function ClinicDashboard() {
  const [language, setLanguage] = useState<Language>("en");
  const [storedLeads, setStoredLeads] = useState<Lead[]>([]);
  const [storedEvents, setStoredEvents] = useState<ConversationEvent[]>([]);
  const [selectedLeadId, setSelectedLeadId] = useState<string | undefined>();
  const [wasReset, setWasReset] = useState(false);

  useEffect(() => {
    setStoredLeads(readStoredLeads());
    setStoredEvents(readStoredEvents());
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setLanguage(params.get("lang") === "es" ? "es" : "en");
  }, []);

  const dashboardLeads = useMemo(
    () => buildDashboardLeads(storedLeads, language),
    [storedLeads, language],
  );
  const summaryCards = useMemo(
    () => buildSummaryCards(dashboardLeads, storedEvents, language),
    [dashboardLeads, storedEvents, language],
  );
  const dashboardQuestions = useMemo(
    () => buildCommonQuestionsFromEvents(storedEvents, language),
    [storedEvents, language],
  );
  const selectedLead =
    dashboardLeads.find((lead) => lead.id === selectedLeadId) ||
    dashboardLeads[0];

  useEffect(() => {
    if (!selectedLeadId && dashboardLeads[0]) {
      setSelectedLeadId(dashboardLeads[0].id);
    }
  }, [dashboardLeads, selectedLeadId]);

  function handleResetDemo() {
    resetLocalDemoData();
    setStoredLeads([]);
    setStoredEvents([]);
    setSelectedLeadId(undefined);
    setWasReset(true);
    window.setTimeout(() => setWasReset(false), 1800);
  }

  function handleLanguageChange(nextLanguage: Language) {
    setLanguage(nextLanguage);

    const url = new URL(window.location.href);
    url.searchParams.set("lang", nextLanguage);
    window.history.replaceState(null, "", url);
  }

  const text = copy[language];

  return (
    <main className="dashboard-shell">
      <header className="dashboard-hero" aria-labelledby="dashboard-title">
        <div>
          <p className="eyebrow">{text.eyebrow}</p>
          <h1 id="dashboard-title">{text.title}</h1>
          <p>{text.description}</p>
        </div>
        <div className="dashboard-actions">
          <a
            className="secondary-link"
            href={`/chat?scenario=pricing&lang=${language}`}
          >
            {text.openChat}
          </a>
          <div
            aria-label={text.languageLabel}
            className="sales-language-toggle"
          >
            {(["en", "es"] as const).map((option) => (
              <button
                aria-pressed={language === option}
                className={language === option ? "sales-language-active" : ""}
                key={option}
                onClick={() => handleLanguageChange(option)}
                type="button"
              >
                {option.toUpperCase()}
              </button>
            ))}
          </div>
          <button className="danger-button" onClick={handleResetDemo} type="button">
            {wasReset ? text.resetDone : text.reset}
          </button>
        </div>
      </header>

      <section className="value-banner" aria-label="Demo value statement">
        <strong>{text.valueStrong}</strong>
        <span>{text.valueBody}</span>
      </section>

      <SummaryCards ariaLabel={text.summaryAria} cards={summaryCards} />

      <section className="dashboard-grid" aria-label={text.leadManagementAria}>
        <LeadList
          language={language}
          leads={dashboardLeads}
          onSelectLead={setSelectedLeadId}
          selectedLeadId={selectedLead?.id}
        />
        <div className="dashboard-side">
          <LeadDetail language={language} lead={selectedLead} />
          <CommonQuestions language={language} questions={dashboardQuestions} />
        </div>
      </section>
    </main>
  );
}
