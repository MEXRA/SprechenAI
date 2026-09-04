import Link from "next/link";

const features = [
  { number: "01", title: "Choose a real moment", text: "Practice the conversations you actually need—from ordering dinner to meeting a landlord." },
  { number: "02", title: "Speak with context", text: "Follow realistic dialogue with Turkish translations and level-aware German." },
  { number: "03", title: "See why it works", text: "Inspect cases, articles, verbs, contractions, and word order without losing the flow." },
];

export default function HomePage() {
  return (
    <div>
      <section className="app-grid overflow-hidden border-b border-moss-900/10">
        <div className="mx-auto grid min-h-[690px] max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:py-20">
          <div className="animate-rise">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-moss-700/15 bg-white/70 px-3 py-1.5 text-xs font-bold text-moss-700 shadow-sm">
              <span className="size-2 rounded-full bg-coral" />
              Your real-life German studio
            </div>
            <h1 className="max-w-3xl text-5xl font-black leading-[0.98] tracking-[-0.055em] text-ink sm:text-6xl lg:text-7xl">
              Don&apos;t just learn German. <span className="text-moss-600">Live it.</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-ink/65">
              Build the confidence to speak in restaurants, offices, airports, and everywhere life takes you—with explanations that finally make grammar click.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/scenarios" className="rounded-full bg-moss-700 px-6 py-3.5 text-center text-sm font-black text-white shadow-lg shadow-moss-900/15 transition hover:-translate-y-0.5 hover:bg-moss-900">
                Choose a scenario <span aria-hidden="true">→</span>
              </Link>
              <Link href="/conversation" className="rounded-full border border-moss-900/15 bg-white/70 px-6 py-3.5 text-center text-sm font-black text-ink transition hover:bg-white">
                Try the demo
              </Link>
            </div>
            <div className="mt-10 flex items-center gap-4 text-sm text-ink/55">
              <div className="flex -space-x-2" aria-hidden="true">
                {[["N", "bg-coral"], ["A", "bg-gold"], ["D", "bg-moss-400"]].map(([letter, color]) => (
                  <span key={letter} className={`grid size-9 place-items-center rounded-full border-2 border-cream ${color} font-black text-white`}>{letter}</span>
                ))}
              </div>
              <p><strong className="text-ink">Grammar, decoded.</strong><br />Not memorized.</p>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl lg:mr-0">
            <div className="absolute -left-12 top-16 size-44 rounded-full bg-gold/25 blur-3xl" />
            <div className="relative rotate-1 rounded-4xl border border-white/80 bg-white/85 p-4 shadow-float backdrop-blur sm:p-6">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-moss-600">At the cinema</p>
                  <p className="mt-1 font-bold">A2 conversation</p>
                </div>
                <span className="rounded-full bg-moss-50 px-3 py-1 text-xs font-bold text-moss-700">Live practice</span>
              </div>
              <div className="space-y-3">
                <div className="mr-8 rounded-3xl rounded-tl-md bg-moss-900 p-5 text-white">
                  <p className="text-lg font-bold">Was machst du heute Abend?</p>
                  <p className="mt-1 text-sm text-white/60">Bu akşam ne yapıyorsun?</p>
                </div>
                <div className="ml-8 rounded-3xl rounded-tr-md bg-moss-50 p-5">
                  <p className="text-lg font-bold">Ich gehe mit meinem Freund ins Kino.</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="rounded-md bg-[#e0f0e5] px-2 py-1 text-[10px] font-black text-moss-700">DAT</span>
                    <span className="rounded-md bg-[#ffeadf] px-2 py-1 text-[10px] font-black text-[#a54f36]">AKK</span>
                    <span className="rounded-md bg-[#fff2c8] px-2 py-1 text-[10px] font-black text-[#7b5b07]">VERB</span>
                  </div>
                </div>
                <div className="rounded-2xl border border-coral/20 bg-[#fff8f4] p-4">
                  <p className="text-xs font-black uppercase tracking-wider text-coral">Grammar insight</p>
                  <p className="mt-2 text-sm font-bold">mit meinem Freund</p>
                  <p className="mt-1 text-sm leading-6 text-ink/60"><strong>mit</strong> always takes Dativ. <strong>der Freund</strong> becomes <strong>meinem Freund</strong>.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-2xl">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-moss-600">A calmer way to progress</p>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] sm:text-4xl">From hesitation to conversation.</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {features.map((feature) => (
            <article key={feature.number} className="rounded-3xl border border-moss-900/10 bg-white/65 p-6 shadow-card transition hover:-translate-y-1 hover:bg-white">
              <span className="text-xs font-black tracking-widest text-coral">{feature.number}</span>
              <h3 className="mt-8 text-xl font-black tracking-tight">{feature.title}</h3>
              <p className="mt-3 text-sm leading-6 text-ink/60">{feature.text}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

