import type { Language } from "@/types/chat";
import { demoContent } from "@/lib/demoContent";
import { DemoRequestForm } from "@/components/DemoRequestForm";

interface DemoCTAProps {
  language: Language;
}

const validationContactLinks = {
  whatsapp: "https://wa.me/8092975310",
  email: "mailto:jhoanmiguel@gmail.com",
  form: "https://forms.gle/YOUR_FORM_LINK",
};

export function DemoCTA({ language }: DemoCTAProps) {
  const content = demoContent.cta[language];

  return (
    <section className="demo-section cta-section" id="request-demo">
      <div className="section-container cta-container">
        <div className="cta-copy">
          <h2>{content.headline}</h2>
          <p>{content.description}</p>
          <div className="cta-buttons">
            <a
              href={`/chat?scenario=pricing&lang=${language}`}
              className="cta-button primary"
            >
              {content.primaryButton}
            </a>
            <a
              href={`/dashboard?lang=${language}`}
              className="cta-button secondary"
            >
              {content.secondaryButton}
            </a>
          </div>
          <div className="real-contact-panel">
            <h3>{content.realContactTitle}</h3>
            <p>{content.realContactBody}</p>
            <div className="real-contact-links">
              <a href={validationContactLinks.whatsapp}>
                {content.whatsappLink}
              </a>
              <a href={validationContactLinks.email}>{content.emailLink}</a>
              <a href={validationContactLinks.form}>{content.formLink}</a>
            </div>
          </div>
        </div>
        <DemoRequestForm language={language} />
      </div>
    </section>
  );
}
