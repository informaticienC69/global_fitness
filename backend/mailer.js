import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import dns from 'dns';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });
dns.setDefaultResultOrder('ipv4first');

// ─── SMTP Transporter ────────────────────────────────────────────────────────
export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER, // informaticienc78@gmail.com
    pass: process.env.MAIL_PASS, // Mot de passe d'application Google (16 chars)
  },
});

// ─── Vérification connexion ───────────────────────────────────────────────────
export const verifyMailer = async () => {
  try {
    await transporter.verify();
    console.log('✅ Mailer connecté — Gmail SMTP OK');
  } catch (err) {
    console.warn('⚠️  Mailer non connecté (mode dégradé) :', err.message);
  }
};

// ─── Formatage prix FCFA ──────────────────────────────────────────────────────
const fmt = (n) => Number(n).toLocaleString('fr-SN') + ' FCFA';

// ─── Email Propriétaire — Nouvelle Commande ───────────────────────────────────
export const sendOwnerNotification = async (order) => {
  const lignes = order.items
    .map(
      (i) =>
        `<tr>
          <td style="padding:10px 8px;border-bottom:1px solid #333;color:#fff;font-family:Arial,sans-serif;font-size:13px;word-break:break-word;">${i.name}</td>
          <td style="padding:10px 8px;border-bottom:1px solid #333;color:#aaa;text-align:center;font-family:Arial,sans-serif;font-size:13px;">${i.qty}</td>
          <td style="padding:10px 8px;border-bottom:1px solid #333;color:#FF6B1A;text-align:right;font-family:Arial,sans-serif;font-size:13px;font-weight:bold;word-break:break-word;">${fmt(i.price * i.qty)}</td>
        </tr>`
    )
    .join('');

  const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body style="margin:0;padding:16px;background:#0a0a0a;font-family:Arial,sans-serif;-webkit-text-size-adjust:100%;">
    <div style="max-width:520px;margin:0 auto;background:#111;border-radius:12px;overflow:hidden;border:1px solid #333;">
      
      <!-- 1. Header -->
      <div style="background:#FF6B1A;padding:24px 20px;text-align:center;">
        <h1 style="margin:0;color:#fff;font-size:20px;letter-spacing:1px;text-transform:uppercase;">NOUVELLE COMMANDE</h1>
        <p style="margin:4px 0 0;color:rgba(255,255,255,0.9);font-size:13px;font-weight:bold;">Global Fitness</p>
      </div>

      <!-- 2. Informations Client -->
      <div style="padding:20px;background:#1a1a1a;border-bottom:1px solid #333;">
        <h2 style="margin:0 0 12px;color:#FF6B1A;font-size:14px;text-transform:uppercase;letter-spacing:1px;">Client</h2>
        <div style="color:#ddd;font-size:14px;line-height:1.5;">
          <strong>${order.customer.name}</strong><br>
          <a href="mailto:${order.customer.email}" style="color:#FF6B1A;text-decoration:none;">${order.customer.email}</a><br>
          ${order.customer.phone ? `Tél : ${order.customer.phone}<br>` : ''}
          ${order.customer.address ? `Adresse : ${order.customer.address}<br>` : ''}
          <span style="color:#888;font-size:12px;display:block;margin-top:6px;">Commande #${order.id}</span>
        </div>
      </div>

      <!-- 3. Tableau Articles -->
      <div style="padding:20px;">
        <h2 style="margin:0 0 12px;color:#FF6B1A;font-size:14px;text-transform:uppercase;letter-spacing:1px;">Articles</h2>
        <table style="width:100%;table-layout:fixed;border-collapse:collapse;background:#0d0d0d;border-radius:6px;overflow:hidden;">
          <thead>
            <tr style="background:#222;">
              <th style="width:60%;padding:10px 8px;color:#ccc;text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:1px;">Produit</th>
              <th style="width:15%;padding:10px 8px;color:#ccc;text-align:center;font-size:11px;text-transform:uppercase;letter-spacing:1px;">Qté</th>
              <th style="width:25%;padding:10px 8px;color:#ccc;text-align:right;font-size:11px;text-transform:uppercase;letter-spacing:1px;">Total</th>
            </tr>
          </thead>
          <tbody>${lignes}</tbody>
        </table>
      </div>

      <!-- 4. Récapitulatif -->
      <div style="padding:0 20px 20px;">
        <div style="background:#1a1a1a;border-radius:8px;padding:16px;">
          <div style="display:flex;justify-content:space-between;margin-bottom:8px;font-size:13px;color:#aaa;">
            <span>Sous-total</span>
            <span>${fmt(order.total)}</span>
          </div>
          <div style="display:flex;justify-content:space-between;margin-bottom:12px;padding-bottom:12px;border-bottom:1px solid #333;font-size:13px;color:#aaa;">
            <span>Livraison</span>
            <span style="font-style:italic;">À déterminer</span>
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span style="color:#fff;font-size:16px;font-weight:bold;text-transform:uppercase;letter-spacing:1px;">TOTAL</span>
            <span style="color:#FF6B1A;font-size:20px;font-weight:bold;">${fmt(order.total)}</span>
          </div>
        </div>
      </div>

      <!-- 5. Footer -->
      <div style="padding:16px 20px;background:#0d0d0d;text-align:center;border-top:1px solid #222;">
        <p style="margin:0;color:#666;font-size:12px;">Contact support : <a href="mailto:${process.env.MAIL_USER}" style="color:#FF6B1A;text-decoration:none;">${process.env.MAIL_USER}</a></p>
        <p style="margin:4px 0 0;color:#444;font-size:11px;">Global Fitness · Dakar, Sénégal</p>
      </div>

    </div>
  </body>
  </html>`;

  return transporter.sendMail({
    from: `"Global Fitness Boutique" <${process.env.MAIL_USER}>`,
    to: process.env.MAIL_USER, // L'owner reçoit sur le même Gmail
    subject: `🛒 Nouvelle commande #${order.id} — ${order.customer.name} — ${fmt(order.total)}`,
    html,
  });
};

