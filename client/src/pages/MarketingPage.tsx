import { useEffect } from "react";
import { ArrowRight, BadgeCheck, CheckCircle2, PhoneCall } from "lucide-react";
import { Link } from "wouter";
import Breadcrumb from "@/components/Breadcrumb";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import SiteLayout from "@/components/SiteLayout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { pageContentBySlug, phoneDisplay, phoneHref, productHighlights, type PageContent } from "@/content/siteContent";
import { updateDynamicSeo } from "@/lib/seo";

/** Génère le fil d'ariane à partir du slug de la page */
function buildBreadcrumb(page: PageContent): Array<{ label: string; href?: string }> {
  const trail: Array<{ label: string; href?: string }> = [];

  // Racine selon l'insuranceType ou la catégorie
  if (page.insuranceType === "auto") {
    trail.push({ label: "Assurance auto", href: "/assurance-auto" });
  } else if (page.insuranceType === "sante") {
    trail.push({ label: "Mutuelle santé", href: "/mutuelle-sante" });
  } else if (page.insuranceType === "prevoyance") {
    trail.push({ label: "Prévoyance", href: "/prevoyance" });
  }

  // Page actuelle (sans href = non cliquable)
  if (!["auto", "sante", "prevoyance"].includes(page.slug)) {
    trail.push({ label: page.shortTitle });
  }

  return trail;
}

