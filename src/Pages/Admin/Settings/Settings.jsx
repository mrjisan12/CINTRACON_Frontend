import React, { useState, useEffect } from "react";
import { getAdminSettings, updateAdminSettings } from "../../../api/adminApi";
import { toast } from "react-toastify";

const ALL_DEPARTMENTS = ["CSE", "EEE", "Pharm", "Civil", "Eng", "BBA", "LLB", "MSC", "MBA"];

const Settings = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    site_name: "CINTRACON",
    allow_signup: true,
    max_file_size_mb: 10,
    allowed_departments: [],
    maintenance_mode: false,
  });

  useEffect(() => {
    getAdminSettings()
      .then(res => { if (res.data.success) setForm(res.data.data); })
      .catch(() => toast.error("Failed to load settings"))
      .finally(() => setLoading(false));
  }, []);

  const toggleDept = (dept) => {
    setForm(f => ({
      ...f,
      allowed_departments: f.allowed_departments.includes(dept)
        ? f.allowed_departments.filter(d => d !== dept)
        : [...f.allowed_departments, dept]
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await updateAdminSettings(form);
      if (res.data.success) toast.success("Settings saved");
    } catch { toast.error("Failed to save settings"); }
    finally { setSaving(false); }
  };

  if (loading) {
    return (
      <div className="space-y-6 max-w-2xl">
        <div className="h-8 w-32 bg-[#232A36] rounded animate-pulse" />
        <div className="h-64 bg-[#181a20] border border-[#232A36] rounded-xl animate-pulse" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-gray-400 text-sm mt-1">Configure platform settings</p>
      </div>

      <div className="bg-[#181a20] border border-[#232A36] rounded-xl divide-y divide-[#232A36]">
        {/* Site Name */}
        <div className="p-5">
          <label className="text-white text-sm font-medium block mb-1">Site Name</label>
          <p className="text-gray-400 text-xs mb-3">The name displayed across the platform</p>
          <input value={form.site_name} onChange={e => setForm(f => ({ ...f, site_name: e.target.value }))}
            className="w-full max-w-sm px-3 py-2 bg-[#232A36] border border-[#2d3748] rounded-lg text-white text-sm focus:outline-none focus:border-blue-500" />
        </div>

        {/* Max File Size */}
        <div className="p-5">
          <label className="text-white text-sm font-medium block mb-1">Max Upload Size (MB)</label>
          <p className="text-gray-400 text-xs mb-3">Maximum file size allowed for uploads</p>
          <input type="number" min={1} max={100} value={form.max_file_size_mb}
            onChange={e => setForm(f => ({ ...f, max_file_size_mb: parseInt(e.target.value) || 10 }))}
            className="w-32 px-3 py-2 bg-[#232A36] border border-[#2d3748] rounded-lg text-white text-sm focus:outline-none focus:border-blue-500" />
        </div>

        {/* Allow Signup */}
        <div className="p-5 flex items-center justify-between">
          <div>
            <p className="text-white text-sm font-medium">Allow New Signups</p>
            <p className="text-gray-400 text-xs mt-0.5">Allow new students to register</p>
          </div>
          <button onClick={() => setForm(f => ({ ...f, allow_signup: !f.allow_signup }))}
            className={`w-12 h-6 rounded-full transition-colors relative ${form.allow_signup ? "bg-blue-600" : "bg-[#2d3748]"}`}>
            <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform shadow ${form.allow_signup ? "translate-x-6" : "translate-x-0.5"}`} />
          </button>
        </div>

        {/* Allowed Departments */}
        <div className="p-5">
          <p className="text-white text-sm font-medium mb-1">Allowed Departments</p>
          <p className="text-gray-400 text-xs mb-3">Departments students can register under</p>
          <div className="flex flex-wrap gap-2">
            {ALL_DEPARTMENTS.map(dept => {
              const active = form.allowed_departments?.includes(dept);
              return (
                <button key={dept} onClick={() => toggleDept(dept)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${active ? "bg-blue-600 text-white" : "bg-[#232A36] text-gray-400 hover:text-white"}`}>
                  {dept}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <button onClick={handleSave} disabled={saving}
        className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition disabled:opacity-60">
        {saving ? "Saving..." : "Save Settings"}
      </button>
    </div>
  );
};

export default Settings;
