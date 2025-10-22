import React, { useState, useEffect } from 'react'
import NavbarMain from '../../../Ui/NavbarMain'
import LeftSideBar from '../../../Components/LeftSideBar'
import { toast } from 'react-toastify'
import { createEvent, getAllEvents, toggleEventInterest } from '../../../api/eventsApi'

const EventsPage = () => {
  const [showPostModal, setShowPostModal] = useState(false)
  const [showImageModal, setShowImageModal] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  const [formData, setFormData] = useState({
    title: '',
    event_organizer: '',
    date: '',
    time: '',
    location: '',
    event_type: '',
    description: '',
    event_image: null
  })

  // Get token from localStorage
  const getToken = () => {
    return localStorage.getItem('accessToken')
  }

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  // Format time for display
  const formatTime = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    })
  }

  // Get time ago for posted time
  const getTimeAgo = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((now - date) / 1000)
    
    if (diffInSeconds < 60) return 'Just now'
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
    return `${Math.floor(diffInSeconds / 86400)}d ago`
  }

  // Get button color based on event type
  const getButtonColor = (eventType) => {
    const colors = {
      'Conference': 'from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700',
      'Workshop': 'from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700',
      'Seminar': 'from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700',
      'Meetup': 'from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700',
      'Competition': 'from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700',
      'Bootcamp': 'from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700',
      'Cultural': 'from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700',
      'Other': 'from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700'
    }
    return colors[eventType] || colors['Other']
  }

  // Get border color based on event type
  const getBorderColor = (eventType) => {
    const colors = {
      'Conference': 'border-blue-500/50 hover:border-blue-400',
      'Workshop': 'border-green-500/50 hover:border-green-400',
      'Seminar': 'border-pink-500/50 hover:border-pink-400',
      'Meetup': 'border-orange-500/50 hover:border-orange-400',
      'Competition': 'border-indigo-500/50 hover:border-indigo-400',
      'Bootcamp': 'border-cyan-500/50 hover:border-cyan-400',
      'Cultural': 'border-yellow-500/50 hover:border-yellow-400',
      'Other': 'border-gray-500/50 hover:border-gray-400'
    }
    return colors[eventType] || colors['Other']
  }

  // Fetch events from API
  const fetchEvents = async (page = 1, append = false) => {
    try {
      const token = getToken()
      if (!token) {
        toast.error('Please login to view events')
        return
      }

      const response = await getAllEvents({ page, size: 6 }, token)
      
      if (response.data.success) {
        const eventsData = response.data.data.events || response.data.data
        
        if (append) {
          setEvents(prev => [...prev, ...eventsData])
        } else {
          setEvents(eventsData)
        }
        
        setHasMore(response.data.data.pagination?.has_next || eventsData.length === 6)
        setCurrentPage(page)
      } else {
        toast.error(response.data.msg || 'Failed to fetch events')
      }
    } catch (error) {
      console.error('Error fetching events:', error)
      toast.error('Failed to load events')
    } finally {
      setLoading(false)
    }
  }

  // Load events on component mount
  useEffect(() => {
    fetchEvents(1)
  }, [])

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
        event_image: file
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const token = getToken()
      if (!token) {
        toast.error('Please login to create event')
        return
      }

      // Prepare form data for API
      const submitData = new FormData()
      submitData.append('title', formData.title)
      submitData.append('event_organizer', formData.event_organizer)
      submitData.append('date', `${formData.date}T${formData.time}`)
      submitData.append('location', formData.location)
      submitData.append('event_type', formData.event_type)
      submitData.append('description', formData.description)
      
      if (formData.event_image) {
        submitData.append('event_image', formData.event_image)
      }

      const response = await createEvent(submitData, token)
      
      if (response.data.success) {
        toast.success('Event created successfully!')
        setShowPostModal(false)
        setFormData({
          title: '',
          event_organizer: '',
          date: '',
          time: '',
          location: '',
          event_type: '',
          description: '',
          event_image: null
        })
        // Refresh events list
        fetchEvents(1)
      } else {
        toast.error(response.data.msg || 'Failed to create event')
      }
    } catch (error) {
      console.error('Error creating event:', error)
      toast.error(error.response?.data?.msg || 'Error creating event. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInterest = async (eventId, currentIsInterested) => {
    try {
      const token = getToken()
      if (!token) {
        toast.error('Please login to show interest')
        return
      }

      const response = await toggleEventInterest(eventId, token)
      
      if (response.data.success) {
        const { is_interested, total_interested } = response.data.data
        
        // Update the event in the state
        setEvents(prevEvents => 
          prevEvents.map(event => 
            event.id === eventId 
              ? {
                  ...event,
                  is_interested: is_interested,
                  total_interested: total_interested
                }
              : event
          )
        )
        
        toast.success(response.data.msg)
      } else {
        toast.error(response.data.msg || 'Failed to update interest')
      }
    } catch (error) {
      console.error('Error toggling interest:', error)
      toast.error('Failed to update interest')
    }
  }

  const loadMoreEvents = () => {
    fetchEvents(currentPage + 1, true)
  }

  if (loading && events.length === 0) {
    return (
      <div className="min-h-screen bg-[#181820]">
        <NavbarMain />
        <div className="max-w-7xl mx-auto px-2 md:px-6 py-8 flex gap-6">
          <div className="hidden lg:flex w-1/5 flex-col gap-6">
            <LeftSideBar />
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    )
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
              <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
                Upcoming Events
              </h1>
              <p className="text-gray-300 text-sm mt-1">
                Discover amazing events and connect with like-minded people
              </p>
            </div>
            <button 
              onClick={() => setShowPostModal(true)}
              className="ml-auto px-6 py-2 rounded-lg text-white font-semibold shadow-lg 
                bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 
                transform hover:scale-105 transition-all duration-300 text-sm"
            >
              Create Event 
            </button>
          </div>

          {/* Event Cards Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
            {events.map((event) => (
              <div 
                key={event.id}
                className={`relative bg-[#20222B] rounded-xl overflow-hidden border-2 ${getBorderColor(event.event_type)}
                  transition-all duration-300 group cursor-pointer hover:scale-[1.02] hover:shadow-xl`}
              >
                <div className="relative">
                  {/* Event Image */}
                  <div 
                    className="relative h-48 w-full rounded-t-xl overflow-hidden cursor-pointer"
                    onClick={() => handleImageClick(event.event_image)}
                  >
                    {event.event_image ? (
                      <img 
                        src={event.event_image} 
                        alt={event.title} 
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" 
                      />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                        <span className="text-gray-400 text-lg">No Image</span>
                      </div>
                    )}
                    
                    {/* Dark Image Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70"></div>
                    
                    {/* Event Type Badge */}
                    <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-md text-white text-xs font-bold px-2 py-1 rounded-full">
                      {event.event_type}
                    </div>

                    {/* Organizer Name on Image */}
                    <div className="absolute bottom-3 left-3">
                      <p className="text-gray-200 text-sm drop-shadow-lg font-medium">{event.event_organizer}</p>
                    </div>

                    {/* Image Zoom Icon */}
                    {event.event_image && (
                      <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-black/40 backdrop-blur-sm rounded-full p-1.5">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3-3H7" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-4">
                    {/* Event Title - Below Image */}
                    <div className="mb-4">
                      <h2 className="text-lg font-bold text-white">
                        {event.title}
                      </h2>
                    </div>

                    {/* Event Details - Single Column Layout */}
                    <div className="space-y-3 mb-4">
                      {/* Date */}
                      <div className="flex items-center gap-3 text-gray-300">
                        <span className="text-green-400 text-base">📅</span>
                        <span className="text-sm font-medium">{formatDate(event.date)}</span>
                      </div>
                      
                      {/* Time */}
                      <div className="flex items-center gap-3 text-gray-300">
                        <span className="text-blue-400 text-base">⏰</span>
                        <span className="text-sm">{formatTime(event.date)}</span>
                      </div>
                      
                      {/* Location */}
                      <div className="flex items-center gap-3 text-gray-300">
                        <span className="text-red-400 text-base">📍</span>
                        <span className="text-sm">{event.location}</span>
                      </div>
                      
                      {/* Description */}
                      <div className="flex items-start gap-3 text-gray-300">
                        <span className="text-purple-400 text-base">📝</span>
                        <span className="text-sm line-clamp-2">{event.description}</span>
                      </div>
                    </div>

                    {/* I'm Interested Button with Count */}
                    <div className="flex justify-center mb-4">
                      <button 
                        onClick={() => handleInterest(event.id, event.is_interested)}
                        className={`px-4 py-2 rounded-lg text-white font-semibold text-sm
                          bg-gradient-to-r ${getButtonColor(event.event_type)} transform hover:scale-105 hover:shadow-lg
                          transition-all duration-300 w-full flex items-center justify-center gap-2
                          ${event.is_interested ? 'ring-2 ring-yellow-400' : ''}`}
                      >
                        {event.is_interested ? (
                          <>
                            <span>✅</span>
                            Interested ({event.total_interested})
                          </>
                        ) : (
                          <>
                            <span>🤔</span>
                            I'm Interested ({event.total_interested})
                          </>
                        )}
                      </button>
                    </div>

                    {/* Posted By - Avatar First, "Posted by" above Name, Time on Right */}
                    <div className="flex items-center justify-between gap-2 pt-3 border-t border-gray-700">
                      <div className="flex items-center gap-2">
                        {event.user?.profile_photo ? (
                          <img 
                            src={event.user.profile_photo} 
                            alt={event.user.full_name}
                            className="w-6 h-6 rounded-full border border-green-500"
                          />
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-gray-600 border border-green-500 flex items-center justify-center">
                            <span className="text-xs text-white">👤</span>
                          </div>
                        )}
                        <div>
                          <p className="text-xs text-gray-400">Posted by</p>
                          <p className="text-sm font-medium text-white">
                            {event.user?.full_name || 'Unknown User'}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500 bg-gray-800/50 px-2 py-1 rounded">
                        {getTimeAgo(event.created_at)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {hasMore && (
            <div className="flex justify-center mt-8">
              <button 
                onClick={loadMoreEvents}
                disabled={loading}
                className="px-6 py-2 bg-gradient-to-r from-green-500 to-blue-600 text-white font-medium rounded-lg hover:from-green-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Loading...' : 'Load More Events'}
              </button>
            </div>
          )}

          {/* No Events Message */}
          {events.length === 0 && !loading && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg mb-4">🎉</div>
              <h3 className="text-xl font-semibold text-gray-300 mb-2">No Events Yet</h3>
              <p className="text-gray-400 mb-6">Be the first to create an amazing event!</p>
              <button 
                onClick={() => setShowPostModal(true)}
                className="px-6 py-2 bg-gradient-to-r from-green-500 to-blue-600 text-white font-medium rounded-lg hover:from-green-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300"
              >
                Create First Event
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Image Preview Modal */}
      {showImageModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-md transition-all duration-300"
          onClick={() => setShowImageModal(false)}
        >
          <div 
            className="relative max-w-4xl max-h-[90vh] w-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image Container */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-green-500/20 border-2 border-green-500/30 bg-black">
              <img 
                src={selectedImage} 
                alt="Event Preview" 
                className="max-w-full max-h-[80vh] object-contain"
              />
            </div>
          </div>
        </div>
      )}

      {/* Create Event Modal */}
      {showPostModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl bg-gradient-to-br from-[#1E2130] to-[#181820] rounded-3xl border-2 border-green-500/50 shadow-2xl shadow-green-500/30 max-h-[90vh] overflow-hidden">
            
            {/* Modal Header */}
            <div className="relative p-6 border-b border-green-500/30">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text">
                  🎉 Create New Event
                </h2>
                <button
                  onClick={() => setShowPostModal(false)}
                  className="w-8 h-8 flex items-center justify-center bg-red-500/30 text-red-400 rounded-full hover:bg-red-500/50 transition-colors duration-200 border border-red-500/30"
                >
                  ✕
                </button>
              </div>
              <p className="text-gray-400 mt-2">Fill in the event details to create your amazing event</p>
            </div>

            {/* Modal Content */}
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Event Title & Organizer */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-semibold mb-2">📝 Event Title *</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., Tech Conference 2024"
                      className="w-full bg-[#1E2130] border-2 border-[#2A2D3A] rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/30 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2">🏢 Organizer *</label>
                    <input
                      type="text"
                      name="event_organizer"
                      value={formData.event_organizer}
                      onChange={handleInputChange}
                      required
                      placeholder="Organization name"
                      className="w-full bg-[#1E2130] border-2 border-[#2A2D3A] rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/30 transition-all"
                    />
                  </div>
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-semibold mb-2">📅 Event Date *</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-[#1E2130] border-2 border-[#2A2D3A] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/30 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2">⏰ Event Time *</label>
                    <input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-[#1E2130] border-2 border-[#2A2D3A] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/30 transition-all"
                    />
                  </div>
                </div>

                {/* Event Type & Location */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-semibold mb-2">🎯 Event Type *</label>
                    <select
                      name="event_type"
                      value={formData.event_type}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-[#1E2130] border-2 border-[#2A2D3A] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/30 transition-all"
                    >
                      <option value="">Select Event Type</option>
                      <option value="Conference">Conference</option>
                      <option value="Workshop">Workshop</option>
                      <option value="Seminar">Seminar</option>
                      <option value="Meetup">Meetup</option>
                      <option value="Competition">Competition</option>
                      <option value="Bootcamp">Bootcamp</option>
                      <option value="Cultural">Cultural</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2">📍 Location *</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., International Convention City, Dhaka"
                      className="w-full bg-[#1E2130] border-2 border-[#2A2D3A] rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/30 transition-all"
                    />
                  </div>
                </div>

                {/* Event Image */}
                <div>
                  <label className="block text-white font-semibold mb-2">🖼️ Event Image</label>
                  <div className="flex items-center gap-4">
                    <input
                      type="file"
                      name="event_image"
                      onChange={handleImageChange}
                      accept="image/*"
                      className="w-full bg-[#1E2130] border-2 border-[#2A2D3A] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/30 transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-500 file:text-white hover:file:bg-green-600"
                    />
                  </div>
                  <p className="text-gray-400 text-sm mt-2">Upload a cover image for your event (optional)</p>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-white font-semibold mb-2">📝 Event Description *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows="3"
                    placeholder="Describe your event in detail..."
                    className="w-full bg-[#1E2130] border-2 border-[#2A2D3A] rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/30 transition-all resize-none"
                  />
                </div>
              </form>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-green-500/30 flex justify-end gap-3">
              <button
                onClick={() => setShowPostModal(false)}
                className="px-6 py-2 bg-gray-600 text-white font-medium rounded-xl hover:bg-gray-700 transition-all duration-200 border border-gray-500/30"
              >
                Cancel
              </button>
              
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-6 py-2 bg-gradient-to-r from-green-600 to-blue-600 text-white font-medium rounded-xl hover:from-green-500 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg shadow-green-500/25 flex items-center gap-2 border border-green-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <span>🚀</span>
                    Create Event
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

export default EventsPage