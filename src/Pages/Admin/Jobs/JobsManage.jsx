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
    duration: ''
  })

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
      postedTime: "2h ago"
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
      postedTime: "5h ago"
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
      postedTime: "1d ago"
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
      postedTime: "3h ago"
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
      postedTime: "8h ago"
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
      postedTime: "6h ago"
    }
  ])

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === 'all' || job.type === typeFilter
    
    return matchesSearch && matchesType
  })

  const getTypeColor = (type) => {
    switch (type) {
      case 'Full-time': return 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
      case 'Part-time': return 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
      case 'Remote': return 'bg-green-500/20 text-green-400 border border-green-500/30'
      case 'Contract': return 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
    }
  }

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

  const handleSubmit = async (e) => {
    e.preventDefault()
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
        duration: ''
      })
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
      duration: job.duration
    })
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
      <div className="bg-[#20222B] rounded-2xl border border-[#232A36] p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#1E2939] border border-[#232A36] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-[#1E2939] border border-[#232A36] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all"
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
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
          >
            <span>➕</span>
            Add New Job
          </button>
        </div>
      </div>

      {/* Jobs Table */}
      <div className="bg-[#20222B] rounded-2xl border border-[#232A36] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#232A36]">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Posted By</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Job Details</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Salary</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Location</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Job Type</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Deadline</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Working Hours</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Company</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#232A36]">
              {filteredJobs.map((job) => (
                <tr key={job.id} className="hover:bg-[#1E2939] transition-colors duration-200">
                  {/* Posted By */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={job.userPhoto} 
                        alt={job.postedBy}
                        className="w-10 h-10 rounded-full border-2 border-blue-500/30"
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
                    <div className="flex items-center gap-2">
                      <span className="text-green-400">💰</span>
                      <span className="text-white font-medium">{job.salary}</span>
                    </div>
                  </td>
                  
                  {/* Location */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-blue-400">📍</span>
                      <span className="text-white">{job.location}</span>
                    </div>
                  </td>
                  
                  {/* Job Type */}
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${getTypeColor(job.type)}`}>
                      {job.type}
                    </span>
                  </td>
                  
                  {/* Deadline */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-red-400">📅</span>
                      <span className="text-white">{formatDate(job.deadline)}</span>
                    </div>
                  </td>
                  
                  {/* Working Hours */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-400">⏰</span>
                      <span className="text-white">{job.duration}</span>
                    </div>
                  </td>
                  
                  {/* Company */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-orange-400">🏢</span>
                      <span className="text-white">{job.company}</span>
                    </div>
                  </td>
                  
                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleEdit(job)}
                        className="w-10 h-10 bg-blue-500/20 text-blue-400 rounded-xl flex items-center justify-center hover:bg-blue-500/30 transition-all duration-200 border border-blue-500/30 hover:scale-110"
                        title="Edit Job"
                      >
                        <span className="text-lg">✏️</span>
                      </button>
                      <button 
                        onClick={() => handleDelete(job)}
                        className="w-10 h-10 bg-red-500/20 text-red-400 rounded-xl flex items-center justify-center hover:bg-red-500/30 transition-all duration-200 border border-red-500/30 hover:scale-110"
                        title="Delete Job"
                      >
                        <span className="text-lg">🗑️</span>
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
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-gray-400 text-2xl">🔍</span>
            </div>
            <h3 className="text-white font-semibold mb-2">No jobs found</h3>
            <p className="text-gray-400">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Add Job Modal */}
      {(showAddModal || showEditModal) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl bg-gradient-to-br from-[#1E2130] to-[#181820] rounded-3xl border-2 border-blue-500/50 shadow-2xl shadow-blue-500/30 max-h-[90vh] overflow-hidden">
            
            {/* Modal Header */}
            <div className="relative p-6 border-b border-blue-500/30">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {showEditModal ? '✏️ Edit Job' : '💼 Create New Job'}
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
                      duration: ''
                    })
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
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Basic Information */}
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
                      <option value="Remote">Remote</option>
                      <option value="Contract">Contract</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2">🗓️ Deadline *</label>
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

                {/* Duration */}
                <div>
                  <label className="block text-white font-semibold mb-2">⏰ Working Hours *</label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., 9:00 AM - 6:00 PM, Flexible Hours"
                    className="w-full bg-[#1E2130] border-2 border-[#2A2D3A] rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all"
                  />
                </div>
              </form>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-blue-500/30 flex justify-end gap-3">
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
                    duration: ''
                  })
                }}
                className="px-6 py-2 bg-gray-600 text-white font-medium rounded-xl hover:bg-gray-700 transition-all duration-200 border border-gray-500/30"
              >
                Cancel
              </button>
              
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:from-blue-500 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg shadow-blue-500/25 flex items-center gap-2 border border-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {showEditModal ? 'Updating...' : 'Creating...'}
                  </>
                ) : (
                  <>
                    <span>{showEditModal ? '✏️' : '🚀'}</span>
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
          <div className="relative w-full max-w-md bg-gradient-to-br from-[#1E2130] to-[#181820] rounded-3xl border-2 border-red-500/50 shadow-2xl shadow-red-500/30">
            
            {/* Modal Header */}
            <div className="relative p-6 border-b border-red-500/30">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                  🗑️ Delete Job
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
                className="px-6 py-2 bg-gradient-to-r from-red-600 to-orange-600 text-white font-medium rounded-xl hover:from-red-500 hover:to-orange-700 transform hover:scale-105 transition-all duration-200 shadow-lg shadow-red-500/25 flex items-center gap-2 border border-red-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <span>🗑️</span>
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