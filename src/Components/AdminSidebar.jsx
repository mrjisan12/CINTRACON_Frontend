import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt, FaUsers, FaComments, FaBook,
  FaBriefcase, FaCalendarAlt, FaBullhorn, FaCog,
  FaFlag, FaTools
} from "react-icons/fa";

const menu = [
  { to: "/admin/dashboard",     label: "Dashboard",     icon: <FaTachometerAlt /> },
  { to: "/admin/students",      label: "Students",       icon: <FaUsers /> },
  { to: "/admin/forum",         label: "Forum & Posts",  icon: <FaComments /> },
  { to: "/admin/notes",         label: "Notes",          icon: <FaBook /> },
  { to: "/admin/jobs",          label: "Jobs",           icon: <FaBriefcase /> },
  { to: "/admin/events",        label: "Events",         icon: <FaCalendarAlt /> },
  { to: "/admin/announcement",  label: "Announcements",  icon: <FaBullhorn /> },
  { to: "/admin/reports",       label: "Reports",        icon: <FaFlag /> },
  { to: "/admin/maintenance",   label: "Maintenance",    icon: <FaTools /> },
  { to: "/admin/settings",      label: "Settings",       icon: <FaCog /> },
];

const AdminSidebar = () => (
  <aside className="w-64 bg-[#181a20] border-r border-[#232A36] flex flex-col py-6 px-3 min-h-[calc(100vh-4rem)]">
    <nav className="flex flex-col gap-1">
      {menu.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${
              isActive
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                : "text-gray-400 hover:text-white hover:bg-[#232A36]"
            }`
          }
        >
          <span className="text-base">{item.icon}</span>
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  </aside>
);

export default AdminSidebar;
