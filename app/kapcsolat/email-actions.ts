"use server";

import * as z from "zod";
import { Resend } from "resend";

import { db } from "@/lib/db";
import { contactForm } from "@/lib/db/schema";

const resend = new Resend(process.env.RESEND_API_KEY);

const FormSchema = z.object({
  name: z.string().min(5, "A névnek legalább 5 karakter hosszúnak kell lennie"),
  email: z.string().email("Érvénytelen e-mail cím"),
  tel: z.string().min(1, "A telefonszám megadása kötelező"),
  message: z
    .string()
    .min(10, "Az üzenetnek legalább 10 karakter hosszúnak kell lennie"),
});

// Email színei
const ACCENT = "#c2410c";
const TEXT = "#1f1f1f";
const MUTED = "#6b6b6b";
const LINE = "#e5e2dc";
const BG = "#f3f1ed";

const today = () =>
  new Intl.DateTimeFormat("hu-HU", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Europe/Budapest",
  }).format(new Date());

const esc = (s: string) =>
  s.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ]!,
  );

const label = (text: string) =>
  `<p style="margin:0 0 6px;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:${MUTED}">${text}</p>`;

type Contact = { name: string; email: string; tel: string; message: string };

const contactHtml = (c: Contact) => `
<table width="100%" cellpadding="0" cellspacing="0" bgcolor="${BG}" style="background:${BG};padding:32px 12px">
  <tr><td>
    <table width="100%" cellpadding="0" cellspacing="0" bgcolor="#ffffff" style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:10px;font-family:Helvetica,Arial,sans-serif;color:${TEXT}">

      <!-- Fejléc -->
      <tr>
        <td style="padding:28px 28px 0">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="vertical-align:top">
                <p style="margin:0;font-size:17px;font-weight:900;line-height:1.2">Bádogos weboldal</p>
                <p style="margin:2px 0 0;font-size:13px;color:${MUTED}">kapcsolatfelvételi űrlap</p>
              </td>
              <td style="vertical-align:top;text-align:right">
                <p style="margin:0;font-size:15px;font-weight:800">Új érdeklődő</p>
                <p style="margin:2px 0 0;font-size:13px;color:${MUTED}">${today()}</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Név -->
      <tr>
        <td style="padding:28px 28px 8px">
          <h1 style="margin:0;font-size:24px;font-weight:900;line-height:1.2">${esc(c.name)}</h1>
          <div style="width:48px;height:4px;background:${ACCENT};margin:14px 0 0"></div>
        </td>
      </tr>

      <!-- Elérhetőségek -->
      <tr>
        <td style="padding:20px 28px 0">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td width="50%" style="vertical-align:top;padding-right:12px;font-size:15px;line-height:1.5">
                ${label("Telefon")}
                <a href="tel:${esc(c.tel.replace(/[^\d+]/g, ""))}" style="color:${TEXT};font-weight:700;text-decoration:none">${esc(c.tel)}</a>
              </td>
              <td width="50%" style="vertical-align:top;padding-left:12px;font-size:15px;line-height:1.5">
                ${label("E-mail")}
                <a href="mailto:${esc(c.email)}" style="color:${TEXT};font-weight:700;text-decoration:none;word-break:break-all">${esc(c.email)}</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Üzenet -->
      <tr>
        <td style="padding:24px 28px 0">
          ${label("Üzenet")}
          <div style="padding:16px 18px;background:${BG};border-left:4px solid ${ACCENT};border-radius:0 8px 8px 0;font-size:15px;line-height:1.6">
            ${esc(c.message).replace(/\r?\n/g, "<br>")}
          </div>
        </td>
      </tr>

      <!-- Gombok -->
      <tr>
        <td style="padding:24px 28px">
          <table cellpadding="0" cellspacing="0">
            <tr>
              <td bgcolor="${ACCENT}" style="background:${ACCENT};border-radius:8px">
                <a href="tel:${esc(c.tel.replace(/[^\d+]/g, ""))}" style="display:inline-block;padding:13px 22px;font-size:15px;font-weight:700;color:#ffffff;text-decoration:none">Visszahívom</a>
              </td>
              <td width="10"></td>
              <td style="border:1px solid ${LINE};border-radius:8px">
                <a href="mailto:${esc(c.email)}" style="display:inline-block;padding:12px 22px;font-size:15px;font-weight:700;color:${TEXT};text-decoration:none">Válasz e-mailben</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Lábléc -->
      <tr>
        <td style="padding:18px 28px;border-top:1px solid ${LINE};font-size:13px;line-height:1.6;color:${MUTED}">
          Ha erre az e-mailre válaszolsz, a válasz közvetlenül ${esc(c.name)} címére megy.
        </td>
      </tr>

    </table>
  </td></tr>
</table>`;

export async function sendEmail(prevState: any, formData: FormData) {
  const rawData = {
    name: formData.get("name"),
    email: formData.get("email"),
    tel: formData.get("tel"),
    message: formData.get("message"),
  };

  const validatedFields = FormSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, tel, message } = validatedFields.data;

  try {
    //  Mentés az adatbázisba
    await db.insert(contactForm).values({
      name,
      email,
      phone: tel,
      message,
    });

    //  E-mail küldés a Resend-del
    const { data, error } = await resend.emails.send({
      from: "Bádogos Weboldal <onboarding@resend.dev>",
      to: ["sziligalaron@gmail.com"],
      replyTo: email,
      subject: `Új érdeklődő: ${name}`,
      html: contactHtml({ name, email, tel, message }),
    });

    if (error) {
      return { success: false, generalError: error.message };
    }

    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      generalError:
        "Váratlan hiba történt a mentés vagy a levél küldése során.",
    };
  }
}
