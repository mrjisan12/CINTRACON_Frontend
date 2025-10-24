import React, { useState, useEffect } from 'react';
import NavbarMain from '../../../Ui/NavbarMain';
import UserPosts from './UserPosts';
import IntroSidebar from './IntroSidebar';
import PlanningSidebar from './PlanningSidebar';
import ProfileHeader from './ProfileHeader';
import { getProfileInfo } from '../../../api/profileApi';

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [postsPage, setPostsPage] = useState(1);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  // Fetch initial profile data
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("accessToken");
        if (token) {
          const response = await getProfileInfo(token, { page: 1, size: 10 });
          if (response.data.success) {
            setProfileData(response.data.data);
            setHasMorePosts(response.data.data.posts?.length === 10);
          } else {
            setError("Failed to fetch profile data");
          }
        }
      } catch (err) {
        setError("Error fetching profile data");
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  // Load more posts function
  const loadMorePosts = async () => {
    if (!hasMorePosts || loadingMore) return;

    try {
      setLoadingMore(true);
      const token = localStorage.getItem("accessToken");
      const nextPage = postsPage + 1;
      
      const response = await getProfileInfo(token, { page: nextPage, size: 10 });
      if (response.data.success && response.data.data.posts?.length > 0) {
        setProfileData(prev => ({
          ...prev,
          posts: [...prev.posts, ...response.data.data.posts]
        }));
        setPostsPage(nextPage);
        setHasMorePosts(response.data.data.posts.length === 10);
      } else {
        setHasMorePosts(false);
      }
    } catch (err) {
      console.error("Error loading more posts:", err);
    } finally {
      setLoadingMore(false);
    }
  };

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
          <UserPosts 
            profilePosts={profileData.posts} 
            loadMorePosts={loadMorePosts}
            hasMorePosts={hasMorePosts}
            loadingMore={loadingMore}
          />
        </div>
        {/* Right Sidebar */}
        <div className="hidden xl:block w-1/4">
          <PlanningSidebar />
        </div>
      </div>
    </div>
  );
};

export default Profile;