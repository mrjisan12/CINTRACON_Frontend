import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaBars, FaBell, FaHeart, FaComment, FaUserPlus, FaBullhorn, FaCog, FaTrash } from 'react-icons/fa';
import { logout } from '../api/authApi';
import { getNavbarInfo, globalSearch } from '../api/homeApi';
import { toast } from 'react-toastify';
import { useNotifications } from '../contexts/NotificationContext';
import { useAuth } from '../contexts/AuthContext';

const NOTIF_ICONS = {
    like: <FaHeart className="text-red-400" />,
    love: <FaHeart className="text-red-400" />,
    comment: <FaComment className="text-blue-400" />,
    follow: <FaUserPlus className="text-green-400" />,
    announcement: <FaBullhorn className="text-yellow-400" />,
    system: <FaCog className="text-gray-400" />,
};

const NavbarMain = () => {
    const navigate = useNavigate();
    const { logout: authLogout, isAdmin } = useAuth();
    const { notifications, unreadCount, markRead, removeNotification } = useNotifications();

    const [dropdown, setDropdown] = useState(false);
    const [notificationOpen, setNotificationOpen] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showSearchDropdown, setShowSearchDropdown] = useState(false);
    const [searchResults, setSearchResults] = useState(null);
    const [isSearching, setIsSearching] = useState(false);
    const [navbarInfo, setNavbarInfo] = useState(null);

    const dropdownRef = useRef(null);
    const notificationRef = useRef(null);
    const mobileMenuRef = useRef(null);
    const searchTimeoutRef = useRef(null);

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);

        if (query.length > 1) {
            setIsSearching(true);
            searchTimeoutRef.current = setTimeout(() => performSearch(query), 300);
        } else {
            setSearchResults(null);
            setIsSearching(false);
        }
    };

    const performSearch = async (query) => {
        try {
            const res = await globalSearch(query, 'all');
            if (res.data.success) setSearchResults(res.data.data);
            else setSearchResults(null);
        } catch {
            setSearchResults(null);
        } finally {
            setIsSearching(false);
        }
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setDropdown(false);
            if (notificationRef.current && !notificationRef.current.contains(event.target)) setNotificationOpen(false);
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) setMobileMenu(false);
            if (showSearchDropdown && !event.target.closest('.search-container')) setShowSearchDropdown(false);
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showSearchDropdown]);

    useEffect(() => () => { if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current); }, []);

    useEffect(() => {
        const fetchNavbarInfo = async () => {
            try {
                const res = await getNavbarInfo();
                if (res.data.success) setNavbarInfo(res.data.data);
            } catch { /* silent */ }
        };
        fetchNavbarInfo();
    }, []);

    const handleNotificationOpen = () => {
        setNotificationOpen(o => !o);
        if (!notificationOpen && unreadCount > 0) {
            markRead(null); // mark all as read when opening
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
        } catch { /* ignore */ } finally {
            authLogout();
            toast.success("Logged out successfully");
            navigate("/");
        }
    };

    const formatNotifTime = (dateStr) => {
        if (!dateStr) return '';
        const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000);
        if (diff < 60) return `${diff}s ago`;
        if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
        if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
        return `${Math.floor(diff / 86400)}d ago`;
    };

    const totalSearchResults = searchResults
        ? Object.values(searchResults).flat().length
        : 0;

    return (
        <nav className="sticky top-0 z-30 bg-[#181820] shadow flex items-center justify-between px-3 sm:px-6 md:px-12 h-16 border-b border-[#232A36]">
            {/* Logo */}
            <div
                className="flex items-center gap-2 min-w-[120px] mx-4 md:mx-12 cursor-pointer"
                onClick={() => { navigate('/home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            >
                <img src="/logo.png" alt="Cintracon Logo" className="h-9 w-9 object-contain" />
                <span className="font-bold text-lg sm:text-xl md:text-2xl text-white tracking-wide">CINTRACON</span>
            </div>

            {/* Center: Global Search */}
            <div className="hidden md:flex flex-1 justify-center relative">
                <div className="search-container relative w-full max-w-md">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                        <FaSearch />
                    </span>
                    <input
                        type="text"
                        placeholder="Search users, posts, notes, jobs..."
                        className="w-full pl-10 pr-4 py-2 rounded-full bg-[#1E2939] text-white border-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        onFocus={() => setShowSearchDropdown(true)}
                        onBlur={() => setTimeout(() => setShowSearchDropdown(false), 150)}
                    />
                    {showSearchDropdown && searchQuery.length > 1 && (
                        <div className="absolute left-0 top-12 w-full bg-[#232A36] rounded-xl shadow-lg border border-[#2d3748] z-50 max-h-96 overflow-y-auto">
                            {isSearching ? (
                                <div className="flex items-center justify-center px-4 py-4 gap-2 text-gray-400 text-sm">
                                    <div className="animate-spin h-4 w-4 border-2 border-blue-400 border-t-transparent rounded-full" />
                                    Searching...
                                </div>
                            ) : !searchResults || totalSearchResults === 0 ? (
                                <div className="px-4 py-3 text-gray-400 text-sm">No results found.</div>
                            ) : (
                                <>
                                    {searchResults.users?.length > 0 && (
                                        <div>
                                            <div className="px-4 pt-3 pb-1 text-xs font-semibold text-gray-500 uppercase tracking-wider">Users</div>
                                            {searchResults.users.map(u => (
                                                <div
                                                    key={u.id}
                                                    className="flex items-center gap-3 px-4 py-2 hover:bg-[#20222B] cursor-pointer"
                                                    onMouseDown={() => { navigate(`/user-profile/${u.id}`); setShowSearchDropdown(false); setSearchQuery(''); }}
                                                >
                                                    <img src={u.profile_photo || '/default-avatar.png'} alt={u.name} className="h-8 w-8 rounded-full object-cover border border-blue-500" />
                                                    <div>
                                                        <div className="text-white text-sm font-medium">{u.name}</div>
                                                        <div className="text-xs text-gray-400 flex flex-wrap gap-x-1.5 items-center">
                                                            <span>{u.department?.toUpperCase()}</span>
                                                            {(u.semester || u.batch_no || u.batch) && <span className="text-gray-600">·</span>}
                                                            {u.semester && <span>Sem {u.semester}</span>}
                                                            {(u.semester && (u.batch_no || u.batch)) && <span className="text-gray-600">·</span>}
                                                            {(u.batch_no || u.batch) && <span>Batch {u.batch_no || u.batch}</span>}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    {searchResults.posts?.length > 0 && (
                                        <div>
                                            <div className="px-4 pt-3 pb-1 text-xs font-semibold text-gray-500 uppercase tracking-wider">Posts</div>
                                            {searchResults.posts.map(p => (
                                                <div key={p.id} className="px-4 py-2 hover:bg-[#20222B] cursor-pointer"
                                                    onMouseDown={() => { navigate(`/post/${p.id}`); setShowSearchDropdown(false); setSearchQuery(''); }}>
                                                    <div className="text-white text-sm truncate">{p.content}</div>
                                                    <div className="text-xs text-gray-400">{p.author}</div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    {searchResults.notes?.length > 0 && (
                                        <div>
                                            <div className="px-4 pt-3 pb-1 text-xs font-semibold text-gray-500 uppercase tracking-wider">Notes</div>
                                            {searchResults.notes.map(n => (
                                                <div key={n.id} className="px-4 py-2 hover:bg-[#20222B] cursor-pointer"
                                                    onMouseDown={() => { navigate(`/note/${n.id}`); setShowSearchDropdown(false); setSearchQuery(''); }}>
                                                    <div className="text-white text-sm font-medium">{n.title}</div>
                                                    <div className="text-xs text-gray-400">{n.department?.toUpperCase()}</div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    {searchResults.jobs?.length > 0 && (
                                        <div>
                                            <div className="px-4 pt-3 pb-1 text-xs font-semibold text-gray-500 uppercase tracking-wider">Jobs</div>
                                            {searchResults.jobs.map(j => (
                                                <div key={j.id} className="px-4 py-2 hover:bg-[#20222B] cursor-pointer"
                                                    onMouseDown={() => { navigate(`/job/${j.id}`); setShowSearchDropdown(false); setSearchQuery(''); }}>
                                                    <div className="text-white text-sm font-medium">{j.title}</div>
                                                    <div className="text-xs text-gray-400">{j.company_name}</div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Notification Bell */}
            <div className="relative" ref={notificationRef}>
                <button
                    className="relative mr-2 p-2 rounded-full bg-[#232A36] hover:bg-[#3f4855] focus:outline-none"
                    onClick={handleNotificationOpen}
                    aria-label="Notifications"
                >
                    <FaBell className="text-gray-300 text-xl" />
                    {unreadCount > 0 && (
                        <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center text-[10px] font-bold bg-red-500 text-white rounded-full border-2 border-[#181820] px-1">
                            {unreadCount > 99 ? '99+' : unreadCount}
                        </span>
                    )}
                </button>

                {notificationOpen && (
                    <div className="absolute right-0 mt-2 w-96 max-w-xs bg-[#232A36] rounded-xl shadow-lg border border-[#181D27] z-50 animate-fade-in">
                        <div className="px-5 py-4 border-b border-[#374151] flex items-center justify-between">
                            <span className="text-white font-semibold text-lg">Notifications</span>
                            {unreadCount > 0 && (
                                <button className="text-xs text-blue-400 hover:underline" onClick={() => markRead(null)}>
                                    Mark all as read
                                </button>
                            )}
                        </div>
                        <ul className="max-h-80 overflow-y-auto divide-y divide-[#232F3E] hide-scrollbar">
                            {notifications.length === 0 ? (
                                <li className="px-5 py-6 text-center text-gray-400 text-sm">No notifications yet</li>
                            ) : (
                                notifications.slice(0, 15).map(n => (
                                    <li
                                        key={n.id}
                                        className={`flex items-start gap-3 px-4 py-3 transition cursor-pointer ${!n.is_read ? 'bg-blue-500/5 hover:bg-blue-500/10' : 'hover:bg-[#20222B]'}`}
                                        onClick={() => {
                                            if (!n.is_read) markRead([n.id]);
                                            if (n.link) {
                                                const raw = n.link.replace(/\/$/, ''); // strip trailing slash
                                                let fixed = raw;
                                                if (/^\/profile\/\d+$/.test(raw))        fixed = raw.replace('/profile/', '/user-profile/');
                                                else if (/^\/home\/post\/\d+$/.test(raw)) fixed = raw.replace('/home/post/', '/post/');
                                                else if (/^\/home\/note\/\d+$/.test(raw)) fixed = raw.replace('/home/note/', '/note/');
                                                else if (/^\/home\/job\/\d+$/.test(raw))  fixed = raw.replace('/home/job/', '/job/');
                                                navigate(fixed);
                                            }
                                        }}
                                    >
                                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#181D27] flex items-center justify-center overflow-hidden border border-[#2d3748]">
                                            {n.sender_photo
                                                ? <img src={n.sender_photo} alt={n.sender_name} className="h-full w-full object-cover" />
                                                : <span className="text-lg">{NOTIF_ICONS[n.type] || NOTIF_ICONS.system}</span>
                                            }
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-gray-200 text-sm leading-snug">{n.message}</div>
                                            <div className="text-xs text-gray-500 mt-0.5">{formatNotifTime(n.created_at)}</div>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            {!n.is_read && <span className="w-2 h-2 rounded-full bg-blue-400 flex-shrink-0" />}
                                            <button
                                                className="text-gray-500 hover:text-red-400 transition p-1"
                                                onClick={e => { e.stopPropagation(); removeNotification(n.id); }}
                                            >
                                                <FaTrash className="text-xs" />
                                            </button>
                                        </div>
                                    </li>
                                ))
                            )}
                        </ul>
                        <div className="px-5 py-3 text-center border-t border-[#374151]">
                            <button className="text-blue-400 hover:underline text-sm" onClick={() => setNotificationOpen(false)}>
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Desktop: Points, Name, Avatar, Dropdown */}
            <div className="hidden md:flex items-center gap-6 min-w-[220px] justify-end relative">
                <div className="flex items-center gap-3 bg-[#1E2939] px-3 py-1.5 rounded-full">
                    <img src="/diamond.png" alt="Diamond" className="h-6 w-6 object-contain" />
                    <span className="text-white font-semibold text-lg">{navbarInfo?.points ?? 0}</span>
                </div>
                <div className="flex items-center gap-2 cursor-pointer relative" ref={dropdownRef}>
                    <span className="text-white font-medium">{navbarInfo?.full_name ?? 'N/A'}</span>
                    <img
                        src={navbarInfo?.profile_photo || '/default-avatar.png'}
                        alt="Avatar"
                        className="h-10 w-10 rounded-full border-2 border-blue-500 object-cover"
                        onClick={() => setDropdown(d => !d)}
                    />
                    {dropdown && (
                        <div className="absolute right-0 top-14 w-48 bg-[#232A36] rounded-lg shadow-lg py-2 z-50 border border-[#181D27] animate-fade-in">
                            <Link to="/profile" className="block px-4 py-2 text-gray-200 hover:bg-[#181D27]" onClick={() => setDropdown(false)}>My Profile</Link>
                            {isAdmin && (
                                <Link to="/admin/dashboard" className="block px-4 py-2 text-blue-400 hover:bg-[#181D27] font-medium" onClick={() => setDropdown(false)}>Admin Dashboard</Link>
                            )}
                            <Link to="/my-bookmarks" className="block px-4 py-2 text-gray-200 hover:bg-[#181D27]" onClick={() => setDropdown(false)}>Saved Posts</Link>
                            <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-gray-200 hover:bg-[#181D27]">Logout</button>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile: Hamburger */}
            <div className="md:hidden flex items-center">
                <button onClick={() => setMobileMenu(m => !m)} className="text-gray-200 text-2xl p-2 focus:outline-none">
                    <FaBars />
                </button>
                {mobileMenu && (
                    <div ref={mobileMenuRef} className="absolute right-3 top-16 w-60 bg-[#232A36] rounded-lg shadow-lg py-3 z-50 border border-[#181D27] animate-fade-in flex flex-col gap-2">
                        <div className="flex items-center gap-2 px-4 py-2">
                            <img src="/diamond.png" alt="Diamond" className="h-5 w-5 object-contain" />
                            <span className="text-white font-semibold">{navbarInfo?.points ?? 0} points</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2">
                            <img src={navbarInfo?.profile_photo || '/default-avatar.png'} alt="Avatar" className="h-8 w-8 rounded-full border-2 border-blue-500 object-cover" />
                            <span className="text-white font-medium text-sm">{navbarInfo?.full_name ?? 'N/A'}</span>
                        </div>
                        <hr className="border-[#2d3748] mx-2" />
                        <Link to="/profile" className="block px-4 py-2 text-gray-200 hover:bg-[#181D27]" onClick={() => setMobileMenu(false)}>My Profile</Link>
                        {isAdmin && (
                            <Link to="/admin/dashboard" className="block px-4 py-2 text-blue-400 hover:bg-[#181D27] font-medium" onClick={() => setMobileMenu(false)}>Admin Dashboard</Link>
                        )}
                        <Link to="/my-bookmarks" className="block px-4 py-2 text-gray-200 hover:bg-[#181D27]" onClick={() => setMobileMenu(false)}>Saved Posts</Link>
                        <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-gray-200 hover:bg-[#181D27]">Logout</button>
                        <div className="px-4 pb-2">
                            <div className="relative w-full search-container">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><FaSearch /></span>
                                <input
                                    type="text"
                                    placeholder="Search CINTRACON"
                                    className="w-full pl-10 pr-4 py-2 rounded-full bg-[#181D27] text-white border-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400 text-sm"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
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
