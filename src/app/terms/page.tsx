import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "Terms & Conditions — Velmora",
  description: "Sample terms and conditions for the Velmora demonstration store.",
};

export default function TermsPage() {
  return (
    <div className="container-wide py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Terms & Conditions" }]} />
      <h1 className="mt-4 font-serif-display text-4xl text-charcoal">Terms &amp; Conditions</h1>
      <p className="mt-3 max-w-xl text-sm text-charcoal-soft/80">
        This page contains sample legal content prepared for a design and engineering prototype. It is not
        legal advice and has not been reviewed by counsel.
      </p>

      <div className="mt-10 max-w-2xl space-y-8 text-sm leading-relaxed text-charcoal-soft/85">
        <section>
          <h2 className="font-serif-display text-xl text-charcoal">1. Demonstration Nature of This Site</h2>
          <p className="mt-2">
            Velmora, as presented here, is a product and engineering demonstration. Product availability,
            pricing, inventory counts, reviews, and limited-edition quantities are fictional and used for
            illustrative purposes only.
          </p>
        </section>
        <section>
          <h2 className="font-serif-display text-xl text-charcoal">2. No Real Transactions</h2>
          <p className="mt-2">
            Orders placed through the checkout flow are recorded for demonstration purposes only. No real
            payment is collected, no goods are shipped, and no binding sale contract is formed.
          </p>
        </section>
        <section>
          <h2 className="font-serif-display text-xl text-charcoal">3. Intellectual Property</h2>
          <p className="mt-2">
            The Velmora name, wordmark, and layout shown here are original creative work produced for this
            demonstration and are not affiliated with any existing retailer.
          </p>
        </section>
        <section>
          <h2 className="font-serif-display text-xl text-charcoal">4. Changes</h2>
          <p className="mt-2">
            Sample terms may be updated at any time without notice as part of ongoing development of this
            demonstration site.
          </p>
        </section>
        <section>
          <h2 className="font-serif-display text-xl text-charcoal">5. Contact</h2>
          <p className="mt-2">
            Questions can be directed to our demo inbox via the <a href="/contact" className="link-underline text-charcoal">Contact page</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
