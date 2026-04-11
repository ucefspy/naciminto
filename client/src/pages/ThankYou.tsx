import { useEffect } from "react";
import SiteLayout from "@/components/SiteLayout";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { updateDynamicSeo } from "@/lib/seo";

export default function ThankYou() {
  const searchParams = new URLSearchParams(window.location.search);
  const typeStr = searchParams.get("type") || "";

  let typeLabel = "votre assurance";
  if (typeStr === "auto") typeLabel = "votre assurance auto";
  else if (typeStr === "sante") typeLabel = "votre mutuelle santé";
  else if (typeStr === "prevoyance") typeLabel = "votre prévoyance";
  else if (typeStr === "vtc") typeLabel = "votre assurance VTC";
  else if (typeStr === "rcpro") typeLabel = "votre RC Pro";
  else if (typeStr === "habitation") typeLabel = "votre assurance habitation";
  else if (typeStr === "emprunteur") typeLabel = "votre garantie emprunteur";
  else if (typeStr === "chauffage") typeLabel = "votre contrat d'entretien";

  useEffect(() => {
    updateDynamicSeo("Merci pour votre demande | LTA COURTAGE", "Votre demande a été envoyée avec succès.");
    window.scrollTo(0, 0);
  }, []);

  return (
    <SiteLayout>
      <div className="flex min-h-[70vh] flex-col items-center justify-center p-6 text-center bg-slate-50">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-emerald-100 mb-8 border-[6px] border-emerald-50">
          <CheckCircle2 className="h-12 w-12 text-emerald-600" />
        </div>
        <Badge className="mb-6 bg-emerald-100 text-emerald-800 hover:bg-emerald-100 text-sm py-1.5 px-4 rounded-full border-none shadow-sm">
          Demande envoyée avec succès
        </Badge>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6 font-display">
          Merci pour votre confiance !
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          Votre demande pour <strong>{typeLabel}</strong> a bien été transmise à notre équipe. 
          Un conseiller expert <span className="font-semibold text-slate-800">LTA COURTAGE</span> va étudier votre profil et vous recontactera sous peu avec une proposition sur mesure.
        </p>
        <Link 
          href="/" 
          className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-slate-900 px-8 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Retour à l'accueil
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </SiteLayout>
  );
}
