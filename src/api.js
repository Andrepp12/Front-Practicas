import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api'; // Cambia esto según la URL de tu API

// CRUD para TipoAmbiente
export const getTipoAmbientes = () => axios.get(`${API_URL}/tipo-ambiente/`);
export const getTipoAmbiente = (id) => axios.get(`${API_URL}/tipo-ambiente/${id}/`);
export const createTipoAmbiente = (data) => axios.post(`${API_URL}/tipo-ambiente/`, data);
export const updateTipoAmbiente = (id, data) => axios.put(`${API_URL}/tipo-ambiente/${id}/`, data);
export const deleteTipoAmbiente = (id) => axios.delete(`${API_URL}/tipo-ambiente/${id}/`);

// CRUD para Ambiente
export const getAmbientes = () => axios.get(`${API_URL}/ambiente/`);
export const getAmbiente = (id) => axios.get(`${API_URL}/ambiente/${id}/`);
export const createAmbiente = (data) => axios.post(`${API_URL}/ambiente/`, data);
export const updateAmbiente = (id, data) => axios.put(`${API_URL}/ambiente/${id}/`, data);
export const deleteAmbiente = (id) => axios.delete(`${API_URL}/ambiente/${id}/`);

// CRUD para Equipo
export const getEquipos = () => axios.get(`${API_URL}/equipo/`);
export const getEquipo = (id) => axios.get(`${API_URL}/equipo/${id}/`);
export const createEquipo = (data) => axios.post(`${API_URL}/equipo/`, data);
export const updateEquipo = (id, data) => axios.put(`${API_URL}/equipo/${id}/`, data);
export const deleteEquipo = (id) => axios.delete(`${API_URL}/equipo/${id}/`);

// CRUD para DetalleAmbienteEquipo
export const getDetalles = () => axios.get(`${API_URL}/detalle-ambiente-equipo/`);
export const getDetalle = (id) => axios.get(`${API_URL}/detalle-ambiente-equipo/${id}/`);
export const createDetalle = (data) => axios.post(`${API_URL}/detalle-ambiente-equipo/`, data);
export const updateDetalle = (id, data) => axios.put(`${API_URL}/detalle-ambiente-equipo/${id}/`, data);
export const deleteDetalle = (id) => axios.delete(`${API_URL}/detalle-ambiente-equipo/${id}/`);

