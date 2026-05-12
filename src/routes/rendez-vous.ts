import { Router } from "express";
import { db } from "../db.js";
import { rendezVousTable } from "../schema/index.js";
import { SubmitRendezVousBody } from "../validators.js";
import { sendRendezVousNotification } from "../email.js";

const router = Router();

router.post("/rendez-vous", async (req, res): Promise<void> => {
  const parsed = SubmitRendezVousBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [row] = await db.insert(rendezVousTable).values({
    name: parsed.data.name, email: parsed.data.email,
    business: parsed.data.business, website: parsed.data.website ?? null,
    notes: parsed.data.notes ?? null, day: parsed.data.day,
    slot: parsed.data.slot, meetingType: parsed.data.meetingType,
  }).returning();

  sendRendezVousNotification(parsed.data).catch(() => {});
  res.status(201).json({ id: row.id, createdAt: row.createdAt.toISOString() });
});

export default router;
