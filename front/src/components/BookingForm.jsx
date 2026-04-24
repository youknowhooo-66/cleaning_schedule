import { useState, useEffect } from "react";
import { api } from "../services/api";

export default function BookingForm({ onSubmit, bookingSelecionado, cleaners }) {
  const [form, setForm] = useState({
    clientName: "",
    clientEmail: "",
    serviceDate: "",
    notes: "",
    cleanerId: "",
  });

  useEffect(() => {
    if (bookingSelecionado) {
      // Cria a data local ajustando o timezone
      const date = new Date(bookingSelecionado.serviceDate);
      const tzoffset = date.getTimezoneOffset() * 60000; // offset em milissegundos
      const localISOTime = (new Date(date - tzoffset)).toISOString().slice(0, 16);
      
      setForm({
        clientName: bookingSelecionado.clientName || "",
        clientEmail: bookingSelecionado.clientEmail || "",
        serviceDate: localISOTime,
        notes: bookingSelecionado.notes || "",
        cleanerId: bookingSelecionado.cleanerId || "",
      });
    } else {
        setForm({
            clientName: "",
            clientEmail: "",
            serviceDate: "",
            notes: "",
            cleanerId: "",
          });
    }
  }, [bookingSelecionado]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(form);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nome do Cliente</label>
          <input
            name="clientName"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            value={form.clientName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email do Cliente</label>
          <input
            name="clientEmail"
            type="email"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            value={form.clientEmail}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Data e Hora do Serviço</label>
          <input
            name="serviceDate"
            type="datetime-local"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            value={form.serviceDate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Faxineiro(a)</label>
          <select
            name="cleanerId"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            value={form.cleanerId}
            onChange={handleChange}
            required
          >
            <option value="">Selecione um profissional</option>
            {cleaners.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Notas</label>
        <textarea
          name="notes"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          value={form.notes}
          onChange={handleChange}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition"
      >
        {bookingSelecionado ? "Atualizar Agendamento" : "Criar Agendamento"}
      </button>
    </form>
  );
}
