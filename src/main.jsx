// Punto de entrada de JDI Beauty. Bootstrap se carga antes de los estilos propios.
// React proporciona el runtime de componentes; createRoot monta la aplicación en #root.
import React from 'react';
import { createRoot } from 'react-dom/client';
// Bootstrap se importa primero para que los estilos propios puedan prevalecer después.
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// Microinteracciones visuales adicionales: no cambian las reglas de negocio.
import './styles/microinteractions.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
