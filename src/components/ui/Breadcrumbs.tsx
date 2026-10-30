import Link from "next/link";

export interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs tracking-wide text-charcoal-soft/70">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center gap-1.5">
            {item.href ? (
              <Link href={item.href} className="link-underline hover:text-charcoal">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-charcoal">
                {item.label}
              </span>
            )}
            {idx < items.length - 1 && <span aria-hidden className="text-line">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
