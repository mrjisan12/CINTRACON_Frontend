import React, { useState, useEffect, useCallback } from 'react';
import { FaBookmark, FaRegBookmark, FaTimes } from 'react-icons/fa';
import { getMyBookmarks, bookmarkPost } from '../../../api/homeApi';
import { Link } from 'react-router-dom';
import NavbarMain from '../../../Ui/NavbarMain';
import LeftSideBar from '../../../Components/LeftSideBar';

const MyBookmarks = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [bookmarked, setBookmarked] = useState({});
    const [confirmId, setConfirmId] = useState(null);
    const [fullscreenImg, setFullscreenImg] = useState(null);

    const fetchBookmarks = useCallback(async (p = 1) => {
        setLoading(true);
        try {
            const res = await getMyBookmarks(p, 10);
            if (res.data.success) {
                setPosts(res.data.data || []);
                setTotalPages(res.data.pagination?.total_pages || 1);
                const bm = {};
                (res.data.data || []).forEach(post => { bm[post.id] = true; });
                setBookmarked(bm);
            }
        } catch { /* silent */ }
        finally { setLoading(false); }
    }, []);

    useEffect(() => { fetchBookmarks(page); }, [page, fetchBookmarks]);

    // Close fullscreen on ESC
    useEffect(() => {
        const onKey = (e) => { if (e.key === 'Escape') setFullscreenImg(null); };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, []);

    const handleRemoveConfirm = async () => {
        const postId = confirmId;
        setConfirmId(null);
        setBookmarked(b => ({ ...b, [postId]: false }));
        try {
            await bookmarkPost(postId);
            setPosts(ps => ps.filter(p => p.id !== postId));
        } catch {
            setBookmarked(b => ({ ...b, [postId]: true }));
        }
    };

    const formatTime = (createdAt) => {
        if (!createdAt) return '';
        const diff = Math.floor((Date.now() - new Date(createdAt)) / (1000 * 60 * 60));
        if (diff < 1) return `${Math.floor((Date.now() - new Date(createdAt)) / 60000)}m ago`;
        if (diff < 24) return `${diff}h ago`;
        return `${Math.floor(diff / 24)}d ago`;
    };

    return (
        <div className="min-h-screen bg-[#181820]">
            <NavbarMain />

            <div className="max-w-7xl mx-auto px-3 md:px-6 pt-6">
                <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
                    <aside className="hidden lg:block">
                        <LeftSideBar />
                    </aside>

                    <main className="flex-1">
                        <div className="mb-6 flex items-center gap-3">
                            <FaBookmark className="text-yellow-400 text-2xl" />
                            <div>
                                <h1 className="text-2xl font-bold text-white">Saved Posts</h1>
                                <p className="text-gray-400 text-sm mt-0.5">Posts you've bookmarked</p>
                            </div>
                        </div>

                        {loading ? (
                            <div className="flex flex-col gap-4">
                                {[...Array(3)].map((_, i) => (
                                    <div key={i} className="bg-[#20222B] rounded-2xl p-5 flex flex-col gap-3 animate-pulse">
                                        <div className="flex items-center gap-3">
                                            <div className="h-9 w-9 rounded-full bg-[#2d3748]" />
                                            <div className="flex-1">
                                                <div className="h-3 bg-[#2d3748] rounded w-32 mb-2" />
                                                <div className="h-2 bg-[#2d3748] rounded w-20" />
                                            </div>
                                        </div>
                                        <div className="h-4 bg-[#2d3748] rounded w-3/4" />
                                        <div className="h-40 bg-[#2d3748] rounded-xl" />
                                    </div>
                                ))}
                            </div>
                        ) : posts.length === 0 ? (
                            <div className="text-center py-20 text-gray-400 bg-[#20222B] rounded-2xl border border-[#2d3748]">
                                <FaRegBookmark className="text-5xl mx-auto mb-4 opacity-30" />
                                <p className="text-lg font-medium text-gray-300">No saved posts yet</p>
                                <p className="text-sm mt-1">Tap the bookmark icon on any post to save it here.</p>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-4">
                                {posts.map(post => (
                                    <div key={post.id} className="bg-[#20222B] rounded-2xl border border-[#2d3748] p-5 flex flex-col gap-3 hover:border-[#3d4758] transition-colors">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={post.user?.profile_photo || '/default-avatar.png'}
                                                    alt="avatar"
                                                    className="h-10 w-10 rounded-full object-cover border border-[#3d4758]"
                                                    onError={e => { e.target.src = '/default-avatar.png'; }}
                                                />
                                                <div>
                                                    <Link
                                                        to={`/user-profile/${post.user?.id}`}
                                                        className="text-white font-semibold text-sm hover:text-blue-400 transition-colors"
                                                    >
                                                        {post.user?.full_name || 'Unknown'}
                                                    </Link>
                                                    <div className="text-xs text-gray-500 mt-0.5">{formatTime(post.created_at)}</div>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => setConfirmId(post.id)}
                                                className="p-2 rounded-lg bg-yellow-400/10 text-yellow-400 hover:bg-red-500/10 hover:text-red-400 transition text-base"
                                                title="Remove bookmark"
                                            >
                                                <FaBookmark />
                                            </button>
                                        </div>

                                        {post.caption && (
                                            <p className="text-gray-200 text-sm leading-relaxed line-clamp-3">{post.caption}</p>
                                        )}

                                        {post.post_image && (
                                            <div
                                                className="rounded-xl overflow-hidden border border-[#2d3748] cursor-pointer"
                                                onClick={() => setFullscreenImg(post.post_image)}
                                            >
                                                <img
                                                    src={post.post_image}
                                                    alt="post"
                                                    className="w-full max-h-72 object-cover hover:opacity-90 transition-opacity"
                                                    onError={e => { e.target.style.display = 'none'; }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                ))}

                                {totalPages > 1 && (
                                    <div className="flex items-center justify-center gap-4 mt-2 pb-6">
                                        <button
                                            disabled={page <= 1}
                                            onClick={() => setPage(p => p - 1)}
                                            className="px-4 py-2 bg-[#232A36] text-gray-300 rounded-lg text-sm disabled:opacity-40 hover:bg-[#2d3748] transition"
                                        >
                                            Previous
                                        </button>
                                        <span className="text-gray-400 text-sm">{page} / {totalPages}</span>
                                        <button
                                            disabled={page >= totalPages}
                                            onClick={() => setPage(p => p + 1)}
                                            className="px-4 py-2 bg-[#232A36] text-gray-300 rounded-lg text-sm disabled:opacity-40 hover:bg-[#2d3748] transition"
                                        >
                                            Next
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </main>
                </div>
            </div>

            {/* Remove Bookmark Confirmation */}
            {confirmId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-[#20222B] border border-[#2d3748] rounded-2xl p-6 w-full max-w-sm shadow-2xl">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="h-10 w-10 rounded-full bg-yellow-400/10 flex items-center justify-center">
                                <FaBookmark className="text-yellow-400" />
                            </div>
                            <h3 className="text-white font-semibold text-lg">Remove Bookmark?</h3>
                        </div>
                        <p className="text-gray-400 text-sm mb-6">This post will be removed from your saved list.</p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setConfirmId(null)}
                                className="flex-1 px-4 py-2.5 rounded-xl bg-[#232A36] text-gray-300 hover:bg-[#2d3748] transition text-sm font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleRemoveConfirm}
                                className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 text-white hover:bg-red-600 transition text-sm font-medium"
                            >
                                Yes, Remove
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Fullscreen Image */}
            {fullscreenImg && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md"
                    onClick={() => setFullscreenImg(null)}
                >
                    <button
                        className="absolute top-4 right-4 h-10 w-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition text-xl"
                        onClick={() => setFullscreenImg(null)}
                    >
                        <FaTimes />
                    </button>
                    <img
                        src={fullscreenImg}
                        alt="fullscreen"
                        className="max-w-[92vw] max-h-[90vh] rounded-2xl object-contain shadow-2xl"
                        onClick={e => e.stopPropagation()}
                    />
                </div>
            )}
        </div>
    );
};

export default MyBookmarks;
