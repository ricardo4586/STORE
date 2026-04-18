import Link from 'next/link'

export default function Custom404() {
  return (
    <div style={{
      backgroundColor: '#0b0e14',
      color: 'white',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'sans-serif'
    }}>
      <h1 style={{ fontSize: '10rem', color: '#dc2626', margin: 0 }}>404</h1>
      <h2 style={{ fontSize: '2rem', textTransform: 'uppercase' }}>¡Hook Fallado!</h2>
      <p style={{ color: '#9ca3af', marginBottom: '2rem' }}>
        El ítem que buscas no está en el inventario.
      </p>
      
      <Link href="/">
        <a style={{
          backgroundColor: '#dc2626',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '99px',
          textDecoration: 'none',
          fontWeight: 'bold'
        }}>
          VOLVER AL CATÁLOGO
        </a>
      </Link>
    </div>
  )
}