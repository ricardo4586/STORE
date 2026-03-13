import React, { useState } from 'react';
import ProductoCard from '../components/ProductoCard';

const Inmortales = () => {
  // 1. Tu lista específica de héroes que tienen Inmortales
  const heroesConInmortales = [
    "Axe", "Anti-Mage", "Beastmaster", "Brewmaster", "Bristleback", 
    "Chaos Knight", "Clockwerk", "Dragon Knight", "Earthshaker", 
    "Invoker", "Juggernaut", "Kunkka", "Legion Commander", 
    "Lifestealer", "Lycan", "Magnus", "Mars", "Monkey King", 
    "Ogre Magi", "Omniknight", "Phantom Lancer", "Pudge", 
    "Shadow Fiend", "Sniper", "Spirit Breaker", "Sven", 
    "Tidehunter", "Tiny", "Tusk", "Ursa", "Wraith King"
  ].sort(); // Los ordenamos alfabéticamente automáticamente

  // 2. Datos de ejemplo para Inmortales
  const [inmortalesData] = useState([
    { id: 501, nombre: "Golden Basher Blades", heroe: "Anti-Mage", precio: 25.00, rareza: "INMORTAL", imagenUrl: "https://via.placeholder.com/300x200?text=AM+Inmortal" },
    { id: 502, nombre: "Sullen Hollow", heroe: "Necrophos", precio: 12.50, rareza: "INMORTAL", imagenUrl: "https://via.placeholder.com/300x200?text=Necro+Inmortal" },
    { id: 503, nombre: "Solar Forge", heroe: "Phoenix", precio: 18.00, rareza: "INMORTAL", imagenUrl: "https://via.placeholder.com/300x200?text=Phoenix+Inmortal" },
  ]);

  // 3. Estados para los filtros
  const [heroeSeleccionado, setHeroeSeleccionado] = useState("TODOS");

  // 4. Lógica de filtrado
  const productosFiltrados = inmortalesData.filter(item => {
    return heroeSeleccionado === "TODOS" || item.heroe === heroeSeleccionado;
  });

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.title}>ITEMS <span style={{ color: 'var(--neon-cyan)' }}>INMORTALES</span></h1>
        <div style={styles.underline}></div>
        <p style={styles.subtitle}>Filtra por héroe para encontrar tu Inmortal</p>
      </div>

      {/* --- SELECTOR DE HÉROES ESPECÍFICO --- */}
      <div style={styles.filterBar}>
        <label style={styles.label}>SELECCIONA HÉROE:</label>
        <select 
          style={styles.selectInput}
          onChange={(e) => setHeroeSeleccionado(e.target.value)}
          value={heroeSeleccionado}
        >
          <option value="TODOS">-- TODOS LOS HÉROES --</option>
          {heroesConInmortales.map(heroe => (
            <option key={heroe} value={heroe}>{heroe}</option>
          ))}
        </select>
      </div>

      {/* --- REJILLA DE RESULTADOS --- */}
      <div style={styles.grid}>
        {productosFiltrados.length > 0 ? (
          productosFiltrados.map((item) => (
            <ProductoCard key={item.id} producto={item} />
          ))
        ) : (
          <div style={styles.noResult}>
            <p>No hay Inmortales disponibles para {heroeSeleccionado} en este momento.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  page: { padding: '60px 5% 100px', backgroundColor: '#0a0a0b', minHeight: '100vh', color: 'white' },
  header: { textAlign: 'center', marginBottom: '40px' },
  title: { fontSize: '2.5rem', fontWeight: '900', letterSpacing: '2px', textTransform: 'uppercase' },
  underline: { height: '4px', width: '100px', background: 'var(--neon-cyan)', margin: '10px auto 20px' },
  subtitle: { color: '#888', marginBottom: '20px' },
  
  filterBar: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '50px',
    background: '#151517',
    padding: '20px',
    borderRadius: '12px',
    border: '1px solid #333'
  },
  label: { fontSize: '0.8rem', color: 'var(--neon-cyan)', fontWeight: 'bold', letterSpacing: '1px' },
  selectInput: {
    padding: '12px 25px',
    borderRadius: '8px',
    border: '1px solid var(--neon-cyan)',
    backgroundColor: '#000',
    color: 'white',
    fontSize: '1rem',
    cursor: 'pointer',
    width: '100%',
    maxWidth: '300px',
    outline: 'none',
    boxShadow: '0 0 10px rgba(0, 242, 255, 0.2)'
  },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '35px', maxWidth: '1200px', margin: '0 auto' },
  noResult: { gridColumn: '1/-1', textAlign: 'center', padding: '50px', color: '#555', border: '1px dashed #333', borderRadius: '10px' }
};

export default Inmortales;