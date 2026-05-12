import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const rendezVousTable = pgTable("rendez_vous", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  business: text("business").notNull(),
  website: text("website"),
  notes: text("notes"),
  day: text("day").notNull(),
  slot: text("slot").notNull(),
  meetingType: text("meeting_type").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
