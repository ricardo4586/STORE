// src/pages/Sets.jsx - Versión Corregida

import { useState, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import {
  Search,
  Package,
  RefreshCw,
  AlertCircle,
  Swords,
  Wind,
  Brain,
  Infinity as InfinityIcon,
  LayoutGrid,
} from 'lucide-react';
import ProductoCard from '../components/ProductoCard';

import 'swiper/css';
import 'swiper/css/effect-fade';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const FONDOS_SETS = [
  '/imagen4.jpeg',
  '/imagen3.jpeg',
  '/imagen7.jpeg',
];

const HEROES_POR_ATRIBUTO = {
  Fuerza: ['Abaddon','Alchemist','Axe','Beastmaster','Brewmaster','Bristleback','Centaur Warrunner','Chaos Knight','Dawnbreaker','Doom','Dragon Knight','Earth Spirit','Earthshaker','Elder Titan','Huskar','Io','Kunkka','Legion Commander','Lifestealer','Mars','Night Stalker','Omniknight','Primal Beast','Pudge','Slardar','Spirit Breaker','Sven','Tidehunter','Timbersaw','Tiny','Treant Protector','Tusk','Underlord','Undying','Wraith King'],
  Agilidad: ['Anti-Mage','Arc Warden','Bloodseeker','Bounty Hunter','Clinkz','Drow Ranger','Ember Spirit','Faceless Void','Gyrocopter','Hoodwink','Juggernaut','Luna','Medusa','Meepo','Mirana','Monkey King','Morphling','Naga Siren','Phantom Assassin','Phantom Lancer','Razor','Riki','Shadow Fiend','Slark','Sniper','Spectre','Templar Assassin','Terrorblade','Troll Warlord','Ursa','Viper','Weaver'],
  Inteligencia: ['Ancient Apparition','Crystal Maiden','Death Prophet','Disruptor','Enchantress','Enigma','Grimstroke','Jakiro','Keeper of the Light','Leshrak','Lich','Lina','Lion','Nature\'s Prophet','Necrophos','Ogre Magi','Oracle','Outworld Destroyer','Puck','Pugna','Queen of Pain','Rubick','Shadow Demon','Shadow Shaman','Silencer','Skywrath Mage','Storm Spirit','Tinker','Warlock','Witch Doctor','Zeus'],
  Universal: ['Bane','Batrider','Broodmother','Chen','Clockwerk','Dark Seer','Dark Willow','Dazzle','Invoker','Kez','Lone Druid','Lycan','Magnus','Marci','Muerta','Nyx Assassin','Pangolier','Phoenix','Sand King','Snapfire','Techies','Vengeful Spirit','Venomancer','Visage','Void Spirit','Windranger','Winter Wyvern'],
};

const ATRIBUTOS = [
  { key: 'TODOS',         label: 'Todos',        icon: LayoutGrid,   color: '#00f2ff' },
  { key: 'Fuerza',        label: 'Fuerza',       icon: Swords,       color: '#ff4d4d' },
  { key: 'Agilidad',      label: 'Agilidad',     icon: Wind,         color: '#4dff4d' },
  { key: 'Inteligencia',  label: 'Inteligencia', icon: Brain,        color: '#4dbdff' },
  { key: 'Universal',     label: 'Universal',    icon: InfinityIcon, color: '#d94dff' },
];

const keyframes = `
  @keyframes kenBurns {
    0%   { transform: scale(1) translate(0, 0); }
    50%  { transform: scale(1.12) translate(-2%, -1%); }
    100% { transform: scale(1) translate(0, 0); }
  }
  @keyframes shimmer {
    0%   { background-position: -400px 0; }
    100% { background-position: 400px 0; }
  }
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;

function SkeletonCard() {
  const shimmerStyle = {
    background: 'linear-gradient(90deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 100%)',
    backgroundSize: '800px 100%',
    animation: 'shimmer 1.4s infinite linear',
  };
  return (
    <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(0,242,255,0.15)', borderRadius: 16, overflow: 'hidden', height: 380 }}>
      <div style={{ width: '100%', height: 220, ...shimmerStyle }} />
      <div style={{ padding: '1rem' }}>
        <div style={{ width: '70%', height: 16, borderRadius: 6, marginBottom: 10, ...shimmerStyle }} />
        <div style={{ width: '40%', height: 14, borderRadius: 6, ...shimmerStyle }} />
      </div>
    </div>
  );
}

export default function Sets() {
  const [setsData, setSetsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [busqueda, setBusqueda] = useState('');
  const [atributoSeleccionado, setAtributoSeleccionado] = useState('TODOS');

  const cargarSets = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(API_URL, { params: { categoria: 'sets' } });
      setSetsData(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setError(err?.response?.data?.message || 'No pudimos conectar con el servidor.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { cargarSets(); }, [cargarSets]);

  const productosFiltrados = useMemo(() => {
    let lista = [...setsData];
    if (busqueda.trim()) {
      const q = busqueda.trim().toLowerCase();
      lista = lista.filter(p => p.nombre?.toLowerCase().includes(q) || p.heroe?.toLowerCase().includes(q));
    }
    if (atributoSeleccionado !== 'TODOS') {
      const heroesDelAtributo = HEROES_POR_ATRIBUTO[atributoSeleccionado] || [];
      lista = lista.filter(p => heroesDelAtributo.includes(p.heroe));
    }
    return lista;
  }, [setsData, busqueda, atributoSeleccionado]);

  return (
    <div style={styles.mainWrapper}>
      <style>{keyframes}</style>

      <div style={styles.swiperWrapper}>
        <Swiper modules={[Autoplay, EffectFade]} effect="fade" speed={2500} autoplay={{ delay: 6000 }} loop style={styles.swiper}>
          {FONDOS_SETS.map((url, index) => (
            <SwiperSlide key={index}>
              <div style={{ ...styles.slideBackground, backgroundImage: `url(${url})`, animation: 'kenBurns 20s ease-in-out infinite' }} />
            </SwiperSlide>
          ))}
        </Swiper>
        <div style={styles.backdropOverlay} />
      </div>

      <div style={styles.contentLayer}>
        <div style={{ ...styles.header, animation: 'fadeInUp 0.6s ease' }}>
          <h1 style={styles.title}>CATÁLOGO <span style={{ color: '#00f2ff' }}>PANTERA</span></h1>
          <div style={styles.underline} />
          <p style={styles.subtitle}>Explora los mejores sets de Dota 2 por atributo o por héroe.</p>
        </div>

        <div style={styles.filterContainer}>
          <div style={{ position: 'relative', width: '100%', maxWidth: 500 }}>
            <Search size={18} color="rgba(255,255,255,0.5)" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Busca por nombre del set o héroe..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              style={{ ...styles.searchInput, paddingLeft: 42 }}
            />
          </div>

          <div style={styles.attributeButtons}>
            {ATRIBUTOS.map((attr) => {
              const Icon = attr.icon;
              const activo = atributoSeleccionado === attr.key;
              return (
                <button
                  key={attr.key}
                  onClick={() => setAtributoSeleccionado(attr.key)}
                  style={{
                    ...styles.btnBase,
                    ...(activo
                      ? {
                          borderColor: attr.color,
                          background: 'rgba(0,0,0,0.3)', // Fondo oscuro leve
                          color: attr.color,           // Texto del color del atributo
                          boxShadow: `0 0 15px ${attr.color}33`,
                        }
                      : {
                          background: 'transparent',
                          color: 'rgba(255,255,255,0.4)',
                        }),
                  }}
                >
                  <Icon size={16} color={activo ? attr.color : 'rgba(255,255,255,0.4)'} />
                  <span>{attr.label.toUpperCase()}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div style={styles.resultsCount}>
          Mostrando <strong>{productosFiltrados.length}</strong> de <strong>{setsData.length}</strong> sets
        </div>

        <div style={styles.grid}>
          {loading ? (
            Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
          ) : productosFiltrados.length > 0 ? (
            productosFiltrados.map((item) => <ProductoCard key={item._id} producto={item} />)
          ) : (
            <div style={styles.stateCard}>
              <Package size={42} color="rgba(255,255,255,0.3)" />
              <h3 style={styles.stateTitle}>Sin resultados</h3>
              <p style={styles.stateText}>Prueba con otro término o atributo.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  mainWrapper: { position: 'relative', minHeight: '100vh', backgroundColor: '#000' },
  swiperWrapper: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 },
  swiper: { width: '100%', height: '100%' },
  slideBackground: { width: '100%', height: '100%', backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.3) blur(1px)' },
  backdropOverlay: { position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at top, rgba(0,242,255,0.08) 0%, transparent 70%), linear-gradient(180deg, rgba(0,0,0,0.2) 0%, #000 100%)', zIndex: 1 },
  contentLayer: { position: 'relative', zIndex: 2, padding: '120px 5% 100px', maxWidth: 1400, margin: '0 auto' },
  header: { textAlign: 'center', marginBottom: 40 },
  title: { fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, letterSpacing: 2, textTransform: 'uppercase', color: '#fff' },
  underline: { height: 3, width: 80, background: '#00f2ff', margin: '15px auto', boxShadow: '0 0 15px #00f2ff' },
  subtitle: { color: 'rgba(255,255,255,0.6)', fontSize: '1.1rem' },
  filterContainer: { 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center', 
    gap: 25, 
    background: 'rgba(255,255,255,0.03)', 
    backdropFilter: 'blur(10px)', 
    padding: '2rem', 
    borderRadius: 20, 
    border: '1px solid rgba(255,255,255,0.05)', 
    maxWidth: 900, 
    margin: '0 auto 40px' 
  },
  searchInput: { 
    padding: '0.9rem 1.2rem', 
    width: '100%', 
    borderRadius: 12, 
    border: '1px solid rgba(0,242,255,0.2)', 
    backgroundColor: 'rgba(0,0,0,0.5)', 
    color: '#fff', 
    outline: 'none' 
  },
  attributeButtons: { display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' },
  btnBase: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 10,
    padding: '0.7rem 1.2rem',
    borderRadius: 10,
    border: '1px solid rgba(255,255,255,0.1)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontWeight: 700,
    fontSize: '0.8rem',
    letterSpacing: 1,
    outline: 'none',
    WebkitTapHighlightColor: 'transparent' // Quita el flash en móviles
  },
  resultsCount: { color: 'rgba(255,255,255,0.4)', textAlign: 'center', marginBottom: 30 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 30 },
  stateCard: { gridColumn: '1/-1', textAlign: 'center', padding: '4rem', opacity: 0.5 },
  stateTitle: { color: '#fff', marginTop: 15 },
  stateText: { color: 'rgba(255,255,255,0.5)' }
};