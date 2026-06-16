import { demoContent } from "@/lib/demoContent";
import type { Language } from "@/types/chat";

interface DemoValueProps {
  language: Language;
}

export function DemoValue({ language }: DemoValueProps) {
  const content = demoContent.value[language];

  return (
    <section className="demo-section value-section">
      <div className="section-container value-layout">
        <div className="section-heading">
          <p className="eyebrow">{content.eyebrow}</p>
          <h2>{content.headline}</h2>
          <p>{content.intro}</p>
        </div>
        <div className="value-card-grid">
          {content.items.map((item) => (
            <article className="value-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
