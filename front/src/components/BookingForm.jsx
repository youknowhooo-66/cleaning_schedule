import { useState, useEffect } from "react";
import { User, Mail, Calendar, Clock, Briefcase, AlignLeft, Users } from "lucide-react";

export default function BookingForm({ onSubmit, bookingSelecionado, cleaners }) {
  const [form, setForm] = useState({
    clientName: "",
    clientEmail: "",
    serviceDate: "",
    serviceType: "residential",
    notes: "",
    cleanerId: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (bookingSelecionado) {
      const date = new Date(bookingSelecionado.serviceDate);
      const tzoffset = date.getTimezoneOffset() * 60000;
      const localISOTime = (new Date(date - tzoffset)).toISOString().slice(0, 16);
      
      setForm({
        clientName: bookingSelecionado.clientName || "",
        clientEmail: bookingSelecionado.clientEmail || "",
        serviceDate: localISOTime,
        serviceType: bookingSelecionado.serviceType || "residential",
        notes: bookingSelecionado.notes || "",
        cleanerId: bookingSelecionado.cleanerId || "",
      });
    } else {
        setForm({
            clientName: "",
            clientEmail: "",
            serviceDate: "",
            serviceType: "residential",
            notes: "",
            cleanerId: "",
          });
    }
  }, [bookingSelecionado]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: null }); // Clear error on change
  }

  function validateForm() {
    const newErrors = {};
    if (!form.clientName) newErrors.clientName = "Nome do Cliente é obrigatório.";
    if (!form.clientEmail) newErrors.clientEmail = "Email do Cliente é obrigatório.";
    else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.clientEmail)) {
      newErrors.clientEmail = "Email inválido.";
    }
    if (!form.serviceDate) newErrors.serviceDate = "Data e Hora do Serviço são obrigatórios.";
    else if (new Date(form.serviceDate) < new Date()) {
      newErrors.serviceDate = "A data e hora do serviço devem ser no futuro.";
    }
    if (!form.cleanerId) newErrors.cleanerId = "Profissional é obrigatório.";
    if (!form.serviceType) newErrors.serviceType = "Tipo de Serviço é obrigatório.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(form);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      
      {/* Service Type Selection */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">Tipo de Serviço</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className={`
            relative flex cursor-pointer rounded-xl border p-4 shadow-sm focus:outline-none transition-all
            ${form.serviceType === 'residential' 
              ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500' 
              : 'border-gray-300 bg-white hover:bg-gray-50'
            }
          `}>
            <input
              type="radio"
              name="serviceType"
              value="residential"
              className="sr-only"
              checked={form.serviceType === "residential"}
              onChange={handleChange}
            />
            <span className="flex flex-1">
              <span className="flex flex-col">
                <span className={`block text-sm font-medium ${form.serviceType === 'residential' ? 'text-blue-900' : 'text-gray-900'}`}>
                  Residencial
                </span>
                <span className={`mt-1 flex items-center text-sm ${form.serviceType === 'residential' ? 'text-blue-700' : 'text-gray-500'}`}>
                  Limpeza padrão para residências.
                </span>
              </span>
            </span>
            <Calendar className={`h-5 w-5 ${form.serviceType === 'residential' ? 'text-blue-600' : 'text-gray-400'}`} />
          </label>

          <label className={`
            relative flex cursor-pointer rounded-xl border p-4 shadow-sm focus:outline-none transition-all
            ${form.serviceType === 'commercial' 
              ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500' 
              : 'border-gray-300 bg-white hover:bg-gray-50'
            }
          `}>
            <input
              type="radio"
              name="serviceType"
              value="commercial"
              className="sr-only"
              checked={form.serviceType === "commercial"}
              onChange={handleChange}
            />
            <span className="flex flex-1">
              <span className="flex flex-col">
                <span className={`block text-sm font-medium ${form.serviceType === 'commercial' ? 'text-blue-900' : 'text-gray-900'}`}>
                  Comercial
                </span>
                <span className={`mt-1 flex items-center text-sm ${form.serviceType === 'commercial' ? 'text-blue-700' : 'text-gray-500'}`}>
                  Alocação de profissionais para empresas.
                </span>
              </span>
            </span>
            <Briefcase className={`h-5 w-5 ${form.serviceType === 'commercial' ? 'text-blue-600' : 'text-gray-400'}`} />
          </label>
        </div>
        {errors.serviceType && <p className="text-red-500 text-xs mt-2 animate-pulse">{errors.serviceType}</p>}
      </div>

      <hr className="border-gray-200" />

      {/* Client Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Cliente</label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="clientName"
              className={`focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-lg py-3 transition-colors ${errors.clientName ? 'border-red-300 ring-red-300' : ''}`}
              placeholder="Ex: João da Silva"
              value={form.clientName}
              onChange={handleChange}
            />
          </div>
          {errors.clientName && <p className="text-red-500 text-xs mt-1">{errors.clientName}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email do Cliente</label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              name="clientEmail"
              className={`focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-lg py-3 transition-colors ${errors.clientEmail ? 'border-red-300 ring-red-300' : ''}`}
              placeholder="joao@exemplo.com"
              value={form.clientEmail}
              onChange={handleChange}
            />
          </div>
          {errors.clientEmail && <p className="text-red-500 text-xs mt-1">{errors.clientEmail}</p>}
        </div>
      </div>

      {/* Service Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Data e Hora do Serviço</label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Clock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="datetime-local"
              name="serviceDate"
              className={`focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-lg py-3 transition-colors ${errors.serviceDate ? 'border-red-300 ring-red-300' : ''}`}
              value={form.serviceDate}
              onChange={handleChange}
            />
          </div>
          {errors.serviceDate && <p className="text-red-500 text-xs mt-1">{errors.serviceDate}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Profissional</label>
          <div className="relative rounded-md shadow-sm">
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Users className="h-5 w-5 text-gray-400" />
            </div>
            <select
              name="cleanerId"
              className={`focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-lg py-3 transition-colors appearance-none bg-white ${errors.cleanerId ? 'border-red-300 ring-red-300' : ''}`}
              value={form.cleanerId}
              onChange={handleChange}
            >
              <option value="" disabled>Selecione um profissional...</option>
              {cleaners.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
             <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
          {errors.cleanerId && <p className="text-red-500 text-xs mt-1">{errors.cleanerId}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Notas ou Observações Adicionais (Opcional)</label>
        <div className="relative rounded-md shadow-sm">
          <div className="absolute top-3 left-3 pointer-events-none">
            <AlignLeft className="h-5 w-5 text-gray-400" />
          </div>
          <textarea
            name="notes"
            rows={3}
            className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-lg py-3 transition-colors"
            placeholder="Detalhes sobre a limpeza, acesso ao local, etc..."
            value={form.notes}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="pt-4">
        <button
          type="submit"
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all hover:-translate-y-0.5 active:translate-y-0"
        >
          {bookingSelecionado ? "Salvar Alterações do Agendamento" : "Confirmar Novo Agendamento"}
        </button>
      </div>
    </form>
  );
}
