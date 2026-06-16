import type { Language } from "@/types/chat";
import { demoContent } from "@/lib/demoContent";

interface DemoHowItWorksProps {
  language: Language;
}

export function DemoHowItWorks({ language }: DemoHowItWorksProps) {
  const content = demoContent.howItWorks[language];

  return (
    <section className="demo-section how-it-works-section">
      <div className="section-container">
        <div className="section-heading compact-heading">
          <h2>{content.headline}</h2>
        </div>
        <div className="steps-container">
          {content.steps.map((step) => (
            <article key={step.title} className="step-card">
              <div className="step-number">{step.number}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
