"use client";

import { useState } from "react";
import { ChatSimulator } from "@/components/chat/ChatSimulator";
import { demoContent } from "@/lib/demoContent";
import type { Language } from "@/types/chat";
import { DemoResetButton } from "./DemoResetButton";
import { DemoHero } from "./DemoHero";
import { DemoValue } from "./DemoValue";
import { DemoProblem } from "./DemoProblem";
import { DemoBeforeAfter } from "./DemoBeforeAfter";
import { DemoScenarios } from "./DemoScenarios";
import { DemoHowItWorks } from "./DemoHowItWorks";
import { DemoCTA } from "./DemoCTA";

export function DemoHome() {
  const [language, setLanguage] = useState<Language>("en");
  const nav = demoContent.nav[language];
  const chat = demoContent.chatSection[language];

  return (
    <main className="demo-landing">
      <header className="demo-header">
        <div className="demo-header-content">
          <div className="demo-brand">
            <a href="#top" aria-label="WhatsApp AI Receptionist home">
              WhatsApp AI Receptionist
            </a>
          </div>
          <nav className="demo-header-nav">
            <a href="#patient-chat">{nav.patientChat}</a>
            <a href={`/dashboard?lang=${language}`}>{nav.dashboard}</a>
            <a className="demo-nav-cta" href="#request-demo">
              {nav.requestDemo}
            </a>
            <DemoResetButton language={language} />
            <div
              aria-label={nav.languageLabel}
              className="sales-language-toggle"
            >
              {(["en", "es"] as const).map((option) => (
                <button
                  aria-pressed={language === option}
                  className={language === option ? "sales-language-active" : ""}
                  key={option}
                  onClick={() => setLanguage(option)}
                  type="button"
                >
                  {option.toUpperCase()}
                </button>
              ))}
            </div>
          </nav>
        </div>
      </header>

      <div id="top" />
      <DemoHero language={language} />
      <DemoValue language={language} />
      <DemoProblem language={language} />
      <DemoBeforeAfter language={language} />
      <DemoScenarios language={language} />
      <DemoHowItWorks language={language} />
      <section
        aria-labelledby="patient-chat-title"
        className="demo-section patient-chat-section"
        id="patient-chat"
      >
        <div className="section-container">
          <div className="section-heading">
            <p className="eyebrow">{chat.eyebrow}</p>
            <h2 id="patient-chat-title">{chat.headline}</h2>
            <p>{chat.description}</p>
          </div>
          <ChatSimulator />
        </div>
      </section>
      <DemoCTA language={language} />

      <footer className="demo-footer">
        <p>{demoContent.cta[language].footnote}</p>
      </footer>
    </main>
  );
}
