// src/pages/Arcanos.jsx
import { useState, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import {
  Search,
  Filter,
  Sparkles,
  Package,
  CheckCircle2,
  Users,
  RefreshCw,
  AlertCircle,
  X,
  SlidersHorizontal,
} from 'lucide-react';
import ProductoCard from '../components/ProductoCard';

import 'swiper/css';
import 'swiper/css/effect-fade';

// =============================================================================
// CONFIG
// =============================================================================
const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:5000/api/productos';

const FONDOS_ARCANOS = [
  '/imagen4.jpeg',
  '/imagen3.jpeg',
  '/imagen7.jpeg',
];


const HEROES_ARCANOS = [
  'Lina',
  'Legion Commander',
  'Techies',
  'Phantom Assassin',
  'Crystal Maiden',
  'Zeus',
  'Monkey King',
  'Juggernaut',
  'Rubick',
  'Ogre Magi',
  'Pudge',
  'Wraith King',
  'Windranger',
  'Earthshaker',
].sort();

const OPCIONES_ORDEN = [
  { value: 'recientes', label: 'Más recientes' },
  { value: 'precio-asc', label: 'Precio: menor a mayor' },
  { value: 'precio-desc', label: 'Precio: mayor a menor' },
  { value: 'nombre-asc', label: 'Nombre: A–Z' },
  { value: 'nombre-desc', label: 'Nombre: Z–A' },
  { value: 'heroe-asc', label: 'Héroe: A–Z' },
];

// =============================================================================
// KEYFRAMES
// =============================================================================
const keyframes = `
  @keyframes kenBurns {
    0%   { transform: scale(1)    translate(0, 0); }
    50%  { transform: scale(1.15) translate(-2%, -1%); }
    100% { transform: scale(1)    translate(0, 0); }
  }
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes shimmer {
    0%   { background-position: -400px 0; }
    100% { background-position: 400px 0; }
  }
`;

// =============================================================================
// SKELETON LOADER
// =============================================================================
function SkeletonCard() {
  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(188,19,254,0.15)',
        borderRadius: 16,
        overflow: 'hidden',
        height: 380,
      }}
    >
      <div
        style={{
          width: '100%',
          height: 220,
          background:
            'linear-gradient(90deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 100%)',
          backgroundSize: '800px 100%',
          animation: 'shimmer 1.4s infinite linear',
        }}
      />
      <div style={{ padding: '1rem' }}>
        <div
          style={{
            width: '70%',
            height: 16,
            borderRadius: 6,
            marginBottom: 10,
            background:
              'linear-gradient(90deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 100%)',
            backgroundSize: '800px 100%',
            animation: 'shimmer 1.4s infinite linear',
          }}
        />
        <div
          style={{
            width: '40%',
            height: 14,
            borderRadius: 6,
            background:
              'linear-gradient(90deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 100%)',
            backgroundSize: '800px 100%',
            animation: 'shimmer 1.4s infinite linear',
          }}
        />
      </div>
    </div>
  );
}

