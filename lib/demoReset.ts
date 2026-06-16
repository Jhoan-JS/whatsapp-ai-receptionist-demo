import { clearStoredEvents } from "@/lib/conversationEvents";
import { clearStoredLeads } from "@/lib/leadStorage";

export const DEMO_RESET_EVENT = "whatsapp-ai-receptionist-demo-reset";

export function resetLocalDemoData() {
  clearStoredLeads();
  clearStoredEvents();

  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(DEMO_RESET_EVENT));
  }
}
