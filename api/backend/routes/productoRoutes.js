import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import supabase from '../../config/db.js';
import productoRoutes from './backend/routes/productoRoutes.js';

dotenv.config();

const app = express();

// --- MIDDLEWARES ---
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// --- RUTAS DE SALUD ---
app.get('/api', (req, res) => {
  res.json({ mensaje: 'Servidor de Pantera Store operativo 🚀' });
});

// --- RUTAS DE PRODUCTOS ---
app.use('/api/productos', productoRoutes);

// --- RUTA DE LOGIN ADMIN ---
app.post('/api/login', (req, res) => {
  const { user, pass } = req.body;
  const ADMIN_USER = "admin";
  const ADMIN_PASS = "pantera2024";

  if (user === ADMIN_USER && pass === ADMIN_PASS) {
    res.json({ success: true, token: "PANTERA_SESSION_TOKEN_2026" });
  } else {
    res.status(401).json({ success: false, message: "Credenciales inválidas" });
  }
});

// --- MANEJO DE ERRORES 404 ---
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// EXPORTAR PARA VERCEL
export default app;