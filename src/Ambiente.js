import React, { useState, useEffect } from 'react';
import { getAmbientes, createAmbiente, updateAmbiente, deleteAmbiente } from './api';
import { getTipoAmbientes } from './api';  // Asegúrate de traer los tipos de ambientes

const Ambiente = () => {
  const [ambientes, setAmbientes] = useState([]);
  const [tipoAmbientes, setTipoAmbientes] = useState([]);  // Estado para almacenar los tipos de ambientes
  const [currentAmbiente, setCurrentAmbiente] = useState({
    codigo: '',
    ubicacion: '',
    capacidad: '',
    tipo_ambiente: ''  // Atributo para el tipo de ambiente
  });

  useEffect(() => {
    fetchAmbientes();
    fetchTipoAmbientes();  // Traer los tipos de ambientes
  }, []);

  const fetchAmbientes = async () => {
    const response = await getAmbientes();
    setAmbientes(response.data);
  };

  const fetchTipoAmbientes = async () => {
    const response = await getTipoAmbientes();  // Traer la lista de tipoAmbientes
    setTipoAmbientes(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentAmbiente.id) {
      await updateAmbiente(currentAmbiente.id, currentAmbiente);
    } else {
      await createAmbiente(currentAmbiente);
    }

    setCurrentAmbiente({
      codigo: '',
      ubicacion: '',
      capacidad: '',
      tipo_ambiente: ''  // Resetear el tipoAmbiente después de guardar
    });
    fetchAmbientes();
  };

  const handleEdit = (ambiente) => {
    setCurrentAmbiente(ambiente);
  };

  const handleDelete = async (id) => {
    await deleteAmbiente(id);
    fetchAmbientes();
  };

  return (
    <div>
      <h2>CRUD de Ambiente</h2>

      <form onSubmit={handleSubmit}>
        <label>Código:</label>
        <input
          type="text"
          value={currentAmbiente.codigo}
          onChange={(e) => setCurrentAmbiente({ ...currentAmbiente, codigo: e.target.value })}
          required
        />
        <br />
        <label>Ubicación:</label>
        <input
          type="text"
          value={currentAmbiente.ubicacion}
          onChange={(e) => setCurrentAmbiente({ ...currentAmbiente, ubicacion: e.target.value })}
          required
        />
        <br />
        <label>Capacidad:</label>
        <input
          type="number"
          value={currentAmbiente.capacidad}
          onChange={(e) => setCurrentAmbiente({ ...currentAmbiente, capacidad: e.target.value })}
          required
        />
        <br />
        <label>Tipo de Ambiente:</label>
        <select
          value={currentAmbiente.tipo_ambiente}
          onChange={(e) => setCurrentAmbiente({ ...currentAmbiente, tipo_ambiente: e.target.value })}
          required
        >
          <option value="">Seleccionar</option>
          {tipoAmbientes.map((tipo) => (
            <option key={tipo.id} value={tipo.id}>
              {tipo.nombre}
            </option>
          ))}
        </select>
        <br />
        <button type="submit">{currentAmbiente.id ? 'Actualizar' : 'Crear'}</button>
      </form>

      <h3>Lista de Ambientes</h3>
      <table>
        <thead>
          <tr>
            <th>Código</th>
            <th>Ubicación</th>
            <th>Capacidad</th>
            <th>Tipo Ambiente</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ambientes.map((ambiente) => (
            <tr key={ambiente.id}>
              <td>{ambiente.codigo}</td>
              <td>{ambiente.ubicacion}</td>
              <td>{ambiente.capacidad}</td>
              <td>{ambiente.tipo_ambiente.nombre}</td>  {/* Mostrar el nombre del tipo de ambiente */}
              <td>
                <button onClick={() => handleEdit(ambiente)}>Editar</button>
                <button onClick={() => handleDelete(ambiente.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Ambiente;
