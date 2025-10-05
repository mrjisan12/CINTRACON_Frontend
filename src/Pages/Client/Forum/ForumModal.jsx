import React from "react";
import { FaArrowUp, FaArrowDown, FaTimes, FaBug, FaGlobe } from "react-icons/fa";

function formatTimeAgo(isoTime) {
  if (!isoTime) return "";
  const now = new Date();
  const date = new Date(isoTime);
  const diff = Math.floor((now - date) / 1000);
  if (diff < 10) return "Just now";
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return date.toLocaleDateString();
}

const ForumModal = ({
  open,
  onClose,
  topic,
  handleVote,
  handleAddSolution,
  comment,
  setComment,
}) => {
  if (!open || !topic) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-[#181820]/70 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close modal"
      />
      <div className="relative z-10 bg-gradient-to-br from-[#232A36] to-[#20222B] rounded-2xl shadow-2xl w-full max-w-4xl mx-2 flex flex-col md:flex-row overflow-hidden">
        {/* Left: Main Content */}
        <div className="flex-1 p-8">
          <button
            className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
            onClick={onClose}
            aria-label="Close"
          >
            <FaTimes />
          </button>
          <h2 className="text-2xl font-bold text-white mb-2">{topic.title}</h2>
          <div className="flex items-center gap-3 mb-4">
            <img
              src={topic.author.avatar}
              alt={topic.author.name}
              className="h-10 w-10 rounded-full object-cover border-2 border-blue-500"
            />
            <div>
              <div className="text-white font-semibold">{topic.author.name}</div>
              <div className="text-xs text-gray-400">{topic.author.time}</div>
            </div>
          </div>
          <p className="text-gray-300 mb-6">{topic.description}</p>
          {/* Solutions */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">
              Solutions & Comments ({topic.solutions.length})
            </h3>
            <div className="flex flex-col gap-5 max-h-72 overflow-y-auto pr-2">
              {[...topic.solutions]
                .sort((a, b) => new Date(b.time) - new Date(a.time))
                .map((sol) => (
                  <div
                    key={sol.id}
                    className="bg-[#20222B] rounded-xl p-4 flex flex-col md:flex-row gap-4 shadow group hover:ring-2 hover:ring-blue-700 transition"
                  >
                    <img
                      src={sol.author.avatar}
                      alt={sol.author.name}
                      className="h-10 w-10 rounded-full object-cover border-2 border-blue-400"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-white font-semibold">{sol.author.name}</span>
                        <span className="text-xs text-gray-400">{formatTimeAgo(sol.time)}</span>
                      </div>
                      <div className="text-gray-200 mt-1">{sol.text}</div>
                      <div className="flex items-center gap-4 mt-3">
                        <button
                          className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#232A36] text-blue-400 hover:bg-blue-700 hover:text-white transition"
                          onClick={() => handleVote(topic.id, sol.id, "up")}
                        >
                          <FaArrowUp /> <span>{sol.upvotes}</span>
                        </button>
                        <button
                          className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#232A36] text-red-400 hover:bg-red-700 hover:text-white transition"
                          onClick={() => handleVote(topic.id, sol.id, "down")}
                        >
                          <FaArrowDown /> <span>{sol.downvotes}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              {topic.solutions.length === 0 && (
                <div className="text-gray-400 text-center py-8">
                  No solutions yet. Be the first to comment!
                </div>
              )}
            </div>
            {/* Add Solution/Comment Input */}
            <form
              onSubmit={e => {
                e.preventDefault();
                handleAddSolution(e, topic.id, true);
              }}
              className="bg-[#20222B] rounded-xl p-4 flex flex-col md:flex-row gap-4 items-start md:items-center shadow mt-6"
            >
              <img
                src="jisan.jpg"
                alt="Your Avatar"
                className="h-10 w-10 rounded-full object-cover border-2 border-blue-400"
              />
              <input
                type="text"
                value={comment}
                onChange={e => setComment(e.target.value)}
                placeholder="Write your solution or comment…"
                className="flex-1 bg-[#232A36] text-white rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-700 to-purple-700 hover:from-blue-600 hover:to-purple-800 text-white font-semibold px-6 py-3 rounded-full transition"
              >
                Post
              </button>
            </form>
          </div>
        </div>
        {/* Right: Info Panel */}
        <div className="w-full md:w-80 bg-[#232A36] border-l border-[#2A2D3A] p-6 flex flex-col gap-4">
          <div>
            <div className="text-gray-400 text-sm mb-1">Department</div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900 text-blue-300 font-semibold text-xs">
              <FaArrowUp className="text-blue-400" /> CSE
            </span>
          </div>
          <div>
            <div className="text-gray-400 text-sm mb-1">Semester</div>
            <span className="inline-flex items-center gap-2 px-2 py-1 rounded bg-yellow-900 text-yellow-300 text-xs font-semibold">
              <FaBug className="text-yellow-400" /> 3.2 Semester
            </span>
          </div>
          <div>
            <div className="text-gray-400 text-sm mb-1">Platform</div>
            <span className="inline-flex items-center gap-2 px-2 py-1 rounded bg-gray-800 text-gray-300 text-xs font-semibold">
              <FaGlobe className="text-blue-400" /> CINTRACON
            </span>
          </div>
          <div>
            <div className="text-gray-400 text-sm mb-1">Date Time</div>
            <span className="text-gray-200 text-xs">37 minutes ago</span>
          </div>
          <div>
            <div className="text-gray-400 text-sm mb-1">Author</div>
            <div className="flex items-center gap-2">
              <img
                src={topic.author.avatar}
                alt={topic.author.name}
                className="h-7 w-7 rounded-full object-cover"
              />
              <span className="text-gray-200 text-xs">{topic.author.name}</span>
            </div>
          </div>
          <div>
            <div className="text-gray-400 text-sm mb-1">Short Bio</div>
            <span className="inline-block bg-gray-700 text-gray-200 rounded-full px-3 py-1 text-xs mr-2">
              Software Engineer , Creator of CINTRACON
            </span>
          </div>
          <div>
            <div className="text-gray-400 text-sm mb-1">Please Remember</div>
            <div className="flex items-start gap-2 text-blue-300 text-xs">
              <span className="mt-1">❌</span>
              <span>
                <b>Do not</b> Violate our Community Guidelines. Be respectful to Others.
                If you find any inappropriate content, please report it to the admin.
                Admin will take neccessry actions. Thank you for being with us.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForumModal;