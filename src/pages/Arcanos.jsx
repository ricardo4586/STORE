import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductoCard from '../components/ProductoCard';
import BackgroundVideo from '../components/BackgroundVideo';

const Arcanos = () => {
  // 1. Estados: arcanosData ahora empieza como un array vacío
  const [arcanosData, setArcanosData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [heroeSeleccionado, setHeroeSeleccionado] = useState("TODOS");

  const listaArcanosHéroes = [
    "Lina", "Legion Commander", "Techies", "Phantom Assassin", 
    "Crystal Maiden", "Zeus", "Monkey King", "Juggernaut", 
    "Rubick", "Ogre Magi", "Pudge", "Wraith King", 
    "Windranger", "Earthshaker"
  ].sort();

  // 2. Efecto para traer los datos del Backend al cargar la página
  useEffect(() => {
    const obtenerArcanos = async () => {
      try {
        // Llamada a tu servidor local
        const res = await axios.get('http://localhost:5000/api/productos');
        
        // Filtramos para que esta página solo muestre la categoría 'arcanos'
        const soloArcanos = res.data.filter(item => item.categoria === 'arcanos');
        
        setArcanosData(soloArcanos);
        setLoading(false);
      } catch (error) {
        console.error("Error al conectar con el servidor:", error);
        setLoading(false);
      }
    };

    obtenerArcanos();
  }, []);

  // 3. Lógica de filtrado por héroe (sobre los datos de la DB)
  const productosFiltrados = arcanosData.filter(item => {
    return heroeSeleccionado === "TODOS" || item.heroe === heroeSeleccionado;
  });

  return (
    <div style={styles.mainWrapper}>
      {/* 1. VIDEO DE FONDO */}
      <BackgroundVideo videoSrc="/videos/arcanovideo.mp4" />

      <div style={styles.contentLayer}>
        <div style={styles.header}>
          <h1 style={styles.title}>OBJETOS <span style={{ color: 'var(--neon-purple)' }}>ARCANOS</span></h1>
          <div style={styles.underline}></div>
          <p style={styles.subtitle}>Sincronizado con Base de Datos en Tiempo Real</p>
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
            {listaArcanosHéroes.map(heroe => (
              <option key={heroe} value={heroe}>{heroe}</option>
            ))}
          </select>
        </div>

        {/* --- GRID DE RESULTADOS --- */}
        <div style={styles.grid}>
          {loading ? (
            <div style={styles.noResult}>
              <p>Conectando con el servidor...</p>
            </div>
          ) : productosFiltrados.length > 0 ? (
            productosFiltrados.map((item) => (
              // Importante: Usamos item._id porque así lo genera MongoDB
              <ProductoCard key={item._id} producto={item} />
            ))
          ) : (
            <div style={styles.noResult}>
              <p>No se encontraron Arcanos para <strong>{heroeSeleccionado}</strong> en la base de datos.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- MISMOS ESTILOS QUE YA TENÍAS ---
const styles = {
  mainWrapper: { position: 'relative', minHeight: '100vh', overflow: 'hidden' },
  contentLayer: { position: 'relative', zIndex: 1, padding: '60px 5% 100px', backgroundColor: 'transparent' },
  header: { textAlign: 'center', marginBottom: '40px' },
  title: { fontSize: '2.5rem', fontWeight: '900', letterSpacing: '2px', textTransform: 'uppercase', color: 'white' },
  underline: { height: '4px', width: '100px', background: 'var(--neon-purple)', margin: '10px auto 20px', boxShadow: '0 0 15px var(--neon-purple)' },
  subtitle: { color: '#ccc', marginBottom: '20px', textShadow: '1px 1px 5px black' },
  filterBar: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', marginBottom: '50px', background: 'rgba(10, 10, 12, 0.7)', backdropFilter: 'blur(8px)', padding: '25px', borderRadius: '15px', border: '1px solid rgba(188, 19, 254, 0.3)', boxShadow: '0 5px 20px rgba(0, 0, 0, 0.5)' },
  label: { fontSize: '0.8rem', color: 'var(--neon-purple)', fontWeight: 'bold', letterSpacing: '2px' },
  selectInput: { padding: '12px 25px', borderRadius: '8px', border: '1px solid var(--neon-purple)', backgroundColor: 'rgba(0, 0, 0, 0.8)', color: 'white', fontSize: '1rem', cursor: 'pointer', width: '100%', maxWidth: '350px', outline: 'none' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '35px', maxWidth: '1200px', margin: '0 auto' },
  noResult: { gridColumn: '1/-1', textAlign: 'center', padding: '60px', color: '#eee', background: 'rgba(0,0,0,0.5)', borderRadius: '15px' }
};

export default Arcanos;