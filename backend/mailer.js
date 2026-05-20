import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import dns from 'dns';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// En local on charge .env, sur Vercel les vars viennent du dashboard
dotenv.config({ path: path.join(__dirname, '.env') });
dns.setDefaultResultOrder('ipv4first');

// ─── Validation des variables d'environnement ────────────────────────────────
const MAIL_USER = process.env.MAIL_USER;
const MAIL_PASS = process.env.MAIL_PASS;

if (!MAIL_USER || !MAIL_PASS) {
  console.error(
    '❌ MAIL_USER ou MAIL_PASS manquant. ' +
    (process.env.VERCEL
      ? 'Sur Vercel, configurez ces variables dans Settings → Environment Variables, puis Redeploy.'
      : 'Localement, vérifiez votre fichier backend/.env')
  );
}

// ─── SMTP Transporter ────────────────────────────────────────────────────────
// Configuration SMTP explicite (plus fiable que service:'gmail' sur serverless)
// Port 465 SSL est généralement plus rapide que 587 STARTTLS sur cold start.
export const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // SSL
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASS, // App Password Google (16 caractères)
  },
  // Timeouts serrés pour éviter de dépasser la limite Vercel (10s Hobby / 30s Pro)
  connectionTimeout: 10_000, // 10s pour établir la connexion TCP
  greetingTimeout: 10_000,   // 10s pour le handshake SMTP
  socketTimeout: 10_000,     // 10s pour la transmission (total worst-case 30s = maxDuration Vercel)
  // Pool désactivé : sur serverless chaque invocation est isolée, le pool est inutile
  pool: false,
});

// ─── Vérification connexion ───────────────────────────────────────────────────
export const verifyMailer = async () => {
  if (!MAIL_USER || !MAIL_PASS) {
    throw new Error('MAIL_USER/MAIL_PASS non configurés (variables d\'environnement manquantes)');
  }
  try {
    await transporter.verify();
    console.log('✅ Mailer connecté — Gmail SMTP OK');
  } catch (err) {
    console.warn('⚠️  Mailer non connecté :', err.message);
    throw err;
  }
};

