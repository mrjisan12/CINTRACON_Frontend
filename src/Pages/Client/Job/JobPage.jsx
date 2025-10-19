import React, { useState, useEffect } from 'react'
import NavbarMain from '../../../Ui/NavbarMain'
import LeftSideBar from '../../../Components/LeftSideBar'
import { postJob, getAllJobs } from '../../../api/jobApi'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom';

const JobPage = () => {
  const [showPostModal, setShowPostModal] = useState(false)
  const [showImageModal, setShowImageModal] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [jobs, setJobs] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    company_name: '',
    salary: '',
    place: '',
    start_time: '',
    end_time: '',
    apply_link: '',
    job_post_image: null,
    deadline: ''
  })
  const [imagePreview, setImagePreview] = useState(null)

  // Fetch jobs on component mount
  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async (page = 1, size = 10) => {
    try {
      const token = localStorage.getItem('accessToken');
      setIsLoading(true)
      const response = await getAllJobs(page, size, token)
      
      if (response.success) {
        if (page === 1) {
          setJobs(response.data)
        } else {
          setJobs(prev => [...prev, ...response.data])
        }
        
        // Check if there are more pages (you might need to adjust this based on your API response)
        setHasMore(response.data.length === size)
        setCurrentPage(page)
      }
    } catch (error) {
      console.error('Error fetching jobs:', error)
      alert('Failed to fetch jobs')
    } finally {
      setIsLoading(false)
    }
  }

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
        job_post_image: file
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
      job_post_image: null
    }))
    setImagePreview(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.job_post_image) {
      alert('Please upload a job image!')
      return
    }
    
    setIsSubmitting(true)
    
    try {

      const token = localStorage.getItem('accessToken');

      // Create FormData for file upload
      const submitData = new FormData()
      submitData.append('title', formData.title)
      submitData.append('description', formData.description)
      submitData.append('company_name', formData.company_name)
      submitData.append('salary', formData.salary)
      submitData.append('place', formData.place)
      submitData.append('start_time', formData.start_time)
      submitData.append('end_time', formData.end_time)
      submitData.append('apply_link', formData.apply_link)
      submitData.append('deadline', formData.deadline)
      submitData.append('job_post_image', formData.job_post_image)

      const response = await postJob(submitData, token)
      
      if (response.success) {
        setShowPostModal(false)
        setFormData({
          title: '',
          description: '',
          company_name: '',
          salary: '',
          place: '',
          start_time: '',
          end_time: '',
          apply_link: '',
          job_post_image: null,
          deadline: ''
        })
        setImagePreview(null)
        
        // Refresh the jobs list
        fetchJobs(1, 10)
        toast.success('Job posted successfully!')
      } else {
       toast.error('Failed to post job. Please try again.')
      }
    } catch (error) {
      console.error('Error posting job:', error)
      toast.error('An error occurred while posting the job.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatSalary = (salary) => {
    if (!salary) return 'Negotiable'
    return `৳${Number(salary).toLocaleString()}`
  }

  const formatTime = (time) => {
    if (!time) return 'Flexible'
    return time.slice(0, 5) // Convert "09:00:00" to "09:00"
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'No deadline'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  const formatRelativeTime = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays === 1) return '1d ago'
    return `${diffInDays}d ago`
  }

  const getJobType = (startTime, endTime) => {
    if (!startTime || !endTime) return 'Flexible'
    return 'Full-time' // You can modify this logic based on your requirements
  }

  const getButtonColor = (index) => {
    const colors = [
      "from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700",
      "from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700",
      "from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700",
      "from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700",
      "from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700",
      "from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
    ]
    return colors[index % colors.length]
  }

  const getBorderColor = (index) => {
    const colors = [
      "border-blue-500/50 hover:border-blue-400",
      "border-green-500/50 hover:border-green-400",
      "border-pink-500/50 hover:border-pink-400",
      "border-orange-500/50 hover:border-orange-400",
      "border-indigo-500/50 hover:border-indigo-400",
      "border-cyan-500/50 hover:border-cyan-400"
    ]
    return colors[index % colors.length]
  }

  const loadMoreJobs = () => {
    fetchJobs(currentPage + 1, 10)
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
              💼 Post a Job 
            </button>
          </div>

          {/* Loading State */}
          {isLoading && jobs.length === 0 && (
            <div className="flex justify-center items-center py-20">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {/* Job Cards Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
            {jobs.map((job, index) => (
              <div 
                key={job.id}
                className={`relative bg-[#20222B] rounded-xl overflow-hidden border-2 ${getBorderColor(index)}
                  transition-all duration-300 group cursor-pointer hover:scale-[1.02] hover:shadow-xl`}
              >
                <div className="relative">
                  {/* Job Image */}
                  <div 
                    className="relative h-48 w-full rounded-t-xl overflow-hidden cursor-pointer"
                    onClick={() => handleImageClick(job.job_post_image)}
                  >
                    <img 
                      src={job.job_post_image} 
                      alt={job.title} 
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                    {/* Dark Image Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70"></div>
                    
                    {/* Job Type Badge */}
                    <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-md text-white text-xs font-bold px-2 py-1 rounded-full">
                      {getJobType(job.start_time, job.end_time)}
                    </div>

                    {/* Company Name on Image */}
                    <div className="absolute bottom-3 left-3">
                      <p className="text-gray-200 text-sm drop-shadow-lg font-medium">{job.company_name}</p>
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
                      <p className="text-gray-400 text-sm mt-1 line-clamp-2">
                        {job.description}
                      </p>
                    </div>

                    {/* Job Details - Single Column Layout */}
                    <div className="space-y-3 mb-4">
                      {/* Salary */}
                      <div className="flex items-center gap-3 text-gray-300">
                        <span className="text-green-400 text-base">💰</span>
                        <span className="text-sm font-medium">{formatSalary(job.salary)}</span>
                      </div>
                      
                      {/* Location */}
                      <div className="flex items-center gap-3 text-gray-300">
                        <span className="text-blue-400 text-base">📍</span>
                        <span className="text-sm">{job.place}</span>
                      </div>
                      
                      {/* Deadline */}
                      <div className="flex items-center gap-3 text-gray-300">
                        <span className="text-red-400 text-base">🗓️</span>
                        <span className="text-sm">Deadline: {formatDate(job.deadline)}</span>
                      </div>
                      
                      {/* Duration */}
                      <div className="flex items-center gap-3 text-gray-300">
                        <span className="text-purple-400 text-base">⏰</span>
                        <span className="text-sm">
                          {formatTime(job.start_time)} - {formatTime(job.end_time)}
                        </span>
                      </div>
                    </div>

                    {/* Apply Button */}
                    <div className="flex justify-center mb-4">
                      <a 
                        href={job.apply_link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`px-4 py-2 rounded-lg text-white font-semibold text-sm
                          bg-gradient-to-r ${getButtonColor(index)} transform hover:scale-105 hover:shadow-lg
                          transition-all duration-300 w-full text-center`}
                      >
                        Apply Now
                      </a>
                    </div>

                    {/* Posted By - Avatar First, "Posted by" above Name, Time on Right */}
                    <div className="flex items-center justify-between gap-2 pt-3 border-t border-gray-700">
                      <div className="flex items-center gap-2">
                        <Link 
                          to={`/user-profile/${job.user?.id}`}
                          className="flex items-center gap-2 hover:opacity-80 transition-opacity duration-200"
                        >
                          <img 
                            src={job.user?.profile_photo || '/default-avatar.png'} 
                            alt={job.user?.full_name}
                            className="w-6 h-6 rounded-full border border-blue-500"
                          />
                          <div>
                            <p className="text-xs text-gray-400">Posted by</p>
                            <p className="text-sm font-medium text-white hover:underline">
                              {job.user?.full_name}
                            </p>
                          </div>
                        </Link>
                      </div>
                      <span className="text-xs text-gray-500 bg-gray-800/50 px-2 py-1 rounded">
                        {formatRelativeTime(job.created_at)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {hasMore && jobs.length > 0 && (
            <div className="flex justify-center mt-8">
              <button
                onClick={loadMoreJobs}
                disabled={isLoading}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Loading...' : 'Load More Jobs'}
              </button>
            </div>
          )}

          {/* No Jobs Found */}
          {!isLoading && jobs.length === 0 && (
            <div className="text-center py-20">
              <div className="text-gray-400 text-6xl mb-4">💼</div>
              <h3 className="text-xl font-semibold text-white mb-2">No Jobs Available</h3>
              <p className="text-gray-400">Be the first to post a job opportunity!</p>
            </div>
          )}
        </div>
      </div>

      {/* Image Preview Modal */}
      {showImageModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md transition-all duration-300"
          onClick={() => setShowImageModal(false)}
        >
          <div 
            className="relative max-w-4xl max-h-[90vh] w-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowImageModal(false)}
              className="absolute -top-12 right-0 z-10 w-10 h-10 flex items-center justify-center bg-red-500/30 text-red-400 rounded-full hover:bg-red-500/50 transition-all duration-200 border border-red-500/30 hover:scale-110"
            >
              ✕
            </button>
            
            {/* Image Container */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/20 border-2 border-blue-500/30 bg-black">
              <img 
                src={selectedImage} 
                alt="Job Preview" 
                className="max-w-full max-h-[80vh] object-contain"
              />
            </div>
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
                <h2 className="text-2xl font-bold text-white bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
                  💼 Post New Job
                </h2>
                <button
                  onClick={() => {
                    setShowPostModal(false)
                    setFormData({
                      title: '',
                      description: '',
                      company_name: '',
                      salary: '',
                      place: '',
                      start_time: '',
                      end_time: '',
                      apply_link: '',
                      job_post_image: null,
                      deadline: ''
                    })
                    setImagePreview(null)
                  }}
                  className="w-8 h-8 flex items-center justify-center bg-red-500/30 text-red-400 rounded-full hover:bg-red-500/50 transition-colors duration-200 border border-red-500/30"
                >
                  ✕
                </button>
              </div>
              <p className="text-gray-400 mt-2">Fill in the job details to get started</p>
            </div>

            {/* Modal Content */}
            <div className="p-6 max-h-[70vh] overflow-y-auto">
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
                      name="company_name"
                      value={formData.company_name}
                      onChange={handleInputChange}
                      required
                      placeholder="Company name"
                      className="w-full bg-[#1E2130] border-2 border-[#2A2D3A] rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-white font-semibold mb-2">📄 Description *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows="3"
                    placeholder="Job description and requirements..."
                    className="w-full bg-[#1E2130] border-2 border-[#2A2D3A] rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all resize-none"
                  />
                </div>

                {/* Salary & Location */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-semibold mb-2">💰 Salary *</label>
                    <input
                      type="number"
                      name="salary"
                      value={formData.salary}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., 60000"
                      className="w-full bg-[#1E2130] border-2 border-[#2A2D3A] rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2">📍 Location *</label>
                    <input
                      type="text"
                      name="place"
                      value={formData.place}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., Dhaka, Remote"
                      className="w-full bg-[#1E2130] border-2 border-[#2A2D3A] rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all"
                    />
                  </div>
                </div>

                {/* Start Time & End Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-semibold mb-2">🕐 Start Time *</label>
                    <input
                      type="time"
                      name="start_time"
                      value={formData.start_time}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-[#1E2130] border-2 border-[#2A2D3A] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2">🕔 End Time *</label>
                    <input
                      type="time"
                      name="end_time"
                      value={formData.end_time}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-[#1E2130] border-2 border-[#2A2D3A] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all"
                    />
                  </div>
                </div>

                {/* Apply Link & Deadline */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-semibold mb-2">🔗 Apply Link *</label>
                    <input
                      type="url"
                      name="apply_link"
                      value={formData.apply_link}
                      onChange={handleInputChange}
                      required
                      placeholder="https://example.com/apply"
                      className="w-full bg-[#1E2130] border-2 border-[#2A2D3A] rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all"
                    />
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

                {/* Image Upload */}
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
                            {formData.job_post_image.name}
                          </p>
                          <p className="text-gray-400 text-xs">
                            {(formData.job_post_image.size / 1024 / 1024).toFixed(2)} MB
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
              </form>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-blue-500/30 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowPostModal(false)
                  setFormData({
                    title: '',
                    description: '',
                    company_name: '',
                    salary: '',
                    place: '',
                    start_time: '',
                    end_time: '',
                    apply_link: '',
                    job_post_image: null,
                    deadline: ''
                  })
                  setImagePreview(null)
                }}
                className="px-6 py-2 bg-gray-600 text-white font-medium rounded-xl hover:bg-gray-700 transition-all duration-200 border border-gray-500/30"
              >
                Cancel
              </button>
              
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !formData.job_post_image}
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