// Announcement.jsx
import React, { useState, useEffect } from "react";
import LeftSideBar from "../../../Components/LeftSideBar";
import NavbarMain from "../../../Ui/NavbarMain";

// Sample announcements data from admin and Cintracon team only
const announcementsData = [
  {
    id: 1,
    title: "CINTRACON Platform Launch",
    content:
      "The Cintracon team is thrilled to welcome you all to the platform — a space built by UAP students for UAP students and alumni. Our goal is to create a connected community where you can share knowledge, explore opportunities, and engage in meaningful discussions. This is just the beginning, and many exciting features are on the way, including course-specific forums, alumni networking, and AI-powered suggestions. Stay active, share your thoughts, and help us make Cintracon a hub for collaboration and growth. Thank you for being with us — together, we'll make Cintracon better every day!",
    author: "Cintracon Team",
    date: "2025-10-05",
    isNew: true,
  },
  {
    id: 2,
    title: "New Feature Update - AI Assistant",
    content:
      "We're excited to announce the launch of our AI-powered assistant feature! Now you can get instant help with your queries, course recommendations, and study tips. The AI assistant is available 24/7 and can help you with various academic and platform-related questions. Try it out and let us know your feedback!",
    author: "Cintracon Team",
    date: "2025-10-04",
    isNew: true,
  },
  {
    id: 3,
    title: "Platform Maintenance Notice",
    content:
      "There will be a scheduled maintenance on Saturday, October 12th from 2:00 AM to 6:00 AM. During this time, the platform will be temporarily unavailable. We apologize for any inconvenience and appreciate your understanding as we work to improve your experience.",
    author: "Admin",
    date: "2025-10-03",
    isNew: false,
  },
  {
    id: 4,
    title: "Terms of Service Update",
    content:
      "We've updated our Terms of Service and Privacy Policy. Please review the changes to understand how we handle your data and the rules for using our platform. The updates include better data protection measures and clearer guidelines on content sharing.",
    author: "Admin",
    date: "2025-10-02",
    isNew: true,
  },
  {
    id: 5,
    title: "Mobile App Coming Soon",
    content:
      "Great news! The CINTRACON mobile app is currently in development and will be launched next month. The app will include all platform features with optimized mobile experience, push notifications, and offline access to study materials.",
    author: "Cintracon Team",
    date: "2025-10-01",
    isNew: false,
  },
  {
    id: 6,
    title: "Bug Fixes & Performance Improvements",
    content:
      "We've deployed several bug fixes and performance improvements to enhance your experience. Fixed issues include login problems, file upload errors, and notification delays. If you encounter any issues, please report them through the feedback system.",
    author: "Admin",
    date: "2025-09-28",
    isNew: false,
  },
];

