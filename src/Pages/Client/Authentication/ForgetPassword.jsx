// Pages/Client/Authentication/ForgetPassword.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Email validation
    if (!email) {
      alert("Please enter your email address");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    
    // Simulate API call to send OTP
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log("OTP sent to:", email);
    setIsLoading(false);
    
    // ✅ FIXED: Use navigate with state instead of URL params
    navigate("/otp", { state: { email: email } });
    
    // ✅ ALTERNATIVE: You can also use URL params like this:
    // navigate(`/otp?email=${encodeURIComponent(email)}`);
  };

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
          {/* Logo */}
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
            Forgot Password?
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm">
            Enter your email to receive OTP
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          {/* Email Field */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Email Address
            </label>
            <div className="relative group">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your registered email"
                className="w-full px-4 py-3 rounded-xl bg-slate-700/40 border border-white/10 text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all duration-300 text-sm sm:text-base"
              />
            </div>
          </div>

          {/* Send OTP Button */}
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
                  Sending OTP...
                </div>
              ) : (
                "Send OTP"
              )}
            </span>
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-700/50 text-center text-xs sm:text-sm text-gray-400">
          Remembered your password?{" "}
          <Link to="/login" className="text-cyan-400 hover:underline">
            Login Here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;