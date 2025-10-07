import React, { useState } from 'react'

const ForumManage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedForum, setSelectedForum] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Sample forum data
  const [forums, setForums] = useState([
    {
      id: 1,
      title: "Data Structures Discussion",
      description: "Discuss algorithms, data structures, and problem solving techniques",
      category: "CSE",
      author: "John Doe",
      posts: 145,
      views: 2890,
      lastActivity: "2024-01-15",
      status: "active",
      isPinned: true
    },
    {
      id: 2,
      title: "Web Development Trends 2024",
      description: "Latest frameworks, tools and best practices in web development",
      category: "CSE",
      author: "Jane Smith",
      posts: 89,
      views: 1567,
      lastActivity: "2024-01-12",
      status: "active",
      isPinned: false
    },
    {
      id: 3,
      title: "Career Guidance for Fresh Graduates",
      description: "Job search tips, interview preparation and career advice",
      category: "Career",
      author: "Mike Johnson",
      posts: 167,
      views: 4231,
      lastActivity: "2024-01-10",
      status: "active",
      isPinned: true
    },
    {
      id: 4,
      title: "Machine Learning Projects",
      description: "Share your ML projects and get feedback from the community",
      category: "CSE",
      author: "Sarah Wilson",
      posts: 203,
      views: 5123,
      lastActivity: "2024-01-08",
      status: "active",
      isPinned: false
    },
    {
      id: 5,
      title: "Campus Events and Activities",
      description: "Upcoming events, workshops and student activities",
      category: "Campus",
      author: "Alex Brown",
      posts: 98,
      views: 2345,
      lastActivity: "2024-01-05",
      status: "archived",
      isPinned: false
    },
    {
      id: 6,
      title: "Study Group Coordination",
      description: "Organize study groups and collaborative learning sessions",
      category: "Academic",
      author: "David Lee",
      posts: 234,
      views: 6789,
      lastActivity: "2024-01-03",
      status: "active",
      isPinned: false
    }
  ])

  const filteredForums = forums.filter(forum => {
    const matchesSearch = forum.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         forum.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         forum.id.toString().includes(searchTerm)
    const matchesCategory = categoryFilter === 'all' || forum.category === categoryFilter
    const matchesStatus = statusFilter === 'all' || forum.status === statusFilter
    
    return matchesSearch && matchesCategory && matchesStatus
  })

  const categories = ['all', 'CSE', 'Career', 'Campus', 'Academic', 'General']
  const statuses = ['all', 'active', 'archived']

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const clearFilters = () => {
    setSearchTerm('')
    setCategoryFilter('all')
    setStatusFilter('all')
  }

  const handleDelete = (forum) => {
    setSelectedForum(forum)
    setShowDeleteModal(true)
  }

  const confirmDelete = async () => {
    setIsSubmitting(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 800))
      setForums(forums.filter(forum => forum.id !== selectedForum.id))
      alert('Forum deleted successfully!')
      setShowDeleteModal(false)
      setSelectedForum(null)
    } catch (error) {
      console.error('Error deleting forum:', error)
      alert('Error deleting forum. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const togglePin = (forumId) => {
    setForums(forums.map(forum => 
      forum.id === forumId 
        ? { ...forum, isPinned: !forum.isPinned }
        : forum
    ))
  }

  const toggleStatus = (forumId) => {
    setForums(forums.map(forum => 
      forum.id === forumId 
        ? { ...forum, status: forum.status === 'active' ? 'archived' : 'active' }
        : forum
    ))
  }

  return (
    <div className="min-h-screen bg-[#181820] p-6">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Forum Management</h1>
        <p className="text-gray-400">Manage and monitor all forum discussions</p>
      </div>

      {/* Filters Section */}
      <div className="bg-[#1E2130] rounded-2xl p-6 border border-[#2A2D3A] mb-6">
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          
          {/* Search Bar */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by ID, title or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#1E2130] border-2 border-[#2A2D3A] rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all"
            />
          </div>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full lg:w-48 bg-[#1E2130] border-2 border-[#2A2D3A] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full lg:w-48 bg-[#1E2130] border-2 border-[#2A2D3A] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all"
          >
            {statuses.map(status => (
              <option key={status} value={status}>
                {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>

          {/* Reset Button */}
          <button
            onClick={clearFilters}
            className="w-full lg:w-auto px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl hover:from-gray-500 hover:to-gray-600 transition-all duration-200 border border-gray-500/30 shadow-lg"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Forums Table */}
      <div className="bg-[#1E2130] rounded-2xl border border-[#2A2D3A] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#2A2D3A] border-b border-[#3A3D4A]">
                <th className="px-6 py-4 text-left text-white font-semibold">ID</th>
                <th className="px-6 py-4 text-left text-white font-semibold">Forum Details</th>
                <th className="px-6 py-4 text-left text-white font-semibold">Category</th>
                <th className="px-6 py-4 text-left text-white font-semibold">Author</th>
                <th className="px-6 py-4 text-left text-white font-semibold">Posts</th>
                <th className="px-6 py-4 text-left text-white font-semibold">Views</th>
                <th className="px-6 py-4 text-left text-white font-semibold">Last Activity</th>
                <th className="px-6 py-4 text-left text-white font-semibold">Status</th>
                <th className="px-6 py-4 text-left text-white font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredForums.map((forum) => (
                <tr 
                  key={forum.id} 
                  className="border-b border-[#3A3D4A] hover:bg-[#2A2D3A] transition-colors"
                >
                  {/* ID - Shudhu number rakchi, pin icon bad diyechi */}
                  <td className="px-6 py-4">
                    <div className="text-purple-400 font-bold">{forum.id}</div>
                  </td>
                  
                  {/* Forum Details */}
                  <td className="px-6 py-4">
                    <div className="text-white font-medium">
                      {forum.title}
                    </div>
                    <div className="text-gray-400 text-sm mt-1 line-clamp-1">
                      {forum.description}
                    </div>
                  </td>
                  
                  {/* Category */}
                  <td className="px-6 py-4">
                    <span className="text-white">{forum.category}</span>
                  </td>
                  
                  {/* Author */}
                  <td className="px-6 py-4 text-white">{forum.author}</td>
                  
                  {/* Posts */}
                  <td className="px-6 py-4 text-white">{forum.posts}</td>
                  
                  {/* Views */}
                  <td className="px-6 py-4 text-white">{forum.views}</td>
                  
                  {/* Last Activity */}
                  <td className="px-6 py-4 text-gray-400">{formatDate(forum.lastActivity)}</td>
                  
                  {/* Status */}
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-xs font-bold rounded-full border ${
                      forum.status === 'active' 
                        ? "bg-green-500/20 text-green-400 border-green-500/30"
                        : "bg-gray-500/20 text-gray-400 border-gray-500/30"
                    }`}>
                      {forum.status.charAt(0).toUpperCase() + forum.status.slice(1)}
                    </span>
                  </td>
                  
                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => togglePin(forum.id)}
                        className={`px-3 py-1 text-white text-xs rounded-lg transition-colors ${
                          forum.isPinned 
                            ? "bg-yellow-600 hover:bg-yellow-700" 
                            : "bg-gray-600 hover:bg-gray-700"
                        }`}
                      >
                        {forum.isPinned ? 'Unpin' : 'Pin'}
                      </button>
                      <button 
                        onClick={() => toggleStatus(forum.id)}
                        className={`px-3 py-1 text-white text-xs rounded-lg transition-colors ${
                          forum.status === 'active' 
                            ? "bg-gray-600 hover:bg-gray-700" 
                            : "bg-green-600 hover:bg-green-700"
                        }`}
                      >
                        {forum.status === 'active' ? 'Archive' : 'Activate'}
                      </button>
                      <button 
                        onClick={() => handleDelete(forum)}
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
        {filteredForums.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-2xl font-bold text-white mb-3">
              No forums found
            </h3>
            <p className="text-gray-400">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedForum && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-[#1E2130] rounded-2xl border-2 border-red-500/50 shadow-2xl shadow-red-500/30">
            
            {/* Modal Header */}
            <div className="relative p-6 border-b border-red-500/30">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">
                  Delete Forum
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
                  You are about to delete the forum <span className="text-white font-semibold">"{selectedForum.title}"</span>. This will permanently remove all posts and discussions in this forum. This action cannot be undone.
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
                    Delete Forum
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

export default ForumManage