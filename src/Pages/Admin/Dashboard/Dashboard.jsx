import React, { useState, useEffect } from "react";
import {
  FaUsers, FaFileAlt, FaBook, FaBriefcase,
  FaCalendarAlt, FaBullhorn, FaComments,
  FaUserPlus, FaExclamationTriangle
} from "react-icons/fa";
import { getDashboardStats } from "../../../api/adminApi";
import { toast } from "react-toastify";

const StatCard = ({ label, value, icon, colorClass, loading }) => (
  <div className="bg-[#181a20] border border-[#232A36] rounded-xl p-5 flex items-center gap-4 hover:border-[#3a4050] transition-colors">
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${colorClass}`}>
      {icon}
    </div>
    <div className="min-w-0">
      <p className="text-gray-400 text-xs font-medium uppercase tracking-wide truncate">{label}</p>
      {loading ? (
        <div className="h-7 w-20 bg-[#232A36] rounded animate-pulse mt-1" />
      ) : (
        <p className="text-2xl font-bold text-white mt-0.5">{(value ?? 0).toLocaleString()}</p>
      )}
    </div>
  </div>
);

const CARDS = [
  { key: "total_students",          label: "Total Students",      icon: <FaUsers className="text-blue-400 text-xl" />,             colorClass: "bg-blue-500/10" },
  { key: "total_posts",             label: "Total Posts",          icon: <FaFileAlt className="text-purple-400 text-xl" />,          colorClass: "bg-purple-500/10" },
  { key: "total_notes",             label: "Notes Shared",         icon: <FaBook className="text-yellow-400 text-xl" />,             colorClass: "bg-yellow-500/10" },
  { key: "total_jobs",              label: "Jobs Posted",          icon: <FaBriefcase className="text-pink-400 text-xl" />,          colorClass: "bg-pink-500/10" },
  { key: "total_events",            label: "Events",               icon: <FaCalendarAlt className="text-cyan-400 text-xl" />,        colorClass: "bg-cyan-500/10" },
  { key: "total_announcements",     label: "Announcements",        icon: <FaBullhorn className="text-orange-400 text-xl" />,         colorClass: "bg-orange-500/10" },
  { key: "total_forum_topics",      label: "Forum Topics",         icon: <FaComments className="text-green-400 text-xl" />,          colorClass: "bg-green-500/10" },
  { key: "recent_signups",          label: "New Signups (7d)",     icon: <FaUserPlus className="text-indigo-400 text-xl" />,         colorClass: "bg-indigo-500/10" },
  { key: "reported_posts_pending",  label: "Pending Reports",      icon: <FaExclamationTriangle className="text-red-400 text-xl" />, colorClass: "bg-red-500/10" },
];

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardStats()
      .then(res => { if (res.data.success) setStats(res.data.data); })
      .catch(() => toast.error("Failed to load dashboard stats"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 text-sm mt-1">Platform overview and live statistics</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {CARDS.map(card => (
          <StatCard
            key={card.key}
            label={card.label}
            value={stats?.[card.key]}
            icon={card.icon}
            colorClass={card.colorClass}
            loading={loading}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
