import type { Metadata } from "next";
import { ProgressDashboard } from "@/components/progress/ProgressDashboard";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = { title: "Your progress" };

export default function ProgressPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <SectionHeading eyebrow="Your learning story" title="Progress you can feel." description="See where your German is becoming instinctive—and which small patterns deserve another look." />
      <ProgressDashboard />
    </div>
  );
}
