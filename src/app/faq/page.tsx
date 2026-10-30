import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { FaqAccordion, type FaqItem } from "@/components/faq/FaqAccordion";

export const metadata: Metadata = {
  title: "FAQ — Velmora",
  description: "Answers to common questions about orders, delivery, returns, product care, and payments at Velmora.",
};

const faqs: FaqItem[] = [
  {
    category: "Orders",
    question: "How do I know if my order went through?",
    answer:
      "In this demonstration site, placing an order generates a confirmation screen with a demo order number immediately after checkout. No real payment is processed and no confirmation email is sent, since no email service is connected.",
  },
  {
    category: "Orders",
    question: "Can I change or cancel an order after placing it?",
    answer:
      "In a production version of Velmora, you would be able to request changes within one hour of ordering by contacting support. This demo does not persist editable orders beyond the record created at checkout.",
  },
  {
    category: "Delivery",
    question: "How long does shipping take?",
    answer:
      "Our demonstration shipping policy offers Standard delivery (5–7 business days), Express (2–3 business days), and White Glove scheduled delivery (7–10 days) for larger pieces. See the Shipping & Returns page for full details.",
  },
  {
    category: "Delivery",
    question: "Do you ship internationally?",
    answer:
      "The checkout demo includes a range of sample countries across North America, Europe, and the Asia-Pacific region. A production build would connect real carrier rates and customs handling.",
  },
  {
    category: "Returns",
    question: "What is your return policy?",
    answer:
      "Our demonstration policy allows returns within 30 days of delivery for unused items in original packaging. Limited edition and final-sale items are excluded. This is sample policy content, not a binding legal commitment.",
  },
  {
    category: "Returns",
    question: "How do I start a return?",
    answer:
      "Contact us through the Contact page with your order number and reason for return. In this demo, that message is stored in our database rather than routed to a live support queue.",
  },
  {
    category: "Product Care",
    question: "How should I care for leather goods?",
    answer:
      "Keep leather pieces away from prolonged direct sunlight and moisture, and condition occasionally with a neutral leather balm. Full-grain leather will naturally darken and develop patina with use — this is intentional, not a defect.",
  },
  {
    category: "Product Care",
    question: "Are your ceramics dishwasher safe?",
    answer:
      "Most decorative ceramics in the Home & Living collection are designed for display rather than food use. Individual product pages note any specific care instructions.",
  },
  {
    category: "Payments",
    question: "What payment methods do you accept?",
    answer:
      "This is a demonstration storefront — no real payment details are collected or processed anywhere on this site. A production build would integrate a PCI-compliant payment provider such as Stripe or Adyen at checkout.",
  },
  {
    category: "Account",
    question: "Do I need an account to shop?",
    answer:
      "No account system is required in this demo. Your cart and wishlist are saved locally in your browser using local storage and will persist between visits on the same device.",
  },
  {
    category: "Account",
    question: "Will my wishlist sync across devices?",
    answer:
      "Not in this demonstration build, since wishlist data is stored locally rather than tied to a user account. A production version could sync this through an authenticated account system.",
  },
];

export default function FaqPage() {
  return (
    <div className="container-wide py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "FAQ" }]} />
      <h1 className="mt-4 font-serif-display text-4xl text-charcoal">Frequently Asked Questions</h1>
      <p className="mt-3 max-w-xl text-sm text-charcoal-soft/80">
        Answers about orders, delivery, returns, product care, payments, and account features. Can&rsquo;t
        find what you need? <a href="/contact" className="link-underline text-charcoal">Contact us</a>.
      </p>
      <div className="mt-10">
        <FaqAccordion items={faqs} />
      </div>
    </div>
  );
}
