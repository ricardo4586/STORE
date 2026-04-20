// src/pages/Soporte.jsx
import { useState, useMemo } from 'react';
import {
  Search,
  ShoppingCart,
  MessageCircle,
  Gift,
  Smartphone,
  Send,
  Landmark,
  CreditCard,
  ShieldCheck,
  BadgeCheck,
  Zap,
  Lock,
  Mail,
  ChevronDown,
  HelpCircle,
  Headphones,
  Clock,
  Sparkles,
} from 'lucide-react';

// =============================================================================
// CONFIGURACIÓN — cambia estos valores por los tuyos
// =============================================================================
const WHATSAPP_NUMERO = '912167997'; // sin '+' ni espacios
const EMAIL_CONTACTO  = 'ricardo.quispe.a@tecsup.edu.pe';
const MENSAJE_WHATSAPP = encodeURIComponent(
  'Hola! Me interesa un ítem de DOTASTORE, ¿podrías ayudarme?'
);

// =============================================================================
// DATOS
// =============================================================================
const PASOS_COMPRA = [
  {
    icon: Search,
    titulo: '1. Explora el catálogo',
    desc: 'Navega por Arcanos, Inmortales, Sets, Couriers y Climas. Usa los filtros para encontrar lo que buscas.',
  },
  {
    icon: ShoppingCart,
    titulo: '2. Selecciona tu ítem',
    desc: 'Revisa detalles, rareza, héroe y precio. Confirma que sea el ítem exacto que quieres.',
  },
  {
    icon: MessageCircle,
    titulo: '3. Coordina por WhatsApp',
    desc: 'Escríbenos para validar disponibilidad, método de pago y tiempos de entrega.',
  },
  {
    icon: Gift,
    titulo: '4. Recibe tu ítem',
    desc: 'Te enviamos el trade en Steam una vez confirmado el pago. ¡Listo para lucirlo in-game!',
  },
];

const METODOS_PAGO = [
  { icon: Smartphone,  nombre: 'Yape',      desc: 'Pago inmediato por número de celular.' },
  { icon: Send,        nombre: 'Plin',      desc: 'Transferencia entre billeteras al instante.' },
  { icon: Landmark,    nombre: 'BCP',       desc: 'Depósito o transferencia a cuenta BCP.' },
  { icon: CreditCard,  nombre: 'Interbank', desc: 'Transferencia interbancaria o CCI.' },
];

const GARANTIAS = [
  { icon: ShieldCheck, titulo: 'Compra protegida',  desc: 'Tu pago está respaldado hasta recibir el ítem.' },
  { icon: BadgeCheck,  titulo: 'Ítems 100% genuinos', desc: 'Todo viene directo de Steam, sin duplicados.' },
  { icon: Zap,         titulo: 'Entrega rápida',     desc: 'La mayoría de trades en menos de 30 min.' },
  { icon: Lock,        titulo: 'Pago seguro',        desc: 'Trabajamos solo con medios reconocidos en Perú.' },
];

const FAQS = [
  {
    q: '¿Los ítems son originales de Steam?',
    a: 'Sí. Todos los ítems que vendemos son originales y se entregan mediante el sistema oficial de trades de Steam/Dota 2. No usamos duplicadores ni métodos que violen los TOS de Valve.',
  },
  {
    q: '¿Cuánto demora la entrega después de pagar?',
    a: 'Generalmente entre 15 y 30 minutos en horario de atención. Recuerda que Steam aplica un "trade hold" de 7 días si no tienes Steam Guard Mobile activo hace más de 7 días.',
  },
  {
    q: '¿Qué pasa si Steam me aplica trade hold?',
    a: 'Podemos esperar a que se libere (hasta 7 días) o, si prefieres, reembolsamos tu pago al instante. Tú decides.',
  },
  {
    q: '¿Puedo pagar en soles peruanos?',
    a: 'Sí, aceptamos soles a través de Yape, Plin, BCP e Interbank. Todos los precios publicados ya están en soles.',
  },
  {
    q: '¿Hacen envíos fuera de Perú?',
    a: 'Como es un producto 100% digital (trade en Steam), podemos atender a jugadores de cualquier país. El pago lo coordinamos por WhatsApp.',
  },
  {
    q: '¿Qué información necesitan de mí?',
    a: 'Solo tu link de trade de Steam y confirmar que tu cuenta puede recibir trades. No pedimos contraseñas ni datos sensibles.',
  },
  {
    q: '¿Tienen política de reembolso?',
    a: 'Sí. Si por cualquier motivo no podemos entregar el ítem, devolvemos el 100% de tu pago por el mismo medio.',
  },
  {
    q: '¿Cómo sé que no es una estafa?',
    a: 'Puedes revisar nuestras reseñas, pedirnos videollamada para validar el ítem antes del pago, o empezar con un ítem pequeño. Preferimos clientes que confíen 100% antes de comprar.',
  },
];

