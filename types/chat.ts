export type MessageSender = "bot" | "user";

export type LeadStatus = "new" | "appointment_requested" | "needs_human";

export type ConversationType =
  | "faq"
  | "appointment_request"
  | "emergency"
  | "complex_question";

export type Language = "en" | "es";

export type ConversationIntent =
  | "prices"
  | "hours"
  | "location"
  | "services"
  | "insurance"
  | "emergency"
  | "payment_methods"
  | "appointment_request"
  | "lead_completed"
  | "human_escalation"
  | "unknown";

export type ConversationEventType =
  | "faq_asked"
  | "appointment_requested"
  | "lead_capture_completed"
  | "complex_question_asked"
  | "human_escalation";

export type LeadCaptureField = "name" | "phone" | "service" | "preferredTime";

export type ConversationMode =
  | "idle"
  | "collecting_lead"
  | "awaiting_appointment_confirmation";

export interface ChatMessage {
  id: string;
  sender: MessageSender;
  text: string;
  timestamp: string;
}

export interface ConversationEvent {
  id: string;
  type: ConversationEventType;
  question: string;
  intent: ConversationIntent;
  serviceInterest?: string;
  needsHumanFollowUp: boolean;
  leadId?: string;
  language: Language;
  createdAt: string;
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  service: string;
  preferredTime: string;
  status: LeadStatus;
  createdAt: string;
  source: "demo_chat" | "demo_seed";
  conversationType?: ConversationType;
  needsHumanFollowUp?: boolean;
  isHot?: boolean;
  questionTopic?: string;
  notes?: string;
  lastMessage?: string;
  language?: Language;
}

export interface LeadDraft {
  name?: string;
  phone?: string;
  service?: string;
  preferredTime?: string;
}

export interface ConversationState {
  mode: ConversationMode;
  nextField?: LeadCaptureField;
  leadDraft: LeadDraft;
  pendingQuestion?: string;
  pendingServiceInterest?: string;
}

export interface ConversationResult {
  botMessages: string[];
  nextState: ConversationState;
  capturedLead?: Lead;
  event?: Omit<ConversationEvent, "id" | "createdAt" | "language">;
  followUpEvent?: Omit<ConversationEvent, "id" | "createdAt" | "language">;
}

export interface QuickReplyOption {
  label: Record<Language, string>;
  prompt: Record<Language, string>;
}
