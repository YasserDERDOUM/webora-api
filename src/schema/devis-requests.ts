import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const devisRequestsTable = pgTable("devis_requests", {
  id: serial("id").primaryKey(),
  plan: text("plan").notNull(),
  type: text("type").notNull(),
  name: text("name").notNull(),
  business: text("business").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  city: text("city"),
  website: text("website"),
  budget: text("budget"),
  deadline: text("deadline"),
  message: text("message"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
