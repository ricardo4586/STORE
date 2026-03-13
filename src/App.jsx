import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Inicio from './pages/Inicio';
import Sets from './pages/Sets';
import Climas from './pages/Climas';
import Inmortales from './pages/Inmortales';
import Arcanos from './pages/Arcanos';
import Soporte from './pages/Soporte';
import CarritoFlotante from './components/CarritoFlotante'; // Importamos el carrito visual
import { CartProvider } from './context/CartContext'; // Importamos el proveedor de datos
import './index.css';

function App() {
  return (
    <CartProvider> {/* Envuelve todo para que el carrito funcione en cada página */}
      <Router>
        <Navbar />
        
        {/* Este componente estará visible en todas las rutas cuando haya items */}
        <CarritoFlotante /> 

        <div style={{ paddingTop: '80px' }}> 
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/sets cache" element={<Sets />} />
            <Route path="/climas" element={<Climas />} />
            <Route path="/inmortales" element={<Inmortales />} />
            <Route path="/arcanos" element={<Arcanos />} />
            <Route path="/soporte" element={<Soporte />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;