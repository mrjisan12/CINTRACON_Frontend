import React from 'react';
import { FaHome, FaUsers, FaBook, FaBriefcase, FaComments, FaCalendarAlt, FaBullhorn, FaProjectDiagram } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';

const menu = [
  { icon: <FaHome />, label: 'Home', to: '/home' },
  { icon: <FaUsers />, label: 'All Students', to: '/all-students' },
  { icon: <FaBook />, label: 'Note Sharing', to: '/note-sharing' },
  { icon: <FaBriefcase />, label: 'Job Opportunities', to: '/jobs' },
  { icon: <FaCalendarAlt />, label: 'Forum', to: '/forum' },
  { icon: <FaComments />, label: 'Upcoming Event', to: '/upcoming-events' },
  { icon: <FaBullhorn />, label: 'Announcement', to: '/announcement' },
  { icon: <FaProjectDiagram />, label: 'CINTRACON AI', to: '/cintracon-ai' },
];

const devs = [
  {
    name: 'Miznur Rahman Jisan',
    avatar: 'jisan.jpg',
  },
  {
    name: 'Shahid Al Mamin',
    avatar: 'mamim.jpg',
  },
  {
    name: 'Lamia Akter Jesmin',
    avatar: 'jesmin.jpeg',
  },
];

const LeftSideBar = () => {
  const navigate = useNavigate();
  const handleNav = (to) => {
    navigate(to);
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };
  return (
    <aside className="bg-[#20222B] rounded-2xl mb-6 shadow p-4 flex flex-col gap-8 sticky top-20 min-h-[600px] w-full max-w-[250px] mx-auto">
      {/* User Info */}
      <div
        className="flex items-center gap-3 mb-2 bg-[#23242C] rounded-xl px-2 py-2 cursor-pointer"
        onClick={() => handleNav('/profile')}
        tabIndex={0}
        role="button"
        aria-label="Go to profile"
      >
        <img src="jisan.jpg" alt="avatar" className="h-10 w-10 rounded-full object-cover" />
        <div>
          <div className="text-white font-medium leading-tight text-base">Mizanur Rahman Jisan</div>
          <div className="text-xs text-gray-300">2.5K Follower</div>
        </div>
      </div>
      {/* Menu */}
      <nav className="flex flex-col gap-2">
        {menu.map((item, idx) => (
          <NavLink
            key={idx}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-2 py-2 rounded-lg transition text-base font-semibold ${isActive ? 'bg-[#232A36] text-white' : 'text-gray-100 hover:bg-[#232A36]'} `
            }
            onClick={() => handleNav(item.to)}
          >
            <span className="text-2xl">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      {/* Developers */}
      <div className="mt-2 bg-[#23242C] rounded-xl px-2 py-3">
        <div className="text-gray-200 text-sm mb-2 font-semibold">Developers of CINTRACON</div>
        <ul className="flex flex-col gap-2">
          {devs.map((dev, idx) => (
            <li
              key={idx}
              className="flex items-center gap-2 cursor-pointer hover:underline"
              onClick={() => handleNav('/profile')}
              tabIndex={0}
              role="button"
              aria-label={`Go to ${dev.name}'s profile`}
            >
              <img src={dev.avatar} alt={dev.name} className="h-7 w-7 rounded-full object-cover" />
              <span className="text-gray-100 text-sm">{dev.name}</span>
            </li>
          ))}
        </ul>
      </div>
      
    </aside>
  );
};

export default LeftSideBar;