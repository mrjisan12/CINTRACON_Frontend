import React, { useState, useEffect, useCallback } from "react";
import { FaSearch, FaThumbtack, FaTrash } from "react-icons/fa";
import { getAdminForum, deleteAdminForumTopic, pinAdminForumTopic } from "../../../api/adminApi";
import { toast } from "react-toastify";

const SIZE = 10;

const ForumManage = () => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, total_pages: 1 });
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchTopics = useCallback(() => {
    setLoading(true);
    getAdminForum({ search, page, size: SIZE })
      .then(res => {
        if (res.data.success) {
          setTopics(res.data.data);
          setPagination(res.data.pagination || { total: 0, total_pages: 1 });
        }
      })
      .catch(() => toast.error("Failed to load posts"))
      .finally(() => setLoading(false));
  }, [search, page]);

  useEffect(() => { fetchTopics(); }, [fetchTopics]);
  useEffect(() => { setPage(1); }, [search]);

  const handlePin = async (id, isPinned) => {
    try {
      const res = await pinAdminForumTopic(id);
      if (res.data.success) {
        toast.success(res.data.msg || (isPinned ? "Unpinned" : "Pinned"));
        setTopics(prev => prev.map(t =>
          t.id === id ? { ...t, is_pinned: res.data.data?.is_pinned ?? !isPinned } : t
        ));
      }
    } catch { toast.error("Failed to update pin"); }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const res = await deleteAdminForumTopic(deleteId);
      if (res.data.success) {
        toast.success("Post deleted");
        setTopics(prev => prev.filter(t => t.id !== deleteId));
        setDeleteId(null);
      }
    } catch { toast.error("Failed to delete post"); }
    finally { setDeleting(false); }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Forum & Posts</h1>
        <p className="text-gray-400 text-sm mt-1">Manage all posts and discussions</p>
      </div>

      <div className="flex gap-3">
        <div className="relative">
          <FaSearch className="absolute left-3 top-2.5 text-gray-500 text-xs" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search posts..."
            className="pl-9 pr-3 py-2 bg-[#232A36] border border-[#2d3748] rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 placeholder-gray-500 w-64" />
        </div>
      </div>

      <div className="bg-[#181a20] border border-[#232A36] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px]">
            <thead className="bg-[#13151a] border-b border-[#232A36]">
              <tr>
                {["Post", "Author", "Date", "Replies", "Status", "Actions"].map(h => (
                  <th key={h} className="text-left text-gray-400 text-xs font-semibold uppercase tracking-wider px-4 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#232A36]">
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i}>{[...Array(6)].map((__, j) => (
                    <td key={j} className="px-4 py-3"><div className="h-4 bg-[#232A36] rounded animate-pulse" /></td>
                  ))}</tr>
                ))
              ) : topics.length === 0 ? (
                <tr><td colSpan={6} className="px-4 py-12 text-center text-gray-500">No posts found</td></tr>
              ) : topics.map(t => (
                <tr key={t.id} className="hover:bg-[#1e2028] transition-colors">
                  <td className="px-4 py-3 max-w-xs">
                    <div className="flex items-center gap-2">
                      {t.is_pinned && <FaThumbtack className="text-yellow-400 text-xs flex-shrink-0" />}
                      <span className="text-white text-sm truncate">{t.title}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-300 text-sm whitespace-nowrap">{t.author}</td>
                  <td className="px-4 py-3 text-gray-400 text-sm whitespace-nowrap">
                    {t.created_at ? new Date(t.created_at).toLocaleDateString() : "—"}
                  </td>
                  <td className="px-4 py-3 text-gray-300 text-sm">{t.replies_count ?? 0}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${t.is_active !== false ? "bg-green-500/15 text-green-400" : "bg-gray-500/15 text-gray-400"}`}>
                      {t.is_active !== false ? "Active" : "Archived"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => handlePin(t.id, t.is_pinned)}
                        title={t.is_pinned ? "Unpin" : "Pin"}
                        className={`p-1.5 rounded transition text-sm ${t.is_pinned ? "bg-yellow-500/15 text-yellow-400 hover:bg-yellow-500/25" : "bg-[#232A36] text-gray-500 hover:text-yellow-400"}`}>
                        <FaThumbtack />
                      </button>
                      <button onClick={() => setDeleteId(t.id)}
                        className="p-1.5 rounded bg-red-500/10 text-red-400 hover:bg-red-500/20 transition text-sm">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {pagination.total > 0 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-[#232A36]">
            <p className="text-gray-400 text-sm">{((page - 1) * SIZE) + 1}–{Math.min(page * SIZE, pagination.total)} of {pagination.total}</p>
            <div className="flex gap-2">
              <button disabled={page === 1} onClick={() => setPage(p => p - 1)}
                className="px-3 py-1.5 rounded bg-[#232A36] text-gray-300 text-sm disabled:opacity-40 hover:bg-[#2a3040] transition">Prev</button>
              <button disabled={page >= pagination.total_pages} onClick={() => setPage(p => p + 1)}
                className="px-3 py-1.5 rounded bg-[#232A36] text-gray-300 text-sm disabled:opacity-40 hover:bg-[#2a3040] transition">Next</button>
            </div>
          </div>
        )}
      </div>

      {deleteId && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#181a20] border border-[#232A36] rounded-xl p-6 w-full max-w-sm">
            <h3 className="text-white font-semibold text-lg mb-2">Delete Post</h3>
            <p className="text-gray-400 text-sm mb-5">This post will be permanently deleted.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} disabled={deleting}
                className="flex-1 px-4 py-2 rounded-lg bg-[#232A36] text-gray-300 hover:bg-[#2a3040] transition">Cancel</button>
              <button onClick={handleDelete} disabled={deleting}
                className="flex-1 px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition font-medium disabled:opacity-60">
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForumManage;
