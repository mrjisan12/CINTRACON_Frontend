import React, { useState, useEffect, useCallback } from "react";
import { FaSearch, FaToggleOn, FaToggleOff, FaTrash } from "react-icons/fa";
import { getAdminStudents, deleteAdminStudent, toggleStudentActive } from "../../../api/adminApi";
import { toast } from "react-toastify";

const DEPARTMENTS = ["cse", "eee", "pharm", "civil", "eng", "bba", "llb", "msc", "mba"];
const SEMESTERS = ["1.1", "1.2", "2.1", "2.2", "3.1", "3.2", "4.1", "4.2", "graduate"];
const SIZE = 10;

const AllStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [semester, setSemester] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, total_pages: 1 });
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchStudents = useCallback(() => {
    setLoading(true);
    getAdminStudents({ search, department, semester, page, size: SIZE })
      .then(res => {
        if (res.data.success) {
          setStudents(res.data.data);
          setPagination(res.data.pagination || { total: 0, total_pages: 1 });
        }
      })
      .catch(() => toast.error("Failed to load students"))
      .finally(() => setLoading(false));
  }, [search, department, semester, page]);

  useEffect(() => { fetchStudents(); }, [fetchStudents]);
  useEffect(() => { setPage(1); }, [search, department, semester]);

  const handleToggle = async (id) => {
    try {
      const res = await toggleStudentActive(id);
      if (res.data.success) {
        toast.success(res.data.msg || "Status updated");
        setStudents(prev => prev.map(s =>
          s.id === id ? { ...s, is_active: res.data.data?.is_active ?? !s.is_active } : s
        ));
      }
    } catch { toast.error("Failed to update status"); }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const res = await deleteAdminStudent(deleteId);
      if (res.data.success) {
        toast.success("Student deleted");
        setStudents(prev => prev.filter(s => s.id !== deleteId));
        setDeleteId(null);
      }
    } catch { toast.error("Failed to delete student"); }
    finally { setDeleting(false); }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Students</h1>
        <p className="text-gray-400 text-sm mt-1">Manage all registered students</p>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="relative">
          <FaSearch className="absolute left-3 top-2.5 text-gray-500 text-xs" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search name or email..."
            className="pl-9 pr-3 py-2 bg-[#232A36] border border-[#2d3748] rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 placeholder-gray-500 w-56"
          />
        </div>
        <select value={department} onChange={e => setDepartment(e.target.value)}
          className="px-3 py-2 bg-[#232A36] border border-[#2d3748] rounded-lg text-white text-sm focus:outline-none focus:border-blue-500">
          <option value="">All Departments</option>
          {DEPARTMENTS.map(d => <option key={d} value={d}>{d.toUpperCase()}</option>)}
        </select>
        <select value={semester} onChange={e => setSemester(e.target.value)}
          className="px-3 py-2 bg-[#232A36] border border-[#2d3748] rounded-lg text-white text-sm focus:outline-none focus:border-blue-500">
          <option value="">All Semesters</option>
          {SEMESTERS.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div className="bg-[#181a20] border border-[#232A36] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead className="bg-[#13151a] border-b border-[#232A36]">
              <tr>
                {["Student", "Email", "Dept", "Semester", "Batch", "Status", "Actions"].map(h => (
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
              ) : students.length === 0 ? (
                <tr><td colSpan={7} className="px-4 py-12 text-center text-gray-500">No students found</td></tr>
              ) : students.map(s => (
                <tr key={s.id} className={`hover:bg-[#1e2028] transition-colors ${!s.is_active ? "opacity-60" : ""}`}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={s.profile_photo || "/default-avatar.png"}
                        onError={e => { e.target.src = "/default-avatar.png"; }}
                        alt="" className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                      />
                      <span className="text-white text-sm font-medium">{s.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-300 text-sm">{s.email}</td>
                  <td className="px-4 py-3 text-gray-300 text-sm uppercase">{s.department}</td>
                  <td className="px-4 py-3 text-gray-300 text-sm">{s.semester}</td>
                  <td className="px-4 py-3 text-gray-400 text-sm">#{s.batch}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${s.is_active ? "bg-green-500/15 text-green-400" : "bg-red-500/15 text-red-400"}`}>
                      {s.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleToggle(s.id)}
                        title={s.is_active ? "Deactivate" : "Activate"}
                        className={`text-xl transition ${s.is_active ? "text-green-400 hover:text-green-300" : "text-gray-500 hover:text-gray-300"}`}>
                        {s.is_active ? <FaToggleOn /> : <FaToggleOff />}
                      </button>
                      <button onClick={() => setDeleteId(s.id)}
                        className="text-red-400 hover:text-red-300 transition p-1">
                        <FaTrash className="text-sm" />
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
            <p className="text-gray-400 text-sm">
              {((page - 1) * SIZE) + 1}–{Math.min(page * SIZE, pagination.total)} of {pagination.total}
            </p>
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
            <h3 className="text-white font-semibold text-lg mb-2">Delete Student</h3>
            <p className="text-gray-400 text-sm mb-5">This action cannot be undone. The student will be permanently removed.</p>
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

export default AllStudents;
