// Pages/Client/Authentication/OTP.jsx
import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { checkOtp, sendOtp } from "../../../api/authApi";


const OTP = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [isResendLoading, setIsResendLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  // Get email from location state
  const email = location.state?.email || "";
  const otpRefs = useRef([]);

  useEffect(() => {
    if (!email) {
      navigate("/forget-password");
    }
  }, [email, navigate]);

  const handleOtpChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      otpRefs.current[index + 1].focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) {
      toast.error("Please enter a complete OTP");
      return;
    }

    setIsLoading(true);

    try {
      const response = await checkOtp({ email, otp_code: enteredOtp });
      const { msg, success } = response.data;

      if (success) {
        toast.success(msg);
        navigate("/reset-password", { state: { email } });
      } else {
        toast.error("Invalid OTP. Please try again.");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.msg || "An error occurred. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpPaste = (e) => {
  e.preventDefault();
  const pastedData = e.clipboardData.getData("Text").trim();

  if (!/^\d+$/.test(pastedData)) return; // Only numbers
  const pastedOtp = pastedData.split("").slice(0, 6); // Take first 6 digits

  const newOtp = [...otp];
  for (let i = 0; i < pastedOtp.length; i++) {
    newOtp[i] = pastedOtp[i];
    if (otpRefs.current[i]) {
      otpRefs.current[i].value = pastedOtp[i]; // optional: update input value immediately
    }
  }
  setOtp(newOtp);

  // Focus last filled input or the next empty one
  const nextIndex = pastedOtp.length < 6 ? pastedOtp.length : 5;
  otpRefs.current[nextIndex].focus();
};



  const handleResendOtp = async () => {
  setIsResendLoading(true);
  try {
    const response = await sendOtp({ email });
    const { success, msg } = response.data;

    if (success) {
      toast.success(msg || "OTP sent successfully!");
      
      // Clear OTP inputs
      setOtp(["", "", "", "", "", ""]);
      otpRefs.current.forEach((input) => {
        if (input) input.value = "";
      });

      // Reset timer
      setTimer(60);
      setCanResend(false);

      // Focus first input
      if (otpRefs.current[0]) otpRefs.current[0].focus();
    } else {
      toast.error(msg || "Failed to send OTP. Please try again.");
    }
  } catch (error) {
    toast.error(
      error.response?.data?.msg || "An error occurred. Please try again."
    );
  } finally {
    setIsResendLoading(false);
  }
};



  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  if (!email) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b]">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] relative overflow-hidden p-4">
      <div className="absolute -top-10 -left-10 md:-top-20 md:-left-20 w-40 h-40 md:w-64 md:h-64 rounded-full bg-cyan-400 opacity-10 blur-3xl animate-pulse"></div>
      <div
        className="absolute -bottom-10 -right-10 md:-bottom-20 md:-right-20 w-40 h-40 md:w-64 md:h-64 rounded-full bg-blue-500 opacity-10 blur-3xl animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>

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
            Verify OTP
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm mb-2">
            Enter the 6-digit code sent to
          </p>
          <p className="text-cyan-400 text-sm font-medium">{email}</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          {/* OTP Input */}
          <div>
            <label className="block text-sm text-gray-300 mb-4 text-center">
              6-Digit Verification Code
            </label>
            <div className="flex justify-center gap-2 sm:gap-3 mb-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (otpRefs.current[index] = el)}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(index, e)}
                 onPaste={handleOtpPaste}
                  onFocus={(e) => e.target.select()}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg text-center text-lg font-semibold bg-slate-700/40 text-white border border-white/10 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all duration-300"
                />
              ))}
            </div>

            {/* Resend OTP */}
            <div className="text-center">
              {canResend ? (
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={isResendLoading}
                  className="text-cyan-400 hover:text-cyan-300 text-sm transition-colors duration-200"
                >
                  {isResendLoading ? "Sending..." : "Resend OTP"}
                </button>
              ) : (
                <p className="text-gray-400 text-sm">
                  Resend OTP in {timer}s
                </p>
              )}
            </div>
          </div>

          {/* Verify Button */}
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
                  Verifying...
                </div>
              ) : (
                "Verify OTP"
              )}
            </span>
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-700/50 text-center text-xs sm:text-sm text-gray-400">
          <Link to="/forget-password" className="text-cyan-400 hover:underline">
            Back to Email
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OTP;