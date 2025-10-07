import React, { useState } from 'react'

const AnnouncementManage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [authorFilter, setAuthorFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Sample announcements data
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: "CINTRACON Platform Launch",
      content: "The Cintracon team is thrilled to welcome you all to the platform — a space built by UAP students for UAP students and alumni. Our goal is to create a connected community where you can share knowledge, explore opportunities, and engage in meaningful discussions.",
      author: "Cintracon Team",
      date: "2025-10-05",
      isNew: true,
      status: "active"
    },
    {
      id: 2,
      title: "New Feature Update - AI Assistant",
      content: "We're excited to announce the launch of our AI-powered assistant feature! Now you can get instant help with your queries, course recommendations, and study tips.",
      author: "Cintracon Team",
      date: "2025-10-04",
      isNew: true,
      status: "active"
    },
    {
      id: 3,
      title: "Platform Maintenance Notice",
      content: "There will be a scheduled maintenance on Saturday, October 12th from 2:00 AM to 6:00 AM. During this time, the platform will be temporarily unavailable.",
      author: "Admin",
      date: "2025-10-03",
      isNew: false,
      status: "active"
    },
    {
      id: 4,
      title: "Terms of Service Update",
      content: "We've updated our Terms of Service and Privacy Policy. Please review the changes to understand how we handle your data and the rules for using our platform.",
      author: "Admin",
      date: "2025-10-02",
      isNew: true,
      status: "active"
    },
    {
      id: 5,
      title: "Mobile App Coming Soon",
      content: "Great news! The CINTRACON mobile app is currently in development and will be launched next month. The app will include all platform features with optimized mobile experience.",
      author: "Cintracon Team",
      date: "2025-10-01",
      isNew: false,
      status: "archived"
    },
    {
      id: 6,
      title: "Bug Fixes & Performance Improvements",
      content: "We've deployed several bug fixes and performance improvements to enhance your experience. Fixed issues include login problems, file upload errors, and notification delays.",
      author: "Admin",
      date: "2025-09-28",
      isNew: false,
      status: "active"
    }
  ])

  const filteredAnnouncements = announcements.filter(announcement => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         announcement.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         announcement.id.toString().includes(searchTerm)
    const matchesAuthor = authorFilter === 'all' || announcement.author === authorFilter
    const matchesStatus = statusFilter === 'all' || announcement.status === statusFilter
    
    return matchesSearch && matchesAuthor && matchesStatus
  })

  const authors = ['all', 'Cintracon Team', 'Admin']
  const statuses = ['all', 'active', 'archived']

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const clearFilters = () => {
    setSearchTerm('')
    setAuthorFilter('all')
    setStatusFilter('all')
  }

  const handleDelete = (announcement) => {
    setSelectedAnnouncement(announcement)
    setShowDeleteModal(true)
  }

  const confirmDelete = async () => {
    setIsSubmitting(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 800))
      setAnnouncements(announcements.filter(announcement => announcement.id !== selectedAnnouncement.id))
      alert('Announcement deleted successfully!')
      setShowDeleteModal(false)
      setSelectedAnnouncement(null)
    } catch (error) {
      console.error('Error deleting announcement:', error)
      alert('Error deleting announcement. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const toggleStatus = (announcementId) => {
    setAnnouncements(announcements.map(announcement => 
      announcement.id === announcementId 
        ? { ...announcement, status: announcement.status === 'active' ? 'archived' : 'active' }
        : announcement
    ))
  }

  const toggleNewStatus = (announcementId) => {
    setAnnouncements(announcements.map(announcement => 
      announcement.id === announcementId 
        ? { ...announcement, isNew: !announcement.isNew }
        : announcement
    ))
  }

  return (
    <div className="min-h-screen bg-[#181820] p-6">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Announcement Management</h1>
        <p className="text-gray-400">Manage and monitor all platform announcements</p>
      </div>

      {/* Filters Section */}
      <div className="bg-[#1E2130] rounded-2xl p-6 border border-[#2A2D3A] mb-6">
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          
          {/* Search Bar */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by ID, title or content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#1E2130] border-2 border-[#2A2D3A] rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all"
            />
          </div>

          {/* Author Filter */}
          <select
            value={authorFilter}
            onChange={(e) => setAuthorFilter(e.target.value)}
            className="w-full lg:w-48 bg-[#1E2130] border-2 border-[#2A2D3A] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all"
          >
            {authors.map(author => (
              <option key={author} value={author}>
                {author === 'all' ? 'All Authors' : author}
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

      {/* Announcements Table */}
      <div className="bg-[#1E2130] rounded-2xl border border-[#2A2D3A] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#2A2D3A] border-b border-[#3A3D4A]">
                <th className="px-6 py-4 text-left text-white font-semibold">ID</th>
                <th className="px-6 py-4 text-left text-white font-semibold">Announcement Details</th>
                <th className="px-6 py-4 text-left text-white font-semibold">Author</th>
                <th className="px-6 py-4 text-left text-white font-semibold">Date</th>
                <th className="px-6 py-4 text-left text-white font-semibold">Status</th>
                <th className="px-6 py-4 text-left text-white font-semibold">New</th>
                <th className="px-6 py-4 text-left text-white font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAnnouncements.map((announcement) => (
                <tr 
                  key={announcement.id} 
                  className="border-b border-[#3A3D4A] hover:bg-[#2A2D3A] transition-colors"
                >
                  {/* ID */}
                  <td className="px-6 py-4">
                    <div className="text-purple-400 font-bold">{announcement.id}</div>
                  </td>
                  
                  {/* Announcement Details */}
                  <td className="px-6 py-4">
                    <div className="text-white font-medium">
                      {announcement.title}
                    </div>
                    <div className="text-gray-400 text-sm mt-1 line-clamp-2">
                      {announcement.content}
                    </div>
                  </td>
                  
                  {/* Author - Normal Text */}
                  <td className="px-6 py-4">
                    <span className="text-white">{announcement.author}</span>
                  </td>
                  
                  {/* Date */}
                  <td className="px-6 py-4 text-gray-400">{formatDate(announcement.date)}</td>
                  
                  {/* Status */}
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-xs font-bold rounded-full border ${
                      announcement.status === 'active' 
                        ? "bg-green-500/20 text-green-400 border-green-500/30"
                        : "bg-gray-500/20 text-gray-400 border-gray-500/30"
                    }`}>
                      {announcement.status.charAt(0).toUpperCase() + announcement.status.slice(1)}
                    </span>
                  </td>
                  
                  {/* New Status */}
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-xs font-bold rounded-full border ${
                      announcement.isNew 
                        ? "bg-green-500/20 text-green-400 border-green-500/30"
                        : "bg-gray-500/20 text-gray-400 border-gray-500/30"
                    }`}>
                      {announcement.isNew ? 'New' : 'Old'}
                    </span>
                  </td>
                  
                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => toggleStatus(announcement.id)}
                        className={`px-3 py-1 text-white text-xs rounded-lg transition-colors ${
                          announcement.status === 'active' 
                            ? "bg-gray-600 hover:bg-gray-700" 
                            : "bg-green-600 hover:bg-green-700"
                        }`}
                      >
                        {announcement.status === 'active' ? 'Archive' : 'Activate'}
                      </button>
                      <button 
                        onClick={() => toggleNewStatus(announcement.id)}
                        className={`px-3 py-1 text-white text-xs rounded-lg transition-colors ${
                          announcement.isNew 
                            ? "bg-gray-600 hover:bg-gray-700" 
                            : "bg-green-600 hover:bg-green-700"
                        }`}
                      >
                        {announcement.isNew ? 'Mark Old' : 'Mark New'}
                      </button>
                      <button 
                        onClick={() => handleDelete(announcement)}
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
        {filteredAnnouncements.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-2xl font-bold text-white mb-3">
              No announcements found
            </h3>
            <p className="text-gray-400">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedAnnouncement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-[#1E2130] rounded-2xl border-2 border-red-500/50 shadow-2xl shadow-red-500/30">
            
            {/* Modal Header */}
            <div className="relative p-6 border-b border-red-500/30">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">
                  Delete Announcement
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
                  You are about to delete the announcement <span className="text-white font-semibold">"{selectedAnnouncement.title}"</span>. This action cannot be undone.
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
                    Delete Announcement
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

export default AnnouncementManage