"use client";

import Link from "next/link";
import type { Scenario } from "@/types";

export function ScenarioCard({ scenario, selected, onSelect, customTopic, onCustomTopic }: { scenario: Scenario; selected: boolean; onSelect: () => void; customTopic?: string; onCustomTopic?: (value: string) => void }) {
  const href = scenario.id === "custom"
    ? `/conversation?scenario=custom&topic=${encodeURIComponent(customTopic?.trim() || "Günlük hayat")}`
    : `/conversation?scenario=${scenario.id}`;

  return (
    <article className={`group relative rounded-3xl border bg-white/75 p-4 shadow-card transition duration-300 hover:-translate-y-1 hover:bg-white ${selected ? "border-moss-600 ring-2 ring-moss-600/15" : "border-moss-900/10"}`}>
      <button type="button" onClick={onSelect} className="w-full text-left" aria-pressed={selected}>
        <div className={`grid size-12 place-items-center rounded-2xl ${scenario.color} text-2xl font-black text-ink`} aria-hidden="true">{scenario.icon}</div>
        <div className="mt-5 flex items-start justify-between gap-3">
          <div>
            <h2 className="font-black tracking-tight text-ink">{scenario.title}</h2>
            <p className="mt-0.5 text-xs font-semibold text-moss-600">{scenario.germanTitle}</p>
          </div>
          <span className={`grid size-6 shrink-0 place-items-center rounded-full border text-xs transition ${selected ? "border-moss-600 bg-moss-600 text-white" : "border-moss-900/15 text-transparent"}`}>✓</span>
        </div>
        <p className="mt-3 min-h-10 text-sm leading-5 text-ink/55">{scenario.description}</p>
        <p className="mt-4 text-xs font-bold text-ink/35">◷ {scenario.duration}</p>
      </button>
      {selected && (
        <div className="mt-4">
          {scenario.id === "custom" && (
            <input value={customTopic} onChange={(event) => onCustomTopic?.(event.target.value)} maxLength={120} placeholder="Örn. yeni işim" className="mb-2 w-full rounded-xl border border-moss-900/10 bg-cream px-3 py-2.5 text-sm font-semibold outline-none focus:border-moss-500" aria-label="Özel konuşma konusu" />
          )}
          <Link href={href} className="block rounded-2xl bg-moss-700 px-4 py-3 text-center text-sm font-black text-white transition hover:bg-moss-900">
            Bu konuda konuş →
          </Link>
        </div>
      )}
    </article>
  );
}
