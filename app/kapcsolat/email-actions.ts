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

      html: `<p><strong>Név:</strong> ${name}</p>
             <p><strong>E-mail:</strong> ${email}</p>
             <p><strong>Telefon:</strong> ${tel}</p>
             <p><strong>Üzenet:</strong> ${message}</p>`,
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
