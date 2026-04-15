import { useState, useEffect } from "react";
import UsuarioForm from "../components/UsuarioForm/UsuarioForm";
import { api } from "../services/api";
import { toast } from "react-toastify";

export default function Admin() {
  const [usuarios, setUsuarios] = useState([]);
  const [editando, setEditando] = useState(null);

  async function carregarUsuarios() {
    try {
      const res = await api.get("/usuario");
      setUsuarios(res.data);
    } catch (error) {
      toast.error("Erro ao carregar usuários");
    }
  }

  useEffect(() => {
    carregarUsuarios();
  }, []);

  async function salvar(usuario) {
    try {
      if (editando) {
        await api.put(`/usuario/${editando.id}`, usuario);
        toast.success("Usuário atualizado com sucesso!");
        setEditando(null);
      } else {
        await api.post("/usuario/register", usuario);
        toast.success("Usuário criado com sucesso!");
      }
      carregarUsuarios();
    } catch (error) {
      toast.error(error.response?.data?.message || "Erro ao salvar usuário");
    }
  }

  async function deletar(id) {
    if (window.confirm("Deseja realmente excluir este usuário?")) {
      try {
        await api.delete(`/usuario/${id}`);
        toast.success("Usuário excluído com sucesso!");
        carregarUsuarios();
      } catch (error) {
        toast.error("Erro ao excluir usuário");
      }
    }
  }

  function editar(usuario) {
    setEditando(usuario);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Gerenciamento de Usuários
        </h1>
        <p className="text-gray-500">Adicione, edite ou remova usuários do sistema</p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4">
          {editando ? "Editar Usuário" : "Novo Usuário"}
        </h2>

        <UsuarioForm
          onSubmit={salvar}
          usuarioSelecionado={editando}
        />
        {editando && (
          <button
            onClick={() => setEditando(null)}
            className="mt-2 text-gray-500 hover:underline"
          >
            Cancelar Edição
          </button>
        )}
      </div>

      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 text-sm font-semibold text-gray-600">Nome</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Email</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Tipo</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Ações</th>
            </tr>
          </thead>

          <tbody>
            {usuarios.map((u) => (
              <tr
                key={u.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="p-4 font-medium text-gray-800">
                  {u.nome}
                </td>

                <td className="p-4 text-gray-600">
                  {u.email}
                </td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold
                    ${
                      u.tipoUsuario === "ADMIN"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {u.tipoUsuario}
                  </span>
                </td>

                <td className="p-4 space-x-2">
                  <button
                    onClick={() => editar(u)}
                    className="px-3 py-1 text-sm bg-yellow-400 hover:bg-yellow-500 text-white rounded-lg transition"
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => deletar(u.id)}
                    className="px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {usuarios.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            Nenhum usuário encontrado
          </div>
        )}
      </div>
    </div>
  );
}