import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';

const CarritoFlotante = () => {
  const { cart, total, clearCart } = useCart();
  const [show, setShow] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);

  // Efecto visual de rebote cuando cambia el tamaño del carrito
  useEffect(() => {
    if (cart.length > 0) {
      setIsBouncing(true);
      const timer = setTimeout(() => setIsBouncing(false), 400);
      return () => clearTimeout(timer);
    }
  }, [cart.length]);

  const finalizarPedidoTotal = () => {
    const listaItems = cart.map(i => `- ${i.nombre} (S/ ${i.precio})`).join('\n');
    const msg = `¡Hola Pantera Store! 🐆\nQuiero adquirir los siguientes ítems:\n${listaItems}\n\nTOTAL: S/ ${total.toFixed(2)}`;
    window.open(`https://wa.me/51912167997?text=${encodeURIComponent(msg)}`, '_blank');
  };

  if (cart.length === 0) return null;

  return (
    <div style={styles.container}>
      <button 
        onClick={() => setShow(!show)} 
        className={`cart-active ${isBouncing ? 'cart-bounce-effect' : ''}`}
        style={styles.badge}
      >
        <span style={{ fontSize: '1.2rem' }}>🛒</span>
        <div style={styles.countBadge}>{cart.length}</div>
        <span style={styles.priceText}>S/ {total.toFixed(2)}</span>
      </button>

      {show && (
        <div style={styles.modal}>
          <div style={styles.modalHeader}>
            <h3 style={{ color: 'var(--neon-cyan)', margin: 0 }}>TU PEDIDO</h3>
            <button onClick={() => setShow(false)} style={styles.btnClose}>✕</button>
          </div>
          
          <div style={styles.lista}>
            {cart.map((item, index) => (
              <div key={index} style={styles.itemRow}>
                <span>{item.nombre}</span>
                <span style={{ color: 'var(--neon-cyan)' }}>S/ {item.precio.toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div style={styles.footer}>
            <div style={styles.totalRow}>
              <span>TOTAL ACUMULADO:</span>
              <span style={styles.totalAmount}>S/ {total.toFixed(2)}</span>
            </div>
            <button onClick={finalizarPedidoTotal} style={styles.btnFinalizar}>
              PEDIR POR WHATSAPP
            </button>
            <button onClick={clearCart} style={styles.btnLimpiar}>Vaciar Carrito</button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: { position: 'fixed', bottom: '30px', right: '30px', zIndex: 3000 },
  badge: { 
    display: 'flex', 
    alignItems: 'center', 
    gap: '12px',
    padding: '12px 20px', 
    borderRadius: '50px', 
    backgroundColor: '#000', 
    color: '#fff', 
    border: '2px solid var(--neon-cyan)', 
    fontWeight: 'bold', 
    cursor: 'pointer',
    position: 'relative'
  },
  countBadge: {
    position: 'absolute',
    top: '-8px',
    left: '15px',
    backgroundColor: 'var(--neon-purple)',
    color: 'white',
    borderRadius: '50%',
    width: '22px',
    height: '22px',
    fontSize: '0.75rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '2px solid #000'
  },
  priceText: { borderLeft: '1px solid #444', paddingLeft: '10px', color: 'var(--neon-cyan)' },
  modal: { 
    position: 'absolute', 
    bottom: '80px', 
    right: '0', 
    width: '320px', 
    backgroundColor: 'rgba(15, 15, 17, 0.98)', 
    border: '1px solid var(--neon-cyan)', 
    borderRadius: '16px', 
    padding: '20px', 
    color: 'white',
    boxShadow: '0 10px 40px rgba(0,0,0,0.8)',
    backdropFilter: 'blur(10px)'
  },
  modalHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' },
  btnClose: { background: 'none', border: 'none', color: '#666', cursor: 'pointer', fontSize: '1.2rem' },
  lista: { maxHeight: '250px', overflowY: 'auto', margin: '15px 0' },
  itemRow: { 
    display: 'flex', 
    justifyContent: 'space-between', 
    padding: '10px 0', 
    fontSize: '0.85rem',
    borderBottom: '1px solid #222' 
  },
  footer: { marginTop: '15px', display: 'flex', flexDirection: 'column', gap: '10px' },
  totalRow: { display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '5px' },
  totalAmount: { color: 'var(--neon-cyan)', fontWeight: 'bold', fontSize: '1.1rem' },
  btnFinalizar: { 
    backgroundColor: '#25d366', 
    color: 'white', 
    border: 'none', 
    padding: '12px', 
    borderRadius: '8px', 
    cursor: 'pointer', 
    fontWeight: 'bold',
    fontSize: '0.9rem',
    boxShadow: '0 4px 15px rgba(37, 211, 102, 0.3)'
  },
  btnLimpiar: { background: 'none', color: '#ff4d4d', border: 'none', cursor: 'pointer', fontSize: '0.75rem' }
};

export default CarritoFlotante;