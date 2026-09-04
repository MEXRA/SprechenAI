"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home", icon: "⌂" },
  { href: "/scenarios", label: "Scenarios", icon: "▦" },
  { href: "/conversation", label: "Practice", icon: "◉" },
  { href: "/progress", label: "Progress", icon: "↗" },
];

export function MobileNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed inset-x-3 bottom-3 z-50 flex h-16 items-center justify-around rounded-2xl border border-white/60 bg-moss-900/95 px-2 shadow-float backdrop-blur-lg md:hidden" aria-label="Mobile navigation">
      {links.map((link) => {
        const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
        return (
          <Link key={link.href} href={link.href} className={`flex min-w-16 flex-col items-center gap-0.5 rounded-xl px-2 py-1 text-[11px] font-semibold transition ${active ? "text-gold" : "text-white/60"}`}>
            <span className="text-xl leading-5" aria-hidden="true">{link.icon}</span>
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}

