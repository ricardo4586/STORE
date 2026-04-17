import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import ProductoCard from '../components/ProductoCard';

// Importamos los estilos de Swiper
import 'swiper/css';
import 'swiper/css/effect-fade';

const Arcanos = () => {
  const [arcanosData, setArcanosData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [heroeSeleccionado, setHeroeSeleccionado] = useState("TODOS");

  // Definimos las imágenes de fondo para esta categoría
  const fondosArcanos = [
    "/fondos/arcanos1.png", 
    "/fondos/arcanos2.png", 
    "/fondos/arcanos3.png"
  ];

  const listaArcanosHéroes = [
    "Lina", "Legion Commander", "Techies", "Phantom Assassin", 
    "Crystal Maiden", "Zeus", "Monkey King", "Juggernaut", 
    "Rubick", "Ogre Magi", "Pudge", "Wraith King", 
    "Windranger", "Earthshaker"
  ].sort();

  useEffect(() => {
    const obtenerArcanos = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/productos');
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

  const productosFiltrados = arcanosData.filter(item => {
    return heroeSeleccionado === "TODOS" || item.heroe === heroeSeleccionado;
  });

  return (
    <div style={styles.mainWrapper}>
      {/* --- CARRUSEL DE FONDO --- */}
      <div style={styles.swiperWrapper}>
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect={'fade'}
          speed={2000}
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          loop={true}
          style={styles.swiper}
        >
          {fondosArcanos.map((url, index) => (
            <SwiperSlide key={index}>
              <div style={{ ...styles.slideBackground, backgroundImage: `url(${url})` }} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div style={styles.contentLayer}>
        <div style={styles.header}>
          <h1 style={styles.title}>OBJETOS <span style={{ color: 'var(--neon-purple)' }}>ARCANOS</span></h1>
          <div style={styles.underline}></div>
          <p style={styles.subtitle}>Calidad Suprema para tus Héroes</p>
        </div>

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

        <div style={styles.grid}>
          {loading ? (
            <div style={styles.noResult}><p>Cargando Arcanos...</p></div>
          ) : productosFiltrados.length > 0 ? (
            productosFiltrados.map((item) => (
              <ProductoCard key={item._id} producto={item} />
            ))
          ) : (
            <div style={styles.noResult}>
              <p>No hay stock para <strong>{heroeSeleccionado}</strong> actualmente.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  mainWrapper: { position: 'relative', minHeight: '100vh', backgroundColor: '#000' },
  // Estilos del carrusel de fondo
  swiperWrapper: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 },
  swiper: { width: '100%', height: '100%' },
  slideBackground: { 
    width: '100%', height: '100%', backgroundSize: 'cover', backgroundPosition: 'center', 
    filter: 'brightness(0.4)' // Oscurecemos la imagen para que resalten las cartas
  },
  contentLayer: { position: 'relative', zIndex: 1, padding: '120px 5% 100px' },
  header: { textAlign: 'center', marginBottom: '40px' },
  title: { fontSize: '2.5rem', fontWeight: '900', letterSpacing: '2px', textTransform: 'uppercase', color: 'white' },
  underline: { height: '4px', width: '100px', background: 'var(--neon-purple)', margin: '10px auto 20px', boxShadow: '0 0 15px var(--neon-purple)' },
  subtitle: { color: '#ccc', marginBottom: '20px' },
  filterBar: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', marginBottom: '50px', background: 'rgba(10, 10, 12, 0.8)', backdropFilter: 'blur(10px)', padding: '25px', borderRadius: '15px', border: '1px solid rgba(188, 19, 254, 0.3)', maxWidth: '500px', margin: '0 auto 50px' },
  label: { fontSize: '0.8rem', color: 'var(--neon-purple)', fontWeight: 'bold', letterSpacing: '2px' },
  selectInput: { padding: '12px 25px', borderRadius: '8px', border: '1px solid var(--neon-purple)', backgroundColor: 'rgba(0, 0, 0, 0.8)', color: 'white', fontSize: '1rem', cursor: 'pointer', width: '100%', outline: 'none' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '35px', maxWidth: '1200px', margin: '0 auto' },
  noResult: { gridColumn: '1/-1', textAlign: 'center', padding: '60px', color: '#eee', background: 'rgba(0,0,0,0.5)', borderRadius: '15px' }
};

export default Arcanos;