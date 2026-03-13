import React from 'react';

const Soporte = () => {
  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.title}>CENTRO DE <span style={{ color: 'var(--neon-cyan)' }}>SOPORTE</span></h1>
        <div style={styles.underline}></div>
      </div>
      
      <div style={styles.container}>
        <div style={styles.card}>
          <h2 style={{color: 'var(--neon-cyan)'}}>¿Cómo comprar?</h2>
          <p>1. Elige tu ítem favorito del catálogo.</p>
          <p>2. Haz clic en "ADQUIRIR ÍTEM".</p>
          <p>3. Coordina el pago y la entrega por WhatsApp.</p>
        </div>
        
        <div style={styles.card}>
          <h2 style={{color: 'var(--neon-purple)'}}>Métodos de Pago</h2>
          <p>Aceptamos Yape, Plin y Transferencias Bancarias (BCP, Interbank).</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: { padding: '60px 5% 100px', backgroundColor: '#0a0a0b', minHeight: '100vh', color: 'white' },
  header: { textAlign: 'center', marginBottom: '40px' },
  title: { fontSize: '2.5rem', fontWeight: '900', letterSpacing: '2px', textTransform: 'uppercase' },
  underline: { height: '4px', width: '80px', background: 'var(--neon-cyan)', margin: '10px auto' },
  container: { display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center', marginTop: '40px' },
  card: { background: '#1a1a1c', padding: '30px', borderRadius: '15px', border: '1px solid #333', maxWidth: '600px', width: '100%', textAlign: 'left' }
};

export default Soporte;