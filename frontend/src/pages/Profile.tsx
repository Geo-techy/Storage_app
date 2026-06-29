import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <div className="min-h-screen bg-gray-900 flex justify-center items-center">
      <div className="bg-gray-800 p-8 rounded-xl shadow-xl w-96">
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-4xl font-bold text-white">
            {user?.email.charAt(0).toUpperCase()}
          </div>
        </div>

        <h1 className="text-3xl text-white font-bold text-center mb-8">
          My Profile
        </h1>

        <div className="space-y-5">
          <div>
            <p className="text-gray-400">User ID</p>

            <p className="text-white text-lg">{user?.id}</p>
          </div>

          <div>
            <p className="text-gray-400">Email</p>

            <p className="text-white text-lg">{user?.email}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full mt-8 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg"
        >
          Logout
        </button>

        <button
          onClick={() => navigate("/dashboard")}
          className="w-full mt-3 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg"
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default Profile;
