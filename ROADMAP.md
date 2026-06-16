# MVP Roadmap

## Phase 1: Demo Validation

- Share the static demo with 3-5 dental clinics.
- Test pricing, appointment, emergency, and complex-question scenarios.
- Validate whether missed WhatsApp follow-up is a real pain.
- Capture feedback on dashboard usefulness and Spanish/English needs.

## Phase 2: Real Contact Capture

- Keep validation requests routed through real WhatsApp and email links.
- Decide whether a future intake form should use Google Forms, Tally, Airtable, or a small backend.
- Add a simple owner-facing intake flow if validation conversations justify it.

## Phase 3: Supabase Or Database Persistence

- Replace localStorage leads and events with Supabase or another simple database.
- Store leads, events, contact requests, and clinic profile settings.
- Keep the schema small and focused on one clinic or pilot account.

## Phase 4: OpenAI-Powered Assistant

- Replace the rule-based FAQ matcher with an OpenAI-powered conversation layer.
- Keep guardrails for pricing, medical uncertainty, emergency guidance, and human escalation.
- Add a small clinic knowledge base for FAQs and policies.

## Phase 5: WhatsApp Cloud API Integration

- Connect inbound and outbound WhatsApp messages.
- Map WhatsApp conversations to leads and events.
- Add opt-in, message templates, and basic operational logging.

## Phase 6: Calendar Integration

- Integrate Google Calendar, Cal.com, or another scheduling tool.
- Start with appointment requests and staff confirmation before fully automated booking.
- Avoid double-booking and respect clinic availability rules.

## Phase 7: Paid Pilot With 1-3 Clinics

- Run a limited paid pilot with clinics that showed strong validation signals.
- Measure captured leads, response speed, booked appointments, and staff time saved.
- Use pilot feedback to decide whether to build a multi-tenant product.
