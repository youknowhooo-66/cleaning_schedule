import { useEffect, useState } from "react";
import { getUser } from "../utils/auth";
import { api } from "../services/api";

export default function Dashboard() {
  const user = getUser();
  const [stats, setStats] = useState({
    bookings: 0,
    users: 0,
  });

  async function carregarStats() {
    try {
      const [resBookings, resUsers] = await Promise.all([
        api.get("/booking"),
        api.get("/usuario")
      ]);
      setStats({
        bookings: resBookings.data.length,
        users: resUsers.data.length,
      });
    } catch (error) {
      console.error("Erro ao carregar estatísticas");
    }
  }

  useEffect(() => {
    carregarStats();
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-white p-8 rounded-2xl shadow-sm">
        <h1 className="text-3xl font-bold text-gray-800">
          Bem vindo, {user?.nome || "Usuário"}!
        </h1>
        <p className="text-gray-500 mt-2">
          Este é o seu painel de controle para o sistema de agendamento de limpezas.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-blue-500 p-6 rounded-2xl text-white shadow-lg">
          <h3 className="text-lg font-semibold opacity-80">Total de Agendamentos</h3>
          <p className="text-4xl font-bold mt-2">{stats.bookings}</p>
        </div>

        <div className="bg-purple-500 p-6 rounded-2xl text-white shadow-lg">
          <h3 className="text-lg font-semibold opacity-80">Usuários Cadastrados</h3>
          <p className="text-4xl font-bold mt-2">{stats.users}</p>
        </div>

        <div className="bg-green-500 p-6 rounded-2xl text-white shadow-lg flex flex-col justify-center">
          <h3 className="text-lg font-semibold opacity-80">Status do Sistema</h3>
          <p className="text-2xl font-bold mt-2">Online</p>
        </div>
      </div>
    </div>
  );
}