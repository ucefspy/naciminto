import {
  int,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";
import { insuranceTypes, leadSourceKinds, leadStatuses } from "../shared/leads";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export const leads = mysqlTable("leads", {
  id: int("id").autoincrement().primaryKey(),
  fullName: varchar("fullName", { length: 160 }).notNull(),
  phone: varchar("phone", { length: 30 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  insuranceType: mysqlEnum("insuranceType", [...insuranceTypes]).notNull(),
  profile: varchar("profile", { length: 160 }).notNull(),
  postalCode: varchar("postalCode", { length: 10 }).notNull(),
  callbackPreference: varchar("callbackPreference", { length: 120 }).notNull(),
  message: text("message"),
  sourcePath: varchar("sourcePath", { length: 255 }).notNull(),
  sourceKind: mysqlEnum("sourceKind", [...leadSourceKinds]).notNull(),
  utmSource: varchar("utmSource", { length: 120 }),
  utmMedium: varchar("utmMedium", { length: 120 }),
  utmCampaign: varchar("utmCampaign", { length: 160 }),
  utmTerm: varchar("utmTerm", { length: 160 }),
  utmContent: varchar("utmContent", { length: 160 }),
  status: mysqlEnum("status", [...leadStatuses]).default("new").notNull(),
  ownerNotifiedAt: timestamp("ownerNotifiedAt"),
  ownerEmailSentAt: timestamp("ownerEmailSentAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type Lead = typeof leads.$inferSelect;
export type InsertLead = typeof leads.$inferInsert;
