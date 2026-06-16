import type { SummaryCardData } from "@/lib/dashboardData";

interface SummaryCardsProps {
  cards: SummaryCardData[];
  ariaLabel: string;
}

export function SummaryCards({ cards, ariaLabel }: SummaryCardsProps) {
  return (
    <section className="summary-grid" aria-label={ariaLabel}>
      {cards.map((card) => (
        <article className={`summary-card summary-${card.tone}`} key={card.id}>
          <p>{card.label}</p>
          <strong>{card.value}</strong>
          <span>{card.detail}</span>
        </article>
      ))}
    </section>
  );
}
