import React, { useState } from 'react'
import NavbarMain from '../../../Ui/NavbarMain'

const initialProfile = {
  name: 'Mizanur Rahman Jisan',
  title: 'Software Engineer | Tech Enthusiast',
  department: 'CSE',
  batch: '52',
  semester: '3.2',
  section: 'D',
  blood: 'O+',
  email: '2210918@ug.cu.ac.bd',
  phone: '0179270364',
  facebook: '',
  instagram: '',
  linkedin: '',
  avatar: 'jisan.jpg',
  cover: '/cover.jpg',
};

const ProfileEdit = () => {
  const [profile, setProfile] = useState(initialProfile);
  const [avatarPreview, setAvatarPreview] = useState(profile.avatar);
  const [coverPreview, setCoverPreview] = useState(profile.cover);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      if (type === 'avatar') setAvatarPreview(url);
      if (type === 'cover') setCoverPreview(url);
      setProfile((prev) => ({ ...prev, [type]: file }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save logic here
    alert('Profile updated!');
  };

  return (
    <div className="min-h-screen bg-[#181820]">
      <NavbarMain/>
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-[#20222B] rounded-2xl shadow p-8 mt-10 flex flex-col gap-8">
        {/* Cover Image */}
        <div className="relative w-full h-40 md:h-56 rounded-2xl overflow-hidden mb-8">
          <img src={coverPreview} alt="cover" className="w-full h-full object-cover" />
          <label className="absolute bottom-3 right-3 bg-[#232A36] text-white px-3 py-1 rounded cursor-pointer text-sm hover:bg-blue-600 transition">
            Change Cover
            <input type="file" accept="image/*" className="hidden" onChange={e => handleImageChange(e, 'cover')} />
          </label>
        </div>
        {/* Avatar */}
        <div className="flex flex-col items-center -mt-20 mb-4">
          <div className="relative h-32 w-32 rounded-full border-4 border-[#232A36] bg-white overflow-hidden shadow-lg flex items-center justify-center">
            <img src={avatarPreview} alt="avatar" className="h-full w-full object-cover" />
            <label className="absolute bottom-2 right-2 bg-[#232A36] text-white px-2 py-1 rounded cursor-pointer text-xs hover:bg-blue-600 transition">
              Change
              <input type="file" accept="image/*" className="hidden" onChange={e => handleImageChange(e, 'avatar')} />
            </label>
          </div>
        </div>
        {/* Info Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-300 mb-1">Full Name</label>
            <input name="name" value={profile.name} onChange={handleChange} className="w-full px-4 py-2 rounded bg-[#232A36] text-white focus:outline-none" />
          </div>
          <div>
            <label className="block text-gray-300 mb-1">Title</label>
            <input name="title" value={profile.title} onChange={handleChange} className="w-full px-4 py-2 rounded bg-[#232A36] text-white focus:outline-none" />
          </div>
          <div>
            <label className="block text-gray-300 mb-1">Department</label>
            <input name="department" value={profile.department} onChange={handleChange} className="w-full px-4 py-2 rounded bg-[#232A36] text-white focus:outline-none" />
          </div>
          <div>
            <label className="block text-gray-300 mb-1">Batch</label>
            <input name="batch" value={profile.batch} onChange={handleChange} className="w-full px-4 py-2 rounded bg-[#232A36] text-white focus:outline-none" />
          </div>
          <div>
            <label className="block text-gray-300 mb-1">Semester</label>
            <input name="semester" value={profile.semester} onChange={handleChange} className="w-full px-4 py-2 rounded bg-[#232A36] text-white focus:outline-none" />
          </div>
          <div>
            <label className="block text-gray-300 mb-1">Section</label>
            <input name="section" value={profile.section} onChange={handleChange} className="w-full px-4 py-2 rounded bg-[#232A36] text-white focus:outline-none" />
          </div>
          <div>
            <label className="block text-gray-300 mb-1">Blood Group</label>
            <input name="blood" value={profile.blood} onChange={handleChange} className="w-full px-4 py-2 rounded bg-[#232A36] text-white focus:outline-none" />
          </div>
          <div>
            <label className="block text-gray-300 mb-1">Email</label>
            <input name="email" value={profile.email} onChange={handleChange} className="w-full px-4 py-2 rounded bg-[#232A36] text-white focus:outline-none" />
          </div>
          <div>
            <label className="block text-gray-300 mb-1">Phone</label>
            <input name="phone" value={profile.phone} onChange={handleChange} className="w-full px-4 py-2 rounded bg-[#232A36] text-white focus:outline-none" />
          </div>
        </div>
        {/* Social Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-gray-300 mb-1">Facebook</label>
            <input name="facebook" value={profile.facebook} onChange={handleChange} className="w-full px-4 py-2 rounded bg-[#232A36] text-white focus:outline-none" />
          </div>
          <div>
            <label className="block text-gray-300 mb-1">Instagram</label>
            <input name="instagram" value={profile.instagram} onChange={handleChange} className="w-full px-4 py-2 rounded bg-[#232A36] text-white focus:outline-none" />
          </div>
          <div>
            <label className="block text-gray-300 mb-1">LinkedIn</label>
            <input name="linkedin" value={profile.linkedin} onChange={handleChange} className="w-full px-4 py-2 rounded bg-[#232A36] text-white focus:outline-none" />
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition">Save Changes</button>
        </div>
      </form>
    </div>
  )
}

export default ProfileEdit