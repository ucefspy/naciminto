import { TRPCError } from "@trpc/server";
import { COOKIE_NAME } from "@shared/const";
import { leadFormSchema } from "../shared/leads";
import { createLead, markLeadOwnerEmailSent, markLeadOwnerNotified } from "./db";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { notifyOwnerOfLead, sendLeadAlertEmail } from "./leadAlerts";

export const appRouter = router({
  // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),
  leads: router({
    submit: publicProcedure.input(leadFormSchema).mutation(async ({ input }) => {
      try {
        const lead = await createLead({
          fullName: input.fullName,
          phone: input.phone,
          email: input.email,
          insuranceType: input.insuranceType,
          profile: input.profile,
          postalCode: input.postalCode,
          callbackPreference: input.callbackPreference,
          message: input.message || null,
          sourcePath: input.sourcePath,
          sourceKind: input.sourceKind,
          utmSource: input.utmSource || null,
          utmMedium: input.utmMedium || null,
          utmCampaign: input.utmCampaign || null,
          utmTerm: input.utmTerm || null,
          utmContent: input.utmContent || null,
        });

        const ownerNotified = await notifyOwnerOfLead(lead);
        if (ownerNotified) {
          await markLeadOwnerNotified(lead.id);
        }

        let ownerEmailSent = false;
        let ownerEmailSkipped = false;
        try {
          const emailResult = await sendLeadAlertEmail(lead);
          ownerEmailSent = emailResult.sent;
          ownerEmailSkipped = emailResult.skipped;
          if (ownerEmailSent) {
            await markLeadOwnerEmailSent(lead.id);
          }
        } catch (error) {
          console.warn("[Lead Alert Email] Failed to send owner email:", error);
        }

        return {
          success: true,
          leadId: lead.id,
          ownerNotified,
          ownerEmailSent,
          ownerEmailSkipped,
        } as const;
      } catch (error) {
        console.error("[Lead Submission] Failed to create lead:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Votre demande n’a pas pu être enregistrée pour le moment. Veuillez réessayer.",
        });
      }
    }),
  }),
});

export type AppRouter = typeof appRouter;
