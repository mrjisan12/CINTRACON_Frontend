import React from 'react';
import { Link } from 'react-router-dom';

const ProfileHeader = () => (
  <div className="w-full flex flex-col items-center mb-8">
    {/* Cover Photo */}
    <div className="w-full h-48 md:h-64 rounded-2xl relative">
      <img src="/cover.jpg" alt="cover" className="w-full h-full object-cover" />
      {/* Profile Photo */}
      <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 flex items-center justify-center">
        <div className="h-40 w-40 rounded-full border-4 border-[#232A36] bg-white overflow-hidden shadow-lg flex items-center justify-center">
          <img src="jisan.jpg" alt="avatar" className="h-full w-full object-cover" />
        </div>
      </div>
    </div>

    {/* Info Section */}
    <div className="mt-24 flex flex-col items-center">
      <div className="text-white font-bold text-2xl md:text-3xl">Mizanur Rahman Jisan</div>
      <div className="text-gray-400 text-base md:text-lg">Software Engineer | Tech Enthusiast</div>
      <div className="flex items-center gap-3 mt-2">
        <span className="bg-[#232A36] text-white px-4 py-1 rounded-full font-semibold">925 Points</span>
        <Link
          to="/profile-edit"
          className="bg-blue-600 text-white px-4 py-1 rounded-full font-semibold hover:bg-blue-700 transition"
        >
          Edit Profile
        </Link>
      </div>
    </div>
  </div>
);

export default ProfileHeader;
