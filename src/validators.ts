import { z } from "zod";

export const SubmitDevisBody = z.object({
  plan: z.string(),
  type: z.string(),
  name: z.string(),
  business: z.string(),
  email: z.string(),
  phone: z.string().nullish(),
  city: z.string().nullish(),
  website: z.string().nullish(),
  budget: z.string().nullish(),
  deadline: z.string().nullish(),
  message: z.string().nullish(),
});

export const SubmitRendezVousBody = z.object({
  name: z.string(),
  email: z.string(),
  business: z.string(),
  website: z.string().nullish(),
  notes: z.string().nullish(),
  day: z.string(),
  slot: z.string(),
  meetingType: z.string(),
});
