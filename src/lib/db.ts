import { neon } from "@neondatabase/serverless";

/**
 * Optional cloud persistence. Returns a query function only when a Postgres
 * connection string is present (injected automatically when a Neon store is
 * connected to the project in Vercel). Without it, callers fall back to the
 * on-device store and the app keeps working.
 */

const connectionString =
  process.env.POSTGRES_URL ||
  process.env.DATABASE_URL ||
  process.env.POSTGRES_PRISMA_URL ||
  "";

export const hasDatabase = connectionString.length > 0;

export const sql = hasDatabase ? neon(connectionString) : null;

let ensured = false;
export async function ensureSchema() {
  if (!sql || ensured) return;
  await sql`
    CREATE TABLE IF NOT EXISTS learner_progress (
      learner_id TEXT PRIMARY KEY,
      state JSONB NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
  ensured = true;
}
