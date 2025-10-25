import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const ProfileHeader = ({ profileData }) => {
  const { userId } = useParams();
  const isOwnProfile = !userId; // যদি userId না থাকে, তাহলে নিজের profile
  const [isModalOpen, setIsModalOpen] = useState(false); // modal state
  const [modalImage, setModalImage] = useState(''); // কোন image show করবে

  if (!profileData) return null;

  const handleImageClick = (imageUrl, isCover = false) => {
    setModalImage(imageUrl);
    setIsModalOpen(true);
  };

  return (
    <div className="w-full flex flex-col items-center mb-8">
      {/* Cover Photo */}
      <div className="w-full h-48 md:h-64 rounded-2xl relative cursor-pointer">
        <img 
          src={profileData.cover_photo || "/cover.jpg"} 
          alt="cover" 
          className="w-full h-full object-cover rounded-2xl" 
          onClick={() => handleImageClick(profileData.cover_photo || "/cover.jpg", true)} // cover image click
        />

        {/* Profile Photo */}
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 flex items-center justify-center">
          <div 
            className="h-40 w-40 rounded-full border-4 border-[#232A36] bg-white overflow-hidden shadow-lg flex items-center justify-center cursor-pointer"
            onClick={() => handleImageClick(profileData.profile_photo || "/default-avatar.png", false)} // profile image click
          >
            <img 
              src={profileData.profile_photo || "/default-avatar.png"} 
              alt="avatar" 
              className="h-full w-full object-cover" 
              onError={(e) => {
                e.target.src = "/default-avatar.png";
              }}
            />
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="mt-24 flex flex-col items-center">
        <div className="text-white font-bold text-2xl md:text-3xl">
          {profileData.full_name}
        </div>
        <div className="text-gray-400 text-base md:text-lg">
          {profileData.bio || "Student | Tech Enthusiast"}
        </div>
        <div className="flex items-center gap-3 mt-2">
          <span className="bg-[#232A36] text-white px-4 py-1 rounded-full font-semibold flex items-center gap-2">
            <img src="/diamond.png" alt="Diamond" className="h-5 w-5 object-contain" />
            {profileData.points} Points
          </span>
          {isOwnProfile && (
            <Link
              to="/profile-edit"
              className="bg-blue-600 text-white px-4 py-1 rounded-full font-semibold hover:bg-blue-700 transition"
            >
              Edit Profile
            </Link>
          )}
        </div>
      </div>

      {/* ✅ Image Modal */}
      {isModalOpen && (
        <div
          onClick={() => setIsModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()} // prevent close when clicking on image
            className="max-w-5xl w-full p-4"
          >
            <img
              src={modalImage}
              alt="Full View"
              className="w-full h-full rounded-2xl object-cover shadow-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileHeader;