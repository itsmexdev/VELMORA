import { db } from "@/db";
import { subscribers } from "@/db/schema";
import { sql } from "drizzle-orm";

export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const email = typeof body === "object" && body && "email" in body ? String((body as { email: unknown }).email ?? "") : "";

  if (!EMAIL_RE.test(email.trim())) {
    return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  try {
    await db
      .insert(subscribers)
      .values({ email: email.trim().toLowerCase() })
      .onConflictDoNothing();
    return Response.json({ ok: true });
  } catch {
    try {
      await db.execute(sql`select 1`);
    } catch {
      return Response.json({ error: "Our demo database is unavailable right now." }, { status: 500 });
    }
    return Response.json({ ok: true });
  }
}
