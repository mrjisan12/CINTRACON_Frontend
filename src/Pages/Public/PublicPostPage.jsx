import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
    FaHeart, FaRegComment, FaShare, FaCopy, FaWhatsapp, FaFacebook, FaCheck,
    FaBookmark, FaRegBookmark, FaSadTear, FaAngry, FaLaughSquint
} from 'react-icons/fa';
import { getPublicPost, getShareUrl } from '../../api/publicApi';
import { addReaction, addComment, bookmarkPost } from '../../api/homeApi';
import { useAuth } from '../../contexts/AuthContext';
import NavbarMain from '../../Ui/NavbarMain';
import { toast } from 'react-toastify';

const reactionTypes = [
    { name: 'Haha',  icon: <FaLaughSquint className="text-yellow-500" />, key: 'haha' },
    { name: 'Love',  icon: <FaHeart       className="text-red-500"    />, key: 'love' },
    { name: 'Sad',   icon: <FaSadTear     className="text-yellow-400" />, key: 'sad'  },
    { name: 'Angry', icon: <FaAngry       className="text-orange-600" />, key: 'angry'},
];

const PublicPostPage = () => {
    const { postId } = useParams();
    const navigate = useNavigate();
    const { isAuthenticated, user } = useAuth();

    const [post, setPost]           = useState(null);
    const [loading, setLoading]     = useState(true);
    const [notFound, setNotFound]   = useState(false);
    const [newComment, setNewComment] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [shareOpen, setShareOpen]   = useState(false);
    const [copied, setCopied]         = useState(false);
    const [imgOpen, setImgOpen]       = useState(false);
    const [userReaction, setUserReaction] = useState(null);
    const [bookmarked, setBookmarked]     = useState(false);
    const [reactionHover, setReactionHover] = useState(false);
    const [authPrompt, setAuthPrompt]       = useState(false);

    const reactionHoverRef = useRef();
    const shareRef = useRef();

    const fetchPost = async () => {
        try {
            const res = await getPublicPost(postId);
            if (res.data.success) {
                setPost(res.data.data);
                setBookmarked(res.data.data.is_bookmarked || false);
            } else setNotFound(true);
        } catch {
            setNotFound(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchPost(); }, [postId]);

    useEffect(() => {
        if (!shareOpen) return;
        const handler = (e) => {
            if (shareRef.current && !shareRef.current.contains(e.target)) setShareOpen(false);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [shareOpen]);

    const formatTime = (d) => {
        if (!d) return '';
        const diff = Math.floor((Date.now() - new Date(d)) / 1000);
        if (diff < 60)    return `${diff}s ago`;
        if (diff < 3600)  return `${Math.floor(diff / 60)}m ago`;
        if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
        return `${Math.floor(diff / 86400)}d ago`;
    };

    const getReactionCounts = () =>
        reactionTypes.map(r => ({ ...r, count: post?.reaction?.[r.key] || 0 }));

    const getDisplayReaction = () => {
        if (userReaction) return reactionTypes.find(r => r.key === userReaction);
        return { name: 'Love', icon: <FaHeart className="text-red-500" /> };
    };

    const handleReact = async (type) => {
        if (!isAuthenticated) { setAuthPrompt(true); return; }
        const prevReaction = userReaction;
        try {
            const updated = { ...post.reaction };
            if (prevReaction === type) {
                updated[type] = Math.max(0, (updated[type] || 0) - 1);
                setUserReaction(null);
            } else {
                if (prevReaction) updated[prevReaction] = Math.max(0, (updated[prevReaction] || 0) - 1);
                updated[type] = (updated[type] || 0) + 1;
                setUserReaction(type);
            }
            setPost(prev => ({ ...prev, reaction: updated }));
            setReactionHover(false);
            await addReaction(postId, type);
        } catch { toast.error('Failed to react'); }
    };

    const handleComment = async () => {
        if (!isAuthenticated) { setAuthPrompt(true); return; }
        if (!newComment.trim()) return;
        setSubmitting(true);
        try {
            await addComment(postId, newComment);
            setNewComment('');
            await fetchPost();
        } catch { toast.error('Failed to comment'); }
        finally { setSubmitting(false); }
    };

    const handleBookmark = async () => {
        if (!isAuthenticated) { setAuthPrompt(true); return; }
        const was = bookmarked;
        setBookmarked(!was);
        try { await bookmarkPost(postId); }
        catch { setBookmarked(was); toast.error('Failed to save'); }
    };

    const shareUrl = getShareUrl('post', postId);

    const handleCopy = () => {
        navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        toast.success('Link copied!');
    };

    const onReactionEnter = () => {
        if (reactionHoverRef.current) clearTimeout(reactionHoverRef.current);
        setReactionHover(true);
    };
    const onReactionLeave = () => {
        reactionHoverRef.current = setTimeout(() => setReactionHover(false), 300);
    };

    if (loading) return (
        <div className="min-h-screen bg-[#181820] flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
        </div>
    );

    if (notFound) return (
        <div className="min-h-screen bg-[#181820] flex flex-col items-center justify-center gap-4">
            <div className="text-6xl">🔍</div>
            <h2 className="text-white text-2xl font-bold">Post not found</h2>
            <p className="text-gray-400">This post may have been deleted or doesn't exist.</p>
            <button onClick={() => navigate('/home')} className="mt-2 px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
                Go to Home
            </button>
        </div>
    );

    const reactionCounts = getReactionCounts();
    const displayReaction = getDisplayReaction();
    const commentCount = post.comments?.length ?? post.comment_count ?? 0;

    return (
        <div className="min-h-screen bg-[#181820]">
            {isAuthenticated ? (
                <NavbarMain />
            ) : (
                <nav className="sticky top-0 z-30 bg-[#181820] border-b border-[#232A36] h-14 flex items-center px-4 sm:px-8 gap-4">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
                        <img src="/logo.png" alt="logo" className="h-8 w-8 object-contain" />
                        <span className="font-bold text-lg text-white">CINTRACON</span>
                    </div>
                    <div className="ml-auto flex items-center gap-3">
                        <button onClick={() => navigate('/login')}
                            className="px-4 py-1.5 bg-[#232A36] text-gray-200 rounded-lg text-sm hover:bg-[#2d3748] transition">Login</button>
                        <button onClick={() => navigate('/signup')}
                            className="px-4 py-1.5 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition">Sign Up</button>
                    </div>
                </nav>
            )}

            <div className="max-w-2xl mx-auto px-4 py-8 flex flex-col gap-4">

                {/* Post Card — same style as NewsFeed */}
                <div className="bg-[#20222B] rounded-2xl shadow p-6 flex flex-col gap-4">

                    {/* Header */}
                    <div className="flex items-center gap-3">
                        <img
                            src={post.user?.profile_photo || '/default-avatar.png'}
                            alt="avatar"
                            className="h-9 w-9 rounded-full object-cover"
                            onError={e => { e.target.src = '/default-avatar.png'; }}
                        />
                        <div>
                            {isAuthenticated ? (
                                <Link to={`/user-profile/${post.user?.id}`}
                                    className="text-white font-semibold leading-tight text-base hover:underline">
                                    {post.user?.full_name || 'Unknown'}
                                </Link>
                            ) : (
                                <span className="text-white font-semibold leading-tight text-base">
                                    {post.user?.full_name || 'Unknown'}
                                </span>
                            )}
                            <div className="text-xs text-gray-400">{formatTime(post.created_at)}</div>
                        </div>
                    </div>

                    {/* Caption */}
                    {post.caption && (
                        <p className="text-gray-100 text-base leading-relaxed whitespace-pre-line">{post.caption}</p>
                    )}

                    {/* Image */}
                    {post.post_image && (
                        <div className="rounded-xl overflow-hidden border border-blue-400 cursor-pointer"
                            onClick={() => setImgOpen(true)}>
                            <img src={post.post_image} alt="post"
                                className="w-full h-80 object-cover transition-transform duration-200 hover:scale-105"
                                onError={e => { e.target.style.display = 'none'; }} />
                        </div>
                    )}

                    {/* Reaction counts */}
                    <div className="flex gap-2 items-center">
                        {reactionCounts.map(r => (
                            <div key={r.key}
                                className={`flex items-center gap-1 bg-[#20222B] px-3 py-1 rounded-full shadow border border-[#374151] ${r.count === 0 ? 'opacity-50' : ''}`}>
                                <span className="text-xl">{r.icon}</span>
                                <span className="text-gray-200 font-semibold text-sm">{r.count}</span>
                            </div>
                        ))}
                    </div>

                    {/* Action Bar */}
                    <div className="flex items-center pt-2 border-t border-[#374151] mt-2 w-full">

                        {/* Love / React */}
                        <div className="flex-1 flex justify-start">
                            <div className="relative">
                                <button
                                    className={`flex items-center gap-1.5 text-sm font-medium px-2 py-1 transition-colors ${userReaction ? 'text-blue-400' : 'text-gray-300 hover:text-blue-400'}`}
                                    onMouseEnter={onReactionEnter}
                                    onMouseLeave={onReactionLeave}
                                    onClick={() => {
                                        if (!isAuthenticated) { setAuthPrompt(true); return; }
                                        userReaction ? handleReact(userReaction) : handleReact('love');
                                    }}
                                >
                                    {displayReaction.icon}
                                    <span>{displayReaction.name}</span>
                                </button>

                                {reactionHover && isAuthenticated && (
                                    <div
                                        className="absolute bottom-10 left-0 flex gap-2 bg-[#232A36] px-3 py-2 rounded-xl shadow z-20 border border-[#374151]"
                                        onMouseEnter={onReactionEnter}
                                        onMouseLeave={onReactionLeave}
                                    >
                                        {reactionTypes.map(r => (
                                            <button key={r.key}
                                                className={`flex flex-col items-center transform transition-transform hover:scale-110 ${userReaction === r.key ? 'scale-110' : ''}`}
                                                onClick={() => handleReact(r.key)}>
                                                <span className="text-2xl">{r.icon}</span>
                                                <span className="text-xs text-gray-300">{r.name}</span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Comment */}
                        <div className="flex-1 flex justify-center">
                            <button
                                className="flex items-center gap-1.5 text-gray-300 hover:text-blue-400 text-sm font-medium px-2 py-1 transition-colors whitespace-nowrap"
                                onClick={() => {
                                    if (!isAuthenticated) { setAuthPrompt(true); return; }
                                    document.getElementById('pub-comment-input')?.focus();
                                }}
                            >
                                <FaRegComment /> Comment ({commentCount})
                            </button>
                        </div>

                        {/* Save */}
                        <div className="flex-1 flex justify-center">
                            <button
                                className={`flex items-center gap-1.5 text-sm font-medium px-2 py-1 transition-colors whitespace-nowrap ${bookmarked ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-400'}`}
                                onClick={handleBookmark}
                            >
                                {bookmarked ? <FaBookmark /> : <FaRegBookmark />}
                                {bookmarked ? 'Saved' : 'Save'}
                            </button>
                        </div>

                        {/* Share */}
                        <div className="flex-1 flex justify-end relative" ref={shareRef}>
                            <button
                                className="flex items-center gap-1.5 text-gray-300 hover:text-blue-400 text-sm font-medium px-2 py-1 transition-colors whitespace-nowrap"
                                onClick={() => setShareOpen(o => !o)}
                            >
                                <FaShare /> Share
                            </button>
                            {shareOpen && (
                                <div className="absolute bottom-10 right-0 bg-[#232A36] border border-[#374151] rounded-xl shadow-lg p-3 z-20 flex flex-col gap-1.5 min-w-[190px]">
                                    <button onClick={handleCopy}
                                        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#2d3748] text-gray-200 text-sm transition">
                                        {copied ? <FaCheck className="text-green-400" /> : <FaCopy className="text-gray-400" />}
                                        {copied ? 'Copied!' : 'Copy link'}
                                    </button>
                                    <a href={`https://wa.me/?text=${encodeURIComponent(shareUrl)}`}
                                        target="_blank" rel="noopener noreferrer"
                                        onClick={() => setShareOpen(false)}
                                        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#2d3748] text-green-400 text-sm transition">
                                        <FaWhatsapp /> WhatsApp
                                    </a>
                                    <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                                        target="_blank" rel="noopener noreferrer"
                                        onClick={() => setShareOpen(false)}
                                        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#2d3748] text-blue-400 text-sm transition">
                                        <FaFacebook /> Facebook
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Auth prompt — shown when unauth user clicks an action */}
                    {authPrompt && !isAuthenticated && (
                        <div className="bg-[#181820] rounded-xl px-4 py-3 border border-[#2d3748] flex items-center justify-between gap-3">
                            <p className="text-gray-400 text-sm">Login to react, comment or save this post</p>
                            <div className="flex gap-2 flex-shrink-0">
                                <button onClick={() => navigate('/login')}
                                    className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition">Login</button>
                                <button onClick={() => navigate('/signup')}
                                    className="px-3 py-1.5 bg-[#2d3748] text-gray-200 rounded-lg text-sm hover:bg-[#374151] transition">Sign Up</button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Comments Section */}
                <div className="bg-[#20222B] rounded-2xl shadow p-6 flex flex-col gap-4">
                    <h3 className="text-white font-semibold">Comments ({commentCount})</h3>

                    <div className="flex flex-col gap-3 max-h-80 overflow-y-auto pr-1">
                        {(post.comments || []).length === 0 ? (
                            <p className="text-gray-500 text-sm text-center py-4">No comments yet</p>
                        ) : (post.comments || []).map((c, i) => (
                            <div key={c.id || i} className="flex items-start gap-2">
                                <img
                                    src={c.user?.profile_photo || c.profile_photo || '/default-avatar.png'}
                                    alt="avatar"
                                    className="h-8 w-8 rounded-full object-cover flex-shrink-0"
                                    onError={e => { e.target.src = '/default-avatar.png'; }}
                                />
                                <div className="bg-[#181820] rounded-xl px-3 py-2 flex-1">
                                    <div className="flex items-center justify-between gap-2">
                                        <span className="text-white text-sm font-medium">
                                            {c.user?.full_name || c.full_name || 'Unknown'}
                                        </span>
                                        <span className="text-xs text-gray-500">{formatTime(c.created_at)}</span>
                                    </div>
                                    <p className="text-gray-300 text-sm mt-0.5">{c.content}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {isAuthenticated ? (
                        <div className="flex items-center gap-2">
                            <img
                                src={user?.profile_photo || '/default-avatar.png'}
                                alt="avatar"
                                className="h-8 w-8 rounded-full object-cover flex-shrink-0"
                                onError={e => { e.target.src = '/default-avatar.png'; }}
                            />
                            <input
                                id="pub-comment-input"
                                type="text"
                                value={newComment}
                                onChange={e => setNewComment(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && handleComment()}
                                placeholder="Write a comment..."
                                className="flex-1 bg-[#181820] text-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none border border-[#2d3748] focus:border-blue-500"
                            />
                            <button
                                onClick={handleComment}
                                disabled={submitting || !newComment.trim()}
                                className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-semibold hover:bg-blue-700 transition disabled:opacity-50"
                            >
                                {submitting ? '...' : 'Post'}
                            </button>
                        </div>
                    ) : (
                        <div className="bg-[#181820] rounded-xl px-4 py-3 text-center border border-[#2d3748]">
                            <p className="text-gray-400 text-sm">
                                <button onClick={() => navigate('/login')} className="text-blue-400 hover:underline">Login</button>
                                {' '}to comment on this post
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Fullscreen image */}
            {imgOpen && (
                <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center"
                    onClick={() => setImgOpen(false)}>
                    <img src={post.post_image} alt="fullscreen"
                        className="max-w-[80vw] max-h-[80vh] rounded-2xl border-4 border-blue-400 object-contain"
                        onClick={e => e.stopPropagation()} />
                </div>
            )}
        </div>
    );
};

export default PublicPostPage;
