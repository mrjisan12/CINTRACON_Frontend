import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from '../contexts/AuthContext';
import { useMaintenance } from '../contexts/MaintenanceContext';
import ScrollToTop from "../Ui/ScrollToTop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MaintenanceModal from "../Components/MaintenanceModal";

export default function Client() {
    const location = useLocation();
    const navigate = useNavigate();
    const { isAuthenticated, loading } = useAuth();
    const { maintenance, showModal } = useMaintenance();

    // Public routes that should redirect to home if authenticated
    const publicRoutes = ['/login', '/signup', '/admin-signup', '/send-otp', '/check-otp', '/reset-password'];

    useEffect(() => {
        // Redirect authenticated users away from auth pages
        if (!loading && isAuthenticated && publicRoutes.includes(location.pathname)) {
            navigate('/home', { replace: true });
        }
    }, [location.pathname, isAuthenticated, loading, navigate]);

    // Maintenance check - redirect to home if maintenance is active and user is on auth pages
    useEffect(() => {
        if (maintenance.status && publicRoutes.includes(location.pathname)) {
            // Already handled by MaintenanceModal and Login component
        }
    }, [maintenance.status, location.pathname]);

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

            {/* Maintenance Modal */}
            <MaintenanceModal />

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