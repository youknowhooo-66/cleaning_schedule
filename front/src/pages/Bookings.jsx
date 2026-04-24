import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../services/api";
import BookingForm from "../components/BookingForm";
import { toast } from "react-toastify";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [cleaners, setCleaners] = useState([]);

  async function carregarDados() {
    try {
      const [resBookings, resCleaners] = await Promise.all([
        api.get("/booking"),
        api.get("/cleaner")
      ]);
      setBookings(resBookings.data);
      setCleaners(resCleaners.data);
    } catch (error) {
      toast.error("Erro ao carregar dados");
    }
  }

  useEffect(() => {
    carregarDados();
  }, []);

  async function salvar(booking) {
    try {
      await api.post("/booking", booking);
      toast.success("Agendamento criado!");
      carregarDados();
    } catch (error) {
      toast.error("Erro ao salvar agendamento");
    }
  }

  async function deletar(id) {
    if (window.confirm("Deseja realmente excluir este agendamento?")) {
      try {
        await api.delete(`/booking/${id}`);
        toast.success("Agendamento excluído!");
        carregarDados();
      } catch (error) {
        toast.error("Erro ao excluir agendamento");
      }
    }
  }

  async function atualizarStatus(id, status) {
    try {
      await api.patch(`/booking/${id}/status`, { status });
      toast.success("Status atualizado!");
      carregarDados();
    } catch (error) {
      toast.error("Erro ao atualizar status");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Agendamentos de Limpeza</h1>
      </div>

      {/* <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4">
          Novo Agendamento
        </h2>
        <BookingForm
          onSubmit={salvar}
          cleaners={cleaners}
        />
      </div> */}

      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 text-sm font-semibold text-gray-600">Cliente</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Data</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Profissional</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Status</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Ações</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id} className="border-b hover:bg-gray-50 transition">
                <td className="p-4">
                  <div className="font-medium text-gray-800">{b.clientName}</div>
                  <div className="text-xs text-gray-500">{b.clientEmail}</div>
                </td>
                <td className="p-4 text-gray-600">
                  {new Date(b.serviceDate).toLocaleString()}
                </td>
                <td className="p-4 text-gray-600">
                  {b.cleaner?.name || "Não atribuído"}
                </td>
                <td className="p-4">
                  <select
                    value={b.status}
                    onChange={(e) => atualizarStatus(b.id, e.target.value)}
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      b.status === "CONFIRMED" ? "bg-green-100 text-green-700" :
                      b.status === "CANCELLED" ? "bg-red-100 text-red-700" :
                      b.status === "COMPLETED" ? "bg-blue-100 text-blue-700" :
                      "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    <option value="PENDING">PENDING</option>
                    <option value="CONFIRMED">CONFIRMED</option>
                    <option value="COMPLETED">COMPLETED</option>
                    <option value="CANCELLED">CANCELLED</option>
                  </select>
                </td>
                <td className="p-4 space-x-2">
                  <Link
                    to={`/bookings/edit/${b.id}`}
                    className="px-3 py-1 text-sm bg-yellow-400 hover:bg-yellow-500 text-white rounded-lg transition"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => deletar(b.id)}
                    className="px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {bookings.length === 0 && (
          <div className="p-6 text-center text-gray-500">Nenhum agendamento encontrado</div>
        )}
      </div>
    </div>
  );
}
