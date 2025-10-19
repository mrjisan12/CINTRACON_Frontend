import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavbarMain from '../../../Ui/NavbarMain';
import UserPosts from './UserPosts';
import IntroSidebar from './IntroSidebar';
import PlanningSidebar from './PlanningSidebar';
import ProfileHeader from './ProfileHeader';
import { getProfileById } from '../../../api/profileApi';

const UserProfileById = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userId } = useParams();

  // Fetch profile data by ID
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem("accessToken");
        if (token) {
          const response = await getProfileById(token, userId, { page: 1, size: 10 });
          if (response.data.success) {
            setProfileData(response.data.data);
          } else {
            setError("Failed to fetch profile data");
          }
        } else {
          setError("Please login to view profile");
        }
      } catch (err) {
        setError("Error fetching profile data");
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchProfileData();
    }
  }, [userId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#181820]">
        <NavbarMain />
        <div className="flex justify-center items-center h-64">
          <div className="text-white text-lg">Loading profile...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#181820]">
        <NavbarMain />
        <div className="flex justify-center items-center h-64">
          <div className="text-red-400 text-lg">{error}</div>
        </div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="min-h-screen bg-[#181820]">
        <NavbarMain />
        <div className="flex justify-center items-center h-64">
          <div className="text-red-400 text-lg">Profile not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#181820]">
      <NavbarMain />
      <ProfileHeader profileData={profileData} />
      <div className="max-w-7xl mx-auto px-2 md:px-6 flex gap-6">
        {/* Left Sidebar */}
        <div className="hidden lg:block w-1/4">
          <IntroSidebar profileData={profileData} />
        </div>
        {/* Main Content */}
        <div className="flex-1 max-w-2xl mx-auto flex flex-col gap-6">
          <UserPosts profilePosts={profileData.posts} />
        </div>
        {/* Right Sidebar */}
        <div className="hidden xl:block w-1/4">
          <PlanningSidebar />
        </div>
      </div>
    </div>
  );
};

export default UserProfileById;