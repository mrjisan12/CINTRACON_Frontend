import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarMain from '../../../Ui/NavbarMain';
import { getProfileInfo, updateProfile } from '../../../api/profileApi';

const ProfileEdit = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState({
    full_name: '',
    department: '',
    semester: '',
    section: '',
    batch_no: '',
    phone_no: '',
    blood_grp: '',
    bio: '',
    relationship_status: '',
    facebook_link: '',
    instagram_link: '',
    linkedin_link: '',
    github_link: '',
    profile_photo: null,
    cover_photo: null,
  });
  const [avatarPreview, setAvatarPreview] = useState('/default-avatar.png');
  const [coverPreview, setCoverPreview] = useState('/cover.jpg');
  const [avatarFile, setAvatarFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [email, setEmail] = useState('');

  // Fetch current profile data
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("accessToken");
        if (token) {
          const response = await getProfileInfo(token, { page: 1, size: 1 });
          if (response.data.success) {
            const data = response.data.data;
            console.log("Fetched profile data:", data);
            console.log("Cover photo URL:", data.cover_photo);
            console.log("Profile photo URL:", data.profile_photo);
            
            setProfile({
              full_name: data.full_name || '',
              department: data.department || '',
              semester: data.semester || '',
              section: data.section || '',
              batch_no: data.batch_no || '',
              phone_no: data.phone_no || '',
              blood_grp: data.blood_grp || '',
              bio: data.bio || '',
              relationship_status: data.relationship_status || '',
              facebook_link: data.facebook_link || '',
              instagram_link: data.instagram_link || '',
              linkedin_link: data.linkedin_link || '',
              github_link: data.github_link || '',
              profile_photo: data.profile_photo,
              cover_photo: data.cover_photo,
            });
            setEmail(data.email || '');
            
            // Set preview images - check if URLs are valid
            if (data.profile_photo && data.profile_photo !== 'null' && data.profile_photo !== 'undefined') {
              setAvatarPreview(data.profile_photo);
            } else {
              setAvatarPreview('/default-avatar.png');
            }
            
            if (data.cover_photo && data.cover_photo !== 'null' && data.cover_photo !== 'undefined') {
              setCoverPreview(data.cover_photo);
            } else {
              setCoverPreview('/cover.jpg');
            }
          }
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      if (type === 'profile_photo') {
        setAvatarPreview(url);
        setAvatarFile(file);
      }
      if (type === 'cover_photo') {
        setCoverPreview(url);
        setCoverFile(file);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const token = localStorage.getItem("accessToken");
      
      // Create FormData for file upload
      const formData = new FormData();
      
      // Append all text fields
      Object.keys(profile).forEach(key => {
        if (key !== 'profile_photo' && key !== 'cover_photo') {
          formData.append(key, profile[key]);
        }
      });
      
      // Append files if selected
      if (avatarFile) {
        formData.append('profile_photo', avatarFile);
      }
      if (coverFile) {
        formData.append('cover_photo', coverFile);
      }

      console.log("Submitting form data...");
      const response = await updateProfile(token, formData);
      
      if (response.data.success) {
        alert('Profile updated successfully!');
        navigate('/profile');
      } else {
        alert('Failed to update profile');
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      alert('Error updating profile');
    } finally {
      setSaving(false);
    }
  };

  // Handle image loading errors
  const handleImageError = (type) => {
    console.log(`Error loading ${type} image`);
    if (type === 'cover') {
      setCoverPreview('/cover.jpg');
    }
    if (type === 'avatar') {
      setAvatarPreview('/default-avatar.png');
    }
  };

  if (loading && !profile.full_name) {
    return (
      <div className="min-h-screen bg-[#181820]">
        <NavbarMain />
        <div className="flex justify-center items-center h-64">
          <div className="text-white text-lg">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#181820]">
      <NavbarMain />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Edit Profile</h1>
          <p className="text-gray-400">Update your personal information and social links</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#20222B] rounded-2xl shadow-lg overflow-hidden">
          {/* Cover Photo Section - FIXED */}
          <div className="relative h-48 md:h-64 bg-gradient-to-r from-blue-600 to-purple-600">
            {/* Background fallback */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600"></div>
            
            {/* Cover Image */}
            <img 
              src={coverPreview} 
              alt="Cover" 
              className="w-full h-full object-cover relative z-10"
              onError={() => handleImageError('cover')}
              onLoad={() => console.log("Cover image loaded successfully")}
            />
            
           {/* Edit Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black  bg-opacity-10 flex items-center justify-center z-20 backdrop-blur-[1px]">
              <label className="bg-black bg-opacity-40 backdrop-blur-sm text-white px-6 py-3 rounded-full cursor-pointer hover:bg-opacity-60 transition-all duration-200 font-semibold text-sm border border-white/20">
                📷 Change Cover Photo
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={e => handleImageChange(e, 'cover_photo')} 
                />
              </label>
            </div>
          </div>

          {/* Profile Photo Section */}
          <div className="relative px-6 md:px-8 -mt-20 mb-6 z-30">
            <div className="flex flex-col items-center">
              <div className="relative h-32 w-32 rounded-full border-4 border-[#20222B] bg-[#20222B] overflow-hidden shadow-2xl">
                <img 
                  src={avatarPreview} 
                  alt="Profile" 
                  className="h-full w-full object-cover"
                  onError={() => handleImageError('avatar')}
                  onLoad={() => console.log("Avatar image loaded successfully")}
                />
                <label className="absolute bottom-2 right-2 bg-white text-white p-2 rounded-full cursor-pointer hover:bg-black transition-all duration-200 shadow-lg">
                  📸
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={e => handleImageChange(e, 'profile_photo')} 
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="px-6 md:px-8 pb-8">
            {/* Personal Information Section */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-white mb-6 pb-2 border-b border-gray-700">Personal Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 mb-2 font-medium">Full Name *</label>
                  <input 
                    name="full_name" 
                    value={profile.full_name} 
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-[#1E2130] text-white border border-[#2A2D3A] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2 font-medium">Email</label>
                  <input 
                    value={email} 
                    disabled
                    className="w-full px-4 py-3 rounded-xl bg-[#1E2130] text-gray-400 border border-[#2A2D3A] cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2 font-medium">Department *</label>
                  <select 
                    name="department" 
                    value={profile.department} 
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-[#1E2130] text-white border border-[#2A2D3A] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Select Department</option>
                    <option value="cse">CSE</option>
                    <option value="eee">EEE</option>
                    <option value="bba">BBA</option>
                    <option value="pharm">Pharmacy</option>
                    <option value="civil">Civil</option>
                    <option value="english">English</option>
                    <option value="law">Law</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2 font-medium">Batch No *</label>
                  <input 
                    name="batch_no" 
                    value={profile.batch_no} 
                    onChange={handleChange}
                    type="number"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-[#1E2130] text-white border border-[#2A2D3A] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="e.g., 52"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2 font-medium">Semester *</label>
                  <select 
                    name="semester" 
                    value={profile.semester} 
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-[#1E2130] text-white border border-[#2A2D3A] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Select Semester</option>
                    <option value="1.1">1.1</option>
                    <option value="1.2">1.2</option>
                    <option value="2.1">2.1</option>
                    <option value="2.2">2.2</option>
                    <option value="3.1">3.1</option>
                    <option value="3.2">3.2</option>
                    <option value="4.1">4.1</option>
                    <option value="4.2">4.2</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2 font-medium">Section *</label>
                  <select 
                    name="section" 
                    value={profile.section} 
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-[#1E2130] text-white border border-[#2A2D3A] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Select Section</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2 font-medium">Phone Number</label>
                  <input 
                    name="phone_no" 
                    value={profile.phone_no} 
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#1E2130] text-white border border-[#2A2D3A] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="e.g., 01712345678"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2 font-medium">Blood Group</label>
                  <select 
                    name="blood_grp" 
                    value={profile.blood_grp} 
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#1E2130] text-white border border-[#2A2D3A] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Select Blood Group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </select>
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-gray-300 mb-2 font-medium">Bio</label>
                <textarea 
                  name="bio" 
                  value={profile.bio} 
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-3 rounded-xl bg-[#1E2130] text-white border border-[#2A2D3A] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="Tell us about yourself..."
                />
              </div>

              <div className="mt-6">
                <label className="block text-gray-300 mb-2 font-medium">Relationship Status</label>
                <select 
                  name="relationship_status" 
                  value={profile.relationship_status} 
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-[#1E2130] text-white border border-[#2A2D3A] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="">Select Relationship Status</option>
                  <option value="Single">Single</option>
                  <option value="In a relationship">In a relationship</option>
                  <option value="Engaged">Engaged</option>
                  <option value="Married">Married</option>
                </select>
              </div>
            </div>

            {/* Social Links Section */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-white mb-6 pb-2 border-b border-gray-700">Social Links</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 mb-2 font-medium">Facebook</label>
                  <input 
                    name="facebook_link" 
                    value={profile.facebook_link} 
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#1E2130] text-white border border-[#2A2D3A] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="https://facebook.com/username"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2 font-medium">Instagram</label>
                  <input 
                    name="instagram_link" 
                    value={profile.instagram_link} 
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#1E2130] text-white border border-[#2A2D3A] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="https://instagram.com/username"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2 font-medium">LinkedIn</label>
                  <input 
                    name="linkedin_link" 
                    value={profile.linkedin_link} 
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#1E2130] text-white border border-[#2A2D3A] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2 font-medium">GitHub</label>
                  <input 
                    name="github_link" 
                    value={profile.github_link} 
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#1E2130] text-white border border-[#2A2D3A] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="https://github.com/username"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-end pt-6 border-t border-gray-700">
              <button
                type="button"
                onClick={() => navigate('/profile')}
                className="px-8 py-3 rounded-full font-semibold border border-gray-600 text-gray-300 hover:bg-gray-700 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-8 py-3 rounded-full font-semibold bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileEdit;