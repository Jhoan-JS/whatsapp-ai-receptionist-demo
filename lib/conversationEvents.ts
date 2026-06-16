import type { ConversationEvent } from "@/types/chat";

const STORAGE_KEY = "whatsapp-ai-receptionist-demo-events";

export function readStoredEvents(): ConversationEvent[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ConversationEvent[]) : [];
  } catch {
    return [];
  }
}

export function storeEvents(events: ConversationEvent[]) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
}

export function appendConversationEvent(event: ConversationEvent) {
  const events = readStoredEvents();
  storeEvents([event, ...events]);
}

export function clearStoredEvents() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(STORAGE_KEY);
}
