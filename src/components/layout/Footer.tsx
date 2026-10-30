import Link from "next/link";
import { Logo } from "./Logo";
import { footerLinks } from "@/lib/nav";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <p className="mb-4 text-[0.7rem] font-medium uppercase tracking-[0.14em] text-charcoal-soft/60">
        {title}
      </p>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-sm text-charcoal-soft link-underline">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-ivory-dim">
      <div className="container-wide py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-6">
          <div className="col-span-2 md:col-span-2">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-charcoal-soft/80">
              A premium discovery store for rare objects, distinctive accessories, and
              uncommon gifts. Find what others overlook.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Velmora on Instagram"
                className="inline-flex h-9 w-9 items-center justify-center border border-line text-[0.65rem] font-medium tracking-wide hover:border-charcoal"
              >
                IG
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Velmora on Facebook"
                className="inline-flex h-9 w-9 items-center justify-center border border-line text-[0.65rem] font-medium tracking-wide hover:border-charcoal"
              >
                FB
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Velmora on X"
                className="inline-flex h-9 w-9 items-center justify-center border border-line text-[0.65rem] font-medium tracking-wide hover:border-charcoal"
              >
                X
              </a>
            </div>
          </div>

          <FooterColumn title="Shop" links={footerLinks.shop} />
          <FooterColumn title="Customer Care" links={footerLinks.help} />
          <FooterColumn title="Company" links={footerLinks.company} />

          <div className="col-span-2 md:col-span-1">
            <p className="mb-4 text-[0.7rem] font-medium uppercase tracking-[0.14em] text-charcoal-soft/60">
              Demo Contact
            </p>
            <address className="space-y-1.5 text-sm not-italic text-charcoal-soft/80">
              <p>hello@velmora-demo.test</p>
              <p>+1 (555) 019-2044</p>
              <p>140 Marrow Street, Suite 4<br />Portland, OR 97201</p>
            </address>
          </div>
        </div>

        <div className="mt-14 border-t border-line pt-10">
          <div className="max-w-md">
            <p className="font-serif-display text-lg text-charcoal">Join the inner circle</p>
            <p className="mt-1 text-sm text-charcoal-soft/80">
              Early access to rare finds and limited editions, roughly twice a month.
            </p>
            <div className="mt-4">
              <NewsletterForm />
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-xs text-charcoal-soft/60 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {year} Velmora. All rights reserved. All content is a design demonstration.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/privacy" className="link-underline">Privacy Policy</Link>
            <Link href="/terms" className="link-underline">Terms &amp; Conditions</Link>
            <Link href="/shipping-returns" className="link-underline">Shipping &amp; Returns</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
