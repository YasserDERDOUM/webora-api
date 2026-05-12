import { Router } from "express";
import healthRouter from "./health.js";
import devisRouter from "./devis.js";
import rendezVousRouter from "./rendez-vous.js";

const router = Router();

router.use(healthRouter);
router.use(devisRouter);
router.use(rendezVousRouter);

export default router;
