"use client";

import { useState } from "react";
import { LoaderCircle, ArrowRight, CircleCheckBig } from "lucide-react";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const initial: FormState = { name: "", email: "", subject: "", message: "" };

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function validate() {
    const next: Partial<FormState> = {};
    if (form.name.trim().length < 2) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = "Please enter a valid email.";
    if (form.subject.trim().length < 2) next.subject = "Please add a subject.";
    if (form.message.trim().length < 10) next.message = "Message should be at least 10 characters.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Something went wrong.");
      setStatus("success");
      setFeedback("Thank you — your message has been recorded in our demo system.");
      setForm(initial);
    } catch (err) {
      setStatus("error");
      setFeedback(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-line bg-ivory-dim p-8 text-center">
        <CircleCheckBig size={28} className="mx-auto text-olive-dark" />
        <p className="mt-3 font-serif-display text-xl text-charcoal">Message Received</p>
        <p className="mt-2 text-sm text-charcoal-soft/80">{feedback}</p>
        <p className="mt-3 text-xs text-charcoal-soft/60">
          This is a local demonstration — no email has been sent to an external inbox.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-5 border border-charcoal px-5 py-2.5 text-xs uppercase tracking-[0.1em] text-charcoal hover:bg-ivory"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1 block text-sm text-charcoal">
            Name
          </label>
          <input
            id="name"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            aria-invalid={Boolean(errors.name)}
            className="w-full border border-line bg-ivory px-4 py-3 text-sm focus:border-charcoal focus:outline-none"
          />
          {errors.name && <p className="mt-1 text-xs text-burgundy">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className="mb-1 block text-sm text-charcoal">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            aria-invalid={Boolean(errors.email)}
            className="w-full border border-line bg-ivory px-4 py-3 text-sm focus:border-charcoal focus:outline-none"
          />
          {errors.email && <p className="mt-1 text-xs text-burgundy">{errors.email}</p>}
        </div>
      </div>
      <div>
        <label htmlFor="subject" className="mb-1 block text-sm text-charcoal">
          Subject
        </label>
        <input
          id="subject"
          value={form.subject}
          onChange={(e) => update("subject", e.target.value)}
          aria-invalid={Boolean(errors.subject)}
          className="w-full border border-line bg-ivory px-4 py-3 text-sm focus:border-charcoal focus:outline-none"
        />
        {errors.subject && <p className="mt-1 text-xs text-burgundy">{errors.subject}</p>}
      </div>
      <div>
        <label htmlFor="message" className="mb-1 block text-sm text-charcoal">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          aria-invalid={Boolean(errors.message)}
          className="w-full border border-line bg-ivory px-4 py-3 text-sm focus:border-charcoal focus:outline-none"
        />
        {errors.message && <p className="mt-1 text-xs text-burgundy">{errors.message}</p>}
      </div>
      {status === "error" && (
        <p role="alert" className="border border-burgundy/30 bg-ivory-dim px-4 py-3 text-sm text-burgundy">
          {feedback}
        </p>
      )}
      <button
        type="submit"
        disabled={status === "loading"}
        className="flex items-center justify-center gap-2 bg-charcoal px-7 py-3.5 text-sm font-medium uppercase tracking-[0.1em] text-ivory transition-colors hover:bg-olive-dark disabled:opacity-60"
      >
        {status === "loading" ? <LoaderCircle size={16} className="animate-spin" /> : <>Send Message <ArrowRight size={15} /></>}
      </button>
    </form>
  );
}
