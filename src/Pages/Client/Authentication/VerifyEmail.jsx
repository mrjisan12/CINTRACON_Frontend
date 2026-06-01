import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { verifyEmail, resendVerification } from "../../../api/authApi";
import { useAuth } from "../../../contexts/AuthContext";

const RESEND_COOLDOWN = 60;

const VerifyEmail = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { login } = useAuth();

    const emailFromSession = sessionStorage.getItem('verify_email') || '';
    const emailFromParam = searchParams.get('email') || '';
    const [email] = useState(emailFromSession || emailFromParam);

    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [isLoading, setIsLoading] = useState(false);
    const [cooldown, setCooldown] = useState(0);
    const inputRefs = useRef([]);

    useEffect(() => {
        inputRefs.current[0]?.focus();
    }, []);

    // Cooldown timer
    useEffect(() => {
        if (cooldown <= 0) return;
        const timer = setInterval(() => setCooldown(c => c - 1), 1000);
        return () => clearInterval(timer);
    }, [cooldown]);

    const handleOtpChange = (index, value) => {
        if (!/^\d?$/.test(value)) return;
        const next = [...otp];
        next[index] = value;
        setOtp(next);
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
        const next = [...otp];
        pasted.split('').forEach((char, i) => { next[i] = char; });
        setOtp(next);
        const lastFilled = Math.min(pasted.length, 5);
        inputRefs.current[lastFilled]?.focus();
    };

    const handleVerify = async () => {
        const code = otp.join('');
        if (code.length < 6) {
            toast.error("Please enter the 6-digit OTP.");
            return;
        }
        if (!email) {
            toast.error("Email not found. Please sign up again.");
            return;
        }
        setIsLoading(true);
        try {
            const res = await verifyEmail({ email, otp: code });
            const { success, msg, data } = res.data;
            if (success) {
                toast.success(msg || "Email verified successfully!");
                sessionStorage.removeItem('verify_email');
                login(data, data.accessToken);
                navigate('/home', { replace: true });
            } else {
                toast.error(msg || "Verification failed.");
            }
        } catch (err) {
            const msg = err.response?.data?.msg || "Verification failed. Please try again.";
            toast.error(msg);
        } finally {
            setIsLoading(false);
        }
    };

    const handleResend = async () => {
        if (cooldown > 0 || !email) return;
        try {
            const res = await resendVerification({ email });
            if (res.data.success) {
                toast.success("OTP resent! Check your email.");
                setCooldown(RESEND_COOLDOWN);
                setOtp(['', '', '', '', '', '']);
                inputRefs.current[0]?.focus();
            }
        } catch (err) {
            toast.error(err.response?.data?.msg || "Failed to resend OTP.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] relative overflow-hidden p-4">
            <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-cyan-400 opacity-10 blur-3xl animate-pulse" />
            <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-blue-500 opacity-10 blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

            <div className="w-full max-w-md rounded-2xl shadow-2xl px-8 py-10 bg-gradient-to-br from-[#1e293b]/60 to-[#0f172a]/70 backdrop-blur-xl border border-white/10 relative">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 p-1 shadow-lg">
                        <div className="w-full h-full rounded-full bg-[#1E293B] flex items-center justify-center">
                            <img src="/logo.png" alt="Logo" className="h-8 w-8 object-contain" />
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
                        Verify Your Email
                    </h1>
                    <p className="text-gray-400 text-sm">
                        Enter the 6-digit code sent to
                    </p>
                    <p className="text-cyan-400 text-sm font-medium mt-1">{email || "your email"}</p>
                </div>

                {/* OTP Inputs */}
                <div className="flex gap-3 justify-center mb-6" onPaste={handlePaste}>
                    {otp.map((digit, i) => (
                        <input
                            key={i}
                            ref={el => inputRefs.current[i] = el}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={e => handleOtpChange(i, e.target.value)}
                            onKeyDown={e => handleKeyDown(i, e)}
                            className="w-12 h-14 text-center text-2xl font-bold rounded-xl bg-slate-700/40 border border-white/10 text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/40 transition-all duration-200 outline-none"
                        />
                    ))}
                </div>

                {/* Verify Button */}
                <button
                    onClick={handleVerify}
                    disabled={isLoading || otp.join('').length < 6}
                    className="w-full py-3 rounded-xl font-semibold text-gray-900 bg-gradient-to-r from-cyan-400 to-blue-500 shadow-lg hover:shadow-xl hover:scale-105 transition-transform disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100 mb-4"
                >
                    {isLoading ? (
                        <div className="flex items-center justify-center gap-2">
                            <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
                            Verifying...
                        </div>
                    ) : "Verify Email"}
                </button>

                {/* Resend */}
                <div className="text-center">
                    <span className="text-gray-400 text-sm">Didn't receive the code? </span>
                    {cooldown > 0 ? (
                        <span className="text-cyan-600 text-sm">Resend in {cooldown}s</span>
                    ) : (
                        <button
                            onClick={handleResend}
                            className="text-cyan-400 text-sm hover:underline hover:text-cyan-300 transition-colors"
                        >
                            Resend OTP
                        </button>
                    )}
                </div>

                <div className="mt-6 pt-4 border-t border-gray-700/50 text-center text-xs text-gray-400">
                    Wrong account?{" "}
                    <a href="/signup" className="text-cyan-400 hover:underline">Sign up again</a>
                </div>
            </div>
        </div>
    );
};

export default VerifyEmail;