// ─── Email Client — Facture / Confirmation ────────────────────────────────────
export const sendClientInvoice = async (order) => {
  const lignes = order.items
    .map(
      (i) =>
        `<tr>
          <td style="padding:10px 8px;border-bottom:1px solid #333;color:#fff;font-family:Arial,sans-serif;font-size:13px;word-break:break-word;">${i.name}</td>
          <td style="padding:10px 8px;border-bottom:1px solid #333;color:#aaa;text-align:center;font-family:Arial,sans-serif;font-size:13px;">${i.qty}</td>
          <td style="padding:10px 8px;border-bottom:1px solid #333;color:#FF6B1A;text-align:right;font-family:Arial,sans-serif;font-size:13px;font-weight:bold;word-break:break-word;">${fmt(i.price * i.qty)}</td>
        </tr>`
    )
    .join('');

  const dateStr = new Date().toLocaleDateString('fr-FR', {
    day: '2-digit', month: 'long', year: 'numeric',
  });

  const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body style="margin:0;padding:16px;background:#0a0a0a;font-family:Arial,sans-serif;-webkit-text-size-adjust:100%;">
    <div style="max-width:520px;margin:0 auto;background:#111;border-radius:12px;overflow:hidden;border:1px solid #333;">
      
      <!-- 1. Header -->
      <div style="background:#FF6B1A;padding:24px 20px;text-align:center;">
        <h1 style="margin:0;color:#fff;font-size:20px;letter-spacing:1px;text-transform:uppercase;">VOTRE FACTURE</h1>
        <p style="margin:4px 0 0;color:rgba(255,255,255,0.9);font-size:13px;font-weight:bold;">Global Fitness</p>
      </div>

      <!-- 2. Informations Client -->
      <div style="padding:20px;background:#1a1a1a;border-bottom:1px solid #333;display:flex;justify-content:space-between;flex-wrap:wrap;gap:16px;">
        <div style="flex:1;min-width:140px;">
          <h2 style="margin:0 0 12px;color:#FF6B1A;font-size:14px;text-transform:uppercase;letter-spacing:1px;">Facturé à</h2>
          <div style="color:#ddd;font-size:14px;line-height:1.5;">
            <strong>${order.customer.name}</strong><br>
            <a href="mailto:${order.customer.email}" style="color:#FF6B1A;text-decoration:none;">${order.customer.email}</a><br>
            ${order.customer.phone ? `Tél : ${order.customer.phone}<br>` : ''}
            ${order.customer.address ? `Adresse : ${order.customer.address}` : ''}
          </div>
        </div>
        <div style="flex:0 0 auto;text-align:right;">
           <p style="margin:0;color:#888;font-size:11px;text-transform:uppercase;letter-spacing:1px;">Date</p>
           <p style="margin:4px 0 12px;color:#ddd;font-size:13px;">${dateStr}</p>
           <p style="margin:0;color:#888;font-size:11px;text-transform:uppercase;letter-spacing:1px;">Commande</p>
           <p style="margin:4px 0 0;color:#ddd;font-size:13px;">#${order.id}</p>
        </div>
      </div>

      <!-- 3. Tableau Articles -->
      <div style="padding:20px;">
        <h2 style="margin:0 0 12px;color:#FF6B1A;font-size:14px;text-transform:uppercase;letter-spacing:1px;">Articles</h2>
        <table style="width:100%;table-layout:fixed;border-collapse:collapse;background:#0d0d0d;border-radius:6px;overflow:hidden;">
          <thead>
            <tr style="background:#222;">
              <th style="width:60%;padding:10px 8px;color:#ccc;text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:1px;">Produit</th>
              <th style="width:15%;padding:10px 8px;color:#ccc;text-align:center;font-size:11px;text-transform:uppercase;letter-spacing:1px;">Qté</th>
              <th style="width:25%;padding:10px 8px;color:#ccc;text-align:right;font-size:11px;text-transform:uppercase;letter-spacing:1px;">Total</th>
            </tr>
          </thead>
          <tbody>${lignes}</tbody>
        </table>
      </div>

      <!-- 4. Récapitulatif -->
      <div style="padding:0 20px 20px;">
        <div style="background:#1a1a1a;border-radius:8px;padding:16px;">
          <div style="display:flex;justify-content:space-between;margin-bottom:8px;font-size:13px;color:#aaa;">
            <span>Sous-total</span>
            <span>${fmt(order.total)}</span>
          </div>
          <div style="display:flex;justify-content:space-between;margin-bottom:12px;padding-bottom:12px;border-bottom:1px solid #333;font-size:13px;color:#aaa;">
            <span>Frais de livraison</span>
            <span style="font-style:italic;">À déterminer</span>
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span style="color:#fff;font-size:16px;font-weight:bold;text-transform:uppercase;letter-spacing:1px;">TOTAL</span>
            <span style="color:#FF6B1A;font-size:20px;font-weight:bold;">${fmt(order.total)}</span>
          </div>
        </div>
      </div>

      <!-- Message -->
      <div style="padding:16px 20px;background:#151515;text-align:center;">
        <p style="margin:0;color:#fff;font-size:13px;font-weight:bold;">Merci pour votre commande ! 💪</p>
        <p style="margin:6px 0 0;color:#aaa;font-size:12px;line-height:1.5;">Notre équipe vous contactera sous 24h pour confirmer le montant de la livraison et organiser l'expédition.</p>
      </div>

      <!-- 5. Footer -->
      <div style="padding:16px 20px;background:#0d0d0d;text-align:center;border-top:1px solid #222;">
        <p style="margin:0;color:#666;font-size:12px;">Une question ? <a href="mailto:${process.env.MAIL_USER}" style="color:#FF6B1A;text-decoration:none;">Contactez-nous</a></p>
        <p style="margin:4px 0 0;color:#444;font-size:11px;">Global Fitness · Dakar, Sénégal</p>
      </div>

    </div>
  </body>
  </html>`;

  return transporter.sendMail({
    from: `"Global Fitness" <${process.env.MAIL_USER}>`,
    to: order.customer.email,
    replyTo: process.env.MAIL_USER,
    subject: `✅ Votre commande Global Fitness #${order.id} — ${fmt(order.total)}`,
    html,
  });
};

