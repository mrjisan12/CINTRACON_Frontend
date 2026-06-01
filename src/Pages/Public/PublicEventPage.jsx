import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaShare, FaCopy, FaWhatsapp, FaFacebook, FaCheck } from 'react-icons/fa';
import { getPublicEvent, getShareUrl } from '../../api/publicApi';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';

const PublicEventPage = () => {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const [shareOpen, setShareOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const res = await getPublicEvent(eventId);
                if (res.data.success) setEvent(res.data.data);
                else setNotFound(true);
            } catch (err) {
                if (err.response?.status === 404) setNotFound(true);
                else setNotFound(true);
            } finally {
                setLoading(false);
            }
        };
        fetchEvent();
    }, [eventId]);

    const shareUrl = getShareUrl('event', eventId);

    const handleCopy = () => {
        navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        toast.success('Link copied!');
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    const formatTime = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    };

    if (loading) return (
        <div className="min-h-screen bg-[#181820] flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500" />
        </div>
    );

    if (notFound) return (
        <div className="min-h-screen bg-[#181820] flex flex-col items-center justify-center gap-4">
            <div className="text-6xl">🎉</div>
            <h2 className="text-white text-2xl font-bold">Event not found</h2>
            <p className="text-gray-400">This event may have been removed or doesn't exist.</p>
            <button onClick={() => navigate('/upcoming-events')} className="mt-2 px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition">
                Browse Events
            </button>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#181820]">
            {/* Mini Navbar */}
            <nav className="sticky top-0 z-30 bg-[#181820] border-b border-[#232A36] h-14 flex items-center px-4 sm:px-8 gap-4">
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/home')}>
                    <img src="/logo.png" alt="logo" className="h-8 w-8 object-contain" />
                    <span className="font-bold text-lg text-white">CINTRACON</span>
                </div>
                <div className="ml-auto flex items-center gap-3">
                    {isAuthenticated ? (
                        <button onClick={() => navigate('/upcoming-events')} className="px-4 py-1.5 bg-[#232A36] text-gray-200 rounded-lg text-sm hover:bg-[#2d3748] transition">Events</button>
                    ) : (
                        <>
                            <button onClick={() => navigate('/login')} className="px-4 py-1.5 bg-[#232A36] text-gray-200 rounded-lg text-sm hover:bg-[#2d3748] transition">Login</button>
                            <button onClick={() => navigate('/signup')} className="px-4 py-1.5 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition">Sign Up</button>
                        </>
                    )}
                </div>
            </nav>

            <div className="max-w-2xl mx-auto px-4 py-8">
                <div className="bg-[#20222B] rounded-2xl border border-[#2d3748] overflow-hidden">
                    {/* Event Image */}
                    {event.event_image && (
                        <img src={event.event_image} alt="event" className="w-full h-52 object-cover" onError={e => { e.target.style.display = 'none'; }} />
                    )}

                    <div className="p-6 flex flex-col gap-5">
                        {/* Header */}
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="px-2.5 py-0.5 rounded-full bg-green-500/15 text-green-400 text-xs font-medium">
                                    {event.event_type}
                                </span>
                            </div>
                            <h1 className="text-white font-bold text-xl leading-tight">{event.title}</h1>
                            <div className="text-green-400 font-medium mt-0.5">{event.event_organizer}</div>
                        </div>

                        {/* Details */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {event.date && (
                                <div className="flex items-center gap-2 text-gray-300 text-sm">
                                    <FaCalendarAlt className="text-green-400 flex-shrink-0" />
                                    {formatDate(event.date)}
                                </div>
                            )}
                            {event.date && (
                                <div className="flex items-center gap-2 text-gray-300 text-sm">
                                    <FaClock className="text-blue-400 flex-shrink-0" />
                                    {formatTime(event.date)}
                                </div>
                            )}
                            {event.location && (
                                <div className="flex items-center gap-2 text-gray-300 text-sm">
                                    <FaMapMarkerAlt className="text-red-400 flex-shrink-0" />
                                    {event.location}
                                </div>
                            )}
                        </div>

                        {/* Description */}
                        {event.description && (
                            <div className="py-4 border-y border-[#2d3748]">
                                <h3 className="text-white font-semibold mb-2">About this Event</h3>
                                <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">{event.description}</p>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex items-center gap-3 flex-wrap">
                            <div className="relative">
                                <button
                                    onClick={() => setShareOpen(o => !o)}
                                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#232A36] text-gray-300 hover:bg-[#2d3748] transition text-sm font-medium"
                                >
                                    <FaShare /> Share
                                </button>
                                {shareOpen && (
                                    <div className="absolute left-0 top-11 bg-[#232A36] border border-[#2d3748] rounded-xl shadow-lg p-3 z-20 flex flex-col gap-2 min-w-[200px]">
                                        <button onClick={handleCopy} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#2d3748] text-gray-200 text-sm transition">
                                            {copied ? <FaCheck className="text-green-400" /> : <FaCopy className="text-gray-400" />}
                                            {copied ? 'Copied!' : 'Copy link'}
                                        </button>
                                        <a href={`https://wa.me/?text=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#2d3748] text-green-400 text-sm transition">
                                            <FaWhatsapp /> WhatsApp
                                        </a>
                                        <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#2d3748] text-blue-400 text-sm transition">
                                            <FaFacebook /> Facebook
                                        </a>
                                    </div>
                                )}
                            </div>

                            {isAuthenticated && (
                                <button onClick={() => navigate('/upcoming-events')} className="px-4 py-2.5 rounded-xl bg-green-600 text-white hover:bg-green-700 transition text-sm font-medium">
                                    View All Events
                                </button>
                            )}
                        </div>

                        {!isAuthenticated && (
                            <div className="bg-[#181820] rounded-xl px-4 py-3 text-center border border-[#2d3748]">
                                <p className="text-gray-400 text-sm">
                                    <button onClick={() => navigate('/login')} className="text-green-400 hover:underline">Login</button>
                                    {' '}to see all upcoming events on CINTRACON
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PublicEventPage;
