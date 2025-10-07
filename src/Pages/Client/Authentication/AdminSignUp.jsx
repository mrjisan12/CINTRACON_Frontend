// Pages/Admin/Authentication/AdminSignup.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminSignup = () => {
  const navigate = useNavigate();
  const [agree, setAgree] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    department: "",
    semester: "",
    batch: "",
    adminSecretCode: "",
    password: "",
    confirmPassword: "",
    profilePhoto: null
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate admin secret code (in real app, this should be from environment variables)
    const validSecretCodes = ["ADMIN2024", "CINTRACON_ADMIN", "SUPER_ADMIN_123"];
    if (!validSecretCodes.includes(formData.adminSecretCode)) {
      alert("Invalid Admin Secret Code! Access denied.");
      return;
    }
    
    if (!agree) {
      alert("Please accept the Admin Terms and Conditions to continue.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    
    setIsLoading(true);
    // Simulate admin signup process
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log("Admin Signup data:", formData);
    alert("🎉 Admin account created successfully! Welcome to Cintracon Admin Panel.");
    setIsLoading(false);
    navigate("/admin/dashboard");
  };

  // Custom Admin Terms and Conditions for Cintracon Platform
  const AdminTermsAndConditions = () => (
    <div className="max-h-[60vh] overflow-y-auto pr-4">
      <h2 className="text-2xl font-bold mb-4 text-cyan-400">Cintracon – Administrator Terms & Conditions</h2>
      <p className="text-gray-300 mb-6">
        Welcome to Cintracon Admin Panel. As an administrator, you are entrusted with elevated privileges and responsibilities to maintain the integrity of our educational platform.
      </p>

      <div className="space-y-6 text-sm text-gray-300">
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">1. Administrator Access & Security</h3>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Admin accounts require special authorization and secret codes for registration</li>
            <li>Keep admin credentials strictly confidential - do not share login details</li>
            <li>Use strong passwords and enable two-factor authentication when available</li>
            <li>Log out from admin panel after each session, especially on shared devices</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-2">2. Content Moderation Responsibilities</h3>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Review and moderate user-generated content including posts, comments, and notes</li>
            <li>Remove inappropriate, offensive, or academic integrity-violating content</li>
            <li>Ensure all shared educational materials comply with copyright laws</li>
            <li>Monitor AI-generated content for accuracy and appropriateness</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-2">3. User Management</h3>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Handle user reports and take appropriate action against violations</li>
            <li>Temporarily suspend or permanently ban users who breach platform rules</li>
            <li>Verify user identities and academic credentials when necessary</li>
            <li>Manage department, batch, and semester information accuracy</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-2">4. Academic Integrity Enforcement</h3>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Ensure shared notes and materials don't violate academic honesty policies</li>
            <li>Remove leaked exam papers, assignment solutions, or confidential materials</li>
            <li>Monitor for plagiarism and unauthorized content sharing</li>
            <li>Promote ethical use of AI assistance features</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-2">5. Data Privacy & Confidentiality</h3>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Protect user data and maintain strict confidentiality</li>
            <li>Access user information only for legitimate moderation purposes</li>
            <li>Do not disclose personal user information to third parties</li>
            <li>Follow data protection regulations and platform privacy policies</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-2">6. Platform Management</h3>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Manage job postings and career opportunity listings</li>
            <li>Verify the authenticity of company postings and internship opportunities</li>
            <li>Monitor discussion forums for constructive academic discourse</li>
            <li>Update academic resources and department information</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-2">7. Professional Conduct</h3>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Maintain impartiality and fairness in all moderation decisions</li>
            <li>Provide clear explanations when taking action against content or users</li>
            <li>Respond to user appeals and support requests professionally</li>
            <li>Lead by example in maintaining platform decorum</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-2">8. Emergency Protocols</h3>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Immediately address security breaches or platform abuse</li>
            <li>Follow established protocols for serious violations</li>
            <li>Coordinate with technical team for system emergencies</li>
            <li>Maintain communication channels with super administrators</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-2">9. Prohibited Actions</h3>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Do not abuse admin privileges for personal gain</li>
            <li>Never modify user data without proper justification</li>
            <li>Avoid conflicts of interest in moderation decisions</li>
            <li>Do not share internal admin tools or procedures</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-2">10. Agreement & Compliance</h3>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>These terms may be updated as platform policies evolve</li>
            <li>Continued admin access implies acceptance of updated terms</li>
            <li>Violation of these terms may result in admin privilege revocation</li>
            <li>Regular training and updates will be provided for admin staff</li>
          </ul>
        </div>

        <div className="bg-cyan-400/10 border border-cyan-400/20 rounded-lg p-4 mt-4">
          <p className="text-cyan-400 font-semibold text-center">
            🔐 By proceeding, you acknowledge the significant responsibility of admin access and agree to uphold the highest standards of platform management.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] relative overflow-hidden p-4">
      {/* Background Glow */}
      <div className="absolute -top-10 -left-10 md:-top-20 md:-left-20 w-40 h-40 md:w-64 md:h-64 rounded-full bg-cyan-400 opacity-10 blur-3xl animate-pulse"></div>
      <div
        className="absolute -bottom-10 -right-10 md:-bottom-20 md:-right-20 w-40 h-40 md:w-64 md:h-64 rounded-full bg-blue-500 opacity-10 blur-3xl animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 md:w-80 md:h-80 rounded-full bg-purple-500 opacity-5 blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>

      {/* Admin Signup Card */}
      <div className="w-full max-w-md glass-card rounded-2xl shadow-2xl px-4 sm:px-6 py-6 relative bg-gradient-to-br from-[#1e293b]/60 to-[#0f172a]/70 backdrop-blur-xl border border-cyan-400/20 transform transition-all duration-500 hover:shadow-cyan-500/20 hover:border-cyan-400/30">
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-cyan-400/10 to-transparent rounded-t-2xl pointer-events-none animate-gradient-x"></div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400/30 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${10 + Math.random() * 10}s`
              }}
            />
          ))}
        </div>

        <div className="text-center mb-6 relative z-10">
          {/* Admin Logo Container */}
          <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 p-1 shadow-lg shadow-cyan-500/25">
            <div className="w-full h-full rounded-full bg-[#1E293B] flex items-center justify-center">
              <div className="text-cyan-400 font-bold text-lg">⚡</div>
            </div>
          </div>
          
          {/* Header Text */}
          <h1 className="text-xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Admin Registration
          </h1>
          <p className="text-gray-400 text-xs">
            Elevated access for platform administrators
          </p>
        </div>

        {/* Admin Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-3 relative z-10">
          {/* Full Name & Email Row */}
          <div className="grid grid-cols-1 gap-3">
            <div>
              <label className="block text-xs text-gray-300 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter admin full name"
                className="w-full px-3 py-2 text-sm rounded-lg bg-slate-700/40 border border-white/10 text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/20 transition-all duration-300"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-300 mb-1">
                Email *
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                placeholder="admin@cintracon.com"
                className="w-full px-3 py-2 text-sm rounded-lg bg-slate-700/40 border border-white/10 text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/20 transition-all duration-300"
              />
            </div>
          </div>

          {/* Department & Semester Row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-300 mb-1">
                Department *
              </label>
              <select
                name="department"
                required
                value={formData.department}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-sm rounded-lg bg-slate-700/40 border border-white/10 text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/20 transition-all duration-300 appearance-none"
              >
                <option value="" className="bg-slate-800">Department</option>
                <option value="Computer Science" className="bg-slate-800">CSE</option>
                <option value="EEE" className="bg-slate-800">EEE</option>
                <option value="Business" className="bg-slate-800">Business</option>
                <option value="Mathematics" className="bg-slate-800">Mathematics</option>
                <option value="Administration" className="bg-slate-800">Administration</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-gray-300 mb-1">
                Semester *
              </label>
              <select
                name="semester"
                required
                value={formData.semester}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-sm rounded-lg bg-slate-700/40 border border-white/10 text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/20 transition-all duration-300 appearance-none"
              >
                <option value="" className="bg-slate-800">Semester</option>
                {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                  <option key={sem} value={sem} className="bg-slate-800">Sem {sem}</option>
                ))}
                <option value="Graduated" className="bg-slate-800">Graduated</option>
                <option value="Faculty" className="bg-slate-800">Faculty</option>
              </select>
            </div>
          </div>

          {/* Batch & Admin Secret Code Row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-300 mb-1">
                Batch *
              </label>
              <input
                type="text"
                name="batch"
                required
                value={formData.batch}
                onChange={handleInputChange}
                placeholder="Batch number"
                className="w-full px-3 py-2 text-sm rounded-lg bg-slate-700/40 border border-white/10 text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/20 transition-all duration-300"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-300 mb-1">
                Admin Code *
              </label>
              <input
                type="password"
                name="adminSecretCode"
                required
                value={formData.adminSecretCode}
                onChange={handleInputChange}
                placeholder="Secret code"
                className="w-full px-3 py-2 text-sm rounded-lg bg-slate-700/40 border border-white/10 text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/20 transition-all duration-300"
              />
            </div>
          </div>

          {/* Password & Confirm Password Row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-300 mb-1">
                Password *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Admin password"
                  className="w-full px-3 py-2 text-sm rounded-lg bg-slate-700/40 border border-white/10 text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/20 transition-all duration-300 pr-8"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-2 text-gray-400 hover:text-cyan-400 transition-colors duration-200 text-xs"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs text-gray-300 mb-1">
                Confirm Password *
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm password"
                  className="w-full px-3 py-2 text-sm rounded-lg bg-slate-700/40 border border-white/10 text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/20 transition-all duration-300 pr-8"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-2 top-2 text-gray-400 hover:text-cyan-400 transition-colors duration-200 text-xs"
                >
                  {showConfirmPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>
          </div>

          {/* Profile Photo */}
          <div>
            <label className="block text-xs text-gray-300 mb-1">
              Admin Profile Photo
            </label>
            <input
              type="file"
              name="profilePhoto"
              accept="image/*"
              onChange={handleInputChange}
              className="w-full px-3 py-2 text-sm rounded-lg bg-slate-700/40 border border-white/10 text-white file:mr-2 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-medium file:bg-cyan-500/20 file:text-cyan-300 hover:file:bg-cyan-500/30 transition-all duration-300 cursor-pointer"
            />
          </div>

          {/* Admin Terms Agreement */}
          <div className="flex items-start gap-2 pt-1">
            <label className="inline-flex cursor-pointer items-center gap-2 select-none">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="h-3 w-3 rounded border-white/20 bg-slate-800/40 text-cyan-400 focus:ring-cyan-300/30"
              />
              <span className="text-xs text-slate-300">
                I accept the{" "}
                <button 
                  type="button"
                  onClick={() => setShowTerms(true)}
                  className="text-cyan-400 hover:text-cyan-300 hover:underline focus:outline-none"
                >
                  Admin Terms & Conditions
                </button>
              </span>
            </label>
          </div>

          {/* Admin Signup Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2.5 rounded-lg font-semibold text-gray-900 bg-gradient-to-r from-cyan-400 to-blue-500 shadow-lg shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105 active:scale-95 ${
              isLoading ? "opacity-70 cursor-not-allowed" : "hover:shadow-cyan-500/40"
            } relative overflow-hidden group mt-2`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            
            <span className="relative z-10 text-sm">
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin mr-2"></div>
                  Creating Admin Account...
                </div>
              ) : (
                "Create Admin Account"
              )}
            </span>
          </button>
        </form>

        {/* Footer - Login related content removed */}
        <div className="mt-4 pt-3 border-t border-gray-700/50 text-center text-xs text-gray-400">
          <p>
            For admin account assistance, contact system administrator
          </p>
        </div>
      </div>

      {/* Admin Terms and Conditions Modal */}
      {showTerms && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl border border-cyan-400/20 shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-b border-cyan-400/20 p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Admin Terms & Conditions</h2>
                <button
                  onClick={() => setShowTerms(false)}
                  className="text-gray-400 hover:text-white transition-colors duration-200 p-2 rounded-lg hover:bg-white/10"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <AdminTermsAndConditions />
            </div>

            {/* Modal Footer */}
            <div className="border-t border-cyan-400/20 p-6 bg-gradient-to-t from-black/20 to-transparent">
              <div className="flex justify-end">
                <button
                  onClick={() => setShowTerms(false)}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg shadow-cyan-500/25"
                >
                  I Accept & Understand
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-5px) rotate(180deg); }
        }
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
        .glass-card {
          backdrop-filter: blur(16px) saturate(180%);
          -webkit-backdrop-filter: blur(16px) saturate(180%);
        }

        /* Custom scrollbar for terms modal */
        .max-h-\\[60vh\\]::-webkit-scrollbar {
          width: 6px;
        }
        .max-h-\\[60vh\\]::-webkit-scrollbar-track {
          background: #1e293b;
          border-radius: 3px;
        }
        .max-h-\\[60vh\\]::-webkit-scrollbar-thumb {
          background: #0ea5e9;
          border-radius: 3px;
        }

        /* Custom select styling */
        select {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
          background-position: right 0.5rem center;
          background-repeat: no-repeat;
          background-size: 1em 1em;
          padding-right: 2rem;
        }
      `}</style>
    </div>
  );
};

export default AdminSignup;