// ─── Email Propriétaire — Nouveau Message de Contact ─────────────────────────
export const sendContactNotification = async ({ name, email, phone, address, message }) => {
  const html = `
  <!DOCTYPE html>
  <html>
  <head><meta charset="UTF-8"></head>
  <body style="margin:0;padding:0;background:#0a0a0a;font-family:Arial,sans-serif;">
    <div style="max-width:600px;margin:30px auto;background:#111;border-radius:12px;overflow:hidden;border:1px solid #222;">

      <!-- Header -->
      <div style="background:linear-gradient(135deg,#E63946,#FF8C42);padding:24px 32px;">
        <h1 style="margin:0;color:#fff;font-size:20px;letter-spacing:2px;text-transform:uppercase;">📩 Nouveau Message</h1>
        <p style="margin:6px 0 0;color:rgba(255,255,255,0.8);font-size:13px;">Formulaire de Contact — Global Fitness</p>
      </div>

      <!-- Coordonnées -->
      <div style="padding:24px 32px;border-bottom:1px solid #222;">
        <h2 style="margin:0 0 16px;color:#fff;font-size:13px;text-transform:uppercase;letter-spacing:1px;">Coordonnées de l'expéditeur</h2>
        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="color:#aaa;font-size:13px;padding:6px 0;width:110px;vertical-align:top;">Nom</td>
            <td style="color:#fff;font-size:13px;font-weight:bold;">${name}</td>
          </tr>
          <tr>
            <td style="color:#aaa;font-size:13px;padding:6px 0;vertical-align:top;">Email</td>
            <td style="font-size:13px;">
              <a href="mailto:${email}" style="color:#E63946;text-decoration:none;">${email}</a>
            </td>
          </tr>
          ${phone ? `
          <tr>
            <td style="color:#aaa;font-size:13px;padding:6px 0;vertical-align:top;">Téléphone</td>
            <td style="color:#fff;font-size:13px;">${phone}</td>
          </tr>` : ''}
          ${address ? `
          <tr>
            <td style="color:#aaa;font-size:13px;padding:6px 0;vertical-align:top;">Adresse</td>
            <td style="color:#fff;font-size:13px;">${address}</td>
          </tr>` : ''}
        </table>
      </div>

      <!-- Message -->
      <div style="padding:24px 32px 32px;">
        <h2 style="margin:0 0 14px;color:#fff;font-size:13px;text-transform:uppercase;letter-spacing:1px;">Message</h2>
        <div style="background:#0d0d0d;border-left:3px solid #E63946;border-radius:0 8px 8px 0;padding:16px 20px;">
          <p style="margin:0;color:#ccc;font-size:14px;line-height:1.7;white-space:pre-line;">${message}</p>
        </div>
        <p style="margin:20px 0 0;color:#555;font-size:11px;text-align:center;">
          Reçu le ${new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>

      <!-- Reply CTA -->
      <div style="padding:16px 32px;background:#1a1a1a;text-align:center;">
        <a href="mailto:${email}?subject=Re: Votre message Global Fitness" 
           style="display:inline-block;background:linear-gradient(135deg,#E63946,#FF8C42);color:#fff;text-decoration:none;padding:10px 24px;border-radius:8px;font-size:13px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;">
          Répondre à ${name.split(' ')[0]}
        </a>
      </div>
    </div>
  </body>
  </html>`;

  return transporter.sendMail({
    from: `"Global Fitness Site" <${process.env.MAIL_USER}>`,
    to: process.env.MAIL_USER,
    replyTo: email,
    subject: `📩 Message de ${name} — Global Fitness`,
    html,
  });
};
