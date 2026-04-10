import { useEffect } from "react";
import { Phone, ShieldCheck, CheckCircle2 } from "lucide-react";
import { updateDynamicSeo } from "@/lib/seo";
import NoNavLayout from "@/components/NoNavLayout";
import { phoneDisplay, phoneHref } from "@/content/siteContent";

export default function AdsCallOnlyPage() {
  useEffect(() => {
    updateDynamicSeo(
      "Appel d'Urgence - Devis Assurance Auto Immédiat par téléphone",
      "Besoin pressant d'une assurance auto ou santé ? LTA courtage répond immédiatement au téléphone. Obtenez votre tarif en 2 minutes de vive voix."
    );
    window.scrollTo(0, 0);
  }, []);

  return (
    <NoNavLayout>
      <section className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden bg-slate-900 py-20">
        <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.8),transparent_50%)]"></div>
        <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(circle_at_bottom_left,rgba(5,150,105,0.8),transparent_50%)]"></div>
        
        <div className="container relative z-10 mx-auto max-w-3xl text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-1.5 text-sm font-bold uppercase tracking-widest text-sky-400">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex size-2 rounded-full bg-sky-500"></span>
            </span>
            Conseillers disponibles
          </div>

          <h1 className="mb-6 font-display text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
            L'assurance auto par téléphone en <span className="text-emerald-400">2 min</span>
          </h1>

          <p className="mb-12 text-xl font-medium leading-relaxed text-slate-300">
            Jusqu'à -40% garantis. Ne perdez plus de temps avec les formulaires.<br className="hidden sm:block" />
            Nous prenons votre dossier en charge, même complexe (résiliation, malus).
          </p>

          <a
            id="call_only_hero_btn"
            href={phoneHref}
            className="group relative mx-auto flex w-full max-w-md flex-col items-center justify-center gap-3 rounded-[2rem] bg-emerald-600 px-8 py-8 shadow-[0_0_80px_rgba(5,150,105,0.4)] transition hover:scale-105 hover:bg-emerald-500 hover:shadow-[0_0_120px_rgba(5,150,105,0.6)]"
          >
            <span className="flex items-center gap-4 text-white">
              <Phone className="size-8" fill="currentColor" />
              <span className="font-display text-3xl font-black sm:text-4xl tracking-wider">{phoneDisplay}</span>
            </span>
            <span className="text-sm font-bold uppercase tracking-widest text-emerald-100 opacity-80 group-hover:opacity-100">
              Appel gratuit et sans engagement
            </span>
          </a>

          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              "Tarification instantanée",
              "Spécialiste risques aggravés",
              "Aucun acompte demandé",
            ].map((text) => (
              <div key={text} className="flex items-center justify-center gap-2 text-slate-300">
                <CheckCircle2 className="size-5 text-sky-400" />
                <span className="text-sm font-semibold">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </NoNavLayout>
  );
}
