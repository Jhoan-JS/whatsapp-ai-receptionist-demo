import type { Language } from "@/types/chat";
import { demoContent } from "@/lib/demoContent";

interface DemoCTAProps {
  language: Language;
}

const validationContactLinks = {
  whatsapp: "https://wa.me/18092975310",
  email: "mailto:jhoanmiguel06@gmail.com",
};

export function DemoCTA({ language }: DemoCTAProps) {
  const content = demoContent.cta[language];

  return (
    <section className="demo-section cta-section" id="request-demo">
      <div className="section-container cta-container">
        <div className="cta-copy public-contact-cta">
          <h2>{content.headline}</h2>
          <p>{content.description}</p>
          <div className="real-contact-links public-contact-links">
            <a
              className="real-contact-link primary"
              href={validationContactLinks.whatsapp}
              rel="noreferrer"
              target="_blank"
            >
              {content.primaryButton}
            </a>
            <a
              className="real-contact-link secondary"
              href={validationContactLinks.email}
            >
              {content.secondaryButton}
            </a>
          </div>
          <p className="cta-note">{content.realContactBody}</p>
        </div>
      </div>
    </section>
  );
}
