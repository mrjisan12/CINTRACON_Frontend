import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
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
    const [isRedirecting, setIsRedirecting] = useState(false);

    // Public routes that should redirect to home if authenticated
    const publicRoutes = ['/login', '/signup', '/admin-signup', '/send-otp', '/check-otp', '/reset-password'];

    useEffect(() => {
        // Only run redirect logic if not already redirecting and auth check is complete
        if (!loading && !isRedirecting) {
            const isPublicRoute = publicRoutes.includes(location.pathname);
            
            if (isAuthenticated && isPublicRoute) {
                setIsRedirecting(true);
                navigate('/home', { replace: true });
            }
        }
    }, [location.pathname, isAuthenticated, loading, isRedirecting, navigate]);

    // Reset redirecting state when location changes
    useEffect(() => {
        setIsRedirecting(false);
    }, [location.pathname]);

    // Maintenance check
    useEffect(() => {
        if (maintenance.status && publicRoutes.includes(location.pathname)) {
            // Maintenance logic handled by MaintenanceModal
        }
    }, [maintenance.status, location.pathname]);

    // Your existing reveal code
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

    // Show loading while checking auth or redirecting
    if (loading || isRedirecting) {
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