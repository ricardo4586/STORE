// src/pages/Admin.jsx
import { useState, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  PlusCircle,
  Pencil,
  Trash2,
  LogOut,
  CheckCircle,
  XCircle,
  Filter,
  Package,
  DollarSign,
  AlertCircle,
  Loader2,
  X,
  Lightbulb,
  Upload,
  Save,
} from 'lucide-react';

// =============================================================================
// HOOK RESPONSIVE (inline para no crear archivo aparte)
// =============================================================================
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false
  );
  useEffect(() => {
    const mql = window.matchMedia(query);
    const handler = (e) => setMatches(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [query]);
  return matches;
};

// =============================================================================
// CONFIGURACIÓN
// =============================================================================
const API_URL = import.meta.env.VITE_API_URL || 'https://panterastore.vercel.app/api';
const IMGBB_URL = 'https://imgbb.com/';

const CATEGORIAS = {
  sets: 'Sets',
  arcanos: 'Arcanos',
  inmortales: 'Inmortales',
  climas: 'Climas',
  couriers: 'Couriers',
};

const RAREZAS_SUGERIDAS = [
  'Común', 'Poco Común', 'Raro', 'Mítico', 'Legendario', 'Inmortal', 'Arcano', 'Ancestral',
];

const OPCIONES_ORDEN = {
  recientes:    { label: 'Más recientes',           key: 'createdAt', dir: 'desc' },
  nombre_asc:   { label: 'Nombre (A-Z)',            key: 'nombre',    dir: 'asc' },
  nombre_desc:  { label: 'Nombre (Z-A)',            key: 'nombre',    dir: 'desc' },
  precio_asc:   { label: 'Precio (Menor a Mayor)',  key: 'precio',    dir: 'asc' },
  precio_desc:  { label: 'Precio (Mayor a Menor)',  key: 'precio',    dir: 'desc' },
  heroe_asc:    { label: 'Héroe (A-Z)',             key: 'heroe',     dir: 'asc' },
};

const FORM_INICIAL = {
  nombre: '', heroe: '', precio: '', rareza: '',
  imagenUrl: '', categoria: 'sets', stock: true,
};

const FILTROS_INICIALES = {
  busqueda: '', categoria: 'todas', rareza: '',
  precioMin: '', precioMax: '', stock: 'todos', orden: 'recientes',
};

const opcionesPorCategoria = {
  arcanos: ["Crystal Maiden","Dread Retribution","Faceless Void","Io","Juggernaut","Lina","Monkey King","Ogre Magi","Phantom Assassin","Pudge","Queen of Pain","Razor","Rubick","Shadow Fiend","Spectre","Techies","Windranger","Wraith King","Zeus"].sort(),
  climas: ["Ash (ceniza)","Aurora","Autumn","Harvest","Moonbeam","Pestilence","Rain","Sirocco","Snow","Spring"],
  inmortales: ["Abaddon","Alchemist","Ancient Apparition","Anti-Mage","Arc Warden","Axe","Bane","Batrider","Beastmaster","Bloodseeker","Bounty Hunter","Brewmaster","Bristleback","Centaur Warrunner","Chaos Knight","Chen","Clinkz","Clockwerk","Crystal Maiden","Dark Seer","Dark Willow","Dazzle","Death Prophet","Disruptor","Doom","Dragon Knight","Drow Ranger","Earth Spirit","Earthshaker","Ember Spirit","Enchantress","Enigma","Faceless Void","Gyrocopter","Huskar","Invoker","Jakiro","Juggernaut","Keeper of the Light","Kunkka","Legion Commander","Leshrac","Lich","Lifestealer","Lina","Lion","Luna","Magnus","Mars","Medusa","Meepo","Monkey King","Morphling","Naga Siren","Nature's Prophet","Necrophos","Night Stalker","Ogre Magi","Omniknight","Oracle","Outworld Destroyer","Phantom Assassin","Phantom Lancer","Puck","Pugna","Pudge","Queen of Pain","Razor","Riki","Rubick","Sand King","Shadow Demon","Shadow Fiend","Shadow Shaman","Silencer","Skywrath Mage","Slardar","Slark","Sniper","Spectre","Spirit Breaker","Storm Spirit","Sven","Techies","Templar Assassin","Terrorblade","Tidehunter","Tinker","Tiny","Treant Protector","Troll Warlord","Tusk","Underlord","Undying","Ursa","Vengeful Spirit","Venomancer","Viper","Warlock","Weaver","Windranger","Winter Wyvern","Witch Doctor","Wraith King","Zeus"].sort(),
  sets: ["Abaddon","Alchemist","Ancient Apparition","Anti-Mage","Arc Warden","Axe","Bane","Batrider","Beastmaster","Bloodseeker","Bounty Hunter","Brewmaster","Bristleback","Broodmother","Centaur Warrunner","Chaos Knight","Chen","Clinkz","Clockwerk","Crystal Maiden","Dark Seer","Dark Willow","Dawnbreaker","Dazzle","Death Prophet","Disruptor","Doom","Dragon Knight","Drow Ranger","Earth Spirit","Earthshaker","Elder Titan","Ember Spirit","Enchantress","Enigma","Faceless Void","Grimstroke","Gyrocopter","Hoodwink","Huskar","Invoker","Io","Jakiro","Juggernaut","Keeper of the Light","Kunkka","Legion Commander","Leshrac","Lich","Lifestealer","Lina","Lion","Lone Druid","Luna","Lycan","Magnus","Marci","Mars","Medusa","Meepo","Mirana","Monkey King","Morphling","Muerta","Naga Siren","Nature's Prophet","Necrophos","Night Stalker","Nyx Assassin","Ogre Magi","Omniknight","Oracle","Outworld Destroyer","Pangolier","Phantom Assassin","Phantom Lancer","Phoenix","Primal Beast","Puck","Pudge","Pugna","Queen of Pain","Razor","Riki","Rubick","Sand King","Shadow Demon","Shadow Fiend","Shadow Shaman","Silencer","Skywrath Mage","Slardar","Slark","Snapfire","Sniper","Spectre","Spirit Breaker","Storm Spirit","Sven","Techies","Templar Assassin","Terrorblade","Tidehunter","Timbersaw","Tinker","Tiny","Treant Protector","Troll Warlord","Tusk","Underlord","Undying","Ursa","Vengeful Spirit","Venomancer","Viper","Visage","Void Spirit","Warlock","Weaver","Windranger","Winter Wyvern","Witch Doctor","Wraith King","Zeus"].sort(),
};

// =============================================================================
// UTILIDADES
// =============================================================================
const esUrlValida = (url) => {
  if (!url) return false;
  try {
    const u = new URL(url);
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch {
    return false;
  }
};

const api = axios.create({ baseURL: API_URL });
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token && token !== 'true') {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// =============================================================================
// TOAST
// =============================================================================
const Toast = ({ mensaje, tipo, onClose }) => {
  useEffect(() => {
    if (!mensaje) return;
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [mensaje, onClose]);

  if (!mensaje) return null;

  const config = {
    success: { bg: '#2ecc71', Icon: CheckCircle },
    error:   { bg: '#e74c3c', Icon: AlertCircle },
    info:    { bg: '#3498db', Icon: AlertCircle },
  };
  const { bg, Icon } = config[tipo] || config.info;

  return (
    <div style={{ ...styles.toast, backgroundColor: bg }}>
      <Icon size={18} />
      <span>{mensaje}</span>
    </div>
  );
};

// =============================================================================
// BARRA DE FILTROS
// =============================================================================
const BarraFiltros = ({ filtros, setFiltros, totalResultados, totalProductos, onLimpiar, esMobile }) => {
  const hayFiltrosActivos =
    filtros.busqueda ||
    filtros.categoria !== 'todas' ||
    filtros.rareza !== '' ||
    filtros.precioMin !== '' ||
    filtros.precioMax !== '' ||
    filtros.stock !== 'todos';

  return (
    <div style={styles.filtrosContainer}>
      <div style={styles.filtrosHeader}>
        <h3 style={styles.filtrosTitle}>
          <Filter size={18} />
          <span>Filtros</span>
        </h3>
        <span style={styles.contadorResultados}>
          {totalResultados} de {totalProductos} items
        </span>
      </div>

      <div style={{
        ...styles.filtrosGrid,
        gridTemplateColumns: esMobile ? '1fr 1fr' : 'repeat(auto-fit, minmax(160px, 1fr))',
      }}>
        <div style={{ ...styles.filtroItem, gridColumn: esMobile ? '1 / -1' : 'auto' }}>
          <label style={styles.label}>Buscar</label>
          <div style={{ position: 'relative' }}>
            <Search
              size={14}
              color="#666"
              style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)' }}
            />
            <input
              type="text"
              placeholder="Nombre, héroe o rareza..."
              value={filtros.busqueda}
              onChange={(e) => setFiltros({ ...filtros, busqueda: e.target.value })}
              style={{ ...styles.input, paddingLeft: 32 }}
            />
          </div>
        </div>

        <div style={styles.filtroItem}>
          <label style={styles.label}>Categoría</label>
          <select
            value={filtros.categoria}
            onChange={(e) => setFiltros({ ...filtros, categoria: e.target.value })}
            style={styles.input}
          >
            <option value="todas">Todas</option>
            {Object.entries(CATEGORIAS).map(([k, v]) => (
              <option key={k} value={k}>{v}</option>
            ))}
          </select>
        </div>

        <div style={styles.filtroItem}>
          <label style={styles.label}>Rareza</label>
          <input
            type="text"
            list="rarezas-filtro"
            placeholder="Cualquiera"
            value={filtros.rareza}
            onChange={(e) => setFiltros({ ...filtros, rareza: e.target.value })}
            style={styles.input}
          />
          <datalist id="rarezas-filtro">
            {RAREZAS_SUGERIDAS.map((r) => <option key={r} value={r} />)}
          </datalist>
        </div>

        <div style={styles.filtroItem}>
          <label style={styles.label}>Stock</label>
          <select
            value={filtros.stock}
            onChange={(e) => setFiltros({ ...filtros, stock: e.target.value })}
            style={styles.input}
          >
            <option value="todos">Todos</option>
            <option value="disponible">Disponible</option>
            <option value="agotado">Agotado</option>
          </select>
        </div>

        <div style={styles.filtroItem}>
          <label style={styles.label}>Precio mín. ($)</label>
          <input
            type="number"
            min="0"
            placeholder="0"
            value={filtros.precioMin}
            onChange={(e) => setFiltros({ ...filtros, precioMin: e.target.value })}
            style={styles.input}
          />
        </div>

        <div style={styles.filtroItem}>
          <label style={styles.label}>Precio máx. ($)</label>
          <input
            type="number"
            min="0"
            placeholder="∞"
            value={filtros.precioMax}
            onChange={(e) => setFiltros({ ...filtros, precioMax: e.target.value })}
            style={styles.input}
          />
        </div>

        <div style={{ ...styles.filtroItem, gridColumn: esMobile ? '1 / -1' : 'auto' }}>
          <label style={styles.label}>Ordenar por</label>
          <select
            value={filtros.orden}
            onChange={(e) => setFiltros({ ...filtros, orden: e.target.value })}
            style={styles.input}
          >
            {Object.entries(OPCIONES_ORDEN).map(([k, { label }]) => (
              <option key={k} value={k}>{label}</option>
            ))}
          </select>
        </div>
      </div>

      {hayFiltrosActivos && (
        <button onClick={onLimpiar} style={styles.btnLimpiar}>
          <X size={14} />
          Limpiar filtros
        </button>
      )}
    </div>
  );
};

// =============================================================================
// CAMPO IMAGEN URL (ImgBB)
// =============================================================================
const CampoImagenUrl = ({ valor, onChange }) => {
  const [estadoImagen, setEstadoImagen] = useState('idle');

  const abrirImgBB = () => window.open(IMGBB_URL, '_blank', 'noopener,noreferrer');

  const manejarCambio = (e) => {
    const url = e.target.value.trim();
    onChange(url);
    if (!url) setEstadoImagen('idle');
    else if (!esUrlValida(url)) setEstadoImagen('error');
    else setEstadoImagen('cargando');
  };

  return (
    <div>
      <div style={styles.imgBBHeader}>
        <label style={styles.label}>URL de la imagen</label>
        <button
          type="button"
          onClick={abrirImgBB}
          style={styles.btnImgBB}
          title="Abre ImgBB en otra pestaña"
        >
          <Upload size={12} />
          Subir a ImgBB
        </button>
      </div>

      <input
        type="url"
        placeholder="https://i.ibb.co/abc123/mi-imagen.jpg"
        value={valor}
        onChange={manejarCambio}
        style={{
          ...styles.input,
          borderColor:
            estadoImagen === 'ok' ? '#2ecc71'
            : estadoImagen === 'error' ? '#e74c3c'
            : '#333',
        }}
      />

      <p style={styles.helperText}>
        <Lightbulb size={12} style={{ verticalAlign: 'middle', marginRight: 4 }} />
        Sube tu imagen en{' '}
        <a href={IMGBB_URL} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--neon-cyan)' }}>
          imgbb.com
        </a>
        , copia el "Enlace directo" y pégalo aquí.
      </p>

      {valor && esUrlValida(valor) && (
        <div style={styles.previewContainer}>
          <img
            src={valor}
            alt="Preview"
            style={styles.preview}
            onLoad={() => setEstadoImagen('ok')}
            onError={() => setEstadoImagen('error')}
          />
          {estadoImagen === 'error' && (
            <div style={styles.previewError}>
              <AlertCircle size={12} /> No se pudo cargar la imagen
            </div>
          )}
          {estadoImagen === 'cargando' && (
            <div style={styles.previewLoading}>
              <Loader2 size={12} className="spin" /> Cargando...
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// =============================================================================
// COMPONENTE PRINCIPAL: ADMIN
// =============================================================================
const Admin = () => {
  const navigate = useNavigate();

  // 📱 BREAKPOINTS
  const esMobile  = useMediaQuery('(max-width: 768px)');
  const esTablet  = useMediaQuery('(max-width: 1024px)');

  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [editandoId, setEditandoId] = useState(null);
  const [form, setForm] = useState(FORM_INICIAL);
  const [filtros, setFiltros] = useState(FILTROS_INICIALES);
  const [toast, setToast] = useState({ mensaje: '', tipo: 'info' });

  const mostrarToast = useCallback((mensaje, tipo = 'info') => {
    setToast({ mensaje, tipo });
  }, []);
  const cerrarToast = useCallback(() => setToast({ mensaje: '', tipo: 'info' }), []);

  const listarProductos = useCallback(async () => {
    try {
      setCargando(true);
      const { data } = await api.get('/');
      setProductos(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error al listar:', err);
      mostrarToast('No se pudo cargar el inventario', 'error');
    } finally {
      setCargando(false);
    }
  }, [mostrarToast]);

  useEffect(() => { listarProductos(); }, [listarProductos]);

  useEffect(() => {
    if (editandoId) return;
    if (form.categoria === 'couriers') {
      setForm((prev) => ({ ...prev, heroe: '' }));
    } else {
      setForm((prev) => ({
        ...prev,
        heroe: opcionesPorCategoria[prev.categoria]?.[0] || '',
      }));
    }
  }, [form.categoria, editandoId]);

  const productosFiltrados = useMemo(() => {
    let r = [...productos];

    if (filtros.busqueda.trim()) {
      const t = filtros.busqueda.toLowerCase().trim();
      r = r.filter((p) =>
        p.nombre?.toLowerCase().includes(t) ||
        p.heroe?.toLowerCase().includes(t) ||
        p.rareza?.toLowerCase().includes(t)
      );
    }
    if (filtros.categoria !== 'todas') r = r.filter((p) => p.categoria === filtros.categoria);
    if (filtros.rareza.trim()) {
      const rar = filtros.rareza.toLowerCase().trim();
      r = r.filter((p) => p.rareza?.toLowerCase().includes(rar));
    }
    if (filtros.precioMin !== '') {
      const m = parseFloat(filtros.precioMin);
      r = r.filter((p) => Number(p.precio) >= m);
    }
    if (filtros.precioMax !== '') {
      const m = parseFloat(filtros.precioMax);
      r = r.filter((p) => Number(p.precio) <= m);
    }
    if (filtros.stock === 'disponible') r = r.filter((p) => p.stock === true);
    else if (filtros.stock === 'agotado') r = r.filter((p) => p.stock === false);

    const { key, dir } = OPCIONES_ORDEN[filtros.orden] || OPCIONES_ORDEN.recientes;
    r.sort((a, b) => {
      let va = a[key], vb = b[key];
      if (key === 'precio') { va = Number(va) || 0; vb = Number(vb) || 0; }
      else if (key === 'createdAt') { va = new Date(va || 0).getTime(); vb = new Date(vb || 0).getTime(); }
      else { va = String(va || '').toLowerCase(); vb = String(vb || '').toLowerCase(); }
      if (va < vb) return dir === 'asc' ? -1 : 1;
      if (va > vb) return dir === 'asc' ? 1 : -1;
      return 0;
    });
    return r;
  }, [productos, filtros]);

  const limpiarFiltros = useCallback(() => setFiltros(FILTROS_INICIALES), []);

  const manejarCambio = useCallback((campo, valor) => {
    setForm((prev) => ({ ...prev, [campo]: valor }));
  }, []);

  const validarFormulario = () => {
    if (!form.nombre.trim()) return 'El nombre es obligatorio';
    if (!form.heroe.trim()) return 'El héroe/courier es obligatorio';
    if (form.precio === '' || Number(form.precio) < 0) return 'El precio debe ser válido';
    if (!form.rareza.trim()) return 'La rareza es obligatoria';
    if (!form.imagenUrl.trim()) return 'Debes agregar la URL de la imagen';
    if (!esUrlValida(form.imagenUrl)) return 'La URL de la imagen no es válida';
    return null;
  };

  const guardarProducto = async (e) => {
    e.preventDefault();
    const error = validarFormulario();
    if (error) { mostrarToast(error, 'error'); return; }

    const payload = {
      nombre: form.nombre.trim(),
      heroe: form.heroe.trim(),
      precio: Number(form.precio),
      rareza: form.rareza.trim(),
      imagen_url: form.imagenUrl.trim(),
      categoria: form.categoria,
      stock: Boolean(form.stock),
    };

    try {
      setGuardando(true);
      if (editandoId) {
        await api.put(`/${editandoId}`, payload);
        mostrarToast('Producto actualizado', 'success');
      } else {
        await api.post('/', payload);
        mostrarToast('Producto creado', 'success');
      }
      cancelarEdicion();
      listarProductos();
    } catch (err) {
      console.error('Error al guardar:', err);
      mostrarToast(err.response?.data?.message || 'Error al guardar', 'error');
    } finally {
      setGuardando(false);
    }
  };

  const prepararEdicion = useCallback((producto) => {
    setEditandoId(producto._id);
    setForm({
      nombre: producto.nombre || '',
      heroe: producto.heroe || '',
      precio: producto.precio ?? '',
      rareza: producto.rareza || '',
      imagenUrl: producto.imagenUrl || '',
      categoria: producto.categoria || 'sets',
      stock: producto.stock !== false,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const cancelarEdicion = useCallback(() => {
    setEditandoId(null);
    setForm(FORM_INICIAL);
  }, []);

  const eliminarProducto = async (id, nombre) => {
    if (!window.confirm(`¿Eliminar "${nombre}"?\nEsta acción no se puede deshacer.`)) return;
    try {
      await api.delete(`/${id}`);
      mostrarToast('Producto eliminado', 'success');
      listarProductos();
    } catch (err) {
      console.error('Error al eliminar:', err);
      mostrarToast('No se pudo eliminar', 'error');
    }
  };

  const alternarStock = async (p) => {
    try {
      await api.put(`/${p._id}`, { ...p, stock: !p.stock });
      setProductos((prev) =>
        prev.map((x) => (x._id === p._id ? { ...x, stock: !x.stock } : x))
      );
      mostrarToast(`Stock: ${!p.stock ? 'Disponible' : 'Agotado'}`, 'info');
    } catch (err) {
      console.error(err);
      mostrarToast('No se pudo cambiar el stock', 'error');
    }
  };

  const cerrarSesion = () => {
    localStorage.removeItem('adminToken');
    navigate('/login');
  };

  const stats = useMemo(() => ({
    total: productos.length,
    disponibles: productos.filter((p) => p.stock).length,
    agotados: productos.filter((p) => !p.stock).length,
    valorTotal: productos.reduce((s, p) => s + (Number(p.precio) || 0), 0),
  }), [productos]);

  // =========================================================================
  // ESTILOS DINÁMICOS según breakpoint
  // =========================================================================
  const adminContainerStyle = {
    ...styles.adminContainer,
    padding: esMobile ? '70px 4% 40px' : '80px 5%',
  };

  const layoutStyle = {
    ...styles.layout,
    gridTemplateColumns: esTablet ? '1fr' : '1fr 2fr',
    gap: esMobile ? 20 : 30,
  };

  const formStyle = {
    ...styles.form,
    position: esTablet ? 'static' : 'sticky',
    padding: esMobile ? 18 : 25,
  };

  const titleStyle = {
    ...styles.title,
    fontSize: esMobile ? '1.3rem' : '1.5rem',
  };

  const statValueStyle = {
    ...styles.statValue,
    fontSize: esMobile ? '1.4rem' : '1.8rem',
  };

  return (
    <div style={adminContainerStyle}>
      {/* Keyframe para el Loader2 */}
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .spin { animation: spin 1s linear infinite; display: inline-block; vertical-align: middle; }
      `}</style>

      <Toast mensaje={toast.mensaje} tipo={toast.tipo} onClose={cerrarToast} />

      <header style={styles.header}>
        <h1 style={titleStyle}>
          Panel de Control <span style={{ color: 'var(--neon-cyan)' }}>PANTERA</span>
        </h1>
        <button onClick={cerrarSesion} style={styles.btnLogOut}>
          <LogOut size={16} />
          {esMobile ? 'SALIR' : 'CERRAR SESIÓN'}
        </button>
      </header>

      {/* STATS */}
      <div style={{
        ...styles.statsGrid,
        gridTemplateColumns: esMobile
          ? 'repeat(2, 1fr)'
          : 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: esMobile ? 10 : 15,
      }}>
        <div style={{ ...styles.statCard, padding: esMobile ? 14 : 20 }}>
          <div style={styles.statIconWrap}>
            <Package size={20} color="var(--neon-cyan)" />
          </div>
          <div>
            <div style={styles.statLabel}>Total</div>
            <div style={statValueStyle}>{stats.total}</div>
          </div>
        </div>
        <div style={{ ...styles.statCard, padding: esMobile ? 14 : 20 }}>
          <div style={styles.statIconWrap}>
            <CheckCircle size={20} color="#2ecc71" />
          </div>
          <div>
            <div style={styles.statLabel}>Disponibles</div>
            <div style={{ ...statValueStyle, color: '#2ecc71' }}>{stats.disponibles}</div>
          </div>
        </div>
        <div style={{ ...styles.statCard, padding: esMobile ? 14 : 20 }}>
          <div style={styles.statIconWrap}>
            <XCircle size={20} color="#e74c3c" />
          </div>
          <div>
            <div style={styles.statLabel}>Agotados</div>
            <div style={{ ...statValueStyle, color: '#e74c3c' }}>{stats.agotados}</div>
          </div>
        </div>
        <div style={{ ...styles.statCard, padding: esMobile ? 14 : 20 }}>
          <div style={styles.statIconWrap}>
            <DollarSign size={20} color="var(--neon-cyan)" />
          </div>
          <div>
            <div style={styles.statLabel}>Valor catálogo</div>
            <div style={{ ...statValueStyle, color: 'var(--neon-cyan)' }}>
              ${stats.valorTotal.toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      <div style={layoutStyle}>
        {/* FORMULARIO */}
        <form onSubmit={guardarProducto} style={formStyle} noValidate>
          <h3 style={{
            ...styles.formTitle,
            color: editandoId ? '#ffd700' : 'var(--neon-cyan)',
          }}>
            {editandoId
              ? <><Pencil size={18} /> Modo Edición</>
              : <><PlusCircle size={18} /> Nuevo Registro</>
            }
          </h3>

          <div>
            <label style={styles.label}>Categoría</label>
            <select
              value={form.categoria}
              onChange={(e) => manejarCambio('categoria', e.target.value)}
              style={styles.input}
            >
              {Object.entries(CATEGORIAS).map(([k, v]) => (
                <option key={k} value={k}>{v}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={styles.label}>Héroe / Nombre Courier</label>
            {form.categoria === 'couriers' ? (
              <input
                type="text"
                placeholder="Nombre del Courier"
                value={form.heroe}
                required
                onChange={(e) => manejarCambio('heroe', e.target.value)}
                style={styles.input}
              />
            ) : (
              <select
                value={form.heroe}
                onChange={(e) => manejarCambio('heroe', e.target.value)}
                style={styles.input}
              >
                {opcionesPorCategoria[form.categoria]?.map((h) => (
                  <option key={h} value={h}>{h}</option>
                ))}
              </select>
            )}
          </div>

          <div>
            <label style={styles.label}>Nombre del Item</label>
            <input
              type="text"
              placeholder="Ej: Dragonclaw Hook"
              value={form.nombre}
              required
              onChange={(e) => manejarCambio('nombre', e.target.value)}
              style={styles.input}
            />
          </div>

          <div>
            <label style={styles.label}>Precio ($)</label>
            <input
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              value={form.precio}
              required
              onChange={(e) => manejarCambio('precio', e.target.value)}
              style={styles.input}
            />
          </div>

          <div>
            <label style={styles.label}>Rareza</label>
            <input
              type="text"
              list="rarezas-form"
              placeholder="Escribe o elige una rareza"
              value={form.rareza}
              required
              onChange={(e) => manejarCambio('rareza', e.target.value)}
              style={styles.input}
            />
            <datalist id="rarezas-form">
              {RAREZAS_SUGERIDAS.map((r) => <option key={r} value={r} />)}
            </datalist>
          </div>

          <CampoImagenUrl
            valor={form.imagenUrl}
            onChange={(v) => manejarCambio('imagenUrl', v)}
          />

          <label style={styles.checkboxRow}>
            <input
              type="checkbox"
              checked={form.stock}
              onChange={(e) => manejarCambio('stock', e.target.checked)}
              style={{ width: 18, height: 18, cursor: 'pointer' }}
            />
            <span>Disponible en stock</span>
          </label>

          <button
            type="submit"
            disabled={guardando}
            style={{
              ...(editandoId ? styles.btnUpdate : styles.btnSave),
              opacity: guardando ? 0.6 : 1,
              cursor: guardando ? 'not-allowed' : 'pointer',
            }}
          >
            {guardando ? (
              <><Loader2 size={16} className="spin" /> Guardando...</>
            ) : editandoId ? (
              <><Save size={16} /> ACTUALIZAR CAMBIOS</>
            ) : (
              <><Save size={16} /> GUARDAR EN BASE</>
            )}
          </button>

          {editandoId && (
            <button type="button" onClick={cancelarEdicion} style={styles.btnCancel}>
              <X size={14} /> CANCELAR
            </button>
          )}
        </form>

        {/* TABLA */}
        <div style={{ ...styles.tableWrapper, padding: esMobile ? 16 : 25 }}>
          <BarraFiltros
            filtros={filtros}
            setFiltros={setFiltros}
            totalResultados={productosFiltrados.length}
            totalProductos={productos.length}
            onLimpiar={limpiarFiltros}
            esMobile={esMobile}
          />

          <div style={{ maxHeight: esMobile ? 500 : 600, overflowY: 'auto', marginTop: 20 }}>
            {cargando ? (
              <div style={styles.estado}>
                <Loader2 size={28} className="spin" color="var(--neon-cyan)" />
                <div>Cargando inventario...</div>
              </div>
            ) : productosFiltrados.length === 0 ? (
              <div style={styles.estado}>
                {productos.length === 0 ? (
                  <>
                    <Package size={32} color="#555" />
                    <div>El inventario está vacío. Crea tu primer producto.</div>
                  </>
                ) : (
                  <>
                    <Search size={32} color="#555" />
                    <div>No se encontraron items con los filtros aplicados.</div>
                  </>
                )}
              </div>
            ) : esMobile ? (
              // ============================================
              // VISTA MOBILE: cards en lugar de tabla
              // ============================================
              <div style={styles.mobileList}>
                {productosFiltrados.map((p) => (
                  <div key={p._id} style={styles.mobileCard}>
                    <div style={styles.mobileCardHeader}>
                      <img
                        src={p.imagenUrl}
                        alt={p.nombre}
                        style={styles.mobileThumb}
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={styles.mobileCardName}>{p.nombre}</div>
                        <div style={styles.mobileCardSub}>{p.heroe}</div>
                      </div>
                      <div style={{ ...styles.mobilePrice }}>
                        ${Number(p.precio).toFixed(2)}
                      </div>
                    </div>

                    <div style={styles.mobileCardMeta}>
                      <span style={styles.badge}>{CATEGORIAS[p.categoria] || p.categoria}</span>
                      <span style={{ ...styles.badge, background: '#1f1f22' }}>{p.rareza}</span>
                      <button
                        onClick={() => alternarStock(p)}
                        style={{
                          ...styles.stockBadge,
                          backgroundColor: p.stock ? '#2ecc71' : '#e74c3c',
                        }}
                      >
                        {p.stock
                          ? <><CheckCircle size={12} /> Disponible</>
                          : <><XCircle size={12} /> Agotado</>
                        }
                      </button>
                    </div>

                    <div style={styles.mobileCardActions}>
                      <button onClick={() => prepararEdicion(p)} style={{ ...styles.btnEdit, flex: 1, padding: '10px' }}>
                        <Pencil size={14} /> Editar
                      </button>
                      <button
                        onClick={() => eliminarProducto(p._id, p.nombre)}
                        style={{ ...styles.btnDel, flex: 1, padding: '10px' }}
                      >
                        <Trash2 size={14} /> Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // ============================================
              // VISTA DESKTOP: tabla normal
              // ============================================
              <table style={styles.table}>
                <thead>
                  <tr style={styles.thead}>
                    <th style={styles.th}>Item</th>
                    <th style={styles.th}>Héroe</th>
                    <th style={styles.th}>Categoría</th>
                    <th style={styles.th}>Rareza</th>
                    <th style={styles.th}>Precio</th>
                    <th style={styles.th}>Stock</th>
                    <th style={styles.th}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {productosFiltrados.map((p) => (
                    <tr key={p._id} style={styles.tr}>
                      <td style={styles.tdItem}>
                        <img
                          src={p.imagenUrl}
                          alt={p.nombre}
                          style={styles.thumbnail}
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                        <span style={{ fontSize: '0.85rem' }}>{p.nombre}</span>
                      </td>
                      <td style={styles.td}>{p.heroe}</td>
                      <td style={styles.td}>
                        <span style={styles.badge}>{CATEGORIAS[p.categoria] || p.categoria}</span>
                      </td>
                      <td style={styles.td}>{p.rareza}</td>
                      <td style={{ ...styles.td, color: 'var(--neon-cyan)', fontWeight: 'bold' }}>
                        ${Number(p.precio).toFixed(2)}
                      </td>
                      <td style={styles.td}>
                        <button
                          onClick={() => alternarStock(p)}
                          style={{
                            ...styles.stockBadge,
                            backgroundColor: p.stock ? '#2ecc71' : '#e74c3c',
                          }}
                          title="Clic para cambiar"
                        >
                          {p.stock
                            ? <><CheckCircle size={12} /> Disponible</>
                            : <><XCircle size={12} /> Agotado</>
                          }
                        </button>
                      </td>
                      <td style={styles.actions}>
                        <button onClick={() => prepararEdicion(p)} style={styles.btnEdit} title="Editar">
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => eliminarProducto(p._id, p.nombre)}
                          style={styles.btnDel}
                          title="Eliminar"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// =============================================================================
// ESTILOS
// =============================================================================
const styles = {
  adminContainer: { padding: '80px 5%', backgroundColor: 'var(--dark-bg)', minHeight: '100vh', color: 'white' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30, flexWrap: 'wrap', gap: 15 },
  title: { margin: 0, fontSize: '1.5rem' },
  btnLogOut: { display: 'inline-flex', alignItems: 'center', gap: 8, backgroundColor: '#ff4d4d', color: 'white', border: 'none', padding: '10px 20px', borderRadius: 8, cursor: 'pointer', fontWeight: 'bold' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 15, marginBottom: 30 },
  statCard: { background: '#151517', padding: 20, borderRadius: 12, border: '1px solid #333', display: 'flex', alignItems: 'center', gap: 14 },
  statIconWrap: { width: 40, height: 40, borderRadius: 10, background: 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  statLabel: { fontSize: '0.75rem', color: '#888', textTransform: 'uppercase', letterSpacing: 0.5 },
  statValue: { fontSize: '1.8rem', fontWeight: 'bold', marginTop: 2, color: 'white', lineHeight: 1 },
  layout: { display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 30 },
  form: { background: '#151517', padding: 25, borderRadius: 15, display: 'flex', flexDirection: 'column', gap: 12, border: '1px solid #333', position: 'sticky', top: 100, height: 'fit-content' },
  formTitle: { display: 'flex', alignItems: 'center', gap: 8, margin: 0 },
  label: { fontSize: '0.75rem', color: '#888', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 0.5, display: 'block' },
  input: { width: '100%', padding: 10, borderRadius: 8, border: '1px solid #333', backgroundColor: '#000', color: 'white', outline: 'none', boxSizing: 'border-box', fontSize: '0.9rem' },
  checkboxRow: { display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.9rem', cursor: 'pointer', padding: '8px 0' },
  btnSave: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: 15, backgroundColor: 'var(--neon-cyan)', color: 'black', fontWeight: 'bold', border: 'none', borderRadius: 8, marginTop: 10 },
  btnUpdate: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: 15, backgroundColor: '#ffd700', color: 'black', fontWeight: 'bold', border: 'none', borderRadius: 8, marginTop: 10 },
  btnCancel: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: 10, backgroundColor: '#333', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer', marginTop: 5 },
  imgBBHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4, flexWrap: 'wrap', gap: 6 },
  btnImgBB: { display: 'inline-flex', alignItems: 'center', gap: 4, backgroundColor: 'var(--neon-cyan)', color: 'black', border: 'none', padding: '4px 10px', borderRadius: 6, cursor: 'pointer', fontSize: '0.7rem', fontWeight: 'bold' },
  helperText: { fontSize: '0.75rem', color: '#777', marginTop: 6, marginBottom: 0 },
  previewContainer: { textAlign: 'center', marginTop: 10 },
  preview: { width: 140, height: 100, objectFit: 'cover', borderRadius: 8, border: '1px solid var(--neon-cyan)' },
  previewError: { display: 'inline-flex', alignItems: 'center', gap: 4, color: '#e74c3c', fontSize: '0.75rem', marginTop: 6 },
  previewLoading: { display: 'inline-flex', alignItems: 'center', gap: 4, color: '#888', fontSize: '0.75rem', marginTop: 6 },
  tableWrapper: { background: '#151517', padding: 25, borderRadius: 15, border: '1px solid #333' },
  filtrosContainer: { backgroundColor: '#1a1a1c', padding: 20, borderRadius: 10, border: '1px solid #2a2a2c' },
  filtrosHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15, flexWrap: 'wrap', gap: 8 },
  filtrosTitle: { display: 'flex', alignItems: 'center', gap: 8, margin: 0, color: 'var(--neon-cyan)', fontSize: '1rem' },
  contadorResultados: { fontSize: '0.85rem', color: '#888', backgroundColor: '#000', padding: '4px 12px', borderRadius: 20, border: '1px solid #333' },
  filtrosGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12 },
  filtroItem: { display: 'flex', flexDirection: 'column' },
  btnLimpiar: { display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 15, padding: '8px 16px', backgroundColor: 'transparent', color: '#ff6b6b', border: '1px solid #ff6b6b', borderRadius: 6, cursor: 'pointer', fontSize: '0.85rem' },
  table: { width: '100%', borderCollapse: 'collapse' },
  thead: { borderBottom: '2px solid #333', color: '#888', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: 0.5 },
  th: { padding: '12px 10px', textAlign: 'left', position: 'sticky', top: 0, backgroundColor: '#151517', zIndex: 1 },
  tr: { borderBottom: '1px solid #222' },
  tdItem: { padding: 10, display: 'flex', alignItems: 'center', gap: 10 },
  td: { padding: 10, fontSize: '0.85rem', color: '#ccc' },
  thumbnail: { width: 40, height: 30, objectFit: 'cover', borderRadius: 3 },
  badge: { backgroundColor: '#2a2a2c', color: '#aaa', padding: '3px 10px', borderRadius: 12, fontSize: '0.75rem', textTransform: 'capitalize' },
  stockBadge: { display: 'inline-flex', alignItems: 'center', gap: 4, border: 'none', color: 'white', padding: '4px 10px', borderRadius: 12, fontSize: '0.7rem', fontWeight: 'bold', cursor: 'pointer' },
  actions: { display: 'flex', gap: 8, padding: 10 },
  btnEdit: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6, backgroundColor: '#3498db', border: 'none', padding: '8px 10px', borderRadius: 5, cursor: 'pointer', color: 'white' },
  btnDel: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6, backgroundColor: '#e74c3c', border: 'none', padding: '8px 10px', borderRadius: 5, cursor: 'pointer', color: 'white' },
  estado: { padding: '60px 20px', textAlign: 'center', color: '#666', fontSize: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 },
  toast: { display: 'inline-flex', alignItems: 'center', gap: 10, position: 'fixed', top: 20, right: 20, padding: '15px 25px', borderRadius: 8, color: 'white', fontWeight: 'bold', zIndex: 9999, boxShadow: '0 4px 12px rgba(0,0,0,0.4)', maxWidth: 'calc(100vw - 40px)' },

  // ===== ESTILOS MOBILE-ONLY (cards en vez de tabla) =====
  mobileList: { display: 'flex', flexDirection: 'column', gap: 12 },
  mobileCard: { background: '#1a1a1c', border: '1px solid #2a2a2c', borderRadius: 12, padding: 12, display: 'flex', flexDirection: 'column', gap: 10 },
  mobileCardHeader: { display: 'flex', alignItems: 'center', gap: 10 },
  mobileThumb: { width: 50, height: 50, objectFit: 'cover', borderRadius: 6, flexShrink: 0 },
  mobileCardName: { fontSize: '0.95rem', fontWeight: 700, color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
  mobileCardSub: { fontSize: '0.78rem', color: '#888', marginTop: 2 },
  mobilePrice: { color: 'var(--neon-cyan)', fontWeight: 800, fontSize: '1rem', flexShrink: 0 },
  mobileCardMeta: { display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center' },
  mobileCardActions: { display: 'flex', gap: 8, marginTop: 4 },
};

export default Admin;