function PageSections({ page }: { page: PageContent }) {
  const breadcrumbs = buildBreadcrumb(page);

  return (
    <div className="bg-white text-slate-950">
      {/* ── HERO ── */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-[linear-gradient(180deg,rgba(240,247,255,0.95),rgba(255,255,255,0.98))] pb-20 pt-12 sm:pt-16">
        <div className="hero-glow absolute inset-0 opacity-60" />
        <div className="container relative space-y-8">
          {/* Breadcrumb */}
          {breadcrumbs.length > 0 && <Breadcrumb items={breadcrumbs} />}

          <div className="grid gap-12 lg:grid-cols-[1.12fr_0.88fr] lg:items-start">
            {/* Left — copy */}
            <div className="space-y-8">
              <div className="space-y-5">
                <Badge className="w-fit rounded-full border border-sky-200 bg-white px-4 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-sky-700 hover:bg-white">{page.eyebrow}</Badge>
                <h1 className="max-w-3xl font-display text-4xl leading-tight text-slate-950 sm:text-5xl lg:text-6xl">
                  {page.title}
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-slate-600">{page.description}</p>
              </div>

              {/* Hero Image */}
              {page.insuranceType && (
                <div className="relative overflow-hidden rounded-[24px] border border-slate-200 shadow-sm">
                  <img
                    src={`/images/${page.insuranceType}.png`}
                    alt={`Illustration de ${page.title}`}
                    className="aspect-video w-full object-cover sm:aspect-[21/9]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent mix-blend-multiply" />
                </div>
              )}

              {/* Hero highlights — 3 cards */}
              <div className="grid gap-4 sm:grid-cols-3">
                {page.heroHighlights.map((item) => (
                  <div
                    key={item}
                    className="rounded-3xl border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-700 shadow-[0_12px_30px_-20px_rgba(15,23,42,0.1)]"
                  >
                    <div className="mb-3 inline-flex size-9 items-center justify-center rounded-full bg-sky-50 text-sky-700">
                      <CheckCircle2 className="size-4" />
                    </div>
                    <p className="font-medium">{item}</p>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-col gap-4 sm:flex-row">
                <a
                  href={phoneHref}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--brand-gold)] px-6 text-sm font-semibold text-[var(--brand-navy)] transition hover:opacity-90 shadow-md"
                >
                  <PhoneCall className="size-4" />
                  Appeler le {phoneDisplay}
                </a>
                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-6 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
                >
                  Demander un rappel
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>

            {/* Right — form or call-only */}
            {page.callOnly ? (
              <Card className="border-slate-200 bg-white text-slate-950 shadow-[0_22px_60px_-36px_rgba(15,23,42,0.28)] overflow-hidden rounded-[32px]">
                <CardContent className="space-y-6 p-7 sm:p-8">
                  <Badge className="bg-sky-50 text-sky-700 hover:bg-sky-50">
                    Ligne directe
                  </Badge>
                  <div className="space-y-4">
                    <h2 className="font-display text-3xl leading-tight">
                      Un conseiller peut vous répondre immédiatement.
                    </h2>
                    <p className="text-sm leading-7 text-slate-600">
                      Cette page privilégie l'appel direct pour les demandes à forte intention. Le numéro du
                      cabinet est affiché en priorité afin de faciliter la prise de contact sans friction.
                    </p>
                  </div>
                  <a
                    href={phoneHref}
                    className="inline-flex min-h-14 w-full items-center justify-center rounded-full bg-[var(--brand-gold)] px-6 text-base font-semibold text-[var(--brand-navy)] transition hover:opacity-90 shadow-md"
                  >
                    Appeler maintenant : {phoneDisplay}
                  </a>
                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-sm leading-7 text-slate-600">
                    <p>
                      Pour préparer l'échange, gardez en tête votre type d'assurance recherché, votre situation
                      actuelle et votre échéance souhaitée. Le conseiller vous orientera ensuite vers la démarche
                      la plus adaptée.
                    </p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <LeadCaptureForm
                title="Recevoir une étude personnalisée"
                description="Complétez ce parcours en quelques étapes. Votre demande sera enregistrée et transmise immédiatement au cabinet pour un rappel qualifié."
                sourceKind={page.sourceKind}
                sourcePath={page.path}
                fixedInsuranceType={page.insuranceType}
                submitLabel={page.ctaLabel}
              />
            )}
          </div>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section className="py-18 sm:py-22">
        <div className="container space-y-8">
          <div className="max-w-2xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Pourquoi nous consulter</p>
            <h2 className="font-display text-3xl text-slate-950 sm:text-4xl">
              Une méthode de conseil élégante, claire et rassurante.
            </h2>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {page.benefits.map((item) => (
              <Card key={item.title} className="premium-panel border-slate-200 shadow-sm">
                <CardContent className="space-y-4 p-6">
                  <div className="inline-flex size-10 items-center justify-center rounded-2xl bg-sky-50 text-sky-700">
                    <BadgeCheck className="size-5" />
                  </div>
                  <h3 className="font-display text-2xl text-slate-950">{item.title}</h3>
                  <p className="text-sm leading-7 text-slate-600">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── AUDIENCE (profils) ── */}
      {page.audience && (
        <section className="border-y border-slate-200 bg-slate-50 py-18 sm:py-22">
          <div className="container space-y-8">
            <div className="max-w-2xl space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Profils accompagnés</p>
              <h2 className="font-display text-3xl text-slate-950 sm:text-4xl">
                Des réponses adaptées aux réalités concrètes du prospect.
              </h2>
            </div>
            <div className="grid gap-5 lg:grid-cols-3">
              {page.audience.map((item) => (
                <div key={item.title} className="rounded-[28px] border border-slate-200 bg-white p-6 text-slate-700 shadow-sm">
                  <h3 className="font-display text-2xl text-slate-950">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── DIFFERENTIATORS ── */}
      <section className="py-18 sm:py-22">
        <div className="container grid gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Ce qui nous distingue</p>
            <h2 className="font-display text-3xl text-slate-950 sm:text-4xl">
              Une expérience premium qui renforce la confiance avant même le premier échange.
            </h2>
            <p className="max-w-xl text-sm leading-7 text-slate-600">
              Chaque page du site a été pensée pour combiner crédibilité, fluidité de conversion et qualité
              rédactionnelle, dans un univers cohérent avec les codes d'une marque de services haut de gamme.
            </p>
          </div>
          <div className="grid gap-5">
            {page.differentiators.map((item) => (
              <Card key={item.title} className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="font-display text-2xl text-slate-950">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-600">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUITS DU CABINET (maillage interne) ── */}
      <section className="border-y border-slate-200 bg-slate-50 py-18 sm:py-22">
        <div className="container space-y-8">
          <div className="max-w-2xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Nos univers</p>
            <h2 className="font-display text-3xl text-slate-950 sm:text-4xl">
              Auto, santé et prévoyance dans un même langage de clarté et d'exigence.
            </h2>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {productHighlights.map((item) => (
              <Card key={item.title} className="premium-panel border-slate-200">
                <CardContent className="space-y-4 p-6">
                  <h3 className="font-display text-2xl text-slate-950">{item.title}</h3>
                  <p className="text-sm leading-7 text-slate-600">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-18 sm:py-22">
        <div className="container grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Questions fréquentes</p>
            <h2 className="font-display text-3xl text-slate-950 sm:text-4xl">
              Des réponses utiles pour lever les hésitations avant le contact.
            </h2>
            <p className="text-sm leading-7 text-slate-600">
              Les sections FAQ renforcent la confiance, clarifient la démarche et accompagnent les visiteurs qui
              ont besoin d'être rassurés avant d'envoyer leur demande.
            </p>
          </div>
          <Accordion type="single" collapsible className="space-y-4">
            {page.faq.map((item, index) => (
              <AccordionItem
                key={item.question}
                value={`faq-${index}`}
                className="rounded-[28px] border border-slate-200 bg-white px-6 shadow-sm"
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
    </div>
  );
}

export default function MarketingPage({ slug }: { slug: keyof typeof pageContentBySlug }) {
  const page = pageContentBySlug[slug];

  useEffect(() => {
    if (page) {
      updateDynamicSeo(page.seoTitle, page.seoDescription);
      window.scrollTo(0, 0);
    }
  }, [page]);

  if (!page) return null;

  return (
    <SiteLayout>
      <PageSections page={page} />
    </SiteLayout>
  );
}
