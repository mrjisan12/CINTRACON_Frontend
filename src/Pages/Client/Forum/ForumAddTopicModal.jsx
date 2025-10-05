import React from "react";
import { FaTimes } from "react-icons/fa";

const ForumAddTopicModal = ({
  open,
  onClose,
  newTitle,
  setNewTitle,
  newDesc,
  setNewDesc,
  handleAddTopic,
}) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-[#181820]/70 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close modal"
      />
      <div className="relative z-10 bg-gradient-to-br from-[#232A36] to-[#20222B] rounded-2xl shadow-2xl w-full max-w-lg mx-2 p-8">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
          onClick={onClose}
          aria-label="Close"
        >
          <FaTimes />
        </button>
        <h2 className="text-2xl font-bold text-white mb-6">Add New Forum Topic</h2>
        <form onSubmit={handleAddTopic} className="flex flex-col gap-5">
          <input
            type="text"
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            placeholder="Title"
            className="bg-[#232A36] text-white rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
          <textarea
            value={newDesc}
            onChange={e => setNewDesc(e.target.value)}
            placeholder="Description"
            className="bg-[#232A36] text-white rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 min-h-[100px]"
            required
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-700 to-purple-700 hover:from-blue-600 hover:to-purple-800 text-white font-semibold px-6 py-3 rounded-full transition"
          >
            Post Topic
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForumAddTopicModal;