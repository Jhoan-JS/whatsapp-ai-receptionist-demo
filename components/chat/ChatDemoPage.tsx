"use client";

import { useEffect, useState } from "react";
import {
  isDemoScenarioId,
  type DemoScenarioId,
} from "@/lib/demoContent";
import type { Language } from "@/types/chat";
import { DemoResetButton } from "@/components/DemoResetButton";
import { ChatSimulator } from "@/components/chat/ChatSimulator";

const copy = {
  en: {
    eyebrow: "Guided patient scenario",
    headline: "Patient chat demo",
    description:
      "Send the suggested message, let the receptionist respond, then open the owner dashboard to show what was captured.",
    home: "Back to sales demo",
    dashboard: "Open owner dashboard",
  },
  es: {
    eyebrow: "Escenario guiado del paciente",
    headline: "Demo de chat del paciente",
    description:
      "Envía el mensaje sugerido, deja que el recepcionista responda y luego abre el panel del dueño para mostrar lo capturado.",
    home: "Volver al demo comercial",
    dashboard: "Abrir panel del dueño",
  },
} satisfies Record<Language, Record<string, string>>;

export function ChatDemoPage() {
  const [language, setLanguage] = useState<Language>("en");
  const [scenarioId, setScenarioId] = useState<DemoScenarioId | undefined>();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requestedLanguage = params.get("lang");
    const requestedScenario = params.get("scenario");

    setLanguage(requestedLanguage === "es" ? "es" : "en");
    setScenarioId(
      isDemoScenarioId(requestedScenario) ? requestedScenario : undefined,
    );
  }, []);

  const pageCopy = copy[language];

  return (
    <main className="app-shell chat-demo-shell">
      <section className="intro-panel" aria-labelledby="chat-demo-title">
        <div>
          <p className="eyebrow">{pageCopy.eyebrow}</p>
          <h1 id="chat-demo-title">{pageCopy.headline}</h1>
          <p className="intro-copy">{pageCopy.description}</p>
        </div>
        <div className="dashboard-actions">
          <a className="secondary-link" href="/">
            {pageCopy.home}
          </a>
          <a className="secondary-link" href={`/dashboard?lang=${language}`}>
            {pageCopy.dashboard}
          </a>
          <DemoResetButton language={language} />
        </div>
      </section>

      <ChatSimulator initialLanguage={language} scenarioId={scenarioId} />
    </main>
  );
}
