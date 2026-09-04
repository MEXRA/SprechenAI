"use client";

import { useState } from "react";
import Link from "next/link";
import { progressTopics } from "@/data/progress";

export function ProgressDashboard() {
  const [range, setRange] = useState<"Week" | "Month" | "All time">("Month");
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="mt-10">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex rounded-full border border-moss-900/10 bg-white/70 p-1">
          {(["Week", "Month", "All time"] as const).map((item) => (
            <button key={item} type="button" onClick={() => setRange(item)} className={`rounded-full px-4 py-2 text-xs font-black transition ${range === item ? "bg-moss-900 text-white" : "text-ink/45 hover:text-ink"}`}>{item}</button>
          ))}
        </div>
        <p className="text-sm font-semibold text-ink/45">Showing your {range.toLowerCase()} activity</p>
      </div>

      <section className="grid gap-4 md:grid-cols-3" aria-label="Learning summary">
        <article className="overflow-hidden rounded-3xl bg-moss-900 p-6 text-white shadow-float md:col-span-2">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-white/45">Overall confidence</p>
          <div className="mt-5 flex items-end justify-between gap-4">
            <div><span className="text-6xl font-black tracking-[-0.06em]">64</span><span className="text-2xl font-bold text-white/45">%</span><p className="mt-2 text-sm text-white/55">You&apos;re building momentum.</p></div>
            <div className="flex h-24 items-end gap-2" aria-label="Activity chart">
              {[38, 62, 48, 72, 58, 84, 74].map((height, index) => <span key={index} className={`w-3 rounded-full ${index === 5 ? "bg-gold" : "bg-white/20"}`} style={{ height: `${height}%` }} />)}
            </div>
          </div>
        </article>
        <article className="rounded-3xl border border-moss-900/10 bg-white/75 p-6 shadow-card">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-ink/35">Practice streak</p>
          <p className="mt-5 text-5xl font-black tracking-[-0.05em] text-coral">7 <span className="text-base text-ink/40">days</span></p>
          <div className="mt-7 flex justify-between">
            {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => <span key={`${day}-${index}`} className={`grid size-8 place-items-center rounded-full text-xs font-black ${index < 6 ? "bg-moss-50 text-moss-700" : "border border-dashed border-moss-900/20 text-ink/30"}`}>{index < 6 ? "✓" : day}</span>)}
          </div>
        </article>
      </section>

      <section className="mt-8" aria-labelledby="skills-heading">
        <div className="mb-4 flex items-center justify-between">
          <div><p className="text-xs font-black uppercase tracking-[0.18em] text-moss-600">Skill map</p><h2 id="skills-heading" className="mt-1 text-2xl font-black tracking-tight">Grammar progress</h2></div>
          <span className="rounded-full bg-white px-3 py-1.5 text-xs font-bold text-ink/45 shadow-sm">6 topics</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {progressTopics.map((topic) => (
            <article key={topic.name} className="rounded-3xl border border-moss-900/10 bg-white/75 p-5 shadow-card">
              <div className="flex items-start justify-between">
                <div><h3 className="font-black">{topic.name}</h3><p className="mt-1 text-xs font-bold text-moss-600">{topic.trend} this month</p></div>
                <span className="text-2xl font-black tracking-tight">{topic.percentage}%</span>
              </div>
              <div className="mt-6 h-2 overflow-hidden rounded-full bg-moss-900/[0.07]" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={topic.percentage} aria-label={`${topic.name} ${topic.percentage}%`}>
                <div className={`h-full rounded-full ${topic.color}`} style={{ width: `${topic.percentage}%` }} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-3xl border border-moss-900/10 bg-white/75 p-5 shadow-card sm:p-7" aria-labelledby="mistakes-heading">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div><p className="text-xs font-black uppercase tracking-[0.18em] text-coral">Review & remember</p><h2 id="mistakes-heading" className="mt-1 text-2xl font-black tracking-tight">Common Mistakes</h2></div>
          <Link href="/conversation" className="rounded-full bg-moss-700 px-4 py-2.5 text-center text-xs font-black text-white transition hover:bg-moss-900">Practice this pattern →</Link>
        </div>
        <div className="mt-6 grid gap-5 border-t border-moss-900/10 pt-6 md:grid-cols-[1fr_1fr_auto] md:items-center">
          <div><p className="text-[10px] font-black uppercase tracking-wider text-coral">Incorrect</p><p className="mt-1 text-lg font-bold line-through decoration-coral decoration-2">mit meinen Freund</p></div>
          <div><p className="text-[10px] font-black uppercase tracking-wider text-moss-600">Correct</p><p className="mt-1 text-lg font-bold text-moss-700">mit meinem Freund</p></div>
          <div className="flex gap-2 md:justify-end"><span className="rounded-full bg-moss-50 px-3 py-1.5 text-xs font-black text-moss-700">Dativ</span><span className="rounded-full bg-[#fff0e8] px-3 py-1.5 text-xs font-black text-coral">4×</span></div>
        </div>
        <button type="button" onClick={() => setExpanded(!expanded)} className="mt-5 text-sm font-black text-moss-700 underline decoration-moss-400 underline-offset-4">{expanded ? "Hide rule" : "Why does this happen?"}</button>
        {expanded && <div className="mt-4 rounded-2xl bg-cream p-4 text-sm leading-6 text-ink/65 animate-rise"><strong className="text-ink">mit</strong> always takes Dativ. Because Freund is masculine (<strong>der Freund</strong>), possessive <strong>mein</strong> changes to <strong>meinem</strong>. Compare: mit meinem Bruder, mit meinem Vater.</div>}
      </section>
    </div>
  );
}

