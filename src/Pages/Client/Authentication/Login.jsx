// Pages/Client/Authentication/Login.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { login as loginApi } from "../../../api/authApi";
import { useAuth } from '../../../contexts/AuthContext';
import { useMaintenance } from '../../../contexts/MaintenanceContext';
import MaintenanceModal from '../../../Components/MaintenanceModal';

const Login = () => {
    const navigate = useNavigate();
    const { login, isAuthenticated } = useAuth();
    const { maintenance, loading: maintenanceLoading } = useMaintenance();
    const location = useLocation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [remember, setRemember] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
// Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            const from = location.state?.from?.pathname || '/home';
            navigate(from, { replace: true });
        }
    }, [isAuthenticated, navigate, location]);

    // Check maintenance status
    useEffect(() => {
        if (maintenance.status) {
            toast.error("System is under maintenance. Please try again later.");
        }
    }, [maintenance.status]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (maintenance.status) {
            toast.error("Cannot login during maintenance period.");
            return;
        }

        setIsLoading(true);

        try {
            const response = await loginApi({ email, password });
            const { msg, success, data } = response.data;

            

            if (success) {
                toast.success(msg);
                
                // AuthContext will handle the rest including redirect
                login(data, data.accessToken);

                // console.log("Login successful, user ID:", data.id);
                // console.log("Login successful, Token:", data.accessToken);

                
                
                // Don't navigate here - let the useEffect above handle it
            } else {
                toast.error("Login failed. Please try again.");
            }
        } catch (error) {
            toast.error(
                error.response?.data?.data?.non_field_errors?.join(", ") ||
                "An error occurred. Please try again."
            );
        } finally {
            setIsLoading(false);
        }
    };



    // Show loading while checking maintenance status
    if (maintenanceLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
            </div>
        );
    }

    return (
        <>
            <MaintenanceModal />
            
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
                            Welcome Back
                        </h1>
                        <p className="text-gray-400 text-xs sm:text-sm">
                            Sign in to your account
                        </p>
                    </div>

                    {/* Maintenance Warning */}
                    {maintenance.status && (
                        <div className="mb-6 p-4 bg-red-500/20 border border-red-400/30 rounded-xl">
                            <div className="flex items-center gap-3">
                                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                                    <span className="text-white text-xs">!</span>
                                </div>
                                <p className="text-red-200 text-sm">
                                    System is under maintenance. Login is temporarily disabled.
                                </p>
                            </div>
                        </div>
                    )}

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
                                    placeholder="you@example.com"
                                    disabled={maintenance.status || isLoading}
                                    className="w-full px-4 py-3 rounded-xl bg-slate-700/40 border border-white/10 text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all duration-300 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div>
                            <label className="block text-sm text-gray-300 mb-2">
                                Password
                            </label>
                            <div className="relative group">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    disabled={maintenance.status || isLoading}
                                    className="w-full px-4 py-3 rounded-xl bg-slate-700/40 border border-white/10 text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all duration-300 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    disabled={maintenance.status || isLoading}
                                    className="absolute right-3 top-3 text-gray-400 hover:text-cyan-400 transition-colors duration-200 disabled:opacity-50"
                                >
                                    {showPassword ? "🙈" : "👁️"}
                                </button>
                            </div>
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={remember}
                                    onChange={(e) => setRemember(e.target.checked)}
                                    disabled={maintenance.status || isLoading}
                                    className="h-4 w-4 rounded border-white/20 bg-slate-800/40 text-cyan-400 focus:ring-cyan-300/50 disabled:opacity-50"
                                />
                                <span className="text-sm text-slate-300">Remember me</span>
                            </label>

                            <Link
                                to="/send-otp"
                                className="text-sm text-cyan-400 hover:text-cyan-300 hover:underline transition-colors duration-200"
                            >
                                Forgot Password?
                            </Link>
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            disabled={maintenance.status || isLoading}
                            className={`w-full py-3 rounded-xl font-semibold text-gray-900 bg-gradient-to-r from-cyan-400 to-blue-500 shadow-lg hover:shadow-xl hover:scale-105 transition-transform ${
                                (maintenance.status || isLoading) ? "opacity-70 cursor-not-allowed" : ""
                            } relative overflow-hidden group`}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                            <span className="relative z-10 text-sm sm:text-base">
                                {isLoading ? (
                                    <div className="flex items-center justify-center">
                                        <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin mr-2"></div>
                                        Signing In...
                                    </div>
                                ) : maintenance.status ? (
                                    "Maintenance in Progress"
                                ) : (
                                    "Sign In"
                                )}
                            </span>
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-700/50 text-center text-xs sm:text-sm text-gray-400">
                        Don't have an account?{" "}
                        <Link to="/signup" className="text-cyan-400 hover:underline">
                            Create Account
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;