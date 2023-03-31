import axios from 'axios';

// crear una instancia personalizada de axios
const localAxios = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true  // habilitar el uso de cookies
});

// interceptar todas las solicitudes para agregar el token XSRF-TOKEN
localAxios.interceptors.request.use(config => {
  const xsrfToken = getCookie('XSRF-TOKEN');
  if (xsrfToken) {
    config.headers['X-XSRF-TOKEN'] = xsrfToken; // agregar el token como un encabezado personalizado
  }
  return config;
});

// función para obtener el valor de una cookie
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

export default localAxios;