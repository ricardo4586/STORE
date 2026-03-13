import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Inicio from './pages/Inicio';
import Sets from './pages/Sets';
import Climas from './pages/Climas';
import Inmortales from './pages/Inmortales';
import Arcanos from './pages/Arcanos';
import Soporte from './pages/Soporte';
import Admin from './pages/Admin'; 
import Login from './pages/Login'; // Importamos el nuevo Login
import CarritoFlotante from './components/CarritoFlotante';
import { CartProvider } from './context/CartContext';
import './index.css';
import Couriers from './pages/Couriers';
// --- COMPONENTE DE SEGURIDAD ---
// Verifica si existe el permiso en el almacenamiento local
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('adminToken') === 'true';
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <CarritoFlotante /> 

        <div style={{ paddingTop: '80px' }}> 
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/sets cache" element={<Sets />} />
            <Route path="/climas" element={<Climas />} />
            <Route path="/inmortales" element={<Inmortales />} />
            <Route path="/arcanos" element={<Arcanos />} />
            <Route path="/soporte" element={<Soporte />} />
            <Route path="/couriers" element={<Couriers />} />
            
            {/* Ruta para el Login */}
            <Route path="/login" element={<Login />} />

            {/* Ruta del Super Admin PROTEGIDA */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute>
                  <Admin />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;