import React, { useState } from 'react';
import ProductoCard from '../components/ProductoCard';
import BackgroundVideo from '../components/BackgroundVideo';

const Climas = () => {
  const tiposClimas = [
    "Ash (ceniza)",
    "Aurora (aurora boreal)",
    "Autumn (otoño)",
    "Harvest (cosecha)",
    "Moonbeam (rayo de luna)",
    "Pestilence (peste)",
    "Rain (lluvia)",
    "Sirocco (viento del desierto)",
    "Snow (nieve)",
    "Spring (primavera)"
  ];

  const [climasData] = useState([
    { id: 401, nombre: "Weather Ash", tipo: "Ash (ceniza)", precio: 12.00, rareza: "RARE", imagenUrl: "https://via.placeholder.com/300x200?text=Weather+Ash" },
    { id: 402, nombre: "Weather Rain", tipo: "Rain (lluvia)", precio: 15.00, rareza: "RARE", imagenUrl: "https://via.placeholder.com/300x200?text=Weather+Rain" },
    { id: 403, nombre: "Weather Aurora", tipo: "Aurora (aurora boreal)", precio: 18.00, rareza: "RARE", imagenUrl: "https://via.placeholder.com/300x200?text=Weather+Aurora" },
  ]);

  const [filtroTipo, setFiltroTipo] = useState("TODOS");

  const productosFiltrados = climasData.filter(item => {
    return filtroTipo === "TODOS" || item.tipo === filtroTipo;
  });

  return (
    <div style={styles.mainWrapper}>
      {/* 1. VIDEO DE FONDO - Usando la misma ruta que en Arcanos */}
      <BackgroundVideo videoSrc="public/videos/setcachevideo.mp4" />

      <div style={styles.contentLayer}>
        <div style={styles.header}>
          <h1 style={styles.title}>EFECTOS DE <span style={{ color: 'var(--neon-cyan)' }}>CLIMA</span></h1>
          <div style={styles.underline}></div>
          <p style={styles.subtitle}>Personaliza el ambiente de tu mapa</p>
        </div>

        {/* --- SELECTOR DE TIPO DE CLIMA --- */}
        <div style={styles.filterBar}>
          <label style={styles.label}>TIPO DE EFECTO:</label>
          <select 
            style={styles.selectInput}
            onChange={(e) => setFiltroTipo(e.target.value)}
            value={filtroTipo}
          >
            <option value="TODOS">-- TODOS LOS CLIMAS --</option>
            {tiposClimas.map(clima => (
              <option key={clima} value={clima}>{clima}</option>
            ))}
          </select>
        </div>

        {/* --- GRID DE PRODUCTOS --- */}
        <div style={styles.grid}>
          {productosFiltrados.length > 0 ? (
            productosFiltrados.map((item) => (
              <ProductoCard key={item.id} producto={item} />
            ))
          ) : (
            <div style={styles.noResult}>
              <p>No hay stock disponible para el clima: <strong>{filtroTipo}</strong></p>
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
    overflow: 'hidden', // Igual que en Arcanos
  },
  contentLayer: {
    position: 'relative',
    zIndex: 1, // Por encima del video
    padding: '60px 5% 100px',
    backgroundColor: 'transparent', // CLAVE: Debe ser transparente para ver el video
  },
  header: { textAlign: 'center', marginBottom: '40px' },
  title: { fontSize: '2.5rem', fontWeight: '900', letterSpacing: '2px', textTransform: 'uppercase', color: 'white', textShadow: '0 0 15px rgba(0, 242, 255, 0.5)' },
  underline: { height: '4px', width: '100px', background: 'var(--neon-cyan)', margin: '10px auto 20px', boxShadow: '0 0 10px var(--neon-cyan)' },
  subtitle: { color: '#ddd', marginBottom: '20px', letterSpacing: '1px', textShadow: '1px 1px 3px black' },
  
  filterBar: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '50px',
    background: 'rgba(10, 10, 12, 0.7)', // Transparencia oscura
    backdropFilter: 'blur(8px)', // Efecto cristal
    padding: '25px',
    borderRadius: '15px',
    border: '1px solid rgba(0, 242, 255, 0.2)',
    boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
  },
  label: { fontSize: '0.75rem', color: 'var(--neon-cyan)', fontWeight: 'bold', letterSpacing: '2px' },
  selectInput: {
    padding: '12px 20px',
    borderRadius: '8px',
    border: '1px solid #444',
    backgroundColor: 'rgba(0,0,0,0.8)',
    color: '#fff',
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
    color: '#aaa', 
    background: 'rgba(0,0,0,0.4)',
    borderRadius: '15px' 
  }
};

export default Climas;