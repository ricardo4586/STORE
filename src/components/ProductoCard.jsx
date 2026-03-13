import React from 'react';
import { useCart } from '../context/CartContext'; // Importamos el carrito

const ProductoCard = ({ producto }) => {
  const { addToCart } = useCart(); // Hook para usar la función de agregar

  const contactarWhatsAppDirecto = () => {
    const telefono = "51912167997"; 
    // Corregido: Usamos la misma variable 'mensaje'
    const mensaje = `Hola Pantera Store, me interesa adquirir este ítem: ${producto.nombre} (S/ ${producto.precio})`;
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
        <p style={styles.precio}>S/ {Number(producto.precio).toFixed(2)}</p>
        
        {/* BOTONES ACCIÓN */}
        <div style={styles.containerBotones}>
          <button 
            onClick={contactarWhatsAppDirecto} 
            className="btn-neon" 
            style={{...styles.boton, backgroundColor: '#25d366'}}
          >
            ADQUIRIR YA
          </button>
          
          <button 
            onClick={() => addToCart(producto)} 
            style={{...styles.boton, backgroundColor: 'var(--neon-purple)'}}
          >
            + CARRITO
          </button>
        </div>
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
    fontSize: '0.9rem', 
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
    fontSize: '1.4rem',
    margin: '10px 0'
  },
  containerBotones: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginTop: '10px'
  },
  boton: { 
    width: '100%',
    padding: '10px',
    borderRadius: '6px',
    border: 'none',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '0.75rem',
    cursor: 'pointer',
    textTransform: 'uppercase',
    transition: '0.3s'
  }
};

export default ProductoCard;