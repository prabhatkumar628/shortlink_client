import { FiX, FiLogOut } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext.js";

export default function ProfileModal({ onClose }) {
  const { user, logout, authLoading } = useAuth();
  const handleLogout = async () => {
    await logout();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-[#0f172a] rounded-2xl w-full max-w-md p-6 relative border border-white/10">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <FiX size={25} />
        </button>

        {/* Avatar */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-cyan-400 text-black flex items-center justify-center text-2xl font-bold">
            {user.data.name.charAt(0).toUpperCase()}
          </div>
        </div>

        {/* Info */}
        <div className="text-center space-y-1">
          <h2 className="text-lg font-semibold">{user.data.name}</h2>
          <p className="text-sm text-gray-400">{user.data.email}</p>
        </div>

        {/* Actions */}
        <div className="mt-6 space-y-3">
          <button className="w-full py-2 rounded-lg border border-white/20 hover:bg-white/10 transition">
            Update Profile
          </button>

          <button
            onClick={handleLogout}
            disabled={authLoading}
            className="w-full py-2 rounded-lg bg-red-500/90 text-black font-semibold hover:bg-red-500 transition flex items-center justify-center gap-2"
          >
            <FiLogOut />
            {authLoading ? "Logging out..." : "Logout"}
          </button>
        </div>
      </div>
    </div>
  );
}
