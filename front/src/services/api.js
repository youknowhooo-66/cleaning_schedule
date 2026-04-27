import axios from "axios";
import { logout, getUser } from "../utils/auth";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: "http://localhost:5001/api"
});

// Interceptor para adicionar o token em todas as requisições
api.interceptors.request.use((config) => {
  const user = getUser();
  if (user && user.accessToken) {
    config.headers.Authorization = `Bearer ${user.accessToken}`;
  }
  return config;
});

// Interceptor para lidar com erros globais, especialmente 401 (não autorizado)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Se não for a rota de login, redireciona e limpa o usuário
      if (!error.config.url.endsWith("/login")) {
        logout();
        toast.error("Sua sessão expirou ou você não tem permissão. Por favor, faça login novamente.");
        window.location.href = "/";
      }
    }
    return Promise.reject(error);
  }
);

export const getBookings = () => api.get('/booking');
export const getCleaners = () => api.get('/cleaner');
export const createCleaner = (cleanerData) => api.post('/cleaner', cleanerData);
export const createUser = (userData) => api.post('/usuario', userData)
export const createBooking = (bookingData) => api.post('/booking', bookingData);

export const updateBooking = (id, bookingData) => api.put(`/booking/${id}`, bookingData);
export const updateBookingStatus = (id, status) => api.patch(`/booking/${id}/status`, { status });

export const deleteBooking = (id) => api.delete(`/booking/${id}`);


export default api;