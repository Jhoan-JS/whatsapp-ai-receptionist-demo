"use client";

import { FormEvent, useEffect, useState } from "react";
import { appendDemoRequest } from "@/lib/demoRequests";
import { demoContent } from "@/lib/demoContent";
import type { Language } from "@/types/chat";

interface DemoRequestFormProps {
  language: Language;
}

export function DemoRequestForm({ language }: DemoRequestFormProps) {
  const content = demoContent.cta[language];
  const [clinicName, setClinicName] = useState("");
  const [contactName, setContactName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [preferredLanguage, setPreferredLanguage] =
    useState<Language>(language);
  const [message, setMessage] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setPreferredLanguage(language);
  }, [language]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    appendDemoRequest({
      clinicName: clinicName.trim(),
      contactName: contactName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      preferredLanguage,
      message: message.trim(),
    });

    setClinicName("");
    setContactName("");
    setPhone("");
    setEmail("");
    setPreferredLanguage(language);
    setMessage("");
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2400);
  }

  return (
    <form className="request-demo-form" onSubmit={handleSubmit}>
      <h3>{content.formTitle}</h3>
      <div className="request-form-grid">
        <label>
          <span>{content.clinicName}</span>
          <input
            onChange={(event) => setClinicName(event.target.value)}
            required
            type="text"
            value={clinicName}
          />
        </label>
        <label>
          <span>{content.contactName}</span>
          <input
            onChange={(event) => setContactName(event.target.value)}
            required
            type="text"
            value={contactName}
          />
        </label>
        <label>
          <span>{content.phone}</span>
          <input
            onChange={(event) => setPhone(event.target.value)}
            required
            type="tel"
            value={phone}
          />
        </label>
        <label>
          <span>{content.email}</span>
          <input
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            value={email}
          />
        </label>
      </div>
      <label>
        <span>{content.preferredLanguage}</span>
        <select
          onChange={(event) =>
            setPreferredLanguage(event.target.value as Language)
          }
          value={preferredLanguage}
        >
          <option value="en">English</option>
          <option value="es">Español</option>
        </select>
      </label>
      <label>
        <span>{content.message}</span>
        <textarea
          onChange={(event) => setMessage(event.target.value)}
          rows={3}
          value={message}
        />
      </label>
      <div className="request-form-footer">
        <button className="cta-button primary" type="submit">
          {content.submitButton}
        </button>
        {saved ? <span>{content.success}</span> : null}
      </div>
    </form>
  );
}
