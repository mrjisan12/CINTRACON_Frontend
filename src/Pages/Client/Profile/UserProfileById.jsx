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

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await getProfileById(userId, { page: 1, size: 10 });
                if (response.data.success) {
                    setProfileData(response.data.data);
                } else {
                    setError("Failed to fetch profile data");
                }
            } catch {
                setError("Error fetching profile data");
            } finally {
                setLoading(false);
            }
        };

        if (userId) fetchProfileData();
    }, [userId]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#181820]">
                <NavbarMain />
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500" />
                </div>
            </div>
        );
    }

    if (error || !profileData) {
        return (
            <div className="min-h-screen bg-[#181820]">
                <NavbarMain />
                <div className="flex justify-center items-center h-64">
                    <div className="text-red-400 text-lg">{error || "Profile not found"}</div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#181820]">
            <NavbarMain />
            <ProfileHeader profileData={profileData} targetUserId={userId} />
            <div className="max-w-7xl mx-auto px-2 md:px-6 flex gap-6">
                <div className="hidden lg:block w-1/4">
                    <IntroSidebar profileData={profileData} />
                </div>
                <div className="flex-1 max-w-2xl mx-auto flex flex-col gap-6">
                    <UserPosts profilePosts={profileData.posts} />
                </div>
                <div className="hidden xl:block w-1/4">
                    <PlanningSidebar />
                </div>
            </div>
        </div>
    );
};

export default UserProfileById;
