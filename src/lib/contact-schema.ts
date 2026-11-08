import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Please tell me your name.")
    .max(100, "Keep your name under 100 characters."),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email address.")
    .max(254, "That email address is too long.")
    .email("Please enter a valid email address."),
  subject: z
    .string()
    .trim()
    .min(1, "Please add a subject.")
    .max(150, "Keep the subject under 150 characters."),
  message: z
    .string()
    .trim()
    .min(1, "Please write a message.")
    .max(2000, "Keep your message under 2000 characters."),
});

export type ContactValues = z.infer<typeof contactSchema>;
