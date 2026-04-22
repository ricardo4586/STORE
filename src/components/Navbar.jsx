import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserRound, Menu, X, Zap } from 'lucide-react';

const NAV_LINKS = [
  { to: '/',          label: 'Inicio' },
  { to: '/sets',      label: 'Sets' },
  { to: '/climas',    label: 'Climas' },
  { to: '/inmortales',label: 'Inmortales' },
  { to: '/arcanos',   label: 'Arcanos' },
  { to: '/couriers',  label: 'Couriers' },
  { to: '/soporte',   label: 'Soporte' },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen]   = useState(false);
  const [scrolled, setScrolled]   = useState(false);
  const location = useLocation();

  // Detecta scroll para cambiar el estilo del nav
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Cierra el menú al navegar
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Bloquea scroll del body cuando el menú móvil está abierto
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <>
      <style>{NAV_STYLES}</style>

      <nav
        className={`pantera-nav ${scrolled ? 'scrolled' : ''}`}
        role="navigation"
        aria-label="Navegación principal"
      >
        {/* ── LOGO ─────────────────────────────────────────── */}
        <Link to="/" className="pantera-logo" aria-label="Inicio - Pantera Store">
          <div className="logo-icon-wrap">
            <Zap size={18} strokeWidth={2.5} className="logo-icon" />
          </div>
          <span className="logo-text">
            <span className="logo-white">PANTERA</span>
            <span className="logo-accent"> STORE</span>
          </span>
        </Link>

        {/* ── LINKS ESCRITORIO ──────────────────────────────── */}
        <div className="pantera-links" role="list">
          {NAV_LINKS.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              role="listitem"
              className={`pantera-link ${isActive(to) ? 'active' : ''}`}
            >
              {label}
              {isActive(to) && <span className="active-dot" aria-hidden="true" />}
            </Link>
          ))}
        </div>

        {/* ── ACCIONES ESCRITORIO ───────────────────────────── */}
        <div className="pantera-actions">
          <Link to="/login" className="login-btn" title="Acceso Admin" aria-label="Acceso Admin">
            <UserRound size={18} strokeWidth={1.8} />
            <span className="login-label">Admin</span>
          </Link>

          {/* Hamburguesa */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="burger-btn"
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
          >
            <span className={`burger-icon ${menuOpen ? 'open' : ''}`}>
              {menuOpen
                ? <X size={22} strokeWidth={2} />
                : <Menu size={22} strokeWidth={2} />}
            </span>
          </button>
        </div>
      </nav>

      {/* ── BACKDROP ─────────────────────────────────────────── */}
      <div
        className={`pantera-backdrop ${menuOpen ? 'open' : ''}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      {/* ── PANEL MÓVIL ──────────────────────────────────────── */}
      <aside
        className={`pantera-panel ${menuOpen ? 'open' : ''}`}
        aria-hidden={!menuOpen}
        aria-label="Menú móvil"
      >
        {/* Cabecera del panel */}
        <div className="panel-header">
          <div className="panel-logo">
            <Zap size={16} strokeWidth={2.5} />
            <span>PANTERA STORE</span>
          </div>
          <div className="panel-divider" />
        </div>

        {/* Links */}
        <nav className="panel-nav" role="list">
          {NAV_LINKS.map(({ to, label }, i) => (
            <Link
              key={to}
              to={to}
              role="listitem"
              className={`panel-link ${isActive(to) ? 'active' : ''}`}
              style={{ '--i': i + 1 }}
            >
              <span className="panel-link-dot" />
              {label}
              {isActive(to) && <span className="panel-active-badge">Aquí</span>}
            </Link>
          ))}
        </nav>

        {/* Footer del panel */}
        <div className="panel-footer">
          <Link to="/login" className="panel-login-btn" style={{ '--i': NAV_LINKS.length + 1 }}>
            <UserRound size={16} strokeWidth={1.8} />
            Acceso Admin
          </Link>
          <p className="panel-tagline">Dota 2 · Marketplace</p>
        </div>
      </aside>
    </>
  );
};

// =============================================================================
// ESTILOS
// =============================================================================
const NAV_STYLES = `
  :root {
    --cyan: #00f2ff;
    --cyan-dim: rgba(0,242,255,0.15);
    --cyan-glow: rgba(0,242,255,0.4);
    --nav-h: 81px;
    --nav-bg: rgba(6,6,10,0.85);
    --nav-bg-scrolled: rgba(4,4,8,0.97);
    --panel-w: 300px;
  }

  /* ── NAV BASE ─────────────────────────────────────── */
  .pantera-nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 2000;
    height: var(--nav-h);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 48px;
    box-sizing: border-box;
    background: var(--nav-bg);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-bottom: 1px solid rgba(0,242,255,0.18);
    transition: background 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
  }
  .pantera-nav.scrolled {
    background: var(--nav-bg-scrolled);
    border-bottom-color: rgba(0,242,255,0.35);
    box-shadow: 0 4px 30px rgba(0,0,0,0.6), 0 1px 0 rgba(0,242,255,0.1);
  }

  /* ── LOGO ─────────────────────────────────────────── */
  .pantera-logo {
    display: flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
    flex-shrink: 0;
    transition: opacity 0.2s;
  }
  .pantera-logo:hover { opacity: 0.85; }

  .logo-icon-wrap {
    width: 34px; height: 34px;
    border-radius: 9px;
    background: linear-gradient(135deg, rgba(0,242,255,0.2), rgba(0,242,255,0.05));
    border: 1px solid rgba(0,242,255,0.4);
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 0 14px rgba(0,242,255,0.25);
    flex-shrink: 0;
    transition: box-shadow 0.3s;
  }
  .pantera-logo:hover .logo-icon-wrap {
    box-shadow: 0 0 22px rgba(0,242,255,0.5);
  }
  .logo-icon { color: var(--cyan); }

  .logo-text {
    font-size: 1.25rem;
    font-weight: 900;
    letter-spacing: 2px;
    white-space: nowrap;
    line-height: 1;
  }
  .logo-white { color: #ffffff; }
  .logo-accent {
    color: var(--cyan);
    text-shadow: 0 0 18px var(--cyan-glow);
  }

  /* ── LINKS ESCRITORIO ─────────────────────────────── */
  .pantera-links {
    display: flex;
    align-items: center;
    gap: 4px;
    flex: 1;
    justify-content: center;
    padding: 0 24px;
  }

  .pantera-link {
    position: relative;
    color: rgba(220,220,230,0.75);
    text-decoration: none;
    font-size: 0.78rem;
    font-weight: 600;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    padding: 6px 12px;
    border-radius: 8px;
    transition: color 0.2s, background 0.2s;
    white-space: nowrap;
  }
  .pantera-link:hover {
    color: var(--cyan);
    background: var(--cyan-dim);
  }
  .pantera-link.active {
    color: var(--cyan);
    background: rgba(0,242,255,0.1);
    text-shadow: 0 0 10px rgba(0,242,255,0.4);
  }
  .active-dot {
    position: absolute;
    bottom: -1px;
    left: 50%;
    transform: translateX(-50%);
    width: 4px; height: 4px;
    border-radius: 50%;
    background: var(--cyan);
    box-shadow: 0 0 8px var(--cyan);
  }

  /* ── ACCIONES ─────────────────────────────────────── */
  .pantera-actions {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
  }

  .login-btn {
    display: flex;
    align-items: center;
    gap: 7px;
    color: var(--cyan);
    text-decoration: none;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    padding: 7px 14px;
    border-radius: 9px;
    border: 1px solid rgba(0,242,255,0.35);
    background: rgba(0,242,255,0.06);
    transition: all 0.25s ease;
  }
  .login-btn:hover {
    background: rgba(0,242,255,0.14);
    border-color: rgba(0,242,255,0.7);
    box-shadow: 0 0 16px rgba(0,242,255,0.3);
    transform: translateY(-1px);
  }
  .login-label { display: inline; }

  /* ── HAMBURGUESA ──────────────────────────────────── */
  .burger-btn {
    display: none;
    background: rgba(0,242,255,0.06);
    border: 1px solid rgba(0,242,255,0.3);
    border-radius: 10px;
    padding: 8px;
    cursor: pointer;
    color: var(--cyan);
    transition: all 0.2s ease;
    line-height: 0;
  }
  .burger-btn:hover {
    background: rgba(0,242,255,0.14);
    box-shadow: 0 0 14px rgba(0,242,255,0.35);
  }

  /* ── BACKDROP ─────────────────────────────────────── */
  .pantera-backdrop {
    position: fixed; inset: 0;
    background: rgba(0,0,0,0.65);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.35s ease;
    z-index: 1998;
  }
  .pantera-backdrop.open {
    opacity: 1;
    pointer-events: auto;
  }

  /* ── PANEL MÓVIL ──────────────────────────────────── */
  .pantera-panel {
    display: none;
    position: fixed;
    top: 0; right: 0;
    height: 100dvh;
    width: var(--panel-w);
    z-index: 1999;
    background: linear-gradient(160deg, rgba(8,8,14,0.99) 0%, rgba(4,4,10,0.99) 100%);
    border-left: 1px solid rgba(0,242,255,0.25);
    box-shadow: -24px 0 60px rgba(0,0,0,0.7), -2px 0 0 rgba(0,242,255,0.08);
    transform: translateX(100%);
    transition: transform 0.42s cubic-bezier(.22,.8,.2,1);
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .pantera-panel.open { transform: translateX(0); }

  .panel-header {
    padding: 28px 24px 0;
    flex-shrink: 0;
  }
  .panel-logo {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--cyan);
    font-size: 0.8rem;
    font-weight: 900;
    letter-spacing: 2px;
    margin-bottom: 20px;
  }
  .panel-divider {
    height: 1px;
    background: linear-gradient(90deg, rgba(0,242,255,0.4), transparent);
    margin-bottom: 8px;
  }

  .panel-nav {
    flex: 1;
    overflow-y: auto;
    padding: 12px 16px;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .panel-link {
    display: flex;
    align-items: center;
    gap: 12px;
    color: rgba(210,210,225,0.8);
    text-decoration: none;
    font-size: 0.9rem;
    font-weight: 600;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    padding: 13px 16px;
    border-radius: 10px;
    border: 1px solid transparent;
    transition: all 0.22s ease;
    opacity: 0;
    transform: translateX(24px);
    position: relative;
  }
  .pantera-panel.open .panel-link {
    animation: slideInLink 0.38s cubic-bezier(.22,.8,.2,1) forwards;
    animation-delay: calc(var(--i, 0) * 0.055s + 0.1s);
  }
  .panel-link:hover {
    color: var(--cyan);
    background: rgba(0,242,255,0.07);
    border-color: rgba(0,242,255,0.2);
    transform: translateX(4px);
  }
  .panel-link.active {
    color: var(--cyan);
    background: rgba(0,242,255,0.1);
    border-color: rgba(0,242,255,0.3);
    text-shadow: 0 0 10px rgba(0,242,255,0.35);
  }
  .panel-link-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: rgba(0,242,255,0.35);
    flex-shrink: 0;
    transition: background 0.2s;
  }
  .panel-link:hover .panel-link-dot,
  .panel-link.active .panel-link-dot {
    background: var(--cyan);
    box-shadow: 0 0 8px var(--cyan);
  }
  .panel-active-badge {
    margin-left: auto;
    font-size: 0.62rem;
    font-weight: 700;
    letter-spacing: 1px;
    color: var(--cyan);
    background: rgba(0,242,255,0.12);
    border: 1px solid rgba(0,242,255,0.3);
    padding: 2px 8px;
    border-radius: 20px;
  }

  .panel-footer {
    padding: 16px 20px 32px;
    flex-shrink: 0;
    border-top: 1px solid rgba(255,255,255,0.06);
  }
  .panel-login-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    color: var(--cyan);
    text-decoration: none;
    font-size: 0.82rem;
    font-weight: 700;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    padding: 13px;
    border-radius: 10px;
    border: 1px solid rgba(0,242,255,0.35);
    background: rgba(0,242,255,0.07);
    transition: all 0.22s ease;
    margin-bottom: 14px;
    opacity: 0;
    transform: translateX(24px);
  }
  .pantera-panel.open .panel-login-btn {
    animation: slideInLink 0.38s cubic-bezier(.22,.8,.2,1) forwards;
    animation-delay: calc(var(--i, 0) * 0.055s + 0.1s);
  }
  .panel-login-btn:hover {
    background: rgba(0,242,255,0.15);
    border-color: rgba(0,242,255,0.6);
    box-shadow: 0 0 18px rgba(0,242,255,0.25);
  }
  .panel-tagline {
    text-align: center;
    font-size: 0.68rem;
    letter-spacing: 2px;
    color: rgba(255,255,255,0.2);
    text-transform: uppercase;
    margin: 0;
  }

  @keyframes slideInLink {
    to { opacity: 1; transform: translateX(0); }
  }

  /* ── RESPONSIVE ───────────────────────────────────── */
  @media (max-width: 1100px) {
    .pantera-nav { padding: 0 28px; }
    .pantera-link { font-size: 0.72rem; padding: 6px 9px; }
    .logo-text { font-size: 1.1rem; }
  }

  @media (max-width: 900px) {
    .pantera-links { display: none; }
    .burger-btn { display: flex; }
    .pantera-panel { display: flex; }
    .login-label { display: none; }
    .login-btn { padding: 8px 10px; }
  }

  @media (max-width: 480px) {
    .pantera-nav { padding: 0 16px; height: 64px; }
    .logo-text { font-size: 1rem; letter-spacing: 1.5px; }
    .pantera-panel { width: 88%; }
  }
`;

export default Navbar;