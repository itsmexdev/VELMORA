import type { Metadata } from "next";
import { Mail, Phone, MapPin } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "Contact — Velmora",
  description: "Get in touch with the Velmora team.",
};

export default function ContactPage() {
  return (
    <div className="container-wide py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
      <div className="mt-6 grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <h1 className="font-serif-display text-4xl text-charcoal">Contact Us</h1>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-charcoal-soft/80">
            Questions about an order, a product, or a partnership? Send a message below. This is a demo
            contact form — submissions are saved to our demonstration database, not sent to an external
            inbox.
          </p>

          <div className="mt-8 space-y-5 text-sm text-charcoal-soft/85">
            <p className="flex items-center gap-3">
              <Mail size={16} className="text-olive-dark" /> hello@velmora-demo.test
            </p>
            <p className="flex items-center gap-3">
              <Phone size={16} className="text-olive-dark" /> +1 (555) 019-2044
            </p>
            <p className="flex items-start gap-3">
              <MapPin size={16} className="mt-0.5 shrink-0 text-olive-dark" />
              140 Marrow Street, Suite 4<br />
              Portland, OR 97201, United States
            </p>
          </div>

          <p className="mt-8 text-xs text-charcoal-soft/55">
            All contact details shown are fictional demonstration information for this prototype.
          </p>
        </div>

        <div className="border border-line p-6 sm:p-8">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
