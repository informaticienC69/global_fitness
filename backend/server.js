import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import * as mariadb from 'mariadb';
import dns from 'dns';
import path from 'path';
import { fileURLToPath } from 'url';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { sendOwnerNotification, sendClientInvoice, sendContactNotification } from './mailer.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });
dns.setDefaultResultOrder('ipv4first');

const app = express();
const port = process.env.PORT || 3001;

// ─── Middleware de Sécurité ──────────────────────────────────────────────────
// Configuration Helmet pour autoriser les images externes (si nécessaire) et ajuster la politique de sécurité pour le rendu React
app.use(helmet({
  contentSecurityPolicy: false, // Désactivé temporairement pour éviter de bloquer les assets React/images pendant la mise en place
  crossOriginEmbedderPolicy: false,
}));

// Limitation de requêtes (DDoS & Spam protection)
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limite chaque IP à 100 requêtes par fenêtre
  message: { error: 'Trop de requêtes, veuillez réessayer plus tard.' }
});
// Appliquer spécifiquement sur les routes d'envoi d'email
app.use('/api/contact', apiLimiter);
app.use('/api/orders', apiLimiter);

// ─── Configuration CORS ──────────────────────────────────────────────────────
const allowedOrigins = process.env.FRONTEND_URL 
  ? [process.env.FRONTEND_URL, 'http://localhost:5173'] 
  : ['http://localhost:5173'];

app.use(cors({
  origin: function (origin, callback) {
    // Autoriser si pas d'origine (requête serveur) ou localhost ou domaine vercel
    if (!origin || allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
      return callback(null, true);
    }
    const msg = 'La politique CORS de ce site ne permet pas l\'accès depuis cette origine.';
    return callback(new Error(msg), false);
  }
}));

// Nécessaire pour express-rate-limit sur Vercel (Reverse Proxy)
app.set('trust proxy', 1);

app.use(express.json());

// Note: Ensure MariaDB is running locally with these credentials for full database functionality.
const pool = mariadb.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'global_fitness',
  connectionLimit: 5
});

// Initialization Script (for dev setup)
async function initDB() {
  // Sur Vercel, on saute l'initialisation DB locale pour éviter un timeout de 10s.
  if (process.env.VERCEL && (!process.env.DB_HOST || process.env.DB_HOST === 'localhost')) {
    console.log("Mode Vercel détecté sans base de données distante. DB ignorée.");
    return;
  }
  try {
    const conn = await pool.getConnection();
    await conn.query(`
      CREATE TABLE IF NOT EXISTS contacts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    conn.release();
    console.log("DB initialized successfully");
  } catch (err) {
    console.error("DB initialization failed - running in degraded mode (no DB).", err.message);
  }
}
initDB();

// Test DB Connection
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running' });
});

// Mocked schedule endpoint (can be replaced with DB queries later)
app.get('/api/schedule', (req, res) => {
  const mockData = {
    'Lundi': [
      { time: '07:00 - 08:00', name: 'WOD Morning', trainer: 'Alex' },
      { time: '12:30 - 13:30', name: 'Force & Conditionnement', trainer: 'Sarah' },
      { time: '18:00 - 19:30', name: 'Haltérophilie', trainer: 'Marcus' },
      { time: '19:30 - 20:30', name: 'Metcon Intense', trainer: 'Alex' }
    ],
    'Mardi': [
      { time: '08:00 - 09:00', name: 'Mobilité & Récupération', trainer: 'Sarah' },
      { time: '12:30 - 13:30', name: 'WOD', trainer: 'Marcus' },
      { time: '18:30 - 19:30', name: 'Gymnastique', trainer: 'Emma' },
    ]
  };
  res.json(mockData);
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, phone, address, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Nom, email et message sont requis.' });
  }

  // 1. Sauvegarde en DB (optionnel)
  if (!(process.env.VERCEL && (!process.env.DB_HOST || process.env.DB_HOST === 'localhost'))) {
    try {
      const conn = await pool.getConnection();
      await conn.query(
        'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)',
        [name, email, message]
      );
      conn.release();
    } catch (err) {
      console.warn('DB contact save failed (degraded mode):', err.message);
    }
  }

  // 2. Envoi email (doit être fait AVANT de répondre sur Vercel, sinon la fonction s'arrête)
  try {
    await sendContactNotification({ name, email, phone, address, message });
    console.log(`📩 Message de contact de ${name} (${email}) — email envoyé`);
    
    res.status(201).json({
      success: true,
      message: 'Message reçu ! Nous vous répondrons sous 24h.',
    });
  } catch (err) {
    console.error('❌ Erreur envoi email contact:', {
      message: err.message,
      code: err.code,
      command: err.command,
      hasMailUser: !!process.env.MAIL_USER,
      hasMailPass: !!process.env.MAIL_PASS,
    });
    res.status(500).json({ 
      error: 'Erreur lors de l\'envoi de l\'email.', 
      details: err.message,
      code: err.code,
    });
  }
});

// ─── POST /api/orders — Commande Boutique ─────────────────────────────────────
app.post('/api/orders', async (req, res) => {
  const { customer, items, total } = req.body;

  if (!customer?.name || !customer?.email || !items?.length) {
    return res.status(400).json({ error: 'Données de commande incomplètes.' });
  }

  // Générer un ID de commande unique
  const orderId = 'GF-' + Date.now().toString(36).toUpperCase();
  const order = { id: orderId, customer, items, total };

  // Envoyer les emails AVANT de répondre, sinon Vercel coupe la fonction serverless
  try {
    await Promise.all([
      sendOwnerNotification(order),
      sendClientInvoice(order),
    ]);
    console.log(`✅ Commande ${orderId} — emails envoyés à ${customer.email}`);
    
    res.status(201).json({
      success: true,
      orderId,
      message: `Commande confirmée ! Une facture vous a été envoyée à ${customer.email}`,
    });
  } catch (err) {
    console.error('❌ Erreur envoi email commande:', {
      message: err.message,
      code: err.code,
      command: err.command,
      hasMailUser: !!process.env.MAIL_USER,
      hasMailPass: !!process.env.MAIL_PASS,
    });
    res.status(500).json({
      error: 'Erreur lors de l\'envoi de la confirmation par email.',
      details: err.message,
      code: err.code,
    });
  }
});

// ─── Déploiement : Servir l'application React ─────────────────────────────────
// En production locale ou Render, le backend sert les fichiers statiques.
// Sur Vercel, c'est désactivé car Vercel gère les fichiers statiques nativement.
if (process.env.NODE_ENV === 'production' && !process.env.VERCEL) {
  // Le chemin vers le dossier dist de React (construit)
  const frontendPath = path.join(__dirname, '../frontend/dist');
  app.use(express.static(frontendPath));

  // Toutes les requêtes non-API retournent index.html (pour React Router)
  app.get('*', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
  });
}

// Sur Vercel, on n'utilise pas app.listen. Vercel exécute l'application serverless.
if (!process.env.VERCEL) {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

export default app;
