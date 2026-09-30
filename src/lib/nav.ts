export type NavLink = {
  label: string;
  href: string;
};

export const navLinks: NavLink[] = [
  { label: "The Book", href: "#the-book" },
  { label: "Editions", href: "#editions" },
  { label: "Proof", href: "#proof" },
  { label: "FAQ", href: "#faq" },
];

export const primaryCtaHref = "#editions";
