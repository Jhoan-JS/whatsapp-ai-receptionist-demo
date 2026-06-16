import type { CommonQuestion } from "@/lib/dashboardData";
import type { Language } from "@/types/chat";

interface CommonQuestionsProps {
  questions: CommonQuestion[];
  language: Language;
}

const copy = {
  en: {
    kicker: "Today",
    title: "Most common questions",
  },
  es: {
    kicker: "Hoy",
    title: "Preguntas frecuentes",
  },
} satisfies Record<Language, Record<string, string>>;

export function CommonQuestions({ questions, language }: CommonQuestionsProps) {
  const text = copy[language];

  return (
    <section className="questions-panel" aria-labelledby="questions-title">
      <div className="section-heading-row">
        <div>
          <p className="panel-kicker">{text.kicker}</p>
          <h2 id="questions-title">{text.title}</h2>
        </div>
      </div>

      <div className="question-list">
        {questions.map((question) => (
          <article className="question-row" key={question.id}>
            <div>
              <h3>{question.topic}</h3>
              <p>{question.example}</p>
            </div>
            <strong>{question.count}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}
