// Importaciones
import axios from 'axios';

// Creacion del cliente Axios
const clienteAxios = axios.create({
    // baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/`
    baseURL: `http://localhost:4000/api/`
});

// Exportando el cliente
export default clienteAxios;