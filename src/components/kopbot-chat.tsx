"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { chatSuggestions } from "@/lib/data";

type Msg = { role: "user" | "assistant"; content: string; time: string };

function now() {
  return new Intl.DateTimeFormat("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date());
}

export function KopbotChat() {
  const [messages, setMessages] = React.useState<Msg[]>([]);
  const [input, setInput] = React.useState("");
  const [streaming, setStreaming] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, streaming]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || streaming) return;

    const userMsg: Msg = { role: "user", content: trimmed, time: now() };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput("");
    setStreaming(true);

    // Placeholder assistant message we stream into
    setMessages((m) => [...m, { role: "assistant", content: "", time: now() }]);

    try {
      const res = await fetch("/api/kopbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "Gagal terhubung.");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = {
            ...copy[copy.length - 1],
            content: acc,
          };
          return copy;
        });
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Maaf, ada gangguan koneksi.";
      setMessages((m) => {
        const copy = [...m];
        copy[copy.length - 1] = {
          role: "assistant",
          content: message + " Coba lagi ya.",
          time: now(),
        };
        return copy;
      });
    } finally {
      setStreaming(false);
    }
  }

  const empty = messages.length === 0;

  return (
    <div className="flex h-screen flex-col bg-background md:h-screen">
      {/* Header */}
      <div className="border-b border-line bg-card px-6 py-4">
        <h1 className="font-display text-xl font-bold text-ink">KopBot</h1>
        <p className="text-sm text-ink-2">Tanya apa saja tentang koperasi</p>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-6">
        <div className="mx-auto max-w-2xl space-y-4">
          {empty && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="rounded-md border border-line bg-card p-6"
            >
              <p className="text-sm leading-relaxed text-ink">
                Halo. Aku KopBot, teman belajar koperasimu. Tanyakan apa saja —
                mulai dari hal paling dasar pun tidak apa-apa.
              </p>
            </motion.div>
          )}

          <AnimatePresence initial={false}>
            {messages.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className={`flex flex-col ${
                  m.role === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-[80%] whitespace-pre-wrap rounded-md px-4 py-2.5 text-[0.95rem] leading-relaxed ${
                    m.role === "user"
                      ? "rounded-br-[2px] bg-primary text-primary-foreground"
                      : "rounded-bl-[2px] border border-line bg-card text-ink"
                  }`}
                >
                  {m.content ||
                    (streaming && i === messages.length - 1 ? (
                      <TypingDots />
                    ) : (
                      ""
                    ))}
                </div>
                {m.content && (
                  <span className="mt-1 text-[0.7rem] text-ink-2">{m.time}</span>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Suggestions */}
      {empty && (
        <div className="px-6 pb-3">
          <div className="mx-auto flex max-w-2xl flex-wrap gap-2">
            {chatSuggestions.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="rounded-full border border-line bg-card px-4 py-1.5 text-sm text-ink transition-colors hover:border-primary hover:bg-accent hover:text-primary"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="border-t border-line bg-card px-6 py-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="mx-auto flex max-w-2xl gap-3"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tulis pertanyaanmu..."
            className="h-11 flex-1 rounded-sm border border-line bg-background px-4 text-[0.95rem] text-ink outline-none transition-colors placeholder:text-ink-2/60 focus:border-primary"
          />
          <button
            type="submit"
            disabled={streaming || !input.trim()}
            className="inline-flex h-11 items-center rounded-sm bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-[#1e4d38] disabled:opacity-50"
          >
            Kirim
          </button>
        </form>
      </div>
    </div>
  );
}

function TypingDots() {
  return (
    <span className="flex gap-1 py-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-ink-2"
          animate={{ y: [0, -5, 0] }}
          transition={{
            duration: 1.1,
            repeat: Infinity,
            delay: i * 0.18,
            ease: "easeInOut",
          }}
        />
      ))}
    </span>
  );
}
