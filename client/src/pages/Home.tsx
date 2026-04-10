import { useEffect } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  Star,
  TimerReset,
} from "lucide-react";
import { Link } from "wouter";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import SiteLayout from "@/components/SiteLayout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  brandName,
  pageContentBySlug,
  phoneDisplay,
  phoneHref,
  productHighlights,
  seoPages,
  testimonials,
  trustSignals,
  trustStats,
} from "@/content/siteContent";

import { updateDynamicSeo } from "@/lib/seo";

const comparisonSteps = [
  {
    title: "Vous décrivez votre besoin",
    description:
      "Quelques informations suffisent pour indiquer l'univers d'assurance, votre profil et votre niveau d'urgence.",
    icon: ShieldCheck,
  },
  {
    title: "Nous analysons les points clés",
    description:
      "Le cabinet prépare votre échange à partir des éléments transmis afin de prioriser les solutions les plus cohérentes.",
    icon: Sparkles,
  },
  {
    title: "Vous êtes rappelé rapidement",
    description:
      "Un conseiller reprend votre dossier, explique les arbitrages utiles et vous aide à avancer concrètement.",
    icon: TimerReset,
  },
];

const homepageFaq = [
  {
    question: "Quels types de besoins puis-je transmettre à LTA COURTAGE ?",
    answer:
      "Le site a été conçu autour de trois univers principaux : assurance auto, mutuelle santé et prévoyance, avec des parcours spécifiques pour malussé, résilié, jeune conducteur, senior et indépendant.",
  },
  {
    question: "Le formulaire donne-t-il un devis immédiat ?",
    answer:
      "Le parcours privilégie une qualification rapide suivie d'un rappel. Cette approche permet de comparer les solutions avec davantage de contexte qu'un simple simulateur standard.",
  },
  {
    question: "Puis-je appeler directement sans remplir le formulaire ?",
    answer:
      "Oui. Le numéro du cabinet reste visible dans l'en-tête, dans les sections d'appel à l'action et dans la barre sticky en bas de page.",
  },
  {
    question: "Pourquoi cette structure ressemble-t-elle à un comparateur ?",
    answer:
      "Parce qu'elle facilite la lecture des offres, rassure le visiteur et hiérarchise les besoins les plus courants. La différence tient au conseil humain apporté ensuite par LTA COURTAGE.",
  },
];

const popularEntries = [
  {
    title: "Assurance auto malussé",
    href: pageContentBySlug.malusse.path,
    description: "Pour relancer une recherche après majoration ou sinistre responsable.",
  },
  {
    title: "Assurance auto résilié",
    href: pageContentBySlug.resilie.path,
    description: "Pour remettre à plat votre dossier après résiliation de contrat.",
  },
  {
    title: "Mutuelle senior",
    href: pageContentBySlug.senior.path,
    description: "Pour clarifier les garanties utiles et le bon niveau de remboursement.",
  },
  {
    title: "Prévoyance indépendant",
    href: pageContentBySlug.independant.path,
    description: "Pour protéger le revenu professionnel et l'équilibre du foyer.",
  },
];

