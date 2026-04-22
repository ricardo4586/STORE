// src/pages/Inicio.jsx
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  MessageCircle,
  Sparkles,
  Layers,
  Cloud,
  Rocket,
  Crown,
  Star,
} from 'lucide-react';

import 'swiper/css';
import 'swiper/css/effect-fade';

// =============================================================================
// CONFIG
// =============================================================================
const IMAGENES_FONDO = [
  '/imagen5.png',
  '/imagen11.png',
  '/imagen12.png',
];

const CATEGORIAS_HERO = [
  { nombre: 'Sets',       icon: Layers,  path: '/sets',       color: '#00f2ff' },
  { nombre: 'Climas',     icon: Cloud,   path: '/climas',     color: '#8affd3' },
  { nombre: 'Couriers',   icon: Rocket,  path: '/couriers',   color: '#bc13fe' },
  { nombre: 'Inmortales', icon: Crown,   path: '/inmortales', color: '#ffd700' },
  { nombre: 'Arcanos',    icon: Star,    path: '/arcanos',    color: '#ff4f9a' },
];

const BENEFICIOS = [
  { icon: ShieldCheck,   titulo: 'Compra segura',  desc: 'Pago protegido y 100% confiable.' },
  { icon: Zap,           titulo: 'Entrega rápida', desc: 'Trade en Steam en menos de 30 min.' },
  { icon: MessageCircle, titulo: 'Soporte real',   desc: 'Te atendemos por WhatsApp al toque.' },
];

// =============================================================================
// KEYFRAMES (kenBurns eliminado)
// =============================================================================
const keyframes = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes pulseGlow {
    0%, 100% { box-shadow: 0 0 20px rgba(0,242,255,0.4), 0 0 40px rgba(188,19,254,0.2); }
    50%      { box-shadow: 0 0 30px rgba(0,242,255,0.6), 0 0 60px rgba(188,19,254,0.4); }
  }
  @keyframes floatBadge {
    0%, 100% { transform: translateY(0); }
    50%      { transform: translateY(-6px); }
  }
