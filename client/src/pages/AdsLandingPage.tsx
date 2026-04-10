import { useEffect } from "react";
import { CheckCircle2, Phone, ShieldCheck, Star } from "lucide-react";
import { updateDynamicSeo } from "@/lib/seo";
import NoNavLayout from "@/components/NoNavLayout";
import ShortAdsForm from "@/components/ShortAdsForm";
import { phoneDisplay, phoneHref } from "@/content/siteContent";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function AdsLandingPage() {
  useEffect(() => {
    updateDynamicSeo(
      "Devis Assurance Auto & Santé Réponse 2 min | LTA Courtage",
      "Économisez jusqu'à 40% sur votre assurance auto ou mutuelle santé. Devis immédiat et conseils personnalisés, situations difficiles acceptées."
    );
    window.scrollTo(0, 0);
  }, []);

  return (
    <NoNavLayout>
      {/* ── HERO SECTION AIDA / PAS ── */}
      <section className="relative overflow-hidden bg-[linear-gradient(180deg,rgba(240,247,255,0.95),rgba(255,255,255,0.98))] py-12 sm:py-20 lg:py-24">
        {/* Motif de fond / ambiance */}
        <div className="absolute inset-0 z-0 opacity-40 bg-[radial-gradient(#ecf4fc_1px,transparent_1px)] [background-size:24px_24px]"></div>
        
        <div className="container relative z-10 grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-8">
            <div className="inline-flex rounded-full border border-sky-200 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-sky-700">
              ⚡ Service gratuit & sans engagement
            </div>
            
            <h1 className="font-display text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl lg:leading-[1.1]">
              Devis assurance immédiat – Jusqu'à <span className="text-emerald-600">-40%</span>
            </h1>
            
            <p className="text-lg font-medium leading-relaxed text-slate-600 sm:text-xl">
              Réponse qualifiée en <strong className="text-slate-900">2 minutes</strong> chronos. Obtenez une excellente couverture au meilleur prix. <span className="text-rose-600 font-bold whitespace-nowrap">Cas résiliés & malussés acceptés !</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                id="main_hero_call_btn"
                href={phoneHref}
                className="flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-6 py-4 text-center text-lg font-bold text-white shadow-lg transition hover:bg-slate-800"
              >
                <Phone className="size-5" />
                Appeler immédiatement
              </a>
              <div className="flex items-center justify-center gap-2 px-6 py-4 text-center text-lg font-bold text-slate-700 bg-white shadow-sm border border-slate-200 rounded-2xl">
                👇 Ou remplissez le formulaire
              </div>
            </div>

            {/* Preuve sociale intégrée au Hero */}
            <div className="flex items-center gap-3 pt-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className={`size-10 rounded-full border-2 border-white bg-slate-200 relative overflow-hidden`}>
                    <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${i}&backgroundColor=e2e8f0`} alt="" />
                  </div>
                ))}
              </div>
              <div className="text-sm font-medium">
                <div className="flex text-amber-400">
                  <Star className="size-4 fill-current" /><Star className="size-4 fill-current" /><Star className="size-4 fill-current" /><Star className="size-4 fill-current" /><Star className="size-4 fill-current" />
                </div>
                <p className="text-slate-600 text-xs mt-0.5">Plus de 2 500 assurés satisfaits</p>
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:ml-auto lg:mr-0 z-20">
            {/* Le formulaire court CRO */}
            <div className="absolute -inset-1 rounded-[2.2rem] bg-gradient-to-br from-sky-400 via-sky-600 to-sky-400 opacity-20 blur-xl"></div>
            <div className="relative">
              <ShortAdsForm sourcePath="/devis-assurance-express" />
            </div>
          </div>
        </div>
      </section>

      {/* ── ARGUMENTS CONVERSION (PAS) ── */}
      <section className="bg-white py-16 sm:py-24 border-y border-slate-200">
        <div className="container">
          <div className="mb-12 text-center max-w-2xl mx-auto">
            <h2 className="font-display text-3xl font-bold text-slate-900 sm:text-4xl">Pourquoi passer par nous ?</h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Devis express garanti", desc: "Moins d'attente. Votre tarification est formulée en un appel.", icon: "⚡" },
              { title: "Tarifs négociés", desc: "Nous comparons les grands assureurs pour vous faire réaliser jusqu'à 40% d'économies.", icon: "💶" },
              { title: "Profils complexes", desc: "Malussé ou résilié ? Nous avons des partenariats pour accepter tous les dossiers.", icon: "🔓" },
              { title: "Conseiller Français", desc: "Un suivi humain par nos courtiers basés en France. Aucune plateforme robotisée.", icon: "👨‍💻" }
            ].map(arg => (
              <div key={arg.title} className="rounded-3xl border border-slate-100 bg-slate-50 shadow-sm p-8 text-center transition hover:border-sky-200">
                <div className="text-4xl mb-4">{arg.icon}</div>
                <h3 className="font-bold text-slate-900 mb-2">{arg.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{arg.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION CALL URGENT ── */}
      <section className="bg-slate-900 py-16 sm:py-24 text-center">
        <div className="container max-w-3xl space-y-8">
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">Parlez directement à un conseiller en moins de 30 secondes</h2>
          <p className="text-lg text-slate-400">Ne perdez pas de temps à remplir d'interminables simulateurs en ligne. Nous faisons le tri pour vous, en direct, par téléphone.</p>
          <a
            id="mid_urgent_call_btn"
            href={phoneHref}
            className="inline-flex h-16 items-center justify-center gap-3 rounded-full bg-emerald-600 px-8 text-xl font-bold text-white shadow-[0_0_40px_rgba(5,150,105,0.4)] transition hover:bg-emerald-500 hover:scale-[1.02]"
          >
            <Phone className="size-6" />
            Appeler le {phoneDisplay}
          </a>
        </div>
      </section>

      {/* ── FAQ SEO/Google ── */}
      <section className="bg-slate-50 py-16 sm:py-24">
        <div className="container max-w-3xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 mb-8 text-center">Questions fréquentes</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left font-bold text-slate-800">Est-ce que votre service est totalement gratuit ?</AccordionTrigger>
              <AccordionContent className="text-slate-600 leading-relaxed">
                Oui. L'étude, la comparaison et la présentation du devis par nos courtiers sont 100% gratuits et sans aucun engagement. Nous sommes rémunérés par l'assureur uniquement si vous souscrivez.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left font-bold text-slate-800">Combien de temps pour obtenir un devis ?</AccordionTrigger>
              <AccordionContent className="text-slate-600 leading-relaxed">
                Si vous nous appelez directement, nous pouvons formuler un devis qualifié en moins de 5 minutes après avoir ciblé quelques éléments administratifs ensemble.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left font-bold text-slate-800">Acceptez-vous vraiment les résiliés / malussés ?</AccordionTrigger>
              <AccordionContent className="text-slate-600 leading-relaxed">
                Tout à fait. C'est l'une de nos spécialités. Là où de nombreux assureurs standards ferment leurs portes, notre statut de courtier indépendant nous donne accès à des tranches spécifiques de partenaires qui reprennent les conducteurs résiliés (défaut de paiement, sinistralité).
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

    </NoNavLayout>
  );
}
