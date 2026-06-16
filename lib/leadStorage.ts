import type { Lead } from "@/types/chat";

const STORAGE_KEY = "whatsapp-ai-receptionist-demo-leads";

export function readStoredLeads(): Lead[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Lead[]) : [];
  } catch {
    return [];
  }
}

export function storeLeads(leads: Lead[]) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
}

export function clearStoredLeads() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(STORAGE_KEY);
}
