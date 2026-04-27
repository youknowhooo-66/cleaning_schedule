import { useState, useEffect } from "react";
import api  from "../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import BookingForm from "../components/BookingForm";
import { ArrowLeft, CalendarPlus } from "lucide-react";

export default function CriarAgendamento() {
  const navigate = useNavigate();
  const [cleaners, setCleaners] = useState([]);

  useEffect(() => {
    async function fetchCleaners() {
      try {
        const res = await api.get("/cleaner");
        setCleaners(res.data);
      } catch (err) {
        toast.error("Erro ao carregar profissionais");
      }
    }
    fetchCleaners();
  }, []);

  async function handleSubmit(formData) {
    try {
      await api.post("/booking", formData);
      toast.success("Agendamento realizado com sucesso!");
      navigate("/bookings");
    } catch (err) {
      const errorMessage = err.response?.data?.error || "Erro ao agendar";
      toast.error(errorMessage);
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <button
            onClick={() => navigate("/dashboard")}
            className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors mb-2"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Voltar
          </button>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <CalendarPlus className="w-6 h-6 text-blue-600" />
            </div>
            Novo Agendamento
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Preencha os dados abaixo para criar um novo agendamento no sistema.
          </p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
        <div className="relative z-10">
          <BookingForm onSubmit={handleSubmit} cleaners={cleaners} />
        </div>
      </div>
    </div>
  );
}