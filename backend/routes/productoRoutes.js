import express from 'express';
import Producto from '../models/Producto.js';

const router = express.Router();

// 1. Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const productos = await Producto.find({});
    res.json(productos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener productos" });
  }
});

// 2. Crear un nuevo producto
router.post('/', async (req, res) => {
  try {
    const nuevoProducto = new Producto(req.body);
    const productoGuardado = await nuevoProducto.save();
    res.status(201).json(productoGuardado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 3. Actualizar un producto
router.put('/:id', async (req, res) => {
  try {
    const productoActualizado = await Producto.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true }
    );
    res.json(productoActualizado);
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar" });
  }
});

// 4. Eliminar un producto
router.delete('/:id', async (req, res) => {
  try {
    await Producto.findByIdAndDelete(req.params.id);
    res.json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(400).json({ message: "Error al eliminar" });
  }
});

export default router;