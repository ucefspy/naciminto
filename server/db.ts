import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertLead, InsertUser, leads, users } from "../drizzle/schema";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = "admin";
      updateSet.role = "admin";
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function createLead(lead: InsertLead) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Base de données indisponible, on bypass la sauvegarde SQL (seul le webhook et l'email partiront).");
    return { ...lead, id: Math.floor(Math.random() * 1000000) };
  }

  const insertedRows = await db.insert(leads).values(lead).$returningId();
  const insertId = Number(insertedRows[0]?.id ?? 0);

  if (!insertId) {
    throw new Error("Lead insert did not return an identifier");
  }

  const rows = await db.select().from(leads).where(eq(leads.id, insertId)).limit(1);
  const createdLead = rows[0];

  if (!createdLead) {
    throw new Error("Lead inserted but could not be reloaded");
  }

  return createdLead;
}

export async function markLeadOwnerNotified(leadId: number, notifiedAt = new Date()) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Base de données indisponible, on bypass le marqueur ownerNotified.");
    return;
  }

  await db.update(leads).set({ ownerNotifiedAt: notifiedAt }).where(eq(leads.id, leadId));
}

export async function markLeadOwnerEmailSent(leadId: number, sentAt = new Date()) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Base de données indisponible, on bypass le marqueur ownerEmailSent.");
    return;
  }

  await db.update(leads).set({ ownerEmailSentAt: sentAt }).where(eq(leads.id, leadId));
}
