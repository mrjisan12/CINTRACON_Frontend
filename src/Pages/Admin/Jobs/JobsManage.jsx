import React, { useState, useEffect, useCallback } from "react";
import { FaPlus, FaTrash, FaExternalLinkAlt } from "react-icons/fa";
import { getAllJobs, postJob, deleteJob } from "../../../api/jobApi";
import { useAuth } from "../../../contexts/AuthContext";
import { toast } from "react-toastify";

const SIZE = 10;
const EMPTY_FORM = {
  title: "", description: "", company_name: "", salary: "",
  place: "", apply_link: "", deadline: "", start_time: "", end_time: "",
  drive_link: ""
};

const JobsManage = () => {
  const { token } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, total_pages: 1 });

  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchJobs = useCallback(() => {
    setLoading(true);
    getAllJobs(page, SIZE, token)
      .then(res => {
        if (res.success) {
          setJobs(res.data);
          setPagination(res.pagination || { total: 0, total_pages: 1 });
        }
      })
      .catch(() => toast.error("Failed to load jobs"))
      .finally(() => setLoading(false));
  }, [token, page]);

  useEffect(() => { fetchJobs(); }, [fetchJobs]);

  const handleSave = async () => {
    if (!form.title.trim() || !form.company_name.trim()) {
      toast.error("Title and company name are required");
      return;
    }
    setSaving(true);
    try {
      const res = await postJob(form, token);
      if (res.success) {
        toast.success("Job posted");
        fetchJobs();
        setModalOpen(false);
        setForm(EMPTY_FORM);
      }
    } catch { toast.error("Failed to post job"); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const res = await deleteJob(deleteId, token);
      if (res.success) {
        toast.success("Job deleted");
        setJobs(prev => prev.filter(j => j.id !== deleteId));
        setDeleteId(null);
      }
    } catch { toast.error("Failed to delete job"); }
    finally { setDeleting(false); }
  };

  const field = (key, label, type = "text", placeholder = "") => (
    <div>
      <label className="text-gray-400 text-xs font-medium mb-1.5 block">{label}</label>
      <input type={type} value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
        placeholder={placeholder}
        className="w-full px-3 py-2 bg-[#232A36] border border-[#2d3748] rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 placeholder-gray-500" />
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Jobs</h1>
          <p className="text-gray-400 text-sm mt-1">Manage job opportunities</p>
        </div>
        <button onClick={() => { setForm(EMPTY_FORM); setModalOpen(true); }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition">
          <FaPlus className="text-xs" /> Post Job
        </button>
      </div>

      <div className="bg-[#181a20] border border-[#232A36] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px]">
            <thead className="bg-[#13151a] border-b border-[#232A36]">
              <tr>
                {["Title", "Company", "Location", "Salary", "Deadline", "Drive", "Actions"].map(h => (
                  <th key={h} className="text-left text-gray-400 text-xs font-semibold uppercase tracking-wider px-4 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#232A36]">
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i}>{[...Array(7)].map((__, j) => (
                    <td key={j} className="px-4 py-3"><div className="h-4 bg-[#232A36] rounded animate-pulse" /></td>
                  ))}</tr>
                ))
              ) : jobs.length === 0 ? (
                <tr><td colSpan={7} className="px-4 py-12 text-center text-gray-500">No jobs found</td></tr>
              ) : jobs.map(j => (
                <tr key={j.id} className="hover:bg-[#1e2028] transition-colors">
                  <td className="px-4 py-3">
                    <p className="text-white text-sm font-medium truncate max-w-[180px]">{j.title}</p>
                    {j.description && <p className="text-gray-500 text-xs mt-0.5 truncate max-w-[180px]">{j.description}</p>}
                  </td>
                  <td className="px-4 py-3 text-gray-300 text-sm">{j.company_name}</td>
                  <td className="px-4 py-3 text-gray-300 text-sm">{j.place}</td>
                  <td className="px-4 py-3 text-gray-300 text-sm">{j.salary || "—"}</td>
                  <td className="px-4 py-3 text-gray-400 text-sm whitespace-nowrap">
                    {j.deadline ? new Date(j.deadline).toLocaleDateString() : "—"}
                  </td>
                  <td className="px-4 py-3">
                    {j.drive_link ? (
                      <a
                        href={j.drive_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded bg-green-500/10 text-green-400 hover:bg-green-500/20 transition text-sm inline-flex items-center"
                        title="Open Drive"
                      >
                        <FaExternalLinkAlt />
                      </a>
                    ) : (
                      <span className="text-gray-600 text-xs">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => setDeleteId(j.id)}
                      className="p-1.5 rounded bg-red-500/10 text-red-400 hover:bg-red-500/20 transition text-sm">
                      <FaTrash />
                    </button>
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

      {/* Create Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#181a20] border border-[#232A36] rounded-xl p-6 w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-white font-semibold text-lg mb-5">Post New Job</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {field("title", "Job Title *", "text", "e.g. Frontend Developer")}
                {field("company_name", "Company *", "text", "e.g. Acme Corp")}
              </div>
              <div>
                <label className="text-gray-400 text-xs font-medium mb-1.5 block">Description</label>
                <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  placeholder="Job description..."
                  rows={3}
                  className="w-full px-3 py-2 bg-[#232A36] border border-[#2d3748] rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 placeholder-gray-500 resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                {field("salary", "Salary", "text", "e.g. 25,000 BDT")}
                {field("place", "Location", "text", "e.g. Dhaka")}
              </div>
              <div className="grid grid-cols-2 gap-4">
                {field("start_time", "Start Date", "date")}
                {field("end_time", "End Date", "date")}
              </div>
              <div className="grid grid-cols-2 gap-4">
                {field("deadline", "Apply Deadline", "date")}
                {field("apply_link", "Apply Link", "url", "https://...")}
              </div>
              {field("drive_link", "Drive Link", "url", "https://drive.google.com/...")}
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setModalOpen(false)} disabled={saving}
                className="flex-1 px-4 py-2 rounded-lg bg-[#232A36] text-gray-300 hover:bg-[#2a3040] transition">Cancel</button>
              <button onClick={handleSave} disabled={saving}
                className="flex-1 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition font-medium disabled:opacity-60">
                {saving ? "Posting..." : "Post Job"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#181a20] border border-[#232A36] rounded-xl p-6 w-full max-w-sm">
            <h3 className="text-white font-semibold text-lg mb-2">Delete Job</h3>
            <p className="text-gray-400 text-sm mb-5">This job posting will be permanently removed.</p>
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

export default JobsManage;
