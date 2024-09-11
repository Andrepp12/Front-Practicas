import React, { useState, useEffect } from 'react';
import { getDetalles, createDetalle, updateDetalle, deleteDetalle } from './api';
import { getAmbientes, getEquipos } from './api';  // Importamos las funciones para traer ambientes y equipos

const DetalleAmbienteEquipo = () => {
  const [detalles, setDetalles] = useState([]);
  const [ambientes, setAmbientes] = useState([]);  // Estado para almacenar los ambientes
  const [equipos, setEquipos] = useState([]);      // Estado para almacenar los equipos
  const [currentDetalle, setCurrentDetalle] = useState({ ambiente: '', equipo: '', cantidad: '' });

  useEffect(() => {
    fetchDetalles();
    fetchAmbientes();   // Traer los ambientes existentes
    fetchEquipos();     // Traer los equipos existentes
  }, []);

  const fetchDetalles = async () => {
    const response = await getDetalles();
    setDetalles(response.data);
  };

  const fetchAmbientes = async () => {
    const response = await getAmbientes();  // Función para traer ambientes
    setAmbientes(response.data);
  };

  const fetchEquipos = async () => {
    const response = await getEquipos();    // Función para traer equipos
    setEquipos(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentDetalle.id) {
      await updateDetalle(currentDetalle.id, currentDetalle);
    } else {
      await createDetalle(currentDetalle);
    }

    setCurrentDetalle({ ambiente: '', equipo: '', cantidad: '' });
    fetchDetalles();
  };

  const handleEdit = (detalle) => {
    setCurrentDetalle(detalle);
  };

  const handleDelete = async (id) => {
    await deleteDetalle(id);
    fetchDetalles();
  };

  return (
    <div>
      <h2>CRUD de DetalleAmbienteEquipo</h2>

      <form onSubmit={handleSubmit}>
      <label>Ambiente:</label>
        <select
          value={currentDetalle.ambiente}
          onChange={(e) => setCurrentDetalle({ ...currentDetalle, ambiente: e.target.value })}
          required
        >
          <option value="">Seleccionar Ambiente</option>
          {ambientes.map((ambiente) => (
            <option key={ambiente.id} value={ambiente.id}>
              {ambiente.codigo} - {ambiente.ubicacion}
            </option>
          ))}
        </select>
        <br />
        
        <label>Equipo:</label>
        <select
          value={currentDetalle.equipo}
          onChange={(e) => setCurrentDetalle({ ...currentDetalle, equipo: e.target.value })}
          required
        >
          <option value="">Seleccionar Equipo</option>
          {equipos.map((equipo) => (
            <option key={equipo.id} value={equipo.id}>
              {equipo.codigo} - {equipo.nombre}
            </option>
          ))}
        </select>
        <br />
        <label>Cantidad:</label>
        <input
          type="number"
          value={currentDetalle.cantidad}
          onChange={(e) => setCurrentDetalle({ ...currentDetalle, cantidad: e.target.value })}
          required
        />
        <br />
        <button type="submit">{currentDetalle.id ? 'Actualizar' : 'Crear'}</button>
      </form>

      <h3>Lista de Detalles</h3>
      <ul>
        {detalles.map((detalle) => (
          <li key={detalle.id}>
            Ambiente: {detalle.ambiente} - Equipo: {detalle.equipo} - Cantidad: {detalle.cantidad}
            <button onClick={() => handleEdit(detalle)}>Editar</button>
            <button onClick={() => handleDelete(detalle.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DetalleAmbienteEquipo;
