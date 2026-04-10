import { describe, expect, it } from "vitest";
import { leadFormSchema } from "./leads";

describe("leadFormSchema", () => {
  const validInput = {
    fullName: "Claire Martin",
    phone: "0612345678",
    email: "claire@example.fr",
    insuranceType: "auto" as const,
    profile: "Conductrice résiliée cherchant une solution rapide",
    postalCode: "75015",
    callbackPreference: "Le plus tôt possible",
    message: "Merci de me rappeler rapidement",
    consent: true,
    sourcePath: "/assurance-auto",
    sourceKind: "seo" as const,
    utmSource: "google",
    utmMedium: "organic",
    utmCampaign: "auto-seo",
    utmTerm: "assurance auto resilie",
    utmContent: "hero-form",
  };

  it("accepte un dossier complet et normalise les champs texte", () => {
    const parsed = leadFormSchema.parse({
      ...validInput,
      fullName: "  Claire Martin  ",
      message: "  Merci de me rappeler rapidement  ",
      utmSource: undefined,
    });

    expect(parsed.fullName).toBe("Claire Martin");
    expect(parsed.message).toBe("Merci de me rappeler rapidement");
    expect(parsed.utmSource).toBe("");
  });

  it("rejette un code postal invalide", () => {
    const result = leadFormSchema.safeParse({
      ...validInput,
      postalCode: "7501",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe("Veuillez indiquer un code postal à 5 chiffres.");
    }
  });

  it("rejette une soumission sans consentement", () => {
    const result = leadFormSchema.safeParse({
      ...validInput,
      consent: false,
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe("Veuillez accepter d’être recontacté.");
    }
  });
});
