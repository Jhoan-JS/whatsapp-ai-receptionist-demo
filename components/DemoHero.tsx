import type { Language } from "@/types/chat";
import { demoContent } from "@/lib/demoContent";

interface DemoHeroProps {
  language: Language;
}

export function DemoHero({ language }: DemoHeroProps) {
  const content = demoContent.hero[language];

  return (
    <section className="sales-hero">
      <div className="sales-hero-visual" aria-hidden="true">
        <span className="hero-message hero-message-one">
          {content.visualMessages[0]}
        </span>
        <span className="hero-message hero-message-two">
          {content.visualMessages[1]}
        </span>
        <span className="hero-message hero-message-three">
          {content.visualMessages[2]}
        </span>
      </div>
      <div className="section-container sales-hero-content">
        <p className="eyebrow">{content.eyebrow}</p>
        <h1>{content.headline}</h1>
        <p className="subheadline">{content.subheadline}</p>
        <div className="hero-actions">
          <a
            href={`/chat?scenario=pricing&lang=${language}`}
            className="cta-button primary"
          >
            {content.primaryCta}
          </a>
          <a href={`/dashboard?lang=${language}`} className="cta-button secondary">
            {content.secondaryCta}
          </a>
        </div>
        <div className="hero-proof-grid">
          {content.proofPoints.map((point) => (
            <div className="hero-proof" key={point.label}>
              <strong>{point.value}</strong>
              <span>{point.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
