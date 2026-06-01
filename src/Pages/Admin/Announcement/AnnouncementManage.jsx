import React, { useState, useEffect, useCallback } from "react";
import { FaSearch, FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { getAllAnnouncements, createAnnouncement, updateAnnouncement, deleteAnnouncement } from "../../../api/announcementApi";
import { toast } from "react-toastify";

const SIZE = 10;
const TYPES = ["info", "warning", "danger"];

const typeBadge = (type) => {
  const map = {
    info:    "bg-blue-500/15 text-blue-400",
    warning: "bg-yellow-500/15 text-yellow-400",
    danger:  "bg-red-500/15 text-red-400",
  };
  return map[type] || "bg-gray-500/15 text-gray-400";
};

const EMPTY_FORM = { title: "", description: "", type: "info", is_active: true };

const AnnouncementManage = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, total_pages: 1 });

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchAnnouncements = useCallback(() => {
    setLoading(true);
    getAllAnnouncements({ search, page, size: SIZE })
      .then(res => {
        if (res.data.success) {
          setAnnouncements(res.data.data);
          setPagination(res.data.pagination || { total: 0, total_pages: 1 });
        }
      })
      .catch(() => toast.error("Failed to load announcements"))
      .finally(() => setLoading(false));
  }, [search, page]);

  useEffect(() => { fetchAnnouncements(); }, [fetchAnnouncements]);
  useEffect(() => { setPage(1); }, [search]);

  const openCreate = () => { setEditing(null); setForm(EMPTY_FORM); setModalOpen(true); };
  const openEdit = (a) => { setEditing(a); setForm({ title: a.title, description: a.description, type: a.type, is_active: a.is_active }); setModalOpen(true); };

  const handleSave = async () => {
    if (!form.title.trim() || !form.description.trim()) {
      toast.error("Title and description are required");
      return;
    }
    setSaving(true);
    try {
      if (editing) {
        const res = await updateAnnouncement(editing.id, form);
        if (res.data.success) {
          toast.success("Announcement updated");
          setAnnouncements(prev => prev.map(a => a.id === editing.id ? res.data.data : a));
          setModalOpen(false);
        }
      } else {
        const res = await createAnnouncement(form);
        if (res.data.success) {
          toast.success("Announcement created");
          fetchAnnouncements();
          setModalOpen(false);
        }
      }
    } catch { toast.error("Failed to save announcement"); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const res = await deleteAnnouncement(deleteId);
      if (res.data.success) {
        toast.success("Announcement deleted");
        setAnnouncements(prev => prev.filter(a => a.id !== deleteId));
        setDeleteId(null);
      }
    } catch { toast.error("Failed to delete announcement"); }
    finally { setDeleting(false); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Announcements</h1>
          <p className="text-gray-400 text-sm mt-1">Create and manage platform announcements</p>
        </div>
        <button onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition">
          <FaPlus className="text-xs" /> New Announcement
        </button>
      </div>

      <div className="relative w-64">
        <FaSearch className="absolute left-3 top-2.5 text-gray-500 text-xs" />
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search announcements..."
          className="w-full pl-9 pr-3 py-2 bg-[#232A36] border border-[#2d3748] rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 placeholder-gray-500" />
      </div>

      <div className="bg-[#181a20] border border-[#232A36] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead className="bg-[#13151a] border-b border-[#232A36]">
              <tr>
                {["Title", "Type", "Status", "Date", "Actions"].map(h => (
                  <th key={h} className="text-left text-gray-400 text-xs font-semibold uppercase tracking-wider px-4 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#232A36]">
              {loading ? (
                [...Array(4)].map((_, i) => (
                  <tr key={i}>{[...Array(5)].map((__, j) => (
                    <td key={j} className="px-4 py-3"><div className="h-4 bg-[#232A36] rounded animate-pulse" /></td>
                  ))}</tr>
                ))
              ) : announcements.length === 0 ? (
                <tr><td colSpan={5} className="px-4 py-12 text-center text-gray-500">No announcements found</td></tr>
              ) : announcements.map(a => (
                <tr key={a.id} className="hover:bg-[#1e2028] transition-colors">
                  <td className="px-4 py-3">
                    <p className="text-white text-sm font-medium truncate max-w-[220px]">{a.title}</p>
                    {a.description && <p className="text-gray-500 text-xs mt-0.5 truncate max-w-[220px]">{a.description}</p>}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${typeBadge(a.type)}`}>{a.type}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${a.is_active ? "bg-green-500/15 text-green-400" : "bg-gray-500/15 text-gray-400"}`}>
                      {a.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-400 text-sm whitespace-nowrap">
                    {a.created_at ? new Date(a.created_at).toLocaleDateString() : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEdit(a)}
                        className="p-1.5 rounded bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition text-sm">
                        <FaEdit />
                      </button>
                      <button onClick={() => setDeleteId(a.id)}
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

      {/* Create / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#181a20] border border-[#232A36] rounded-xl p-6 w-full max-w-lg">
            <h3 className="text-white font-semibold text-lg mb-5">{editing ? "Edit Announcement" : "New Announcement"}</h3>
            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-xs font-medium mb-1.5 block">Title *</label>
                <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                  placeholder="Announcement title"
                  className="w-full px-3 py-2 bg-[#232A36] border border-[#2d3748] rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 placeholder-gray-500" />
              </div>
              <div>
                <label className="text-gray-400 text-xs font-medium mb-1.5 block">Description *</label>
                <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  placeholder="Announcement content..."
                  rows={4}
                  className="w-full px-3 py-2 bg-[#232A36] border border-[#2d3748] rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 placeholder-gray-500 resize-none" />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="text-gray-400 text-xs font-medium mb-1.5 block">Type</label>
                  <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
                    className="w-full px-3 py-2 bg-[#232A36] border border-[#2d3748] rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 capitalize">
                    {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div className="flex items-end pb-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <div onClick={() => setForm(f => ({ ...f, is_active: !f.is_active }))}
                      className={`w-10 h-5 rounded-full transition-colors ${form.is_active ? "bg-blue-600" : "bg-[#2d3748]"} relative`}>
                      <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${form.is_active ? "translate-x-5" : "translate-x-0.5"}`} />
                    </div>
                    <span className="text-gray-300 text-sm">Active</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setModalOpen(false)} disabled={saving}
                className="flex-1 px-4 py-2 rounded-lg bg-[#232A36] text-gray-300 hover:bg-[#2a3040] transition">Cancel</button>
              <button onClick={handleSave} disabled={saving}
                className="flex-1 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition font-medium disabled:opacity-60">
                {saving ? "Saving..." : (editing ? "Update" : "Create")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#181a20] border border-[#232A36] rounded-xl p-6 w-full max-w-sm">
            <h3 className="text-white font-semibold text-lg mb-2">Delete Announcement</h3>
            <p className="text-gray-400 text-sm mb-5">This announcement will be permanently deleted.</p>
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

export default AnnouncementManage;
