import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
// 1. Importamos el componente de Lucide
import { UserRound, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Cierra el menú automáticamente al navegar a otra ruta
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Bloquea el scroll del body cuando el menú móvil está abierto
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const toggleMenu = () => setMenuOpen((v) => !v);

  return (
    <>
      {/* Estilos responsive + animaciones */}
      <style>{NAV_STYLES}</style>

      <nav style={styles.nav} className="nav-bar">
        <div style={styles.logoContainer}>
          <Link to="/" style={styles.logoText} className="nav-logo">
            <span style={{ color: 'white' }}>PANTERA</span> STORE
          </Link>
        </div>

        {/* Links de escritorio */}
        <div style={styles.navLinks} className="nav-links-desktop">
          <Link to="/" className="nav-link" style={styles.link}>INICIO</Link>
          <Link to="/sets" className="nav-link" style={styles.link}>SETS Cache</Link>
          <Link to="/climas" className="nav-link" style={styles.link}>CLIMAS</Link>
          <Link to="/inmortales" className="nav-link" style={styles.link}>INMORTALES</Link>
          <Link to="/arcanos" className="nav-link" style={styles.link}>ARCANOS</Link>
          <Link to="/couriers" className="nav-link" style={styles.link}>COURIERS</Link>
          <Link to="/soporte" className="nav-link" style={styles.link}>SOPORTE</Link>

          <Link
            to="/login"
            className="nav-link login-icon"
            style={styles.loginBtn}
            title="Acceso Admin"
          >
            <UserRound size={20} strokeWidth={1.5} color="var(--neon-cyan)" />
          </Link>
        </div>

        {/* Botón hamburguesa (sólo visible en móvil vía CSS) */}
        <button
          onClick={toggleMenu}
          style={styles.burgerBtn}
          className="nav-burger"
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <X size={26} color="var(--neon-cyan)" strokeWidth={2} />
          ) : (
            <Menu size={26} color="var(--neon-cyan)" strokeWidth={2} />
          )}
        </button>
      </nav>

      {/* Backdrop oscuro detrás del panel móvil */}
      <div
        className={`nav-backdrop ${menuOpen ? 'open' : ''}`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Panel de navegación móvil */}
      <aside
        className={`nav-mobile-panel ${menuOpen ? 'open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <div className="nav-mobile-inner">
          <Link to="/" className="nav-mobile-link" style={{ '--i': 1 }}>INICIO</Link>
          <Link to="/sets" className="nav-mobile-link" style={{ '--i': 2 }}>SETS Cache</Link>
          <Link to="/climas" className="nav-mobile-link" style={{ '--i': 3 }}>CLIMAS</Link>
          <Link to="/inmortales" className="nav-mobile-link" style={{ '--i': 4 }}>INMORTALES</Link>
          <Link to="/arcanos" className="nav-mobile-link" style={{ '--i': 5 }}>ARCANOS</Link>
          <Link to="/couriers" className="nav-mobile-link" style={{ '--i': 6 }}>COURIERS</Link>
          <Link to="/soporte" className="nav-mobile-link" style={{ '--i': 7 }}>SOPORTE</Link>

          <Link
            to="/login"
            className="nav-mobile-link nav-mobile-login"
            style={{ '--i': 8 }}
            title="Acceso Admin"
          >
            <UserRound size={18} strokeWidth={1.8} style={{ marginRight: 8, verticalAlign: 'middle' }} />
            ACCESO ADMIN
          </Link>
        </div>
      </aside>
    </>
  );
};

// =============================================================================
// CSS (animaciones + media queries)
// =============================================================================
const NAV_STYLES = `
  /* El burger se oculta en escritorio */
  .nav-burger {
    display: none;
  }

  /* Hover de links (desktop) */
  .nav-link { position: relative; }
  .nav-link::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -6px;
    width: 0;
    height: 2px;
    background: var(--neon-cyan);
    box-shadow: 0 0 8px var(--neon-cyan);
    transition: all 0.3s ease;
    transform: translateX(-50%);
  }
  .nav-link:hover::after { width: 100%; }
  .nav-link:hover {
    color: var(--neon-cyan) !important;
    text-shadow: 0 0 8px rgba(0,242,255,0.5);
  }
  .nav-link.login-icon::after { display: none; }
  .nav-link.login-icon:hover {
    background: rgba(0,242,255,0.15) !important;
    transform: translateY(-2px);
    box-shadow: 0 0 15px rgba(0,242,255,0.5);
  }

  /* Backdrop */
  .nav-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.6);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.35s ease;
    z-index: 1998;
  }
  .nav-backdrop.open {
    opacity: 1;
    pointer-events: auto;
  }

  /* Panel móvil */
  .nav-mobile-panel {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 80%;
    max-width: 320px;
    background: linear-gradient(180deg, rgba(10,10,14,0.98) 0%, rgba(5,5,8,0.98) 100%);
    border-left: 2px solid var(--neon-cyan);
    box-shadow: -20px 0 40px rgba(0,242,255,0.15);
    transform: translateX(100%);
    transition: transform 0.4s cubic-bezier(.2,.8,.2,1);
    z-index: 1999;
    padding: 100px 0 40px;
    overflow-y: auto;
    display: none;
  }
  .nav-mobile-panel.open { transform: translateX(0); }

  .nav-mobile-inner {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 0 20px;
  }

  .nav-mobile-link {
    color: #e0e0e0;
    text-decoration: none;
    font-size: 0.95rem;
    font-weight: 600;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    padding: 16px 20px;
    border-radius: 10px;
    border: 1px solid transparent;
    transition: all 0.25s ease;
    opacity: 0;
    transform: translateX(30px);
  }
  .nav-mobile-panel.open .nav-mobile-link {
    animation: mobileLinkIn 0.4s cubic-bezier(.2,.8,.2,1) forwards;
    animation-delay: calc(var(--i, 0) * 0.06s + 0.15s);
  }
  .nav-mobile-link:hover,
  .nav-mobile-link:active {
    background: rgba(0,242,255,0.08);
    border-color: rgba(0,242,255,0.3);
    color: var(--neon-cyan);
    transform: translateX(6px);
  }
  .nav-mobile-login {
    margin-top: 16px;
    color: var(--neon-cyan) !important;
    background: rgba(0,242,255,0.08);
    border: 1px solid rgba(0,242,255,0.35) !important;
    text-align: center;
  }

  @keyframes mobileLinkIn {
    to { opacity: 1; transform: translateX(0); }
  }

  /* ---------- Tablet (≤1024px): compacta el menú de escritorio ---------- */
  @media (max-width: 1024px) {
    .nav-bar { padding: 0 30px !important; }
    .nav-links-desktop { gap: 16px !important; }
    .nav-link { font-size: 0.72rem !important; letter-spacing: 0.8px !important; }
    .nav-logo { font-size: 1.35rem !important; }
  }

  /* ---------- Móvil (≤768px): muestra hamburguesa, oculta links ---------- */
  @media (max-width: 768px) {
    .nav-bar {
      padding: 0 18px !important;
      height: 68px !important;
    }
    .nav-logo {
      font-size: 1.2rem !important;
      letter-spacing: 1.2px !important;
    }
    .nav-links-desktop { display: none !important; }
    .nav-burger {
      display: flex !important;
      align-items: center;
      justify-content: center;
      background: rgba(0,242,255,0.06);
      border: 1px solid rgba(0,242,255,0.3);
      border-radius: 10px;
      padding: 8px;
      cursor: pointer;
      transition: all 0.25s ease;
    }
    .nav-burger:hover,
    .nav-burger:active {
      background: rgba(0,242,255,0.15);
      box-shadow: 0 0 15px rgba(0,242,255,0.4);
    }
    .nav-mobile-panel { display: block; }
  }

  /* ---------- Móvil pequeño (≤420px) ---------- */
  @media (max-width: 420px) {
    .nav-bar { padding: 0 14px !important; height: 62px !important; }
    .nav-logo { font-size: 1.05rem !important; letter-spacing: 1px !important; }
    .nav-mobile-panel { width: 85%; padding-top: 90px; }
    .nav-mobile-link { font-size: 0.88rem; padding: 14px 16px; }
  }
