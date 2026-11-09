/*
# Restrict contact_messages to insert-only access for visitors

1. Modified Tables
- `contact_messages`: table-level privileges for the public API roles (`anon`, `authenticated`) are replaced with column-level INSERT only.

2. Security
- Visitors can insert a message with name, email, subject and message only.
- Visitors have no SELECT, UPDATE or DELETE privilege, so they cannot read other submissions.
- Existing row level security stays enabled; the insert policy is unchanged.

3. Notes
- Re-running this migration is safe: revoking and re-granting the same privileges has no effect on data.
*/

REVOKE ALL ON contact_messages FROM anon, authenticated;

GRANT INSERT (name, email, subject, message) ON contact_messages TO anon, authenticated;
