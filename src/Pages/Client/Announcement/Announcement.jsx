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
      secondary: "rgba(139, 92, 246, 0.15)",
      gradient: "linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)",
    },
    {
      primary: "#06B6D4",
      secondary: "rgba(6, 182, 212, 0.15)",
      gradient: "linear-gradient(135deg, #06B6D4 0%, #22D3EE 100%)",
    },
    {
      primary: "#10B981",
      secondary: "rgba(16, 185, 129, 0.15)",
      gradient: "linear-gradient(135deg, #10B981 0%, #34D399 100%)",
    },
    {
      primary: "#F59E0B",
      secondary: "rgba(245, 158, 11, 0.15)",
      gradient: "linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)",
    },
    {
      primary: "#EF4444",
      secondary: "rgba(239, 68, 68, 0.15)",
      gradient: "linear-gradient(135deg, #EF4444 0%, #F87171 100%)",
    },
    {
      primary: "#EC4899",
      secondary: "rgba(236, 72, 153, 0.15)",
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
    <div className="min-h-screen bg-[#181820]">
      <NavbarMain />

      {/* Expanded Announcement Modal */}
      {expandedAnnouncement && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-4xl bg-[#1E2130] rounded-3xl border border-[#2A2D3A] shadow-2xl">
            {/* Modal Header */}
            <div className="relative p-6 border-b border-[#2A2D3A]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {expandedAnnouncement.isNew && (
                    <span className="px-3 py-1 bg-green-500/20 text-green-400 text-sm font-bold rounded-full border border-green-500/30">
                      🆕 NEW
                    </span>
                  )}
                  <span
                    className={`px-3 py-1 text-white text-sm font-bold rounded-full border ${
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
                  className="w-8 h-8 flex items-center justify-center bg-[#2A2D3A] text-gray-400 rounded-full hover:bg-[#3A3D4A] hover:text-white transition-colors duration-200 border border-[#3A3D4A]"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              <h2 className="text-2xl font-bold text-white mt-4">
                {expandedAnnouncement.title}
              </h2>

              <div className="flex items-center gap-4 mt-3 text-sm">
                <span className="text-gray-400">📅 {formatDate(expandedAnnouncement.date)}</span>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 max-h-96 overflow-y-auto">
              <p className="text-gray-300 leading-relaxed text-lg whitespace-pre-line">
                {expandedAnnouncement.content}
              </p>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-[#2A2D3A] flex justify-end">
              <button
                onClick={handleCloseModal}
                className="px-6 py-2 bg-[#2A2D3A] text-white font-bold rounded-xl hover:bg-[#3A3D4A] transition-all duration-200 border border-[#3A3D4A]"
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
              <h1 className="text-3xl font-bold text-white mb-2"> Announcement</h1>
              <p className="text-gray-400">
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
                    className="group rounded-2xl p-6 bg-[#1E2130] border-2 transition-all duration-300 hover:scale-105 cursor-pointer transform-gpu"
                    style={{
                      borderColor: colors.primary,
                    }}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-2">
                        {announcement.isNew && (
                          <span className="px-3 py-1 bg-green-500/20 text-green-400 text-sm font-bold rounded-full border border-green-500/30">
                            🆕 NEW
                          </span>
                        )}
                      </div>
                      <span
                        className={`px-3 py-1 text-white text-xs font-bold rounded-full border ${
                          announcement.author === "Cintracon Team"
                            ? "bg-purple-500/20 border-purple-500/30"
                            : "bg-blue-500/20 border-blue-500/30"
                        }`}
                      >
                        {announcement.author}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-white font-bold text-lg mb-3 leading-tight">
                      {announcement.title}
                    </h3>

                    {/* Content Preview */}
                    <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
                      {announcement.content}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-[#2A2D3A]">
                      <div className="text-gray-400 text-xs">📅 {formatDate(announcement.date)}</div>

                      {/* Read More Button */}
                      <button
                        onClick={() => handleReadMore(announcement)}
                        className="px-3 py-1 bg-[#2A2D3A] text-white text-sm font-bold rounded-lg hover:bg-[#3A3D4A] transition-all duration-200 border border-[#3A3D4A]"
                      >
                        Read More
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Announcement;