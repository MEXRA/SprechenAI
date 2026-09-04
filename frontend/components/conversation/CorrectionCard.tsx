import type { Correction } from "@/types/chat";

export function CorrectionCard({ correction }: { correction: Correction }) {
  if (correction.isCorrect) {
    return (
      <div className="mt-3 flex items-start gap-2 rounded-xl bg-moss-50 px-3 py-2.5 text-sm text-moss-700">
        <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-moss-600 text-[11px] font-black text-white">✓</span>
        <div><strong>Doğru cümle</strong><p className="mt-0.5 text-xs leading-5 text-moss-700/75">{correction.explanationTurkish}</p></div>
      </div>
    );
  }

  return (
    <div className="mt-3 rounded-2xl border border-coral/20 bg-[#fff8f4] p-4">
      <p className="text-xs font-black uppercase tracking-[0.14em] text-coral">Düzeltme ve kural</p>
      {correction.correctedGerman && (
        <div className="mt-3">
          <p className="text-[11px] font-bold text-ink/40">Cümlenin doğru hâli</p>
          <p className="mt-1 font-black text-moss-700">{correction.correctedGerman}</p>
        </div>
      )}
      <div className="mt-3 space-y-3">
        {correction.mistakes.map((mistake, index) => (
          <div key={`${mistake.incorrect}-${index}`} className="border-t border-coral/15 pt-3 first:border-0 first:pt-0">
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="line-through decoration-coral decoration-2">{mistake.incorrect}</span>
              <span className="text-ink/35">→</span>
              <strong className="text-moss-700">{mistake.correct}</strong>
              <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-black uppercase text-coral">{mistake.category}</span>
            </div>
            <p className="mt-2 text-sm font-bold text-ink">{mistake.ruleTurkish}</p>
            <p className="mt-1 text-xs leading-5 text-ink/60">{mistake.explanationTurkish}</p>
          </div>
        ))}
      </div>
      <p className="mt-3 border-t border-coral/15 pt-3 text-xs leading-5 text-ink/60">{correction.explanationTurkish}</p>
    </div>
  );
}

