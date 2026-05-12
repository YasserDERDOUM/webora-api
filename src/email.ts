import { Resend } from "resend";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

const ADMIN_EMAIL = process.env.WEBORA_ADMIN_EMAIL ?? "contact@webora.fr";
const FROM_EMAIL = process.env.WEBORA_FROM_EMAIL ?? "Webora <onboarding@resend.dev>";

export async function sendDevisNotification(data: {
  name: string; email: string; business: string; plan: string; type: string;
  phone?: string | null; city?: string | null; website?: string | null;
  budget?: string | null; deadline?: string | null; message?: string | null;
}) {
  const resend = getResend();
  if (!resend) return;

  const planLabel = { starter: "Starter", pro: "Pro", elite: "Elite" }[data.plan] ?? data.plan;
  const typeLabel = { restaurant: "Restaurant", cafe: "Café", commerce: "Commerce local", autre: "Autre" }[data.type] ?? data.type;

  await resend.emails.send({
    from: FROM_EMAIL, to: ADMIN_EMAIL,
    subject: `[Webora] Nouveau devis — ${data.business} (${planLabel})`,
    html: `<h2 style="color:#F97316">Nouveau devis reçu</h2>
      <table style="border-collapse:collapse;width:100%;font-family:sans-serif;font-size:14px">
        <tr><td style="padding:6px 12px;color:#666;width:140px">Nom</td><td style="padding:6px 12px"><strong>${data.name}</strong></td></tr>
        <tr style="background:#f9f9f9"><td style="padding:6px 12px;color:#666">Email</td><td style="padding:6px 12px"><a href="mailto:${data.email}">${data.email}</a></td></tr>
        <tr><td style="padding:6px 12px;color:#666">Entreprise</td><td style="padding:6px 12px">${data.business}</td></tr>
        <tr style="background:#f9f9f9"><td style="padding:6px 12px;color:#666">Type</td><td style="padding:6px 12px">${typeLabel}</td></tr>
        <tr><td style="padding:6px 12px;color:#666">Plan</td><td style="padding:6px 12px"><strong>${planLabel}</strong></td></tr>
        ${data.phone ? `<tr style="background:#f9f9f9"><td style="padding:6px 12px;color:#666">Téléphone</td><td style="padding:6px 12px">${data.phone}</td></tr>` : ""}
        ${data.city ? `<tr><td style="padding:6px 12px;color:#666">Ville</td><td style="padding:6px 12px">${data.city}</td></tr>` : ""}
        ${data.website ? `<tr style="background:#f9f9f9"><td style="padding:6px 12px;color:#666">Site actuel</td><td style="padding:6px 12px">${data.website}</td></tr>` : ""}
        ${data.budget ? `<tr><td style="padding:6px 12px;color:#666">Budget</td><td style="padding:6px 12px">${data.budget}</td></tr>` : ""}
        ${data.deadline ? `<tr style="background:#f9f9f9"><td style="padding:6px 12px;color:#666">Délai</td><td style="padding:6px 12px">${data.deadline}</td></tr>` : ""}
        ${data.message ? `<tr><td style="padding:6px 12px;color:#666;vertical-align:top">Message</td><td style="padding:6px 12px">${data.message}</td></tr>` : ""}
      </table>`,
  });

  await resend.emails.send({
    from: FROM_EMAIL, to: data.email,
    subject: `Votre demande de devis Webora a bien été reçue`,
    html: `<h2 style="color:#F97316">Merci ${data.name} !</h2>
      <p style="font-family:sans-serif;font-size:15px;color:#333">
        Nous avons bien reçu votre demande de devis pour <strong>${data.business}</strong> (plan <strong>${planLabel}</strong>).<br><br>
        Notre équipe vous répondra <strong>sous 15 minutes</strong> en moyenne.<br><br>
        À très vite,<br><strong>L'équipe Webora</strong>
      </p>`,
  });
}

export async function sendRendezVousNotification(data: {
  name: string; email: string; business: string; day: string; slot: string;
  meetingType: string; website?: string | null; notes?: string | null;
}) {
  const resend = getResend();
  if (!resend) return;

  const meetingLabel = data.meetingType === "visio" ? "Visioconférence" : "Appel téléphonique";
  const dayLabel: Record<string, string> = { lun: "Lundi", mar: "Mardi", mer: "Mercredi", jeu: "Jeudi", ven: "Vendredi" };

  await resend.emails.send({
    from: FROM_EMAIL, to: ADMIN_EMAIL,
    subject: `[Webora] Nouveau rendez-vous — ${data.business} (${dayLabel[data.day] ?? data.day} ${data.slot})`,
    html: `<h2 style="color:#F97316">Nouveau rendez-vous réservé</h2>
      <table style="border-collapse:collapse;width:100%;font-family:sans-serif;font-size:14px">
        <tr><td style="padding:6px 12px;color:#666;width:140px">Nom</td><td style="padding:6px 12px"><strong>${data.name}</strong></td></tr>
        <tr style="background:#f9f9f9"><td style="padding:6px 12px;color:#666">Email</td><td style="padding:6px 12px"><a href="mailto:${data.email}">${data.email}</a></td></tr>
        <tr><td style="padding:6px 12px;color:#666">Entreprise</td><td style="padding:6px 12px">${data.business}</td></tr>
        <tr style="background:#f9f9f9"><td style="padding:6px 12px;color:#666">Jour</td><td style="padding:6px 12px">${dayLabel[data.day] ?? data.day}</td></tr>
        <tr><td style="padding:6px 12px;color:#666">Créneau</td><td style="padding:6px 12px"><strong>${data.slot}</strong></td></tr>
        <tr style="background:#f9f9f9"><td style="padding:6px 12px;color:#666">Type</td><td style="padding:6px 12px">${meetingLabel}</td></tr>
        ${data.website ? `<tr><td style="padding:6px 12px;color:#666">Site actuel</td><td style="padding:6px 12px">${data.website}</td></tr>` : ""}
        ${data.notes ? `<tr style="background:#f9f9f9"><td style="padding:6px 12px;color:#666;vertical-align:top">Notes</td><td style="padding:6px 12px">${data.notes}</td></tr>` : ""}
      </table>`,
  });

  await resend.emails.send({
    from: FROM_EMAIL, to: data.email,
    subject: `Votre rendez-vous Webora est confirmé — ${dayLabel[data.day] ?? data.day} à ${data.slot}`,
    html: `<h2 style="color:#F97316">Rendez-vous confirmé !</h2>
      <p style="font-family:sans-serif;font-size:15px;color:#333">
        Bonjour ${data.name},<br><br>
        Votre rendez-vous est bien enregistré :<br><br>
        📅 <strong>${dayLabel[data.day] ?? data.day} à ${data.slot}</strong><br>
        📞 <strong>${meetingLabel}</strong><br><br>
        Vous recevrez le lien de connexion (ou un appel) à l'heure prévue.<br><br>
        À bientôt,<br><strong>L'équipe Webora</strong>
      </p>`,
  });
}
