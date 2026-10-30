import { db } from "@/db";
import { contactMessages } from "@/db/schema";

export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ContactPayload {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const subject = (body.subject ?? "").trim();
  const message = (body.message ?? "").trim();

  if (!name || !EMAIL_RE.test(email) || !subject || !message) {
    return Response.json(
      { error: "Please fill in your name, a valid email, a subject, and a message." },
      { status: 400 }
    );
  }

  try {
    await db.insert(contactMessages).values({ name, email, subject, message });
    return Response.json({ ok: true });
  } catch {
    return Response.json(
      { error: "We couldn't save your message right now. Please try again shortly." },
      { status: 500 }
    );
  }
}