export default function Home() {
  useEffect(() => {
    updateDynamicSeo(
      `${brandName} | Courtier assurance auto, mutuelle santé et prévoyance`,
      "LTA COURTAGE vous accompagne en assurance auto, mutuelle santé et prévoyance avec une structure claire inspirée des comparateurs et un rappel rapide par un conseiller."
    );
  }, []);

  return (
    <SiteLayout>
      {/* ────────────────────────────────────────────────────────
          1. HERO — sélecteur produit + formulaire
      ──────────────────────────────────────────────────────── */}
      <section className="section-shell overflow-hidden border-b border-slate-200/80 bg-[linear-gradient(180deg,rgba(240,247,255,0.96),rgba(255,255,255,0.98))]">
        <div className="container grid gap-12 lg:grid-cols-[1.04fr_0.96fr] lg:items-start">
          <div className="space-y-8 pt-4 sm:pt-6">
            <div className="space-y-5">
              <Badge className="w-fit rounded-full border border-sky-200 bg-white px-4 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-sky-700 hover:bg-white">
                Courtier comparateur en assurance
              </Badge>
              <div className="space-y-5">
                <h1 className="headline-balance max-w-4xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                  Comparez plus clairement vos solutions d'assurance avec l'accompagnement de{" "}
                  <span className="text-sky-700">LTA COURTAGE</span>.
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-slate-600">
                  Nous avons structuré le site comme un comparateur d'assurance moderne pour simplifier votre
                  recherche, tout en conservant la valeur d'un conseil humain sur l'auto, la santé et la
                  prévoyance.
                </p>
              </div>
            </div>

            {/* Trust signals */}
            <div className="grid gap-4 sm:grid-cols-3">
              {trustSignals.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_18px_50px_-32px_rgba(15,23,42,0.24)]"
                >
                  <div className="mb-4 inline-flex size-11 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
                    <CheckCircle2 className="size-5" />
                  </div>
                  <h2 className="text-lg font-semibold tracking-tight text-slate-950">{item.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href={phoneHref}
                className="cta-shadow inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-sky-700 px-6 text-sm font-semibold text-white no-underline transition hover:bg-sky-800"
              >
                <PhoneCall className="size-4" />
                Appeler le {phoneDisplay}
              </a>
              <Link
                href="/devis-assurance-express"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-6 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
              >
                Accéder au formulaire express
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>

          {/* Formulaire */}
          <LeadCaptureForm
            title="Recevoir une étude personnalisée"
            description="Décrivez votre besoin en quelques étapes. Votre demande est transmise au cabinet pour un rappel qualifié et rapide."
            sourceKind="homepage"
            sourcePath="/"
            submitLabel="Recevoir mon rappel"
          />
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
          2. BARRE TRUST STATS — style lelynx
      ──────────────────────────────────────────────────────── */}
      <section className="border-b border-slate-200 bg-slate-50 shadow-sm">
        <div className="container py-7">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {trustStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-bold tracking-tight text-sky-700 sm:text-3xl">{stat.value}</p>
                <p className="mt-1 text-xs font-medium uppercase tracking-[0.18em] text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
          3. NOS UNIVERS (3 cartes produits)
      ──────────────────────────────────────────────────────── */}
      <section className="section-shell">
        <div className="container space-y-8">
          <div className="max-w-3xl space-y-4">
            <p className="eyebrow">Nos univers</p>
            <h2 className="headline-balance text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Trois besoins majeurs de l'assurance, organisés pour une lecture simple et orientée décision.
            </h2>
            <p className="max-w-2xl text-sm leading-7 text-slate-600">
              La structure met en avant les entrées les plus recherchées, puis ouvre sur des pages plus ciblées
              afin de répondre à des profils à forte intention sans perdre en lisibilité.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {productHighlights.map((item, index) => {
              const target = index === 0 ? "/assurance-auto" : index === 1 ? "/mutuelle-sante" : "/prevoyance";
              return (
                <Card
                  key={item.title}
                  className="overflow-hidden rounded-[32px] border-slate-200 bg-white shadow-[0_22px_60px_-36px_rgba(15,23,42,0.28)]"
                >
                  <CardContent className="space-y-5 p-6">
                    <div className="inline-flex rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
                      {index === 0 ? "Auto" : index === 1 ? "Santé" : "Prévoyance"}
                    </div>
                    <h3 className="text-2xl font-semibold tracking-tight text-slate-950">{item.title}</h3>
                    <p className="text-sm leading-7 text-slate-600">{item.description}</p>
                    <Link
                      href={target}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-sky-700 no-underline hover:text-sky-800"
                    >
                      Découvrir cette page
                      <ChevronRight className="size-4" />
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
          4. COMMENT ÇA MARCHE (3 étapes)
      ──────────────────────────────────────────────────────── */}
      <section className="section-shell border-y border-slate-200 bg-slate-50/90">
        <div className="container grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <div className="space-y-4">
            <p className="eyebrow">Comment ça marche</p>
            <h2 className="headline-balance text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Une mécanique de comparateur rassurante, complétée par un vrai échange avec le cabinet.
            </h2>
            <p className="text-sm leading-7 text-slate-600">
              La conversion ne repose pas uniquement sur le design. Elle dépend aussi de la clarté du parcours,
              de la qualité des promesses et de la rapidité du suivi commercial.
            </p>
          </div>

          <div className="grid gap-5">
            {comparisonSteps.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_-32px_rgba(15,23,42,0.24)]"
                >
                  <div className="flex items-start gap-4">
                    <div className="inline-flex size-12 shrink-0 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
                      <Icon className="size-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                        Étape {index + 1}
                      </p>
                      <h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-950">{item.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
          5. PROFILS SPÉCIAUX — longue traîne (comme lelynx)
      ──────────────────────────────────────────────────────── */}
      <section className="section-shell">
        <div className="container space-y-8">
          <div className="max-w-3xl space-y-4">
            <p className="eyebrow">Pages les plus recherchées</p>
            <h2 className="headline-balance text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Des pages piliers et des pages spécifiques pour capter une intention SEO plus qualifiée.
            </h2>
            <p className="text-sm leading-7 text-slate-600">
              Le maillage interne relie les univers principaux aux cas les plus fréquents. Cette organisation
              soutient à la fois la découverte, le référencement et la prise de contact.
            </p>
          </div>

          {/* Pages piliers SEO */}
          <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-4">
            {seoPages.slice(0, 4).map((page) => (
              <Link
                key={page.path}
                href={page.path}
                className="rounded-[30px] border border-slate-200 bg-white p-6 no-underline shadow-[0_18px_50px_-34px_rgba(15,23,42,0.26)] transition hover:-translate-y-0.5 hover:border-sky-300"
              >
                <div className="space-y-4">
                  <Badge className="w-fit rounded-full bg-sky-50 text-sky-700 hover:bg-sky-50">
                    {page.shortTitle}
                  </Badge>
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight text-slate-950">{page.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{page.seoDescription}</p>
                  </div>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-sky-700">
                    Ouvrir la page
                    <ArrowRight className="size-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Profils longue traîne (cartes compactes) */}
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {popularEntries.map((entry) => (
              <Link
                key={entry.href}
                href={entry.href}
                className="rounded-[26px] border border-dashed border-slate-300 bg-slate-50 px-5 py-4 no-underline transition hover:border-sky-300 hover:bg-white"
              >
                <p className="text-sm font-semibold text-slate-950">{entry.title}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{entry.description}</p>
              </Link>
            ))}
          </div>

          {/* Guide cluster pages (nouvelles pages) */}
          <div className="rounded-[28px] border border-slate-200 bg-slate-50/70 p-6">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Guides pratiques</p>
            <div className="grid gap-3 sm:grid-cols-3">
              {[pageContentBySlug.bonusMalus, pageContentBySlug.resiliationAuto, pageContentBySlug.formulesAuto].map((page) => (
                <Link
                  key={page.path}
                  href={page.path}
                  className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 no-underline transition hover:border-sky-200 hover:bg-sky-50/40"
                >
                  <div className="size-8 shrink-0 rounded-full bg-sky-100 flex items-center justify-center">
                    <ChevronRight className="size-4 text-sky-700" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-950">{page.shortTitle}</p>
                    <p className="text-xs leading-5 text-slate-500">{page.eyebrow}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
          6. AVIS CLIENTS — preuve sociale
      ──────────────────────────────────────────────────────── */}
      <section className="section-shell border-y border-slate-200 bg-[linear-gradient(180deg,rgba(240,249,255,0.7),rgba(255,255,255,0.95))]">
        <div className="container space-y-8">
          <div className="max-w-3xl space-y-4">
            <p className="eyebrow">Avis clients</p>
            <h2 className="headline-balance text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Ce que nos prospects retiennent de l'expérience LTA COURTAGE.
            </h2>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="size-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-sm font-semibold text-slate-950">4,9 / 5</span>
              <span className="text-sm text-slate-500">· Avis vérifiés</span>
            </div>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {testimonials.map((item) => (
              <div
                key={item.name}
                className="rounded-[30px] border border-slate-200 bg-white p-7 shadow-[0_18px_50px_-32px_rgba(15,23,42,0.22)]"
              >
                <div className="flex items-center gap-0.5 mb-4">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="size-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm leading-7 text-slate-700 italic">"{item.text}"</p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="size-9 rounded-full bg-sky-100 flex items-center justify-center text-xs font-bold text-sky-700">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-950">{item.name}</p>
                    <p className="text-xs text-slate-500">{item.location} · {item.product}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
          7. LANDING PAGES ADS
      ──────────────────────────────────────────────────────── */}
      <section className="section-shell border-b border-slate-200">
        <div className="container grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="space-y-4">
            <p className="eyebrow">Campagnes et pages d'acquisition</p>
            <h2 className="headline-balance text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Deux landing pages dédiées aux intentions les plus fortes : formulaire express ou appel immédiat.
            </h2>
            <p className="text-sm leading-7 text-slate-600">
              Les parcours publicitaires reprennent la même grammaire visuelle pour conserver la confiance tout
              en réduisant la friction sur les campagnes Google Ads.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {[pageContentBySlug.adsForm, pageContentBySlug.adsCall].map((page) => (
              <Card
                key={page.path}
                className="rounded-[30px] border-slate-200 bg-white shadow-[0_18px_50px_-34px_rgba(15,23,42,0.26)]"
              >
                <CardContent className="space-y-5 p-6">
                  <Badge className="w-fit rounded-full bg-slate-100 text-slate-700 hover:bg-slate-100">
                    {page.eyebrow}
                  </Badge>
                  <h3 className="text-2xl font-semibold tracking-tight text-slate-950">{page.title}</h3>
                  <p className="text-sm leading-7 text-slate-600">{page.description}</p>
                  <Link
                    href={page.path}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-sky-700 no-underline hover:text-sky-800"
                  >
                    Voir la landing page
                    <ArrowRight className="size-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
          8. FAQ
      ──────────────────────────────────────────────────────── */}
      <section className="section-shell">
        <div className="container grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <div className="space-y-4">
            <p className="eyebrow">Questions fréquentes</p>
            <h2 className="headline-balance text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Tout ce qu'il faut pour rassurer avant de laisser ses coordonnées.
            </h2>
            <p className="text-sm leading-7 text-slate-600">
              Cette FAQ soutient le SEO informationnel tout en répondant aux objections les plus fréquentes d'un
              prospect en recherche active d'assurance.
            </p>
          </div>
          <Accordion type="single" collapsible className="space-y-4">
            {homepageFaq.map((item, index) => (
              <AccordionItem
                key={item.question}
                value={`home-faq-${index}`}
                className="rounded-[28px] border border-slate-200 bg-white px-6 shadow-[0_18px_45px_-36px_rgba(15,23,42,0.24)]"
              >
                <AccordionTrigger className="text-left text-base font-semibold text-slate-950 hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-sm leading-7 text-slate-600">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </SiteLayout>
  );
}
