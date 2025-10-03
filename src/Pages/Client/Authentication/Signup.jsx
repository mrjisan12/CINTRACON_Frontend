// Pages/Client/Authentication/Signup.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [agree, setAgree] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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

      {/* Card */}
      <div className="w-full max-w-md glass-card rounded-2xl shadow-2xl px-6 sm:px-8 md:px-10 py-8 sm:py-10 md:py-12 relative bg-gradient-to-br from-[#1e293b]/60 to-[#0f172a]/70 backdrop-blur-xl border border-white/10 transform transition-all duration-500 hover:shadow-cyan-500/10 hover:border-cyan-400/20">
        <div className="absolute top-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-b from-white/10 to-transparent rounded-t-2xl pointer-events-none animate-gradient-x"></div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 sm:w-2 sm:h-2 bg-cyan-400/20 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${10 + Math.random() * 10}s`
              }}
            />
          ))}
        </div>

        <div className="text-center mb-8 sm:mb-10 relative z-10">
          {/* Logo Container */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 p-1 shadow-lg transform transition-transform duration-300 hover:scale-110 hover:rotate-3">
            <div className="w-full h-full rounded-full bg-[#1E293B] flex items-center justify-center backdrop-blur-sm">
              <div className="relative">
                <img
                  src="/logo.png"
                  alt="App Logo"
                  className="h-8 w-8 sm:h-10 sm:w-10 object-contain transform transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 rounded-full bg-cyan-400/20 animate-ping opacity-75"></div>
              </div>
            </div>
          </div>
          
          {/* Header Text */}
          <h1 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent animate-gradient-x">
            Create Account
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm animate-fade-in">
            Join our community and start your journey
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 relative z-10">
          {/* Full Name */}
          <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <label className="block text-sm text-gray-300 mb-2">
              Full Name
            </label>
            <div className="relative group">
              <input
                type="text"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 rounded-xl bg-slate-700/40 border border-white/10 text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 group-hover:border-cyan-400/30 shadow-lg text-sm sm:text-base"
              />
            </div>
          </div>

          {/* Email */}
          <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <label className="block text-sm text-gray-300 mb-2">
              Email Address
            </label>
            <div className="relative group">
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl bg-slate-700/40 border border-white/10 text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 group-hover:border-cyan-400/30 shadow-lg text-sm sm:text-base"
              />
            </div>
          </div>

          {/* Department & Semester Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-slide-up" style={{ animationDelay: "0.3s" }}>
            {/* Department */}
            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Department
              </label>
              <select
                name="department"
                required
                value={formData.department}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl bg-slate-700/40 border border-white/10 text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 appearance-none cursor-pointer text-sm sm:text-base"
              >
                <option value="" className="bg-slate-800">Select Department</option>
                <option value="Computer Science" className="bg-slate-800">Computer Science</option>
                <option value="EEE" className="bg-slate-800">Electrical & Electronics</option>
                <option value="Business" className="bg-slate-800">Business</option>
                <option value="Mathematics" className="bg-slate-800">Mathematics</option>
              </select>
            </div>

            {/* Semester */}
            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Semester
              </label>
              <select
                name="semester"
                required
                value={formData.semester}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl bg-slate-700/40 border border-white/10 text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 appearance-none cursor-pointer text-sm sm:text-base"
              >
                <option value="" className="bg-slate-800">Select Semester</option>
                {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                  <option key={sem} value={sem} className="bg-slate-800">Semester {sem}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Batch */}
          <div className="animate-slide-up" style={{ animationDelay: "0.4s" }}>
            <label className="block text-sm text-gray-300 mb-2">
              Batch No
            </label>
            <div className="relative group">
              <input
                type="text"
                name="batch"
                required
                value={formData.batch}
                onChange={handleInputChange}
                placeholder="Enter your batch number"
                className="w-full px-4 py-3 rounded-xl bg-slate-700/40 border border-white/10 text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 group-hover:border-cyan-400/30 shadow-lg text-sm sm:text-base"
              />
            </div>
          </div>

          {/* Password */}
          <div className="animate-slide-up" style={{ animationDelay: "0.5s" }}>
            <label className="block text-sm text-gray-300 mb-2">
              Password
            </label>
            <div className="relative group">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Create your password"
                className="w-full px-4 py-3 rounded-xl bg-slate-700/40 border border-white/10 text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 group-hover:border-cyan-400/30 shadow-lg text-sm sm:text-base"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-cyan-400 transition-colors duration-200 transform hover:scale-110"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="animate-slide-up" style={{ animationDelay: "0.6s" }}>
            <label className="block text-sm text-gray-300 mb-2">
              Confirm Password
            </label>
            <div className="relative group">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm your password"
                className="w-full px-4 py-3 rounded-xl bg-slate-700/40 border border-white/10 text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 group-hover:border-cyan-400/30 shadow-lg text-sm sm:text-base"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-cyan-400 transition-colors duration-200 transform hover:scale-110"
              >
                {showConfirmPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {/* Profile Photo */}
          <div className="animate-slide-up" style={{ animationDelay: "0.7s" }}>
            <label className="block text-sm text-gray-300 mb-2">
              Profile Photo
            </label>
            <div className="relative group">
              <input
                type="file"
                name="profilePhoto"
                accept="image/*"
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl bg-slate-700/40 border border-white/10 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-cyan-500/20 file:text-cyan-300 hover:file:bg-cyan-500/30 transition-all duration-300 cursor-pointer text-sm sm:text-base"
              />
            </div>
          </div>

          {/* Terms Agreement */}
          <div className="flex items-start gap-3 pt-2 animate-slide-up" style={{ animationDelay: "0.8s" }}>
            <label className="inline-flex cursor-pointer items-center gap-3 select-none group min-h-[24px]">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                  className="h-4 w-4 sm:h-5 sm:w-5 rounded border-white/20 bg-slate-800/40 backdrop-blur-xl text-cyan-400 focus:ring-cyan-300/50 transition-all duration-200"
                />
                <div className="absolute inset-0 rounded bg-cyan-400/20 opacity-0 scale-150 transition-all duration-200 group-hover:opacity-100"></div>
              </div>
              <span className="text-xs sm:text-sm text-slate-300 transition-colors duration-200 group-hover:text-slate-200">
                I accept the{" "}
                <a href="/terms" className="text-cyan-400 hover:text-cyan-300 hover:underline">
                  Terms and Conditions
                </a>
              </span>
            </label>
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 rounded-xl font-semibold text-gray-900 bg-gradient-to-r from-cyan-400 to-blue-500 shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl active:scale-95 ${
              isLoading ? "opacity-70 cursor-not-allowed" : "hover:shadow-cyan-500/25"
            } relative overflow-hidden group animate-slide-up`}
            style={{ animationDelay: "0.9s" }}
          >
            {/* Button Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            
            {/* Button Text */}
            <span className="relative z-10 text-sm sm:text-base">
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin mr-2"></div>
                  Creating Account...
                </div>
              ) : (
                "Create Account"
              )}
            </span>
          </button>
        </form>

        {/* Footer - REMOVED "Back to Landing Page" */}
        <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-700/50 text-center text-xs sm:text-sm text-gray-400">
          <div className="mb-3 sm:mb-4">
            Already have an account?{" "}
            <Link 
              to="/login" 
              className="text-cyan-400 hover:text-cyan-300 transition-colors duration-200 relative group"
            >
              <span className="relative">
                Login Here
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(180deg); }
        }
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes slide-up {
          from { 
            opacity: 0;
            transform: translateY(15px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
          opacity: 0;
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        .glass-card {
          backdrop-filter: blur(16px) saturate(180%);
          -webkit-backdrop-filter: blur(16px) saturate(180%);
        }

        /* Enhanced responsive design */
        @media (max-width: 640px) {
          .animate-float {
            animation-duration: 8s;
          }
        }

        @media (max-width: 480px) {
          .animate-float {
            animation-duration: 10s;
          }
        }

        /* Focus styles for better accessibility */
        input:focus, button:focus, select:focus {
          outline: 2px solid rgba(59, 130, 246, 0.5);
          outline-offset: 2px;
        }

        /* Prevent zoom on iOS input focus */
        @media screen and (max-width: 768px) {
          input, select, textarea {
            font-size: 16px !important;
          }
        }

        /* Enhanced touch targets for mobile */
        @media (max-width: 768px) {
          button, 
          input[type="checkbox"],
          a {
            min-height: 44px;
            min-width: 44px;
          }
        }

        /* Custom select styling */
        select {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
          background-position: right 0.5rem center;
          background-repeat: no-repeat;
          background-size: 1.5em 1.5em;
          padding-right: 2.5rem;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
      `}</style>
    </div>
  );
};

export default Signup;