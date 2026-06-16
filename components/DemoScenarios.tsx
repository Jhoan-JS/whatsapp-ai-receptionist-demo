import { demoContent } from "@/lib/demoContent";
import type { Language } from "@/types/chat";

interface DemoScenariosProps {
  language: Language;
}

export function DemoScenarios({ language }: DemoScenariosProps) {
  const content = demoContent.scenarios[language];

  return (
    <section className="demo-section scenarios-section">
      <div className="section-container">
        <div className="section-heading">
          <h2>{content.headline}</h2>
          <p>{content.description}</p>
        </div>
        <div className="scenarios-grid">
          {content.items.map((item) => (
            <a
              className={
                item.id === "dashboard"
                  ? "scenario-card scenario-card-dashboard"
                  : "scenario-card"
              }
              href={
                item.id === "dashboard"
                  ? `/dashboard?lang=${language}`
                  : `/chat?scenario=${item.id}&lang=${language}`
              }
              key={item.id}
            >
              <span className="scenario-type">
                {item.id === "dashboard"
                  ? content.dashboardHint
                  : content.chatHint}
              </span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <span className="scenario-cta">
                {item.id === "dashboard"
                  ? content.openDashboard
                  : content.openChat}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
