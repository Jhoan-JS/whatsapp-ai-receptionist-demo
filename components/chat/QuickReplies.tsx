import type { Language, QuickReplyOption } from "@/types/chat";

interface QuickRepliesProps {
  language: Language;
  options: QuickReplyOption[];
  disabled?: boolean;
  onSelect: (prompt: string) => void;
}

export function QuickReplies({
  language,
  options,
  disabled = false,
  onSelect,
}: QuickRepliesProps) {
  return (
    <div className="quick-replies" aria-label="Demo scenarios">
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
