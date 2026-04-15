import { useState, useEffect } from "react";

export default function UsuarioForm({ onSubmit, usuarioSelecionado }) {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    tipoUsuario: "USER",
  });

  useEffect(() => {
    if (usuarioSelecionado) {
      setForm({
        ...usuarioSelecionado,
        senha: "",
      });
    } else {
      setForm({
        nome: "",
        email: "",
        senha: "",
        tipoUsuario: "USER",
      });
    }
  }, [usuarioSelecionado]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(form);
    if (!usuarioSelecionado) {
      setForm({ nome: "", email: "", senha: "", tipoUsuario: "USER" });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nome</label>
          <input
            name="nome"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            value={form.nome}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            name="email"
            type="email"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {!usuarioSelecionado && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Senha</label>
            <input
              name="senha"
              type="password"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={form.senha}
              onChange={handleChange}
              required
            />
          </div>
        )}
        <div>
          <label className="block text-sm font-medium text-gray-700">Tipo de Usuário</label>
          <select
            name="tipoUsuario"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            value={form.tipoUsuario}
            onChange={handleChange}
          >
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition"
      >
        {usuarioSelecionado ? "Atualizar Usuário" : "Criar Usuário"}
      </button>
    </form>
  );
}