import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaBars, FaBell } from 'react-icons/fa';

const user = {
  name: 'Miznur Rahman Jisan',
  avatar: 'jisan.jpg',
};

const NavbarMain = () => {
  const navigate = useNavigate();
  const [dropdown, setDropdown] = React.useState(false);
  const [notificationOpen, setNotificationOpen] = React.useState(false);
  const [mobileMenu, setMobileMenu] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [showSearchDropdown, setShowSearchDropdown] = React.useState(false);
  const dropdownRef = React.useRef(null);
  const notificationRef = React.useRef(null);
  const mobileMenuRef = React.useRef(null);

  // Example user data for demo (replace with real data or API)
  const users = [
    { id: 1, name: 'Mizanur Rahman Jisan', avatar: '/jisan.jpg', department: 'CSE', semester: '3.2' },
    { id: 2, name: 'Shahid Al Mamin', avatar: '/mamim.jpg', department: 'EEE', semester: '2.1' },
    { id: 3, name: 'Lamia Akter Jesmin', avatar: '/jesmin.jpeg', department: 'BBA', semester: '1.2' },
    { id: 4, name: 'Nashrah Zakir Nawmi', avatar: '/nawmi.jpg', department: 'CSE', semester: '3.1' },
    { id: 5, name: 'Alif Mahmud Talha', avatar: '/alif.jpg', department: 'CSE', semester: '2.2' },
    // ...more users
  ];

  const searchResults =
    searchQuery.trim() === ''
      ? users.slice(0, 5) // Show first 5 users as "history" when input is empty
      : users.filter(u =>
          u.name.toLowerCase().includes(searchQuery.toLowerCase())
        ).slice(0, 5);

  React.useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdown(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setNotificationOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setMobileMenu(false);
      }
    }
    if (dropdown || notificationOpen || mobileMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdown, notificationOpen, mobileMenu]);

  return (
  <nav className="sticky top-0 z-30 bg-[#181820] shadow flex items-center justify-between px-3 sm:px-6 md:px-12 h-16 border-b border-[#232A36] ">
      {/* Left: Logo and Name */}
      <div
        className="flex items-center gap-2 min-w-[120px] mx-4 md:mx-12 cursor-pointer"
        onClick={() => { navigate('/home'); window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }); }}
        aria-label="Go to Home"
      >
        <img src="/logo.png" alt="Cintracon Logo" className="h-9 w-9 object-contain" />
        <span className="font-bold text-lg sm:text-xl md:text-2xl text-white tracking-wide">CINTRACON</span>
      </div>
      {/* Center: Search Bar (hidden on mobile) */}
      <div className="hidden md:flex flex-1 justify-center relative">
  <div className="relative w-full max-w-md">
    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
      <FaSearch />
    </span>
    <input
      type="text"
      placeholder="Search CINTRACON"
      className="w-full pl-10 pr-4 py-2 rounded-full bg-[#1E2939] text-white border-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
      value={searchQuery}
      onChange={e => setSearchQuery(e.target.value)}
      onFocus={() => setShowSearchDropdown(true)}
      onBlur={() => setTimeout(() => setShowSearchDropdown(false), 150)}
    />
    {/* Search Suggestion Dropdown */}
    {showSearchDropdown && (
      <div className="absolute left-0 top-12 w-full bg-[#232A36] rounded-xl shadow-lg border border-[#232A36] z-50 animate-fade-in">
        {searchResults.length > 0 ? (
          <ul>
            {searchResults.map((user, idx) => (
              <li
                key={user.id}
                className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-[#20222B] cursor-pointer transition"
                onMouseDown={() => {
                  navigate(`/profile`);
                  setShowSearchDropdown(false);
                  setSearchQuery('');
                }}
              >
                <div className="flex items-center gap-3">
                  <img src={user.avatar} alt={user.name} className="h-9 w-9 rounded-full object-cover border-2 border-blue-500" />
                  <span className="text-white font-medium">{user.name}</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs text-blue-400">{user.department}</span>
                  <span className="text-xs text-gray-400">{user.semester} Semester</span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="px-4 py-3 text-gray-400 text-sm">No users found.</div>
        )}
      </div>
    )}
  </div>
</div>

      {/* Notification Bell with Dropdown */}
      <div className="relative" ref={notificationRef}>
        <button
          className="relative mr-2 p-2 rounded-full bg-[#232A36] hover:bg-[#3f4855] focus:outline-none"
          onClick={() => setNotificationOpen((open) => !open)}
          aria-label="Show notifications"
        >
          <FaBell className="text-gray-300 text-xl" />
          {/* Notification dot */}
          <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500 border-2 border-[#1E2939]" />
        </button>
        {/* Notification Dropdown */}
        {notificationOpen && (
          <div className="absolute right-0 mt-2 w-96 max-w-xs bg-[#232A36] rounded-xl shadow-lg border border-[#181D27] z-50 animate-fade-in">
            <div className="px-5 py-4 border-b border-[#374151] flex items-center justify-between">
              <span className="text-white font-semibold text-lg">Notifications</span>
              <button className="text-xs text-blue-400 hover:underline" onClick={() => setNotificationOpen(false)}>Mark all as read</button>
            </div>
            <ul className="max-h-80 overflow-y-auto divide-y divide-[#232F3E]">
              {/* Example notifications, replace with real data */}
              <li className="flex items-start gap-3 px-5 py-4 hover:bg-[#20222B] cursor-pointer transition">
                <img src="/mamim.jpg" alt="notif" className="h-10 w-10 rounded-full object-cover" />
                <div className="flex-1">
                  <div className="text-gray-200 text-sm"><span className="font-semibold text-white">Shahid Al Mamin</span> commented on your post.</div>
                  <div className="text-xs text-gray-400 mt-1">2 min ago</div>
                </div>
              </li>
              <li className="flex items-start gap-3 px-5 py-4 hover:bg-[#20222B] cursor-pointer transition">
                <img src="/jesmin.jpeg" alt="notif" className="h-10 w-10 rounded-full object-cover" />
                <div className="flex-1">
                  <div className="text-gray-200 text-sm"><span className="font-semibold text-white">Lamia Akter Jesmin</span> liked your photo.</div>
                  <div className="text-xs text-gray-400 mt-1">10 min ago</div>
                </div>
              </li>
              <li className="flex items-start gap-3 px-5 py-4 hover:bg-[#20222B] cursor-pointer transition">
                <img src="/nawmi.jpg" alt="notif" className="h-10 w-10 rounded-full object-cover" />
                <div className="flex-1">
                  <div className="text-gray-200 text-sm"><span className="font-semibold text-white">Nashrah Zakir Nawmi</span> sent you a friend request.</div>
                  <div className="text-xs text-gray-400 mt-1">1 hour ago</div>
                </div>
              </li>
              <li className="flex items-start gap-3 px-5 py-4 hover:bg-[#20222B] cursor-pointer transition">
                <img src="/alif.jpg" alt="notif" className="h-10 w-10 rounded-full object-cover" />
                <div className="flex-1">
                  <div className="text-gray-200 text-sm"><span className="font-semibold text-white">Alif Mahmud Talha</span> mentioned you in a comment.</div>
                  <div className="text-xs text-gray-400 mt-1">2 hours ago</div>
                </div>
              </li>
            </ul>
            <div className="px-5 py-3 text-center border-t border-[#374151]">
              <button className="text-blue-400 hover:underline text-sm">See all notifications</button>
            </div>
          </div>
        )}
      </div>

      {/* Desktop: Diamond, Name, Avatar, Dropdown */}
      <div className="hidden md:flex items-center gap-6 min-w-[220px] justify-end relative">
        <div className="flex items-center gap-3 bg-[#1E2939] px-3 py-1.5 rounded-full">
          <img src="/diamond.png" alt="Diamond" className="h-6 w-6 object-contain" />
          <span className="text-white font-semibold text-lg">925</span>
          
        </div>
        <div className="flex items-center gap-2 cursor-pointer relative" ref={dropdownRef}>
          <span className="text-white font-medium order-1 md:order-none">{user.name}</span>
          <img
            src={user.avatar}
            alt="User Avatar"
            className="h-10 w-10 rounded-full border-2 border-blue-500 object-cover order-2 md:order-none"
            onClick={() => setDropdown((d) => !d)}
          />
          {/* Dropdown */}
          {dropdown && (
            <div className="absolute right-0 top-14 w-40 bg-[#232A36] rounded-lg shadow-lg py-2 z-50 border border-[#181D27] animate-fade-in">
              <button className="w-full text-left px-4 py-2 text-gray-200 hover:bg-[#181D27]">Settings</button>
              <Link to="/" className="w-full block text-left px-4 py-2 text-gray-200 hover:bg-[#181D27]">Logout</Link>
            </div>
          )}
        </div>
      </div>
      {/* Mobile: Hamburger */}
      <div className="md:hidden flex items-center">
        <button onClick={() => setMobileMenu((m) => !m)} className="text-gray-200 text-2xl p-2 focus:outline-none">
          <FaBars />
        </button>
        {/* Mobile Dropdown */}
        {mobileMenu && (
          <div ref={mobileMenuRef} className="absolute right-3 top-16 w-56 bg-[#232A36] rounded-lg shadow-lg py-3 z-50 border border-[#181D27] animate-fade-in flex flex-col gap-2">
            <div className="flex items-center gap-3 px-4 py-2 bg-[#181D27] rounded-full">
              <img src="/diamond.png" alt="Diamond" className="h-6 w-6 object-contain" />
              <span className="text-white font-semibold text-lg">925</span>
              <button className="relative ml-2 p-1 rounded-full hover:bg-[#232A36] focus:outline-none">
                <FaBell className="text-gray-300 text-xl" />
                <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500 border-2 border-[#181D27]" />
              </button>
            </div>
            <div className="flex items-center gap-2 px-4 py-2">
              <span className="text-white font-medium">{user.name}</span>
              <img
                src={user.avatar}
                alt="User Avatar"
                className="h-10 w-10 rounded-full border-2 border-blue-500 object-cover"
              />
            </div>
            <button className="w-full text-left px-4 py-2 text-gray-200 hover:bg-[#181D27]">Settings</button>
            <Link to="/" className="w-full block text-left px-4 py-2 text-gray-200 hover:bg-[#181D27]">Logout</Link>
            <div className="px-4 pt-2">
              <div className="relative w-full">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><FaSearch /></span>
                <input
                  type="text"
                  placeholder="Search CINTRACON"
                  className="w-full pl-10 pr-4 py-2 rounded-full bg-[#181D27] text-white border-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavbarMain;