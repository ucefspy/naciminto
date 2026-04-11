import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import { phoneDisplay, phoneHref } from "@/content/siteContent";
import {
  insuranceTypeLabels,
  insuranceTypes,
  leadFormSchema,
  type InsuranceType,
  type LeadFormInput,
  type LeadSourceKind,
} from "../../../shared/leads";

type LeadCaptureFormProps = {
  title: string;
  description: string;
  sourceKind: LeadSourceKind;
  sourcePath: string;
  submitLabel?: string;
  fixedInsuranceType?: InsuranceType;
  compact?: boolean;
};

type LeadFormValues = z.input<typeof leadFormSchema>;

const stepFields: Array<Array<keyof LeadFormValues>> = [
  ["insuranceType", "profile"], // L'étape 1 gérera le profile via les questions spécifiques
  ["fullName", "phone", "email"],
  ["postalCode", "callbackPreference", "message", "consent"],
];

const callbackOptions = [
  "Le plus tôt possible",
  "Ce matin",
  "Cet après-midi",
  "En soirée",
  "Par email d’abord",
] as const;

function ErrorText({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-2 text-xs text-rose-500">{message}</p>;
}

export default function LeadCaptureForm({
  title,
  description,
  sourceKind,
  sourcePath,
  submitLabel = "Recevoir mon rappel",
  fixedInsuranceType,
  compact = false,
}: LeadCaptureFormProps) {
  const [step, setStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const submitLead = trpc.leads.submit.useMutation();

  // États pour les formulaires spécifiques
  const [autoProfil, setAutoProfil] = useState<string>("");
  const [autoFormule, setAutoFormule] = useState<string>("");
  const [santeProfil, setSanteProfil] = useState<string>("");
  const [santeGarantie, setSanteGarantie] = useState<string>("");
  const [prevoyanceStatut, setPrevoyanceStatut] = useState<string>("");
  const [prevoyanceObjectif, setPrevoyanceObjectif] = useState<string>("");
  const [vtcStatut, setVtcStatut] = useState<string>("");
  const [vtcFormule, setVtcFormule] = useState<string>("");
  const [rcproSecteur, setRcproSecteur] = useState<string>("");
  const [rcproCA, setRcproCA] = useState<string>("");
  const [habStatut, setHabStatut] = useState<string>("");
  const [habType, setHabType] = useState<string>("");
  const [empProjet, setEmpProjet] = useState<string>("");
  const [empMontant, setEmpMontant] = useState<string>("");
  const [chauffType, setChauffType] = useState<string>("");
  const [chauffBesoin, setChauffBesoin] = useState<string>("");

  const defaultValues = useMemo<LeadFormValues>(
    () => ({
      fullName: "",
      phone: "",
      email: "",
      insuranceType: fixedInsuranceType ?? "auto",
      profile: "",
      postalCode: "",
      callbackPreference: callbackOptions[0],
      message: "",
      consent: false,
      sourcePath,
      sourceKind,
      utmSource: "",
      utmMedium: "",
      utmCampaign: "",
      utmTerm: "",
      utmContent: "",
    }),
    [fixedInsuranceType, sourceKind, sourcePath],
  );

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    defaultValues,
    mode: "onTouched",
  });

  const progressValue = ((step + 1) / stepFields.length) * 100;
  const selectedInsuranceType = watch("insuranceType");
  const consent = watch("consent");

  // Compilation du champ "profile" selon les états dynamiques métiers
  useEffect(() => {
    let profileStr = "";
    if (selectedInsuranceType === "auto") {
      const p = autoProfil || "Non renseigné";
      const f = autoFormule || "À déterminer";
      profileStr = `Auto - Profil: ${p} | Formule souhaitée: ${f}`;
    } else if (selectedInsuranceType === "sante") {
      const p = santeProfil || "Non renseigné";
      const g = santeGarantie || "À déterminer";
      profileStr = `Santé - Profil: ${p} | Niveau demandé: ${g}`;
    } else if (selectedInsuranceType === "prevoyance") {
      const s = prevoyanceStatut || "Non renseigné";
      const o = prevoyanceObjectif || "À déterminer";
      profileStr = `Prévoyance - Statut: ${s} | Objectif: ${o}`;
    } else if (selectedInsuranceType === "vtc") {
      const s = vtcStatut || "Non renseigné";
      const f = vtcFormule || "À déterminer";
      profileStr = `VTC - Statut: ${s} | Formule: ${f}`;
    } else if (selectedInsuranceType === "rcpro") {
      const s = rcproSecteur || "Non renseigné";
      const c = rcproCA || "À déterminer";
      profileStr = `RC Pro - Secteur: ${s} | CA: ${c}`;
    } else if (selectedInsuranceType === "habitation") {
      const s = habStatut || "Non renseigné";
      const t = habType || "À déterminer";
      profileStr = `Habitation - Statut: ${s} | Type: ${t}`;
    } else if (selectedInsuranceType === "emprunteur") {
      const p = empProjet || "Non renseigné";
      const m = empMontant || "À déterminer";
      profileStr = `Emprunteur - Projet: ${p} | Montant: ${m}`;
    } else if (selectedInsuranceType === "chauffage") {
      const t = chauffType || "Non renseigné";
      const b = chauffBesoin || "À déterminer";
      profileStr = `Chauffage - Type: ${t} | Besoin: ${b}`;
    }
    
    setValue("profile", profileStr);
    if (autoProfil || autoFormule || santeProfil || santeGarantie || prevoyanceStatut || prevoyanceObjectif || vtcStatut || rcproSecteur || habStatut || empProjet || chauffType) {
       clearErrors("profile");
    }
  }, [
    selectedInsuranceType,
    autoProfil,
    autoFormule,
    santeProfil,
    santeGarantie,
    prevoyanceStatut,
    prevoyanceObjectif,
    vtcStatut, vtcFormule,
    rcproSecteur, rcproCA,
    habStatut, habType,
    empProjet, empMontant,
    chauffType, chauffBesoin,
    setValue,
    clearErrors
  ]);

  const validateCustomStep = () => {
    if (selectedInsuranceType === "auto" && !autoProfil) {
      toast.error("Veuillez choisir votre profil de conducteur.");
      return false;
    }
    if (selectedInsuranceType === "sante" && !santeProfil) {
      toast.error("Veuillez choisir votre profil santé.");
      return false;
    }
    if (selectedInsuranceType === "prevoyance" && !prevoyanceStatut) {
      toast.error("Veuillez choisir votre statut professionnel.");
      return false;
    }
    if (selectedInsuranceType === "vtc" && !vtcStatut) {
      toast.error("Veuillez choisir votre statut pour l'assurance VTC.");
      return false;
    }
    if (selectedInsuranceType === "rcpro" && !rcproSecteur) {
      toast.error("Veuillez choisir votre secteur d'activité.");
      return false;
    }
    if (selectedInsuranceType === "habitation" && !habStatut) {
      toast.error("Veuillez choisir votre statut (locataire/propriétaire).");
      return false;
    }
    if (selectedInsuranceType === "emprunteur" && !empProjet) {
      toast.error("Veuillez indiquer votre projet (nouveau/renégociation).");
      return false;
    }
    if (selectedInsuranceType === "chauffage" && !chauffType) {
      toast.error("Veuillez indiquer le type d'équipement.");
      return false;
    }
    return true;
  };

  const goNext = async () => {
    if (step === 0 && !validateCustomStep()) return;
    const valid = await trigger(stepFields[step] ?? []);
    if (!valid) return;
    setStep((current) => Math.min(current + 1, stepFields.length - 1));
  };

  const goBack = () => {
    setStep((current) => Math.max(current - 1, 0));
  };

  const onSubmit = handleSubmit(async (values) => {
    const searchParams = new URLSearchParams(window.location.search);
    const payload: LeadFormInput = {
      fullName: values.fullName,
      phone: values.phone,
      email: values.email,
      insuranceType: values.insuranceType,
      profile: values.profile,
      postalCode: values.postalCode,
      callbackPreference: values.callbackPreference,
      message: values.message ?? "",
      consent: Boolean(values.consent),
      sourceKind,
      sourcePath,
      utmSource: searchParams.get("utm_source") ?? "",
      utmMedium: searchParams.get("utm_medium") ?? "",
      utmCampaign: searchParams.get("utm_campaign") ?? "",
      utmTerm: searchParams.get("utm_term") ?? "",
      utmContent: searchParams.get("utm_content") ?? "",
    };

    try {
      await submitLead.mutateAsync(payload);

      const trackingWindow = window as Window & {
        dataLayer?: Array<Record<string, unknown>>;
        gtag?: (...args: unknown[]) => void;
        __trackingPlaceholders?: {
          googleAdsId?: string;
          googleAdsConversionLabel?: string;
        };
      };

      trackingWindow.dataLayer = trackingWindow.dataLayer ?? [];
      
      // Séparation First Name / Last Name en gérant le fait qu'il n'y ait qu'un seul champ
      const nameParts = payload.fullName.trim().split(" ");
      const firstName = nameParts[0] || "";
      const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";

      trackingWindow.dataLayer.push({
        event: "lead_submission",
        insurance_type: payload.insuranceType,
        source_kind: payload.sourceKind,
        // Enhanced Conversions Data (GTM va hasher ces informations automatiquement si configuré)
        enhanced_conversion_data: {
          email: payload.email,
          phone_number: payload.phone,
          address: {
            first_name: firstName,
            last_name: lastName,
            postal_code: payload.postalCode,
            country: "FR"
          }
        }
      });

      const googleAdsId = trackingWindow.__trackingPlaceholders?.googleAdsId ?? "AW-XXXXXXXXX";
      const googleAdsConversionLabel =
        trackingWindow.__trackingPlaceholders?.googleAdsConversionLabel ?? "CONTACT_LEAD_PLACEHOLDER";

      trackingWindow.gtag?.("event", "conversion", {
        send_to: `${googleAdsId}/${googleAdsConversionLabel}`,
        value: 1,
        currency: "EUR",
      });

      // Redirection vers la page de remerciement personnalisée
      window.location.href = `/merci?type=${payload.insuranceType}`;
      
    } catch (error) {
      console.error(error);
      toast.error("Une erreur est survenue. Veuillez réessayer ou nous appeler directement.");
    }
  });

  if (isSubmitted) {
    return (
      <Card className="border-slate-200 bg-white text-slate-950 shadow-[0_22px_60px_-36px_rgba(15,23,42,0.28)] overflow-hidden rounded-[32px]">
        <CardHeader className="space-y-4">
          <Badge className="w-fit bg-emerald-50 text-emerald-700 hover:bg-emerald-50">
            Demande envoyée
          </Badge>
          <CardTitle className="font-display text-3xl leading-tight">
            Merci, votre demande a bien été transmise.
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5 text-sm text-slate-700">
          <p>
            Un conseiller vous recontactera prochainement afin de reprendre votre besoin en
            <span className="font-semibold"> {insuranceTypeLabels[fixedInsuranceType ?? selectedInsuranceType]}</span>.
          </p>
          <p>
            Si votre demande est urgente, vous pouvez également appeler immédiatement le cabinet au
            <a className="ml-1 font-semibold text-sky-700 underline underline-offset-4" href={phoneHref}>
              {phoneDisplay}
            </a>
            .
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => setIsSubmitted(false)}
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-slate-300 bg-white px-5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Envoyer une autre demande
            </button>
            <Link
              href="/contact"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-sky-700 px-5 text-sm font-semibold text-white transition hover:bg-sky-800"
            >
              Voir la page contact
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Sous-composant UI Selector
  const SelectButton = ({ active, label, onClick }: { active: boolean; label: string; onClick: () => void }) => (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-2xl border px-4 py-3 text-sm font-medium transition-all ${
        active 
          ? "border-sky-500 bg-sky-50 text-sky-800 ring-1 ring-sky-500 shadow-sm"
          : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
      }`}
    >
      {label}
    </button>
  );

  return (
    <Card className="border-slate-200 bg-white text-slate-950 shadow-[0_22px_60px_-36px_rgba(15,23,42,0.28)] rounded-[32px]">
      <CardHeader className={compact ? "space-y-3 pb-4" : "space-y-4"}>
        <Badge className="w-fit bg-slate-100 text-slate-600 hover:bg-slate-100">Étape {step + 1} sur 3</Badge>
        <CardTitle className={compact ? "font-display text-2xl leading-tight" : "font-display text-3xl leading-tight"}>
          {title}
        </CardTitle>
        <p className="text-sm leading-6 text-slate-600">{description}</p>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs uppercase tracking-[0.22em] text-slate-500">
            <span>Progression</span>
            <span>{Math.round(progressValue)} %</span>
          </div>
          <Progress value={progressValue} className="h-2 bg-slate-100 [&>div]:bg-sky-500" />
        </div>
      </CardHeader>
      <CardContent>
        <form className="space-y-6" onSubmit={onSubmit}>
          {step === 0 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
              
              {!fixedInsuranceType && (
                <div className="space-y-3">
                  <Label className="text-slate-950 text-base font-semibold">1. Quel est votre besoin principal ?</Label>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {insuranceTypes.map((type) => {
                      const active = selectedInsuranceType === type;
                      return (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setValue("insuranceType", type, { shouldTouch: true, shouldValidate: true })}
                          className={`rounded-2xl border px-4 py-4 text-left transition-all ${
                            active
                              ? "border-sky-500 bg-sky-50 text-sky-800 ring-1 ring-sky-500 shadow-sm"
                              : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                          }`}
                        >
                          <span className="block font-semibold text-sm">{insuranceTypeLabels[type]}</span>
                        </button>
                      );
                    })}
                  </div>
                  <ErrorText message={errors.insuranceType?.message} />
                </div>
              )}

              {/* Formulaire Métier Dynamique */}
              {selectedInsuranceType === "auto" && (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label className="text-slate-950 font-semibold">Quel est votre profil de conducteur ?</Label>
                    <div className="grid gap-3 grid-cols-2">
                      <SelectButton active={autoProfil === "Standard"} label="Standard" onClick={() => setAutoProfil("Standard")} />
                      <SelectButton active={autoProfil === "Jeune conducteur"} label="Jeune conducteur" onClick={() => setAutoProfil("Jeune conducteur")} />
                      <SelectButton active={autoProfil === "Malussé"} label="Malussé" onClick={() => setAutoProfil("Malussé")} />
                      <SelectButton active={autoProfil === "Résilié"} label="Résilié" onClick={() => setAutoProfil("Résilié")} />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-slate-950 font-semibold">Quelle formule recherchez-vous ?</Label>
                    <div className="grid gap-3 grid-cols-2">
                      <SelectButton active={autoFormule === "Tiers"} label="Tiers (Éco)" onClick={() => setAutoFormule("Tiers")} />
                      <SelectButton active={autoFormule === "Intermédiaire"} label="Intermédiaire" onClick={() => setAutoFormule("Intermédiaire")} />
                      <SelectButton active={autoFormule === "Tous risques"} label="Tous risques" onClick={() => setAutoFormule("Tous risques")} />
                      <SelectButton active={autoFormule === "Je ne sais pas"} label="Je ne sais pas" onClick={() => setAutoFormule("Je ne sais pas")} />
                    </div>
                  </div>
                </div>
              )}

              {selectedInsuranceType === "sante" && (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label className="text-slate-950 font-semibold">Quelle est votre situation ?</Label>
                    <div className="grid gap-3 grid-cols-2">
                      <SelectButton active={santeProfil === "Salarié / Actif"} label="Salarié / Actif" onClick={() => setSanteProfil("Salarié / Actif")} />
                      <SelectButton active={santeProfil === "Senior / Retraité"} label="Senior / Retraité" onClick={() => setSanteProfil("Senior / Retraité")} />
                      <SelectButton active={santeProfil === "TNS / Indépendant"} label="TNS / Indépendant" onClick={() => setSanteProfil("TNS / Indépendant")} />
                      <SelectButton active={santeProfil === "Sans emploi / Autre"} label="Autre" onClick={() => setSanteProfil("Sans emploi / Autre")} />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-slate-950 font-semibold">Niveau de couverture souhaité :</Label>
                    <div className="grid gap-3 grid-cols-1 sm:grid-cols-3">
                      <SelectButton active={santeGarantie === "Éco"} label="Éco (L'essentiel)" onClick={() => setSanteGarantie("Éco")} />
                      <SelectButton active={santeGarantie === "Confort"} label="Confort (Classique)" onClick={() => setSanteGarantie("Confort")} />
                      <SelectButton active={santeGarantie === "Premium"} label="Premium (Renforcé)" onClick={() => setSanteGarantie("Premium")} />
                    </div>
                  </div>
                </div>
              )}

              {selectedInsuranceType === "prevoyance" && (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label className="text-slate-950 font-semibold">Quel est votre statut professionnel ?</Label>
                    <div className="grid gap-3 grid-cols-2">
                      <SelectButton active={prevoyanceStatut === "Indépendant (Libéral, TNS...)"} label="Indépendant (TNS)" onClick={() => setPrevoyanceStatut("Indépendant (Libéral, TNS...)")} />
                      <SelectButton active={prevoyanceStatut === "Salarié"} label="Salarié" onClick={() => setPrevoyanceStatut("Salarié")} />
                      <SelectButton active={prevoyanceStatut === "Chef d'entreprise"} label="Chef d'entreprise" onClick={() => setPrevoyanceStatut("Chef d'entreprise")} />
                      <SelectButton active={prevoyanceStatut === "Profession médicale"} label="Profession médicale" onClick={() => setPrevoyanceStatut("Profession médicale")} />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-slate-950 font-semibold">Quelle est votre priorité ?</Label>
                    <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">
                      <SelectButton active={prevoyanceObjectif === "Protéger mes revenus (IT/Invalidité)"} label="Maintien de salaire / revenus" onClick={() => setPrevoyanceObjectif("Protéger mes revenus (IT/Invalidité)")} />
                      <SelectButton active={prevoyanceObjectif === "Protéger ma famille (Capital Décès)"} label="Protection de la famille" onClick={() => setPrevoyanceObjectif("Protéger ma famille (Capital Décès)")} />
                    </div>
                  </div>
                </div>
              )}

              {selectedInsuranceType === "vtc" && (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label className="text-slate-950 font-semibold">Quel est votre statut pour cette assurance VTC ?</Label>
                    <div className="grid gap-3 grid-cols-2">
                      <SelectButton active={vtcStatut === "Chauffeur indépendant"} label="Chauffeur indépendant" onClick={() => setVtcStatut("Chauffeur indépendant")} />
                      <SelectButton active={vtcStatut === "Flotte / Capacitaire"} label="Flotte / Capacitaire" onClick={() => setVtcStatut("Flotte / Capacitaire")} />
                      <SelectButton active={vtcStatut === "Conducteur malussé ou résilié"} label="Malussé / Résilié" onClick={() => setVtcStatut("Conducteur malussé ou résilié")} />
                      <SelectButton active={vtcStatut === "En création"} label="Société en création" onClick={() => setVtcStatut("En création")} />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-slate-950 font-semibold">Quelle formule recherchez-vous ?</Label>
                    <div className="grid gap-3 grid-cols-2">
                      <SelectButton active={vtcFormule === "Tous risques VTC"} label="Tous risques (Recommandé)" onClick={() => setVtcFormule("Tous risques VTC")} />
                      <SelectButton active={vtcFormule === "Tiers VTC"} label="Tiers / Intermédiaire" onClick={() => setVtcFormule("Tiers VTC")} />
                    </div>
                  </div>
                </div>
              )}

              {selectedInsuranceType === "rcpro" && (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label className="text-slate-950 font-semibold">Dans quel secteur d'activité exercez-vous ?</Label>
                    <div className="grid gap-3 grid-cols-2">
                      <SelectButton active={rcproSecteur === "BTP / Construction"} label="BTP / Construction" onClick={() => setRcproSecteur("BTP / Construction")} />
                      <SelectButton active={rcproSecteur === "Services / Conseil"} label="Services / Conseil" onClick={() => setRcproSecteur("Services / Conseil")} />
                      <SelectButton active={rcproSecteur === "Commerce"} label="Commerce" onClick={() => setRcproSecteur("Commerce")} />
                      <SelectButton active={rcproSecteur === "Médical / Bien-être"} label="Médical / Bien-être" onClick={() => setRcproSecteur("Médical / Bien-être")} />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-slate-950 font-semibold">Quel est votre chiffre d'affaires (estimé) ?</Label>
                    <div className="grid gap-3 grid-cols-2">
                      <SelectButton active={rcproCA === "Moins de 50 000 €"} label="< 50 000 €" onClick={() => setRcproCA("Moins de 50 000 €")} />
                      <SelectButton active={rcproCA === "Plus de 50 000 €"} label="> 50 000 €" onClick={() => setRcproCA("Plus de 50 000 €")} />
                    </div>
                  </div>
                </div>
              )}

              {selectedInsuranceType === "habitation" && (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label className="text-slate-950 font-semibold">Êtes-vous propriétaire ou locataire ?</Label>
                    <div className="grid gap-3 grid-cols-1 sm:grid-cols-3">
                      <SelectButton active={habStatut === "Locataire"} label="Locataire" onClick={() => setHabStatut("Locataire")} />
                      <SelectButton active={habStatut === "Propriétaire occupant"} label="Propriétaire occupant" onClick={() => setHabStatut("Propriétaire occupant")} />
                      <SelectButton active={habStatut === "Propriétaire non occupant (PNO)"} label="PNO" onClick={() => setHabStatut("Propriétaire non occupant (PNO)")} />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-slate-950 font-semibold">Quel type de logement concerne votre demande ?</Label>
                    <div className="grid gap-3 grid-cols-2">
                      <SelectButton active={habType === "Appartement"} label="Appartement" onClick={() => setHabType("Appartement")} />
                      <SelectButton active={habType === "Maison"} label="Maison" onClick={() => setHabType("Maison")} />
                    </div>
                  </div>
                </div>
              )}

              {selectedInsuranceType === "emprunteur" && (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label className="text-slate-950 font-semibold">De quel projet s'agit-il ?</Label>
                    <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">
                      <SelectButton active={empProjet === "Nouveau prêt"} label="Nouveau prêt immobilier" onClick={() => setEmpProjet("Nouveau prêt")} />
                      <SelectButton active={empProjet === "Changement d'assurance (Loi Lemoine)"} label="Changer d'assurance (Loi Lemoine)" onClick={() => setEmpProjet("Changement d'assurance (Loi Lemoine)")} />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-slate-950 font-semibold">Quel est le montant du prêt ?</Label>
                    <div className="grid gap-3 grid-cols-1 sm:grid-cols-3">
                      <SelectButton active={empMontant === "Moins de 150 000 €"} label="< 150 000 €" onClick={() => setEmpMontant("Moins de 150 000 €")} />
                      <SelectButton active={empMontant === "De 150 000 € à 300 000 €"} label="150k - 300k €" onClick={() => setEmpMontant("De 150 000 € à 300 000 €")} />
                      <SelectButton active={empMontant === "Plus de 300 000 €"} label="> 300 000 €" onClick={() => setEmpMontant("Plus de 300 000 €")} />
                    </div>
                  </div>
                </div>
              )}

              {selectedInsuranceType === "chauffage" && (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label className="text-slate-950 font-semibold">Quel est votre type d'équipement ?</Label>
                    <div className="grid gap-3 grid-cols-2">
                      <SelectButton active={chauffType === "Chaudière Gaz/Fioul"} label="Chaudière" onClick={() => setChauffType("Chaudière Gaz/Fioul")} />
                      <SelectButton active={chauffType === "Pompe à Chaleur (PAC)"} label="Pompe à Chaleur" onClick={() => setChauffType("Pompe à Chaleur (PAC)")} />
                      <SelectButton active={chauffType === "Climatisation Réversible"} label="Climatisation" onClick={() => setChauffType("Climatisation Réversible")} />
                      <SelectButton active={chauffType === "Autre (Poêle, Solaire...)"} label="Autre" onClick={() => setChauffType("Autre (Poêle, Solaire...)")} />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-slate-950 font-semibold">Quel est votre besoin immédiat ?</Label>
                    <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">
                      <SelectButton active={chauffBesoin === "Souscrire un contrat d'entretien"} label="Contrat d'entretien annuel" onClick={() => setChauffBesoin("Souscrire un contrat d'entretien")} />
                      <SelectButton active={chauffBesoin === "Dépannage urgent / Réparation"} label="Dépannage / Réparation" onClick={() => setChauffBesoin("Dépannage urgent / Réparation")} />
                    </div>
                  </div>
                </div>
              )}


            </div>
          )}

          {step === 1 && (
            <div className="grid gap-5 animate-in fade-in slide-in-from-right-2 duration-300">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-slate-950">
                  Nom et prénom
                </Label>
                <Input
                  id="fullName"
                  {...register("fullName")}
                  placeholder="Votre nom complet"
                  className="min-h-12 border-slate-200 bg-white text-slate-950 hover:bg-slate-50 focus:border-sky-500 focus:ring-sky-500"
                />
                <ErrorText message={errors.fullName?.message} />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-slate-950">
                    Téléphone
                  </Label>
                  <Input
                    id="phone"
                    {...register("phone")}
                    placeholder="06 12 34 56 78"
                    className="min-h-12 border-slate-200 bg-white text-slate-950 hover:bg-slate-50 focus:border-sky-500 focus:ring-sky-500"
                  />
                  <ErrorText message={errors.phone?.message} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-950">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="vous@exemple.fr"
                    className="min-h-12 border-slate-200 bg-white text-slate-950 hover:bg-slate-50 focus:border-sky-500 focus:ring-sky-500"
                  />
                  <ErrorText message={errors.email?.message} />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="grid gap-5 animate-in fade-in slide-in-from-right-2 duration-300">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="postalCode" className="text-slate-950">
                    Code postal
                  </Label>
                  <Input
                    id="postalCode"
                    inputMode="numeric"
                    {...register("postalCode")}
                    placeholder="75008"
                    className="min-h-12 border-slate-200 bg-white text-slate-950 hover:bg-slate-50 focus:border-sky-500 focus:ring-sky-500"
                  />
                  <ErrorText message={errors.postalCode?.message} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="callbackPreference" className="text-slate-950">
                    Préférence de rappel
                  </Label>
                  <select
                    id="callbackPreference"
                    {...register("callbackPreference")}
                    className="min-h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition hover:bg-slate-50 focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                  >
                    {callbackOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <ErrorText message={errors.callbackPreference?.message} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-slate-950">
                  Besoin d'ajouter autre chose ? (Optionnel)
                </Label>
                <Textarea
                  id="message"
                  {...register("message")}
                  rows={3}
                  placeholder="Véhicule ciblé, pathologie particulière..."
                  className="border-slate-200 bg-white text-slate-950 hover:bg-slate-50 focus:border-sky-500 focus:ring-sky-500"
                />
                <ErrorText message={errors.message?.message} />
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="consent"
                    checked={consent}
                    onCheckedChange={(checked) => setValue("consent", Boolean(checked), { shouldTouch: true, shouldValidate: true })}
                    className="mt-1 border-slate-300 data-[state=checked]:bg-sky-500 flex-shrink-0"
                  />
                  <div className="space-y-2">
                    <Label htmlFor="consent" className="cursor-pointer text-sm leading-6 text-slate-600 font-normal">
                      J’accepte d’être recontacté par le cabinet afin de recevoir une étude personnalisée et des informations liées à ma demande.
                    </Label>
                    <ErrorText message={errors.consent?.message} />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-xs uppercase tracking-[0.22em] text-slate-400 font-semibold">
              Appelez le <span className="text-sky-700">{phoneDisplay}</span>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              {step > 0 && (
                <Button type="button" variant="outline" onClick={goBack} className="rounded-full border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900">
                  Retour
                </Button>
              )}
              {step < stepFields.length - 1 ? (
                <Button type="button" onClick={goNext} className="rounded-full bg-sky-700 px-6 text-white hover:bg-sky-800 shadow-md">
                  Continuer
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={submitLead.isPending}
                  className="rounded-full bg-emerald-600 px-6 text-white hover:bg-emerald-700 shadow-md"
                >
                  {submitLead.isPending ? "Envoi en cours..." : submitLabel}
                </Button>
              )}
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
