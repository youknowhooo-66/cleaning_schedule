import { Link, useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="flex space-x-6">
        <Link to="/dashboard" className="text-blue-600 font-bold text-xl">CleaningSchedule</Link>
        <Link to="/bookings" className="text-gray-600 hover:text-blue-600">Agendamentos</Link>
        <Link to="/admin" className="text-gray-600 hover:text-blue-600">Usuários</Link>
      </div>
      <button 
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
      >
        Sair
      </button>
    </nav>
  );
}
