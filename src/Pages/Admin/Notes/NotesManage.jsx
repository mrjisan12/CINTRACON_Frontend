import React, { useState, useEffect, useCallback } from "react";
import { FaSearch, FaTrash, FaExternalLinkAlt } from "react-icons/fa";
import { getAdminNotes, deleteAdminNote } from "../../../api/adminApi";
import { toast } from "react-toastify";

const DEPARTMENTS = ["cse", "eee", "pharm", "civil", "eng", "bba", "llb", "msc", "mba"];
const SIZE = 10;

const NotesManage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, total_pages: 1 });
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchNotes = useCallback(() => {
    setLoading(true);
    getAdminNotes({ search, department, page, size: SIZE })
      .then(res => {
        if (res.data.success) {
          setNotes(res.data.data);
          setPagination(res.data.pagination || { total: 0, total_pages: 1 });
        }
      })
      .catch(() => toast.error("Failed to load notes"))
      .finally(() => setLoading(false));
  }, [search, department, page]);

  useEffect(() => { fetchNotes(); }, [fetchNotes]);
  useEffect(() => { setPage(1); }, [search, department]);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const res = await deleteAdminNote(deleteId);
      if (res.data.success) {
        toast.success("Note deleted");
        setNotes(prev => prev.filter(n => n.id !== deleteId));
        setDeleteId(null);
      }
    } catch { toast.error("Failed to delete note"); }
    finally { setDeleting(false); }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Notes</h1>
        <p className="text-gray-400 text-sm mt-1">Manage all shared notes</p>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="relative">
          <FaSearch className="absolute left-3 top-2.5 text-gray-500 text-xs" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search notes..."
            className="pl-9 pr-3 py-2 bg-[#232A36] border border-[#2d3748] rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 placeholder-gray-500 w-56" />
        </div>
        <select value={department} onChange={e => setDepartment(e.target.value)}
          className="px-3 py-2 bg-[#232A36] border border-[#2d3748] rounded-lg text-white text-sm focus:outline-none focus:border-blue-500">
          <option value="">All Departments</option>
          {DEPARTMENTS.map(d => <option key={d} value={d}>{d.toUpperCase()}</option>)}
        </select>
      </div>

      <div className="bg-[#181a20] border border-[#232A36] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px]">
            <thead className="bg-[#13151a] border-b border-[#232A36]">
              <tr>
                {["Title", "Dept", "Uploaded By", "Downloads", "Date", "Actions"].map(h => (
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
              ) : notes.length === 0 ? (
                <tr><td colSpan={6} className="px-4 py-12 text-center text-gray-500">No notes found</td></tr>
              ) : notes.map(n => (
                <tr key={n.id} className="hover:bg-[#1e2028] transition-colors">
                  <td className="px-4 py-3">
                    <p className="text-white text-sm font-medium truncate max-w-[200px]">{n.title}</p>
                    {n.subject && <p className="text-gray-500 text-xs mt-0.5">{n.subject}</p>}
                  </td>
                  <td className="px-4 py-3 text-gray-300 text-sm uppercase">{n.department}</td>
                  <td className="px-4 py-3 text-gray-300 text-sm">{n.uploaded_by}</td>
                  <td className="px-4 py-3">
                    <span className="text-gray-300 text-sm">{n.downloads ?? 0}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-400 text-sm whitespace-nowrap">
                    {n.created_at ? new Date(n.created_at).toLocaleDateString() : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {n.file && (
                        <a href={n.file} target="_blank" rel="noreferrer"
                          className="p-1.5 rounded bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition text-sm">
                          <FaExternalLinkAlt />
                        </a>
                      )}
                      <button onClick={() => setDeleteId(n.id)}
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
            <h3 className="text-white font-semibold text-lg mb-2">Delete Note</h3>
            <p className="text-gray-400 text-sm mb-5">This note will be permanently deleted.</p>
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

export default NotesManage;
