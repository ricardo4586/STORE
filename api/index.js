const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();

// --- CONFIGURACIÓN DE SUPABASE ---
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE; 
const supabase = createClient(supabaseUrl, supabaseKey);

// --- MIDDLEWARES ---
app.use(cors({
    origin: ['https://panterastore.vercel.app', 'http://localhost:5173'], // Permitimos local para tus pruebas
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json());

// --- RUTAS ---

// 1. Salud del servidor
app.get('/api', (req, res) => {
    res.send('Servidor de Pantera Store en Vercel + Supabase funcionando 🚀');
});

// 2. Obtener TODO el catálogo
app.get('/api/productos', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('productos')
            .select('*')
            .order('created_at', { ascending: false }); // Los más nuevos primero

        if (error) throw error;
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener productos', details: error.message });
    }
});

// 3. Obtener productos por CATEGORÍA (Para tus páginas de Arcanos, Climas, etc.)
app.get('/api/productos/categoria/:cat', async (req, res) => {
    const { cat } = req.params;
    try {
        const { data, error } = await supabase
            .from('productos')
            .select('*')
            .ilike('categoria', cat); // ilike no distingue entre mayúsculas y minúsculas

        if (error) throw error;
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error al filtrar', details: error.message });
    }
});

// 4. Obtener un solo producto (Para la vista de detalle)
app.get('/api/productos/:id', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('productos')
            .select('*')
            .eq('id', req.params.id)
            .single();

        if (error) throw error;
        res.json(data);
    } catch (error) {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});

// --- CONFIGURACIÓN PARA VERCEL ---
module.exports = app;