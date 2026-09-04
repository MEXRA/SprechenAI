"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { ExplanationDetail, LearningLevel } from "@/types";
import type { ChatMessage } from "@/types/chat";
import { scenarios } from "@/data/scenarios";
import { ApiError, sprechenApi } from "@/services/api";
import { ChatBubble } from "./ChatBubble";
import { ChatComposer } from "./ChatComposer";

export function ConversationWorkspace() {
  const [topic, setTopic] = useState("Im Restaurant");
  const [level, setLevel] = useState<LearningLevel>("A2");
  const [detail, setDetail] = useState<ExplanationDetail>("Deep");
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [aiConfigured, setAiConfigured] = useState<boolean | null>(null);
  const [model, setModel] = useState("");
  const [starting, setStarting] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const initialized = useRef(false);
  const messagesEnd = useRef<HTMLDivElement>(null);

  async function startConversation(nextTopic = topic, nextLevel = level, nextDetail = detail) {
    setStarting(true);
    setError(null);
    try {
      const conversation = await sprechenApi.startConversation(nextTopic, nextLevel, nextDetail);
      setConversationId(conversation.id);
      setMessages(conversation.messages);
      setTopic(conversation.scenario);
    } catch (exception) {
      setConversationId(null);
      setMessages([]);
      setError(exception instanceof ApiError ? exception.message : "Konuşma başlatılamadı.");
    } finally {
      setStarting(false);
    }
  }

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const params = new URLSearchParams(window.location.search);
    const scenarioId = params.get("scenario") ?? "restaurant";
    const customTopic = params.get("topic")?.trim();
    const scenario = scenarios.find((item) => item.id === scenarioId);
    const initialTopic = customTopic || scenario?.germanTitle || "Alltag in Deutschland";
    setTopic(initialTopic);

    void sprechenApi.getStatus()
      .then((status) => { setAiConfigured(status.aiConfigured); setModel(status.model); })
      .catch(() => setAiConfigured(null));
    void startConversation(initialTopic, "A2", "Deep");
  }, []);

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, sending]);

  async function sendMessage() {
    const text = draft.trim();
    if (!text || !conversationId || sending || aiConfigured === false) return;

    const optimisticMessage: ChatMessage = {
      id: `local-${Date.now()}`,
      role: "user",
      germanText: text,
      turkishTranslation: null,
    };
    setDraft("");
    setError(null);
    setSending(true);
    setMessages((current) => [...current, optimisticMessage]);

    try {
      const coachMessage = await sprechenApi.sendMessage(conversationId, text);
      setMessages((current) => [...current, coachMessage]);
    } catch (exception) {
      setMessages((current) => current.filter((message) => message.id !== optimisticMessage.id));
      setDraft(text);
      setError(exception instanceof ApiError ? exception.message : "Mesaj gönderilemedi.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-10">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <Link href="/scenarios" className="text-xs font-black text-moss-600 hover:underline">← Konular</Link>
          <h1 className="mt-2 text-3xl font-black tracking-[-0.04em]">Almanca konuşma pratiği</h1>
          <p className="mt-1 text-sm text-ink/50">Konuş, hatanı gör, kuralı öğren.</p>
        </div>
        <span className={`hidden items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold sm:flex ${aiConfigured ? "bg-moss-50 text-moss-700" : "bg-white text-ink/45"}`}>
          <span className={`size-2 rounded-full ${aiConfigured ? "bg-moss-500" : "bg-ink/20"}`} />
          {aiConfigured ? `AI hazır · ${model}` : "AI bekleniyor"}
        </span>
      </div>

      <section className="mb-4 rounded-2xl border border-moss-900/10 bg-white/75 p-3 shadow-card">
        <div className="grid gap-2 sm:grid-cols-[1fr_90px_115px_auto]">
          <label><span className="sr-only">Konuşma konusu</span><input value={topic} onChange={(event) => setTopic(event.target.value)} maxLength={120} className="h-11 w-full rounded-xl border border-moss-900/10 bg-cream px-3 text-sm font-bold outline-none focus:border-moss-500" aria-label="Konuşma konusu" /></label>
          <label><span className="sr-only">Seviye</span><select value={level} onChange={(event) => setLevel(event.target.value as LearningLevel)} className="h-11 w-full rounded-xl border border-moss-900/10 bg-cream px-3 text-sm font-bold outline-none"><option>A1</option><option>A2</option><option>B1</option><option>B2</option></select></label>
          <label><span className="sr-only">Açıklama detayı</span><select value={detail} onChange={(event) => setDetail(event.target.value as ExplanationDetail)} className="h-11 w-full rounded-xl border border-moss-900/10 bg-cream px-3 text-sm font-bold outline-none"><option value="Quick">Kısa</option><option value="Normal">Normal</option><option value="Deep">Detaylı</option></select></label>
          <button type="button" onClick={() => void startConversation()} disabled={starting || !topic.trim()} className="h-11 rounded-xl bg-moss-700 px-4 text-sm font-black text-white transition hover:bg-moss-900 disabled:opacity-40">Yeni sohbet</button>
        </div>
      </section>

      {aiConfigured === false && (
        <div className="mb-4 rounded-2xl border border-gold/40 bg-[#fff8df] p-4 text-sm leading-6 text-ink/70">
          <strong className="text-ink">OpenAI API anahtarı gerekli.</strong> Backend klasöründe <code className="rounded bg-white px-1.5 py-0.5">dotnet user-secrets set &quot;OpenAI:ApiKey&quot; &quot;ANAHTARIN&quot; --project SprechenAI.Api</code> komutunu çalıştırıp backend&apos;i yeniden başlat.
        </div>
      )}
      {error && <div className="mb-4 rounded-2xl border border-coral/25 bg-[#fff3ee] p-4 text-sm font-semibold leading-6 text-[#98472f]" role="alert">{error}</div>}

      <section className="overflow-hidden rounded-3xl border border-moss-900/10 bg-white/40 shadow-card" aria-label="Almanca konuşma">
        <div className="min-h-[420px] max-h-[62vh] space-y-5 overflow-y-auto p-4 sm:p-6">
          {starting ? (
            <div className="grid min-h-80 place-items-center text-sm font-bold text-ink/35">Konuşma hazırlanıyor…</div>
          ) : messages.length === 0 ? (
            <div className="grid min-h-80 place-items-center text-center text-sm text-ink/45">Backend&apos;i çalıştır ve “Yeni sohbet” düğmesine bas.</div>
          ) : messages.map((message) => <ChatBubble key={message.id} message={message} />)}
          {sending && <div className="flex justify-start"><div className="rounded-2xl rounded-tl-md bg-white px-4 py-3 text-sm font-bold text-ink/40 shadow-card animate-pulse">Lina düşünüyor…</div></div>}
          <div ref={messagesEnd} />
        </div>
        <ChatComposer value={draft} onChange={setDraft} onSend={() => void sendMessage()} disabled={!conversationId || starting || sending || aiConfigured === false} sending={sending} />
      </section>
    </div>
  );
}
