import { db } from "@/db";
import { orders } from "@/db/schema";
import { generateOrderNumber } from "@/lib/format";

export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface OrderItemPayload {
  slug: string;
  name: string;
  quantity: number;
  price: number;
  color?: string;
}

interface OrderPayload {
  email?: string;
  fullName?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  country?: string;
  deliveryMethod?: string;
  items?: OrderItemPayload[];
  subtotal?: number;
  shipping?: number;
  total?: number;
}

export async function POST(request: Request) {
  let body: OrderPayload;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { email, fullName, address, city, postalCode, country, deliveryMethod, items, subtotal, shipping, total } =
    body;

  if (
    !email ||
    !EMAIL_RE.test(email) ||
    !fullName ||
    !address ||
    !city ||
    !postalCode ||
    !country ||
    !deliveryMethod ||
    !items ||
    items.length === 0 ||
    typeof subtotal !== "number" ||
    typeof shipping !== "number" ||
    typeof total !== "number"
  ) {
    return Response.json({ error: "Please complete all required checkout fields." }, { status: 400 });
  }

  const orderNumber = generateOrderNumber();

  try {
    await db.insert(orders).values({
      orderNumber,
      email,
      fullName,
      address,
      city,
      postalCode,
      country,
      deliveryMethod,
      items,
      subtotalCents: Math.round(subtotal * 100),
      shippingCents: Math.round(shipping * 100),
      totalCents: Math.round(total * 100),
    });

    return Response.json({ ok: true, orderNumber });
  } catch {
    return Response.json(
      { error: "We couldn't record your demo order right now. Please try again." },
      { status: 500 }
    );
  }
}
