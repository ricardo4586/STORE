import React from 'react';
import ProductoCard from '../components/ProductoCard';

const Climas = () => {
  // Datos de ejemplo para Climas de Dota 2
  const climasData = [
    { id: 101, nombre: "Weather Ash", precio: 8.50, rareza: "RARE", imagenUrl: "https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_5fCscycG6S6EDuH80K99_L_rDeGzV_m_e-Wp3r-2-7FzUAn_K_F3Ips89_m9m_D6UAn-p_K3Vp_45cgF9-Wn_L6Wp-m_K3Fz_m-20An9S-W6Anp-S/360fx360f" },
    { id: 102, nombre: "Weather Spring", precio: 5.00, rareza: "RARE", imagenUrl: "https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_5fCscycG6S6EDuH80K99_L_rDeGzV_m_e-Wp3r-2-7FzUAn_K_F3Ips89_m9m_D6UAn-p_K3Vp_45cgF9-Wn_L6Wp-m_K3Fz_m-20An9S-W6Anp-S/360fx360f" }
  ];

  return (
    <div style={{ padding: '40px', backgroundColor: '#0a0a0b', minHeight: '100vh' }}>
      <h1 style={{ color: 'var(--neon-cyan)', textAlign: 'center', marginTop: '50px' }}>CLIMAS</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        {climasData.map(item => (
          <ProductoCard key={item.id} producto={item} />
        ))}
      </div>
    </div>
  );
};

export default Climas;