// ─── Helper : envoi sécurisé avec validation préalable ───────────────────────
const safeSendMail = async (mailOptions) => {
  if (!MAIL_USER || !MAIL_PASS) {
    throw new Error(
      'Configuration email manquante : MAIL_USER ou MAIL_PASS non défini. ' +
      'Vérifiez les variables d\'environnement Vercel.'
    );
  }
  return transporter.sendMail(mailOptions);
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
  <body style="margin:0;padding:24px;background-color:#0A0A0A;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;-webkit-text-size-adjust:100%;">
    <div style="max-width:540px;margin:0 auto;background-color:#111111;border-radius:16px;overflow:hidden;border:1px solid rgba(245,166,35,0.2);box-shadow:0 10px 30px rgba(0,0,0,0.8);">
      
      <!-- 1. Header -->
      <div style="background:linear-gradient(135deg, #F5A623 0%, #E8820C 100%);padding:32px 24px;text-align:center;">
        <h1 style="margin:0;color:#0F0F0F;font-size:22px;letter-spacing:1.5px;text-transform:uppercase;font-weight:900;">NOUVELLE COMMANDE</h1>
        <p style="margin:6px 0 0;color:rgba(0,0,0,0.7);font-size:13px;font-weight:bold;letter-spacing:0.5px;">Global Fit Sport</p>
      </div>

      <!-- 2. Informations Client -->
      <div style="padding:24px;background-color:#161616;border-bottom:1px solid #222;">
        <h2 style="margin:0 0 16px;color:#F5A623;font-size:12px;text-transform:uppercase;letter-spacing:1.5px;">Informations Client</h2>
        <div style="color:#E0E0E0;font-size:14px;line-height:1.6;">
          <strong style="color:#FFF;font-size:16px;">${order.customer.name}</strong><br>
          <a href="mailto:${order.customer.email}" style="color:#F5A623;text-decoration:none;">${order.customer.email}</a><br>
          ${order.customer.phone ? `<span style="color:#888;">Tél :</span> ${order.customer.phone}<br>` : ''}
          ${order.customer.address ? `<span style="color:#888;">Adresse :</span> ${order.customer.address}<br>` : ''}
          <div style="margin-top:12px;padding-top:12px;border-top:1px dashed #333;">
            <span style="color:#666;font-size:11px;text-transform:uppercase;letter-spacing:1px;">ID Commande</span><br>
            <span style="color:#AAA;font-family:monospace;font-size:14px;">${order.id}</span>
          </div>
        </div>
      </div>

      <!-- 3. Tableau Articles -->
      <div style="padding:24px;">
        <h2 style="margin:0 0 16px;color:#F5A623;font-size:12px;text-transform:uppercase;letter-spacing:1.5px;">Détails de la commande</h2>
        <table style="width:100%;table-layout:fixed;border-collapse:separate;border-spacing:0;background-color:#0D0D0D;border-radius:8px;border:1px solid #222;">
          <thead>
            <tr>
              <th style="width:60%;padding:12px;color:#888;text-align:left;font-size:10px;text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid #222;">Produit</th>
              <th style="width:15%;padding:12px;color:#888;text-align:center;font-size:10px;text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid #222;">Qté</th>
              <th style="width:25%;padding:12px;color:#888;text-align:right;font-size:10px;text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid #222;">Total</th>
            </tr>
          </thead>
          <tbody>${lignes.replace(/#333/g, '#222').replace(/#FF6B1A/g, '#F5A623')}</tbody>
        </table>
      </div>

      <!-- 4. Récapitulatif -->
      <div style="padding:0 24px 24px;">
        <div style="background-color:#161616;border-radius:8px;padding:20px;border:1px solid #222;">
          <div style="display:flex;justify-content:space-between;margin-bottom:12px;font-size:14px;color:#888;">
            <span>Sous-total</span>
            <span style="color:#CCC;">${fmt(order.total)}</span>
          </div>
          <div style="display:flex;justify-content:space-between;margin-bottom:16px;padding-bottom:16px;border-bottom:1px solid #333;font-size:14px;color:#888;">
            <span>Livraison</span>
            <span style="font-style:italic;color:#666;">À déterminer</span>
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span style="color:#FFF;font-size:14px;font-weight:bold;text-transform:uppercase;letter-spacing:1px;">Total Net</span>
            <span style="color:#F5A623;font-size:22px;font-weight:900;">${fmt(order.total)}</span>
          </div>
        </div>
      </div>

      <!-- 5. Footer -->
      <div style="padding:20px 24px;background-color:#080808;text-align:center;border-top:1px solid #1A1A1A;">
        <p style="margin:0;color:#555;font-size:12px;">Contact support : <a href="mailto:${MAIL_USER}" style="color:#F5A623;text-decoration:none;">${MAIL_USER}</a></p>
        <p style="margin:6px 0 0;color:#333;font-size:10px;text-transform:uppercase;letter-spacing:1px;">Global Fit Sport · Dakar, Sénégal</p>
      </div>

    </div>
  </body>
  </html>`;

  return safeSendMail({
    from: `"Global Fitness Boutique" <${MAIL_USER}>`,
    to: MAIL_USER, // L'owner reçoit sur le même Gmail
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
  <body style="margin:0;padding:24px;background-color:#0A0A0A;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;-webkit-text-size-adjust:100%;">
    <div style="max-width:540px;margin:0 auto;background-color:#111111;border-radius:16px;overflow:hidden;border:1px solid rgba(245,166,35,0.2);box-shadow:0 10px 30px rgba(0,0,0,0.8);">
      
      <!-- 1. Header -->
      <div style="background:linear-gradient(135deg, #F5A623 0%, #E8820C 100%);padding:32px 24px;text-align:center;">
        <h1 style="margin:0;color:#0F0F0F;font-size:22px;letter-spacing:1.5px;text-transform:uppercase;font-weight:900;">VOTRE FACTURE</h1>
        <p style="margin:6px 0 0;color:rgba(0,0,0,0.7);font-size:13px;font-weight:bold;letter-spacing:0.5px;">Global Fit Sport</p>
      </div>

      <!-- 2. Informations Client & Commande -->
      <div style="padding:24px;background-color:#161616;border-bottom:1px solid #222;display:flex;justify-content:space-between;flex-wrap:wrap;gap:16px;">
        <div style="flex:1;min-width:140px;">
          <h2 style="margin:0 0 12px;color:#F5A623;font-size:12px;text-transform:uppercase;letter-spacing:1.5px;">Facturé à</h2>
          <div style="color:#E0E0E0;font-size:14px;line-height:1.6;">
            <strong style="color:#FFF;">${order.customer.name}</strong><br>
            <a href="mailto:${order.customer.email}" style="color:#F5A623;text-decoration:none;">${order.customer.email}</a><br>
            ${order.customer.phone ? `<span style="color:#888;">Tél :</span> ${order.customer.phone}<br>` : ''}
            ${order.customer.address ? `<span style="color:#888;">Adresse :</span> ${order.customer.address}` : ''}
          </div>
        </div>
        <div style="flex:0 0 auto;text-align:right;">
           <p style="margin:0;color:#666;font-size:10px;text-transform:uppercase;letter-spacing:1px;">Date</p>
           <p style="margin:4px 0 12px;color:#CCC;font-size:14px;font-weight:500;">${dateStr}</p>
           <p style="margin:0;color:#666;font-size:10px;text-transform:uppercase;letter-spacing:1px;">Commande N°</p>
           <p style="margin:4px 0 0;color:#FFF;font-family:monospace;font-size:15px;letter-spacing:1px;">${order.id}</p>
        </div>
      </div>

      <!-- 3. Tableau Articles -->
      <div style="padding:24px;">
        <h2 style="margin:0 0 16px;color:#F5A623;font-size:12px;text-transform:uppercase;letter-spacing:1.5px;">Articles</h2>
        <table style="width:100%;table-layout:fixed;border-collapse:separate;border-spacing:0;background-color:#0D0D0D;border-radius:8px;border:1px solid #222;">
          <thead>
            <tr>
              <th style="width:60%;padding:12px;color:#888;text-align:left;font-size:10px;text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid #222;">Produit</th>
              <th style="width:15%;padding:12px;color:#888;text-align:center;font-size:10px;text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid #222;">Qté</th>
              <th style="width:25%;padding:12px;color:#888;text-align:right;font-size:10px;text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid #222;">Total</th>
            </tr>
          </thead>
          <tbody>${lignes.replace(/#333/g, '#222').replace(/#FF6B1A/g, '#F5A623')}</tbody>
        </table>
      </div>

      <!-- 4. Récapitulatif -->
      <div style="padding:0 24px 24px;">
        <div style="background-color:#161616;border-radius:8px;padding:20px;border:1px solid #222;">
          <div style="display:flex;justify-content:space-between;margin-bottom:12px;font-size:14px;color:#888;">
            <span>Sous-total</span>
            <span style="color:#CCC;">${fmt(order.total)}</span>
          </div>
          <div style="display:flex;justify-content:space-between;margin-bottom:16px;padding-bottom:16px;border-bottom:1px solid #333;font-size:14px;color:#888;">
            <span>Frais de livraison</span>
            <span style="font-style:italic;color:#666;">À déterminer</span>
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span style="color:#FFF;font-size:14px;font-weight:bold;text-transform:uppercase;letter-spacing:1px;">TOTAL NET</span>
            <span style="color:#F5A623;font-size:22px;font-weight:900;">${fmt(order.total)}</span>
          </div>
        </div>
      </div>

      <!-- Message -->
      <div style="padding:24px;background-color:#111;text-align:center;border-top:1px solid #222;">
        <p style="margin:0;color:#FFF;font-size:14px;font-weight:bold;letter-spacing:0.5px;">Merci pour votre confiance ! 💪</p>
        <p style="margin:8px 0 0;color:#888;font-size:13px;line-height:1.6;">Notre équipe vous contactera sous 24h pour confirmer les détails de livraison et organiser l'installation de votre matériel.</p>
      </div>

      <!-- 5. Footer -->
      <div style="padding:20px 24px;background-color:#080808;text-align:center;border-top:1px solid #1A1A1A;">
        <p style="margin:0;color:#555;font-size:12px;">Une question ? <a href="mailto:${MAIL_USER}" style="color:#F5A623;text-decoration:none;">Contactez notre équipe</a></p>
        <p style="margin:6px 0 0;color:#333;font-size:10px;text-transform:uppercase;letter-spacing:1px;">Global Fit Sport · Dakar, Sénégal</p>
      </div>

    </div>
  </body>
  </html>`;

  return safeSendMail({
    from: `"Global Fitness" <${MAIL_USER}>`,
    to: order.customer.email,
    replyTo: MAIL_USER,
    subject: `✅ Votre commande Global Fitness #${order.id} — ${fmt(order.total)}`,
    html,
  });
};

// ─── Email Propriétaire — Nouveau Message de Contact ─────────────────────────
export const sendContactNotification = async ({ name, email, phone, interest, message }) => {
  const html = `
  <!DOCTYPE html>
  <html>
  <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
  <body style="margin:0;padding:24px;background-color:#0A0A0A;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
    <div style="max-width:540px;margin:0 auto;background-color:#111111;border-radius:16px;overflow:hidden;border:1px solid rgba(245,166,35,0.2);box-shadow:0 10px 30px rgba(0,0,0,0.8);">

      <!-- Header -->
      <div style="background:linear-gradient(135deg, #F5A623 0%, #E8820C 100%);padding:32px 24px;text-align:center;">
        <h1 style="margin:0;color:#0F0F0F;font-size:20px;letter-spacing:1.5px;text-transform:uppercase;font-weight:900;">📩 NOUVEAU MESSAGE</h1>
        <p style="margin:6px 0 0;color:rgba(0,0,0,0.7);font-size:13px;font-weight:bold;letter-spacing:0.5px;">Site Web — Global Fit Sport</p>
      </div>

      <!-- Coordonnées -->
      <div style="padding:24px;background-color:#161616;border-bottom:1px solid #222;">
        <h2 style="margin:0 0 16px;color:#F5A623;font-size:12px;text-transform:uppercase;letter-spacing:1.5px;">Coordonnées de l'expéditeur</h2>
        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="color:#888;font-size:13px;padding:8px 0;width:100px;vertical-align:top;text-transform:uppercase;letter-spacing:0.5px;font-size:11px;">Nom</td>
            <td style="color:#FFF;font-size:14px;font-weight:bold;padding:8px 0;">${name}</td>
          </tr>
          <tr>
            <td style="color:#888;font-size:13px;padding:8px 0;vertical-align:top;text-transform:uppercase;letter-spacing:0.5px;font-size:11px;">Email</td>
            <td style="font-size:14px;padding:8px 0;">
              <a href="mailto:${email}" style="color:#F5A623;text-decoration:none;">${email}</a>
            </td>
          </tr>
          ${phone ? `
          <tr>
            <td style="color:#888;font-size:13px;padding:8px 0;vertical-align:top;text-transform:uppercase;letter-spacing:0.5px;font-size:11px;">Téléphone</td>
            <td style="color:#E0E0E0;font-size:14px;padding:8px 0;">${phone}</td>
          </tr>` : ''}
          ${interest ? `
          <tr>
            <td style="color:#888;font-size:13px;padding:8px 0;vertical-align:top;text-transform:uppercase;letter-spacing:0.5px;font-size:11px;">Sujet / Intérêt</td>
            <td style="color:#E0E0E0;font-size:14px;padding:8px 0;">${interest}</td>
          </tr>` : ''}
        </table>
      </div>

      <!-- Message -->
      <div style="padding:24px;">
        <h2 style="margin:0 0 16px;color:#F5A623;font-size:12px;text-transform:uppercase;letter-spacing:1.5px;">Message</h2>
        <div style="background-color:#0D0D0D;border-left:4px solid #F5A623;border-radius:4px 8px 8px 4px;padding:20px;">
          <p style="margin:0;color:#E0E0E0;font-size:15px;line-height:1.6;white-space:pre-line;">${message}</p>
        </div>
        <p style="margin:24px 0 0;color:#555;font-size:11px;text-align:center;text-transform:uppercase;letter-spacing:1px;">
          Reçu le ${new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>

      <!-- Reply CTA -->
      <div style="padding:24px;background-color:#111;text-align:center;border-top:1px solid #222;">
        <a href="mailto:${email}?subject=Re: Votre message Global Fit Sport" 
           style="display:inline-block;background:linear-gradient(135deg, #F5A623 0%, #E8820C 100%);color:#0F0F0F;text-decoration:none;padding:14px 28px;border-radius:8px;font-size:13px;font-weight:900;letter-spacing:1px;text-transform:uppercase;box-shadow:0 4px 15px rgba(245,166,35,0.3);">
          Répondre à ${name.split(' ')[0]}
        </a>
      </div>
    </div>
  </body>
  </html>`;

  return safeSendMail({
    from: `"Global Fitness Site" <${MAIL_USER}>`,
    to: MAIL_USER,
    replyTo: email,
    subject: `📩 Message de ${name} — Global Fitness`,
    html,
  });
};
