import React, { useState, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import ProductoCard from '../components/ProductoCard';

import 'swiper/css';
import 'swiper/css/effect-fade';

// =============================================================================
// CONFIGURACIÓN
// =============================================================================
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/productos';

// Orden pedido: 4, 3, 5
const FONDOS_CLIMAS = [
  '/public/imagen4.jpeg',
  '/public/imagen5.jpeg',
  '/public/imagen7.jpeg',
];

const TIPOS_CLIMAS = [
  'Ash (ceniza)',
  'Aurora (aurora boreal)',
  'Autumn (otoño)',
  'Harvest (cosecha)',
  'Moonbeam (rayo de luna)',
  'Pestilence (peste)',
  'Rain (lluvia)',
  'Sirocco (viento del desierto)',
  'Snow (nieve)',
  'Spring (primavera)',
];

const OPCIONES_ORDEN = {
  nombre_asc: 'Nombre (A-Z)',
  nombre_desc: 'Nombre (Z-A)',
  precio_asc: 'Precio: Menor a Mayor',
  precio_desc: 'Precio: Mayor a Menor',
};

// =============================================================================
// ANIMACIONES (keyframes inyectados dinámicamente)
// =============================================================================
const KEYFRAMES = `
  @keyframes kenBurns {
    0%   { transform: scale(1)    translate(0, 0); }
    50%  { transform: scale(1.1)  translate(-1%, -1%); }
    100% { transform: scale(1.05) translate(1%, 1%); }
  }
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes shimmer {
    0%   { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  @keyframes glow {
    0%, 100% { text-shadow: 0 0 20px rgba(0, 242, 255, 0.5); }
    50%      { text-shadow: 0 0 40px rgba(0, 242, 255, 0.9); }
  }
`;

// =============================================================================
// COMPONENTE
// =============================================================================
const Climas = () => {
  const [climasData, setClimasData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filtroTipo, setFiltroTipo] = useState('TODOS');
  const [busqueda, setBusqueda] = useState('');
  const [orden, setOrden] = useState('nombre_asc');
  const [soloStock, setSoloStock] = useState(false);
  const [precioMax, setPrecioMax] = useState('');

  const obtenerClimas = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await axios.get(API_URL);
      const soloClimas = data.filter((item) => item.categoria === 'climas');
      setClimasData(soloClimas);
    } catch (err) {
      console.error('Error al cargar climas:', err);
      setError('No se pudo conectar con el servidor');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    obtenerClimas();
  }, [obtenerClimas]);

  const productosFiltrados = useMemo(() => {
    let r = [...climasData];

    if (filtroTipo !== 'TODOS') r = r.filter((i) => i.heroe === filtroTipo);

    if (busqueda.trim()) {
      const t = busqueda.toLowerCase().trim();
      r = r.filter(
        (i) =>
          i.nombre?.toLowerCase().includes(t) ||
          i.heroe?.toLowerCase().includes(t)
      );
    }

    if (soloStock) r = r.filter((i) => i.stock === true);

    if (precioMax !== '') {
      r = r.filter((i) => Number(i.precio) <= Number(precioMax));
    }

    r.sort((a, b) => {
      switch (orden) {
        case 'nombre_asc':  return (a.nombre || '').localeCompare(b.nombre || '');
        case 'nombre_desc': return (b.nombre || '').localeCompare(a.nombre || '');
        case 'precio_asc':  return Number(a.precio) - Number(b.precio);
        case 'precio_desc': return Number(b.precio) - Number(a.precio);
        default: return 0;
      }
    });
    return r;
  }, [climasData, filtroTipo, busqueda, orden, soloStock, precioMax]);

  const hayFiltrosActivos =
    filtroTipo !== 'TODOS' || busqueda || soloStock || precioMax || orden !== 'nombre_asc';

  const limpiarFiltros = () => {
    setFiltroTipo('TODOS');
    setBusqueda('');
    setOrden('nombre_asc');
    setSoloStock(false);
    setPrecioMax('');
  };

  const stats = useMemo(() => ({
    total: climasData.length,
    disponibles: climasData.filter((c) => c.stock).length,
    tipos: TIPOS_CLIMAS.length,
  }), [climasData]);

  return (
    <>
      <style>{KEYFRAMES}</style>

      <div style={styles.mainWrapper}>
        {/* Carrusel de fondo */}
        <div style={styles.swiperWrapper}>
          <Swiper
            modules={[Autoplay, EffectFade]}
            effect="fade"
            speed={2500}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            loop
            style={styles.swiper}
          >
            {FONDOS_CLIMAS.map((url, i) => (
              <SwiperSlide key={i}>
                <div style={{ ...styles.slideBackground, backgroundImage: `url(${url})` }}>
                  <div style={styles.slideOverlay} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div style={styles.contentLayer}>
          {/* Hero */}
          <div style={styles.header}>
            <div style={styles.badge}>DOTA 2 · MARKETPLACE</div>
            <h1 style={styles.title}>
              EFECTOS DE <span style={styles.titleAccent}>CLIMA</span>
            </h1>
            <div style={styles.underline} />
            <p style={styles.subtitle}>
              Personaliza tu mapa con estilos atmosféricos únicos
            </p>

            <div style={styles.statsRow}>
              <div style={styles.statItem}>
                <span style={styles.statNumber}>{stats.total}</span>
                <span style={styles.statLabel}>En catálogo</span>
              </div>
              <div style={styles.statDivider} />
              <div style={styles.statItem}>
                <span style={{ ...styles.statNumber, color: '#2ecc71' }}>
                  {stats.disponibles}
                </span>
                <span style={styles.statLabel}>Disponibles</span>
              </div>
              <div style={styles.statDivider} />
              <div style={styles.statItem}>
                <span style={styles.statNumber}>{stats.tipos}</span>
                <span style={styles.statLabel}>Tipos</span>
              </div>
            </div>
          </div>

          {/* Filtros */}
          <div style={styles.filterBar}>
            <div style={styles.filterGrid}>
              <div style={styles.filterCol}>
                <label style={styles.label}>🔎 BUSCAR</label>
                <input
                  type="text"
                  placeholder="Nombre del clima..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  style={styles.input}
                />
              </div>

              <div style={styles.filterCol}>
                <label style={styles.label}>🌦 TIPO DE EFECTO</label>
                <select
                  value={filtroTipo}
                  onChange={(e) => setFiltroTipo(e.target.value)}
                  style={styles.input}
                >
                  <option value="TODOS">-- TODOS LOS CLIMAS --</option>
                  {TIPOS_CLIMAS.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div style={styles.filterCol}>
                <label style={styles.label}>💰 PRECIO MÁX ($)</label>
                <input
                  type="number"
                  min="0"
                  placeholder="Sin límite"
                  value={precioMax}
                  onChange={(e) => setPrecioMax(e.target.value)}
                  style={styles.input}
                />
              </div>

              <div style={styles.filterCol}>
                <label style={styles.label}>↕ ORDENAR</label>
                <select
                  value={orden}
                  onChange={(e) => setOrden(e.target.value)}
                  style={styles.input}
                >
                  {Object.entries(OPCIONES_ORDEN).map(([k, v]) => (
                    <option key={k} value={k}>{v}</option>
                  ))}
                </select>
              </div>
            </div>

            <div style={styles.filterActions}>
              <label style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={soloStock}
                  onChange={(e) => setSoloStock(e.target.checked)}
                  style={styles.checkbox}
                />
                Solo disponibles
              </label>

              <div style={styles.resultsCounter}>
                {productosFiltrados.length}{' '}
                {productosFiltrados.length === 1 ? 'resultado' : 'resultados'}
              </div>

              {hayFiltrosActivos && (
                <button onClick={limpiarFiltros} style={styles.btnLimpiar}>
                  ✖ Limpiar filtros
                </button>
              )}
            </div>
          </div>

          {/* Grid / estados */}
          <div style={styles.grid}>
            {loading ? (
              [...Array(6)].map((_, i) => (
                <div key={i} style={styles.skeleton}>
                  <div style={styles.skeletonImg} />
                  <div style={styles.skeletonText} />
                  <div style={{ ...styles.skeletonText, width: '60%' }} />
                </div>
              ))
            ) : error ? (
              <div style={styles.errorState}>
                <div style={styles.errorIcon}>⚠</div>
                <h3 style={{ margin: '10px 0' }}>Error al cargar</h3>
                <p>{error}</p>
                <button onClick={obtenerClimas} style={styles.btnReintentar}>
                  🔄 Reintentar
                </button>
              </div>
            ) : productosFiltrados.length === 0 ? (
              <div style={styles.noResult}>
                <div style={styles.noResultIcon}>🌦</div>
                <h3 style={{ margin: '10px 0', color: 'white' }}>
                  No se encontraron climas
                </h3>
                <p>
                  {hayFiltrosActivos
                    ? 'Prueba ajustando los filtros para ver más resultados'
                    : 'Aún no hay climas disponibles en el catálogo'}
                </p>
              </div>
            ) : (
              productosFiltrados.map((item) => (
                <ProductoCard key={item._id} producto={item} />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

// =============================================================================
// ESTILOS
// =============================================================================
const styles = {
  mainWrapper: { position: 'relative', minHeight: '100vh', backgroundColor: '#000', overflow: 'hidden' },

  // Carrusel de fondo
  swiperWrapper: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 },
  swiper: { width: '100%', height: '100%' },
  slideBackground: {
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
    animation: 'kenBurns 20s ease-in-out infinite alternate',
  },
  slideOverlay: {
    position: 'absolute',
    inset: 0,
    background:
      'linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(10,10,15,0.85) 100%)',
  },

  contentLayer: { position: 'relative', zIndex: 1, padding: '80px 5% 100px' },

  // Hero
  header: {
    textAlign: 'center',
    marginBottom: '50px',
    animation: 'fadeInUp 0.8s ease',
  },
  badge: {
    display: 'inline-block',
    padding: '6px 18px',
    background: 'rgba(0, 242, 255, 0.1)',
    border: '1px solid rgba(0, 242, 255, 0.4)',
    borderRadius: '20px',
    color: 'var(--neon-cyan)',
    fontSize: '0.75rem',
    letterSpacing: '2px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  title: {
    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
    fontWeight: '900',
    letterSpacing: '3px',
    textTransform: 'uppercase',
    color: 'white',
    textShadow: '0 0 30px rgba(0, 242, 255, 0.6)',
    margin: 0,
  },
  titleAccent: {
    color: 'var(--neon-cyan)',
    animation: 'glow 2.5s ease-in-out infinite',
  },
  underline: {
    height: '4px',
    width: '120px',
    background: 'linear-gradient(90deg, transparent, var(--neon-cyan), transparent)',
    margin: '15px auto 25px',
    boxShadow: '0 0 20px var(--neon-cyan)',
  },
  subtitle: {
    color: '#ddd',
    marginBottom: '30px',
    letterSpacing: '1px',
    textShadow: '1px 1px 3px black',
    fontSize: '1.1rem',
  },

  // Stats
  statsRow: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '30px',
    marginTop: '30px',
    flexWrap: 'wrap',
  },
  statItem: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
  statNumber: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: 'var(--neon-cyan)',
    textShadow: '0 0 10px var(--neon-cyan)',
  },
  statLabel: {
    fontSize: '0.75rem',
    letterSpacing: '2px',
    color: '#888',
    textTransform: 'uppercase',
    marginTop: '4px',
  },
  statDivider: { width: '1px', height: '40px', background: 'rgba(255,255,255,0.15)' },

  // Filtros
  filterBar: {
    background: 'rgba(10, 10, 12, 0.85)',
    backdropFilter: 'blur(15px)',
    WebkitBackdropFilter: 'blur(15px)',
    padding: '25px',
    borderRadius: '20px',
    border: '1px solid rgba(0, 242, 255, 0.2)',
    maxWidth: '1200px',
    margin: '0 auto 50px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
    animation: 'fadeInUp 1s ease',
  },
  filterGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '15px',
    marginBottom: '15px',
  },
  filterCol: { display: 'flex', flexDirection: 'column', gap: '6px' },
  label: {
    fontSize: '0.7rem',
    color: 'var(--neon-cyan)',
    fontWeight: 'bold',
    letterSpacing: '2px',
  },
  input: {
    padding: '10px 14px',
    borderRadius: '8px',
    border: '1px solid #333',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    color: '#fff',
    fontSize: '0.9rem',
    width: '100%',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  },
  filterActions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '15px',
    flexWrap: 'wrap',
    paddingTop: '15px',
    borderTop: '1px solid rgba(0, 242, 255, 0.15)',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '#ddd',
    fontSize: '0.85rem',
    cursor: 'pointer',
  },
  checkbox: { width: '18px', height: '18px', cursor: 'pointer', accentColor: '#00f2ff' },
  resultsCounter: {
    color: 'var(--neon-cyan)',
    fontSize: '0.85rem',
    fontWeight: 'bold',
    letterSpacing: '1px',
  },
  btnLimpiar: {
    padding: '8px 16px',
    backgroundColor: 'transparent',
    color: '#ff6b6b',
    border: '1px solid #ff6b6b',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.8rem',
    fontWeight: 'bold',
  },

  // Grid
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '30px',
    maxWidth: '1200px',
    margin: '0 auto',
  },

  // Skeletons
  skeleton: {
    background: 'rgba(20, 20, 22, 0.6)',
    borderRadius: '15px',
    padding: '20px',
    height: '380px',
  },
  skeletonImg: {
    width: '100%',
    height: '200px',
    background: 'linear-gradient(90deg, #1a1a1c 0%, #2a2a2c 50%, #1a1a1c 100%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.5s infinite',
    borderRadius: '10px',
    marginBottom: '15px',
  },
  skeletonText: {
    width: '80%',
    height: '15px',
    background: 'linear-gradient(90deg, #1a1a1c 0%, #2a2a2c 50%, #1a1a1c 100%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.5s infinite',
    borderRadius: '5px',
    marginBottom: '10px',
  },

  // Estados vacío / error
  noResult: {
    gridColumn: '1/-1',
    textAlign: 'center',
    padding: '80px 40px',
    color: '#aaa',
    background: 'rgba(0,0,0,0.4)',
    borderRadius: '20px',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.05)',
  },
  noResultIcon: { fontSize: '4rem', marginBottom: '10px' },
  errorState: {
    gridColumn: '1/-1',
    textAlign: 'center',
    padding: '60px 40px',
    color: '#ff6b6b',
    background: 'rgba(231, 76, 60, 0.1)',
    borderRadius: '20px',
    border: '1px solid rgba(231, 76, 60, 0.3)',
  },
  errorIcon: { fontSize: '3rem' },
  btnReintentar: {
    marginTop: '15px',
    padding: '10px 25px',
    background: 'var(--neon-cyan)',
    color: 'black',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};

export default Climas;