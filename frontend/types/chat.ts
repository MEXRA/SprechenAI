import type { ExplanationDetail, LearningLevel } from "@/types";

export interface MistakeDetail {
  incorrect: string;
  correct: string;
  category: string;
  ruleTurkish: string;
  explanationTurkish: string;
}

export interface Correction {
  isCorrect: boolean;
  correctedGerman: string | null;
  explanationTurkish: string;
  mistakes: MistakeDetail[];
}

export interface ChatMessage {
  id: string;
  role: "coach" | "user";
  germanText: string;
  turkishTranslation: string | null;
  correction?: Correction | null;
}

export interface Conversation {
  id: string;
  scenario: string;
  learningLevel: LearningLevel;
  explanationDetail: ExplanationDetail;
  messages: ChatMessage[];
}

export interface AiStatus {
  aiConfigured: boolean;
  model: string;
}

