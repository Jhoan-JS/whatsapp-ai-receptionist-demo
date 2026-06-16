import type { Language } from "@/types/chat";

const STORAGE_KEY = "whatsapp-ai-receptionist-demo-requests";

export interface DemoRequest {
  id: string;
  clinicName: string;
  contactName: string;
  phone: string;
  email: string;
  preferredLanguage: Language;
  message: string;
  createdAt: string;
}

export type DemoRequestDraft = Omit<DemoRequest, "id" | "createdAt">;

export function readStoredDemoRequests(): DemoRequest[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as DemoRequest[]) : [];
  } catch {
    return [];
  }
}

export function storeDemoRequests(requests: DemoRequest[]) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
}

export function appendDemoRequest(draft: DemoRequestDraft): DemoRequest {
  const request = {
    ...draft,
    id: `demo-request-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };

  storeDemoRequests([request, ...readStoredDemoRequests()]);
  return request;
}

export function clearStoredDemoRequests() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(STORAGE_KEY);
}
