import { useState, useEffect } from "react";
import { api } from "../services/api";
import { toast } from "react-toastify";

export default function CleanerManagement() {
  const [cleaners, setCleaners] = useState([]);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [editandoId, setEditandoId] = useState(null);

  async function carregar() {
    try {
      const res = await api.get("/cleaner");
      setCleaners(res.data);
    } catch (error) {
      toast.error("Erro ao carregar profissionais");
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (editandoId) {
        await api.put(`/cleaner/${editandoId}`, formData);
        toast.success("Profissional atualizado!");
        setEditandoId(null);
      } else {
        await api.post("/cleaner", formData);
        toast.success("Profissional criado!");
      }
      setFormData({ name: "", email: "", phone: "" });
      carregar();
    } catch (error) {
      toast.error("Erro ao salvar profissional");
    }
  }

  function editar(cleaner) {
    setEditandoId(cleaner.id);
    setFormData({ name: cleaner.name, email: cleaner.email, phone: cleaner.phone || "" });
  }

  async function deletar(id) {
    if (window.confirm("Excluir este profissional?")) {
      try {
        await api.delete(`/cleaner/${id}`);
        toast.success("Profissional excluído!");
        carregar();
      } catch (error) {
        toast.error("Erro ao excluir");
      }
    }
  }

  return (
    <div className="space-y-6 container mx-auto p-4">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Gestão de Profissionais</h1>
        <p className="text-gray-500">Adicione, edite ou remova profissionais do sistema</p>
      </div>
      
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4">{editandoId ? "Editar Profissional" : "Novo Profissional"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input className="border p-3 w-full rounded-lg" placeholder="Nome" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
          <input className="border p-3 w-full rounded-lg" placeholder="Email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required />
          <input className="border p-3 w-full rounded-lg" placeholder="Telefone" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
          <div className="flex gap-2">
              <button className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg flex-1 font-semibold transition">{editandoId ? "Atualizar" : "Adicionar"}</button>
              {editandoId && <button type="button" onClick={() => {setEditandoId(null); setFormData({name:"", email:"", phone:""})}} className="bg-gray-400 hover:bg-gray-500 text-white p-3 rounded-lg transition">Cancelar</button>}
          </div>
        </form>
      </div>

      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 text-sm font-semibold text-gray-600">Nome</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Email</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Telefone</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Ações</th>
            </tr>
          </thead>
          <tbody>
            {cleaners.map(c => (
              <tr key={c.id} className="border-b hover:bg-gray-50 transition">
                <td className="p-4 font-medium text-gray-800">{c.name}</td>
                <td className="p-4 text-gray-600">{c.email}</td>
                <td className="p-4 text-gray-600">{c.phone || "-"}</td>
                <td className="p-4 space-x-2">
                  <button onClick={() => editar(c)} className="px-3 py-1 text-sm bg-yellow-400 hover:bg-yellow-500 text-white rounded-lg transition">Editar</button>
                  <button onClick={() => deletar(c.id)} className="px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded-lg transition">Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
