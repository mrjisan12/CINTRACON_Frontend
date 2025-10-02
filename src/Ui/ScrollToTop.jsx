import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    // If URL-e hash ache (#section), oi element-e scroll korbo
    if (location.hash) {
      // next paint er por jate element DOM-e thake
      requestAnimationFrame(() => {
        const el = document.querySelector(location.hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          return;
        }
        // fallback: top
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      });
    } else {
      // normal route change: always go to top
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, [location.pathname, location.search, location.hash]);

  return null;
}
