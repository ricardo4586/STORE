import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={styles.nav}>
      <div style={styles.logoContainer}>
        <Link to="/" style={styles.logoText}>
          <span style={{ color: 'white' }}>PANTERA</span> STORE
        </Link>
      </div>
      
      <div style={styles.navLinks}>
        <Link to="/" className="nav-link" style={styles.link}>INICIO</Link>
        <Link to="/sets Cache" className="nav-link" style={styles.link}>SETS Cache</Link>
        <Link to="/climas" className="nav-link" style={styles.link}>CLIMAS</Link>
        <Link to="/inmortales" className="nav-link" style={styles.link}>INMORTALES</Link>
        <Link to="/arcanos" className="nav-link" style={styles.link}>ARCANOS</Link>
        <Link to="/soporte" className="nav-link" style={styles.link}>SOPORTE</Link>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 50px',
    height: '80px', // Altura fija para controlar el layout
    backgroundColor: 'rgba(10, 10, 11, 0.95)', // Casi negro con transparencia
    borderBottom: '2px solid var(--neon-cyan)',
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 2000, // Por encima del carrusel (que tiene 10)
    boxSizing: 'border-box',
    backdropFilter: 'blur(8px)', // Efecto de cristal esmerilado
  },
  logoText: {
    color: 'var(--neon-cyan)',
    fontWeight: '900',
    fontSize: '1.6rem',
    textDecoration: 'none',
    textShadow: '0 0 15px rgba(0, 242, 255, 0.6)',
    letterSpacing: '2px'
  },
  navLinks: {
    display: 'flex',
    gap: '30px',
  },
  link: {
    color: '#e0e0e0',
    textDecoration: 'none',
    fontSize: '0.85rem',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    letterSpacing: '1.5px',
    textTransform: 'uppercase'
  }
};

export default Navbar;