import { Header } from "./Header";
import { MobileNav } from "./MobileNav";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Header />
      <main>{children}</main>
      <MobileNav />
    </div>
  );
}

