import express from 'express';
import supabase from '../../db.js';

const router = express.Router();

// 1. Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('productos')
      .select('*')
      .order('id', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener productos", error: error.message });
  }
});

// 2. Obtener producto por ID
router.get('/:id', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('productos')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (error) throw error;
    if (!data) return res.status(404).json({ message: "Producto no encontrado" });

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener producto", error: error.message });
  }
});

// 3. Crear un nuevo producto
router.post('/', async (req, res) => {
  try {
    const { nombre, heroe, precio, rareza, imagen_url, categoria, stock } = req.body;

    if (!nombre || !heroe || !precio || !rareza || !imagen_url || !categoria) {
      return res.status(400).json({ message: "Faltan campos requeridos" });
    }

    const { data, error } = await supabase
      .from('productos')
      .insert([{
        nombre,
        heroe,
        precio,
        rareza,
        imagen_url,
        categoria,
        stock: stock !== undefined ? stock : true
      }])
      .select();

    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (error) {
    res.status(400).json({ message: "Error al crear producto", error: error.message });
  }
});

// 4. Actualizar un producto
router.put('/:id', async (req, res) => {
  try {
    const { nombre, heroe, precio, rareza, imagen_url, categoria, stock } = req.body;

    const { data, error } = await supabase
      .from('productos')
      .update({
        nombre,
        heroe,
        precio,
        rareza,
        imagen_url,
        categoria,
        stock
      })
      .eq('id', req.params.id)
      .select();

    if (error) throw error;
    if (!data || data.length === 0) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json(data[0]);
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar producto", error: error.message });
  }
});

// 5. Eliminar un producto
router.delete('/:id', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('productos')
      .delete()
      .eq('id', req.params.id)
      .select();

    if (error) throw error;
    if (!data || data.length === 0) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json({ message: "Producto eliminado correctamente", producto: data[0] });
  } catch (error) {
    res.status(400).json({ message: "Error al eliminar producto", error: error.message });
  }
});

// 6. Filtrar por categoría
router.get('/categoria/:cat', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('productos')
      .select('*')
      .ilike('categoria', `%${req.params.cat}%`);

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error al filtrar productos", error: error.message });
  }
});

export default router;