`;

// =============================================================================
// ESTILOS inline base (mismos valores originales para escritorio)
// =============================================================================
const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 50px',
    height: '80px',
    backgroundColor: 'rgba(10, 10, 11, 0.95)',
    borderBottom: '2px solid var(--neon-cyan)',
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 2000,
    boxSizing: 'border-box',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  logoText: {
    color: 'var(--neon-cyan)',
    fontWeight: '900',
    fontSize: '1.6rem',
    textDecoration: 'none',
    textShadow: '0 0 15px rgba(0, 242, 255, 0.6)',
    letterSpacing: '2px',
    whiteSpace: 'nowrap',
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '25px',
  },
  link: {
    color: '#e0e0e0',
    textDecoration: 'none',
    fontSize: '0.8rem',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    letterSpacing: '1.2px',
    textTransform: 'uppercase',
  },
  loginBtn: {
    textDecoration: 'none',
    marginLeft: '15px',
    padding: '8px',
    borderRadius: '50%',
    backgroundColor: 'rgba(0, 242, 255, 0.05)',
    border: '1px solid rgba(0, 242, 255, 0.2)',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    filter: 'drop-shadow(0 0 5px rgba(0, 242, 255, 0.3))',
  },
  burgerBtn: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
  },
};

export default Navbar;