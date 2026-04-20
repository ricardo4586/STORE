import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// --- CONFIGURACIÓN DE SUPABASE ---
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE;
const supabase = createClient(supabaseUrl, supabaseKey);

// --- MIDDLEWARES ---
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// --- RUTAS ---

// 1. Salud del servidor
app.get('/api', (req, res) => {
    res.json({ mensaje: 'Servidor de Pantera Store operativo 🚀' });
});

// 2. Login de Administrador
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

// 3. Obtener todo el catálogo de Dota 2
app.get('/api/productos', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('productos')
            .select('*')
            .order('id', { ascending: false });

        if (error) throw error;
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 4. Filtrar por categoría (Arcanos, Inmortales, etc.)
app.get('/api/productos/categoria/:cat', async (req, res) => {
    const { cat } = req.params;
    try {
        const { data, error } = await supabase
            .from('productos')
            .select('*')
            .ilike('categoria', `%${cat}%`);

        if (error) throw error;
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 5. Agregar producto (POST)
app.post('/api/productos', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('productos')
            .insert([req.body])
            .select();

        if (error) throw error;
        res.status(201).json(data[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// EXPORTAR PARA VERCEL (Obligatorio)
export default app;