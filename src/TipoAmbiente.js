import React, { useState, useEffect } from 'react';
import {
  getTipoAmbientes,
  createTipoAmbiente,
  updateTipoAmbiente,
  deleteTipoAmbiente
} from './api';

const TipoAmbiente = () => {
  const [tipoAmbientes, setTipoAmbientes] = useState([]);
  const [currentTipoAmbiente, setCurrentTipoAmbiente] = useState({ nombre: '', descripcion: '' });

  // Obtener todos los TipoAmbientes al cargar el componente
  useEffect(() => {
    fetchTipoAmbientes();
  }, []);

  const fetchTipoAmbientes = async () => {
    const response = await getTipoAmbientes();
    setTipoAmbientes(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentTipoAmbiente.id) {
      // Si el TipoAmbiente tiene un ID, estamos actualizando
      await updateTipoAmbiente(currentTipoAmbiente.id, currentTipoAmbiente);
    } else {
      // De lo contrario, estamos creando un nuevo TipoAmbiente
      await createTipoAmbiente(currentTipoAmbiente);
    }

    setCurrentTipoAmbiente({ nombre: '', descripcion: '' });
    fetchTipoAmbientes(); // Refrescar la lista
  };

  const handleEdit = (tipoAmbiente) => {
    setCurrentTipoAmbiente(tipoAmbiente);
  };

  const handleDelete = async (id) => {
    await deleteTipoAmbiente(id);
    fetchTipoAmbientes(); // Refrescar la lista
  };

  return (
    <div>
      <h2>Formulario de TipoAmbiente</h2>

      <form class="max-w-md mx-auto" onSubmit={handleSubmit}>
        <label>Nombre:</label>
        <input
          type="text"
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
          placeholder=" "
          value={currentTipoAmbiente.nombre}
          onChange={(e) => setCurrentTipoAmbiente({ ...currentTipoAmbiente, nombre: e.target.value })}
          required
        />
        <br />
        <label>Descripción:</label>
        <input
          type="text"
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
          placeholder=" " 
          required 
          value={currentTipoAmbiente.descripcion}
          onChange={(e) => setCurrentTipoAmbiente({ ...currentTipoAmbiente, descripcion: e.target.value })}
        />
        <br />
        <button type="submit" class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">
          {currentTipoAmbiente.id ? 'Actualizar' : 'Crear'}
        </button>
      </form>
      <br></br>
      <h3>Lista de TipoAmbientes</h3>
      <br></br>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500">
          <thead class="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" class="px-6 py-3">
                Nombre
              </th>
              <th scope="col" class="px-6 py-3">
                Descripción
              </th>
              <th scope="col" class="px-6 py-3">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {tipoAmbientes.map((tipo) => (
              <tr class="bg-white border-b" key={tipo.id}>
                <td class="px-6 py-4">{tipo.nombre}</td>
                <td class="px-6 py-4">{tipo.descripcion}</td>
                <td class="px-6 py-4">
                  <button onClick={() => handleEdit(tipo)}>Editar</button>
                  <button onClick={() => handleDelete(tipo.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      
    </div>
  );
};

export default TipoAmbiente;
