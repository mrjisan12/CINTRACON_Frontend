import React, { useState, useRef } from 'react';
import { FaHeart, FaRegComment, FaShare, FaThumbsUp, FaSadTear, FaAngry } from 'react-icons/fa';

const user = {
  name: 'Mizanur Rahman Jisan',
  avatar: 'jisan.jpg',
};

const posts = Array.from({ length: 10 }).map((_, i) => ({
  id: i + 1,
  user,
  time: `${9 - i}h ago`,
  text: "This is the new version of CINTRACON, lot’s of work to do. Stay tune with and give us your most valuable support",
  image: 'jisan.jpg',
}));

const reactions = [
  { name: 'Like', icon: <FaThumbsUp className="text-blue-500" /> },
  { name: 'Love', icon: <FaHeart className="text-red-500" /> },
  { name: 'Sad', icon: <FaSadTear className="text-yellow-400" /> },
  { name: 'Angry', icon: <FaAngry className="text-orange-600" /> },
];

const NewsFeed = () => {
  const [selectedReaction, setSelectedReaction] = useState({});
  const [hoveredPost, setHoveredPost] = useState(null);
  const [commentModal, setCommentModal] = useState({ open: false, post: null });
  const reactionTimeout = useRef();
  const [imageModal, setImageModal] = useState({ open: false, src: '' });

  // Keep reactions popup for 3s after mouse leave
  const handleReactionMouseEnter = (postId) => {
    if (reactionTimeout.current) clearTimeout(reactionTimeout.current);
    setHoveredPost(postId);
  };
  const handleReactionMouseLeave = () => {
    reactionTimeout.current = setTimeout(() => setHoveredPost(null), 3000);
  };

  return (
    <div className="flex flex-col gap-6">
      {posts.map((post) => (
        <div key={post.id} className="bg-[#20222B]  rounded-2xl shadow p-6 flex flex-col gap-4 relative">
          {/* Post Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={post.user.avatar} alt="avatar" className="h-9 w-9 rounded-full object-cover" />
              <div>
                <div className="text-white font-semibold leading-tight text-base">{post.user.name}</div>
                <div className="text-xs text-gray-400">{post.time}</div>
              </div>
            </div>
            <button className="text-gray-400 hover:text-gray-200 text-xl font-bold">&#8942;</button>
          </div>
          {/* Post Text */}
          <div className="text-gray-100 text-lg">
            {post.text}
          </div>
          {/* Post Image */}
          <div className="rounded-xl overflow-hidden border border-blue-400 cursor-pointer" onClick={() => setImageModal({ open: true, src: post.image })}>
            <img src={post.image} alt="post" className="w-full h-80 object-cover transition-transform duration-200 hover:scale-105" />
          </div>
          {/* Reaction Summary Bar */}
          <div className="flex gap-2 items-center">
            {reactions.map((r, idx) => {
              // For demo, generate random counts (replace with real data if available)
              const counts = [10, 15, 5, 2];
              return (
                <div key={r.name} className="flex items-center gap-1 bg-[#20222B] px-3 py-1 rounded-full shadow border border-[#374151]">
                  <span className="text-xl">{r.icon}</span>
                  <span className="text-gray-200 font-semibold text-sm">{counts[idx]}</span>
                </div>
              );
            })}
          </div>
      {/* Image Fullscreen Modal */}
      {imageModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay for blur and transparency, closes modal on click */}
          <div
            className="absolute inset-0 bg-green bg-opacity-70 backdrop-blur-sm z-0"
            onClick={() => setImageModal({ open: false, src: '' })}
            tabIndex={-1}
            aria-label="Close image modal"
          />
          <div className="relative z-10 flex flex-col items-center justify-center w-full h-full pointer-events-none">
            <button
              className="absolute top-6 right-8 text-gray-300 hover:text-white text-3xl font-bold z-20 pointer-events-auto"
              onClick={() => setImageModal({ open: false, src: '' })}
              aria-label="Close"
            >
              &times;
            </button>
            <img
              src={imageModal.src}
              alt="fullscreen"
              className="max-h-[80vh] max-w-[90vw] rounded-2xl shadow-lg border-4 border-blue-400 object-contain pointer-events-auto"
            />
          </div>
        </div>
      )}
          {/* Post Actions */}
          <div className="flex items-center pt-2 border-t border-[#374151] mt-2 w-full">
            {/* Reaction Button with Hover (Left) */}
            <div className="flex-1 flex justify-start">
              <div className="relative group">
                <button
                  className="flex items-center gap-2 text-gray-300 hover:text-blue-400 text-lg font-medium px-2 py-1"
                  onMouseEnter={() => handleReactionMouseEnter(post.id)}
                  onMouseLeave={handleReactionMouseLeave}
                  onClick={() => handleReactionMouseEnter(post.id)}
                >
                  {selectedReaction[post.id]?.icon || <FaThumbsUp className="text-gray-300" />} <span>{selectedReaction[post.id]?.name || 'Love'}</span>
                </button>
                {/* Reactions Popup */}
                {hoveredPost === post.id && (
                  <div
                    className="absolute bottom-10 left-0 flex gap-2 bg-[#232A36] px-3 py-2 rounded-xl shadow z-20 border border-[#374151] animate-fade-in"
                    onMouseEnter={() => handleReactionMouseEnter(post.id)}
                    onMouseLeave={handleReactionMouseLeave}
                  >
                    {reactions.map((r) => (
                      <button
                        key={r.name}
                        className="flex flex-col items-center group/reaction"
                        onClick={() => { setSelectedReaction((prev) => ({ ...prev, [post.id]: r })); setHoveredPost(null); }}
                      >
                        <span className="text-2xl">{r.icon}</span>
                        <span className="text-xs text-gray-300 group-hover/reaction:text-white">{r.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            {/* Comment Button (Center) */}
            <div className="flex-1 flex justify-center">
              <button
                className="flex items-center gap-2 text-gray-300 hover:text-blue-400 text-lg font-medium px-2 py-1"
                onClick={() => setCommentModal({ open: true, post })}
              >
                <FaRegComment /> Comment
              </button>
            </div>
            {/* Share Button (Right) */}
            <div className="flex-1 flex justify-end">
              <button className="flex items-center gap-2 text-gray-300 hover:text-blue-400 text-lg font-medium px-2 py-1">
                <FaShare /> Share
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Comment Modal */}
      {commentModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay for blur and transparency */}
            <div
              className="absolute inset-0 bg-green bg-opacity-60 backdrop-blur-sm z-0"
              onClick={() => setCommentModal({ open: false, post: null })}
              tabIndex={-1}
              aria-label="Close comment modal"
            />
          <div className="relative z-10 bg-[#232A36] rounded-2xl p-6 w-full max-w-xl mx-2 flex flex-col gap-4">
            <button
              className="absolute top-3 right-4 text-gray-400 hover:text-white text-2xl font-bold"
              onClick={() => setCommentModal({ open: false, post: null })}
              aria-label="Close"
            >
              &times;
            </button>
            {/* Post in Modal */}
            <div className="flex items-center gap-3 mb-2">
              <img src={commentModal.post.user.avatar} alt="avatar" className="h-9 w-9 rounded-full object-cover" />
              <div>
                <div className="text-white font-semibold leading-tight text-base">{commentModal.post.user.name}</div>
                <div className="text-xs text-gray-400">{commentModal.post.time}</div>
              </div>
            </div>
            <div className="text-gray-100 text-lg">{commentModal.post.text}</div>
            <div className="rounded-xl overflow-hidden border border-blue-400">
              <img src={commentModal.post.image} alt="post" className="w-full h-80 object-cover" />
            </div>

            {/* Reaction Summary Bar */}
          <div className="flex gap-4 items-center">
            {reactions.map((r, idx) => {
              // For demo, generate random counts (replace with real data if available)
              const counts = [10, 15, 5, 2];
              return (
                <div key={r.name} className="flex items-center gap-1 bg-[#20222B] px-3 py-1 rounded-full shadow border border-[#374151]">
                  <span className="text-xl">{r.icon}</span>
                  <span className="text-gray-200 font-semibold text-sm">{counts[idx]}</span>
                </div>
              );
            })}
          </div>
            
            {/* Comments Section */}
            <div className="mt-4">
              <div className="text-white font-semibold mb-2">Comments</div>
              <div className="flex flex-col gap-3 max-h-60 overflow-y-auto">
                {/* Example comments, replace with real data as needed */}
                <div className="flex items-start gap-2">
                  <img src={user.avatar} alt="avatar" className="h-8 w-8 rounded-full object-cover" />
                  <div className="bg-[#20222B] rounded-lg px-3 py-2 text-gray-200">
                    Awesome work!
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <img src="mamim.jpg" alt="avatar" className="h-8 w-8 rounded-full object-cover" />
                  <div className="bg-[#20222B] rounded-lg px-3 py-2 text-gray-200">
                    Keep it up!
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <img src="nawmi.jpg" alt="avatar" className="h-8 w-8 rounded-full object-cover" />
                  <div className="bg-[#20222B] rounded-lg px-3 py-2 text-gray-200">
                    Nice one!
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <img src="lubna.jpg" alt="avatar" className="h-8 w-8 rounded-full object-cover" />
                  <div className="bg-[#20222B] rounded-lg px-3 py-2 text-gray-200">
                    Very informative!
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <img src="alif.jpg" alt="avatar" className="h-8 w-8 rounded-full object-cover" />
                  <div className="bg-[#20222B] rounded-lg px-3 py-2 text-gray-200">
                    Great update!
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <img src="nishat.jpg" alt="avatar" className="h-8 w-8 rounded-full object-cover" />
                  <div className="bg-[#20222B] rounded-lg px-3 py-2 text-gray-200">
                    Loved it!
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <img src="ridi.jpg" alt="avatar" className="h-8 w-8 rounded-full object-cover" />
                  <div className="bg-[#20222B] rounded-lg px-3 py-2 text-gray-200">
                    Keep going!
                  </div>
                </div>
              </div>
              {/* Add Comment */}
              <div className="flex items-center gap-2 mt-4">
                <img src={user.avatar} alt="avatar" className="h-8 w-8 rounded-full object-cover" />
                <input
                  type="text"
                  className="flex-1 bg-[#20222B] text-gray-200 rounded-full px-4 py-2 focus:outline-none"
                  placeholder="Write a comment..."
                />
                <button className="px-4 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition">Post</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsFeed;