import React, { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import { getAdminReports, resolveAdminReport } from "../../../api/adminApi";
import { toast } from "react-toastify";

const ACTIONS = [
  { value: "delete_post", label: "Delete Post", color: "text-red-400" },
  { value: "warn_user",   label: "Warn User",   color: "text-yellow-400" },
  { value: "dismiss",     label: "Dismiss",     color: "text-gray-400" },
];

const ReportsManage = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resolving, setResolving] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  useEffect(() => {
    getAdminReports()
      .then(res => { if (res.data.success) setReports(res.data.data); })
      .catch(() => toast.error("Failed to load reports"))
      .finally(() => setLoading(false));
  }, []);

  const handleResolve = async (reportId, action) => {
    setResolving(reportId);
    setDropdownOpen(null);
    try {
      const res = await resolveAdminReport(reportId, action);
      if (res.data.success) {
        toast.success(res.data.msg || "Report resolved");
        setReports(prev => prev.filter(r => r.id !== reportId));
      }
    } catch { toast.error("Failed to resolve report"); }
    finally { setResolving(null); }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Reports</h1>
        <p className="text-gray-400 text-sm mt-1">Review and resolve reported content</p>
      </div>

      {loading ? (
        <div className="bg-[#181a20] border border-[#232A36] rounded-xl overflow-hidden">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="px-4 py-4 border-b border-[#232A36] last:border-0">
              <div className="h-4 bg-[#232A36] rounded animate-pulse w-3/4 mb-2" />
              <div className="h-3 bg-[#232A36] rounded animate-pulse w-1/2" />
            </div>
          ))}
        </div>
      ) : reports.length === 0 ? (
        <div className="bg-[#181a20] border border-[#232A36] rounded-xl p-12 text-center">
          <p className="text-gray-500">No pending reports</p>
          <p className="text-gray-600 text-sm mt-1">All reports have been resolved</p>
        </div>
      ) : (
        <div className="bg-[#181a20] border border-[#232A36] rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px]">
              <thead className="bg-[#13151a] border-b border-[#232A36]">
                <tr>
                  {["Post Content", "Reported By", "Reason", "Date", "Action"].map(h => (
                    <th key={h} className="text-left text-gray-400 text-xs font-semibold uppercase tracking-wider px-4 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#232A36]">
                {reports.map(r => (
                  <tr key={r.id} className="hover:bg-[#1e2028] transition-colors">
                    <td className="px-4 py-3 max-w-[200px]">
                      <p className="text-white text-sm truncate">{r.post_content || "—"}</p>
                    </td>
                    <td className="px-4 py-3 text-gray-300 text-sm whitespace-nowrap">{r.reported_by || "—"}</td>
                    <td className="px-4 py-3 text-gray-300 text-sm max-w-[160px]">
                      <p className="truncate">{r.reason || "—"}</p>
                    </td>
                    <td className="px-4 py-3 text-gray-400 text-sm whitespace-nowrap">
                      {r.created_at ? new Date(r.created_at).toLocaleDateString() : "—"}
                    </td>
                    <td className="px-4 py-3 relative">
                      {resolving === r.id ? (
                        <span className="text-gray-400 text-sm">Resolving...</span>
                      ) : (
                        <div className="relative inline-block">
                          <button
                            onClick={() => setDropdownOpen(dropdownOpen === r.id ? null : r.id)}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#232A36] hover:bg-[#2a3040] text-gray-300 text-sm rounded-lg transition">
                            Resolve <FaChevronDown className="text-xs" />
                          </button>
                          {dropdownOpen === r.id && (
                            <div className="absolute right-0 top-9 w-40 bg-[#232A36] border border-[#2d3748] rounded-xl shadow-xl py-1 z-20">
                              {ACTIONS.map(a => (
                                <button key={a.value}
                                  onClick={() => handleResolve(r.id, a.value)}
                                  className={`w-full text-left px-4 py-2 text-sm hover:bg-[#2a3040] transition ${a.color}`}>
                                  {a.label}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportsManage;
