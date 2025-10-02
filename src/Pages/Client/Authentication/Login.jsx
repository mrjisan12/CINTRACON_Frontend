// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#0a0f1f] text-slate-100">
      {/* Back arrow */}
      <button
        onClick={() => navigate(-1)}
        aria-label="Go back"
        className="absolute left-4 top-4 z-20 rounded-full p-2 hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60"
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Background glows */}
      <div className="pointer-events-none absolute -left-24 -bottom-24 h-96 w-96 rounded-full blur-3xl"
           style={{ background: "radial-gradient(closest-side, rgba(0,153,255,.25), transparent 70%)" }} />
      <div className="pointer-events-none absolute -right-20 -top-20 h-[28rem] w-[28rem] rounded-full blur-3xl"
           style={{ background: "radial-gradient(closest-side, rgba(21,214,191,.22), transparent 70%)" }} />

      {/* Center card */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#121737]/80 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
          {/* Card inner glow border */}
          <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10" />

          {/* Logo */}
          <div className="mb-4 flex justify-center">
            <img
              src="/logo.png"
              alt="Logo"
              className="h-14 w-14 select-none"
              draggable="false"
            />
          </div>

          <h1 className="mb-6 text-center text-2xl font-semibold tracking-wide text-white">
            Login Page
          </h1>

          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              // handle login here
              alert("Logged in (demo). Replace with real auth.");
            }}
          >
            {/* Email */}
            <label className="block">
              <span className="sr-only">Email</span>
              <div className="group relative flex items-center rounded-lg border border-white/10 bg-white/5">
                <input
                  type="email"
                  required
                  placeholder="Enter your Email"
                  className="peer w-full rounded-lg bg-transparent px-4 py-3 pr-10 text-sm placeholder-slate-400 outline-none"
                />
                <span className="pointer-events-none absolute right-3 text-slate-300/80">
                  {/* Envelope icon */}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M4 6h16v12H4z" stroke="currentColor" strokeWidth="1.6" />
                    <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.6" />
                  </svg>
                </span>
              </div>
            </label>

            {/* Password */}
            <label className="block">
              <span className="sr-only">Password</span>
              <div className="relative flex items-center rounded-lg border border-white/10 bg-white/5">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Enter your Password"
                  className="peer w-full rounded-lg bg-transparent px-4 py-3 pr-10 text-sm placeholder-slate-400 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 rounded p-1 text-slate-300/90 hover:bg-white/5"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {/* Eye / Eye-off */}
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M3 3l18 18" stroke="currentColor" strokeWidth="1.8" />
                      <path d="M10.6 10.6A3 3 0 0012 15a3 3 0 002.4-1.2M6.6 6.8C4.7 8 3.3 9.8 2.5 12c2.1 5.6 9 7.7 13.7 4.9M17.4 14c1-.8 1.9-1.9 2.6-3.2C17.9 5.2 8.9 3.6 4.9 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" stroke="currentColor" strokeWidth="1.6" />
                      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
                    </svg>
                  )}
                </button>
              </div>
            </label>

            {/* Row: remember + forgot */}
            <div className="flex items-center justify-between pt-1 text-xs text-slate-300">
              <label className="inline-flex cursor-pointer items-center gap-2 select-none">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="h-4 w-4 rounded border-white/20 bg-transparent text-cyan-400 focus:ring-cyan-300/50"
                />
                <span className="leading-none">remember me</span>
              </label>

              <a href="/forgot-password" className="hover:text-cyan-300">
                Forgot Password?
              </a>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="group relative mt-2 w-full rounded-lg bg-gradient-to-r from-cyan-500/20 via-cyan-400/10 to-emerald-400/20 px-6 py-3 text-center text-sm font-semibold text-white ring-1 ring-cyan-400/40 transition
                         hover:from-cyan-500/30 hover:to-emerald-400/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70"
            >
              <span className="absolute inset-0 rounded-lg bg-white/5 opacity-0 blur transition group-hover:opacity-100" />
              Log In
            </button>
          </form>

          {/* Divider / register */}
          <div className="mt-6 text-center text-xs text-slate-300">
            <span>New user?</span>{" "}
            <a href="/register" className="font-medium text-cyan-300 hover:underline">
              Register Here
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
