// services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:38867/middleware/catalogos/',
  // Otras configuraciones como headers, interceptores, etc.
});

const apiClientes = axios.create({
  baseURL: 'http://localhost:8080/api/v1/',
  // Otras configuraciones como headers, interceptores, etc.
});

export const getCatalogoAdvisor = async () => {
  const response = await api.get('/casaPlan/getCatalogoAdvisor');
  return response.data;
};

export const crearUsuario = async (datosUsuario) => {
  const response = await api.post('/usuarios', datosUsuario);
  return response.data;
};


export const obtenerActividadesEconomicas = async (pagina, size) => {
  const response = await api.get(`/actividadesEconomicas?page=${pagina}&size=${size}`);
  return response.data;
};



export const obtenerClientes = async (pagina, size, filtro) => {
  try {
    const response = await apiClientes.get(`/ClientesFiltro?pagina=${pagina}&tamano=${size}&filtro=${filtro}`);
    return response.data;
  } catch (error) {
    return null
  }
};