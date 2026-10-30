"use client";

import { useState } from "react";
import { LoaderCircle, ArrowRight } from "lucide-react";

export function NewsletterForm({ dark = false }: { dark?: boolean }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
    if (!isValid) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Something went wrong.");
      setStatus("success");
      setMessage("You're on the list. Welcome to Velmora.");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  const base = dark
    ? "border-ivory/30 bg-transparent text-ivory placeholder:text-ivory/50"
    : "border-line bg-ivory text-charcoal placeholder:text-charcoal-soft/50";

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-start" noValidate>
        <div className="flex-1">
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className={`w-full border px-4 py-3 text-sm focus:outline-none ${base}`}
            aria-invalid={status === "error"}
            aria-describedby="newsletter-feedback"
          />
        </div>
        <button
          type="submit"
          disabled={status === "loading"}
          className={`flex items-center justify-center gap-2 whitespace-nowrap px-6 py-3 text-sm font-medium uppercase tracking-[0.1em] transition-colors ${
            dark
              ? "bg-ivory text-charcoal hover:bg-ivory-dim"
              : "bg-charcoal text-ivory hover:bg-olive-dark"
          } disabled:opacity-60`}
        >
          {status === "loading" ? (
            <LoaderCircle size={15} className="animate-spin" />
          ) : (
            <>
              Subscribe <ArrowRight size={14} />
            </>
          )}
        </button>
      </form>
      <p
        id="newsletter-feedback"
        role="status"
        className={`mt-2 text-xs ${
          status === "error" ? "text-burgundy" : dark ? "text-ivory/70" : "text-charcoal-soft/70"
        }`}
      >
        {message ||
          "No spam, ever. This is a local demonstration signup — messages are not sent to an external mailing list provider."}
      </p>
    </div>
  );
}
