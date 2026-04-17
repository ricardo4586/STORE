import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import ProductoCard from '../components/ProductoCard';

// Estilos de Swiper
import 'swiper/css';
import 'swiper/css/effect-fade';

const Sets = () => {
  const heroesPorAtributo = {
    Fuerza: ["Abaddon", "Alchemist", "Axe", "Beastmaster", "Brewmaster", "Bristleback", "Centaur Warrunner", "Chaos Knight", "Dawnbreaker", "Doom", "Dragon Knight", "Earth Spirit", "Earthshaker", "Elder Titan", "Huskar", "Io", "Kunkka", "Legion Commander", "Lifestealer", "Mars", "Night Stalker", "Omniknight", "Primal Beast", "Pudge", "Slardar", "Spirit Breaker", "Sven", "Tidehunter", "Timbersaw", "Tiny", "Treant Protector", "Tusk", "Underlord", "Undying", "Wraith King"],
    Agilidad: ["Anti-Mage", "Arc Warden", "Bloodseeker", "Bounty Hunter", "Clinkz", "Drow Ranger", "Ember Spirit", "Faceless Void", "Gyrocopter", "Hoodwink", "Juggernaut", "Luna", "Medusa", "Meepo", "Mirana", "Monkey King", "Morphling", "Naga Siren", "Phantom Assassin", "Phantom Lancer", "Razor", "Riki", "Shadow Fiend", "Slark", "Sniper", "Spectre", "Templar Assassin", "Terrorblade", "Troll Warlord", "Ursa", "Viper", "Weaver"],
    Inteligencia: ["Ancient Apparition", "Crystal Maiden", "Death Prophet", "Disruptor", "Enchantress", "Enigma", "Grimstroke", "Jakiro", "Keeper of the Light", "Leshrak", "Lich", "Lina", "Lion", "Nature's Prophet", "Necrophos", "Ogre Magi", "Oracle", "Outworld Destroyer", "Puck", "Pugna", "Queen of Pain", "Rubick", "Shadow Demon", "Shadow Shaman", "Silencer", "Skywrath Mage", "Storm Spirit", "Tinker", "Warlock", "Witch Doctor", "Zeus"],
    Universal: ["Bane", "Batrider", "Broodmother", "Chen", "Clockwerk", "Dark Seer", "Dark Willow", "Dazzle", "Invoker", "Kez", "Lone Druid", "Lycan", "Magnus", "Marci", "Muerta", "Nyx Assassin", "Pangolier", "Phoenix", "Sand King", "Snapfire", "Techies", "Vengeful Spirit", "Venomancer", "Visage", "Void Spirit", "Windranger", "Winter Wyvern"]
  };

  const [setsData, setSetsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [atributoSeleccionado, setAtributoSeleccionado] = useState("TODOS");

  // --- IMÁGENES DE FONDO ---
  const fondosSets = [
    "/fondos/sets1.png", 
    "/fondos/sets2.png", 
    "/fondos/sets3.png"
  ];

  useEffect(() => {
    const fetchSets = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/productos');
        const soloSets = res.data.filter(item => item.categoria === 'sets');
        setSetsData(soloSets);
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar sets:", error);
        setLoading(false);
      }
    };
    fetchSets();
  }, []);

  const productosFiltrados = setsData.filter(item => {
    const coincideNombre = 
      item.nombre.toLowerCase().includes(busqueda.toLowerCase()) || 
      item.heroe.toLowerCase().includes(busqueda.toLowerCase());
    
    const coincideAtributo = 
      atributoSeleccionado === "TODOS" || 
      (heroesPorAtributo[atributoSeleccionado] && heroesPorAtributo[atributoSeleccionado].includes(item.heroe));
    
    return coincideNombre && coincideAtributo;
  });

  return (
    <div style={styles.mainWrapper}>
      {/* --- CARRUSEL DE FONDO FIJO --- */}
      <div style={styles.swiperWrapper}>
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect={'fade'}
          speed={2500}
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          loop={true}
          style={styles.swiper}
        >
          {fondosSets.map((url, index) => (
            <SwiperSlide key={index}>
              <div style={{ ...styles.slideBackground, backgroundImage: `url(${url})` }} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div style={styles.contentLayer}>
        <div style={styles.header}>
          <h1 style={styles.title}>CATÁLOGO <span style={{color: 'var(--neon-cyan)'}}>PANTERA</span></h1>
          <div style={styles.underline}></div>
          <p style={styles.subtitle}>Explora los mejores Sets de Dota 2</p>
        </div>

        <div style={styles.filterContainer}>
          <input 
            type="text" 
            placeholder="Escribe el nombre del héroe o del set..." 
            style={styles.searchInput}
            onChange={(e) => setBusqueda(e.target.value)}
          />

          <div style={styles.attributeButtons}>
            {["TODOS", "Fuerza", "Agilidad", "Inteligencia", "Universal"].map(attr => (
               <button 
               key={attr}
               onClick={() => setAtributoSeleccionado(attr)}
               style={
                 atributoSeleccionado === attr 
                   ? (attr === "Fuerza" ? styles.btnStr : attr === "Agilidad" ? styles.btnAgi : attr === "Inteligencia" ? styles.btnInt : attr === "Universal" ? styles.btnUni : styles.btnActive)
                   : styles.btnInactive
               }>
               {attr.toUpperCase()}
             </button>
            ))}
          </div>
        </div>

        <div style={styles.grid}>
          {loading ? (
            <p style={{color: 'white', textAlign: 'center', gridColumn: '1/-1'}}>Cargando inventario...</p>
          ) : productosFiltrados.length > 0 ? (
            productosFiltrados.map(item => <ProductoCard key={item._id} producto={item} />)
          ) : (
            <p style={{color: '#888', textAlign: 'center', gridColumn: '1/-1'}}>No se encontraron resultados para tu búsqueda.</p>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  mainWrapper: { position: 'relative', minHeight: '100vh', backgroundColor: '#000' },
  swiperWrapper: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 },
  swiper: { width: '100%', height: '100%' },
  slideBackground: { 
    width: '100%', height: '100%', backgroundSize: 'cover', backgroundPosition: 'center',
    filter: 'brightness(0.3) blur(1px)' // Desenfoque ligero para resaltar el catálogo
  },
  contentLayer: { position: 'relative', zIndex: 1, padding: '120px 5% 100px' },
  header: { textAlign: 'center', marginBottom: '40px' },
  title: { fontSize: '2.5rem', fontWeight: '900', letterSpacing: '2px', color: 'white', textShadow: '2px 2px 10px rgba(0,0,0,0.8)' },
  underline: { height: '4px', width: '80px', background: 'var(--neon-cyan)', margin: '10px auto', boxShadow: '0 0 10px var(--neon-cyan)' },
  subtitle: { color: '#ccc', textAlign: 'center', marginTop: '-5px', marginBottom: '20px' },
  filterContainer: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', marginBottom: '50px', background: 'rgba(10, 10, 12, 0.85)', backdropFilter: 'blur(10px)', padding: '30px', borderRadius: '15px', border: '1px solid rgba(255, 255, 255, 0.1)', maxWidth: '800px', margin: '0 auto 50px' },
  searchInput: { padding: '12px 20px', width: '100%', maxWidth: '450px', borderRadius: '8px', border: '1px solid #444', backgroundColor: 'rgba(0,0,0,0.8)', color: 'white', outline: 'none' },
  attributeButtons: { display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' },
  btnInactive: { padding: '10px 15px', borderRadius: '5px', border: '1px solid #333', backgroundColor: 'rgba(0,0,0,0.5)', color: '#888', cursor: 'pointer', transition: '0.3s' },
  btnActive: { padding: '10px 15px', borderRadius: '5px', border: '1px solid var(--neon-cyan)', backgroundColor: 'rgba(0, 242, 255, 0.2)', color: 'var(--neon-cyan)', cursor: 'pointer' },
  btnStr: { padding: '10px 15px', borderRadius: '5px', border: '2px solid #ff4d4d', backgroundColor: 'rgba(255, 77, 77, 0.3)', color: 'white', cursor: 'pointer', fontWeight: 'bold' },
  btnAgi: { padding: '10px 15px', borderRadius: '5px', border: '2px solid #4dff4d', backgroundColor: 'rgba(77, 255, 77, 0.3)', color: 'white', cursor: 'pointer', fontWeight: 'bold' },
  btnInt: { padding: '10px 15px', borderRadius: '5px', border: '2px solid #4dbdff', backgroundColor: 'rgba(77, 189, 255, 0.3)', color: 'white', cursor: 'pointer', fontWeight: 'bold' },
  btnUni: { padding: '10px 15px', borderRadius: '5px', border: '2px solid #d94dff', backgroundColor: 'rgba(217, 77, 255, 0.3)', color: 'white', cursor: 'pointer', fontWeight: 'bold' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px', maxWidth: '1200px', margin: '0 auto' }
};

export default Sets;