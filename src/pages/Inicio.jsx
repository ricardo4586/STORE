import React from 'react';
import { Link } from 'react-router-dom'; // 1. Importamos Link
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';

const Inicio = () => {
  const imagenesFondo = [
    "/imagen1carrucel.png", 
    "/imagen2carrusel.png", 
    "/imagen3carrusel.png"    
  ];

  return (
    <div className="home-container" style={styles.container}>
      <div style={styles.swiperWrapper}>
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect={'fade'}
          speed={1000}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={true}
          style={styles.swiper}
        >
          {imagenesFondo.map((url, index) => (
            <SwiperSlide key={index}>
              <div style={{ ...styles.slideBackground, backgroundImage: `url(${url})` }} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div style={styles.contentOverlay}>
        <header style={styles.heroContent}>
          <img 
            src="/pantera-logoo.png" 
            alt="Pantera Store Logo" 
            style={styles.mainLogo} 
          />
          <h2 style={styles.tagline}>LOS MEJORES ITEMS DE DOTA 2</h2>
          <p style={styles.subTagline}>SETS CACHE • CLIMAS • COURIERS • INMORTALES • ARCANOS</p>
          
          {/* 2. Envolvemos el botón con Link apuntando a la ruta de Sets */}
          <Link to="/sets cache" style={{ textDecoration: 'none' }}>
            <button className="btn-neon">EXPLORAR CATÁLOGO</button>
          </Link>
        </header>
      </div>
    </div>
  );
};

// ... (Tus estilos se mantienen igual)
const styles = {
  container: { position: 'relative', width: '100%', height: '100vh', overflow: 'hidden', backgroundColor: '#000' },
  swiperWrapper: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 },
  swiper: { width: '100%', height: '100%' },
  slideBackground: { 
    width: '100%', height: '100%', backgroundSize: 'cover', backgroundPosition: 'center', 
    boxShadow: 'inset 0 0 0 2000px rgba(0,0,0,0.5)' 
  },
  contentOverlay: { position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', width: '100%', height: '100%' },
  heroContent: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', paddingBottom: '100px' },
  mainLogo: { width: '350px', height: 'auto', marginBottom: '1px', filter: 'drop-shadow(0 0 13px rgba(255,255,255,0.3))' },
  tagline: { fontSize: '2.5rem', fontWeight: '800', marginBottom: '10px', letterSpacing: '3px', textShadow: '2px 2px 4px rgba(0,0,0,0.8)' },
  subTagline: { fontSize: '1.2rem', color: '#ccc', marginBottom: '40px', letterSpacing: '1px', fontWeight: '300' }
};

export default Inicio;