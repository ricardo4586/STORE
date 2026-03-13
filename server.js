import express from 'express';
import conectarDB from './backend/config/db.js';
import cors from 'cors';
import productoRoutes from './backend/routes/productoRoutes.js';

const app = express();

conectarDB();

app.use(cors());

// --- CONFIGURACIÓN DE LÍMITES (Para evitar el "Error al guardar") ---
// Aumentamos a 50mb para que soporte las imágenes de tu galería
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// --- RUTA DE LOGIN SEGURA (Backend) ---
// Ahora la validación ocurre aquí, lejos de los ojos de los curiosos
app.post('/api/login', (req, res) => {
    const { user, pass } = req.body;
    
    // Estos son tus datos maestros. Nadie puede verlos desde el navegador.
    const ADMIN_USER = "admin";
    const ADMIN_PASS = "pantera2024";

    if (user === ADMIN_USER && pass === ADMIN_PASS) {
        res.json({ success: true, token: "PANTERA_SESSION_TOKEN_2026" });
    } else {
        res.status(401).json({ success: false, message: "Credenciales inválidas" });
    }
});

// USAR RUTAS DE PRODUCTOS
app.use('/api/productos', productoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));