import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; // Tu componente de encabezado
import Inicio from './pages/Inicio';
import Sets from './pages/Sets';
import Climas from './pages/Climas';
import './index.css';

function App() {
  return (
    <Router>
      {/* EL NAVBAR ES GLOBAL: Está fuera de <Routes> */}
      <Navbar /> 
      
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/sets" element={<Sets />} />
        <Route path="/climas" element={<Climas />} />
        {/* Agrega más aquí... */}
      </Routes>
    </Router>
  );
}

export default App;