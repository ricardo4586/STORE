const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conexión a MongoDB (Luego pondremos la URL real en el .env)
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Servidor del Catálogo funcionando 🚀');
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});