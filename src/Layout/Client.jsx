import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import ScrollToTop from "../Ui/ScrollToTop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function Client() {
  const location = useLocation();

  // (your reveal code stays the same)
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

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop /> {/* <-- important */}
      <main className="flex-1">
        <Outlet />
      </main>

       {/* 🔥 Toast Container এখানে বসাও */}
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
