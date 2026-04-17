import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import ProductoCard from '../components/ProductoCard';

// Importamos estilos de Swiper para las transiciones
import 'swiper/css';
import 'swiper/css/effect-fade';

const Couriers = () => {
  const [couriersData, setCouriersData] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- CONFIGURACIÓN DE IMÁGENES DE FONDO ---
  // Asegúrate de tener estas imágenes en public/fondos/
  const fondosCouriers = [
    "/fondos/courier1.png", 
    "/fondos/courier2.png", 
    "/fondos/courier3.png"
  ];

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
      {/* --- CARRUSEL DE FONDO (FIJO) --- */}
      <div style={styles.swiperWrapper}>
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect={'fade'}
          speed={2000}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={true}
          style={styles.swiper}
        >
          {fondosCouriers.map((url, index) => (
            <SwiperSlide key={index}>
              <div style={{ ...styles.slideBackground, backgroundImage: `url(${url})` }} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div style={styles.contentLayer}>
        <div style={styles.header}>
          <h1 style={styles.title}>MENSAJEROS / <span style={{ color: 'var(--neon-cyan)' }}>COURIERS</span></h1>
          <div style={styles.underline}></div>
          <p style={styles.subtitle}>Los compañeros más leales para llevar tus items</p>
        </div>

        {/* --- GRID DE RESULTADOS --- */}
        <div style={styles.grid}>
          {loading ? (
            <div style={styles.noResult}>
              <p style={{ color: 'var(--neon-cyan)' }}>Conectando con el almacén de mensajeros...</p>
            </div>
          ) : couriersData.length > 0 ? (
            couriersData.map((item) => (
              <ProductoCard key={item._id} producto={item} />
            ))
          ) : (
            <div style={styles.noResult}>
              <p>Aún no hay **Couriers** disponibles en la base de datos.</p>
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
    backgroundColor: '#000' 
  },
  // Contenedor del fondo para que no se mueva al hacer scroll
  swiperWrapper: { 
    position: 'fixed', 
    top: 0, 
    left: 0, 
    width: '100%', 
    height: '100%', 
    zIndex: 0 
  },
  swiper: { width: '100%', height: '100%' },
  slideBackground: { 
    width: '100%', 
    height: '100%', 
    backgroundSize: 'cover', 
    backgroundPosition: 'center',
    filter: 'brightness(0.3) blur(2px)' // Oscurecemos y desenfocamos un poco para legibilidad
  },
  contentLayer: { 
    position: 'relative', 
    zIndex: 1, 
    padding: '120px 5% 100px' // Más padding superior para que no choque con el Navbar
  },
  header: { textAlign: 'center', marginBottom: '60px' },
  title: { 
    fontSize: '2.5rem', 
    fontWeight: '900', 
    letterSpacing: '2px', 
    textTransform: 'uppercase', 
    color: 'white',
    textShadow: '0 0 20px rgba(0, 242, 255, 0.3)'
  },
  underline: { 
    height: '4px', 
    width: '100px', 
    background: 'var(--neon-cyan)', 
    margin: '10px auto 20px', 
    boxShadow: '0 0 15px var(--neon-cyan)' 
  },
  subtitle: { 
    color: '#ccc', 
    marginBottom: '20px', 
    textShadow: '1px 1px 5px black', 
    letterSpacing: '1px' 
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
    background: 'rgba(0,0,0,0.6)', 
    borderRadius: '15px',
    border: '1px solid rgba(0, 242, 255, 0.2)' 
  }
};

export default Couriers;