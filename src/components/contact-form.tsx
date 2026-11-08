import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactValues } from "@/lib/contact-schema";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";

type SubmitStatus = { kind: "idle" } | { kind: "success" } | { kind: "error"; message: string };

const inputClass =
  "w-full border-2 border-primary/60 bg-background px-3 py-2 font-sans text-base text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 aria-[invalid=true]:border-destructive";

export function ContactForm() {
  const [status, setStatus] = useState<SubmitStatus>({ kind: "idle" });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  const onSubmit = async (values: ContactValues) => {
    setStatus({ kind: "idle" });
    const { error } = await supabase.from("contact_messages").insert({
      name: values.name,
      email: values.email,
      subject: values.subject,
      message: values.message,
    });
    if (error) {
      setStatus({
        kind: "error",
        message: "Your message was not sent. Please check your connection and try again.",
      });
      return;
    }
    reset();
    setStatus({ kind: "success" });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-5 text-left"
      aria-label="Contact form"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="contact-name" label="Name" error={errors.name?.message}>
          <input
            id="contact-name"
            type="text"
            autoComplete="name"
            className={inputClass}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            {...register("name")}
          />
        </Field>
        <Field id="contact-email" label="Email" error={errors.email?.message}>
          <input
            id="contact-email"
            type="email"
            autoComplete="email"
            inputMode="email"
            className={inputClass}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            {...register("email")}
          />
        </Field>
      </div>

      <Field id="contact-subject" label="Subject" error={errors.subject?.message}>
        <input
          id="contact-subject"
          type="text"
          className={inputClass}
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={errors.subject ? "contact-subject-error" : undefined}
          {...register("subject")}
        />
      </Field>

      <Field id="contact-message" label="Message" error={errors.message?.message}>
        <textarea
          id="contact-message"
          rows={6}
          className={cn(inputClass, "resize-y")}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          {...register("message")}
        />
      </Field>

      <div className="flex flex-col items-center gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="sketch-border inline-flex min-h-11 items-center justify-center bg-primary px-8 py-3 font-display text-xl uppercase tracking-widest text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Sending..." : "Send message"}
        </button>
        <div role="status" aria-live="polite" className="min-h-6 text-center text-sm">
          {status.kind === "success" && (
            <p className="font-medium text-primary">Thanks, your message has been sent.</p>
          )}
          {status.kind === "error" && (
            <p className="font-medium text-destructive">{status.message}</p>
          )}
        </div>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="font-display text-sm uppercase tracking-[0.2em] text-foreground"
      >
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-sm font-medium text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
