import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { followUser } from '../../../api/authApi';
import { toast } from 'react-toastify';

const ProfileHeader = ({ profileData, targetUserId }) => {
    const isOtherProfile = !!targetUserId;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalImage, setModalImage] = useState('');
    const [isFollowing, setIsFollowing] = useState(profileData?.is_following || false);
    const [followersCount, setFollowersCount] = useState(profileData?.followers_count || 0);
    const [followLoading, setFollowLoading] = useState(false);

    if (!profileData) return null;

    const handleFollowToggle = async () => {
        setFollowLoading(true);
        try {
            const res = await followUser(targetUserId);
            if (res.data.success) {
                setIsFollowing(res.data.data.is_following);
                setFollowersCount(res.data.data.followers_count);
            }
        } catch {
            toast.error("Failed to update follow status.");
        } finally {
            setFollowLoading(false);
        }
    };

    return (
        <div className="w-full flex flex-col items-center mb-8">
            {/* Cover Photo */}
            <div className="w-full h-48 md:h-64 rounded-2xl relative cursor-pointer">
                <img
                    src={profileData.cover_photo || "/cover.jpg"}
                    alt="cover"
                    className="w-full h-full object-cover rounded-2xl"
                    onClick={() => { setModalImage(profileData.cover_photo || "/cover.jpg"); setIsModalOpen(true); }}
                />
                {/* Profile Photo */}
                <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 flex items-center justify-center">
                    <div
                        className="h-40 w-40 rounded-full border-4 border-[#232A36] bg-white overflow-hidden shadow-lg flex items-center justify-center cursor-pointer"
                        onClick={() => { setModalImage(profileData.profile_photo || "/default-avatar.png"); setIsModalOpen(true); }}
                    >
                        <img
                            src={profileData.profile_photo || "/default-avatar.png"}
                            alt="avatar"
                            className="h-full w-full object-cover"
                            onError={e => { e.target.src = "/default-avatar.png"; }}
                        />
                    </div>
                </div>
            </div>

            {/* Info Section */}
            <div className="mt-24 flex flex-col items-center gap-2">
                <div className="text-white font-bold text-2xl md:text-3xl">
                    {profileData.full_name}
                </div>
                <div className="text-gray-400 text-base md:text-lg">
                    {profileData.bio || "Student | Tech Enthusiast"}
                </div>

                {/* Points + Followers/Following */}
                <div className="flex items-center gap-4 mt-1 flex-wrap justify-center">
                    <span className="bg-[#232A36] text-white px-4 py-1 rounded-full font-semibold flex items-center gap-2">
                        <img src="/diamond.png" alt="Diamond" className="h-5 w-5 object-contain" />
                        {profileData.points} Points
                    </span>
                    <span className="text-gray-300 text-sm">
                        <span className="text-white font-semibold">{followersCount}</span> Followers
                    </span>
                    <span className="text-gray-300 text-sm">
                        <span className="text-white font-semibold">{profileData.following_count || 0}</span> Following
                    </span>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 mt-2">
                    {isOtherProfile ? (
                        <button
                            onClick={handleFollowToggle}
                            disabled={followLoading}
                            className={`px-6 py-1.5 rounded-full font-semibold transition disabled:opacity-60 ${
                                isFollowing
                                    ? 'bg-[#232A36] text-white hover:bg-[#2d3748] border border-[#374151]'
                                    : 'bg-blue-600 text-white hover:bg-blue-700'
                            }`}
                        >
                            {followLoading ? '...' : isFollowing ? 'Unfollow' : 'Follow'}
                        </button>
                    ) : (
                        <Link
                            to="/profile-edit"
                            className="bg-blue-600 text-white px-5 py-1.5 rounded-full font-semibold hover:bg-blue-700 transition"
                        >
                            Edit Profile
                        </Link>
                    )}
                </div>
            </div>

            {/* Image Modal */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
                    onClick={() => setIsModalOpen(false)}
                >
                    <div className="max-w-5xl w-full p-4" onClick={e => e.stopPropagation()}>
                        <img src={modalImage} alt="Full View" className="w-full h-full rounded-2xl object-cover shadow-lg" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileHeader;
