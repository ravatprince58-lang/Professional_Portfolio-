import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const RECIPIENT = "ravatprince58@gmail.com";
const SENDER = "Portfolio Contact <onboarding@resend.dev>";
const EMAIL_PATTERN = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

type ContactInput = { name: string; email: string; subject: string; message: string };

const LIMITS: Record<keyof ContactInput, number> = {
  name: 100,
  email: 254,
  subject: 150,
  message: 2000,
};

function json(body: unknown, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function parseInput(raw: unknown): ContactInput | null {
  if (typeof raw !== "object" || raw === null) return null;
  const record = raw as Record<string, unknown>;
  const result = {} as ContactInput;
  for (const field of Object.keys(LIMITS) as (keyof ContactInput)[]) {
    const value = record[field];
    if (typeof value !== "string") return null;
    const trimmed = value.trim();
    if (trimmed.length === 0 || trimmed.length > LIMITS[field]) return null;
    result[field] = trimmed;
  }
  if (!EMAIL_PATTERN.test(result.email)) return null;
  return result;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function sendNotification(apiKey: string, input: ContactInput): Promise<void> {
  const subject = `New contact message: ${input.subject}`.replace(/[\r\n]+/g, " ");
  const html = `
    <h2>New message from your portfolio contact form</h2>
    <p><strong>Name:</strong> ${escapeHtml(input.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(input.email)}</p>
    <p><strong>Subject:</strong> ${escapeHtml(input.subject)}</p>
    <p><strong>Message:</strong></p>
    <p style="white-space:pre-wrap">${escapeHtml(input.message)}</p>
  `;
  const text = [
    "New message from your portfolio contact form",
    "",
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `Subject: ${input.subject}`,
    "",
    input.message,
  ].join("\n");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: SENDER,
      to: [RECIPIENT],
      reply_to: input.email,
      subject,
      html,
      text,
    }),
  });

  if (!response.ok) {
    throw new Error(`Resend responded with status ${response.status}`);
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return json({ ok: false, error: "Method not allowed." }, 405);
  }

  try {
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return json({ ok: false, error: "Please check the form and try again." }, 400);
    }

    const input = parseInput(body);
    if (!input) {
      return json({ ok: false, error: "Please check the form and try again." }, 400);
    }

    const resendKey = Deno.env.get("RESEND_API_KEY");
    if (!resendKey) {
      console.error("RESEND_API_KEY secret is not configured");
      return json({ ok: false, error: "Your message could not be sent right now. Please try again later." }, 500);
    }

    try {
      await sendNotification(resendKey, input);
    } catch (err) {
      console.error("Failed to send contact notification", err);
      return json({ ok: false, error: "Your message could not be sent right now. Please try again later." }, 502);
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } },
    );
    const { error } = await supabase.from("contact_messages").insert(input);
    if (error) {
      console.error("Failed to store contact message", error.message);
      return json({ ok: false, error: "Your message could not be saved. Please try again later." }, 500);
    }

    return json({ ok: true }, 200);
  } catch (err) {
    console.error("Unexpected error in contact-notify", err);
    return json({ ok: false, error: "Something went wrong. Please try again later." }, 500);
  }
});
