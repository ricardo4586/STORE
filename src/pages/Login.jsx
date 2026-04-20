import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Importante tener axios instalado

const Login = () => {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const navigate = useNavigate();

  const manejarLogin = async (e) => {
    e.preventDefault();
    
    try {
      // 1. Enviamos los datos al backend, no los validamos aquí
      const response = await axios.post('https://panterastore.vercel.app/api/login', { user, pass });

      if (response.data.success) {
        // 2. Si el servidor dice que ok, guardamos el token y entramos
        localStorage.setItem('adminToken', 'true');
        navigate('/admin');
      }
    } catch (error) {
      // 3. Si las credenciales fallan o el servidor no responde
      alert('Credenciales incorrectas o error de servidor');
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={manejarLogin} style={styles.form}>
        <h2 style={{color: 'var(--neon-cyan)', textAlign: 'center'}}>LOGIN ADMIN</h2>
        <input 
          type="text" 
          placeholder="Usuario" 
          onChange={e => setUser(e.target.value)} 
          style={styles.input} 
          required 
        />
        <input 
          type="password" 
          placeholder="Contraseña" 
          onChange={e => setPass(e.target.value)} 
          style={styles.input} 
          required 
        />
        <button type="submit" style={styles.btn}>ENTRAR</button>
      </form>
    </div>
  );
};

const styles = {
  container: { height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' },
  form: { background: '#151517', padding: '40px', borderRadius: '15px', border: '1px solid #333', display: 'flex', flexDirection: 'column', gap: '15px', width: '300px' },
  input: { padding: '12px', borderRadius: '8px', border: '1px solid #444', backgroundColor: '#000', color: 'white', outline: 'none' },
  btn: { padding: '12px', backgroundColor: 'var(--neon-cyan)', color: 'black', fontWeight: 'bold', border: 'none', borderRadius: '8px', cursor: 'pointer', transition: '0.3s' }
};

export default Login;