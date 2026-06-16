# WhatsApp AI Receptionist Demo

A low-budget MVP demo for a fictional dental clinic. The app shows how a WhatsApp-style AI receptionist can answer common patient questions, capture appointment requests, flag complex questions for human follow-up, and summarize activity for the clinic owner.

## What This Demo Proves

The demo is designed to validate one business value:

> Clinics may lose patients because they reply too late, forget to follow up, or fail to capture appointment requests properly.

This MVP shows:

- Instant FAQ responses for prices, hours, location, services, insurance, emergencies, and payment methods.
- Structured lead capture for name, phone, service needed, and preferred appointment time.
- Human escalation for uncertain or complex questions.
- A clinic owner dashboard with leads, hot leads, common questions, and follow-up needs.
- Real WhatsApp and email contact links for validation.

## Tech Stack

- Next.js / React
- Static export with `output: "export"`
- Local browser storage only
- No backend, database, authentication, AI API, WhatsApp API, payments, or calendar integration yet

## Local Setup

```bash
npm install
npm run build
npm start
```

Then open:

```text
http://127.0.0.1:3000
```

For development:

```bash
npm run dev
```

## Available Routes

- `/` - Sales-ready demo landing page
- `/chat` - Patient chat simulator
- `/dashboard` - Clinic owner dashboard

## Demo Scenario URLs

English:

- `/chat?scenario=pricing&lang=en`
- `/chat?scenario=appointment&lang=en`
- `/chat?scenario=emergency&lang=en`
- `/chat?scenario=complex&lang=en`

Spanish:

- `/chat?scenario=pricing&lang=es`
- `/chat?scenario=appointment&lang=es`
- `/chat?scenario=emergency&lang=es`
- `/chat?scenario=complex&lang=es`

Dashboard:

- `/dashboard?lang=en`
- `/dashboard?lang=es`

## Reset Demo Data

Use the visible **Reset demo** / **Reiniciar demo** button in the landing page, chat page, or dashboard.

Reset clears localStorage data for:

- Captured leads
- Conversation events
- Any legacy local demo request submissions

Seeded dashboard examples remain available as fallback so the dashboard still looks useful after reset.

## Vercel Deployment

This project is static-export friendly.

Recommended Vercel settings:

- Framework preset: Next.js
- Build command: `npm run build`
- Output directory: `out`
- Environment variables: none required

The current `next.config.mjs` uses:

```js
output: "export"
```

## Real Validation Contact

The request demo CTA includes direct contact links for real validation:

- WhatsApp: `https://wa.me/18092975310`
- Email: `mailto:jhoanmiguel06@gmail.com`

There is no public request form because this static MVP does not send form submissions anywhere. The Google Form/Tally-style link is hidden until a real form URL is available.

## Current Limitations

- No real WhatsApp Cloud API integration.
- No OpenAI or AI model call.
- No Supabase, Airtable, Google Sheets, or persistent database.
- No authentication or multi-tenant admin system.
- No Google Calendar or booking integration.
- No real form submission backend.
- FAQ and escalation behavior are mocked/rule-based.
- All data is fictional or stored locally in the browser.

## Roadmap

See [ROADMAP.md](./ROADMAP.md) for the phased plan.

## Validation Plan

See [VALIDATION_PLAN.md](./VALIDATION_PLAN.md) for a practical plan to test this MVP with 3-5 dental clinics.
