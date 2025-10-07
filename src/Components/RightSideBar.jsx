import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRightSidebarInfo } from "../api/homeApi";

const RightSideBar = () => {
  const [topMembers, setTopMembers] = useState([]);

  useEffect(() => {
    const fetchTopMembers = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await getRightSidebarInfo(token);
        if (res.data.success) {
          const users = res.data.data.top_users.map((user) => ({
            name: user.full_name,
            dept: user.department.toUpperCase(),
            semester: user.semester,
            score: user.total_points,
            avatar: user.profile_photo,
          }));
          setTopMembers(users);
        }
      } catch (err) {
        console.error("Failed to fetch top users:", err);
      }
    };

    fetchTopMembers();
  }, []);

  return (
    <aside
      className="bg-[#20222B] rounded-2xl shadow-lg p-4 mb-6 flex flex-col gap-8 sticky top-20
      min-h-[500px] w-full max-w-[340px] mx-auto overflow-y-auto scrollbar-thin scrollbar-thumb-[#3DDC97]/40 scrollbar-track-transparent hide-scrollbar"
      style={{ maxHeight: "calc(100vh - 100px)" }}
    >
      {/* Active Stat */}
      <div className="bg-[#23242C] rounded-xl px-4 py-4 mb-2 flex flex-col items-center">
        <div className="flex items-center w-full mb-1">
          <span className="block h-3 w-3 rounded-full bg-green-400 mr-2"></span>
          <span className="text-white text-base font-medium">Active</span>
        </div>
        <svg
          width="180"
          height="48"
          viewBox="0 0 180 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 40 Q 20 10 40 30 T 80 25 T 120 40 T 160 20 T 180 40 V48 H0Z"
            fill="#3DDC97"
            fillOpacity="0.7"
          />
        </svg>
        <span className="text-white text-6xl font-bold -mt-4">120</span>
      </div>

      {/* Top Active Members */}
      <div>
        <div className="text-gray-200 font-semibold text-base mb-0">
          Top Active Members
        </div>
        <div className="text-xs text-gray-400 mb-3">Last - 7 Days</div>
        <ul className="flex flex-col gap-3 mb-10">
          {topMembers.map((m, idx) => (
            <li
              key={idx}
              className="flex items-center justify-between text-gray-100 text-sm bg-[#23242C] rounded-xl px-3 py-2 hover:bg-[#2a2c36] transition-all duration-300"
            >
              {/* Avatar + Name + Dept */}
              <Link
                to="/profile"
                className="flex items-center gap-3 flex-1 hover:text-sky-400 transition-colors min-w-0"
              >
                <img
                  src={m.avatar}
                  alt={m.name}
                  className="h-9 w-9 rounded-full object-cover ring-2 ring-transparent hover:ring-sky-400 transition-all duration-300"
                />
                <div className="flex flex-col leading-tight min-w-0">
                  <span className="font-medium truncate">{m.name}</span>
                  <span className="text-xs text-gray-400">
                    {m.dept} • {m.semester}
                  </span>
                </div>
              </Link>

              {/* Neon score box */}
              <div className="relative group flex-shrink-0 ml-2 ">
                <div className="absolute -inset-[1px] bg-gradient-to-r from-orange-400 via-orange-300 to-orange-500 rounded-lg blur-sm opacity-70 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative z-10 bg-[#1b1c23] rounded-lg px-2 py-1 flex items-center gap-1 shadow-lg">
                  <img
                    src="/diamond.png"
                    alt="Diamond"
                    className="h-4 w-4 object-contain"
                  />
                  <span className="font-bold text-orange-300 text-sm whitespace-nowrap">
                    {m.score}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default RightSideBar;