// =============================================================================
// COMPONENTE PRINCIPAL
// =============================================================================
export default function Arcanos() {
  const [arcanosData, setArcanosData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // filtros
  const [busqueda, setBusqueda] = useState('');
  const [heroeSeleccionado, setHeroeSeleccionado] = useState('TODOS');
  const [stockFiltro, setStockFiltro] = useState('TODOS'); // TODOS | DISPONIBLE | AGOTADO
  const [precioMin, setPrecioMin] = useState('');
  const [precioMax, setPrecioMax] = useState('');
  const [orden, setOrden] = useState('recientes');

  // =========================================================================
  // FETCH
  // =========================================================================
  const cargarArcanos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(API_URL, {
        params: { categoria: 'arcanos' },
      });
      setArcanosData(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error('Error al cargar arcanos:', err);
      setError(
        err?.response?.data?.message ||
          'No se pudo conectar con el servidor. Intenta nuevamente.'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    cargarArcanos();
  }, [cargarArcanos]);

  // =========================================================================
  // FILTRADO + ORDEN
  // =========================================================================
  const productosFiltrados = useMemo(() => {
    let lista = [...arcanosData];

    if (busqueda.trim()) {
      const q = busqueda.trim().toLowerCase();
      lista = lista.filter(
        (p) =>
          p.nombre?.toLowerCase().includes(q) ||
          p.heroe?.toLowerCase().includes(q) ||
          p.rareza?.toLowerCase().includes(q)
      );
    }

    if (heroeSeleccionado !== 'TODOS') {
      lista = lista.filter((p) => p.heroe === heroeSeleccionado);
    }

    if (stockFiltro === 'DISPONIBLE') lista = lista.filter((p) => p.stock);
    if (stockFiltro === 'AGOTADO') lista = lista.filter((p) => !p.stock);

    const min = parseFloat(precioMin);
    const max = parseFloat(precioMax);
    if (!isNaN(min)) lista = lista.filter((p) => Number(p.precio) >= min);
    if (!isNaN(max)) lista = lista.filter((p) => Number(p.precio) <= max);

    switch (orden) {
      case 'precio-asc':
        lista.sort((a, b) => Number(a.precio) - Number(b.precio));
        break;
      case 'precio-desc':
        lista.sort((a, b) => Number(b.precio) - Number(a.precio));
        break;
      case 'nombre-asc':
        lista.sort((a, b) => a.nombre.localeCompare(b.nombre));
        break;
      case 'nombre-desc':
        lista.sort((a, b) => b.nombre.localeCompare(a.nombre));
        break;
      case 'heroe-asc':
        lista.sort((a, b) => (a.heroe || '').localeCompare(b.heroe || ''));
        break;
      case 'recientes':
      default:
        lista.sort(
          (a, b) =>
            new Date(b.createdAt || 0).getTime() -
            new Date(a.createdAt || 0).getTime()
        );
        break;
    }
    return lista;
  }, [arcanosData, busqueda, heroeSeleccionado, stockFiltro, precioMin, precioMax, orden]);

  // =========================================================================
  // STATS
  // =========================================================================
  const stats = useMemo(() => {
    const total = arcanosData.length;
    const disponibles = arcanosData.filter((p) => p.stock).length;
    const heroesUnicos = new Set(arcanosData.map((p) => p.heroe)).size;
    return { total, disponibles, heroesUnicos };
  }, [arcanosData]);

  // =========================================================================
  // HELPERS
  // =========================================================================
  const limpiarFiltros = () => {
    setBusqueda('');
    setHeroeSeleccionado('TODOS');
    setStockFiltro('TODOS');
    setPrecioMin('');
    setPrecioMax('');
    setOrden('recientes');
  };

  const hayFiltrosActivos =
    busqueda ||
    heroeSeleccionado !== 'TODOS' ||
    stockFiltro !== 'TODOS' ||
    precioMin ||
    precioMax ||
    orden !== 'recientes';

  // =========================================================================
  // RENDER
  // =========================================================================
  return (
    <div style={styles.mainWrapper}>
      <style>{keyframes}</style>

      {/* CARRUSEL DE FONDO */}
      <div style={styles.swiperWrapper}>
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          speed={2000}
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          loop
          style={styles.swiper}
        >
          {FONDOS_ARCANOS.map((url, index) => (
            <SwiperSlide key={index}>
              <div
                style={{
                  ...styles.slideBackground,
                  backgroundImage: `url(${url})`,
                  animation: 'kenBurns 20s ease-in-out infinite',
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div style={styles.backdropOverlay} />
      </div>

      <div style={styles.contentLayer}>
        {/* HEADER */}
        <div style={{ ...styles.header, animation: 'fadeInUp 0.6s ease' }}>
          <div style={styles.badge}>
            <Sparkles size={14} />
            <span>Calidad Suprema</span>
          </div>
          <h1 style={styles.title}>
            OBJETOS{' '}
            <span style={{ color: 'var(--neon-purple, #bc13fe)' }}>ARCANOS</span>
          </h1>
          <div style={styles.underline} />
          <p style={styles.subtitle}>
            Los ítems más prestigiosos y efectos visuales únicos para tus héroes
            favoritos.
          </p>
        </div>

        {/* STATS */}
        {!loading && !error && (
          <div style={styles.statsGrid}>
            <div style={styles.statCard}>
              <Package size={22} color="var(--neon-purple, #bc13fe)" />
              <div>
                <div style={styles.statValue}>{stats.total}</div>
                <div style={styles.statLabel}>Total de Arcanos</div>
              </div>
            </div>
            <div style={styles.statCard}>
              <CheckCircle2 size={22} color="#00ff9c" />
              <div>
                <div style={styles.statValue}>{stats.disponibles}</div>
                <div style={styles.statLabel}>Disponibles</div>
              </div>
            </div>
            <div style={styles.statCard}>
              <Users size={22} color="var(--neon-cyan, #00ffff)" />
              <div>
                <div style={styles.statValue}>{stats.heroesUnicos}</div>
                <div style={styles.statLabel}>Héroes con Arcano</div>
              </div>
            </div>
          </div>
        )}

        {/* FILTROS */}
        <div style={styles.filterBar}>
          <div style={styles.filterHeader}>
            <div style={styles.filterTitle}>
              <SlidersHorizontal size={18} color="var(--neon-purple, #bc13fe)" />
              <span>Filtros</span>
            </div>
            {hayFiltrosActivos && (
              <button onClick={limpiarFiltros} style={styles.clearBtn}>
                <X size={14} />
                Limpiar
              </button>
            )}
          </div>

          <div style={styles.filtersGrid}>
            {/* Búsqueda */}
            <div style={{ position: 'relative', gridColumn: 'span 2' }}>
              <Search
                size={16}
                color="rgba(255,255,255,0.5)"
                style={{
                  position: 'absolute',
                  left: 14,
                  top: '50%',
                  transform: 'translateY(-50%)',
                }}
              />
              <input
                type="text"
                placeholder="Buscar por nombre, héroe o rareza..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                style={{ ...styles.input, paddingLeft: 40 }}
              />
            </div>

            {/* Héroe */}
            <select
              value={heroeSeleccionado}
              onChange={(e) => setHeroeSeleccionado(e.target.value)}
              style={styles.input}
            >
              <option value="TODOS">-- Todos los héroes --</option>
              {HEROES_ARCANOS.map((h) => (
                <option key={h} value={h}>
                  {h}
                </option>
              ))}
            </select>

            {/* Stock */}
            <select
              value={stockFiltro}
              onChange={(e) => setStockFiltro(e.target.value)}
              style={styles.input}
            >
              <option value="TODOS">Stock: todos</option>
              <option value="DISPONIBLE">Solo disponibles</option>
              <option value="AGOTADO">Solo agotados</option>
            </select>

            {/* Precio min */}
            <input
              type="number"
              min="0"
              placeholder="Precio mín. (S/)"
              value={precioMin}
              onChange={(e) => setPrecioMin(e.target.value)}
              style={styles.input}
            />

            {/* Precio max */}
            <input
              type="number"
              min="0"
              placeholder="Precio máx. (S/)"
              value={precioMax}
              onChange={(e) => setPrecioMax(e.target.value)}
              style={styles.input}
            />

            {/* Orden */}
            <select
              value={orden}
              onChange={(e) => setOrden(e.target.value)}
              style={styles.input}
            >
              {OPCIONES_ORDEN.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.resultsCount}>
            <Filter size={14} />
            <span>
              Mostrando <strong>{productosFiltrados.length}</strong> de{' '}
              <strong>{arcanosData.length}</strong> arcanos
            </span>
          </div>
        </div>

        {/* GRID */}
        <div style={styles.grid}>
          {loading ? (
            Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
          ) : error ? (
            <div style={styles.stateCard}>
              <AlertCircle size={42} color="#ff4f6e" />
              <h3 style={{ margin: '0.75rem 0 0.25rem', color: '#fff' }}>
                Ups, algo salió mal
              </h3>
              <p style={{ margin: 0, color: 'rgba(255,255,255,0.7)' }}>{error}</p>
              <button onClick={cargarArcanos} style={styles.retryBtn}>
                <RefreshCw size={16} />
                Reintentar
              </button>
            </div>
          ) : productosFiltrados.length > 0 ? (
            productosFiltrados.map((item) => (
              <ProductoCard key={item._id} producto={item} />
            ))
          ) : (
            <div style={styles.stateCard}>
              <Package size={42} color="rgba(255,255,255,0.5)" />
              <h3 style={{ margin: '0.75rem 0 0.25rem', color: '#fff' }}>
                Sin resultados
              </h3>
              <p style={{ margin: 0, color: 'rgba(255,255,255,0.7)' }}>
                {hayFiltrosActivos
                  ? 'No encontramos arcanos con esos filtros. Prueba ajustarlos.'
                  : 'Aún no hay arcanos publicados en el catálogo.'}
              </p>
              {hayFiltrosActivos && (
                <button onClick={limpiarFiltros} style={styles.retryBtn}>
                  <X size={16} />
                  Limpiar filtros
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// STYLES
// =============================================================================
const styles = {
  mainWrapper: {
    position: 'relative',
    minHeight: '100vh',
    backgroundColor: '#000',
    overflow: 'hidden',
  },
  swiperWrapper: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 0,
  },
  swiper: { width: '100%', height: '100%' },
  slideBackground: {
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    filter: 'brightness(0.35)',
  },
  backdropOverlay: {
    position: 'absolute',
    inset: 0,
    background:
      'radial-gradient(ellipse at top, rgba(188,19,254,0.15) 0%, transparent 60%), linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.75) 100%)',
    zIndex: 1,
  },
  contentLayer: {
    position: 'relative',
    zIndex: 2,
    padding: '120px 5% 100px',
    maxWidth: 1400,
    margin: '0 auto',
  },
  header: { textAlign: 'center', marginBottom: 40 },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    background: 'rgba(188,19,254,0.12)',
    border: '1px solid rgba(188,19,254,0.35)',
    color: 'var(--neon-purple, #bc13fe)',
    padding: '0.4rem 0.9rem',
    borderRadius: 999,
    fontSize: '0.8rem',
    marginBottom: 16,
    letterSpacing: 1,
  },
  title: {
    fontSize: 'clamp(2rem, 5vw, 3.2rem)',
    fontWeight: 900,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: '#fff',
    margin: 0,
    textShadow: '0 4px 30px rgba(188,19,254,0.35)',
  },
  underline: {
    height: 4,
    width: 120,
    background:
      'linear-gradient(90deg, transparent, var(--neon-purple, #bc13fe), transparent)',
    margin: '14px auto 18px',
    boxShadow: '0 0 18px var(--neon-purple, #bc13fe)',
  },
  subtitle: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: '1.05rem',
    maxWidth: 620,
    margin: '0 auto',
    lineHeight: 1.6,
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: 14,
    marginBottom: 30,
  },
  statCard: {
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    background: 'rgba(10,10,12,0.75)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(188,19,254,0.25)',
    borderRadius: 14,
    padding: '1rem 1.25rem',
  },
  statValue: { fontSize: '1.5rem', fontWeight: 800, color: '#fff', lineHeight: 1 },
  statLabel: {
    fontSize: '0.8rem',
    color: 'rgba(255,255,255,0.6)',
    marginTop: 4,
    letterSpacing: 0.5,
  },
  filterBar: {
    background: 'rgba(10,10,12,0.8)',
    backdropFilter: 'blur(14px)',
    border: '1px solid rgba(188,19,254,0.3)',
    borderRadius: 16,
    padding: '1.25rem 1.5rem',
    marginBottom: 30,
  },
  filterHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  filterTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    color: 'var(--neon-purple, #bc13fe)',
    fontWeight: 700,
    letterSpacing: 1.5,
    fontSize: '0.85rem',
    textTransform: 'uppercase',
  },
  clearBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    background: 'rgba(255,79,110,0.1)',
    border: '1px solid rgba(255,79,110,0.3)',
    color: '#ff7a90',
    padding: '0.4rem 0.85rem',
    borderRadius: 8,
    cursor: 'pointer',
    fontSize: '0.8rem',
    fontWeight: 600,
  },
  filtersGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: 10,
    marginBottom: 12,
  },
  input: {
    width: '100%',
    padding: '0.75rem 1rem',
    borderRadius: 10,
    border: '1px solid rgba(188,19,254,0.35)',
    backgroundColor: 'rgba(0,0,0,0.6)',
    color: '#fff',
    fontSize: '0.92rem',
    outline: 'none',
    boxSizing: 'border-box',
  },
  resultsCount: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    color: 'rgba(255,255,255,0.65)',
    fontSize: '0.85rem',
    marginTop: 4,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: 30,
  },
  stateCard: {
    gridColumn: '1/-1',
    textAlign: 'center',
    padding: '3rem 1.5rem',
    background: 'rgba(10,10,12,0.7)',
    border: '1px solid rgba(188,19,254,0.2)',
    borderRadius: 16,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4,
  },
  retryBtn: {
    marginTop: 14,
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    background:
      'linear-gradient(135deg, var(--neon-purple, #bc13fe), var(--neon-cyan, #00ffff))',
    border: 'none',
    color: '#fff',
    padding: '0.7rem 1.4rem',
    borderRadius: 10,
    cursor: 'pointer',
    fontWeight: 700,
    letterSpacing: 0.5,
    boxShadow: '0 8px 24px rgba(188,19,254,0.35)',
  },
};