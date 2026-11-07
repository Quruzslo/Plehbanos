import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = process.env.EMAIL_FROM!;
const ADMIN = process.env.ADMIN_EMAIL!;

export type OrderEmail = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  note?: string | null;
  items: {
    name: string;
    quantity: number;
    unitPrice: number;
    img?: string | null;
  }[];
  total: number;
  cancelToken: string;
};

const SITE_URL = process.env.SITE_URL!;

// Email színei
const ACCENT = "#c2410c";
const TEXT = "#1f1f1f";
const MUTED = "#6b6b6b";
const LINE = "#e5e2dc";
const BG = "#f3f1ed";

const huf = (n: number) => `${new Intl.NumberFormat("hu-HU").format(n)} Ft`;

const today = () =>
  new Intl.DateTimeFormat("hu-HU", {
    dateStyle: "long",
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

const thumb = (i: OrderEmail["items"][number]) =>
  i.img
    ? `<img src="${esc(i.img)}" alt="${esc(i.name)}" width="72" height="72" style="display:block;width:72px;height:72px;border-radius:8px;border:1px solid ${LINE}">`
    : `<div style="width:72px;height:72px;border-radius:8px;background:${BG}"></div>`;

const itemsTable = (o: Pick<OrderEmail, "items">) => `
  <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;color:${TEXT}">
    ${o.items
      .map(
        (i) => `<tr>
          <td width="72" style="padding:14px 0;border-bottom:1px solid ${LINE};vertical-align:top">${thumb(i)}</td>
          <td style="padding:14px 12px;border-bottom:1px solid ${LINE};vertical-align:top">
            <p style="margin:0 0 4px;font-size:15px;font-weight:700;line-height:1.3">${esc(i.name)}</p>
            <p style="margin:0;font-size:13px;color:${MUTED}">${i.quantity} db × ${huf(i.unitPrice)}</p>
          </td>
          <td style="padding:14px 0;border-bottom:1px solid ${LINE};vertical-align:top;text-align:right;white-space:nowrap;font-size:15px;font-weight:700">${huf(i.unitPrice * i.quantity)}</td>
        </tr>`,
      )
      .join("")}
  </table>`;

const adminHtml = (o: OrderEmail) => `
  <h2>Új rendelés #${o.id}</h2>
  <p>
    <strong>${esc(o.name)}</strong><br>
    <a href="tel:${esc(o.phone)}">${esc(o.phone)}</a> · ${esc(o.email)}<br>
    ${esc(o.address)}
  </p>
  ${o.note ? `<p><strong>Megjegyzés:</strong> ${esc(o.note)}</p>` : ""}
  ${itemsTable(o)}
  <p style="font-size:16px"><strong>Összesen (utánvéttel): ${huf(o.total)}</strong></p>`;

const customerHtml = (o: OrderEmail) => `
<table width="100%" cellpadding="0" cellspacing="0" bgcolor="${BG}" style="background:${BG};padding:32px 12px">
  <tr><td>
    <table width="100%" cellpadding="0" cellspacing="0" bgcolor="#ffffff" style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:10px;font-family:Helvetica,Arial,sans-serif;color:${TEXT}">

      <!-- Fejléc: márka + rendelésszám, dátum -->
      <tr>
        <td style="padding:28px 28px 0">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="vertical-align:top">
                <p style="margin:0;font-size:17px;font-weight:900;line-height:1.2">József Zoltán</p>
                <p style="margin:2px 0 0;font-size:13px;color:${MUTED}">bádogosmester</p>
              </td>
              <td style="vertical-align:top;text-align:right">
                <p style="margin:0;font-size:15px;font-weight:800">Rendelés #${o.id}</p>
                <p style="margin:2px 0 0;font-size:13px;color:${MUTED}">${today()}</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Köszönő szöveg -->
      <tr>
        <td style="padding:28px 28px 8px">
          <h1 style="margin:0;font-size:24px;font-weight:900;line-height:1.2">Megkaptuk a rendelésed</h1>
          <div style="width:48px;height:4px;background:${ACCENT};margin:14px 0 18px"></div>
          <p style="margin:0;font-size:15px;line-height:1.6">Kedves ${esc(o.name)}! Köszönjük a rendelésed. Hamarosan felvesszük veled a kapcsolatot a szállítás részleteivel kapcsolatban.</p>
        </td>
      </tr>

      <!-- Termékek -->
      <tr>
        <td style="padding:16px 28px 0">
          ${itemsTable(o)}
        </td>
      </tr>

      <!-- Cím + fizetés -->
      <tr>
        <td style="padding:24px 28px 0">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td width="50%" style="vertical-align:top;padding-right:12px;font-size:14px;line-height:1.5">
                ${label("Szállítási cím")}
                ${esc(o.name)}<br>${esc(o.address)}
              </td>
              <td width="50%" style="vertical-align:top;padding-left:12px;font-size:14px;line-height:1.5">
                ${label("Fizetés")}
                Utánvét, a csomag átvételekor.<br>A számlát a csomagban találod.
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Összesen -->
      <tr>
        <td style="padding:24px 28px">
          <table width="100%" cellpadding="0" cellspacing="0" bgcolor="${ACCENT}" style="background:${ACCENT};border-radius:8px;color:#ffffff">
            <tr>
              <td style="padding:18px 20px;font-size:14px">
                Fizetendő átvételkor
              </td>
              <td style="padding:18px 20px;text-align:right;font-size:22px;font-weight:900;white-space:nowrap">
                ${huf(o.total)}
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Lemondás -->
      <tr>
        <td style="padding:0 28px 24px;font-size:14px;line-height:1.6">
          Meggondoltad magad? Amíg nem adtuk fel a csomagot, a rendelésed itt lemondhatod:<br>
          <a href="${SITE_URL}/rendeles-lemondas/${o.cancelToken}" style="color:${ACCENT};font-weight:700">Rendelés lemondása</a>
        </td>
      </tr>

      <!-- Lábléc -->
      <tr>
        <td style="padding:18px 28px;border-top:1px solid ${LINE};font-size:13px;line-height:1.6;color:${MUTED}">
          Kérdésed van? Válaszolj erre az e-mailre, és hamarosan jelentkezünk.
        </td>
      </tr>

    </table>
  </td></tr>
</table>`;

export type ShippedEmail = Pick<
  OrderEmail,
  "id" | "name" | "email" | "address" | "items" | "total"
>;

const shippedHtml = (o: ShippedEmail) => `
<table width="100%" cellpadding="0" cellspacing="0" bgcolor="${BG}" style="background:${BG};padding:32px 12px">
  <tr><td>
    <table width="100%" cellpadding="0" cellspacing="0" bgcolor="#ffffff" style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:10px;font-family:Helvetica,Arial,sans-serif;color:${TEXT}">

      <!-- Fejléc: márka + rendelésszám, dátum -->
      <tr>
        <td style="padding:28px 28px 0">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="vertical-align:top">
                <p style="margin:0;font-size:17px;font-weight:900;line-height:1.2">József Zoltán</p>
                <p style="margin:2px 0 0;font-size:13px;color:${MUTED}">bádogosmester</p>
              </td>
              <td style="vertical-align:top;text-align:right">
                <p style="margin:0;font-size:15px;font-weight:800">Rendelés #${o.id}</p>
                <p style="margin:2px 0 0;font-size:13px;color:${MUTED}">Feladva: ${today()}</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Fő üzenet -->
      <tr>
        <td style="padding:28px 28px 8px">
          <h1 style="margin:0;font-size:24px;font-weight:900;line-height:1.2">Úton van a csomagod</h1>
          <div style="width:48px;height:4px;background:${ACCENT};margin:14px 0 18px"></div>
          <p style="margin:0;font-size:15px;line-height:1.6">Kedves ${esc(o.name)}! A rendelésedet összecsomagoltuk és átadtuk a futárszolgálatnak, hamarosan megérkezik hozzád.</p>
        </td>
      </tr>

      <!-- Termékek -->
      <tr>
        <td style="padding:16px 28px 0">
          ${label("A csomagban")}
          ${itemsTable(o)}
        </td>
      </tr>

      <!-- Cím + fizetés -->
      <tr>
        <td style="padding:24px 28px 0">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td width="50%" style="vertical-align:top;padding-right:12px;font-size:14px;line-height:1.5">
                ${label("Szállítási cím")}
                ${esc(o.name)}<br>${esc(o.address)}
              </td>
              <td width="50%" style="vertical-align:top;padding-left:12px;font-size:14px;line-height:1.5">
                ${label("Fizetés")}
                Utánvét: kérjük, az összeget készítsd elő a futárnak.<br>A számlát a csomagban találod.
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Összesen -->
      <tr>
        <td style="padding:24px 28px">
          <table width="100%" cellpadding="0" cellspacing="0" bgcolor="${ACCENT}" style="background:${ACCENT};border-radius:8px;color:#ffffff">
            <tr>
              <td style="padding:18px 20px;font-size:14px">
                Fizetendő átvételkor
              </td>
              <td style="padding:18px 20px;text-align:right;font-size:22px;font-weight:900;white-space:nowrap">
                ${huf(o.total)}
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Lábléc -->
      <tr>
        <td style="padding:18px 28px;border-top:1px solid ${LINE};font-size:13px;line-height:1.6;color:${MUTED}">
          Kérdésed van a szállítással kapcsolatban? Válaszolj erre az e-mailre, és hamarosan jelentkezünk.
        </td>
      </tr>

    </table>
  </td></tr>
</table>`;

export async function sendShippedEmail(o: ShippedEmail) {
  const { error } = await resend.emails.send({
    from: FROM,
    to: o.email,
    replyTo: ADMIN,
    subject: `Feladtuk a rendelésed (#${o.id})`,
    html: shippedHtml(o),
  });

  if (error)
    console.error(`Shipped email failed (#${o.id}, to: ${o.email})`, error);
}

export async function sendOrderEmails(order: OrderEmail) {
  const [admin, customer] = await Promise.all([
    resend.emails.send({
      from: FROM,
      to: ADMIN,
      replyTo: order.email,
      subject: `Új rendelés #${order.id} – ${order.name}`,
      html: adminHtml(order),
    }),
    resend.emails.send({
      from: FROM,
      to: order.email,
      replyTo: ADMIN,
      subject: `Megkaptuk a rendelésed (#${order.id})`,
      html: customerHtml(order),
    }),
  ]);

  if (admin.error)
    console.error(
      `Admin email failed (#${order.id}, to: ${ADMIN})`,
      admin.error,
    );
  if (customer.error)
    console.error(
      `Customer email failed (#${order.id}, to: ${order.email})`,
      customer.error,
    );
}

export async function sendCancelNotice(o: { id: number; name: string }) {
  const { error } = await resend.emails.send({
    from: FROM,
    to: ADMIN,
    subject: `Lemondott rendelés #${o.id} – ${o.name}`,
    html: `<p><strong>${esc(o.name)}</strong> lemondta a #${o.id} rendelést. A tételek visszakerültek a készletbe.</p>`,
  });

  if (error) console.error(`Cancel email failed (#${o.id})`, error);
}
