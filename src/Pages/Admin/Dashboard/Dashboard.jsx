import React from "react";
import { FaUsers, FaUserCheck, FaComments, FaBook, FaBriefcase, FaCalendarAlt } from "react-icons/fa";

// Dummy graph component (simple SVG bar chart)
const DummyBarGraph = () => (
  <div className="bg-[#232A36] rounded-2xl p-6 shadow flex flex-col items-center mb-8">
    <h3 className="text-white font-semibold mb-4">User Growth (Last 6 Months)</h3>
    <svg width="100%" height="120" viewBox="0 0 320 120">
      <g>
        <rect x="10" y="60" width="30" height="50" rx="6" fill="#60a5fa" />
        <rect x="60" y="40" width="30" height="70" rx="6" fill="#818cf8" />
        <rect x="110" y="30" width="30" height="80" rx="6" fill="#f472b6" />
        <rect x="160" y="50" width="30" height="60" rx="6" fill="#34d399" />
        <rect x="210" y="20" width="30" height="90" rx="6" fill="#fbbf24" />
        <rect x="260" y="35" width="30" height="75" rx="6" fill="#38bdf8" />
      </g>
      <text x="15" y="115" fill="#94a3b8" fontSize="16">Mar</text>
      <text x="65" y="115" fill="#94a3b8" fontSize="16">Apr</text>
      <text x="115" y="115" fill="#94a3b8" fontSize="16">May</text>
      <text x="165" y="115" fill="#94a3b8" fontSize="16">Jun</text>
      <text x="215" y="115" fill="#94a3b8" fontSize="16">Jul</text>
      <text x="265" y="115" fill="#94a3b8" fontSize="16">Aug</text>
    </svg>
  </div>
);

// Dummy line graph component (simple SVG)
const DummyLineGraph = () => (
  <div className="bg-[#232A36] rounded-2xl p-6 shadow flex flex-col items-center mb-8">
    <h3 className="text-white font-semibold mb-4">Platform Activity Trend</h3>
    <svg width="100%" height="120" viewBox="0 0 320 120">
      <polyline
        fill="none"
        stroke="#60a5fa"
        strokeWidth="4"
        points="10,100 60,80 110,90 160,40 210,60 260,30"
      />
      <circle cx="10" cy="100" r="5" fill="#60a5fa" />
      <circle cx="60" cy="80" r="5" fill="#60a5fa" />
      <circle cx="110" cy="90" r="5" fill="#60a5fa" />
      <circle cx="160" cy="40" r="5" fill="#60a5fa" />
      <circle cx="210" cy="60" r="5" fill="#60a5fa" />
      <circle cx="260" cy="30" r="5" fill="#60a5fa" />
      <text x="10" y="115" fill="#94a3b8" fontSize="16">Mar</text>
      <text x="60" y="115" fill="#94a3b8" fontSize="16">Apr</text>
      <text x="110" y="115" fill="#94a3b8" fontSize="16">May</text>
      <text x="160" y="115" fill="#94a3b8" fontSize="16">Jun</text>
      <text x="210" y="115" fill="#94a3b8" fontSize="16">Jul</text>
      <text x="260" y="115" fill="#94a3b8" fontSize="16">Aug</text>
    </svg>
  </div>
);

const stats = [
  { label: "Total Users", value: 1240, icon: <FaUsers className="text-4xl text-blue-400" /> },
  { label: "Active Students", value: 980, icon: <FaUserCheck className="text-4xl text-green-400" /> },
  { label: "Forum Posts", value: 320, icon: <FaComments className="text-4xl text-purple-400" /> },
  { label: "Notes Shared", value: 210, icon: <FaBook className="text-4xl text-yellow-400" /> },
  { label: "Jobs Posted", value: 45, icon: <FaBriefcase className="text-4xl text-pink-400" /> },
  { label: "Events", value: 12, icon: <FaCalendarAlt className="text-4xl text-cyan-400" /> },
];

const AnimatedStat = ({ value, label, icon, delay }) => {
  const [displayValue, setDisplayValue] = React.useState(0);

  React.useEffect(() => {
    let start = 0;
    const duration = 900;
    const increment = Math.ceil(value / 30);
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(current);
      }
    }, duration / 30);
    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="relative group bg-gradient-to-br from-[#232A36] to-[#181a20] rounded-2xl p-6 shadow flex flex-col items-center overflow-hidden hover:scale-105 transition-transform duration-300">
      <div className="absolute -top-6 -right-6 opacity-20 group-hover:opacity-40 transition">{icon}</div>
      <div className="z-10">{icon}</div>
      <span className="text-4xl font-extrabold text-blue-400 mt-2 animate-pulse">{displayValue}</span>
      <span className="text-gray-300 mt-2 font-semibold tracking-wide">{label}</span>
      <div className="absolute inset-0 rounded-2xl pointer-events-none group-hover:ring-2 group-hover:ring-blue-500 transition"></div>
    </div>
  );
};

const Dashboard = () => (
  <div>
    <h1 className="text-2xl font-bold text-white mb-6">Admin Dashboard</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
      {stats.map((stat, idx) => (
        <AnimatedStat key={stat.label} {...stat} delay={idx * 100} />
      ))}
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <DummyBarGraph />
      <DummyLineGraph />
    </div>
    <div className="bg-[#232A36] rounded-2xl p-6 shadow mt-8">
      <h2 className="text-xl font-semibold text-white mb-4">Recent Activities</h2>
      <ul className="text-gray-400 space-y-2">
        <li>• Jisan posted a new note in CSE 3.2</li>
        <li>• Lamia shared a job opportunity</li>
        <li>• Mamin commented on a forum post</li>
        <li>• Nawmi registered for an event</li>
      </ul>
    </div>
  </div>
);

export default Dashboard;