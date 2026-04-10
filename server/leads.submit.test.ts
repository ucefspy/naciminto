import { beforeEach, describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";
import { createLead, markLeadOwnerEmailSent, markLeadOwnerNotified } from "./db";
import { notifyOwnerOfLead, sendLeadAlertEmail } from "./leadAlerts";

vi.mock("./db", () => ({
  createLead: vi.fn(),
  markLeadOwnerNotified: vi.fn(),
  markLeadOwnerEmailSent: vi.fn(),
}));

vi.mock("./leadAlerts", () => ({
  notifyOwnerOfLead: vi.fn(),
  sendLeadAlertEmail: vi.fn(),
}));

const createLeadMock = vi.mocked(createLead);
const markLeadOwnerNotifiedMock = vi.mocked(markLeadOwnerNotified);
const markLeadOwnerEmailSentMock = vi.mocked(markLeadOwnerEmailSent);
const notifyOwnerOfLeadMock = vi.mocked(notifyOwnerOfLead);
const sendLeadAlertEmailMock = vi.mocked(sendLeadAlertEmail);

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => undefined,
    } as TrpcContext["res"],
  };
}

function buildLeadRecord() {
  const now = new Date("2026-04-10T12:00:00.000Z");

  return {
    id: 42,
    fullName: "Claire Martin",
    phone: "0612345678",
    email: "claire@example.fr",
    insuranceType: "auto" as const,
    profile: "Conductrice résiliée cherchant un nouveau contrat",
    postalCode: "75015",
    callbackPreference: "Le plus tôt possible",
    message: "Besoin d'un contrat rapidement",
    sourcePath: "/devis/auto",
    sourceKind: "ads_form" as const,
    utmSource: "google",
    utmMedium: "cpc",
    utmCampaign: "auto-paris",
    utmTerm: "assurance auto resilie",
    utmContent: "annonce-a",
    status: "new" as const,
    ownerNotifiedAt: null,
    ownerEmailSentAt: null,
    createdAt: now,
    updatedAt: now,
  };
}

const validInput = {
  fullName: "Claire Martin",
  phone: "0612345678",
  email: "claire@example.fr",
  insuranceType: "auto" as const,
  profile: "Conductrice résiliée cherchant un nouveau contrat",
  postalCode: "75015",
  callbackPreference: "Le plus tôt possible",
  message: "Besoin d'un contrat rapidement",
  consent: true,
  sourcePath: "/devis/auto",
  sourceKind: "ads_form" as const,
  utmSource: "google",
  utmMedium: "cpc",
  utmCampaign: "auto-paris",
  utmTerm: "assurance auto resilie",
  utmContent: "annonce-a",
};

describe("leads.submit", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("enregistre le lead et confirme la notification propriétaire et l'email envoyé", async () => {
    const lead = buildLeadRecord();
    createLeadMock.mockResolvedValue(lead);
    notifyOwnerOfLeadMock.mockResolvedValue(true);
    sendLeadAlertEmailMock.mockResolvedValue({ sent: true, skipped: false });

    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.leads.submit(validInput);

    expect(createLeadMock).toHaveBeenCalledWith({
      fullName: "Claire Martin",
      phone: "0612345678",
      email: "claire@example.fr",
      insuranceType: "auto",
      profile: "Conductrice résiliée cherchant un nouveau contrat",
      postalCode: "75015",
      callbackPreference: "Le plus tôt possible",
      message: "Besoin d'un contrat rapidement",
      sourcePath: "/devis/auto",
      sourceKind: "ads_form",
      utmSource: "google",
      utmMedium: "cpc",
      utmCampaign: "auto-paris",
      utmTerm: "assurance auto resilie",
      utmContent: "annonce-a",
    });
    expect(notifyOwnerOfLeadMock).toHaveBeenCalledWith(lead);
    expect(markLeadOwnerNotifiedMock).toHaveBeenCalledWith(42);
    expect(sendLeadAlertEmailMock).toHaveBeenCalledWith(lead);
    expect(markLeadOwnerEmailSentMock).toHaveBeenCalledWith(42);
    expect(result).toEqual({
      success: true,
      leadId: 42,
      ownerNotified: true,
      ownerEmailSent: true,
      ownerEmailSkipped: false,
    });
  });

  it("retourne un succès même si l'email propriétaire est volontairement ignoré faute de configuration", async () => {
    const lead = buildLeadRecord();
    createLeadMock.mockResolvedValue(lead);
    notifyOwnerOfLeadMock.mockResolvedValue(false);
    sendLeadAlertEmailMock.mockResolvedValue({ sent: false, skipped: true });

    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.leads.submit({
      ...validInput,
      message: "",
      utmSource: "",
      utmMedium: "",
      utmCampaign: "",
      utmTerm: "",
      utmContent: "",
    });

    expect(createLeadMock).toHaveBeenCalledWith({
      fullName: "Claire Martin",
      phone: "0612345678",
      email: "claire@example.fr",
      insuranceType: "auto",
      profile: "Conductrice résiliée cherchant un nouveau contrat",
      postalCode: "75015",
      callbackPreference: "Le plus tôt possible",
      message: null,
      sourcePath: "/devis/auto",
      sourceKind: "ads_form",
      utmSource: null,
      utmMedium: null,
      utmCampaign: null,
      utmTerm: null,
      utmContent: null,
    });
    expect(markLeadOwnerNotifiedMock).not.toHaveBeenCalled();
    expect(markLeadOwnerEmailSentMock).not.toHaveBeenCalled();
    expect(result).toEqual({
      success: true,
      leadId: 42,
      ownerNotified: false,
      ownerEmailSent: false,
      ownerEmailSkipped: true,
    });
  });
});
