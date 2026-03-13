import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductoCard from '../components/ProductoCard';
import BackgroundVideo from '../components/BackgroundVideo';

const Couriers = () => {
  const [couriersData, setCouriersData] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Cargar datos del Backend al iniciar
  useEffect(() => {
    const obtenerCouriers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/productos');
        
        // Filtramos solo por la categoría 'couriers'
        const soloCouriers = res.data.filter(item => item.categoria === 'couriers');
        
        setCouriersData(soloCouriers);
        setLoading(false);
      } catch (error) {
        console.error("Error al conectar con el servidor:", error);
        setLoading(false);
      }
    };

    obtenerCouriers();
  }, []);

  return (
    <div style={styles.mainWrapper}>
      {/* 2. VIDEO DE FONDO (Puedes cambiar el video por uno de couriers si tienes) */}
      <BackgroundVideo videoSrc="/videos/curriervideo.mp4" />

      <div style={styles.contentLayer}>
        <div style={styles.header}>
          <h1 style={styles.title}>MENSAJEROS / <span style={{ color: 'var(--neon-cyan)' }}>COURIERS</span></h1>
          <div style={styles.underline}></div>
          <p style={styles.subtitle}>Encuentra los mensajeros más exclusivos del juego</p>
        </div>

        {/* --- GRID DE RESULTADOS (Sin filtros, directo al grano) --- */}
        <div style={styles.grid}>
          {loading ? (
            <div style={styles.noResult}>
              <p>Conectando con el almacén de mensajeros...</p>
            </div>
          ) : couriersData.length > 0 ? (
            couriersData.map((item) => (
              <ProductoCard key={item._id} producto={item} />
            ))
          ) : (
            <div style={styles.noResult}>
              <p>Aún no hay Couriers disponibles.</p>
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
  header: { textAlign: 'center', marginBottom: '60px' },
  title: { fontSize: '2.5rem', fontWeight: '900', letterSpacing: '2px', textTransform: 'uppercase', color: 'white' },
  underline: { height: '4px', width: '100px', background: 'var(--neon-cyan)', margin: '10px auto 20px', boxShadow: '0 0 15px var(--neon-cyan)' },
  subtitle: { color: '#ccc', marginBottom: '20px', textShadow: '1px 1px 5px black', letterSpacing: '1px' },
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
    background: 'rgba(0,0,0,0.6)', 
    borderRadius: '15px',
    border: '1px dashed #444' 
  }
};

export default Couriers;