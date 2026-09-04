export function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="max-w-2xl">
      <p className="mb-3 text-xs font-black uppercase tracking-[0.22em] text-moss-600">{eyebrow}</p>
      <h1 className="text-4xl font-black tracking-[-0.045em] text-ink sm:text-5xl">{title}</h1>
      <p className="mt-4 text-base leading-7 text-ink/60 sm:text-lg">{description}</p>
    </div>
  );
}

