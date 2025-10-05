import React from "react";
import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaUsers, FaComments, FaBook, FaBriefcase, FaCalendarAlt, FaBullhorn, FaCog } from "react-icons/fa";

const menu = [
  { to: "/admin/dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
  { to: "/admin/all-students", label: "All Students", icon: <FaUsers /> },
  { to: "/admin/forum", label: "Forum", icon: <FaComments /> },
  { to: "/admin/notes", label: "Notes", icon: <FaBook /> },
  { to: "/admin/jobs", label: "Jobs", icon: <FaBriefcase /> },
  { to: "/admin/events", label: "Events", icon: <FaCalendarAlt /> },
  { to: "/admin/announcement", label: "Announcement", icon: <FaBullhorn /> },
  { to: "/admin/settings", label: "Settings", icon: <FaCog /> },
];

const AdminSidebar = () => (
  <aside className="w-64 bg-[#181a20] border-r border-[#232A36] flex flex-col py-8 px-4 min-h-[calc(100vh-4rem)]">
    <nav className="flex flex-col gap-2">
      {menu.map((item, idx) => (
        <NavLink
          key={idx}
          to={item.to}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg font-semibold text-base transition ${
              isActive
                ? "bg-gradient-to-r from-blue-700 to-purple-700 text-white shadow"
                : "text-gray-300 hover:bg-[#232A36]"
            }`
          }
        >
          <span className="text-xl">{item.icon}</span>
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  </aside>
);

export default AdminSidebar;