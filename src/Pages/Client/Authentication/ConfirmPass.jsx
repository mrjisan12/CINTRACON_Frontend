import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { resetPassword } from "../../../api/authApi";
import { Link } from "react-router-dom";

const ConfirmPass = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const email = location.state?.email || "";

  useEffect(() => {
    if (!email) navigate("/otp");
  }, [email, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords don't match!");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long!");
      return;
    }

    setIsLoading(true);
    try {
      const response = await resetPassword({
        email,
        new_password: password,
        new_password_confirmation: confirmPassword,
      });

      const { success, msg } = response.data;

      if (success) {
        toast.success(msg || "Password reset successful!");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        toast.error(msg || "Failed to reset password.");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.msg || "An error occurred. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!email)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b]">
        <div className="text-white">Loading...</div>
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

      {/* Card */}
      <div className="w-full max-w-md glass-card rounded-2xl shadow-2xl px-6 sm:px-8 md:px-10 py-8 sm:py-10 md:py-12 relative bg-gradient-to-br from-[#1e293b]/60 to-[#0f172a]/70 backdrop-blur-xl border border-white/10">
        <div className="absolute top-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-b from-white/10 to-transparent rounded-t-2xl pointer-events-none"></div>

        <div className="text-center mb-8 sm:mb-10 relative z-10">
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 p-1 shadow-lg">
            <div className="w-full h-full rounded-full bg-[#1E293B] flex items-center justify-center">
              <img
                src="/logo.png"
                alt="App Logo"
                className="h-8 w-8 sm:h-10 sm:w-10 object-contain"
              />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Reset Password
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm">
            Create your new password for
          </p>
          <p className="text-cyan-400 text-sm font-medium">{email}</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          {/* New Password */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">
              New Password
            </label>
            <div className="relative group">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full px-4 py-3 rounded-xl bg-slate-700/40 border border-white/10 text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all duration-300 text-sm sm:text-base"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-cyan-400 transition-colors duration-200"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Confirm Password
            </label>
            <div className="relative group">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="w-full px-4 py-3 rounded-xl bg-slate-700/40 border border-white/10 text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all duration-300 text-sm sm:text-base"
              />
              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                className="absolute right-3 top-3 text-gray-400 hover:text-cyan-400 transition-colors duration-200"
              >
                {showConfirmPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {/* Reset Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 rounded-xl font-semibold text-gray-900 bg-gradient-to-r from-cyan-400 to-blue-500 shadow-lg hover:shadow-xl hover:scale-105 transition-transform ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            } relative overflow-hidden group`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            <span className="relative z-10 text-sm sm:text-base">
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin mr-2"></div>
                  Resetting...
                </div>
              ) : (
                "Reset Password"
              )}
            </span>
          </button>
        </form>

        {/* Footer */} 
        <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-700/50 text-center text-xs sm:text-sm text-gray-400"> 
          <Link to="/login" className="text-cyan-400 hover:underline">
          Back to Login
          </Link> 
        </div>

      </div>
    </div>
  );
};

export default ConfirmPass;
