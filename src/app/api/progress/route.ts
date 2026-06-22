import { cookies } from "next/headers";
import { sql, hasDatabase, ensureSchema } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const COOKIE = "kopedu_lid";

async function learnerId(): Promise<string> {
  const store = await cookies();
  let id = store.get(COOKIE)?.value;
  if (!id) {
    id = crypto.randomUUID();
    store.set(COOKIE, id, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 365,
      path: "/",
    });
  }
  return id;
}

export async function GET() {
  if (!hasDatabase || !sql) {
    return Response.json({ enabled: false, state: null });
  }
  try {
    await ensureSchema();
    const id = await learnerId();
    const rows = (await sql`
      SELECT state FROM learner_progress WHERE learner_id = ${id}
    `) as { state: unknown }[];
    return Response.json({ enabled: true, state: rows[0]?.state ?? null });
  } catch {
    return Response.json({ enabled: false, state: null });
  }
}

export async function POST(req: Request) {
  if (!hasDatabase || !sql) {
    // No DB connected — on-device store is the source of truth.
    return Response.json({ enabled: false }, { status: 200 });
  }
  let state: unknown;
  try {
    state = await req.json();
  } catch {
    return Response.json({ error: "invalid body" }, { status: 400 });
  }
  try {
    await ensureSchema();
    const id = await learnerId();
    await sql`
      INSERT INTO learner_progress (learner_id, state, updated_at)
      VALUES (${id}, ${JSON.stringify(state)}::jsonb, now())
      ON CONFLICT (learner_id)
      DO UPDATE SET state = EXCLUDED.state, updated_at = now()
    `;
    return Response.json({ enabled: true, ok: true });
  } catch {
    return Response.json({ enabled: false }, { status: 200 });
  }
}
