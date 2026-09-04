"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandMark } from "@/components/ui/BrandMark";

const links = [
  { href: "/", label: "Home" },
  { href: "/scenarios", label: "Scenarios" },
  { href: "/conversation", label: "Practice" },
  { href: "/progress", label: "Progress" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-moss-900/10 bg-cream/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="Go to SprechenAI home">
          <BrandMark />
        </Link>
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {links.map((link) => {
            const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  active ? "bg-moss-900 text-white" : "text-ink/60 hover:bg-white hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <Link
          href="/scenarios"
          className="rounded-full bg-moss-600 px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-moss-700"
        >
          Start practice
        </Link>
      </div>
    </header>
  );
}

