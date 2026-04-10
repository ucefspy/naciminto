import type { ReactNode } from "react";
import { Phone, ShieldCheck } from "lucide-react";
import { brandName, brokerageAddress, contactEmail, phoneDisplay, phoneHref } from "@/content/siteContent";

type NoNavLayoutProps = {
  children: ReactNode;
};

/**
 * Layout Ultra-Minimaliste (ZDD - Zero Distraction Design)
 * Utilisé pour les Landing Pages Google Ads.
 * Objectif: Éviter les fuites de trafic vers les pages du site, forcer la conversion.
 */
export default function NoNavLayout({ children }: NoNavLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* HEADER ZÉRO DISTRACTION */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95" style={{ backdropFilter: "blur(24px)" }}>
        <div className="container flex min-h-20 items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src="/images/logo.png" alt="LTA Courtage logo" className="h-10 w-auto rounded-lg object-contain" />
            <div className="min-w-0">
              <span className="font-display text-lg font-bold tracking-[0.08em] text-slate-900">
                {brandName}
              </span>
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-slate-500">
                Service Gratuit
              </p>
            </div>
          </div>

          <div className="flex items-center">
            {/* Bouton d'appel très visible en Header */}
            <a
              href={phoneHref}
              id="header_call_cta"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-emerald-600 px-5 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-700"
            >
              <Phone className="size-4" />
              <span className="hidden sm:inline">Appeler le </span>
              {phoneDisplay}
            </a>
          </div>
        </div>
      </header>

      <main>{children}</main>

      {/* FOOTER CONFORME GOOGLE ADS (RGPD, Mentions, Transparence) */}
      <footer className="border-t border-slate-200 bg-white pb-32 pt-12 lg:pb-12">
        <div className="container text-center text-sm font-medium text-slate-500">
          <div className="mb-6 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-600">
              <ShieldCheck className="size-4 text-sky-700" />
              Courtier en Assurances (ORIAS: 19002619) — Données 100% sécurisées
            </div>
          </div>
          <p className="mb-4">
            {brandName} • {brokerageAddress} • SIREN 848 956 256
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
            <a href="/mentions-legales" target="_blank" rel="noopener noreferrer" className="hover:text-slate-800 underline underline-offset-2">Mentions légales</a>
            <a href="/mentions-legales" target="_blank" rel="noopener noreferrer" className="hover:text-slate-800 underline underline-offset-2">Politique de confidentialité</a>
            <a href="/contact" target="_blank" rel="noopener noreferrer" className="hover:text-slate-800 underline underline-offset-2">Nous contacter</a>
          </div>
          <p className="mt-8 text-[0.65rem] leading-5 text-slate-400 max-w-3xl mx-auto">
            Les informations recueillies font l'objet d'un traitement informatique destiné à répondre à votre demande de devis. En validant le formulaire, vous acceptez l'utilisation de vos données par le cabinet dans le cadre réglementaire applicable. Sans engagement.
          </p>
        </div>
      </footer>

      {/* STICKY BOTTOM MOBILE - CALL ONLY */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 p-4 sm:hidden" style={{ backdropFilter: "blur(24px)" }}>
        <a
          href={phoneHref}
          id="mobile_sticky_call"
          className="flex min-h-14 w-full items-center justify-center gap-2 rounded-[20px] bg-sky-700 text-base font-bold text-white shadow-lg transition hover:bg-sky-800"
        >
          <Phone className="size-5" />
          Urgent : Appeler {phoneDisplay}
        </a>
      </div>
    </div>
  );
}
