import React, { useState, useEffect } from 'react'; // Agregamos useEffect
import axios from 'axios'; // Importamos axios
import ProductoCard from '../components/ProductoCard';
import BackgroundVideo from '../components/BackgroundVideo';

const Climas = () => {
  // 1. Estados iniciales vacíos para la DB
  const [climasData, setClimasData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtroTipo, setFiltroTipo] = useState("TODOS");

  const tiposClimas = [
    "Ash (ceniza)", "Aurora (aurora boreal)", "Autumn (otoño)",
    "Harvest (cosecha)", "Moonbeam (rayo de luna)", "Pestilence (peste)",
    "Rain (lluvia)", "Sirocco (viento del desierto)", "Snow (nieve)",
    "Spring (primavera)"
  ];

  // 2. Efecto para obtener datos del servidor
  useEffect(() => {
    const obtenerClimas = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/productos');
        
        // Filtramos para obtener solo los productos marcados como 'climas'
        const soloClimas = res.data.filter(item => item.categoria === 'climas');
        
        setClimasData(soloClimas);
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar climas:", error);
        setLoading(false);
      }
    };

    obtenerClimas();
  }, []);

  // 3. Filtrado por tipo de clima (basado en el campo 'heroe' o podrías usar 'tipo' si lo mapeas así)
  // Nota: En el modelo que creamos, usamos 'heroe' para el nombre del héroe, 
  // para climas puedes guardar el tipo en ese mismo campo o en 'nombre'.
  const productosFiltrados = climasData.filter(item => {
    return filtroTipo === "TODOS" || item.heroe === filtroTipo;
  });

  return (
    <div style={styles.mainWrapper}>
      <BackgroundVideo videoSrc="/videos/climasvideo.mp4" />

      <div style={styles.contentLayer}>
        <div style={styles.header}>
          <h1 style={styles.title}>EFECTOS DE <span style={{ color: 'var(--neon-cyan)' }}>CLIMA</span></h1>
          <div style={styles.underline}></div>
          <p style={styles.subtitle}>Sincronizado con Base de Datos en Tiempo Real</p>
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
          {loading ? (
            <p style={{textAlign: 'center', gridColumn: '1/-1', color: 'var(--neon-cyan)'}}>Cargando efectos atmosféricos...</p>
          ) : productosFiltrados.length > 0 ? (
            productosFiltrados.map((item) => (
              <ProductoCard key={item._id} producto={item} />
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
  mainWrapper: { position: 'relative', minHeight: '100vh', overflow: 'hidden' },
  contentLayer: { position: 'relative', zIndex: 1, padding: '60px 5% 100px', backgroundColor: 'transparent' },
  header: { textAlign: 'center', marginBottom: '40px' },
  title: { fontSize: '2.5rem', fontWeight: '900', letterSpacing: '2px', textTransform: 'uppercase', color: 'white', textShadow: '0 0 15px rgba(0, 242, 255, 0.5)' },
  underline: { height: '4px', width: '100px', background: 'var(--neon-cyan)', margin: '10px auto 20px', boxShadow: '0 0 10px var(--neon-cyan)' },
  subtitle: { color: '#ddd', marginBottom: '20px', letterSpacing: '1px', textShadow: '1px 1px 3px black' },
  filterBar: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', marginBottom: '50px', background: 'rgba(10, 10, 12, 0.7)', backdropFilter: 'blur(8px)', padding: '25px', borderRadius: '15px', border: '1px solid rgba(0, 242, 255, 0.2)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' },
  label: { fontSize: '0.75rem', color: 'var(--neon-cyan)', fontWeight: 'bold', letterSpacing: '2px' },
  selectInput: { padding: '12px 20px', borderRadius: '8px', border: '1px solid #444', backgroundColor: 'rgba(0,0,0,0.8)', color: '#fff', fontSize: '1rem', cursor: 'pointer', width: '100%', maxWidth: '350px', outline: 'none' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '35px', maxWidth: '1200px', margin: '0 auto' },
  noResult: { gridColumn: '1/-1', textAlign: 'center', padding: '60px', color: '#aaa', background: 'rgba(0,0,0,0.4)', borderRadius: '15px' }
};

export default Climas;