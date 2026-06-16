import type { Language, QuickReplyOption } from "@/types/chat";

interface QuickRepliesProps {
  language: Language;
  options: QuickReplyOption[];
  disabled?: boolean;
  onSelect: (prompt: string) => void;
}

const copy = {
  en: {
    ariaLabel: "Demo scenarios",
  },
  es: {
    ariaLabel: "Escenarios de demo",
  },
} satisfies Record<Language, Record<string, string>>;

export function QuickReplies({
  language,
  options,
  disabled = false,
  onSelect,
}: QuickRepliesProps) {
  return (
    <div className="quick-replies" aria-label={copy[language].ariaLabel}>
      {options.map((option) => (
        <button
          className="quick-reply"
          disabled={disabled}
          key={option.label.en}
          onClick={() => onSelect(option.prompt[language])}
          type="button"
        >
          {option.label[language]}
        </button>
      ))}
    </div>
  );
}
