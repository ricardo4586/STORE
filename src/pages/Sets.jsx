import React, { useState } from 'react';
import ProductoCard from '../components/ProductoCard';
import BackgroundVideo from '../components/BackgroundVideo'; 

const Sets = () => {
  const heroesPorAtributo = {
    Fuerza: ["Abaddon", "Alchemist", "Axe", "Beastmaster", "Brewmaster", "Bristleback", "Centaur Warrunner", "Chaos Knight", "Dawnbreaker", "Doom", "Dragon Knight", "Earth Spirit", "Earthshaker", "Elder Titan", "Huskar", "Io", "Kunkka", "Legion Commander", "Lifestealer", "Mars", "Night Stalker", "Omniknight", "Primal Beast", "Pudge", "Slardar", "Spirit Breaker", "Sven", "Tidehunter", "Timbersaw", "Tiny", "Treant Protector", "Tusk", "Underlord", "Undying", "Wraith King"],
    Agilidad: ["Anti-Mage", "Arc Warden", "Bloodseeker", "Bounty Hunter", "Clinkz", "Drow Ranger", "Ember Spirit", "Faceless Void", "Gyrocopter", "Hoodwink", "Juggernaut", "Luna", "Medusa", "Meepo", "Mirana", "Monkey King", "Morphling", "Naga Siren", "Phantom Assassin", "Phantom Lancer", "Razor", "Riki", "Shadow Fiend", "Slark", "Sniper", "Spectre", "Templar Assassin", "Terrorblade", "Troll Warlord", "Ursa", "Viper", "Weaver"],
    Inteligencia: ["Ancient Apparition", "Crystal Maiden", "Death Prophet", "Disruptor", "Enchantress", "Enigma", "Grimstroke", "Jakiro", "Keeper of the Light", "Leshrak", "Lich", "Lina", "Lion", "Nature's Prophet", "Necrophos", "Ogre Magi", "Oracle", "Outworld Destroyer", "Puck", "Pugna", "Queen of Pain", "Rubick", "Shadow Demon", "Shadow Shaman", "Silencer", "Skywrath Mage", "Storm Spirit", "Tinker", "Warlock", "Witch Doctor", "Zeus"],
    Universal: ["Bane", "Batrider", "Broodmother", "Chen", "Clockwerk", "Dark Seer", "Dark Willow", "Dazzle", "Invoker", "Kez", "Lone Druid", "Lycan", "Magnus", "Marci", "Muerta", "Nyx Assassin", "Pangolier", "Phoenix", "Sand King", "Snapfire", "Techies", "Vengeful Spirit", "Venomancer", "Visage", "Void Spirit", "Windranger", "Winter Wyvern"]
  };

  const [setsData] = useState([
    { id: 1, nombre: "Lineage of the Stormlords", heroe: "Juggernaut", precio: 45.0, rareza: "LEGENDARIO", imagenUrl: "https://via.placeholder.com/300x200" },
    { id: 2, nombre: "Exalted Feast of Abscession", heroe: "Pudge", precio: 120.0, rareza: "ARCANA", imagenUrl: "https://via.placeholder.com/300x200" },
    { id: 3, nombre: "Solar Forge", heroe: "Phoenix", precio: 25.0, rareza: "INMORTAL", imagenUrl: "https://via.placeholder.com/300x200" },
  ]);

  const [busqueda, setBusqueda] = useState("");
  const [atributoSeleccionado, setAtributoSeleccionado] = useState("TODOS");

  const productosFiltrados = setsData.filter(item => {
    const coincideNombre = item.nombre.toLowerCase().includes(busqueda.toLowerCase()) || 
                          item.heroe.toLowerCase().includes(busqueda.toLowerCase());
    const coincideAtributo = atributoSeleccionado === "TODOS" || 
                             heroesPorAtributo[atributoSeleccionado].includes(item.heroe);
    return coincideNombre && coincideAtributo;
  });

  return (
    <div style={styles.mainWrapper}>
      {/* 1. VIDEO DE FONDO (Asegúrate que el archivo esté en public/videos/) */}
      <BackgroundVideo videoSrc="/videos/arcanovideo.mp4" />

      <div style={styles.contentLayer}>
        <div style={styles.header}>
          <h1 style={styles.title}>CATÁLOGO <span style={{color: 'var(--neon-cyan)'}}>PANTERA</span></h1>
          <div style={styles.underline}></div>
        </div>

        {/* --- PANEL DE FILTROS --- */}
        <div style={styles.filterContainer}>
          <input 
            type="text" 
            placeholder="Escribe el nombre del héroe..." 
            style={styles.searchInput}
            onChange={(e) => setBusqueda(e.target.value)}
          />

          <div style={styles.attributeButtons}>
            <button 
              onClick={() => setAtributoSeleccionado("TODOS")}
              style={atributoSeleccionado === "TODOS" ? styles.btnActive : styles.btnInactive}>
              TODOS
            </button>
            <button 
              onClick={() => setAtributoSeleccionado("Fuerza")}
              style={atributoSeleccionado === "Fuerza" ? styles.btnStr : styles.btnInactive}>
              FUERZA
            </button>
            <button 
              onClick={() => setAtributoSeleccionado("Agilidad")}
              style={atributoSeleccionado === "Agilidad" ? styles.btnAgi : styles.btnInactive}>
              AGILIDAD
            </button>
            <button 
              onClick={() => setAtributoSeleccionado("Inteligencia")}
              style={atributoSeleccionado === "Inteligencia" ? styles.btnInt : styles.btnInactive}>
              INTELIGENCIA
            </button>
            <button 
              onClick={() => setAtributoSeleccionado("Universal")}
              style={atributoSeleccionado === "Universal" ? styles.btnUni : styles.btnInactive}>
              UNIVERSAL
            </button>
          </div>
        </div>

        <div style={styles.grid}>
          {productosFiltrados.map(item => <ProductoCard key={item.id} producto={item} />)}
        </div>
      </div>
    </div>
  );
};

