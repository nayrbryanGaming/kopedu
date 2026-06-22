-- KopEdu cloud progress schema (Neon / Vercel Postgres)
-- The app also creates this automatically on first write via ensureSchema().

CREATE TABLE IF NOT EXISTS learner_progress (
  learner_id TEXT PRIMARY KEY,
  state      JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
