import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { ProductImage } from "@/components/product/ProductImage";

export function NewsletterSection() {
  return (
    <section className="relative overflow-hidden border-t border-line">
      <div className="absolute inset-0">
        <ProductImage src="/images/newsletter-bg.jpg" alt="" className="object-cover opacity-30" />
      </div>
      <div className="container-wide relative py-16 sm:py-20">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-olive-dark">Stay Curious</p>
          <h2 className="mt-3 font-serif-display text-3xl text-charcoal sm:text-4xl">
            Join the Inner Circle
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-charcoal-soft/80">
            Early access to rare finds and limited editions, roughly twice a month. No noise, ever.
          </p>
          <div className="mt-7 text-left">
            <NewsletterForm />
          </div>
        </div>
      </div>
    </section>
  );
}