const styles = {
  mainWrapper: {
    position: 'relative',
    minHeight: '100vh',
    backgroundColor: '#000', // Respaldo negro
  },
  contentLayer: {
    position: 'relative',
    zIndex: 1,
    padding: '60px 5% 100px',
  },
  header: { textAlign: 'center', marginBottom: '40px' },
  title: { fontSize: '2.5rem', fontWeight: '900', letterSpacing: '2px', color: 'white' },
  underline: { height: '4px', width: '80px', background: 'var(--neon-cyan)', margin: '10px auto' },
  
  filterContainer: { 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center', 
    gap: '20px', 
    marginBottom: '50px',
    background: 'rgba(20, 20, 22, 0.6)', 
    backdropFilter: 'blur(10px)',
    padding: '30px',
    borderRadius: '15px',
    border: '1px solid rgba(255, 255, 255, 0.1)'
  },
  searchInput: { 
    padding: '12px 20px', 
    width: '100%', 
    maxWidth: '400px', 
    borderRadius: '8px', 
    border: '1px solid #444', 
    backgroundColor: 'rgba(0,0,0,0.8)', 
    color: 'white',
    outline: 'none'
  },
  
  attributeButtons: { display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' },
  btnInactive: { padding: '10px 15px', borderRadius: '5px', border: '1px solid #333', backgroundColor: 'rgba(0,0,0,0.5)', color: '#888', cursor: 'pointer', transition: '0.3s' },
  btnActive: { padding: '10px 15px', borderRadius: '5px', border: '1px solid var(--neon-cyan)', backgroundColor: 'rgba(0, 242, 255, 0.1)', color: 'var(--neon-cyan)', cursor: 'pointer' },
  
  btnStr: { padding: '10px 15px', borderRadius: '5px', border: '1px solid #ff4d4d', backgroundColor: 'rgba(255, 77, 77, 0.2)', color: '#ff4d4d', cursor: 'pointer', fontWeight: 'bold' },
  btnAgi: { padding: '10px 15px', borderRadius: '5px', border: '1px solid #4dff4d', backgroundColor: 'rgba(77, 255, 77, 0.2)', color: '#4dff4d', cursor: 'pointer', fontWeight: 'bold' },
  btnInt: { padding: '10px 15px', borderRadius: '5px', border: '1px solid #4dbdff', backgroundColor: 'rgba(77, 189, 255, 0.2)', color: '#4dbdff', cursor: 'pointer', fontWeight: 'bold' },
  btnUni: { padding: '10px 15px', borderRadius: '5px', border: '1px solid #d94dff', backgroundColor: 'rgba(217, 77, 255, 0.2)', color: '#d94dff', cursor: 'pointer', fontWeight: 'bold' },
  
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px', maxWidth: '1200px', margin: '0 auto' }
};

export default Sets;