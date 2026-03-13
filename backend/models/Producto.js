import mongoose from 'mongoose';

const ProductoSchema = new mongoose.Schema({
  nombre: { 
    type: String, 
    required: [true, "El nombre es obligatorio"] 
  },
  heroe: { 
    type: String, 
    required: [true, "El héroe es obligatorio"] 
  },
  precio: { 
    type: Number, 
    required: [true, "El precio es obligatorio"] 
  },
  rareza: { 
    type: String, 
    required: true 
  },
  imagenUrl: { 
    type: String, 
    required: true 
  },
  categoria: { 
    type: String, 
    required: true,
    enum: ['sets', 'arcanos', 'inmortales', 'climas', 'couriers'] // Solo permite estas categorías
  },
  stock: { 
    type: Boolean, 
    default: true 
  }
}, {
  timestamps: true // Esto crea automáticamente la fecha de creación y actualización
});

// Esta línea es importante para Next.js/Vercel: evita que el modelo se redeclare
const Producto = mongoose.models.Producto || mongoose.model('Producto', ProductoSchema);

export default Producto;