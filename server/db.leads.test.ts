import { beforeEach, describe, expect, it, vi } from "vitest";

const drizzleMock = vi.fn();

vi.mock("drizzle-orm/mysql2", () => ({
  drizzle: drizzleMock,
}));

vi.mock("./_core/env", () => ({
  ENV: {
    ownerOpenId: "owner-test",
  },
}));

describe("createLead", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    process.env.DATABASE_URL = "mysql://test:test@localhost:3306/test";
  });

  it("utilise l'identifiant renvoyé par $returningId pour recharger le lead créé", async () => {
    const insertedLead = {
      id: 77,
      fullName: "Test Fix About Page",
      phone: "0612345678",
      email: "test-fix@example.com",
      insuranceType: "auto",
      profile: "Profil test correctif",
      postalCode: "21000",
      callbackPreference: "En soirée",
      message: "Validation post-correctif",
      sourcePath: "/a-propos",
      sourceKind: "seo",
      utmSource: null,
      utmMedium: null,
      utmCampaign: null,
      utmTerm: null,
      utmContent: null,
      status: "new",
      ownerNotifiedAt: null,
      ownerEmailSentAt: null,
      createdAt: new Date("2026-04-10T12:00:00.000Z"),
      updatedAt: new Date("2026-04-10T12:00:00.000Z"),
    };

    const returningIdMock = vi.fn().mockResolvedValue([{ id: 77 }]);
    const valuesMock = vi.fn(() => ({ $returningId: returningIdMock }));
    const insertMock = vi.fn(() => ({ values: valuesMock }));
    const limitMock = vi.fn().mockResolvedValue([insertedLead]);
    const whereMock = vi.fn(() => ({ limit: limitMock }));
    const fromMock = vi.fn(() => ({ where: whereMock }));
    const selectMock = vi.fn(() => ({ from: fromMock }));

    drizzleMock.mockReturnValue({
      insert: insertMock,
      select: selectMock,
    });

    const { createLead } = await import("./db");

    const payload = {
      fullName: "Test Fix About Page",
      phone: "0612345678",
      email: "test-fix@example.com",
      insuranceType: "auto" as const,
      profile: "Profil test correctif",
      postalCode: "21000",
      callbackPreference: "En soirée",
      message: "Validation post-correctif",
      sourcePath: "/a-propos",
      sourceKind: "seo" as const,
      utmSource: null,
      utmMedium: null,
      utmCampaign: null,
      utmTerm: null,
      utmContent: null,
    };

    const result = await createLead(payload);

    expect(insertMock).toHaveBeenCalledTimes(1);
    expect(valuesMock).toHaveBeenCalledWith(payload);
    expect(returningIdMock).toHaveBeenCalledTimes(1);
    expect(selectMock).toHaveBeenCalledTimes(1);
    expect(limitMock).toHaveBeenCalledWith(1);
    expect(result).toEqual(insertedLead);
  });
});
