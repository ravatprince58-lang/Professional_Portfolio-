/*
# Create contact_messages table (public inbox, insert-only)

1. New Tables
- `contact_messages`
  - `id` (uuid, primary key, generated automatically)
  - `name` (text, required, 1 to 100 characters)
  - `email` (text, required, must look like an email address, up to 254 characters)
  - `subject` (text, required, 1 to 150 characters)
  - `message` (text, required, 1 to 2000 characters)
  - `created_at` (timestamp, set automatically)

2. Security
- Row level security is enabled on `contact_messages`.
- Visitors (anonymous and signed-in) may only INSERT a message. They cannot read, update or delete messages.
- Only the four submitted columns are writable; `id` and `created_at` are set by the database.
- The table has no SELECT grant, so messages are only visible from the Supabase dashboard.

3. Notes
- The contact form is the only writer. The length and email-format checks in the table reject malformed input even if the browser check is bypassed.
*/

CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 100),
  email text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 254 AND email ~ '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$'),
  subject text NOT NULL CHECK (char_length(subject) BETWEEN 1 AND 150),
  message text NOT NULL CHECK (char_length(message) BETWEEN 1 AND 2000),
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

GRANT INSERT (name, email, subject, message) ON contact_messages TO anon, authenticated;

DROP POLICY IF EXISTS "anon_insert_contact_messages" ON contact_messages;
CREATE POLICY "anon_insert_contact_messages" ON contact_messages FOR INSERT
  TO anon, authenticated WITH CHECK (true);
