// src/pages/Couriers.jsx
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import {
  Package,
  RefreshCw,
  AlertCircle,
  Rocket,
} from 'lucide-react';
import ProductoCard from '../components/ProductoCard';

import 'swiper/css';
import 'swiper/css/effect-fade';

// =============================================================================
// CONFIG
// =============================================================================
const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:5000/api/productos';

const FONDOS_COURIERS = [
  '/public/imagen4.jpeg',
  '/public/imagen3.jpeg',
  '/public/imagen7.jpeg',
];


// =============================================================================
// KEYFRAMES
// =============================================================================
const keyframes = `
  @keyframes kenBurns {
    0%   { transform: scale(1)    translate(0, 0); }
    50%  { transform: scale(1.12) translate(-2%, -1%); }
    100% { transform: scale(1)    translate(0, 0); }
  }
  @keyframes shimmer {
    0%   { background-position: -400px 0; }
    100% { background-position: 400px 0; }
  }
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;

// =============================================================================
// SKELETON
// =============================================================================
function SkeletonCard() {
  const shimmerStyle = {
    background:
      'linear-gradient(90deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 100%)',
    backgroundSize: '800px 100%',
    animation: 'shimmer 1.4s infinite linear',
  };
  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(0,242,255,0.15)',
        borderRadius: 16,
        overflow: 'hidden',
        height: 380,
      }}
    >
      <div style={{ width: '100%', height: 220, ...shimmerStyle }} />
      <div style={{ padding: '1rem' }}>
        <div style={{ width: '70%', height: 16, borderRadius: 6, marginBottom: 10, ...shimmerStyle }} />
        <div style={{ width: '40%', height: 14, borderRadius: 6, ...shimmerStyle }} />
      </div>
    </div>
  );
}

// =============================================================================
// COMPONENTE PRINCIPAL
// =============================================================================
export default function Couriers() {
  const [couriersData, setCouriersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cargarCouriers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Pedimos al backend solo la categoría couriers
      const res = await axios.get(API_URL, {
        params: { categoria: 'couriers' },
      });

      const data = Array.isArray(res.data) ? res.data : [];

      // 🔒 SEGURIDAD EXTRA: aunque el backend devuelva algo raro,
      // filtramos en el cliente para asegurarnos de mostrar SOLO couriers.
      const soloCouriers = data.filter(
        (p) => p?.categoria?.toLowerCase() === 'couriers'
      );

      setCouriersData(soloCouriers);
    } catch (err) {
      console.error('Error al cargar couriers:', err);
      setError(
        err?.response?.data?.message ||
          'No pudimos conectar con el almacén de mensajeros.'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    cargarCouriers();
  }, [cargarCouriers]);

  return (
    <div style={styles.mainWrapper}>
      <style>{keyframes}</style>

      {/* CARRUSEL DE FONDO */}
      <div style={styles.swiperWrapper}>
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          speed={2000}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop
          style={styles.swiper}
        >
          {FONDOS_COURIERS.map((url, index) => (
            <SwiperSlide key={index}>
              <div
                style={{
                  ...styles.slideBackground,
                  backgroundImage: `url(${url})`,
                  animation: 'kenBurns 20s ease-in-out infinite',
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div style={styles.backdropOverlay} />
      </div>

      <div style={styles.contentLayer}>
        {/* HEADER */}
        <div style={{ ...styles.header, animation: 'fadeInUp 0.6s ease' }}>
          <div style={styles.badge}>
            <Rocket size={14} />
            <span>Compañeros leales</span>
          </div>
          <h1 style={styles.title}>
            MENSAJEROS /{' '}
            <span style={{ color: 'var(--neon-cyan, #00f2ff)' }}>COURIERS</span>
          </h1>
          <div style={styles.underline} />
          <p style={styles.subtitle}>
            Los compañeros más leales para llevar tus ítems por el mapa.
          </p>

          {/* Contador minimalista */}
          {!loading && !error && couriersData.length > 0 && (
            <div style={styles.counterChip}>
              <Package size={14} />
              <span>
                <strong>{couriersData.length}</strong>{' '}
                {couriersData.length === 1 ? 'courier disponible' : 'couriers disponibles'}
              </span>
            </div>
          )}
        </div>

        {/* GRID */}
        <div style={styles.grid}>
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
          ) : error ? (
            <div style={styles.stateCard}>
              <AlertCircle size={42} color="#ff4f6e" />
              <h3 style={styles.stateTitle}>No pudimos cargar los couriers</h3>
              <p style={styles.stateText}>{error}</p>
              <button onClick={cargarCouriers} style={styles.retryBtn}>
                <RefreshCw size={16} />
                Reintentar
              </button>
            </div>
          ) : couriersData.length > 0 ? (
            couriersData.map((item) => (
              <ProductoCard key={item._id} producto={item} />
            ))
          ) : (
            <div style={styles.stateCard}>
              <Package size={42} color="rgba(255,255,255,0.5)" />
              <h3 style={styles.stateTitle}>Sin couriers por ahora</h3>
              <p style={styles.stateText}>
                Aún no hay couriers disponibles en el catálogo. ¡Vuelve pronto!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// STYLES
// =============================================================================
const styles = {
  mainWrapper: { position: 'relative', minHeight: '100vh', backgroundColor: '#000' },
  swiperWrapper: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 0,
  },
  swiper: { width: '100%', height: '100%' },
  slideBackground: {
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    filter: 'brightness(0.35) blur(2px)',
  },
  backdropOverlay: {
    position: 'absolute',
    inset: 0,
    background:
      'radial-gradient(ellipse at top, rgba(0,242,255,0.12) 0%, transparent 60%), linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.75) 100%)',
    zIndex: 1,
  },
  contentLayer: {
    position: 'relative',
    zIndex: 2,
    padding: '120px 5% 100px',
    maxWidth: 1400,
    margin: '0 auto',
  },
  header: { textAlign: 'center', marginBottom: 50 },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    background: 'rgba(0,242,255,0.1)',
    border: '1px solid rgba(0,242,255,0.3)',
    color: 'var(--neon-cyan, #00f2ff)',
    padding: '0.4rem 0.9rem',
    borderRadius: 999,
    fontSize: '0.8rem',
    marginBottom: 16,
    letterSpacing: 1,
  },
  title: {
    fontSize: 'clamp(2rem, 5vw, 3rem)',
    fontWeight: 900,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: '#fff',
    margin: 0,
    textShadow: '0 4px 30px rgba(0,242,255,0.3)',
  },
  underline: {
    height: 4,
    width: 100,
    background:
      'linear-gradient(90deg, transparent, var(--neon-cyan, #00f2ff), transparent)',
    margin: '14px auto 18px',
    boxShadow: '0 0 15px var(--neon-cyan, #00f2ff)',
  },
  subtitle: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: '1.05rem',
    maxWidth: 600,
    margin: '0 auto 20px',
    lineHeight: 1.6,
    letterSpacing: 0.5,
  },
  counterChip: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    background: 'rgba(10,10,12,0.7)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(0,242,255,0.2)',
    color: 'rgba(255,255,255,0.85)',
    padding: '0.5rem 1rem',
    borderRadius: 999,
    fontSize: '0.85rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: 30,
    maxWidth: 1200,
    margin: '0 auto',
  },
  stateCard: {
    gridColumn: '1/-1',
    textAlign: 'center',
    padding: '3rem 1.5rem',
    background: 'rgba(10,10,12,0.7)',
    border: '1px solid rgba(0,242,255,0.2)',
    borderRadius: 16,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4,
  },
  stateTitle: { margin: '0.75rem 0 0.25rem', color: '#fff', fontSize: '1.1rem' },
  stateText: { margin: 0, color: 'rgba(255,255,255,0.7)' },
  retryBtn: {
    marginTop: 14,
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    background:
      'linear-gradient(135deg, var(--neon-cyan, #00f2ff), var(--neon-purple, #bc13fe))',
    border: 'none',
    color: '#fff',
    padding: '0.7rem 1.4rem',
    borderRadius: 10,
    cursor: 'pointer',
    fontWeight: 700,
    letterSpacing: 0.5,
    boxShadow: '0 8px 24px rgba(0,242,255,0.3)',
  },
};