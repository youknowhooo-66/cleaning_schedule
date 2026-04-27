import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser, logout } from "../utils/auth";
import api from "../services/api";
import { CalendarDays, Users, Activity, Plus, Sparkles } from "lucide-react";

export default function Dashboard() {
  const user = getUser();
  const navigate = useNavigate();
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
    <div className="space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white p-8 rounded-[2rem] shadow-sm border border-brand-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-50 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-accent-500" />
            <span className="text-sm font-bold tracking-wider text-brand-400 uppercase">Visão Geral</span>
          </div>
          <h1 className="text-4xl font-extrabold text-brand-950 tracking-tight">
            Que bom ver você, <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-accent-500">{user?.usuario?.nome?.split(' ')[0] || user?.nome?.split(' ')[0] || "Equipe"}</span> 👋
          </h1>
          <p className="text-gray-500 mt-2 text-lg font-medium">
            Aqui está o que está acontecendo com os seus agendamentos hoje.
          </p>
        </div>
        <div className="mt-6 sm:mt-0 relative z-10">
          <button
            onClick={() => navigate('/bookings/new')}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-bold rounded-full shadow-lg shadow-accent-500/30 text-white bg-accent-500 hover:bg-accent-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-500 transition-all hover:scale-105 active:scale-95"
          >
            <Plus className="w-5 h-5 mr-2" />
            Agendar Limpeza
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1: Agendamentos */}
        <div className="bg-gradient-to-br from-brand-800 to-brand-950 p-8 rounded-[2rem] text-white shadow-xl shadow-brand-900/20 relative overflow-hidden group">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white opacity-5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
          <div className="flex items-center justify-between relative z-10">
            <div>
              <p className="text-brand-200 font-semibold text-sm uppercase tracking-wider">Limpezas Agendadas</p>
              <h3 className="text-6xl font-black mt-2 tracking-tighter">{stats.bookings}</h3>
            </div>
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/10">
              <CalendarDays className="w-8 h-8 text-brand-100" />
            </div>
          </div>
        </div>

        {/* Card 2: Usuários */}
        <div className="bg-white p-8 rounded-[2rem] border border-brand-50 shadow-sm relative overflow-hidden group hover:border-brand-100 transition-colors">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-brand-50 opacity-50 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
          <div className="flex items-center justify-between relative z-10">
            <div>
              <p className="text-gray-500 font-semibold text-sm uppercase tracking-wider">Membros da Equipe</p>
              <h3 className="text-6xl font-black mt-2 text-brand-950 tracking-tighter">{stats.users}</h3>
            </div>
            <div className="w-16 h-16 bg-brand-50 rounded-2xl flex items-center justify-center border border-brand-100">
              <Users className="w-8 h-8 text-brand-600" />
            </div>
          </div>
        </div>

        {/* Card 3: Status */}
        <div className="bg-white p-8 rounded-[2rem] border border-brand-50 shadow-sm relative overflow-hidden group hover:border-brand-100 transition-colors">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-green-50 opacity-50 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
          <div className="flex items-center justify-between relative z-10">
            <div>
              <p className="text-gray-500 font-semibold text-sm uppercase tracking-wider">Status do Sistema</p>
              <div className="flex items-center mt-2">
                <span className="relative flex h-4 w-4 mr-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500"></span>
                </span>
                <h3 className="text-4xl font-black text-brand-950 tracking-tight">100%</h3>
              </div>
            </div>
            <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center border border-green-100">
              <Activity className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}