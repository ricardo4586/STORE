import React, { useState } from 'react';
import ProductoCard from '../components/ProductoCard';
import BackgroundVideo from '../components/BackgroundVideo'; // Importamos el componente

const Arcanos = () => {
  const listaArcanos = [
    "Lina", "Legion Commander", "Techies", "Phantom Assassin", 
    "Crystal Maiden", "Zeus", "Monkey King", "Juggernaut", 
    "Rubick", "Ogre Magi", "Pudge", "Wraith King", 
    "Windranger", "Earthshaker"
  ].sort();

  const [arcanosData] = useState([
    { id: 601, nombre: "Feast of Abscession", heroe: "Pudge", precio: 135.00, rareza: "ARCANA", imagenUrl: "https://via.placeholder.com/300x200?text=Pudge+Arcana" },
    { id: 602, nombre: "Bladeform Legacy", heroe: "Juggernaut", precio: 125.00, rareza: "ARCANA", imagenUrl: "https://via.placeholder.com/300x200?text=Jugg+Arcana" },
    { id: 603, nombre: "Manifold Paradox", heroe: "Phantom Assassin", precio: 115.00, rareza: "ARCANA", imagenUrl: "https://via.placeholder.com/300x200?text=PA+Arcana" },
    { id: 604, nombre: "The Magus Cypher", heroe: "Rubick", precio: 130.00, rareza: "ARCANA", imagenUrl: "https://via.placeholder.com/300x200?text=Rubick+Arcana" }
  ]);

  const [heroeSeleccionado, setHeroeSeleccionado] = useState("TODOS");

  const productosFiltrados = arcanosData.filter(item => {
    return heroeSeleccionado === "TODOS" || item.heroe === heroeSeleccionado;
  });

  return (
    <div style={styles.mainWrapper}>
      {/* 1. VIDEO DE FONDO */}
      {/* Puedes cambiar este link por un video de Dota 2 que te guste */}
      <BackgroundVideo videoSrc="public/videos/setcachevideo.mp4" />

      <div style={styles.contentLayer}>
        <div style={styles.header}>
          <h1 style={styles.title}>OBJETOS <span style={{ color: 'var(--neon-purple)' }}>ARCANOS</span></h1>
          <div style={styles.underline}></div>
          <p style={styles.subtitle}>El máximo nivel de prestigio para tu inventario</p>
        </div>

        {/* --- SELECTOR DE ARCANOS --- */}
        <div style={styles.filterBar}>
          <label style={styles.label}>BUSCAR POR HÉROE:</label>
          <select 
            style={styles.selectInput}
            onChange={(e) => setHeroeSeleccionado(e.target.value)}
            value={heroeSeleccionado}
          >
            <option value="TODOS">-- TODOS LOS ARCANOS --</option>
            {listaArcanos.map(heroe => (
              <option key={heroe} value={heroe}>{heroe}</option>
            ))}
          </select>
        </div>

        {/* --- GRID DE RESULTADOS --- */}
        <div style={styles.grid}>
          {productosFiltrados.length > 0 ? (
            productosFiltrados.map((item) => (
              <ProductoCard key={item.id} producto={item} />
            ))
          ) : (
            <div style={styles.noResult}>
              <p>Actualmente no contamos con el Arcana de <strong>{heroeSeleccionado}</strong> en stock.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  mainWrapper: {
    position: 'relative',
    minHeight: '100vh',
    overflow: 'hidden'
  },
  contentLayer: {
    position: 'relative',
    zIndex: 1, // Por encima del video
    padding: '60px 5% 100px',
    backgroundColor: 'transparent', // Importante para ver el video
  },
  header: { textAlign: 'center', marginBottom: '40px' },
  title: { fontSize: '2.5rem', fontWeight: '900', letterSpacing: '2px', textTransform: 'uppercase', color: 'white' },
  underline: { height: '4px', width: '100px', background: 'var(--neon-purple)', margin: '10px auto 20px', boxShadow: '0 0 15px var(--neon-purple)' },
  subtitle: { color: '#ccc', marginBottom: '20px', textShadow: '1px 1px 5px black' },
  
  filterBar: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '50px',
    background: 'rgba(10, 10, 12, 0.7)', // Más transparente para lucir el video
    backdropFilter: 'blur(8px)', // Efecto cristal
    padding: '25px',
    borderRadius: '15px',
    border: '1px solid rgba(188, 19, 254, 0.3)', 
    boxShadow: '0 5px 20px rgba(0, 0, 0, 0.5)'
  },
  label: { fontSize: '0.8rem', color: 'var(--neon-purple)', fontWeight: 'bold', letterSpacing: '2px' },
  selectInput: {
    padding: '12px 25px',
    borderRadius: '8px',
    border: '1px solid var(--neon-purple)',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    color: 'white',
    fontSize: '1rem',
    cursor: 'pointer',
    width: '100%',
    maxWidth: '350px',
    outline: 'none',
  },
  grid: { 
    display: 'grid', 
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
    gap: '35px', 
    maxWidth: '1200px', 
    margin: '0 auto' 
  },
  noResult: { 
    gridColumn: '1/-1', 
    textAlign: 'center', 
    padding: '60px', 
    color: '#eee', 
    background: 'rgba(0,0,0,0.5)',
    borderRadius: '15px' 
  }
};

export default Arcanos;