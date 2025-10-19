import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from '../contexts/AuthContext';
import ScrollToTop from "../Ui/ScrollToTop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Client() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useAuth();

  // Public routes that should redirect to home if authenticated
  const publicRoutes = ['/login', '/signup', '/admin-signup', '/send-otp', '/check-otp', '/reset-password'];

  useEffect(() => {
    // Redirect authenticated users away from auth pages
    if (!loading && isAuthenticated && publicRoutes.includes(location.pathname)) {
      navigate('/home', { replace: true });
    }
  }, [location.pathname, isAuthenticated, loading, navigate]);

  // (your existing reveal code)
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("show")),
      { threshold: 0.14 }
    );

    const attach = () => {
      document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
      document.querySelectorAll(".reveal").forEach((el) => {
        const r = el.getBoundingClientRect();
        const inView = r.top < window.innerHeight * 0.86 && r.bottom > 0;
        if (inView) el.classList.add("show");
      });
    };

    const raf = requestAnimationFrame(attach);
    return () => {
      cancelAnimationFrame(raf);
      obs.disconnect();
    };
  }, [location.pathname]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <main className="flex-1">
        <Outlet />
      </main>

      <ToastContainer 
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}