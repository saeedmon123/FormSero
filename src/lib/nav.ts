export type NavLink = {
  label: string;
  href: string;
};

// "/#id" rather than bare "#id" so these still work correctly when clicked
// from a page other than the homepage (e.g. /privacy) — the browser
// navigates to "/" and then scrolls to the anchor, instead of trying (and
// failing) to find that id on the current page.
export const navLinks: NavLink[] = [
  { label: "The Book", href: "/#the-book" },
  { label: "Editions", href: "/#editions" },
  { label: "Proof", href: "/#proof" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/contact" },
];

export const primaryCtaHref = "/#editions";
