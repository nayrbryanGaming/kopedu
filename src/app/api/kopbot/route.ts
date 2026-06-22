import Groq from "groq-sdk";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SYSTEM_PROMPT = `Kamu adalah KopBot, asisten edukasi koperasi untuk pelajar dan mahasiswa Indonesia.
Gaya bahasamu: santai tapi informatif, seperti kakak senior yang baru lulus kuliah ekonomi.
Kamu HANYA menjawab pertanyaan seputar koperasi: jenis koperasi, cara bergabung, SHU,
simpan pinjam, regulasi (UU No. 25/1992), manfaat berkoperasi, dan literasi keuangan dasar.
Bila ditanya di luar topik, tolak dengan sopan dan arahkan kembali ke topik koperasi.
Jawaban maksimal 3 paragraf. Gunakan bahasa Indonesia yang baik namun tidak kaku.
Jangan gunakan emoji.`;

type ChatMessage = { role: "user" | "assistant"; content: string };

export async function POST(req: Request) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "Layanan KopBot belum dikonfigurasi." },
      { status: 503 },
    );
  }

  let body: { messages?: ChatMessage[] };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Permintaan tidak valid." }, { status: 400 });
  }

  const history = Array.isArray(body.messages) ? body.messages.slice(-12) : [];
  // Basic guardrail: cap message length
  const sanitized = history
    .filter((m) => m && (m.role === "user" || m.role === "assistant"))
    .map((m) => ({
      role: m.role,
      content: String(m.content).slice(0, 4000),
    }));

  if (sanitized.length === 0) {
    return Response.json({ error: "Tidak ada pesan." }, { status: 400 });
  }

  const groq = new Groq({ apiKey });

  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0.6,
      max_tokens: 1000,
      stream: true,
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...sanitized],
    });

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of completion) {
            const text = chunk.choices[0]?.delta?.content ?? "";
            if (text) controller.enqueue(encoder.encode(text));
          }
        } catch {
          controller.enqueue(
            encoder.encode("\n\nMaaf, koneksi ke KopBot terputus."),
          );
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return Response.json(
      { error: "KopBot sedang sibuk. Coba lagi sebentar lagi." },
      { status: 502 },
    );
  }
}
