import type { Metadata } from "next";
import { ScenarioGrid } from "@/components/scenarios/ScenarioGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = { title: "Choose a scenario" };

export default function ScenariosPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <SectionHeading eyebrow="Pick your moment" title="Where will you speak next?" description="Choose a setting and step into a guided conversation. Every scenario adapts to your level and explanation preference." />
      <div className="mt-10"><ScenarioGrid /></div>
    </div>
  );
}
