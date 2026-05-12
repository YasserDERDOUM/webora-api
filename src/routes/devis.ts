import { Router } from "express";
import { db } from "../db.js";
import { devisRequestsTable } from "../schema/index.js";
import { SubmitDevisBody } from "../validators.js";
import { sendDevisNotification } from "../email.js";

const router = Router();

router.post("/devis", async (req, res): Promise<void> => {
  const parsed = SubmitDevisBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [row] = await db.insert(devisRequestsTable).values({
    plan: parsed.data.plan, type: parsed.data.type,
    name: parsed.data.name, business: parsed.data.business,
    email: parsed.data.email, phone: parsed.data.phone ?? null,
    city: parsed.data.city ?? null, website: parsed.data.website ?? null,
    budget: parsed.data.budget ?? null, deadline: parsed.data.deadline ?? null,
    message: parsed.data.message ?? null,
  }).returning();

  sendDevisNotification(parsed.data).catch(() => {});
  res.status(201).json({ id: row.id, createdAt: row.createdAt.toISOString() });
});

export default router;
