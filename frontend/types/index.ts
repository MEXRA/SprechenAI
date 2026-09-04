export type LearningLevel = "A1" | "A2" | "B1" | "B2";
export type ExplanationDetail = "Quick" | "Normal" | "Deep";

export interface Scenario {
  id: string;
  title: string;
  germanTitle: string;
  description: string;
  icon: string;
  color: string;
  duration: string;
}

export interface ProgressTopic {
  name: string;
  percentage: number;
  trend: string;
  color: string;
}
