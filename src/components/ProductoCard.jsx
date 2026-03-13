import React from 'react';

const ProductoCard = ({ producto }) => {
  // Función para que el botón abra WhatsApp con el nombre del ítem
  const contactarWhatsApp = () => {
    const telefono = "51900000000"; // Pon aquí el número del cliente
    const mensaje = `Hola Pantera Store, me interesa el ítem de Dota 2: ${producto.nombre}`;
    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  };

  return (
    <div style={styles.card} className="card-hover">
      <div style={styles.badge}>{producto.rareza || 'ITEM'}</div>
      <img src={producto.imagenUrl} alt={producto.nombre} style={styles.image} />
      
      <div style={styles.info}>
        <h3 style={styles.titulo}>{producto.nombre}</h3>
        <div style={styles.divider}></div>
        <p style={styles.precio}>S/ {producto.precio}</p>
        <button onClick={contactarWhatsApp} className="btn-neon" style={styles.boton}>
          ADQUIRIR ÍTEM
        </button>
      </div>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: '#1a1a1c',
    borderRadius: '12px',
    overflow: 'hidden',
    border: '1px solid #333',
    boxShadow: '0 10px 20px rgba(0,0,0,0.5)',
    position: 'relative',
    transition: 'transform 0.3s ease'
  },
  badge: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    backgroundColor: 'var(--neon-purple)',
    color: 'white',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '0.7rem',
    fontWeight: 'bold',
    zIndex: 2
  },
  image: { 
    width: '100%', 
    height: '220px', 
    objectFit: 'cover',
    borderBottom: '2px solid #333'
  },
  info: { padding: '20px', textAlign: 'center' },
  titulo: { 
    margin: '0 0 10px 0', 
    fontSize: '1rem', 
    color: '#fff', 
    textTransform: 'uppercase',
    letterSpacing: '1px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  divider: {
    height: '1px',
    background: 'linear-gradient(90deg, transparent, var(--neon-cyan), transparent)',
    marginBottom: '15px'
  },
  precio: { 
    color: 'var(--neon-cyan)', 
    fontWeight: '800', 
    fontSize: '1.5rem',
    margin: '10px 0'
  },
  boton: { 
    width: '100%',
    marginTop: '10px',
    fontSize: '0.8rem'
  }
};

export default ProductoCard;