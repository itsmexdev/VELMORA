// Configurable announcement message — update this string to change the
// slim announcement bar shown at the very top of every page.
export const ANNOUNCEMENT_MESSAGE =
  "Discover the uncommon — explore the latest collection, newly arrived.";

export function AnnouncementBar() {
  return (
    <div className="bg-charcoal text-ivory">
      <div className="container-wide flex h-9 items-center justify-center text-center">
        <p className="text-[0.72rem] font-medium uppercase tracking-[0.14em]">
          {ANNOUNCEMENT_MESSAGE}
        </p>
      </div>
    </div>
  );
}
