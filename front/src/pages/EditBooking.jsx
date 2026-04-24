import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCleaners, updateBooking, getBookings } from '../api/api'; // Assuming getBookingById exists or can be derived from getBookings
import BookingForm from '../components/BookingForm';

export default function EditBooking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [cleaners, setCleaners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [bookingsResponse, cleanersResponse] = await Promise.all([
          getBookings(),
          getCleaners()
        ]);

        const foundBooking = bookingsResponse.data.find(b => b.id === parseInt(id));

        if (!foundBooking) {
          setError("Agendamento não encontrado.");
          setLoading(false);
          return;
        }

        setBooking(foundBooking);
        setCleaners(cleanersResponse.data);
      } catch (err) {
        setError("Erro ao carregar dados: " + err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  async function handleSubmit(formData) {
    try {
      await updateBooking(id, formData);
      navigate('/bookings');
    } catch (err) {
      setError("Erro ao atualizar agendamento: " + err.message);
    }
  }

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;
  if (!booking) return <div>Agendamento não disponível.</div>;

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Editar Agendamento</h1>
      <div className="bg-white p-6 rounded-2xl shadow">
        <BookingForm onSubmit={handleSubmit} bookingSelecionado={booking} cleaners={cleaners} />
        <button
          onClick={() => navigate('/bookings')}
          className="mt-4 w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-lg transition"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
