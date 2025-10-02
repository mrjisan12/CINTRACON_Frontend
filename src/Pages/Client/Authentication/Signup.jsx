// src/pages/Signup.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [agree, setAgree] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [showPw2, setShowPw2] = useState(false);

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
        <div className="w-full max-w-md rounded-2xl border border-cyan-400/30 bg-[#121737]/80 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
          {/* Logo */}
          <div className="mb-4 flex justify-center">
            <img src="/logo.png" alt="Logo" className="h-14 w-14 select-none" draggable="false" />
          </div>

          <h1 className="mb-6 text-center text-2xl font-semibold tracking-wide text-white">
            Signup Page
          </h1>

          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              if (!agree) {
                alert("Please accept the Terms and Conditions to continue.");
                return;
              }
              alert("Signed up (demo). Hook up your backend/auth here.");
            }}
          >
            {/* Full Name */}
            <div className="relative">
              <input
                type="text"
                required
                placeholder="Full Name"
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm placeholder-slate-400 outline-none"
              />
            </div>

            {/* Email */}
            <div className="relative">
              <input
                type="email"
                required
                placeholder="Email"
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm placeholder-slate-400 outline-none pr-10"
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-300/80">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M4 6h16v12H4z" stroke="currentColor" strokeWidth="1.6" />
                  <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.6" />
                </svg>
              </span>
            </div>

            {/* Row: Department + Semester */}
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <select
                  defaultValue=""
                  required
                  className="w-full appearance-none rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100/90 outline-none"
                >
                  <option value="" disabled>Department</option>
                  <option>Computer Science</option>
                  <option>EEE</option>
                  <option>Business</option>
                  <option>Mathematics</option>
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </div>

              <div className="relative">
                <select
                  defaultValue=""
                  required
                  className="w-full appearance-none rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100/90 outline-none"
                >
                  <option value="" disabled>Semester</option>
                  <option>1</option><option>2</option><option>3</option>
                  <option>4</option><option>5</option><option>6</option>
                  <option>7</option><option>8</option>
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </div>
            </div>

            {/* Batch */}
            <input
              type="text"
              placeholder="Batch No"
              className="w-full rounded-lg border border-white/10 bg_white/5 px-4 py-3 text-sm placeholder-slate-400 outline-none bg-white/5"
            />

            {/* Password */}
            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                required
                placeholder="Password"
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 pr-10 text-sm placeholder-slate-400 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPw((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-slate-300/90 hover:bg-white/5"
                aria-label={showPw ? "Hide password" : "Show password"}
              >
                {showPw ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M3 3l18 18" stroke="currentColor" strokeWidth="1.8" />
                    <path d="M10.6 10.6A3 3 0 0012 15a3 3 0 002.4-1.2M6.6 6.8C4.7 8 3.3 9.8 2.5 12c2.1 5.6 9 7.7 13.7 4.9M17.4 14c1-.8 1.9-1.9 2.6-3.2C17.9 5.2 8.9 3.6 4.9 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" stroke="currentColor" strokeWidth="1.6" />
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
                  </svg>
                )}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <input
                type={showPw2 ? "text" : "password"}
                required
                placeholder="Confirm Password"
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 pr-10 text-sm placeholder-slate-400 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPw2((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-slate-300/90 hover:bg-white/5"
                aria-label={showPw2 ? "Hide password" : "Show password"}
              >
                {showPw2 ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M3 3l18 18" stroke="currentColor" strokeWidth="1.8" />
                    <path d="M10.6 10.6A3 3 0 0012 15a3 3 0 002.4-1.2M6.6 6.8C4.7 8 3.3 9.8 2.5 12c2.1 5.6 9 7.7 13.7 4.9M17.4 14c1-.8 1.9-1.9 2.6-3.2C17.9 5.2 8.9 3.6 4.9 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" stroke="currentColor" strokeWidth="1.6" />
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
                  </svg>
                )}
              </button>
            </div>

            {/* Profile Photo */}
            <div className="relative flex items-center rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm">
              <input
                type="file"
                accept="image/*"
                className="w-full cursor-pointer text-slate-300 file:mr-3 file:rounded-md file:border-0 file:bg-white/10 file:px-3 file:py-2 file:text-slate-100 hover:file:bg-white/20"
                title=""
              />
              <span className="ml-2 text-slate-300/90">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M4 7h3l2-2h6l2 2h3v10H4z" stroke="currentColor" strokeWidth="1.6" />
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
                </svg>
              </span>
            </div>

            {/* Terms */}
            <label className="mt-1 flex items-center gap-2 text-xs text-slate-300">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="h-4 w-4 rounded border-white/20 bg-transparent text-cyan-400 focus:ring-cyan-300/50"
              />
              <span>
                Accept <a href="/terms" className="text-cyan-300 hover:underline">Terms and Conditions</a>
              </span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              className="group relative mt-2 w-full rounded-lg bg-gradient-to-r from-cyan-500/20 via-cyan-400/10 to-emerald-400/20 px-6 py-3 text-center text-sm font-semibold text-white ring-1 ring-cyan-400/40 transition hover:from-cyan-500/30 hover:to-emerald-400/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70"
            >
              <span className="absolute inset-0 rounded-lg bg-white/5 opacity-0 blur transition group-hover:opacity-100" />
              Sign up
            </button>
          </form>

          {/* Footer link */}
          <div className="mt-4 text-center text-xs text-slate-300">
            already have an account?{" "}
            <Link to="/login" className="text-cyan-300 hover:underline">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
