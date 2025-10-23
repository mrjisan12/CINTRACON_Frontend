import React, {useState, useEffect} from 'react';
import { FaHome, FaUsers, FaBook, FaBriefcase, FaComments, FaCalendarAlt, FaBullhorn, FaProjectDiagram } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';
import { getProfileInfo } from '../api/authApi';
import { getDevelopers } from '../api/homeApi'; // আপনার API file import করুন

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

const LeftSideBar = () => {
  const navigate = useNavigate();
  const [profileInfo, setProfileInfo] = useState(null);
  const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleNav = (to) => {
    navigate(to);
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  // Fetch Profile Info
  useEffect(() => {
    const fetchProfileInfo = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (token) {
          const response = await getProfileInfo(token);
          const { success, data } = response.data;
          if (success) {
            setProfileInfo(data);
          }
        }
      } catch (error) {
        console.error("Failed to fetch profile info:", error);
      }
    };

    fetchProfileInfo();
  }, []);

  // Fetch Developers List
  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (token) {
          const response = await getDevelopers(token);
          const { success, data } = response.data;
          if (success) {
            setDevelopers(data);
          }
        }
      } catch (error) {
        console.error("Failed to fetch developers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDevelopers();
  }, []);

  // Handle developer click - navigate to their profile
  const handleDeveloperClick = (developerId) => {
    navigate(`/user-profile/${developerId}`);
  };

  return (
    <aside
      className="bg-[#20222B] rounded-2xl mb-6 shadow p-4 flex flex-col gap-8 sticky top-20 min-h-[500px] w-full max-w-[260px] mx-auto overflow-y-auto hide-scrollbar"
      style={{ maxHeight: 'calc(100vh - 100px)' }}
    >
      {/* User Info */}
      <div
        className="flex items-center gap-3 mb-2 bg-[#23242C] rounded-xl px-2 py-2 cursor-pointer"
        onClick={() => handleNav('/profile')}
        tabIndex={0}
        role="button"
        aria-label="Go to profile"
      >
        <img 
          src={profileInfo?.profile_photo || '/default-avatar.png'} 
          alt="avatar" 
          className="h-10 w-10 rounded-full object-cover" 
        />
        <div>
          <div className="text-white font-medium leading-tight text-base">{profileInfo?.full_name || 'User'}</div>
          <div className="text-xs text-gray-300">{profileInfo?.role == 'student' ? 'Student' : 'Admin'}</div>
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

      {/* Developers Section */}
      <div className="mt-2 bg-[#23242C] rounded-xl px-2 py-2 mb-10">
        <div className="text-gray-200 text-sm mb-3 font-semibold flex items-center gap-2">
          <FaUsers className="text-blue-400" />
          Developers of CINTRACON
        </div>
        
        {loading ? (
          <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
          </div>
        ) : developers.length > 0 ? (
          <ul className="flex flex-col gap-1">
            {developers.map((developer, idx) => (
              <li
                key={developer.id}
                className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-[#2A2D38] transition-colors"
                onClick={() => handleDeveloperClick(developer.id)}
                tabIndex={0}
                role="button"
                aria-label={`View ${developer.full_name}'s profile`}
              >
                <img 
                  src={developer.profile_photo || '/default-avatar.png'} 
                  alt={developer.full_name} 
                  className="h-8 w-8 rounded-full object-cover border border-gray-600" 
                />
                <div className="flex-1 min-w-0">
                  <span className="text-gray-100 text-sm font-medium block truncate">
                    {developer.full_name}
                  </span>
                  <span className="text-gray-400 text-xs capitalize">
                    {developer.department} • {developer.semester} Semester
                  </span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-gray-400 text-sm text-center py-4">
            No developers found
          </div>
        )}
      </div>
    </aside>
  );
};

export default LeftSideBar;