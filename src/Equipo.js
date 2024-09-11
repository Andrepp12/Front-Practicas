import React, { useState, useEffect } from 'react';
import { getEquipos, createEquipo, updateEquipo, deleteEquipo } from './api';

const Equipo = () => {
  const [equipos, setEquipos] = useState([]);
  const [currentEquipo, setCurrentEquipo] = useState({ codigo: '', nombre: '', marca: '', modelo: '' });

  useEffect(() => {
    fetchEquipos();
  }, []);

  const fetchEquipos = async () => {
    const response = await getEquipos();
    setEquipos(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentEquipo.id) {
      await updateEquipo(currentEquipo.id, currentEquipo);
    } else {
      await createEquipo(currentEquipo);
    }

    setCurrentEquipo({ codigo: '', nombre: '', marca: '', modelo: '' });
    fetchEquipos();
  };

  const handleEdit = (equipo) => {
    setCurrentEquipo(equipo);
  };

  const handleDelete = async (id) => {
    await deleteEquipo(id);
    fetchEquipos();
  };

  return (
    <div>
      <h2>CRUD de Equipo</h2>

      <form onSubmit={handleSubmit}>
        <label>Código:</label>
        <input
          type="text"
          value={currentEquipo.codigo}
          onChange={(e) => setCurrentEquipo({ ...currentEquipo, codigo: e.target.value })}
          required
        />
        <br />
        <label>Nombre:</label>
        <input
          type="text"
          value={currentEquipo.nombre}
          onChange={(e) => setCurrentEquipo({ ...currentEquipo, nombre: e.target.value })}
          required
        />
        <br />
        <label>Marca:</label>
        <input
          type="text"
          value={currentEquipo.marca}
          onChange={(e) => setCurrentEquipo({ ...currentEquipo, marca: e.target.value })}
          required
        />
        <br />
        <label>Modelo:</label>
        <input
          type="text"
          value={currentEquipo.modelo}
          onChange={(e) => setCurrentEquipo({ ...currentEquipo, modelo: e.target.value })}
          required
        />
        <br />
        <button type="submit">{currentEquipo.id ? 'Actualizar' : 'Crear'}</button>
      </form>

      <h3>Lista de Equipos</h3>
      <ul>
        {equipos.map((equipo) => (
          <li key={equipo.id}>
            {equipo.codigo} - {equipo.nombre} - {equipo.marca} - {equipo.modelo}
            <button onClick={() => handleEdit(equipo)}>Editar</button>
            <button onClick={() => handleDelete(equipo.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Equipo;