`;

// =============================================================================
// COMPONENTE PRINCIPAL
// =============================================================================
export default function Inicio() {
  return (
    <div style={styles.container}>
      <style>{keyframes}</style>

      {/* CARRUSEL DE FONDO */}
      <div style={styles.swiperWrapper}>
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          speed={1500}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop
          style={styles.swiper}
        >
          {IMAGENES_FONDO.map((url, i) => (
            <SwiperSlide key={i}>
              {/* ✅ Sin animation kenBurns — imagen estática y nítida */}
              <div
                style={{
                  ...styles.slideBackground,
                  backgroundImage: `url(${url})`,
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div style={styles.backdropOverlay} />
      </div>

      {/* CONTENIDO */}
      <div style={styles.contentOverlay}>
        <div style={{ ...styles.heroContent, animation: 'fadeInUp 0.8s ease' }}>

          {/* Badge flotante */}
          <div style={{ ...styles.badge, animation: 'floatBadge 3s ease-in-out infinite' }}>
            <Sparkles size={14} />
            <span>La tienda #1 de ítems de Dota 2 en Perú</span>
          </div>

          {/* Logo */}
          <img
            src="/pantera-logoo.png"
            alt="Pantera Store"
            style={styles.mainLogo}
          />

          {/* Títulos */}
          <h1 style={styles.tagline}>
            LOS MEJORES ÍTEMS DE{' '}
            <span style={styles.taglineAccent}>DOTA 2</span>
          </h1>
          <p style={styles.subTagline}>
            Sets · Climas · Couriers · Inmortales · Arcanos
          </p>

          {/* CTAs */}
          <div style={styles.ctaRow}>
            <Link to="/sets" style={{ textDecoration: 'none' }}>
              <button style={styles.btnPrimary}>
                <span>EXPLORAR CATÁLOGO</span>
                <ArrowRight size={18} />
              </button>
            </Link>
            <Link to="/soporte" style={{ textDecoration: 'none' }}>
              <button style={styles.btnSecondary}>
                <MessageCircle size={18} />
                <span>¿Cómo comprar?</span>
              </button>
            </Link>
          </div>

          {/* Accesos rápidos por categoría */}
          <div style={styles.quickNav}>
            {CATEGORIAS_HERO.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link key={cat.nombre} to={cat.path} style={{ textDecoration: 'none' }}>
                  <div
                    style={styles.quickNavItem}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = cat.color;
                      e.currentTarget.style.boxShadow = `0 0 18px ${cat.color}55`;
                      e.currentTarget.style.transform = 'translateY(-3px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <Icon size={20} color={cat.color} />
                    <span style={styles.quickNavText}>{cat.nombre}</span>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Beneficios */}
          <div style={styles.benefitsRow}>
            {BENEFICIOS.map((b, i) => {
              const Icon = b.icon;
              return (
                <div key={i} style={styles.benefitItem}>
                  <Icon size={18} color="var(--neon-cyan, #00f2ff)" />
                  <div style={{ textAlign: 'left' }}>
                    <div style={styles.benefitTitle}>{b.titulo}</div>
                    <div style={styles.benefitDesc}>{b.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
}

// =============================================================================
// STYLES
// =============================================================================
const styles = {
  container: {
    position: 'relative',
    width: '100%',
    minHeight: '100vh',
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  swiperWrapper: {
    position: 'absolute',
    top: 0, left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
  swiper: { width: '100%', height: '100%' },
  slideBackground: {
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    filter: 'brightness(0.75)',
  },
  backdropOverlay: {
    position: 'absolute',
    inset: 0,
    background:
      'radial-gradient(ellipse at center, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.45) 100%), linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.3) 100%)',
    zIndex: 2,
  },
  contentOverlay: {
    position: 'relative',
    zIndex: 10,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    minHeight: '100vh',
    padding: '120px 5% 60px',
    boxSizing: 'border-box',
  },
  heroContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    maxWidth: 1100,
    margin: '0 auto',
    width: '100%',
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    background: 'rgba(0,242,255,0.1)',
    border: '1px solid rgba(0,242,255,0.35)',
    color: 'var(--neon-cyan, #00f2ff)',
    padding: '0.45rem 1rem',
    borderRadius: 999,
    fontSize: '0.82rem',
    marginBottom: 24,
    letterSpacing: 0.8,
    backdropFilter: 'blur(8px)',
  },
  mainLogo: {
    width: 'clamp(220px, 40vw, 340px)',
    height: 'auto',
    marginBottom: 10,
    filter: 'drop-shadow(0 0 20px rgba(0,242,255,0.35))',
  },
  tagline: {
    fontSize: 'clamp(1.75rem, 4.5vw, 3rem)',
    fontWeight: 900,
    margin: '0 0 10px',
    letterSpacing: 2,
    color: '#fff',
    lineHeight: 1.15,
    textShadow: '0 0 30px rgba(0,242,255,0.6)',
  },
  taglineAccent: {
    background:
      'linear-gradient(135deg, var(--neon-cyan, #00f2ff), var(--neon-purple, #bc13fe))',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  subTagline: {
    fontSize: 'clamp(0.9rem, 1.6vw, 1.15rem)',
    color: 'rgba(255,255,255,0.75)',
    marginBottom: 32,
    letterSpacing: 2,
    fontWeight: 300,
    textTransform: 'uppercase',
  },
  ctaRow: {
    display: 'flex',
    gap: 14,
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 48,
  },
  btnPrimary: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 10,
    padding: '0.95rem 2rem',
    background:
      'linear-gradient(135deg, var(--neon-cyan, #00f2ff), var(--neon-purple, #bc13fe))',
    color: '#fff',
    border: 'none',
    borderRadius: 12,
    fontSize: '1rem',
    fontWeight: 800,
    letterSpacing: 1.2,
    cursor: 'pointer',
    animation: 'pulseGlow 2.5s ease-in-out infinite',
    transition: 'transform 0.2s ease',
  },
  btnSecondary: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 10,
    padding: '0.95rem 1.75rem',
    background: 'rgba(255,255,255,0.06)',
    color: '#fff',
    border: '1px solid rgba(255,255,255,0.25)',
    borderRadius: 12,
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    backdropFilter: 'blur(8px)',
    transition: 'all 0.2s ease',
  },
  quickNav: {
    display: 'flex',
    gap: 12,
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 40,
  },
  quickNavItem: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: '0.65rem 1.1rem',
    background: 'rgba(10,10,12,0.65)',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: 10,
    color: '#fff',
    fontSize: '0.9rem',
    fontWeight: 600,
    letterSpacing: 0.5,
    backdropFilter: 'blur(10px)',
    cursor: 'pointer',
    transition: 'all 0.25s ease',
  },
  quickNavText: { color: '#fff' },
  benefitsRow: {
    display: 'flex',
    gap: 24,
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 8,
    padding: '1rem 1.5rem',
    background: 'rgba(10,10,12,0.55)',
    border: '1px solid rgba(0,242,255,0.15)',
    borderRadius: 14,
    backdropFilter: 'blur(12px)',
    maxWidth: 900,
  },
  benefitItem: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 10,
    minWidth: 200,
  },
  benefitTitle: {
    color: '#fff',
    fontWeight: 700,
    fontSize: '0.9rem',
    lineHeight: 1.2,
  },
  benefitDesc: {
    color: 'rgba(255,255,255,0.65)',
    fontSize: '0.8rem',
    marginTop: 2,
  },
};