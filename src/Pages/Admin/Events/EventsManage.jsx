import React, { useState } from 'react'

const EventsManage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Sample events data
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Tech Conference 2024",
      organizer: "Digital Bangladesh Foundation",
      date: "2024-12-15",
      time: "9:00 AM - 5:00 PM",
      location: "International Convention City, Bashundhara",
      type: "Conference",
      description: "Join us for the biggest tech conference of the year featuring industry experts and innovative technologies.",
      postedBy: "Shahid Al Mamin",
      postedTime: "2h ago",
      image: "/event1.jpg",
      interestedCount: 24,
      status: "upcoming"
    },
    {
      id: 2,
      title: "Startup Pitch Competition",
      organizer: "Bangladesh Innovation Hub",
      date: "2025-01-20",
      time: "10:00 AM - 4:00 PM",
      location: "GP House, Karwan Bazar",
      type: "Competition",
      description: "Pitch your startup idea to top investors and win exciting prizes and mentorship opportunities.",
      postedBy: "Lamia Akter Jesmin",
      postedTime: "5h ago",
      image: "/event2.jpg",
      interestedCount: 18,
      status: "upcoming"
    },
    {
      id: 3,
      title: "UI/UX Design Workshop",
      organizer: "DesignPro Studio",
      date: "2024-12-22",
      time: "2:00 PM - 6:00 PM",
      location: "Uttara Club, Dhaka",
      type: "Workshop",
      description: "Hands-on workshop covering the latest design trends and tools for modern UI/UX designers.",
      postedBy: "Nashrah Zakir Nawmi",
      postedTime: "1d ago",
      image: "/event3.jpg",
      interestedCount: 32,
      status: "upcoming"
    },
    {
      id: 4,
      title: "AI & Machine Learning Meetup",
      organizer: "AI Innovations Ltd",
      date: "2025-01-10",
      time: "6:00 PM - 9:00 PM",
      location: "Gulshan Club, Dhaka",
      type: "Meetup",
      description: "Network with AI enthusiasts and learn about the latest developments in machine learning.",
      postedBy: "Alif Mahmud Talha",
      postedTime: "3h ago",
      image: "/event4.jpg",
      interestedCount: 15,
      status: "upcoming"
    },
    {
      id: 5,
      title: "Web Development Bootcamp",
      organizer: "CodeMaster Academy",
      date: "2025-01-05",
      time: "9:30 AM - 6:30 PM",
      location: "Banani Community Center",
      type: "Bootcamp",
      description: "Intensive 2-day bootcamp covering modern web development technologies and best practices.",
      postedBy: "Mizanur Rahman Jisan",
      postedTime: "8h ago",
      image: "/event5.jpg",
      interestedCount: 28,
      status: "completed"
    },
    {
      id: 6,
      title: "Digital Marketing Seminar",
      organizer: "Marketing Gurus BD",
      date: "2024-12-28",
      time: "11:00 AM - 3:00 PM",
      location: "Farmgate Convention Hall",
      type: "Seminar",
      description: "Learn effective digital marketing strategies from industry experts and grow your business online.",
      postedBy: "Shahid Al Mamin",
      postedTime: "6h ago",
      image: "/event6.jpg",
      interestedCount: 21,
      status: "upcoming"
    }
  ])

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.organizer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.id.toString().includes(searchTerm)
    const matchesType = typeFilter === 'all' || event.type === typeFilter
    const matchesStatus = statusFilter === 'all' || event.status === statusFilter
    
    return matchesSearch && matchesType && matchesStatus
  })

  const eventTypes = ['all', 'Conference', 'Workshop', 'Seminar', 'Meetup', 'Competition', 'Bootcamp', 'Networking']
  const statuses = ['all', 'upcoming', 'completed', 'cancelled']

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const clearFilters = () => {
    setSearchTerm('')
    setTypeFilter('all')
    setStatusFilter('all')
  }

  const handleDelete = (event) => {
    setSelectedEvent(event)
    setShowDeleteModal(true)
  }

  const confirmDelete = async () => {
    setIsSubmitting(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 800))
      setEvents(events.filter(event => event.id !== selectedEvent.id))
      alert('Event deleted successfully!')
      setShowDeleteModal(false)
      setSelectedEvent(null)
    } catch (error) {
      console.error('Error deleting event:', error)
      alert('Error deleting event. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const toggleStatus = (eventId, newStatus) => {
    setEvents(events.map(event => 
      event.id === eventId 
        ? { ...event, status: newStatus }
        : event
    ))
  }

  return (
    <div className="min-h-screen bg-[#181820] p-6">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Events Management</h1>
        <p className="text-gray-400">Manage and monitor all platform events</p>
      </div>

      {/* Filters Section */}
      <div className="bg-[#1E2130] rounded-2xl p-6 border border-[#2A2D3A] mb-6">
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          
          {/* Search Bar */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by ID, title or organizer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#1E2130] border-2 border-[#2A2D3A] rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all"
            />
          </div>

          {/* Event Type Filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full lg:w-48 bg-[#1E2130] border-2 border-[#2A2D3A] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all"
          >
            {eventTypes.map(type => (
              <option key={type} value={type}>
                {type === 'all' ? 'All Types' : type}
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

      {/* Events Table */}
      <div className="bg-[#1E2130] rounded-2xl border border-[#2A2D3A] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#2A2D3A] border-b border-[#3A3D4A]">
                <th className="px-6 py-4 text-left text-white font-semibold">ID</th>
                <th className="px-6 py-4 text-left text-white font-semibold">Event Image</th>
                <th className="px-6 py-4 text-left text-white font-semibold">Event Details</th>
                <th className="px-6 py-4 text-left text-white font-semibold">Organizer</th>
                <th className="px-6 py-4 text-left text-white font-semibold">Date & Time</th>
                <th className="px-6 py-4 text-left text-white font-semibold">Location</th>
                <th className="px-6 py-4 text-left text-white font-semibold">Type</th>
                <th className="px-6 py-4 text-left text-white font-semibold">Interested</th>
                <th className="px-6 py-4 text-left text-white font-semibold">Status</th>
                <th className="px-6 py-4 text-left text-white font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.map((event) => (
                <tr 
                  key={event.id} 
                  className="border-b border-[#3A3D4A] hover:bg-[#2A2D3A] transition-colors"
                >
                  {/* ID */}
                  <td className="px-6 py-4">
                    <div className="text-purple-400 font-bold">{event.id}</div>
                  </td>
                  
                  {/* Event Image */}
                  <td className="px-6 py-4">
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-12 h-12 rounded-lg object-cover border border-purple-500/30"
                    />
                  </td>
                  
                  {/* Event Details */}
                  <td className="px-6 py-4">
                    <div className="text-white font-medium">
                      {event.title}
                    </div>
                    <div className="text-gray-400 text-sm mt-1 line-clamp-1">
                      {event.description}
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <img 
                        src={event.postedBy.avatar} 
                        alt={event.postedBy}
                        className="w-6 h-6 rounded-full border border-blue-500/30"
                      />
                      <span className="text-gray-400 text-xs">{event.postedBy}</span>
                      <span className="text-gray-500 text-xs">•</span>
                      <span className="text-gray-400 text-xs">{event.postedTime}</span>
                    </div>
                  </td>
                  
                  {/* Organizer */}
                  <td className="px-6 py-4 text-white">{event.organizer}</td>
                  
                  {/* Date & Time */}
                  <td className="px-6 py-4">
                    <div className="text-white">{formatDate(event.date)}</div>
                    <div className="text-gray-400 text-sm">{event.time}</div>
                  </td>
                  
                  {/* Location */}
                  <td className="px-6 py-4 text-white">{event.location}</td>
                  
                  {/* Type */}
                  <td className="px-6 py-4">
                    <span className="text-white font-medium">{event.type}</span>
                  </td>
                  
                  {/* Interested Count */}
                  <td className="px-6 py-4 text-white">{event.interestedCount}</td>
                  
                  {/* Status */}
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-xs font-bold rounded-full border ${
                      event.status === 'upcoming' 
                        ? "bg-green-500/20 text-green-400 border-green-500/30"
                        : event.status === 'completed'
                        ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                        : "bg-red-500/20 text-red-400 border-red-500/30"
                    }`}>
                      {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                    </span>
                  </td>
                  
                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => toggleStatus(event.id, 'upcoming')}
                        className={`px-3 py-1 text-white text-xs rounded-lg transition-colors ${
                          event.status === 'upcoming' 
                            ? "bg-green-600 hover:bg-green-700" 
                            : "bg-gray-600 hover:bg-gray-700"
                        }`}
                      >
                        Upcoming
                      </button>
                      <button 
                        onClick={() => toggleStatus(event.id, 'completed')}
                        className={`px-3 py-1 text-white text-xs rounded-lg transition-colors ${
                          event.status === 'completed' 
                            ? "bg-blue-600 hover:bg-blue-700" 
                            : "bg-gray-600 hover:bg-gray-700"
                        }`}
                      >
                        Complete
                      </button>
                      <button 
                        onClick={() => handleDelete(event)}
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
        {filteredEvents.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-2xl font-bold text-white mb-3">
              No events found
            </h3>
            <p className="text-gray-400">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-[#1E2130] rounded-2xl border-2 border-red-500/50 shadow-2xl shadow-red-500/30">
            
            {/* Modal Header */}
            <div className="relative p-6 border-b border-red-500/30">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">
                  Delete Event
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
                  You are about to delete the event <span className="text-white font-semibold">"{selectedEvent.title}"</span>. This will permanently remove the event and all related data. This action cannot be undone.
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
                    Delete Event
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

export default EventsManage