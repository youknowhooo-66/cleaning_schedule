import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
});

export const getBookings = () => api.get('/booking');
export const createBooking = (bookingData) => api.post('/booking', bookingData);
export const updateBookingStatus = (id, status) => api.patch(`/booking/${id}/status`, { status });
export const deleteBooking = (id) => api.delete(`/booking/${id}`);

export const getCleaners = () => api.get('/cleaner');
export const createCleaner = (cleanerData) => api.post('/cleaner', cleanerData);
export const createUser = (userData) => api.post('/usuario', userData)

export default api;
