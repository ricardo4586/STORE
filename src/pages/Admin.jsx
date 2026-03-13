import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const [productos, setProductos] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const navigate = useNavigate();
  
  // Catálogo de héroes actualizado
  const opcionesPorCategoria = {
    arcanos: ["Crystal Maiden", "Dread Retribution", "Faceless Void", "Io", "Juggernaut", "Lina", "Monkey King", "Ogre Magi", "Phantom Assassin", "Pudge", "Queen of Pain", "Razor", "Rubick", "Shadow Fiend", "Spectre", "Techies", "Windranger", "Wraith King", "Zeus"].sort(),
    climas: ["Ash (ceniza)", "Aurora", "Autumn", "Harvest", "Moonbeam", "Pestilence", "Rain", "Sirocco", "Snow", "Spring"],
    inmortales: ["Abaddon", "Alchemist", "Ancient Apparition", "Anti-Mage", "Arc Warden", "Axe", "Bane", "Batrider", "Beastmaster", "Bloodseeker", "Bounty Hunter", "Brewmaster", "Bristleback", "Centaur Warrunner", "Chaos Knight", "Chen", "Clinkz", "Clockwerk", "Crystal Maiden", "Dark Seer", "Dark Willow", "Dazzle", "Death Prophet", "Disruptor", "Doom", "Dragon Knight", "Drow Ranger", "Earth Spirit", "Earthshaker", "Ember Spirit", "Enchantress", "Enigma", "Faceless Void", "Gyrocopter", "Huskar", "Invoker", "Jakiro", "Juggernaut", "Keeper of the Light", "Kunkka", "Legion Commander", "Leshrac", "Lich", "Lifestealer", "Lina", "Lion", "Luna", "Magnus", "Mars", "Medusa", "Meepo", "Monkey King", "Morphling", "Naga Siren", "Nature's Prophet", "Necrophos", "Night Stalker", "Ogre Magi", "Omniknight", "Oracle", "Outworld Destroyer", "Phantom Assassin", "Phantom Lancer", "Puck", "Pugna", "Pudge", "Queen of Pain", "Razor", "Riki", "Rubick", "Sand King", "Shadow Demon", "Shadow Fiend", "Shadow Shaman", "Silencer", "Skywrath Mage", "Slardar", "Slark", "Sniper", "Spectre", "Spirit Breaker", "Storm Spirit", "Sven", "Techies", "Templar Assassin", "Terrorblade", "Tidehunter", "Tinker", "Tiny", "Treant Protector", "Troll Warlord", "Tusk", "Underlord", "Undying", "Ursa", "Vengeful Spirit", "Venomancer", "Viper", "Warlock", "Weaver", "Windranger", "Winter Wyvern", "Witch Doctor", "Wraith King", "Zeus"].sort(),
    sets: ["Abaddon", "Alchemist", "Ancient Apparition", "Anti-Mage", "Arc Warden", "Axe", "Bane", "Batrider", "Beastmaster", "Bloodseeker", "Bounty Hunter", "Brewmaster", "Bristleback", "Broodmother", "Centaur Warrunner", "Chaos Knight", "Chen", "Clinkz", "Clockwerk", "Crystal Maiden", "Dark Seer", "Dark Willow", "Dawnbreaker", "Dazzle", "Death Prophet", "Disruptor", "Doom", "Dragon Knight", "Drow Ranger", "Earth Spirit", "Earthshaker", "Elder Titan", "Ember Spirit", "Enchantress", "Enigma", "Faceless Void", "Grimstroke", "Gyrocopter", "Hoodwink", "Huskar", "Invoker", "Io", "Jakiro", "Juggernaut", "Keeper of the Light", "Kunkka", "Legion Commander", "Leshrac", "Lich", "Lifestealer", "Lina", "Lion", "Lone Druid", "Luna", "Lycan", "Magnus", "Marci", "Mars", "Medusa", "Meepo", "Mirana", "Monkey King", "Morphling", "Muerta", "Naga Siren", "Nature's Prophet", "Necrophos", "Night Stalker", "Nyx Assassin", "Ogre Magi", "Omniknight", "Oracle", "Outworld Destroyer", "Pangolier", "Phantom Assassin", "Phantom Lancer", "Phoenix", "Primal Beast", "Puck", "Pudge", "Pugna", "Queen of Pain", "Razor", "Riki", "Rubick", "Sand King", "Shadow Demon", "Shadow Fiend", "Shadow Shaman", "Silencer", "Skywrath Mage", "Slardar", "Slark", "Snapfire", "Sniper", "Spectre", "Spirit Breaker", "Storm Spirit", "Sven", "Techies", "Templar Assassin", "Terrorblade", "Tidehunter", "Timbersaw", "Tinker", "Tiny", "Treant Protector", "Troll Warlord", "Tusk", "Underlord", "Undying", "Ursa", "Vengeful Spirit", "Venomancer", "Viper", "Visage", "Void Spirit", "Warlock", "Weaver", "Windranger", "Winter Wyvern", "Witch Doctor", "Wraith King", "Zeus"].sort()
  };

  const [form, setForm] = useState({
    nombre: '', heroe: '', precio: '', rareza: '', imagenUrl: '', categoria: 'sets'
  });

  const API_URL = "http://localhost:5000/api/productos";

  useEffect(() => { listarProductos(); }, []);

  // Control de cambio de categoría: Si es courier, deja el campo libre
  useEffect(() => {
    if (!editandoId) {
      if (form.categoria === 'couriers') {
        setForm(prev => ({ ...prev, heroe: '' }));
      } else {
        setForm(prev => ({ ...prev, heroe: opcionesPorCategoria[prev.categoria][0] }));
      }
    }
  }, [form.categoria, editandoId]);

  const listarProductos = async () => {
    try {
      const res = await axios.get(API_URL);
      setProductos(res.data);
    } catch (err) { console.error(err); }
  };

  const manejarArchivo = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => { setForm({ ...form, imagenUrl: reader.result }); };
    if (file) reader.readAsDataURL(file);
  };

  const cerrarSesion = () => {
    localStorage.removeItem('adminToken');
    navigate('/login');
  };

  const prepararEdicion = (producto) => {
    setEditandoId(producto._id);
    setForm({ ...producto });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const guardarProducto = async (e) => {
    e.preventDefault();
    try {
      if (editandoId) {
        await axios.put(`${API_URL}/${editandoId}`, form);
        alert("¡Producto actualizado!");
      } else {
        await axios.post(API_URL, form);
        alert("¡Producto creado!");
      }
      cancelarEdicion();
      listarProductos();
    } catch (err) { alert("Error al guardar"); }
  };

  const cancelarEdicion = () => {
    setEditandoId(null);
    setForm({ nombre: '', heroe: '', precio: '', rareza: '', imagenUrl: '', categoria: 'sets' });
  };

  const eliminarProducto = async (id) => {
    if (window.confirm("¿Eliminar este item?")) {
      await axios.delete(`${API_URL}/${id}`);
      listarProductos();
    }
  };

  return (
    <div style={styles.adminContainer}>
      <div style={styles.header}>
        <h1 style={styles.title}>Panel de Control <span style={{color:'var(--neon-cyan)'}}>PANTERA</span></h1>
        <button onClick={cerrarSesion} style={styles.btnLogOut}>CERRAR SESIÓN</button>
      </div>
      
      <div style={styles.layout}>
        <form onSubmit={guardarProducto} style={styles.form}>
          <h3 style={{color: editandoId ? '#ffd700' : 'var(--neon-cyan)'}}>
            {editandoId ? '✏️ Modo Edición' : '➕ Nuevo Registro'}
          </h3>
          
          <label style={styles.label}>Categoría:</label>
          <select value={form.categoria} onChange={e => setForm({...form, categoria: e.target.value})} style={styles.input}>
            <option value="sets">Sets</option>
            <option value="arcanos">Arcanos</option>
            <option value="inmortales">Inmortales</option>
            <option value="climas">Climas</option>
            <option value="couriers">Couriers</option>
          </select>

          <label style={styles.label}>Héroe / Nombre Courier:</label>
          {form.categoria === 'couriers' ? (
            <input 
              type="text" 
              placeholder="Nombre del Courier" 
              value={form.heroe} 
              required 
              onChange={e => setForm({...form, heroe: e.target.value})} 
              style={styles.input} 
            />
          ) : (
            <select value={form.heroe} onChange={e => setForm({...form, heroe: e.target.value})} style={styles.input}>
              {opcionesPorCategoria[form.categoria]?.map(h => <option key={h} value={h}>{h}</option>)}
            </select>
          )}

          <input type="text" placeholder="Nombre del Item" value={form.nombre} required onChange={e => setForm({...form, nombre: e.target.value})} style={styles.input} />
          <input type="number" placeholder="Precio ($)" value={form.precio} required onChange={e => setForm({...form, precio: e.target.value})} style={styles.input} />
          <input type="text" placeholder="Rareza" value={form.rareza} required onChange={e => setForm({...form, rareza: e.target.value})} style={styles.input} />
          
          <label style={styles.label}>Imagen:</label>
          <input type="file" accept="image/*" onChange={manejarArchivo} style={styles.input} />
          
          {form.imagenUrl && (
            <div style={{textAlign: 'center'}}>
               <img src={form.imagenUrl} alt="Preview" style={{width: '80px', height: '60px', objectFit: 'cover', borderRadius: '5px', border: '1px solid var(--neon-cyan)'}} />
            </div>
          )}

          <button type="submit" style={editandoId ? styles.btnUpdate : styles.btnSave}>
            {editandoId ? 'ACTUALIZAR CAMBIOS' : 'GUARDAR EN BASE'}
          </button>
          {editandoId && <button type="button" onClick={cancelarEdicion} style={styles.btnCancel}>CANCELAR</button>}
        </form>

        <div style={styles.tableWrapper}>
          <h3>Inventario ({productos.length})</h3>
          <div style={{maxHeight: '600px', overflowY: 'auto'}}>
            <table style={styles.table}>
              <thead>
                <tr style={{borderBottom: '1px solid #333', color: '#888', fontSize: '0.8rem'}}>
                  <th style={{padding: '10px'}}>Item</th>
                  <th style={{padding: '10px'}}>Héroe</th>
                  <th style={{padding: '10px'}}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.map(p => (
                  <tr key={p._id} style={styles.tr}>
                    <td style={{padding: '10px', display: 'flex', alignItems: 'center', gap: '10px'}}>
                      <img src={p.imagenUrl} style={{width:'40px', height:'30px', objectFit: 'cover', borderRadius:'3px'}} />
                      <span style={{fontSize: '0.85rem'}}>{p.nombre}</span>
                    </td>
                    <td style={{padding: '10px', fontSize: '0.8rem', color: '#ccc'}}>{p.heroe}</td>
                    <td style={styles.actions}>
                      <button onClick={() => prepararEdicion(p)} style={styles.btnEdit}>✏️</button>
                      <button onClick={() => eliminarProducto(p._id)} style={styles.btnDel}>🗑️</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
    adminContainer: { padding: '80px 5%', backgroundColor: '#0a0a0b', minHeight: '100vh', color: 'white' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' },
    btnLogOut: { backgroundColor: '#ff4d4d', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' },
    title: { margin: 0 },
    layout: { display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '30px' },
    form: { background: '#151517', padding: '25px', borderRadius: '15px', display: 'flex', flexDirection: 'column', gap: '12px', border: '1px solid #333', position: 'sticky', top: '100px' },
    label: { fontSize: '0.75rem', color: '#666', marginBottom: '-5px', textTransform: 'uppercase' },
    input: { padding: '10px', borderRadius: '8px', border: '1px solid #333', backgroundColor: '#000', color: 'white', outline: 'none' },
    btnSave: { padding: '15px', backgroundColor: 'var(--neon-cyan)', color: 'black', fontWeight: 'bold', border: 'none', borderRadius: '8px', cursor: 'pointer', marginTop: '10px' },
    btnUpdate: { padding: '15px', backgroundColor: '#ffd700', color: 'black', fontWeight: 'bold', border: 'none', borderRadius: '8px', cursor: 'pointer', marginTop: '10px' },
    btnCancel: { padding: '10px', backgroundColor: '#333', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', marginTop: '5px' },
    tableWrapper: { background: '#151517', padding: '25px', borderRadius: '15px', border: '1px solid #333' },
    table: { width: '100%', borderCollapse: 'collapse' },
    tr: { borderBottom: '1px solid #222' },
    actions: { display: 'flex', gap: '8px', padding: '10px' },
    btnEdit: { backgroundColor: '#3498db', border: 'none', padding: '8px', borderRadius: '5px', cursor: 'pointer' },
    btnDel: { backgroundColor: '#e74c3c', border: 'none', padding: '8px', borderRadius: '5px', cursor: 'pointer' }
};

export default Admin;