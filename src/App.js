import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './output.css';
import Sidebar from './Sidebar';
import TipoAmbiente from './TipoAmbiente';
import Ambiente from './Ambiente';
import Equipo from './Equipo';
import DetalleAmbienteEquipo from './DetalleAmbienteEquipo';

function App() {
  return (
    <Router>
      <div className="App">
        <Sidebar />
        <div className="content">
          <header className="App-header">
            <Routes>
              <Route path="/tipo-ambiente" element={<TipoAmbiente />} />
              <Route path="/ambiente" element={<Ambiente />} />
              <Route path="/equipo" element={<Equipo />} />
              <Route path="/detalle-ambiente-equipo" element={<DetalleAmbienteEquipo />} />
            </Routes>
          </header>
        </div>
      </div>
    </Router>
  );
}

export default App;


