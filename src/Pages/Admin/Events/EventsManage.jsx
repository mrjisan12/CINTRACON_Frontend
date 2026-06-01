import React, { useState, useEffect, useCallback } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { getAllEvents, createEvent, updateEvent, deleteEvent } from "../../../api/eventsApi";
import { useAuth } from "../../../contexts/AuthContext";
import { toast } from "react-toastify";

const SIZE = 10;
const EMPTY_FORM = { title: "", description: "", event_type: "academic", event_date: "", location: "", organizer: "" };
const EVENT_TYPES = ["academic", "cultural", "sports", "workshop", "seminar", "other"];

const EventsManage = () => {
  const { token } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, total_pages: 1 });

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [image, setImage] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchEvents = useCallback(() => {
    setLoading(true);
    getAllEvents({ page, size: SIZE }, token)
      .then(res => {
        if (res.data.success) {
          setEvents(res.data.data);
          setPagination(res.data.pagination || { total: 0, total_pages: 1 });
        }
      })
      .catch(() => toast.error("Failed to load events"))
      .finally(() => setLoading(false));
  }, [token, page]);

  useEffect(() => { fetchEvents(); }, [fetchEvents]);

  const openCreate = () => {
    setEditing(null); setForm(EMPTY_FORM); setImage(null); setModalOpen(true);
  };

  const openEdit = (e) => {
    setEditing(e);
    setForm({
      title: e.title || "", description: e.description || "",
      event_type: e.event_type || "academic",
      event_date: e.event_date || e.date_time || "",
      location: e.location || "", organizer: e.organizer || e.organized_by || ""
    });
    setImage(null);
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.title.trim()) { toast.error("Title is required"); return; }
    setSaving(true);
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => { if (v) fd.append(k, v); });
    if (image) fd.append("image", image);
    try {
      if (editing) {
        const res = await updateEvent(editing.id, fd, token);
        if (res.data.success) {
          toast.success("Event updated");
          fetchEvents();
          setModalOpen(false);
        }
      } else {
        const res = await createEvent(fd, token);
        if (res.data.success) {
          toast.success("Event created");
          fetchEvents();
          setModalOpen(false);
        }
      }
    } catch { toast.error("Failed to save event"); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const res = await deleteEvent(deleteId, token);
      if (res.data.success) {
        toast.success("Event deleted");
        setEvents(prev => prev.filter(e => e.id !== deleteId));
        setDeleteId(null);
      }
    } catch { toast.error("Failed to delete event"); }
    finally { setDeleting(false); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Events</h1>
          <p className="text-gray-400 text-sm mt-1">Manage upcoming and past events</p>
        </div>
        <button onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition">
          <FaPlus className="text-xs" /> New Event
        </button>
      </div>

      <div className="bg-[#181a20] border border-[#232A36] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px]">
            <thead className="bg-[#13151a] border-b border-[#232A36]">
              <tr>
                {["Title", "Type", "Date", "Location", "Organizer", "Actions"].map(h => (
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
              ) : events.length === 0 ? (
                <tr><td colSpan={6} className="px-4 py-12 text-center text-gray-500">No events found</td></tr>
              ) : events.map(e => (
                <tr key={e.id} className="hover:bg-[#1e2028] transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {e.image && (
                        <img src={e.image} alt="" className="w-8 h-8 rounded object-cover flex-shrink-0" />
                      )}
                      <p className="text-white text-sm font-medium truncate max-w-[160px]">{e.title}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded-full text-xs bg-purple-500/15 text-purple-400 capitalize">{e.event_type || "—"}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-400 text-sm whitespace-nowrap">
                    {(e.event_date || e.date_time) ? new Date(e.event_date || e.date_time).toLocaleDateString() : "—"}
                  </td>
                  <td className="px-4 py-3 text-gray-300 text-sm">{e.location || "—"}</td>
                  <td className="px-4 py-3 text-gray-300 text-sm">{e.organizer || e.organized_by || "—"}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEdit(e)}
                        className="p-1.5 rounded bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition text-sm">
                        <FaEdit />
                      </button>
                      <button onClick={() => setDeleteId(e.id)}
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
          <div className="bg-[#181a20] border border-[#232A36] rounded-xl p-6 w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-white font-semibold text-lg mb-5">{editing ? "Edit Event" : "New Event"}</h3>
            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-xs font-medium mb-1.5 block">Title *</label>
                <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                  placeholder="Event title"
                  className="w-full px-3 py-2 bg-[#232A36] border border-[#2d3748] rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 placeholder-gray-500" />
              </div>
              <div>
                <label className="text-gray-400 text-xs font-medium mb-1.5 block">Description</label>
                <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  placeholder="Event description..."
                  rows={3}
                  className="w-full px-3 py-2 bg-[#232A36] border border-[#2d3748] rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 placeholder-gray-500 resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-400 text-xs font-medium mb-1.5 block">Type</label>
                  <select value={form.event_type} onChange={e => setForm(f => ({ ...f, event_type: e.target.value }))}
                    className="w-full px-3 py-2 bg-[#232A36] border border-[#2d3748] rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 capitalize">
                    {EVENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-gray-400 text-xs font-medium mb-1.5 block">Date</label>
                  <input type="datetime-local" value={form.event_date} onChange={e => setForm(f => ({ ...f, event_date: e.target.value }))}
                    className="w-full px-3 py-2 bg-[#232A36] border border-[#2d3748] rounded-lg text-white text-sm focus:outline-none focus:border-blue-500" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-400 text-xs font-medium mb-1.5 block">Location</label>
                  <input value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
                    placeholder="e.g. Auditorium"
                    className="w-full px-3 py-2 bg-[#232A36] border border-[#2d3748] rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 placeholder-gray-500" />
                </div>
                <div>
                  <label className="text-gray-400 text-xs font-medium mb-1.5 block">Organizer</label>
                  <input value={form.organizer} onChange={e => setForm(f => ({ ...f, organizer: e.target.value }))}
                    placeholder="Organizer name"
                    className="w-full px-3 py-2 bg-[#232A36] border border-[#2d3748] rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 placeholder-gray-500" />
                </div>
              </div>
              <div>
                <label className="text-gray-400 text-xs font-medium mb-1.5 block">Image (optional)</label>
                <input type="file" accept="image/*" onChange={e => setImage(e.target.files[0])}
                  className="w-full text-sm text-gray-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-medium file:bg-blue-500/20 file:text-blue-400 hover:file:bg-blue-500/30 cursor-pointer" />
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

      {deleteId && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#181a20] border border-[#232A36] rounded-xl p-6 w-full max-w-sm">
            <h3 className="text-white font-semibold text-lg mb-2">Delete Event</h3>
            <p className="text-gray-400 text-sm mb-5">This event will be permanently deleted.</p>
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

export default EventsManage;
