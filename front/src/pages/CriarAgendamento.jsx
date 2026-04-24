import { useState, useEffect } from "react";
import { api } from "../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import BookingForm from "../components/BookingForm";

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
      toast.success("Agendamento realizado!");
      navigate("/bookings");
    } catch (err) {
      toast.error(err.response?.data?.error || "Erro ao agendar");
    }
  }

  return (
    <div className="space-y-6 container mx-auto p-4">
      <h1 className="text-3xl font-bold">Novo Agendamento</h1>
      <div className="bg-white p-6 rounded shadow">
        <BookingForm onSubmit={handleSubmit} cleaners={cleaners} />
      </div>
    </div>
  );
}