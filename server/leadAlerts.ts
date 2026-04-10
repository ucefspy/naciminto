import { TRPCError } from "@trpc/server";
import { insuranceTypeLabels, type InsuranceType } from "../shared/leads";
import type { Lead } from "../drizzle/schema";
import { ENV } from "./_core/env";
import { notifyOwner } from "./_core/notification";

const RESEND_API_URL = "https://api.resend.com/emails";

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatInsuranceType(type: InsuranceType): string {
  return insuranceTypeLabels[type] ?? type;
}

function normalizeText(value: string | null | undefined): string {
  return value?.trim() ? value.trim() : "Non renseigné";
}

function buildLeadSummary(lead: Lead): string {
  return [
    `Lead #${lead.id}`,
    `Produit : ${formatInsuranceType(lead.insuranceType)}`,
    `Nom : ${lead.fullName}`,
    `Téléphone : ${lead.phone}`,
    `Email : ${lead.email}`,
    `Profil : ${lead.profile}`,
    `Code postal : ${lead.postalCode}`,
    `Préférence de rappel : ${lead.callbackPreference}`,
    `Origine : ${lead.sourceKind} (${lead.sourcePath})`,
    `UTM : source=${normalizeText(lead.utmSource)} | medium=${normalizeText(lead.utmMedium)} | campaign=${normalizeText(lead.utmCampaign)}`,
    `Message : ${normalizeText(lead.message)}`,
  ].join("\n");
}

function buildLeadEmailHtml(lead: Lead): string {
  const rows = [
    ["Produit", formatInsuranceType(lead.insuranceType)],
    ["Nom", lead.fullName],
    ["Téléphone", lead.phone],
    ["Email", lead.email],
    ["Profil", lead.profile],
    ["Code postal", lead.postalCode],
    ["Préférence de rappel", lead.callbackPreference],
    ["Origine", `${lead.sourceKind} — ${lead.sourcePath}`],
    ["UTM source", normalizeText(lead.utmSource)],
    ["UTM medium", normalizeText(lead.utmMedium)],
    ["UTM campaign", normalizeText(lead.utmCampaign)],
    ["UTM term", normalizeText(lead.utmTerm)],
    ["UTM content", normalizeText(lead.utmContent)],
    ["Message", normalizeText(lead.message)],
  ];

  const tableRows = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:12px 14px;border-bottom:1px solid #e5e7eb;font-weight:600;color:#0f172a;width:220px;vertical-align:top;">${escapeHtml(label)}</td>
          <td style="padding:12px 14px;border-bottom:1px solid #e5e7eb;color:#1e293b;">${escapeHtml(value)}</td>
        </tr>`
    )
    .join("");

  return `
    <div style="background:#f8fafc;padding:32px;font-family:Inter,Arial,sans-serif;color:#0f172a;">
      <div style="max-width:720px;margin:0 auto;background:#ffffff;border-radius:24px;overflow:hidden;border:1px solid #e2e8f0;box-shadow:0 18px 45px rgba(15,23,42,0.08);">
        <div style="padding:28px 32px;background:linear-gradient(135deg,#0e3a68,#1f6feb);color:white;">
          <p style="margin:0 0 8px 0;font-size:13px;letter-spacing:0.18em;text-transform:uppercase;opacity:0.85;">Nouveau lead assurance</p>
          <h1 style="margin:0;font-size:28px;line-height:1.2;">Demande de devis ${escapeHtml(formatInsuranceType(lead.insuranceType))}</h1>
        </div>
        <div style="padding:28px 32px;">
          <p style="margin:0 0 18px 0;font-size:16px;line-height:1.7;">Un nouveau prospect vient de soumettre une demande de devis sur le site. Retrouvez ci-dessous l’ensemble des informations transmises.</p>
          <table style="width:100%;border-collapse:collapse;border:1px solid #e2e8f0;border-radius:18px;overflow:hidden;">
            <tbody>${tableRows}
            </tbody>
          </table>
        </div>
      </div>
    </div>`;
}

export async function notifyOwnerOfLead(lead: Lead): Promise<boolean> {
  return notifyOwner({
    title: `Nouveau lead ${formatInsuranceType(lead.insuranceType)} — ${lead.fullName}`,
    content: buildLeadSummary(lead),
  });
}

export async function sendLeadAlertEmail(lead: Lead): Promise<{ sent: boolean; skipped: boolean }> {
  const apiKey = ENV.resendApiKey;
  const from = ENV.leadAlertFromEmail;
  const to = ENV.leadAlertToEmail;

  if (!apiKey || !from || !to) {
    return { sent: false, skipped: true };
  }

  const response = await fetch(RESEND_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `Nouveau lead ${formatInsuranceType(lead.insuranceType)} — ${lead.fullName}`,
      html: buildLeadEmailHtml(lead),
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: `Lead alert email could not be sent.${detail ? ` ${detail}` : ""}`,
    });
  }

  return { sent: true, skipped: false };
}