// =============================================================================
// COMPONENTE FAQ ACCORDION
// =============================================================================
function FaqItem({ pregunta, respuesta }) {
  const [abierto, setAbierto] = useState(false);

  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(0,255,255,0.15)',
        borderRadius: 14,
        marginBottom: 12,
        overflow: 'hidden',
        transition: 'all 0.3s ease',
      }}
    >
      <button
        onClick={() => setAbierto(!abierto)}
        style={{
          width: '100%',
          background: 'transparent',
          border: 'none',
          color: '#fff',
          padding: '1.1rem 1.25rem',
          textAlign: 'left',
          fontSize: '1rem',
          fontWeight: 600,
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <span>{pregunta}</span>
        <ChevronDown
          size={20}
          color="var(--neon-cyan, #00ffff)"
          style={{
            transform: abierto ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease',
            flexShrink: 0,
          }}
        />
      </button>
      <div
        style={{
          maxHeight: abierto ? 500 : 0,
          opacity: abierto ? 1 : 0,
          overflow: 'hidden',
          transition: 'all 0.4s ease',
          padding: abierto ? '0 1.25rem 1.1rem' : '0 1.25rem',
          color: 'rgba(255,255,255,0.75)',
          fontSize: '0.95rem',
          lineHeight: 1.6,
        }}
      >
        {respuesta}
      </div>
    </div>
  );
}

