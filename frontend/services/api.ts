import type { ExplanationDetail, LearningLevel } from "@/types";
import type { AiStatus, ChatMessage, Conversation } from "@/types/chat";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5080";

export class ApiError extends Error {
  constructor(message: string, public readonly status?: number) {
    super(message);
    this.name = "ApiError";
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      ...init,
      headers: { "Content-Type": "application/json", ...init?.headers },
    });
  } catch {
    throw new ApiError("Backend'e ulaşılamıyor. Visual Studio'da SprechenAI.Api projesini çalıştır.");
  }

  if (!response.ok) {
    const body = await response.json().catch(() => null) as { detail?: string; message?: string } | null;
    throw new ApiError(body?.detail ?? body?.message ?? "İstek tamamlanamadı.", response.status);
  }

  return response.json() as Promise<T>;
}

export const sprechenApi = {
  getStatus: () => request<AiStatus>("/api/config/status"),

  startConversation: (scenario: string, learningLevel: LearningLevel, explanationDetail: ExplanationDetail) =>
    request<Conversation>("/api/conversations", {
      method: "POST",
      body: JSON.stringify({ scenario, learningLevel, explanationDetail }),
    }),

  sendMessage: (conversationId: string, text: string) =>
    request<ChatMessage>("/api/messages", {
      method: "POST",
      body: JSON.stringify({ conversationId, text }),
    }),
};

