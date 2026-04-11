import axios from "axios";
import type { Lead } from "../drizzle/schema";

export async function processNewLeadWebhook(lead: Lead) {
  // 1. Calcul du Score de Priorité
  // On vérifie si le profil contient 'malussé' ou 'résilié'
  const isHighPriority = ["malussé", "résilié", "malusse", "resilie"].some((profil) =>
    lead.profile?.toLowerCase().includes(profil)
  );
  const priorityScore = isHighPriority ? "🔥 Haute" : "Normale";

  // 2. Séparation Nom / Prénom
  const nameParts = lead.fullName.trim().split(" ");
  const firstName = nameParts[0] || "";
  const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";

  // 3. Préparation du Payload pour Google Sheets / Make / Zapier
  const payload = {
    Date: new Date().toISOString(),
    Nom: lastName,
    Prenom: firstName,
    Email: lead.email,
    Telephone: lead.phone,
    TypeAssurance: lead.insuranceType,
    Profil: lead.profile || "Standard",
    Formule: "Non précisée", // Géré par le commercial
    ScorePriorite: priorityScore,
  };

  try {
    const WEBHOOK_URL = process.env.MAKE_WEBHOOK_URL;
    if (!WEBHOOK_URL) {
      console.log("[Webhook] Aucun MAKE_WEBHOOK_URL configuré. Données non envoyées.");
      return;
    }

    // 4. Envoi au Webhook (vers Make.com / Zapier / Google Sheets)
    await axios.post(WEBHOOK_URL, payload);
    console.log(`[Webhook] Lead envoyé avec succès au webhook : ${lead.email}`);

    // Si on veut notifier Slack directement, on peut le faire ici si l'URL Slack est présente.
    const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;
    if (SLACK_WEBHOOK_URL && isHighPriority) {
      await axios.post(SLACK_WEBHOOK_URL, {
        text: `🚨 *NOUVEAU LEAD CHAUD* : ${firstName} ${lastName} (${lead.insuranceType})\n*Profil:* ${lead.profile || "N/A"}\n📞 ${lead.phone}\n> Email: ${lead.email}`
      });
      console.log(`[Webhook] Alerte Slack envoyée pour lead prioritaire : ${lead.email}`);
    }

  } catch (error) {
    // On ne fait qu'un log pour ne pas bloquer l'expérience utilisateur
    console.error(`[Webhook] Erreur lors de l'envoi du webhook pour ${lead.email}:`, error);
  }
}
