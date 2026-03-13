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
        {/* NUEVA CATEGORÍA AGREGADA */}
        <Link to="/couriers" className="nav-link" style={styles.link}>COURIERS</Link>
        <Link to="/soporte" className="nav-link" style={styles.link}>SOPORTE</Link>
        
        {/* ICONO DE LOGIN / ADMIN */}
        <Link to="/login" className="nav-link login-icon" style={styles.loginBtn} title="Acceso Admin">
          <span style={styles.iconSpan}>🔐</span>
        </Link>
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
    height: '80px',
    backgroundColor: 'rgba(10, 10, 11, 0.95)',
    borderBottom: '2px solid var(--neon-cyan)',
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 2000,
    boxSizing: 'border-box',
    backdropFilter: 'blur(8px)',
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
    alignItems: 'center', // Alinea el icono verticalmente con los textos
    gap: '25px', // Reduje un poco el gap para que quepa todo bien
  },
  link: {
    color: '#e0e0e0',
    textDecoration: 'none',
    fontSize: '0.8rem', // Ajustado ligeramente para mayor espacio
    fontWeight: '600',
    transition: 'all 0.3s ease',
    letterSpacing: '1.2px',
    textTransform: 'uppercase'
  },
  loginBtn: {
    textDecoration: 'none',
    marginLeft: '15px',
    padding: '5px 10px',
    borderRadius: '8px',
    backgroundColor: 'rgba(0, 242, 255, 0.05)',
    border: '1px solid rgba(0, 242, 255, 0.2)',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconSpan: {
    fontSize: '1.1rem',
    filter: 'drop-shadow(0 0 5px rgba(0, 242, 255, 0.5))'
  }
};

export default Navbar;