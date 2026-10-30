import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "Privacy Policy — Velmora",
  description: "Sample privacy policy for the Velmora demonstration store.",
};

export default function PrivacyPage() {
  return (
    <div className="container-wide py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]} />
      <h1 className="mt-4 font-serif-display text-4xl text-charcoal">Privacy Policy</h1>
      <p className="mt-3 max-w-xl text-sm text-charcoal-soft/80">
        This is sample legal content written for a prototype e-commerce experience. It has not been
        legally reviewed and should not be treated as compliant with any specific jurisdiction's law.
      </p>

      <div className="prose-demo mt-10 max-w-2xl space-y-8 text-sm leading-relaxed text-charcoal-soft/85">
        <section>
          <h2 className="font-serif-display text-xl text-charcoal">1. Information We Collect</h2>
          <p className="mt-2">
            When you use this demonstration site, we may store information you voluntarily provide,
            including your email address (newsletter signup), contact form submissions, and demo checkout
            details (name, shipping address, delivery preference). This information is saved to a local
            demonstration database and is not shared with third parties.
          </p>
        </section>
        <section>
          <h2 className="font-serif-display text-xl text-charcoal">2. Local Storage</h2>
          <p className="mt-2">
            Your shopping cart and wishlist are stored in your browser's local storage so they persist
            between visits. This data remains on your device and is not transmitted to our servers.
          </p>
        </section>
        <section>
          <h2 className="font-serif-display text-xl text-charcoal">3. No Payment Data Collected</h2>
          <p className="mt-2">
            This demonstration does not collect, process, or store real payment card information anywhere
            in the application.
          </p>
        </section>
        <section>
          <h2 className="font-serif-display text-xl text-charcoal">4. Cookies</h2>
          <p className="mt-2">
            This demo does not use third-party tracking cookies or analytics pixels.
          </p>
        </section>
        <section>
          <h2 className="font-serif-display text-xl text-charcoal">5. Contact</h2>
          <p className="mt-2">
            Questions about this sample policy can be sent via the <a href="/contact" className="link-underline text-charcoal">Contact page</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
