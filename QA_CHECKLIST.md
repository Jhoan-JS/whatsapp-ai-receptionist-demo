# Demo QA Checklist

Use this before showing the MVP to a clinic owner.

## Landing

- English landing page loads with the sales message.
- Spanish toggle updates the sales copy.
- Navigation links work: patient chat, owner dashboard, request demo.
- Mobile layout has no horizontal overflow.
- No browser console errors.

## Scenarios

- Pricing scenario opens `/chat?scenario=pricing&lang=en`.
- Appointment scenario opens `/chat?scenario=appointment&lang=en`.
- Emergency scenario opens `/chat?scenario=emergency&lang=en`.
- Complex scenario opens `/chat?scenario=complex&lang=en`.
- Spanish scenarios open with `lang=es`.
- Scenario page preloads or highlights the suggested patient message.
- **Send scenario** sends the suggested patient message.

## Conversation

- Pricing question gets a price answer and appointment prompt.
- Appointment request starts lead capture.
- Emergency question gets emergency guidance and follow-up path.
- Complex question triggers human escalation.
- Spanish `si` after an appointment prompt starts lead capture.
- Spanish `no` after an appointment prompt cancels politely.
- English `yes` after an appointment prompt starts lead capture.
- English `no` after an appointment prompt cancels politely.

## Dashboard

- `/dashboard?lang=en` loads in English.
- `/dashboard?lang=es` loads in Spanish.
- Dashboard language toggle switches labels and seeded examples.
- Completed lead appears in the dashboard.
- Conversation events affect dashboard common questions.
- Human escalation appears in dashboard metrics.
- Seeded demo examples still appear when storage is empty.

## Request Demo

- Request demo form accepts clinic name, contact, phone, email, language, and message.
- Submitted request is stored in localStorage.
- Success message appears after submit.
- Placeholder real-contact links are visible for WhatsApp, email, and form.

## Reset

- Reset demo clears captured leads.
- Reset demo clears conversation events.
- Reset demo clears stored demo requests.
- Seeded dashboard fallback still appears after reset.
