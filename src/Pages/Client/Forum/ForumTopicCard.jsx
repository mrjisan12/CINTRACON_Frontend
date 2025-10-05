import React from "react";
import { FaCommentDots } from "react-icons/fa";

const ForumTopicCard = ({ topic, onOpenModal }) => (
  <div className="bg-gradient-to-b from-[#232A36] to-[#20222B] rounded-3xl shadow-lg p-7">
    <div className="flex items-center gap-4 mb-2">
      <img
        src={topic.author.avatar}
        alt={topic.author.name}
        className="h-12 w-12 rounded-full object-cover border-2 border-blue-500"
      />
      <div>
        <div className="text-white font-semibold text-lg">{topic.author.name}</div>
        <div className="text-xs text-gray-400">{topic.author.time}</div>
      </div>
    </div>
    <div>
      <h2 className="text-xl md:text-2xl font-bold text-white mb-1">{topic.title}</h2>
      <p className="text-gray-300 text-base mb-2">{topic.description}</p>
      <button
        className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#232A36] text-blue-400 hover:bg-blue-700 hover:text-white transition font-semibold text-sm mt-2"
        style={{ minHeight: "unset" }}
        onClick={() => onOpenModal(topic)}
      >
        <FaCommentDots className="text-base" />
        {`Solutions (${topic.solutions.length})`}
      </button>
    </div>
  </div>
);

export default ForumTopicCard;