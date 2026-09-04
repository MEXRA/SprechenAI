export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2.5" aria-label="SprechenAI">
      <span className="relative grid size-9 place-items-center rounded-xl bg-moss-700 text-white shadow-sm">
        <svg aria-hidden="true" viewBox="0 0 32 32" className="size-6 fill-none stroke-current" strokeWidth="2.2">
          <path d="M6 8.5h20v12H15l-6 5v-5H6z" strokeLinejoin="round" />
          <path d="M11 13h10M11 17h7" strokeLinecap="round" />
        </svg>
        <span className="absolute -right-1 -top-1 size-2.5 rounded-full border-2 border-cream bg-gold" />
      </span>
      {!compact && (
        <span className="text-lg font-black tracking-[-0.04em] text-ink">
          Sprechen<span className="text-moss-600">AI</span>
        </span>
      )}
    </div>
  );
}

