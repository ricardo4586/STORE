import React from 'react';
import ProductoCard from '../components/ProductoCard';

const Sets = () => {
  // Datos temporales de Pantera Store
  const setsData = [
    { id: 1, nombre: "Exalted Feast of Abscession", precio: 120.00, rareza: "ARCANA", imagenUrl: "/items/pudge-arcana.jpg" },
    { id: 2, nombre: "Disciple of the Wyrmwrought Flame", precio: 85.00, rareza: "INMORTAL", imagenUrl: "/items/lina-set.jpg" },
    { id: 3, nombre: "Lineage of the Stormlords", precio: 45.00, rareza: "LEGENDARIO", imagenUrl: "/items/jugg-set.jpg" },
  ];

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.title}>CATÁLOGO DE <span style={{color: 'var(--neon-cyan)'}}>SETS</span></h1>
        <p style={styles.subtitle}>Equipa a tus héroes con los mejores cosméticos</p>
      </div>

      <div style={styles.grid}>
        {setsData.map(item => (
          <ProductoCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

const styles = {
  page: { padding: '120px 5% 50px', backgroundColor: '#0a0a0b', minHeight: '100vh' },
  header: { textAlign: 'center', marginBottom: '50px' },
  title: { fontSize: '2.5rem', letterSpacing: '2px' },
  subtitle: { color: '#888', marginTop: '10px' },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: '30px',
    maxWidth: '1200px',
    margin: '0 auto'
  }
};

export default Sets;