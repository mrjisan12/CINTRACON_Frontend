import React, { useState } from 'react'

const JobsManage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedJob, setSelectedJob] = useState(null)
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

  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Frontend Developer",
      company: "TechNova Solutions",
      salary: "৳60,000 - ৳80,000",
      location: "Mohammodpur, Dhaka",
      type: "Full-time",
      deadline: "2024-12-30",
      duration: "9:00 AM - 6:00 PM",
      postedBy: "Shahid Al Mamin",
      userPhoto: "/mamim.jpg",
      postedTime: "2h ago",
      image: "/job1.jpg"
    },
    {
      id: 2,
      title: "Backend Engineer",
      company: "CodeHub Technologies",
      salary: "৳70,000 - ৳90,000",
      location: "Mirpur, Dhaka",
      type: "Remote",
      deadline: "2025-01-15",
      duration: "Flexible Hours",
      postedBy: "Lamia Akter Jesmin",
      userPhoto: "/jesmin.jpeg",
      postedTime: "5h ago",
      image: "/job2.jpg"
    },
    {
      id: 3,
      title: "UI/UX Designer",
      company: "DesignPro Studio",
      salary: "৳45,000 - ৳65,000",
      location: "Uttara, Dhaka",
      type: "Part-time",
      deadline: "2024-12-25",
      duration: "2:00 PM - 8:00 PM",
      postedBy: "Nashrah Zakir Nawmi",
      userPhoto: "/nawmi.jpg",
      postedTime: "1d ago",
      image: "/job3.jpg"
    },
    {
      id: 4,
      title: "Graphic Designer",
      company: "AI Innovations Ltd",
      salary: "৳80,000 - ৳1,00,000",
      location: "Gulshan, Dhaka",
      type: "Full-time",
      deadline: "2025-01-10",
      duration: "8:30 AM - 5:30 PM",
      postedBy: "Alif Mahmud Talha",
      userPhoto: "/alif.jpg",
      postedTime: "3h ago",
      image: "/job4.jpg"
    },
    {
      id: 5,
      title: "DevOps Engineer",
      company: "Cloud Systems Inc",
      salary: "৳75,000 - ৳95,000",
      location: "Banani, Dhaka",
      type: "Full-time",
      deadline: "2025-01-05",
      duration: "9:30 AM - 6:30 PM",
      postedBy: "Mizanur Rahman Jisan",
      userPhoto: "/jisan.jpg",
      postedTime: "8h ago",
      image: "/job5.jpg"
    },
    {
      id: 6,
      title: "Mobile App Developer",
      company: "AppCraft Studios",
      salary: "৳55,000 - ৳75,000",
      location: "Farmgate, Dhaka",
      type: "Remote",
      deadline: "2024-12-28",
      duration: "Flexible Hours",
      postedBy: "Shahid Al Mamin",
      userPhoto: "/mamim.jpg",
      postedTime: "6h ago",
      image: "/job6.jpg"
    }
  ])

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === 'all' || job.type === typeFilter
    
    return matchesSearch && matchesType
  })

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
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
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      if (showEditModal && selectedJob) {
        // Update existing job
        setJobs(jobs.map(job => 
          job.id === selectedJob.id 
            ? { ...job, ...formData }
            : job
        ))
        alert('Job updated successfully!')
      } else {
        // Add new job
        const newJob = {
          id: jobs.length + 1,
          ...formData,
          postedBy: "Admin User",
          userPhoto: "https://via.placeholder.com/40/6B7280/FFFFFF?text=AD",
          postedTime: "Just now"
        }
        setJobs([...jobs, newJob])
        alert('Job posted successfully!')
      }
      
      setShowAddModal(false)
      setShowEditModal(false)
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
      setSelectedJob(null)
    } catch (error) {
      console.error('Error posting job:', error)
      alert('Error posting job. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEdit = (job) => {
    setSelectedJob(job)
    setFormData({
      title: job.title,
      company: job.company,
      salary: job.salary,
      location: job.location,
      type: job.type,
      deadline: job.deadline,
      duration: job.duration,
      image: null
    })
    setImagePreview(job.image)
    setShowEditModal(true)
  }

  const handleDelete = (job) => {
    setSelectedJob(job)
    setShowDeleteModal(true)
  }

  const confirmDelete = async () => {
    setIsSubmitting(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 800))
      setJobs(jobs.filter(job => job.id !== selectedJob.id))
      alert('Job deleted successfully!')
      setShowDeleteModal(false)
      setSelectedJob(null)
    } catch (error) {
      console.error('Error deleting job:', error)
      alert('Error deleting job. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#181820] p-6">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Job Management</h1>
        <p className="text-gray-400">Manage and monitor all job postings</p>
      </div>

      {/* Controls Section */}
      <div className="bg-[#1E2130] rounded-2xl p-6 border border-[#2A2D3A] mb-6">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[#1E2130] border-2 border-[#2A2D3A] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-[#1E2130] border-2 border-[#2A2D3A] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all"
            >
              <option value="all">All Types</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Remote">Remote</option>
              <option value="Contract">Contract</option>
            </select>
          </div>

          {/* Add Job Button */}
          <button 
            onClick={() => setShowAddModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:from-purple-500 hover:to-blue-500 transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
          >
            <span>➕</span>
            Add New Job
          </button>
        </div>
      </div>

      {/* Jobs Table */}
      <div className="bg-[#1E2130] rounded-2xl border border-[#2A2D3A] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#2A2D3A] border-b border-[#3A3D4A]">
                <th className="px-6 py-4 text-left text-white font-semibold">ID</th>
                <th className="px-6 py-4 text-left text-white font-semibold">Posted By</th>
                <th className="px-6 py-4 text-left text-white font-semibold">Job Details</th>
                <th className="px-6 py-4 text-left text-white font-semibold">Salary</th>
                <th className="px-6 py-4 text-left text-white font-semibold">Location</th>
                <th className="px-6 py-4 text-left text-white font-semibold">Image</th>
                <th className="px-6 py-4 text-left text-white font-semibold">Job Type</th>
                <th className="px-6 py-4 text-left text-white font-semibold">Deadline</th>
                <th className="px-6 py-4 text-left text-white font-semibold">Working Hours</th>
                <th className="px-6 py-4 text-left text-white font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredJobs.map((job) => (
                <tr 
                  key={job.id} 
                  className="border-b border-[#3A3D4A] hover:bg-[#2A2D3A] transition-colors"
                >
                  {/* ID */}
                  <td className="px-6 py-4">
                    <div className="text-purple-400 font-bold">{job.id}</div>
                  </td>
                  
                  {/* Posted By */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={job.userPhoto} 
                        alt={job.postedBy}
                        className="w-10 h-10 rounded-full border-2 border-purple-500/30"
                      />
                      <div>
                        <p className="text-white font-medium">{job.postedBy}</p>
                        <p className="text-gray-400 text-xs">{job.postedTime}</p>
                      </div>
                    </div>
                  </td>
                  
                  {/* Job Details */}
                  <td className="px-6 py-4">
                    <div>
                      <h3 className="text-white font-semibold text-lg">{job.title}</h3>
                      <p className="text-gray-400 text-sm">{job.company}</p>
                    </div>
                  </td>
                  
                  {/* Salary */}
                  <td className="px-6 py-4">
                    <span className="text-white font-medium">{job.salary}</span>
                  </td>
                  
                  {/* Location */}
                  <td className="px-6 py-4">
                    <span className="text-white">{job.location}</span>
                  </td>
                  
                  {/* Image */}
                  <td className="px-6 py-4">
                    <img 
                      src={job.image} 
                      alt={job.title}
                      className="w-12 h-12 rounded-lg object-cover border border-purple-500/30"
                    />
                  </td>
                  
                  {/* Job Type */}
                  <td className="px-6 py-4">
                    <span className="text-white font-medium">{job.type}</span>
                  </td>
                  
                  {/* Deadline */}
                  <td className="px-6 py-4">
                    <span className="text-white">{formatDate(job.deadline)}</span>
                  </td>
                  
                  {/* Working Hours */}
                  <td className="px-6 py-4">
                    <span className="text-white">{job.duration}</span>
                  </td>
                  
                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleEdit(job)}
                        className="px-3 py-1 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(job)}
                        className="px-3 py-1 bg-red-600 text-white text-xs rounded-lg hover:bg-red-700 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredJobs.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-2xl font-bold text-white mb-3">No jobs found</h3>
            <p className="text-gray-400">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Add Job Modal */}
      {(showAddModal || showEditModal) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl bg-[#1E2130] rounded-2xl border-2 border-purple-500/50 shadow-2xl shadow-purple-500/30">
            
            {/* Modal Header */}
            <div className="relative p-6 border-b border-purple-500/30">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">
                  {showEditModal ? 'Edit Job' : 'Create New Job'}
                </h2>
                <button
                  onClick={() => {
                    setShowAddModal(false)
                    setShowEditModal(false)
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
              <p className="text-gray-400 mt-2">
                {showEditModal ? 'Update the job details below' : 'Fill in all the job details to create a new job posting'}
              </p>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-semibold mb-2">Job Title *</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., Frontend Developer"
                      className="w-full bg-[#1E2130] border-2 border-[#2A2D3A] rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2">Company *</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      required
                      placeholder="Company name"
                      className="w-full bg-[#1E2130] border-2 border-[#2A2D3A] rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all"
                    />
                  </div>
                </div>

                {/* Salary & Location */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-semibold mb-2">Salary *</label>
                    <input
                      type="text"
                      name="salary"
                      value={formData.salary}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., ৳60,000 - ৳80,000"
                      className="w-full bg-[#1E2130] border-2 border-[#2A2D3A] rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2">Location *</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., Dhaka, Remote"
                      className="w-full bg-[#1E2130] border-2 border-[#2A2D3A] rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all"
                    />
                  </div>
                </div>

                {/* Job Type & Deadline */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-semibold mb-2">Job Type *</label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-[#1E2130] border-2 border-[#2A2D3A] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all"
                    >
                      <option value="">Select Job Type</option>
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Remote">Remote</option>
                      <option value="Contract">Contract</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2">Deadline *</label>
                    <input
                      type="date"
                      name="deadline"
                      value={formData.deadline}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-[#1E2130] border-2 border-[#2A2D3A] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all"
                    />
                  </div>
                </div>

                {/* Duration & Image Upload */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-semibold mb-2">Working Hours *</label>
                    <input
                      type="text"
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., 9:00 AM - 6:00 PM"
                      className="w-full bg-[#1E2130] border-2 border-[#2A2D3A] rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all"
                    />
                  </div>

                  {/* Image Upload */}
                  <div>
                    <label className="block text-white font-semibold mb-2">Job Image *</label>
                    
                    {!imagePreview ? (
                      <div className="w-full bg-[#1E2130] border-2 border-[#2A2D3A] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all cursor-pointer">
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
                          <span>Click to upload job image</span>
                        </label>
                      </div>
                    ) : (
                      <div className="w-full bg-[#1E2130] border-2 border-purple-500 rounded-xl px-4 py-3 text-white">
                        <div className="flex items-center gap-3">
                          <img 
                            src={imagePreview} 
                            alt="Preview" 
                            className="w-10 h-10 rounded-lg object-cover border border-purple-500/30"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-white text-sm font-medium truncate">
                              {formData.image?.name || 'Current Image'}
                            </p>
                            <p className="text-gray-400 text-xs">
                              {formData.image ? `${(formData.image.size / 1024 / 1024).toFixed(2)} MB` : 'Image uploaded'}
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
            <div className="p-6 border-t border-purple-500/30 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowAddModal(false)
                  setShowEditModal(false)
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
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-xl hover:from-purple-500 hover:to-blue-500 transform hover:scale-105 transition-all duration-200 shadow-lg shadow-purple-500/25 flex items-center gap-2 border border-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {showEditModal ? 'Updating...' : 'Creating...'}
                  </>
                ) : (
                  <>
                    {showEditModal ? 'Update Job' : 'Create Job'}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-[#1E2130] rounded-2xl border-2 border-red-500/50 shadow-2xl shadow-red-500/30">
            
            {/* Modal Header */}
            <div className="relative p-6 border-b border-red-500/30">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">
                  Delete Job
                </h2>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="w-8 h-8 flex items-center justify-center bg-gray-500/30 text-gray-400 rounded-full hover:bg-gray-500/50 transition-colors duration-200 border border-gray-500/30"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-red-500/30">
                  <span className="text-red-400 text-2xl">⚠️</span>
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">Are you sure?</h3>
                <p className="text-gray-400 mb-4">
                  You are about to delete the job posting for <span className="text-white font-semibold">"{selectedJob.title}"</span> at <span className="text-white font-semibold">{selectedJob.company}</span>. This action cannot be undone.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-red-500/30 flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-6 py-2 bg-gray-600 text-white font-medium rounded-xl hover:bg-gray-700 transition-all duration-200 border border-gray-500/30"
              >
                Cancel
              </button>
              
              <button
                onClick={confirmDelete}
                disabled={isSubmitting}
                className="px-6 py-2 bg-gradient-to-r from-red-600 to-orange-600 text-white font-medium rounded-xl hover:from-red-500 hover:to-orange-500 transform hover:scale-105 transition-all duration-200 shadow-lg shadow-red-500/25 flex items-center gap-2 border border-red-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    Delete Job
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

export default JobsManage