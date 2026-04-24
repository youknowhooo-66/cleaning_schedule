import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import UsuarioForm from '../components/UsuarioForm/UsuarioForm';
import { toast } from 'react-toastify';

export default function EditUsuario() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsuario() {
      try {
        const res = await api.get(`/usuario/${id}`);
        setUsuario(res.data);
      } catch (err) {
        toast.error("Erro ao carregar usuário");
      } finally {
        setLoading(false);
      }
    }
    fetchUsuario();
  }, [id]);

  async function handleSubmit(formData) {
    try {
      await api.put(`/usuario/${id}`, formData);
      toast.success("Usuário atualizado com sucesso!");
      navigate('/admin');
    } catch (err) {
      toast.error("Erro ao atualizar usuário");
    }
  }

  if (loading) return <div>Carregando...</div>;

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Editar Usuário</h1>
      <div className="bg-white p-6 rounded-2xl shadow">
        {usuario && (
          <UsuarioForm
            onSubmit={handleSubmit}
            usuarioSelecionado={usuario}
          />
        )}
        <button
          onClick={() => navigate('/admin')}
          className="mt-4 w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-lg transition"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
