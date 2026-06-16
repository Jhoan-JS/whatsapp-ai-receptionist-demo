"use client";

import { useState } from "react";
import { resetLocalDemoData } from "@/lib/demoReset";
import type { Language } from "@/types/chat";

const copy = {
  en: {
    reset: "Reset demo",
    done: "Demo reset",
  },
  es: {
    reset: "Reiniciar demo",
    done: "Demo reiniciado",
  },
} satisfies Record<Language, Record<string, string>>;

interface DemoResetButtonProps {
  language: Language;
}

export function DemoResetButton({ language }: DemoResetButtonProps) {
  const [wasReset, setWasReset] = useState(false);

  function handleReset() {
    resetLocalDemoData();
    setWasReset(true);
    window.setTimeout(() => setWasReset(false), 1800);
  }

  return (
    <button className="demo-reset-button" onClick={handleReset} type="button">
      {wasReset ? copy[language].done : copy[language].reset}
    </button>
  );
}
