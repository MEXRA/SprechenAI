"use client";

import type { FormEvent, KeyboardEvent } from "react";

export function ChatComposer({ value, onChange, onSend, disabled, sending }: { value: string; onChange: (value: string) => void; onSend: () => void; disabled: boolean; sending: boolean }) {
  function submit(event: FormEvent) {
    event.preventDefault();
    onSend();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      onSend();
    }
  }

  return (
    <form onSubmit={submit} className="border-t border-moss-900/10 bg-white/80 p-3 sm:p-4">
      <div className="flex items-end gap-2 rounded-2xl border border-moss-900/10 bg-white p-2 shadow-sm focus-within:border-moss-500">
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          rows={2}
          maxLength={1000}
          placeholder="Almanca bir cevap yaz..."
          className="min-h-12 flex-1 resize-none bg-transparent px-2 py-2 text-sm font-semibold leading-6 outline-none placeholder:text-ink/30 disabled:cursor-not-allowed"
        />
        <button type="submit" disabled={disabled || !value.trim()} className="grid size-11 shrink-0 place-items-center rounded-xl bg-coral font-black text-white transition hover:bg-[#df7252] disabled:cursor-not-allowed disabled:opacity-35" aria-label="Mesajı gönder">
          {sending ? <span className="animate-pulse">•••</span> : "→"}
        </button>
      </div>
      <p className="mt-2 px-1 text-[11px] text-ink/35">Göndermek için Enter · Alt satır için Shift + Enter</p>
    </form>
  );
}
