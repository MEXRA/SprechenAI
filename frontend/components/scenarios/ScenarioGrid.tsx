"use client";

import { useState } from "react";
import { scenarios } from "@/data/scenarios";
import { ScenarioCard } from "./ScenarioCard";

export function ScenarioGrid() {
  const [selected, setSelected] = useState("restaurant");
  const [query, setQuery] = useState("");
  const [customTopic, setCustomTopic] = useState("Günlük hayat");
  const filtered = scenarios.filter((scenario) => `${scenario.title} ${scenario.germanTitle}`.toLowerCase().includes(query.toLowerCase()));

  return (
    <div>
      <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="relative block w-full sm:max-w-xs">
          <span className="sr-only">Search scenarios</span>
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink/35">⌕</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find a situation..." className="w-full rounded-full border border-moss-900/10 bg-white py-3 pl-10 pr-4 text-sm shadow-sm outline-none transition focus:border-moss-500" />
        </label>
        <p className="text-sm font-semibold text-ink/45">{filtered.length} situations ready to practice</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {filtered.map((scenario) => <ScenarioCard key={scenario.id} scenario={scenario} selected={selected === scenario.id} onSelect={() => setSelected(scenario.id)} customTopic={customTopic} onCustomTopic={setCustomTopic} />)}
      </div>
      {filtered.length === 0 && <div className="rounded-3xl border border-dashed border-moss-900/20 p-12 text-center text-ink/50">No scenarios match that search.</div>}
    </div>
  );
}
