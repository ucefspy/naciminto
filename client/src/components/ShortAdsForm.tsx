import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { insuranceTypes, leadFormSchema, type LeadFormInput, type InsuranceType } from "../../../shared/leads";

// Short schema explicitly for the UI fields
const shortSchema = z.object({
  fullName: z.string().trim().min(2, "Votre nom est requis"),
  phone: z.string().trim().min(10, "Numéro valide requis (ex: 06...)"),
  insuranceType: z.enum(insuranceTypes, { required_error: "Sélection obligatoire" }),
  consent: z.literal(true, { errorMap: () => ({ message: "Le consentement est obligatoire" }) })
});

export default function ShortAdsForm({ sourcePath }: { sourcePath: string }) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const submitLead = trpc.leads.submit.useMutation();

  const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting } } = useForm<z.infer<typeof shortSchema>>({
    resolver: zodResolver(shortSchema),
    defaultValues: { fullName: "", phone: "", consent: true as true },
  });

  const selectedType = watch("insuranceType");

  const onSubmit = async (data: z.infer<typeof shortSchema>) => {
    // Transformer les données au format attendu par la bdd (bouchonnage des champs requis inutiles)
    const payload: LeadFormInput = {
      ...data,
      email: "express@lead.ad",
      profile: `Ads Lead Express: ${data.insuranceType}`,
      postalCode: "00000",
      callbackPreference: "Le plus tôt possible",
      message: "Lead généré depuis Google Ads (Landing Page CRO)",
      sourceKind: "ads_form",
      sourcePath,
      utmSource: "google",
      utmMedium: "cpc",
    };

    try {
      await submitLead.mutateAsync(payload);
      toast.success("Demande prioritaire envoyée !");
      setIsSubmitted(true);
    } catch (err: any) {
      toast.error(err.message || "Erreur lors de l'envoi");
    }
  };

  if (isSubmitted) {
    return (
      <div className="flex min-h-[300px] flex-col items-center justify-center rounded-3xl bg-emerald-50 p-6 text-center border border-emerald-100">
        <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <svg className="size-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-display text-2xl font-bold text-emerald-900">Demande validée !</h3>
        <p className="mt-2 text-emerald-700">
          Un conseiller vous rappelle immédiatement (en moins de 2 minutes).
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 rounded-[2rem] bg-white p-6 shadow-xl border border-slate-200">
      <div className="mb-2">
        <h2 className="font-display text-xl font-bold text-slate-900">Obtenir mon devis gratuit</h2>
        <p className="text-sm font-medium text-emerald-600">⚡ Réponse immédiate</p>
      </div>

      <div className="space-y-4">
        {/* Type de besoin */}
        <div className="space-y-2">
          <Label>Type d'assurance recherchée</Label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: "auto", label: "Auto" },
              { id: "sante", label: "Santé" },
              { id: "prevoyance", label: "Prévoyance" }
            ].map(type => (
              <button
                key={type.id}
                type="button"
                onClick={() => setValue("insuranceType", type.id as InsuranceType)}
                className={`rounded-xl border p-3 text-sm font-semibold transition ${
                  selectedType === type.id
                  ? "border-sky-600 bg-sky-50 text-sky-700"
                  : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
          {errors.insuranceType && <p className="text-xs text-rose-500">{errors.insuranceType.message}</p>}
        </div>

        <div>
          <Label htmlFor="fullName">Nom & Prénom</Label>
          <Input id="fullName" placeholder="Ex: Jean Dupont" className="mt-1 bg-slate-50" {...register("fullName")} />
          {errors.fullName && <p className="text-xs text-rose-500">{errors.fullName.message}</p>}
        </div>

        <div>
          <Label htmlFor="phone">Numéro de téléphone</Label>
          <Input id="phone" type="tel" placeholder="06 XX XX XX XX" className="mt-1 bg-slate-50" {...register("phone")} />
          {errors.phone && <p className="text-xs text-rose-500">{errors.phone.message}</p>}
        </div>

        <div className="flex items-start gap-3 rounded-lg border border-slate-100 bg-slate-50 p-3">
          <Checkbox
            id="consent"
            checked={watch("consent")}
            onCheckedChange={(c) => setValue("consent", c === true)}
            className="mt-0.5"
          />
          <Label htmlFor="consent" className="text-xs font-medium leading-relaxed text-slate-500 cursor-pointer">
            J'accepte d'être recontacté gratuitement par LTA Courtage pour traiter ma demande. Mes données sont sécurisées (RGPD).
          </Label>
        </div>
        {errors.consent && <p className="text-xs text-rose-500">{errors.consent.message}</p>}

        <Button
          type="submit"
          className="w-full h-14 rounded-2xl bg-sky-600 text-lg font-bold shadow hover:bg-sky-700"
          disabled={isSubmitting || submitLead.isPending}
        >
          {(isSubmitting || submitLead.isPending) ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            "Obtenir mon devis gratuit"
          )}
        </Button>
      </div>
    </form>
  );
}
