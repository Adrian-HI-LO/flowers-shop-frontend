
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import Personalizar from './Personalizar';
import Portafolio from './Portafolio'; 
import Promociones from './Promociones';
import Perfil from './Perfil';
import Catalogo from './Catalogo';
import ProductDetails from './ProductDetails';
import Favoritos from './Favoritos';
import Carrito from './Carrito';
import Checkout from './Checkout';
import Success from './Success';
import Historial from './Historial';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/personalizar" element={<Personalizar />} />
        <Route path="/portafolio" element={<Portafolio />} /> 
        <Route path="/promociones" element={<Promociones />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/producto/:id" element={<ProductDetails />} />
        <Route path="/favoritos" element={<Favoritos />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<Success />} />
        <Route path="/historial" element={<Historial />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;