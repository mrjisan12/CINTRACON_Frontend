import React from "react";
import { FaChevronDown, FaCog, FaSignOutAlt, FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const AdminNavbar = () => {
  const [dropdown, setDropdown] = React.useState(false);
  const navigate = useNavigate();
  const dropdownRef = React.useRef();
  const { user, logout } = useAuth();

  React.useEffect(() => {
    if (!dropdown) return;
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [dropdown]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const displayName = user?.name || user?.full_name || "Admin";
  const displayEmail = user?.email || "";
  const displayPhoto = user?.profile_photo || "/default-avatar.png";

  return (
    <nav className="h-16 bg-[#1a1c23] flex items-center px-8 border-b border-[#232A36] shadow z-20 relative">
      <div
        className="flex items-center gap-3 cursor-pointer select-none"
        onClick={() => navigate("/admin/dashboard")}
      >
        <img src="/logo.png" alt="Cintracon Logo" className="h-9 w-9 object-contain" />
        <span className="text-white text-xl font-semibold">CINTRACON <span className="text-blue-400">Admin</span></span>
      </div>

      <div className="ml-auto flex items-center gap-4">
        <div className="flex flex-col justify-center items-end">
          <span className="text-white text-sm font-semibold leading-tight">{displayName}</span>
          <span className="text-gray-400 text-xs">{displayEmail}</span>
        </div>
        <div className="relative flex items-center" ref={dropdownRef}>
          <button
            className="flex items-center gap-2 focus:outline-none"
            onClick={() => setDropdown((d) => !d)}
          >
            <img
              src={displayPhoto}
              alt="Admin"
              onError={(e) => { e.target.src = "/default-avatar.png"; }}
              className="h-10 w-10 rounded-full border-2 border-blue-500 object-cover"
            />
            <FaChevronDown className={`text-gray-400 text-xs transition-transform ${dropdown ? "rotate-180" : ""}`} />
          </button>
          {dropdown && (
            <div className="absolute right-0 top-12 w-44 bg-[#232A36] rounded-xl shadow-xl py-2 z-50 border border-[#2d3748]">
              <button
                className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-green-400 hover:bg-green-500/10 transition"
                onClick={() => { navigate("/home"); setDropdown(false); }}
              >
                <FaHome className="text-green-400" /> Home
              </button>
              <div className="border-t border-[#2d3748] my-1" />
              <button
                className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-200 hover:bg-[#2a3040] transition"
                onClick={() => { navigate("/admin/settings"); setDropdown(false); }}
              >
                <FaCog className="text-gray-400" /> Settings
              </button>
              <div className="border-t border-[#2d3748] my-1" />
              <button
                className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition"
                onClick={handleLogout}
              >
                <FaSignOutAlt /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
