"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import {
  clinicProfile,
  languageLabels,
  quickReplyOptions,
} from "@/lib/clinicProfile";
import {
  appendConversationEvent,
} from "@/lib/conversationEvents";
import {
  getConversationReply,
  initialConversationState,
} from "@/lib/conversationEngine";
import {
  demoScenarioMessages,
  type DemoScenarioId,
} from "@/lib/demoContent";
import {
  DEMO_RESET_EVENT,
  resetLocalDemoData,
} from "@/lib/demoReset";
import {
  readStoredLeads,
  storeLeads,
} from "@/lib/leadStorage";
import type {
  ChatMessage,
  ConversationEvent,
  ConversationState,
  Language,
  Lead,
} from "@/types/chat";
import { LeadSummaryPanel } from "@/components/chat/LeadSummaryPanel";
import { MessageBubble } from "@/components/chat/MessageBubble";
import { QuickReplies } from "@/components/chat/QuickReplies";

const uiCopy = {
  en: {
    welcome: `Hi, welcome to ${clinicProfile.name}. I can answer common questions or collect an appointment request for the clinic team.`,
    status: "Typically replies instantly",
    inputLabel: "Message",
    inputPlaceholder: "Type a patient message",
    send: "Send",
    scenarioLabel: "Guided scenario",
    scenarioPrompt: "Suggested patient message",
    sendScenario: "Send scenario",
    dayDivider: "Today",
    now: "Now",
    typing: "Receptionist is typing",
    demoAria: "WhatsApp receptionist demo",
    languageToggleAria: "Chat language",
  },
  es: {
    welcome: `Hola, bienvenido a ${clinicProfile.name}. Puedo responder preguntas comunes o tomar una solicitud de cita para el equipo de la clínica.`,
    status: "Normalmente responde al instante",
    inputLabel: "Mensaje",
    inputPlaceholder: "Escribe un mensaje del paciente",
    send: "Enviar",
    scenarioLabel: "Escenario guiado",
    scenarioPrompt: "Mensaje sugerido del paciente",
    sendScenario: "Enviar escenario",
    dayDivider: "Hoy",
    now: "Ahora",
    typing: "El recepcionista está escribiendo",
    demoAria: "Demo de recepcionista por WhatsApp",
    languageToggleAria: "Idioma del chat",
  },
} satisfies Record<Language, Record<string, string>>;

interface ChatSimulatorProps {
  initialLanguage?: Language;
  scenarioId?: DemoScenarioId;
}

