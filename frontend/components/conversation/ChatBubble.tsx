import type { ChatMessage } from "@/types/chat";
import { CorrectionCard } from "./CorrectionCard";

export function ChatBubble({ message }: { message: ChatMessage }) {
  const isCoach = message.role === "coach";

  return (
    <div className={`flex ${isCoach ? "justify-start" : "justify-end"}`}>
      <article className={`max-w-[88%] sm:max-w-[76%] ${isCoach ? "" : "text-right"}`}>
        <p className="mb-1.5 px-1 text-[10px] font-black uppercase tracking-[0.15em] text-ink/35">{isCoach ? "Lina · Almanca koçun" : "Sen"}</p>
        <div className={`rounded-3xl px-4 py-3.5 sm:px-5 ${isCoach ? "rounded-tl-md bg-white shadow-card" : "rounded-tr-md bg-moss-900 text-white"}`}>
          <p className="text-base font-bold leading-7">{message.germanText}</p>
          {message.turkishTranslation && <p className="mt-1 text-sm leading-6 text-ink/45">{message.turkishTranslation}</p>}
          {isCoach && message.correction && <CorrectionCard correction={message.correction} />}
        </div>
      </article>
    </div>
  );
}

