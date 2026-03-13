import React, { useState, useEffect } from 'react'; // Importamos useEffect
import axios from 'axios'; // Importamos axios
import ProductoCard from '../components/ProductoCard';
import BackgroundVideo from '../components/BackgroundVideo';

const Inmortales = () => {
  // 1. Estados iniciales
  const [inmortalesData, setInmortalesData] = useState([]); // Empieza vacío (se llena desde la DB)
  const [loading, setLoading] = useState(true);
  const [heroeSeleccionado, setHeroeSeleccionado] = useState("TODOS");

  // Lista de héroes para el filtro
  const heroesConInmortales = [
    "Axe", "Anti-Mage", "Beastmaster", "Brewmaster", "Bristleback", 
    "Chaos Knight", "Clockwerk", "Dragon Knight", "Earthshaker", 
    "Invoker", "Juggernaut", "Kunkka", "Legion Commander", 
    "Lifestealer", "Lycan", "Magnus", "Mars", "Monkey King", 
    "Ogre Magi", "Omniknight", "Phantom Lancer", "Pudge", 
    "Shadow Fiend", "Sniper", "Spirit Breaker", "Sven", 
    "Tidehunter", "Tiny", "Tusk", "Ursa", "Wraith King"
  ].sort();

  // 2. useEffect para conectar con el Backend
  useEffect(() => {
    const fetchInmortales = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/productos');
        
        // Filtramos solo los productos que pertenecen a 'inmortales'
        const soloInmortales = res.data.filter(item => item.categoria === 'inmortales');
        
        setInmortalesData(soloInmortales);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener Inmortales:", error);
        setLoading(false);
      }
    };

    fetchInmortales();
  }, []);

  // 3. Lógica de filtrado por héroe
  const productosFiltrados = inmortalesData.filter(item => {
    return heroeSeleccionado === "TODOS" || item.heroe === heroeSeleccionado;
  });

  return (
    <div style={styles.mainWrapper}>
      {/* --- VIDEO DE FONDO --- */}
      <BackgroundVideo videoSrc="/videos/inmortalvideo.mp4" />

      <div style={styles.contentLayer}>
        <div style={styles.header}>
          <h1 style={styles.title}>ITEMS <span style={{ color: 'var(--neon-cyan)' }}>INMORTALES</span></h1>
          <div style={styles.underline}></div>
          <p style={styles.subtitle}>Sincronizado con Base de Datos en Tiempo Real</p>
        </div>

        {/* --- SELECTOR DE HÉROES --- */}
        <div style={styles.filterBar}>
          <label style={styles.label}>SELECCIONA HÉROE:</label>
          <select 
            style={styles.selectInput}
            onChange={(e) => setHeroeSeleccionado(e.target.value)}
            value={heroeSeleccionado}
          >
            <option value="TODOS">-- TODOS LOS HÉROES --</option>
            {heroesConInmortales.map(heroe => (
              <option key={heroe} value={heroe}>{heroe}</option>
            ))}
          </select>
        </div>

        {/* --- REJILLA DE RESULTADOS --- */}
        <div style={styles.grid}>
          {loading ? (
            <p style={{textAlign: 'center', gridColumn: '1/-1', color: 'var(--neon-cyan)'}}>Cargando tesoros inmortales...</p>
          ) : productosFiltrados.length > 0 ? (
            productosFiltrados.map((item) => (
              <ProductoCard key={item._id} producto={item} />
            ))
          ) : (
            <div style={styles.noResult}>
              <p>No hay Inmortales registrados para <strong>{heroeSeleccionado}</strong>.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- ESTILOS (Mantenemos los tuyos que están excelentes) ---
const styles = {
  mainWrapper: { position: 'relative', minHeight: '100vh', overflow: 'hidden', backgroundColor: 'transparent' },
  contentLayer: { position: 'relative', zIndex: 1, padding: '60px 5% 100px', backgroundColor: 'transparent' },
  header: { textAlign: 'center', marginBottom: '40px' },
  title: { fontSize: '2.5rem', fontWeight: '900', letterSpacing: '2px', textTransform: 'uppercase', color: 'white', textShadow: '0 0 15px rgba(0, 242, 255, 0.4)' },
  underline: { height: '4px', width: '100px', background: 'var(--neon-cyan)', margin: '10px auto 20px', boxShadow: '0 0 10px var(--neon-cyan)' },
  subtitle: { color: '#eee', marginBottom: '20px', textShadow: '1px 1px 3px black' },
  filterBar: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', marginBottom: '50px', background: 'rgba(21, 21, 23, 0.7)', backdropFilter: 'blur(10px)', padding: '25px', borderRadius: '15px', border: '1px solid rgba(0, 242, 255, 0.2)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' },
  label: { fontSize: '0.8rem', color: 'var(--neon-cyan)', fontWeight: 'bold', letterSpacing: '1px' },
  selectInput: { padding: '12px 25px', borderRadius: '8px', border: '1px solid var(--neon-cyan)', backgroundColor: 'rgba(0,0,0,0.8)', color: 'white', fontSize: '1rem', cursor: 'pointer', width: '100%', maxWidth: '300px', outline: 'none' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '35px', maxWidth: '1200px', margin: '0 auto' },
  noResult: { gridColumn: '1/-1', textAlign: 'center', padding: '50px', color: '#ccc', background: 'rgba(0,0,0,0.4)', borderRadius: '10px', border: '1px dashed #444' }
};

export default Inmortales;