import type { ReactNode } from "react";
import { useRef, useState } from "react";
import { Menu, Phone, ShieldCheck, X, ChevronDown } from "lucide-react";
import { useLocation } from "wouter";
import {
  brandName,
  brokerageAddress,
  contactEmail,
  navigationItems,
  phoneDisplay,
  phoneHref,
  type NavItemWithSub,
} from "@/content/siteContent";

type SiteLayoutProps = {
  children: ReactNode;
};

function MegaMenu({ item, active }: { item: NavItemWithSub; active: boolean }) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 120);
  };

  if (!item.subItems?.length) {
    return (
      <a
        href={item.href}
        aria-current={active ? "page" : undefined}
        className={`inline-flex items-center text-sm font-semibold no-underline transition-colors ${
          active ? "text-sky-700" : "text-slate-600 hover:text-sky-700"
        }`}
      >
        {item.label}
      </a>
    );
  }

  return (
    <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <a
        href={item.href}
        aria-current={active ? "page" : undefined}
        aria-expanded={open}
        className={`inline-flex items-center gap-1 text-sm font-semibold no-underline transition-colors ${
          active ? "text-sky-700" : "text-slate-600 hover:text-sky-700"
        }`}
      >
        {item.label}
        <ChevronDown
          className={`size-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </a>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-3 w-72 rounded-[20px] border border-slate-200 bg-white p-3 shadow-[0_32px_80px_-20px_rgba(15,23,42,0.15)]">
          <div className="space-y-0.5">
            {item.subItems.map((sub) => (
              <a
                key={sub.href}
                href={sub.href}
                className="block rounded-2xl p-3 no-underline transition hover:bg-slate-50"
              >
                <span className="block text-sm font-semibold text-slate-900">{sub.label}</span>
                {sub.description && (
                  <span className="mt-0.5 block text-xs leading-5 text-slate-500">{sub.description}</span>
                )}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function SiteLayout({ children }: SiteLayoutProps) {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* ── HEADER ── */}
      <header
        className="sticky top-0 z-40 border-b border-slate-200 bg-white/90"
        style={{ backdropFilter: "blur(24px)" }}
      >
        <div className="container flex min-h-20 items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img src="/images/logo.png" alt="LTA Courtage logo" className="h-10 w-auto rounded-lg object-contain" />
            <div className="min-w-0">
              <a
                href="/"
                className="font-display text-lg font-bold tracking-[0.08em] text-slate-900 no-underline transition hover:opacity-90"
              >
                {brandName}
              </a>
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-slate-500">Courtage en assurance</p>
            </div>
          </div>

          {/* Desktop nav — mega-menu */}
          <nav className="hidden items-center gap-7 lg:flex">
            {navigationItems.map((item) => (
              <MegaMenu key={item.href} item={item} active={location === item.href} />
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden items-center gap-3 lg:flex">
            <a href={phoneHref} className="text-sm font-semibold text-slate-600 no-underline transition hover:text-slate-900">
              {phoneDisplay}
            </a>
            <a
              href={phoneHref}
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-sky-700 px-5 text-sm font-bold text-white no-underline transition hover:bg-sky-800 shadow-sm"
            >
              Parler à un conseiller
            </a>
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-3 lg:hidden">
            <a
              href={phoneHref}
              className="inline-flex size-11 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-700 no-underline transition hover:bg-slate-100"
              aria-label="Appeler le cabinet"
            >
              <Phone className="size-4" />
            </a>
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-700 transition hover:bg-slate-100"
              aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((open) => !open)}
            >
              {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* ── MOBILE MENU ── */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-4 top-24 z-50 max-h-[80vh] overflow-y-auto rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_30px_120px_-40px_rgba(15,23,42,0.2)] lg:hidden">
          <div className="space-y-1">
            <p className="mb-4 text-[0.65rem] font-bold uppercase tracking-[0.22em] text-slate-400">Navigation</p>
            {navigationItems.map((item) => (
              <div key={item.href}>
                {item.subItems?.length ? (
                  <>
                    <button
                      type="button"
                      className="flex w-full items-center justify-between rounded-2xl px-3 py-2.5 text-left text-sm font-semibold text-slate-800 transition hover:bg-slate-50 hover:text-slate-900"
                      onClick={() =>
                        setMobileExpanded(mobileExpanded === item.href ? null : item.href)
                      }
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`size-4 transition-transform ${mobileExpanded === item.href ? "rotate-180" : ""}`}
                      />
                    </button>
                    {mobileExpanded === item.href && (
                      <div className="ml-3 mt-1 space-y-0.5 border-l border-slate-200 pl-4">
                        {item.subItems.map((sub) => (
                          <a
                            key={sub.href}
                            href={sub.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block rounded-xl px-2 py-2 text-sm font-medium text-slate-600 no-underline transition hover:text-slate-900 hover:bg-slate-50"
                          >
                            {sub.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <a
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block rounded-2xl px-3 py-2.5 text-sm font-semibold text-slate-800 no-underline transition hover:bg-slate-50 hover:text-slate-900"
                  >
                    {item.label}
                  </a>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-[28px] border border-sky-100 bg-sky-50 p-5">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-sky-600">Ligne directe</p>
            <a
              href={phoneHref}
              className="mt-3 block font-display text-2xl font-bold text-sky-900 no-underline transition hover:opacity-90"
            >
              {phoneDisplay}
            </a>
            <p className="mt-3 text-sm leading-6 text-sky-800/80">
              Du lundi au vendredi, pour un rappel rapide ou une étude personnalisée en auto, santé et
              prévoyance.
            </p>
          </div>
        </div>
      )}

      {/* ── MAIN ── */}
      <main className="bg-white">{children}</main>

      {/* ── FOOTER 4 colonnes (Light Mode) ── */}
      <footer className="border-t border-slate-200 bg-slate-50 pb-32 pt-16 lg:pb-20">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
            {/* Col 1 — Marque */}
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <img src="/images/logo.png" alt="LTA Courtage logo" className="h-10 w-auto rounded-lg object-contain" />
                <p className="font-display font-bold text-xl text-slate-900">{brandName}</p>
              </div>
              <p className="text-sm leading-7 text-slate-600">
                Cabinet de courtage en assurance orienté accompagnement humain, clarté des offres et
                qualification rapide des besoins en auto, santé et prévoyance.
              </p>
              <div className="inline-flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-semibold text-emerald-700">
                <ShieldCheck className="size-3.5" />
                Courtier inscrit — ORIAS
              </div>
            </div>

            {/* Col 2 — Assurance auto */}
            <div className="space-y-4">
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-slate-400">Assurance auto</p>
              <div className="flex flex-col gap-2.5 text-sm font-medium text-slate-600">
                <a href="/assurance-auto" className="no-underline transition hover:text-sky-700">Assurance auto</a>
                <a href="/assurance-auto-malusse" className="no-underline transition hover:text-sky-700">Conducteur malussé</a>
                <a href="/assurance-auto-resilie" className="no-underline transition hover:text-sky-700">Conducteur résilié</a>
                <a href="/assurance-auto-jeune-conducteur" className="no-underline transition hover:text-sky-700">Jeune conducteur</a>
                <a href="/assurance-auto/bonus-malus" className="no-underline transition hover:text-sky-700">Guide bonus-malus</a>
                <a href="/assurance-auto/formules" className="no-underline transition hover:text-sky-700">Tiers vs tous risques</a>
                <a href="/assurance-auto/resiliation" className="no-underline transition hover:text-sky-700">Résilier son assurance</a>
              </div>
            </div>

            {/* Col 3 — Santé & Prévoyance */}
            <div className="space-y-4">
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-slate-400">Santé & Prévoyance</p>
              <div className="flex flex-col gap-2.5 text-sm font-medium text-slate-600">
                <a href="/mutuelle-sante" className="no-underline transition hover:text-sky-700">Mutuelle santé</a>
                <a href="/mutuelle-senior" className="no-underline transition hover:text-sky-700">Mutuelle senior</a>
                <a href="/prevoyance" className="no-underline transition hover:text-sky-700">Prévoyance</a>
                <a href="/prevoyance-independant" className="no-underline transition hover:text-sky-700">Prévoyance indépendant</a>
              </div>
              <p className="mt-6 text-[0.65rem] font-bold uppercase tracking-[0.22em] text-slate-400">À propos</p>
              <div className="flex flex-col gap-2.5 text-sm font-medium text-slate-600">
                <a href="/a-propos" className="no-underline transition hover:text-sky-700">Le cabinet</a>
                <a href="/contact" className="no-underline transition hover:text-sky-700">Contact</a>
                <a href="/devis-assurance-express" className="no-underline transition hover:text-sky-700">Devis express</a>
              </div>
            </div>

            {/* Col 4 — Coordonnées */}
            <div className="space-y-4">
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-slate-400">Coordonnées</p>
              <div className="space-y-3 text-sm font-medium text-slate-600">
                <p className="leading-6">{brokerageAddress}</p>
                <a
                  href={`mailto:${contactEmail}`}
                  className="block no-underline transition hover:text-sky-700"
                >
                  {contactEmail}
                </a>
                <a
                  href={phoneHref}
                  className="block font-bold text-slate-900 no-underline transition hover:text-sky-700"
                >
                  {phoneDisplay}
                </a>
              </div>
              <a
                href={phoneHref}
                className="mt-2 inline-flex min-h-10 items-center justify-center rounded-full bg-sky-700 px-5 text-sm font-bold text-white shadow hover:bg-sky-800 transition"
              >
                Appeler maintenant
              </a>
            </div>
          </div>

          {/* Legal bar */}
          <div className="mt-12 border-t border-slate-200 pt-6 flex flex-col gap-3 text-xs font-medium text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} {brandName} — Courtier en assurances, inscrit à l'ORIAS</p>
            <div className="flex flex-wrap gap-4">
              <a href="/mentions-legales" className="no-underline transition hover:text-slate-800">Mentions légales</a>
              <a href="/mentions-legales" className="no-underline transition hover:text-slate-800">Politique de confidentialité</a>
              <a href="/contact" className="no-underline transition hover:text-slate-800">Contact</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ── STICKY CTA BAR ── */}
      <div
        className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95"
        style={{ backdropFilter: "blur(24px)" }}
      >
        <div className="container flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-slate-500">Conseiller disponible</p>
            <p className="font-display text-lg font-bold text-slate-900">
              Obtenez une étude personnalisée ou appelez-nous directement.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="/contact"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 shadow-sm no-underline transition hover:border-slate-300 hover:bg-slate-50"
            >
              Demander un rappel
            </a>
            <a
              href={phoneHref}
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-sky-700 px-5 text-sm font-bold text-white shadow no-underline transition hover:bg-sky-800"
            >
              Appeler le {phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
