const mongoose = require('mongoose');

const ProductoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    precio: { type: Number, required: true },
    imagenUrl: { type: String, required: true }, // Aquí irá el link de Cloudinary
    descripcion: String,
    categoria: String,
    fechaCreacion: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Producto', ProductoSchema);