/*
# Route contact submissions through the notification function only

1. Modified Tables
- `contact_messages`: visitors (anonymous and signed-in) can no longer insert directly.

2. Security
- The public insert policy `anon_insert_contact_messages` is removed.
- All public-role privileges on `contact_messages` are revoked.
- The `service_role` (used only by the contact-notify edge function) is granted INSERT.
- Row level security stays enabled, so only the server-side function can write rows.

3. Notes
- Every stored message is now sent through the function, which emails the owner before saving.
- Re-running this migration is safe: dropping a missing policy and revoking/granting existing privileges has no data effect.
*/

DROP POLICY IF EXISTS "anon_insert_contact_messages" ON contact_messages;

REVOKE ALL ON contact_messages FROM anon, authenticated;

GRANT INSERT ON contact_messages TO service_role;
