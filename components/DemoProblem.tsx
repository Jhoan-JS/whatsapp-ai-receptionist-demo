import type { Language } from "@/types/chat";
import { demoContent } from "@/lib/demoContent";

interface DemoProblemProps {
  language: Language;
}

export function DemoProblem({ language }: DemoProblemProps) {
  const content = demoContent.problem[language];

  return (
    <section className="demo-section problem-section">
      <div className="section-container">
        <div className="section-heading">
          <h2>{content.headline}</h2>
          <p>{content.description}</p>
        </div>
        <div className="problem-grid">
          {content.items.map((item, index) => (
            <article key={item.title} className="problem-card">
              <span className="problem-index">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
