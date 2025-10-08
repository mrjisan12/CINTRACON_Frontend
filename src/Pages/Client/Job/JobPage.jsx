import React, { useState } from 'react'
import NavbarMain from '../../../Ui/NavbarMain'
import LeftSideBar from '../../../Components/LeftSideBar'

const JobPage = () => {
  const [showPostModal, setShowPostModal] = useState(false)
  const [showImageModal, setShowImageModal] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    salary: '',
    location: '',
    type: '',
    deadline: '',
    duration: '',
    image: null
  })
  const [imagePreview, setImagePreview] = useState(null)

  const jobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "TechNova Solutions",
      salary: "৳60,000 - ৳80,000",
      location: "Mohammodpur, Dhaka",
      type: "Full-time",
      deadline: "Dec 30, 2024",
      duration: "9:00 AM - 6:00 PM",
      postedBy: {
        name: "Shahid Al Mamin",
        avatar: "/mamim.jpg"
      },
      postedTime: "2h ago",
      image: "/job1.jpg",
      buttonColor: "from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700",
      borderColor: "border-blue-500/50 hover:border-blue-400"
    },
    {
      id: 2,
      title: "Backend Engineer",
      company: "CodeHub Technologies",
      salary: "৳70,000 - ৳90,000",
      location: "Mirpur, Dhaka",
      type: "Remote",
      deadline: "Jan 15, 2025",
      duration: "Flexible Hours",
      postedBy: {
        name: "Lamia Akter Jesmin",
        avatar: "/jesmin.jpeg"
      },
      postedTime: "5h ago",
      image: "/job2.jpg",
      buttonColor: "from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700",
      borderColor: "border-green-500/50 hover:border-green-400"
    },
    {
      id: 3,
      title: "UI/UX Designer",
      company: "DesignPro Studio",
      salary: "৳45,000 - ৳65,000",
      location: "Uttara, Dhaka",
      type: "Part-time",
      deadline: "Dec 25, 2024",
      duration: "2:00 PM - 8:00 PM",
      postedBy: {
        name: "Nashrah Zakir Nawmi",
        avatar: "/nawmi.jpg"
      },
      postedTime: "1d ago",
      image: "/job3.jpg",
      buttonColor: "from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700",
      borderColor: "border-pink-500/50 hover:border-pink-400"
    },
    {
      id: 4,
      title: "Graphic Designer",
      company: "AI Innovations Ltd",
      salary: "৳80,000 - ৳1,00,000",
      location: "Gulshan, Dhaka",
      type: "Full-time",
      deadline: "Jan 10, 2025",
      duration: "8:30 AM - 5:30 PM",
      postedBy: {
        name: "Alif Mahmud Talha",
        avatar: "/alif.jpg"
      },
      postedTime: "3h ago",
      image: "/job4.jpg",
      buttonColor: "from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700",
      borderColor: "border-orange-500/50 hover:border-orange-400"
    },
    {
      id: 5,
      title: "DevOps Engineer",
      company: "Cloud Systems Inc",
      salary: "৳75,000 - ৳95,000",
      location: "Banani, Dhaka",
      type: "Full-time",
      deadline: "Jan 5, 2025",
      duration: "9:30 AM - 6:30 PM",
      postedBy: {
        name: "Mizanur Rahman Jisan",
        avatar: "/jisan.jpg"
      },
      postedTime: "8h ago",
      image: "/job5.jpg",
      buttonColor: "from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700",
      borderColor: "border-indigo-500/50 hover:border-indigo-400"
    },
    {
      id: 6,
      title: "Mobile App Developer",
      company: "AppCraft Studios",
      salary: "৳55,000 - ৳75,000",
      location: "Farmgate, Dhaka",
      type: "Remote",
      deadline: "Dec 28, 2024",
      duration: "Flexible Hours",
      postedBy: {
        name: "Shahid Al Mamin",
        avatar: "/mamim.jpg"
      },
      postedTime: "6h ago",
      image: "/job6.jpg",
      buttonColor: "from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700",
      borderColor: "border-cyan-500/50 hover:border-cyan-400"
    }
  ]

  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc)
    setShowImageModal(true)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file
      }))
      
      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = () => {
    setFormData(prev => ({
      ...prev,
      image: null
    }))
    setImagePreview(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.image) {
      alert('Please upload a job image!')
      return
    }
    
    setIsSubmitting(true)
    
    // Simulate API call with image upload
    try {
      // In real app, you would upload the image to a server here
      // For demo, we'll just simulate the upload
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      console.log('Job posted with image:', {
        ...formData,
        image: formData.image.name // In real app, this would be the uploaded image URL
      })
      
      setShowPostModal(false)
      setFormData({
        title: '',
        company: '',
        salary: '',
        location: '',
        type: '',
        deadline: '',
        duration: '',
        image: null
      })
      setImagePreview(null)
      alert('Job posted successfully!')
    } catch (error) {
      console.error('Error posting job:', error)
      alert('Error posting job. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#181820]">
      {/* Navbar */}
      <NavbarMain />

      {/* Layout */}
      <div className="max-w-7xl mx-auto px-2 md:px-6 py-8 flex gap-6">
        
        {/* Left Sidebar */}
        <div className="hidden lg:flex w-1/5 flex-col gap-6">
          <LeftSideBar />
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Top Section */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
            <div className="text-center flex-1">
              <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                Find Your Dream Job
              </h1>
              <p className="text-gray-300 text-sm mt-1">
                Discover amazing opportunities and take the next step in your career
              </p>
            </div>
            <button 
              onClick={() => setShowPostModal(true)}
              className="ml-auto px-6 py-2 rounded-lg text-white font-semibold shadow-lg 
                bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 
                transform hover:scale-105 transition-all duration-300 text-sm"
            >
              Post a Job 
            </button>
          </div>

          {/* Job Cards Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
            {jobs.map((job) => (
              <div 
                key={job.id}
                className={`relative bg-[#20222B] rounded-xl overflow-hidden border-2 ${job.borderColor}
                  transition-all duration-300 group cursor-pointer hover:scale-[1.02] hover:shadow-xl`}
              >
                <div className="relative">
                  {/* Job Image */}
                  <div 
                    className="relative h-48 w-full rounded-t-xl overflow-hidden cursor-pointer"
                    onClick={() => handleImageClick(job.image)}
                  >
                    <img 
                      src={job.image} 
                      alt={job.title} 
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                    {/* Dark Image Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70"></div>
                    
                    {/* Job Type Badge */}
                    <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-md text-white text-xs font-bold px-2 py-1 rounded-full">
                      {job.type}
                    </div>

                    {/* Company Name on Image */}
                    <div className="absolute bottom-3 left-3">
                      <p className="text-gray-200 text-sm drop-shadow-lg font-medium">{job.company}</p>
                    </div>

                    {/* Image Zoom Icon */}
                    <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-black/40 backdrop-blur-sm rounded-full p-1.5">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3-3H7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-4">
                    {/* Job Title - Below Image */}
                    <div className="mb-4">
                      <h2 className="text-lg font-bold text-white">
                        {job.title}
                      </h2>
                    </div>

                    {/* Job Details - Single Column Layout */}
                    <div className="space-y-3 mb-4">
                      {/* Salary */}
                      <div className="flex items-center gap-3 text-gray-300">
                        <span className="text-green-400 text-base">💰</span>
                        <span className="text-sm font-medium">{job.salary}</span>
                      </div>
                      
                      {/* Location */}
                      <div className="flex items-center gap-3 text-gray-300">
                        <span className="text-blue-400 text-base">📍</span>
                        <span className="text-sm">{job.location}</span>
                      </div>
                      
                      {/* Deadline */}
                      <div className="flex items-center gap-3 text-gray-300">
                        <span className="text-red-400 text-base">🗓️</span>
                        <span className="text-sm">Deadline: {job.deadline}</span>
                      </div>
                      
                      {/* Duration */}
                      <div className="flex items-center gap-3 text-gray-300">
                        <span className="text-purple-400 text-base">⏰</span>
                        <span className="text-sm">{job.duration}</span>
                      </div>
                    </div>

                    {/* Apply Button */}
                    <div className="flex justify-center mb-4">
                      <button className={`px-4 py-2 rounded-lg text-white font-semibold text-sm
                        bg-gradient-to-r ${job.buttonColor} transform hover:scale-105 hover:shadow-lg
                        transition-all duration-300 w-full`}>
                        Apply Now
                      </button>
                    </div>

                    {/* Posted By - Avatar First, "Posted by" above Name, Time on Right */}
                    <div className="flex items-center justify-between gap-2 pt-3 border-t border-gray-700">
                      <div className="flex items-center gap-2">
                        <img 
                          src={job.postedBy.avatar} 
                          alt={job.postedBy.name}
                          className="w-6 h-6 rounded-full border border-blue-500"
                        />
                        <div>
                          <p className="text-xs text-gray-400">Posted by</p>
                          <p className="text-sm font-medium text-white">{job.postedBy.name}</p>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500 bg-gray-800/50 px-2 py-1 rounded">
                        {job.postedTime}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Image Preview Modal */}
      {showImageModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-green/90 backdrop-blur-md transition-all duration-300"
          onClick={() => setShowImageModal(false)}
        >
          <div 
            className="relative max-w-4xl max-h-[90vh] w-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button
            <button
              onClick={() => setShowImageModal(false)}
              className="absolute -top-12 right-0 z-10 w-10 h-10 flex items-center justify-center bg-red-500/30 text-red-400 rounded-full hover:bg-red-500/50 transition-all duration-200 border border-red-500/30 hover:scale-110"
            >
              ✕
            </button> */}
            
            {/* Image Container */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/20 border-2 border-blue-500/30 bg-black">
              <img 
                src={selectedImage} 
                alt="Job Preview" 
                className="max-w-full max-h-[80vh] object-contain"
              />
              
              {/* Loading Indicator */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            </div>

            {/* Navigation Arrows (if you have multiple images) */}
            {/* <button 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/20 backdrop-blur-md text-white rounded-full hover:bg-white/30 transition-all duration-200 border border-white/30 hover:scale-110"
              onClick={() => {
                // Add navigation logic here if needed
              }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button> */}
            
            {/* <button 
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/20 backdrop-blur-md text-white rounded-full hover:bg-white/30 transition-all duration-200 border border-white/30 hover:scale-110"
              onClick={() => {
                // Add navigation logic here if needed
              }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button> */}
          </div>
        </div>
      )}

      {/* Post Job Modal */}
      {showPostModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl bg-gradient-to-br from-[#1E2130] to-[#181820] rounded-3xl border-2 border-blue-500/50 shadow-2xl shadow-blue-500/30">
            
            {/* Modal Header */}
            <div className="relative p-6 border-b border-blue-500/30">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  💼 Post New Job
                </h2>
                <button
                  onClick={() => {
                    setShowPostModal(false)
                    setFormData({
                      title: '',
                      company: '',
                      salary: '',
                      location: '',
                      type: '',
                      deadline: '',
                      duration: '',
                      image: null
                    })
                    setImagePreview(null)
                  }}
                  className="w-8 h-8 flex items-center justify-center bg-red-500/30 text-red-400 rounded-full hover:bg-red-500/50 transition-colors duration-200 border border-red-500/30"
                >
                  ✕
                </button>
              </div>
              <p className="text-gray-400 mt-2">Fill in the basic job details to get started</p>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Job Title & Company */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-semibold mb-2">📝 Job Title *</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., Frontend Developer"
                      className="w-full bg-[#1E2130] border-2 border-[#2A2D3A] rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2">🏢 Company *</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      required
                      placeholder="Company name"
                      className="w-full bg-[#1E2130] border-2 border-[#2A2D3A] rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all"
                    />
                  </div>
                </div>

                {/* Salary & Location */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-semibold mb-2">💰 Salary *</label>
                    <input
                      type="text"
                      name="salary"
                      value={formData.salary}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., ৳60,000 - ৳80,000"
                      className="w-full bg-[#1E2130] border-2 border-[#2A2D3A] rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2">📍 Location *</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., Dhaka, Remote"
                      className="w-full bg-[#1E2130] border-2 border-[#2A2D3A] rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all"
                    />
                  </div>
                </div>

                {/* Job Type & Deadline */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-semibold mb-2">⏱️ Job Type *</label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-[#1E2130] border-2 border-[#2A2D3A] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all"
                    >
                      <option value="">Select Job Type</option>
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Remote">Remote</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2">🗓️ Application Deadline *</label>
                    <input
                      type="date"
                      name="deadline"
                      value={formData.deadline}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-[#1E2130] border-2 border-[#2A2D3A] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all"
                    />
                  </div>
                </div>

                {/* Duration & Image Upload - Side by Side */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Working Hours */}
                  <div>
                    <label className="block text-white font-semibold mb-2">⏰ Working Hours *</label>
                    <input
                      type="text"
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., 9:00 AM - 6:00 PM"
                      className="w-full bg-[#1E2130] border-2 border-[#2A2D3A] rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all"
                    />
                  </div>

                  {/* Image Upload - Same style as other fields */}
                  <div>
                    <label className="block text-white font-semibold mb-2">🖼️ Job Image *</label>
                    
                    {!imagePreview ? (
                      <div className="w-full bg-[#1E2130] border-2 border-[#2A2D3A] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                          id="image-upload"
                        />
                        <label
                          htmlFor="image-upload"
                          className="cursor-pointer flex items-center gap-3 text-gray-400"
                        >
                          <span className="text-lg">📁</span>
                          <span>Click to upload job image</span>
                        </label>
                      </div>
                    ) : (
                      <div className="w-full bg-[#1E2130] border-2 border-blue-500 rounded-xl px-4 py-3 text-white">
                        <div className="flex items-center gap-3">
                          <img 
                            src={imagePreview} 
                            alt="Preview" 
                            className="w-10 h-10 rounded-lg object-cover border border-blue-500/30"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-white text-sm font-medium truncate">
                              {formData.image.name}
                            </p>
                            <p className="text-gray-400 text-xs">
                              {(formData.image.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={handleRemoveImage}
                            className="w-8 h-8 bg-red-500/20 text-red-400 rounded-lg flex items-center justify-center hover:bg-red-500/30 transition-colors duration-200 border border-red-500/30 text-sm"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </form>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-blue-500/30 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowPostModal(false)
                  setFormData({
                    title: '',
                    company: '',
                    salary: '',
                    location: '',
                    type: '',
                    deadline: '',
                    duration: '',
                    image: null
                  })
                  setImagePreview(null)
                }}
                className="px-6 py-2 bg-gray-600 text-white font-medium rounded-xl hover:bg-gray-700 transition-all duration-200 border border-gray-500/30"
              >
                Cancel
              </button>
              
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !formData.image}
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:from-blue-500 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg shadow-blue-500/25 flex items-center gap-2 border border-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Posting...
                  </>
                ) : (
                  <>
                    <span>🚀</span>
                    Post Job
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default JobPage