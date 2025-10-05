import React from "react";
import { FaChevronDown, FaCog, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const [dropdown, setDropdown] = React.useState(false);
  const navigate = useNavigate();
  const dropdownRef = React.useRef();

  // Close dropdown on outside click
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

  return (
    <nav className="h-16 bg-[#1a1c23] flex items-center px-8 border-b border-[#232A36] shadow z-20 relative">
      {/* Left: Logo and Panel Name */}
      <div
        className="flex items-center gap-3 cursor-pointer select-none"
        onClick={() => navigate("/admin/dashboard")}
      >
        <img src="/logo.png" alt="Cintracon Logo" className="h-10 w-10 object-contain" />
        <span className="text-white text-2xl font-semibold">CINTRACON Admin Panel</span>
      </div>
      {/* Center: Name & Email */}
      <div className="ml-auto flex items-center gap-4">
        <div className="flex flex-col justify-center items-end h-12">
          <span className="text-white text-base font-semibold leading-tight">Mizanur Rahman Jisan</span>
          <span className="text-gray-400 text-xs">admin@cintracon.com</span>
        </div>
        <div className="relative flex items-center h-12" ref={dropdownRef}>
          <button
            className="flex items-center focus:outline-none"
            onClick={() => setDropdown((d) => !d)}
          >
            <img
              src="/jisan.jpg"
              alt="Admin"
              className="h-12 w-12 rounded-full border-2 border-blue-500 object-cover"
            />
            <FaChevronDown className="text-gray-400 ml-2" />
          </button>
          {dropdown && (
            <div className="absolute right-0 mt-45 w-40 bg-[#232A36] rounded-lg shadow-lg py-2 z-50 border border-[#181D27] animate-fade-in">
              <button className="w-full flex items-center gap-2 px-4 py-2 text-gray-200 hover:bg-[#181D27]">
                <FaCog /> Settings
              </button>
              <button
                className="w-full flex items-center gap-2 px-4 py-2 text-gray-200 hover:bg-[#181D27]"
                onClick={() => navigate("/login")}
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