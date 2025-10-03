import React, { useState, useRef } from 'react';
import { FaRegImage } from 'react-icons/fa';

const user = {
  name: 'Mizanur Rahman Jisan',
  avatar: 'jisan.jpg',
};

const CreatePost = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [postText, setPostText] = useState('');
  const [media, setMedia] = useState(null);
  const fileInputRef = useRef();

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => {
    setModalOpen(false);
    setPostText('');
    setMedia(null);
  };
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setMedia(e.target.files[0]);
    }
  };
  const handleImageClick = () => fileInputRef.current.click();

  return (
    <>
      {/* Main Card */}
      <div className="bg-[#20222B] rounded-2xl p-4 flex flex-col gap-3 w-full shadow">
        <div className="flex items-center gap-3">
          <img src={user.avatar} alt="avatar" className="h-10 w-10 rounded-full object-cover" />
          <button
            className="flex-1 text-left bg-[#232F3E] text-gray-200 px-4 py-2 rounded-full focus:outline-none hover:bg-[#263142] transition text-base"
            onClick={handleOpenModal}
          >
            What's on your mind , {user.name} ?
          </button>
        </div>
        <button
          className="flex items-center gap-2 text-white font-medium mt-1 px-2 py-1 rounded hover:bg-[#232F3E] w-fit"
          onClick={handleImageClick}
        >
          <FaRegImage className="text-green-400 text-xl" />
          <span>Photos/ Videos</span>
        </button>
        <input
          type="file"
          accept="image/*,video/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay for blur and transparency, closes modal on click */}
          <div
            className="absolute inset-0 bg-green bg-opacity-60 backdrop-blur-sm z-0"
            onClick={handleCloseModal}
            tabIndex={-1}
            aria-label="Close create post modal"
          />
          {/* Modal content */}
          <div
            className="relative z-10 bg-[#232A36] rounded-2xl p-6 w-full max-w-md mx-2 flex flex-col gap-4"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-4 text-gray-400 hover:text-white text-2xl font-bold"
              onClick={handleCloseModal}
              aria-label="Close"
            >
              &times;
            </button>
            <div className="flex items-center gap-3 mb-2">
              <img src={user.avatar} alt="avatar" className="h-10 w-10 rounded-full object-cover" />
              <span className="text-white font-semibold text-base">{user.name}</span>
            </div>
            <textarea
              className="w-full min-h-[80px] bg-[#20222B] text-gray-200 rounded-lg p-3 focus:outline-none resize-none"
              placeholder={`What's on your mind, ${user.name}?`}
              value={postText}
              onChange={e => setPostText(e.target.value)}
            />
            {media && (
              <div className="mt-2">
                {media.type.startsWith('image') ? (
                  <img src={URL.createObjectURL(media)} alt="preview" className="max-h-48 rounded-lg mx-auto" />
                ) : (
                  <video controls className="max-h-48 rounded-lg mx-auto">
                    <source src={URL.createObjectURL(media)} />
                  </video>
                )}
              </div>
            )}
            <div className="flex items-center gap-3 mt-2">
              <button
                className="flex items-center gap-2 px-3 py-2 bg-[#232F3E] text-green-400 rounded-lg text-sm font-medium hover:bg-[#263142]"
                onClick={handleImageClick}
              >
                <FaRegImage /> Add Photo/Video
              </button>
              <input
                type="file"
                accept="image/*,video/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
              <button
                className="ml-auto px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                onClick={handleCloseModal}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreatePost;