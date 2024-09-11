import React from 'react';
import { Link } from 'react-router-dom';
import './estilos.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Navegación</h2>
      <ul>
        <li><Link to="/tipo-ambiente">Tipo Ambiente</Link></li>
        <li><Link to="/ambiente">Ambiente</Link></li>
        <li><Link to="/equipo">Equipo</Link></li>
        <li><Link to="/detalle-ambiente-equipo">Detalle Ambiente-Equipo</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;

