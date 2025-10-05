// Pages/Client/Authentication/Signup.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
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
    if (!agree) {
      alert("Please accept the Terms and Conditions to continue.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    
    setIsLoading(true);
    // Simulate signup process
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log("Signup data:", formData);
    alert("Signed up successfully!");
    setIsLoading(false);
    navigate("/home");
  };

  // Terms and Conditions Content
  const TermsAndConditions = () => (
    <div className="max-h-[60vh] overflow-y-auto pr-4">
      <h2 className="text-2xl font-bold mb-4 text-cyan-400">Cintracon – Terms & Conditions</h2>
      <p className="text-gray-300 mb-6">
        Welcome to Cintracon, a community platform for students, alumni, and faculty. By signing up, you agree to follow these Terms & Conditions and help us build a respectful, supportive, and professional environment.
      </p>

      <div className="space-y-6 text-sm text-gray-300">
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">1. Account & Authenticity</h3>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Users must provide accurate information during registration.</li>
            <li>Fake profiles, impersonation, or misleading identity is strictly prohibited.</li>
            <li>You are responsible for all activities done under your account.</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-2">2. Respect & Behavior</h3>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Treat all members—students, juniors, seniors, faculty, and alumni—with respect.</li>
            <li>Harassment, bullying, offensive messages, or abusive behavior towards anyone will not be tolerated.</li>
            <li>Discrimination based on gender, religion, race, or personal identity is strictly forbidden.</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-2">3. Content Guidelines</h3>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Do not post or share any adult, violent, or inappropriate material.</li>
            <li>Academic notes, updates, and posts must be educational, professional, and respectful.</li>
            <li>Sharing copyrighted or pirated content without permission is not allowed.</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-2">4. Image & Media Use</h3>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>You may not misuse another user's photo, video, or personal information in any way.</li>
            <li>Upload only your own images or those you have permission to use.</li>
            <li>Any form of image-based harassment or misrepresentation will lead to account suspension.</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-2">5. Note Sharing & Academic Content</h3>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Notes and resources must be original or credited to the rightful owner.</li>
            <li>Do not share restricted exam papers, pirated books, or confidential materials.</li>
            <li>Notes are intended for learning and collaboration, not for resale.</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-2">6. AI Assistance</h3>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>AI-based features are provided to support academic and career growth.</li>
            <li>AI suggestions may not always be 100% accurate—users should verify before relying on them.</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-2">7. Job & Career Opportunities</h3>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Job and internship listings are for information only; Cintracon does not guarantee employment.</li>
            <li>Users must independently verify any opportunity before applying.</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-2">8. Posts, Likes & Comments</h3>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Keep discussions constructive and respectful.</li>
            <li>Offensive language, spamming, or irrelevant promotions are not allowed.</li>
            <li>Scheduled or upcoming posts may be removed if they violate these terms.</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-2">9. Prohibited Activities</h3>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Harassment, stalking, or spreading misinformation.</li>
            <li>Sharing adult, abusive, or illegal content.</li>
            <li>Hacking, exploiting, or attempting to misuse the system.</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-2">10. Privacy & Data Protection</h3>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Your personal information will not be sold to third parties.</li>
            <li>Sensitive data should not be shared publicly on the platform.</li>
            <li>Cintracon is not responsible for user-posted content but reserves the right to remove harmful posts.</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-2">11. Account Suspension & Termination</h3>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Violation of these rules may result in warnings, temporary suspension, or permanent ban.</li>
            <li>Cintracon reserves the right to remove any content or account that harms the community.</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-2">12. Updates to Terms</h3>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>These terms may be updated when necessary.</li>
            <li>Continued use of Cintracon means you accept the latest version of the Terms & Conditions.</li>
          </ul>
        </div>

        <div className="bg-cyan-400/10 border border-cyan-400/20 rounded-lg p-4 mt-4">
          <p className="text-cyan-400 font-semibold text-center">
            ✅ By signing up, you confirm that you have read, understood, and agreed to these Terms & Conditions.
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

      {/* Compact Card - No Scroll Needed */}
      <div className="w-full max-w-md glass-card rounded-2xl shadow-2xl px-4 sm:px-6 py-6 relative bg-gradient-to-br from-[#1e293b]/60 to-[#0f172a]/70 backdrop-blur-xl border border-white/10 transform transition-all duration-500 hover:shadow-cyan-500/10 hover:border-cyan-400/20">
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white/10 to-transparent rounded-t-2xl pointer-events-none animate-gradient-x"></div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400/20 rounded-full animate-float"
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
          {/* Logo Container */}
          <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 p-1 shadow-lg">
            <div className="w-full h-full rounded-full bg-[#1E293B] flex items-center justify-center">
              <img
                src="/logo.png"
                alt="App Logo"
                className="h-6 w-6 object-contain"
              />
            </div>
          </div>
          
          {/* Header Text */}
          <h1 className="text-xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Create Account
          </h1>
          <p className="text-gray-400 text-xs">
            Join our community and start your journey
          </p>
        </div>

        {/* Compact Form */}
        <form onSubmit={handleSubmit} className="space-y-3 relative z-10">
          {/* Full Name & Email Row */}
          <div className="grid grid-cols-1 gap-3">
            <div>
              <label className="block text-xs text-gray-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter full name"
                className="w-full px-3 py-2 text-sm rounded-lg bg-slate-700/40 border border-white/10 text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/20 transition-all duration-300"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                placeholder="you@example.com"
                className="w-full px-3 py-2 text-sm rounded-lg bg-slate-700/40 border border-white/10 text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/20 transition-all duration-300"
              />
            </div>
          </div>

          {/* Department & Semester Row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-300 mb-1">
                Department
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
              </select>
            </div>

            <div>
              <label className="block text-xs text-gray-300 mb-1">
                Semester
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
              </select>
            </div>
          </div>

          {/* Batch */}
          <div>
            <label className="block text-xs text-gray-300 mb-1">
              Batch No
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

          {/* Password & Confirm Password Row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-300 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Password"
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
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm"
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
              Profile Photo (Optional)
            </label>
            <input
              type="file"
              name="profilePhoto"
              accept="image/*"
              onChange={handleInputChange}
              className="w-full px-3 py-2 text-sm rounded-lg bg-slate-700/40 border border-white/10 text-white file:mr-2 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-medium file:bg-cyan-500/20 file:text-cyan-300 hover:file:bg-cyan-500/30 transition-all duration-300 cursor-pointer"
            />
          </div>

          {/* Terms Agreement */}
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
                  Terms & Conditions
                </button>
              </span>
            </label>
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2.5 rounded-lg font-semibold text-gray-900 bg-gradient-to-r from-cyan-400 to-blue-500 shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 ${
              isLoading ? "opacity-70 cursor-not-allowed" : "hover:shadow-cyan-500/25"
            } relative overflow-hidden group mt-2`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            
            <span className="relative z-10 text-sm">
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin mr-2"></div>
                  Creating...
                </div>
              ) : (
                "Create Account"
              )}
            </span>
          </button>
        </form>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-gray-700/50 text-center text-xs text-gray-400">
          <div className="mb-2">
            Already have an account?{" "}
            <Link 
              to="/login" 
              className="text-cyan-400 hover:text-cyan-300 transition-colors duration-200"
            >
              Login Here
            </Link>
          </div>
        </div>
      </div>

      {/* Terms and Conditions Modal */}
      {showTerms && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl border border-white/10 shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-b border-white/10 p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Terms & Conditions</h2>
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
              <TermsAndConditions />
            </div>

            {/* Modal Footer */}
            <div className="border-t border-white/10 p-6 bg-gradient-to-t from-black/20 to-transparent">
              <div className="flex justify-end">
                <button
                  onClick={() => setShowTerms(false)}
                  className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
                >
                  I Understand
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

export default Signup;