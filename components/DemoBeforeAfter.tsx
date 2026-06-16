import type { Language } from "@/types/chat";
import { demoContent } from "@/lib/demoContent";

interface DemoBeforeAfterProps {
  language: Language;
}

export function DemoBeforeAfter({ language }: DemoBeforeAfterProps) {
  const content = demoContent.beforeAfter[language];

  return (
    <section className="demo-section before-after-section">
      <div className="section-container">
        <div className="section-heading compact-heading">
          <h2>{content.headline}</h2>
        </div>
        <div className="before-after-grid">
          <div className="before-card">
            <span className="comparison-label">{content.before.label}</span>
            <h3>{content.before.title}</h3>
            <ul>
              {content.before.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="after-card">
            <span className="comparison-label">{content.after.label}</span>
            <h3>{content.after.title}</h3>
            <ul>
              {content.after.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
