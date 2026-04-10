import { z } from "zod";

export const insuranceTypes = ["auto", "sante", "prevoyance"] as const;
export type InsuranceType = (typeof insuranceTypes)[number];

export const insuranceTypeLabels: Record<InsuranceType, string> = {
  auto: "Assurance auto",
  sante: "Mutuelle santé",
  prevoyance: "Prévoyance",
};

export const leadStatuses = ["new", "contacted", "qualified", "closed"] as const;
export type LeadStatus = (typeof leadStatuses)[number];

export const leadSourceKinds = ["seo", "ads_form", "ads_call", "contact", "homepage"] as const;
export type LeadSourceKind = (typeof leadSourceKinds)[number];

export const leadFormSchema = z.object({
  fullName: z.string().trim().min(2, "Veuillez indiquer votre nom complet."),
  phone: z
    .string()
    .trim()
    .min(10, "Veuillez indiquer un numéro de téléphone valide.")
    .max(20, "Veuillez indiquer un numéro de téléphone valide."),
  email: z.string().trim().email("Veuillez indiquer un email valide."),
  insuranceType: z.enum(insuranceTypes, {
    message: "Veuillez sélectionner un type d’assurance.",
  }),
  profile: z.string().trim().min(2, "Veuillez préciser votre situation."),
  postalCode: z
    .string()
    .trim()
    .regex(/^\d{5}$/, "Veuillez indiquer un code postal à 5 chiffres."),
  callbackPreference: z.string().trim().min(2, "Veuillez préciser votre préférence de rappel."),
  message: z.string().trim().max(600, "Votre message est trop long.").optional().default(""),
  consent: z.boolean().refine((value) => value === true, {
    message: "Veuillez accepter d’être recontacté.",
  }),
  sourcePath: z.string().trim().min(1),
  sourceKind: z.enum(leadSourceKinds),
  utmSource: z.string().trim().optional().default(""),
  utmMedium: z.string().trim().optional().default(""),
  utmCampaign: z.string().trim().optional().default(""),
  utmTerm: z.string().trim().optional().default(""),
  utmContent: z.string().trim().optional().default(""),
});

export type LeadFormInput = z.infer<typeof leadFormSchema>;
