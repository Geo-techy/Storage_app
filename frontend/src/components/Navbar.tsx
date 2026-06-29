import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user } = useAuth();
  const navigate = useNavigate();
  return (
    <nav className="bg-white shadow px-8 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-blue-600">Storage App</h1>

      <div className="flex items-center gap-4">
        <div
          onClick={() => navigate("/profile")}
          className="w-12 h-12 rounded-full bg-blue-700 flex items-center justify-center text-white font-bold cursor-pointer hover:bg-blue-800"
        >
          {user?.email.charAt(0).toUpperCase()}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
