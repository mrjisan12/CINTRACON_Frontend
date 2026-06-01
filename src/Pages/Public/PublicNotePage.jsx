import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    FaShare, FaCopy, FaWhatsapp, FaFacebook, FaCheck,
    FaFileAlt, FaExternalLinkAlt, FaEye, FaCalendarAlt, FaUser
} from 'react-icons/fa';
import { getPublicNote, getShareUrl } from '../../api/publicApi';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';

const semesterColors = {
    '1.1': '#8B5CF6', '1.2': '#06B6D4',
    '2.1': '#10B981', '2.2': '#F59E0B',
    '3.1': '#EF4444', '3.2': '#EC4899',
    '4.1': '#8B5CF6', '4.2': '#06B6D4',
};

const PublicNotePage = () => {
    const { noteId } = useParams();
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const [shareOpen, setShareOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    const shareRef = useRef();

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const res = await getPublicNote(noteId);
                if (res.data.success) setNote(res.data.data);
                else setNotFound(true);
            } catch {
                setNotFound(true);
            } finally {
                setLoading(false);
            }
        };
        fetchNote();
    }, [noteId]);

    useEffect(() => {
        if (!shareOpen) return;
        const handler = (e) => {
            if (shareRef.current && !shareRef.current.contains(e.target)) setShareOpen(false);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [shareOpen]);

    const shareUrl = getShareUrl('note', noteId);

    const handleCopy = () => {
        navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        toast.success('Link copied!');
    };

    const handleOpen = () => {
        if (!isAuthenticated) { toast.info('Login to open this note'); return; }
        const url = note?.drive_link || note?.note_file || note?.file;
        if (url) window.open(url, '_blank');
        else toast.error('No file available');
    };

    const uploader = note?.user || note?.uploader;
    const uploadDate = note?.uploaded_at || note?.created_at;
    const accentColor = semesterColors[note?.semester] || '#8B5CF6';

    if (loading) return (
        <div className="min-h-screen bg-[#0f1117] flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500" />
                <p className="text-gray-500 text-sm">Loading note...</p>
            </div>
        </div>
    );

    if (notFound) return (
        <div className="min-h-screen bg-[#0f1117] flex flex-col items-center justify-center gap-4">
            <div className="h-20 w-20 rounded-2xl bg-purple-500/10 flex items-center justify-center">
                <FaFileAlt className="text-purple-400 text-4xl" />
            </div>
            <h2 className="text-white text-2xl font-bold">Note not found</h2>
            <p className="text-gray-400">This note may have been removed or doesn't exist.</p>
            <button onClick={() => navigate('/note-sharing')}
                className="mt-2 px-6 py-2.5 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition font-medium">
                Browse Notes
            </button>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#0f1117]">
            {/* Navbar */}
            <nav className="sticky top-0 z-30 bg-[#0f1117]/80 backdrop-blur-md border-b border-white/5 h-14 flex items-center px-4 sm:px-8 gap-4">
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
                    <img src="/logo.png" alt="logo" className="h-8 w-8 object-contain" />
                    <span className="font-bold text-lg text-white">CINTRACON</span>
                </div>
                <div className="ml-auto flex items-center gap-3">
                    {isAuthenticated ? (
                        <button onClick={() => navigate('/note-sharing')}
                            className="px-4 py-1.5 bg-white/5 text-gray-200 rounded-lg text-sm hover:bg-white/10 transition border border-white/10">
                            Notes
                        </button>
                    ) : (
                        <>
                            <button onClick={() => navigate('/login')}
                                className="px-4 py-1.5 bg-white/5 text-gray-200 rounded-lg text-sm hover:bg-white/10 transition border border-white/10">Login</button>
                            <button onClick={() => navigate('/signup')}
                                className="px-4 py-1.5 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700 transition">Sign Up</button>
                        </>
                    )}
                </div>
            </nav>

            <div className="max-w-xl mx-auto px-4 py-10">
                <div className="relative bg-[#181820] rounded-2xl overflow-hidden border border-white/8 shadow-2xl">

                    {/* Colored top accent bar */}
                    <div className="h-1.5 w-full" style={{ background: `linear-gradient(90deg, ${accentColor}, ${accentColor}88)` }} />

                    {/* Header section */}
                    <div className="px-6 pt-6 pb-5 flex items-start gap-4">
                        <div className="h-14 w-14 rounded-2xl flex items-center justify-center flex-shrink-0 border"
                            style={{ background: `${accentColor}18`, borderColor: `${accentColor}40` }}>
                            <FaFileAlt className="text-2xl" style={{ color: accentColor }} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h1 className="text-white font-bold text-xl leading-tight">{note.title}</h1>
                            <div className="flex flex-wrap gap-2 mt-2.5">
                                {note.department && (
                                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/15 text-blue-400 border border-blue-500/20">
                                        {note.department?.toUpperCase()}
                                    </span>
                                )}
                                {note.semester && (
                                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold border"
                                        style={{ background: `${accentColor}18`, color: accentColor, borderColor: `${accentColor}40` }}>
                                        Semester {note.semester}
                                    </span>
                                )}
                                {note.section && (
                                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/5 text-gray-400 border border-white/10">
                                        Section {note.section}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="mx-6 border-t border-white/6" />

                    {/* Uploader + date */}
                    <div className="px-6 py-4 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                            <img
                                src={uploader?.profile_photo || '/default-avatar.png'}
                                alt="uploader"
                                className="h-8 w-8 rounded-full object-cover border border-white/10"
                                onError={e => { e.target.src = '/default-avatar.png'; }}
                            />
                            <div>
                                <p className="text-white text-sm font-medium leading-tight">{uploader?.full_name || 'Unknown'}</p>
                                <p className="text-gray-500 text-xs">Uploaded by</p>
                            </div>
                        </div>
                        {uploadDate && (
                            <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                                <FaCalendarAlt className="text-gray-600" />
                                {new Date(uploadDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                            </div>
                        )}
                    </div>

                    {/* Description */}
                    {note.description && (
                        <>
                            <div className="mx-6 border-t border-white/6" />
                            <div className="px-6 py-4">
                                <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-line">{note.description}</p>
                            </div>
                        </>
                    )}

                    {/* Stats row */}
                    {note.total_downloads > 0 && (
                        <>
                            <div className="mx-6 border-t border-white/6" />
                            <div className="px-6 py-3 flex items-center gap-1.5 text-gray-500 text-xs">
                                <FaEye className="text-gray-600" />
                                <span>{note.total_downloads} views</span>
                            </div>
                        </>
                    )}

                    {/* Divider */}
                    <div className="mx-6 border-t border-white/6" />

                    {/* Action buttons */}
                    <div className="px-6 py-5 flex items-center gap-3">
                        <button
                            onClick={handleOpen}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold transition-all duration-200 hover:scale-[1.02] shadow-lg"
                            style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)`, boxShadow: `0 4px 20px ${accentColor}40` }}
                        >
                            <FaExternalLinkAlt className="text-xs" />
                            {isAuthenticated ? 'Open Note' : 'Login to Open'}
                        </button>

                        <div className="relative" ref={shareRef}>
                            <button
                                onClick={() => setShareOpen(o => !o)}
                                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white transition text-sm font-medium border border-white/10"
                            >
                                <FaShare className="text-xs" /> Share
                            </button>
                            {shareOpen && (
                                <div className="absolute left-0 top-12 bg-[#20222B] border border-white/10 rounded-xl shadow-xl p-2 z-20 flex flex-col gap-0.5 min-w-[190px]">
                                    <button onClick={handleCopy}
                                        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 text-gray-200 text-sm transition">
                                        {copied ? <FaCheck className="text-green-400 text-xs" /> : <FaCopy className="text-gray-400 text-xs" />}
                                        {copied ? 'Copied!' : 'Copy link'}
                                    </button>
                                    <a href={`https://wa.me/?text=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer"
                                        onClick={() => setShareOpen(false)}
                                        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 text-green-400 text-sm transition">
                                        <FaWhatsapp className="text-xs" /> WhatsApp
                                    </a>
                                    <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer"
                                        onClick={() => setShareOpen(false)}
                                        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 text-blue-400 text-sm transition">
                                        <FaFacebook className="text-xs" /> Facebook
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Unauthenticated prompt */}
                    {!isAuthenticated && (
                        <div className="mx-6 mb-6 rounded-xl px-4 py-3 flex items-center justify-between gap-3 border border-white/6 bg-white/3">
                            <p className="text-gray-400 text-sm">
                                <button onClick={() => navigate('/login')} className="text-purple-400 hover:text-purple-300 font-medium">Login</button>
                                {' '}to download and access all notes
                            </p>
                            <div className="flex gap-2 flex-shrink-0">
                                <button onClick={() => navigate('/login')}
                                    className="px-3 py-1.5 rounded-lg text-xs font-medium text-white transition"
                                    style={{ background: accentColor }}>
                                    Login
                                </button>
                                <button onClick={() => navigate('/signup')}
                                    className="px-3 py-1.5 rounded-lg bg-white/8 text-gray-300 text-xs font-medium hover:bg-white/12 transition border border-white/10">
                                    Sign Up
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PublicNotePage;
