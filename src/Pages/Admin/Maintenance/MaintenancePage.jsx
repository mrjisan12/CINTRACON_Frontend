import React, { useState, useEffect } from "react";
import { FaTools } from "react-icons/fa";
import { getMaintenanceStatus, updateMaintenanceStatus, createMaintenanceStatus } from "../../../api/maintenanceApi";
import { useMaintenance } from "../../../contexts/MaintenanceContext";
import { toast } from "react-toastify";

const MaintenancePage = () => {
  const { refreshMaintenanceStatus } = useMaintenance();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [exists, setExists] = useState(false);
  const [status, setStatus] = useState(false);
  const [reason, setReason] = useState("");

  useEffect(() => {
    getMaintenanceStatus()
      .then(res => {
        if (res.data.success && res.data.data) {
          setStatus(res.data.data.status || false);
          setReason(res.data.data.reason || "");
          setExists(!!res.data.data.id);
        }
      })
      .catch(() => toast.error("Failed to load maintenance status"))
      .finally(() => setLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchStatus = () =>
    getMaintenanceStatus()
      .then(res => {
        if (res.data.success && res.data.data) {
          setStatus(res.data.data.status || false);
          setReason(res.data.data.reason || "");
          setExists(!!res.data.data.id);
        }
      });

  const handleSave = async () => {
    setSaving(true);
    try {
      const fn = exists ? updateMaintenanceStatus : createMaintenanceStatus;
      const res = await fn({ status, reason });
      if (res.data.success) {
        toast.success("Maintenance status updated");
        // Re-fetch to confirm actual saved state in DB
        await fetchStatus();
        // Notify the global context so it re-polls immediately
        refreshMaintenanceStatus();
      }
    } catch { toast.error("Failed to update maintenance status"); }
    finally { setSaving(false); }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 bg-[#232A36] rounded animate-pulse" />
        <div className="h-48 bg-[#181a20] border border-[#232A36] rounded-xl animate-pulse" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-white">Maintenance</h1>
        <p className="text-gray-400 text-sm mt-1">Control platform maintenance mode</p>
      </div>

      <div className="bg-[#181a20] border border-[#232A36] rounded-xl p-6 space-y-6">
        {/* Status Banner */}
        <div className={`flex items-center gap-3 p-4 rounded-xl border ${status ? "bg-red-500/10 border-red-500/30" : "bg-green-500/10 border-green-500/30"}`}>
          <FaTools className={`text-xl ${status ? "text-red-400" : "text-green-400"}`} />
          <div>
            <p className={`font-semibold ${status ? "text-red-400" : "text-green-400"}`}>
              {status ? "Maintenance Mode is ON" : "Platform is Running Normally"}
            </p>
            <p className="text-gray-400 text-sm mt-0.5">
              {status ? "All non-admin users will see a maintenance notice." : "All users can access the platform."}
            </p>
          </div>
        </div>

        {/* Toggle */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white font-medium">Enable Maintenance Mode</p>
            <p className="text-gray-400 text-sm mt-0.5">Non-admin users will be blocked from using the platform</p>
          </div>
          <button
            onClick={() => setStatus(s => !s)}
            className={`w-14 h-7 rounded-full transition-colors relative ${status ? "bg-red-500" : "bg-[#2d3748]"}`}
          >
            <div className={`absolute top-0.5 w-6 h-6 rounded-full bg-white transition-transform shadow ${status ? "translate-x-7" : "translate-x-0.5"}`} />
          </button>
        </div>

        {/* Reason */}
        <div>
          <label className="text-gray-400 text-xs font-medium mb-1.5 block">Reason / Message (shown to users)</label>
          <textarea
            value={reason}
            onChange={e => setReason(e.target.value)}
            placeholder="e.g. System upgrade in progress. We'll be back shortly."
            rows={3}
            className="w-full px-3 py-2 bg-[#232A36] border border-[#2d3748] rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 placeholder-gray-500 resize-none"
          />
        </div>

        <button onClick={handleSave} disabled={saving}
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition disabled:opacity-60">
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default MaintenancePage;
