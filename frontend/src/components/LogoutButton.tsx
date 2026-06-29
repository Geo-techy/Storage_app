import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function LogoutButton() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  function handleLogout() {
    logout(); // Calls AuthContext logout
    navigate("/");
  }

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-4 py-2 rounded-lg"
    >
      Logout
    </button>
  );
}

export default LogoutButton;