const Announcement = () => {
  const [expandedAnnouncement, setExpandedAnnouncement] = useState(null);

  // ESC key closes modal (small UX improvement)
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") handleCloseModal();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Different colors for each card
  const cardColors = [
    {
      primary: "#8B5CF6",
      secondary: "rgba(139, 92, 246, 0.25)",
      gradient: "linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)",
    },
    {
      primary: "#06B6D4",
      secondary: "rgba(6, 182, 212, 0.25)",
      gradient: "linear-gradient(135deg, #06B6D4 0%, #22D3EE 100%)",
    },
    {
      primary: "#10B981",
      secondary: "rgba(16, 185, 129, 0.25)",
      gradient: "linear-gradient(135deg, #10B981 0%, #34D399 100%)",
    },
    {
      primary: "#F59E0B",
      secondary: "rgba(245, 158, 11, 0.25)",
      gradient: "linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)",
    },
    {
      primary: "#EF4444",
      secondary: "rgba(239, 68, 68, 0.25)",
      gradient: "linear-gradient(135deg, #EF4444 0%, #F87171 100%)",
    },
    {
      primary: "#EC4899",
      secondary: "rgba(236, 72, 153, 0.25)",
      gradient: "linear-gradient(135deg, #EC4899 0%, #F472B6 100%)",
    },
  ];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // FIXED: Read More button handler
  const handleReadMore = (announcement) => {
    setExpandedAnnouncement(announcement);
    if (typeof document !== "undefined") {
      document.body.style.overflow = "hidden";
    }
  };

  const handleCloseModal = () => {
    setExpandedAnnouncement(null);
    if (typeof document !== "undefined") {
      document.body.style.overflow = "unset";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f23] via-[#1a1a2e] to-[#16213e]">
      <NavbarMain />

      {/* Expanded Announcement Modal */}
      {expandedAnnouncement && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-4xl bg-gradient-to-br from-[#1E2130] to-[#181820] rounded-3xl border-2 border-purple-500/50 shadow-2xl shadow-purple-500/30">
            {/* Modal Header */}
            <div className="relative p-6 border-b border-purple-500/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {expandedAnnouncement.isNew && (
                    <span className="px-3 py-1 bg-green-500/20 text-green-400 text-sm font-bold rounded-full border border-green-500/30 shadow-lg">
                      🆕 NEW
                    </span>
                  )}
                  <span
                    className={`px-3 py-1 text-white text-sm font-bold rounded-full border shadow-lg ${
                      expandedAnnouncement.author === "Cintracon Team"
                        ? "bg-purple-500/20 border-purple-500/30"
                        : "bg-blue-500/20 border-blue-500/30"
                    }`}
                  >
                    {expandedAnnouncement.author}
                  </span>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="w-8 h-8 flex items-center justify-center bg-red-500/30 text-red-400 rounded-full hover:bg-red-500/50 transition-colors duration-200 border border-red-500/30"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              <h2 className="text-2xl font-bold text-white mt-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {expandedAnnouncement.title}
              </h2>

              <div className="flex items-center gap-4 mt-3 text-sm">
                <span className="text-gray-300">📅 {formatDate(expandedAnnouncement.date)}</span>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 max-h-96 overflow-y-auto">
              <p className="text-gray-300 leading-relaxed text-lg whitespace-pre-line">
                {expandedAnnouncement.content}
              </p>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-purple-500/30 flex justify-end">
              <button
                onClick={handleCloseModal}
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:from-purple-500 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-lg shadow-purple-500/25 border border-purple-500/30"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Page Container */}
      <div className="max-w-7xl mx-auto px-3 md:px-6 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
          {/* Left Sidebar */}
          <aside className="hidden lg:block">
            <LeftSideBar />
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Header Section */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-white mb-3 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                📢 Announcements
              </h1>
              <p className="text-gray-300 text-lg">
                Important updates from Cintracon Team and Platform Administration
              </p>
            </div>

            {/* Announcements Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {announcementsData.map((announcement, index) => {
                const colors = cardColors[index % cardColors.length];

                return (
                  <div
                    key={announcement.id}
                    className="group relative rounded-2xl p-6 border-2 transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-float"
                    style={{
                      animationDelay: `${index * 0.1}s`,
                      background: `linear-gradient(135deg, ${colors.secondary}, rgba(30, 33, 48, 0.9))`,
                      borderColor: colors.primary,
                      boxShadow: `0 8px 32px ${colors.primary}30`,
                    }}
                  >
                    {/* Glow Effect (was intercepting clicks) */}
                    <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600/0 via-pink-600/5 to-blue-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Header */}
                    <div className="relative flex items-start justify-between mb-4">
                      <div className="flex items-center gap-2">
                        {announcement.isNew && (
                          <span className="px-3 py-1 bg-green-500/20 text-green-400 text-sm font-bold rounded-full border border-green-500/30 shadow-lg animate-pulse">
                            🆕 NEW
                          </span>
                        )}
                      </div>
                      <span
                        className={`px-3 py-1 text-white text-xs font-bold rounded-full border shadow-lg ${
                          announcement.author === "Cintracon Team"
                            ? "bg-purple-500/20 border-purple-500/30"
                            : "bg-blue-500/20 border-blue-500/30"
                        }`}
                      >
                        {announcement.author}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="relative text-white font-bold text-lg mb-3 leading-tight group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300">
                      {announcement.title}
                    </h3>

                    {/* Content Preview */}
                    <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                      {announcement.content}
                    </p>

                    {/* Footer */}
                    <div className="relative flex items-center justify-between pt-4 border-t border-white/10">
                      <div className="text-gray-300 text-xs">📅 {formatDate(announcement.date)}</div>

                      {/* FIXED: Read More Button */}
                      <button
                        onClick={() => handleReadMore(announcement)}
                        className="px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-bold rounded-lg transform group-hover:scale-110 transition-all duration-200 shadow-lg shadow-purple-500/25 border border-purple-500/30 hover:from-purple-500 hover:to-pink-700"
                      >
                        Read More
                      </button>
                    </div>

                    {/* Shine Effect (was intercepting clicks) */}
                    <div className="pointer-events-none absolute inset-0 rounded-2xl overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    </div>
                  </div>
                );
              })}
            </div>
          </main>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Announcement;