// =============================================================================
// COMPONENTE PRINCIPAL
// =============================================================================
export default function Soporte() {
  const [busquedaFAQ, setBusquedaFAQ] = useState('');

  const faqsFiltradas = useMemo(() => {
    const q = busquedaFAQ.trim().toLowerCase();
    if (!q) return FAQS;
    return FAQS.filter(
      (f) =>
        f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q)
    );
  }, [busquedaFAQ]);

  const abrirWhatsApp = () => {
    window.open(
      `https://wa.me/${WHATSAPP_NUMERO}?text=${MENSAJE_WHATSAPP}`,
      '_blank'
    );
  };

  const enviarEmail = () => {
    window.location.href = `mailto:${EMAIL_CONTACTO}`;
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background:
          'radial-gradient(ellipse at top, rgba(0,255,255,0.08) 0%, transparent 50%), radial-gradient(ellipse at bottom, rgba(140,0,255,0.08) 0%, transparent 50%), var(--dark-bg, #0a0a0f)',
        color: '#fff',
        padding: '4rem 1.5rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Glows decorativos */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: '-10%',
          width: 400,
          height: 400,
          background: 'radial-gradient(circle, rgba(0,255,255,0.15) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '5%',
          right: '-5%',
          width: 500,
          height: 500,
          background: 'radial-gradient(circle, rgba(140,0,255,0.15) 0%, transparent 70%)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* HERO */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(0,255,255,0.1)',
              border: '1px solid rgba(0,255,255,0.3)',
              padding: '0.5rem 1rem',
              borderRadius: 999,
              marginBottom: '1.5rem',
              fontSize: '0.85rem',
              color: 'var(--neon-cyan, #00ffff)',
            }}
          >
            <Headphones size={16} />
            <span>Centro de soporte</span>
          </div>
          <h1
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 800,
              margin: '0 0 1rem',
              background:
                'linear-gradient(135deg, var(--neon-cyan, #00ffff), var(--neon-purple, #8c00ff))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.02em',
            }}
          >
            ¿Necesitas ayuda?
          </h1>
          <p
            style={{
              fontSize: '1.15rem',
              color: 'rgba(255,255,255,0.7)',
              maxWidth: 680,
              margin: '0 auto 2rem',
              lineHeight: 1.6,
            }}
          >
            Estamos aquí para ayudarte con tu compra, pagos o cualquier duda sobre
            tus ítems de Dota 2. Respondemos rápido y hablamos claro.
          </p>

          <div
            style={{
              display: 'flex',
              gap: 12,
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <button
              onClick={abrirWhatsApp}
              style={{
                background: 'linear-gradient(135deg, #25d366, #128c7e)',
                color: '#fff',
                border: 'none',
                padding: '0.9rem 1.75rem',
                borderRadius: 12,
                fontSize: '1rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                boxShadow: '0 8px 24px rgba(37,211,102,0.35)',
                transition: 'transform 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <MessageCircle size={20} />
              Escribir por WhatsApp
            </button>
            <button
              onClick={enviarEmail}
              style={{
                background: 'transparent',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.25)',
                padding: '0.9rem 1.75rem',
                borderRadius: 12,
                fontSize: '1rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                e.currentTarget.style.borderColor = 'rgba(0,255,255,0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)';
              }}
            >
              <Mail size={20} />
              Enviar email
            </button>
          </div>
        </div>

        {/* GARANTÍAS */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 16,
            marginBottom: '4rem',
          }}
        >
          {GARANTIAS.map((g, i) => {
            const Icon = g.icon;
            return (
              <div
                key={i}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(0,255,255,0.15)',
                  borderRadius: 14,
                  padding: '1.25rem',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(0,255,255,0.4)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(0,255,255,0.15)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: 'rgba(0,255,255,0.08)',
                    marginBottom: 10,
                  }}
                >
                  <Icon size={24} color="var(--neon-cyan, #00ffff)" />
                </div>
                <h3 style={{ margin: '0 0 0.4rem', fontSize: '1rem', fontWeight: 700 }}>
                  {g.titulo}
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontSize: '0.85rem',
                    color: 'rgba(255,255,255,0.6)',
                    lineHeight: 1.5,
                  }}
                >
                  {g.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* PASOS DE COMPRA */}
        <section style={{ marginBottom: '4rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2
              style={{
                fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                fontWeight: 800,
                margin: '0 0 0.5rem',
              }}
            >
              ¿Cómo comprar?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', margin: 0 }}>
              4 pasos simples y ya tienes tu ítem en el inventario.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 20,
            }}
          >
            {PASOS_COMPRA.map((p, i) => {
              const Icon = p.icon;
              return (
                <div
                  key={i}
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(0,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                    border: '1px solid rgba(0,255,255,0.15)',
                    borderRadius: 16,
                    padding: '1.75rem 1.25rem',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 56,
                      height: 56,
                      borderRadius: 14,
                      background:
                        'linear-gradient(135deg, rgba(0,255,255,0.2), rgba(140,0,255,0.2))',
                      marginBottom: 14,
                    }}
                  >
                    <Icon size={28} color="var(--neon-cyan, #00ffff)" />
                  </div>
                  <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.05rem', fontWeight: 700 }}>
                    {p.titulo}
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      color: 'rgba(255,255,255,0.65)',
                      fontSize: '0.92rem',
                      lineHeight: 1.6,
                    }}
                  >
                    {p.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* MÉTODOS DE PAGO */}
        <section style={{ marginBottom: '4rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2
              style={{
                fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                fontWeight: 800,
                margin: '0 0 0.5rem',
              }}
            >
              Métodos de pago aceptados
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', margin: 0 }}>
              Paga en soles, rápido y seguro.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 16,
            }}
          >
            {METODOS_PAGO.map((m, i) => {
              const Icon = m.icon;
              return (
                <div
                  key={i}
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(140,0,255,0.2)',
                    borderRadius: 14,
                    padding: '1.5rem 1.25rem',
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(140,0,255,0.5)';
                    e.currentTarget.style.transform = 'translateY(-4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(140,0,255,0.2)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 56,
                      height: 56,
                      borderRadius: 14,
                      background: 'rgba(140,0,255,0.12)',
                      marginBottom: 12,
                    }}
                  >
                    <Icon size={28} color="var(--neon-purple, #8c00ff)" />
                  </div>
                  <h3
                    style={{
                      margin: '0 0 0.4rem',
                      fontSize: '1.1rem',
                      fontWeight: 700,
                      color: 'var(--neon-purple, #c78cff)',
                    }}
                  >
                    {m.nombre}
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      color: 'rgba(255,255,255,0.6)',
                      fontSize: '0.88rem',
                      lineHeight: 1.5,
                    }}
                  >
                    {m.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* FAQ */}
        <section style={{ marginBottom: '4rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                color: 'var(--neon-cyan, #00ffff)',
                marginBottom: 8,
                fontSize: '0.9rem',
              }}
            >
              <HelpCircle size={18} />
              <span>Preguntas frecuentes</span>
            </div>
            <h2
              style={{
                fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                fontWeight: 800,
                margin: '0 0 0.5rem',
              }}
            >
              Resolvemos tus dudas
            </h2>
          </div>

          {/* Buscador FAQ */}
          <div
            style={{
              maxWidth: 560,
              margin: '0 auto 1.75rem',
              position: 'relative',
            }}
          >
            <Search
              size={18}
              color="rgba(255,255,255,0.5)"
              style={{
                position: 'absolute',
                left: 16,
                top: '50%',
                transform: 'translateY(-50%)',
                pointerEvents: 'none',
              }}
            />
            <input
              type="text"
              value={busquedaFAQ}
              onChange={(e) => setBusquedaFAQ(e.target.value)}
              placeholder="Busca una pregunta..."
              style={{
                width: '100%',
                padding: '0.85rem 1rem 0.85rem 2.75rem',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(0,255,255,0.2)',
                borderRadius: 12,
                color: '#fff',
                fontSize: '0.95rem',
                outline: 'none',
                transition: 'all 0.2s ease',
              }}
              onFocus={(e) => (e.target.style.borderColor = 'rgba(0,255,255,0.5)')}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(0,255,255,0.2)')}
            />
          </div>

          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            {faqsFiltradas.length === 0 ? (
              <div
                style={{
                  textAlign: 'center',
                  padding: '2rem',
                  color: 'rgba(255,255,255,0.5)',
                }}
              >
                No encontramos resultados. Escríbenos por WhatsApp y te ayudamos directo.
              </div>
            ) : (
              faqsFiltradas.map((f, i) => (
                <FaqItem key={i} pregunta={f.q} respuesta={f.a} />
              ))
            )}
          </div>
        </section>

        {/* CTA FINAL */}
        <section
          style={{
            background:
              'linear-gradient(135deg, rgba(0,255,255,0.08), rgba(140,0,255,0.08))',
            border: '1px solid rgba(0,255,255,0.2)',
            borderRadius: 20,
            padding: '2.5rem 1.75rem',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 64,
              height: 64,
              borderRadius: 16,
              background:
                'linear-gradient(135deg, rgba(0,255,255,0.25), rgba(140,0,255,0.25))',
              marginBottom: 16,
            }}
          >
            <Sparkles size={32} color="var(--neon-cyan, #00ffff)" />
          </div>
          <h2
            style={{
              fontSize: 'clamp(1.4rem, 3vw, 2rem)',
              fontWeight: 800,
              margin: '0 0 0.5rem',
            }}
          >
            ¿No encontraste tu respuesta?
          </h2>
          <p
            style={{
              color: 'rgba(255,255,255,0.7)',
              margin: '0 auto 1.5rem',
              maxWidth: 520,
              lineHeight: 1.6,
            }}
          >
            Escríbenos directo por WhatsApp. Respondemos en minutos durante horario de atención.
          </p>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              color: 'rgba(255,255,255,0.55)',
              fontSize: '0.85rem',
              marginBottom: 20,
            }}
          >
            <Clock size={14} />
            <span>Lun a Dom · 10:00 am – 11:00 pm</span>
          </div>
          <div>
            <button
              onClick={abrirWhatsApp}
              style={{
                background: 'linear-gradient(135deg, #25d366, #128c7e)',
                color: '#fff',
                border: 'none',
                padding: '1rem 2rem',
                borderRadius: 12,
                fontSize: '1.05rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                boxShadow: '0 10px 30px rgba(37,211,102,0.4)',
                transition: 'transform 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-3px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <MessageCircle size={22} />
              Hablar con un asesor
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}