export function ChatSimulator({
  initialLanguage = "en",
  scenarioId,
}: ChatSimulatorProps) {
  const [language, setLanguage] = useState<Language>(initialLanguage);
  const [messages, setMessages] = useState<ChatMessage[]>(() =>
    getInitialMessages(initialLanguage),
  );
  const [conversationState, setConversationState] = useState<ConversationState>(
    initialConversationState,
  );
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const chatWindowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setLeads(readStoredLeads());
  }, []);

  useEffect(() => {
    setLanguage(initialLanguage);
    setMessages(getInitialMessages(initialLanguage));
    setConversationState(initialConversationState);
    setInputValue(getScenarioPrompt(scenarioId, initialLanguage));
    setIsTyping(false);
  }, [initialLanguage, scenarioId]);

  useEffect(() => {
    function handleDemoReset() {
      setMessages(getInitialMessages(language));
      setConversationState(initialConversationState);
      setInputValue(getScenarioPrompt(scenarioId, language));
      setIsTyping(false);
      setLeads([]);
    }

    window.addEventListener(DEMO_RESET_EVENT, handleDemoReset);

    return () => {
      window.removeEventListener(DEMO_RESET_EVENT, handleDemoReset);
    };
  }, [language, scenarioId]);

  useEffect(() => {
    const chatWindow = chatWindowRef.current;

    if (!chatWindow) {
      return;
    }

    chatWindow.scrollTo({
      top: chatWindow.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isTyping]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    handleSend(inputValue);
  }

  function handleSend(rawText: string) {
    const userText = rawText.trim();

    if (!userText || isTyping) {
      return;
    }

    setInputValue("");
    appendMessage("user", userText);
    setIsTyping(true);

    window.setTimeout(() => {
      const result = getConversationReply(userText, conversationState, language);
      setConversationState(result.nextState);
      setMessages((currentMessages) => [
        ...currentMessages,
        ...result.botMessages.map((text) => createMessage("bot", text)),
      ]);

      const capturedLead = result.capturedLead;

      if (capturedLead) {
        setLeads((currentLeads) => {
          const updatedLeads = [capturedLead, ...currentLeads];
          storeLeads(updatedLeads);
          return updatedLeads;
        });
      }

      if (result.event) {
        appendConversationEvent(createStoredEvent(result.event, language));
      }

      if (result.followUpEvent) {
        appendConversationEvent(createStoredEvent(result.followUpEvent, language));
      }

      setIsTyping(false);
    }, 420);
  }

  function appendMessage(sender: ChatMessage["sender"], text: string) {
    setMessages((currentMessages) => [
      ...currentMessages,
      createMessage(sender, text),
    ]);
  }

  function handleReset() {
    resetLocalDemoData();
  }

  function handleLanguageChange(nextLanguage: Language) {
    setLanguage(nextLanguage);
    setMessages(getInitialMessages(nextLanguage));
    setConversationState(initialConversationState);
    setInputValue(getScenarioPrompt(scenarioId, nextLanguage));
    setIsTyping(false);
  }

  const scenarioPrompt = getScenarioPrompt(scenarioId, language);

  return (
    <section className="demo-grid" aria-label={uiCopy[language].demoAria}>
      <div className="phone-frame">
        <header className="chat-header">
          <div className="avatar" aria-hidden="true">
            SD
          </div>
          <div>
            <h2>{clinicProfile.name}</h2>
            <p>{uiCopy[language].status}</p>
          </div>
          <div
            className="language-toggle"
            aria-label={uiCopy[language].languageToggleAria}
          >
            {(["en", "es"] as Language[]).map((option) => (
              <button
                aria-pressed={language === option}
                className={language === option ? "language-active" : ""}
                key={option}
                onClick={() => handleLanguageChange(option)}
                type="button"
              >
                {languageLabels[option][language]}
              </button>
            ))}
          </div>
        </header>

        <div className="chat-window" aria-live="polite" ref={chatWindowRef}>
          <div className="day-divider">{uiCopy[language].dayDivider}</div>
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          {isTyping ? (
            <div className="message-row">
              <div
                className="typing-indicator"
                aria-label={uiCopy[language].typing}
              >
                <span />
                <span />
                <span />
              </div>
            </div>
          ) : null}
        </div>

        <div className="composer-area">
          {scenarioPrompt ? (
            <div className="scenario-prefill-panel">
              <span>{uiCopy[language].scenarioLabel}</span>
              <p>
                <strong>{uiCopy[language].scenarioPrompt}:</strong>{" "}
                {scenarioPrompt}
              </p>
              <button
                disabled={isTyping}
                onClick={() => handleSend(scenarioPrompt)}
                type="button"
              >
                {uiCopy[language].sendScenario}
              </button>
            </div>
          ) : null}
          <QuickReplies
            disabled={isTyping}
            language={language}
            onSelect={handleSend}
            options={quickReplyOptions}
          />
          <form className="composer" onSubmit={handleSubmit}>
            <label className="sr-only" htmlFor="chat-input">
              {uiCopy[language].inputLabel}
            </label>
            <input
              autoComplete="off"
              disabled={isTyping}
              id="chat-input"
              onChange={(event) => setInputValue(event.target.value)}
              placeholder={uiCopy[language].inputPlaceholder}
              type="text"
              value={inputValue}
            />
            <button disabled={!inputValue.trim() || isTyping} type="submit">
              {uiCopy[language].send}
            </button>
          </form>
        </div>
      </div>

      <LeadSummaryPanel
        conversationState={conversationState}
        language={language}
        leads={leads}
        onReset={handleReset}
      />
    </section>
  );
}

function createMessage(sender: ChatMessage["sender"], text: string): ChatMessage {
  return {
    id: `${sender}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    sender,
    text,
    timestamp: formatTime(new Date()),
  };
}

function getInitialMessages(language: Language): ChatMessage[] {
  return [
    {
      id: `welcome-${language}`,
      sender: "bot",
      text: uiCopy[language].welcome,
      timestamp: uiCopy[language].now,
    },
  ];
}

function getScenarioPrompt(
  scenarioId: DemoScenarioId | undefined,
  language: Language,
) {
  return scenarioId ? demoScenarioMessages[scenarioId][language] : "";
}

function createStoredEvent(
  event: Omit<ConversationEvent, "id" | "createdAt" | "language">,
  language: Language,
): ConversationEvent {
  return {
    ...event,
    id: `event-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    createdAt: new Date().toISOString(),
    language,
  };
}

function formatTime(date: Date) {
  return date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
}
