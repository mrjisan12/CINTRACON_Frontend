import React, { useState } from 'react'
import NavbarMain from '../../../Ui/NavbarMain'
import LeftSideBar from '../../../Components/LeftSideBar'

const EventsPage = () => {
  const [showPostModal, setShowPostModal] = useState(false)
  const [showImageModal, setShowImageModal] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    organizer: '',
    date: '',
    time: '',
    location: '',
    type: '',
    description: '',
    image: null
  })

  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Tech Conference 2024",
      organizer: "Digital Bangladesh Foundation",
      date: "Dec 15, 2024",
      time: "9:00 AM - 5:00 PM",
      location: "International Convention City, Bashundhara",
      type: "Conference",
      description: "Join us for the biggest tech conference of the year featuring industry experts and innovative technologies.",
      postedBy: {
        name: "Shahid Al Mamin",
        avatar: "/mamim.jpg"
      },
      postedTime: "2h ago",
      image: "/event1.jpg",
      buttonColor: "from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700",
      borderColor: "border-blue-500/50 hover:border-blue-400",
      interestedCount: 24,
      isInterested: false
    },
    {
      id: 2,
      title: "Startup Pitch Competition",
      organizer: "Bangladesh Innovation Hub",
      date: "Jan 20, 2025",
      time: "10:00 AM - 4:00 PM",
      location: "GP House, Karwan Bazar",
      type: "Competition",
      description: "Pitch your startup idea to top investors and win exciting prizes and mentorship opportunities.",
      postedBy: {
        name: "Lamia Akter Jesmin",
        avatar: "/jesmin.jpeg"
      },
      postedTime: "5h ago",
      image: "/event2.jpg",
      buttonColor: "from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700",
      borderColor: "border-green-500/50 hover:border-green-400",
      interestedCount: 18,
      isInterested: false
    },
    {
      id: 3,
      title: "UI/UX Design Workshop",
      organizer: "DesignPro Studio",
      date: "Dec 22, 2024",
      time: "2:00 PM - 6:00 PM",
      location: "Uttara Club, Dhaka",
      type: "Workshop",
      description: "Hands-on workshop covering the latest design trends and tools for modern UI/UX designers.",
      postedBy: {
        name: "Nashrah Zakir Nawmi",
        avatar: "/nawmi.jpg"
      },
      postedTime: "1d ago",
      image: "/event3.jpg",
      buttonColor: "from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700",
      borderColor: "border-pink-500/50 hover:border-pink-400",
      interestedCount: 32,
      isInterested: false
    },
    {
      id: 4,
      title: "AI & Machine Learning Meetup",
      organizer: "AI Innovations Ltd",
      date: "Jan 10, 2025",
      time: "6:00 PM - 9:00 PM",
      location: "Gulshan Club, Dhaka",
      type: "Meetup",
      description: "Network with AI enthusiasts and learn about the latest developments in machine learning.",
      postedBy: {
        name: "Alif Mahmud Talha",
        avatar: "/alif.jpg"
      },
      postedTime: "3h ago",
      image: "/event4.jpg",
      buttonColor: "from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700",
      borderColor: "border-orange-500/50 hover:border-orange-400",
      interestedCount: 15,
      isInterested: false
    },
    {
      id: 5,
      title: "Web Development Bootcamp",
      organizer: "CodeMaster Academy",
      date: "Jan 5-6, 2025",
      time: "9:30 AM - 6:30 PM",
      location: "Banani Community Center",
      type: "Bootcamp",
      description: "Intensive 2-day bootcamp covering modern web development technologies and best practices.",
      postedBy: {
        name: "Mizanur Rahman Jisan",
        avatar: "/jisan.jpg"
      },
      postedTime: "8h ago",
      image: "/event5.jpg",
      buttonColor: "from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700",
      borderColor: "border-indigo-500/50 hover:border-indigo-400",
      interestedCount: 28,
      isInterested: false
    },
    {
      id: 6,
      title: "Digital Marketing Seminar",
      organizer: "Marketing Gurus BD",
      date: "Dec 28, 2024",
      time: "11:00 AM - 3:00 PM",
      location: "Farmgate Convention Hall",
      type: "Seminar",
      description: "Learn effective digital marketing strategies from industry experts and grow your business online.",
      postedBy: {
        name: "Shahid Al Mamin",
        avatar: "/mamim.jpg"
      },
      postedTime: "6h ago",
      image: "/event6.jpg",
      buttonColor: "from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700",
      borderColor: "border-cyan-500/50 hover:border-cyan-400",
      interestedCount: 21,
      isInterested: false
    }
  ])

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
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Create new event object
      const newEvent = {
        id: events.length + 1,
        title: formData.title,
        organizer: formData.organizer,
        date: formData.date,
        time: formData.time,
        location: formData.location,
        type: formData.type,
        description: formData.description,
        postedBy: {
          name: "Current User", // You can replace with actual user data
          avatar: "/user.jpg"
        },
        postedTime: "Just now",
        image: formData.image ? URL.createObjectURL(formData.image) : "/default-event.jpg",
        buttonColor: "from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700",
        borderColor: "border-blue-500/50 hover:border-blue-400",
        interestedCount: 0,
        isInterested: false
      }
      
      console.log('Event created:', newEvent)
      setEvents(prev => [newEvent, ...prev])
      setShowPostModal(false)
      setFormData({
        title: '',
        organizer: '',
        date: '',
        time: '',
        location: '',
        type: '',
        description: '',
        image: null
      })
      alert('Event created successfully!')
    } catch (error) {
      console.error('Error creating event:', error)
      alert('Error creating event. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInterest = (eventId) => {
    setEvents(prevEvents => 
      prevEvents.map(event => 
        event.id === eventId 
          ? {
              ...event,
              isInterested: !event.isInterested,
              interestedCount: event.isInterested 
                ? event.interestedCount - 1 
                : event.interestedCount + 1
            }
          : event
      )
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
                className={`relative bg-[#20222B] rounded-xl overflow-hidden border-2 ${event.borderColor}
                  transition-all duration-300 group cursor-pointer hover:scale-[1.02] hover:shadow-xl`}
              >
                <div className="relative">
                  {/* Event Image */}
                  <div 
                    className="relative h-48 w-full rounded-t-xl overflow-hidden cursor-pointer"
                    onClick={() => handleImageClick(event.image)}
                  >
                    <img 
                      src={event.image} 
                      alt={event.title} 
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                    {/* Dark Image Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70"></div>
                    
                    {/* Event Type Badge */}
                    <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-md text-white text-xs font-bold px-2 py-1 rounded-full">
                      {event.type}
                    </div>

                    {/* Organizer Name on Image */}
                    <div className="absolute bottom-3 left-3">
                      <p className="text-gray-200 text-sm drop-shadow-lg font-medium">{event.organizer}</p>
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
                        <span className="text-sm font-medium">{event.date}</span>
                      </div>
                      
                      {/* Time */}
                      <div className="flex items-center gap-3 text-gray-300">
                        <span className="text-blue-400 text-base">⏰</span>
                        <span className="text-sm">{event.time}</span>
                      </div>
                      
                      {/* Location */}
                      <div className="flex items-center gap-3 text-gray-300">
                        <span className="text-red-400 text-base">📍</span>
                        <span className="text-sm">{event.location}</span>
                      </div>
                      
                      {/* Description */}
                      <div className="flex items-start gap-3 text-gray-300">
                        <span className="text-purple-400 text-base">📝</span>
                        <span className="text-sm">{event.description}</span>
                      </div>
                    </div>

                    {/* I'm Interested Button with Count */}
                    <div className="flex justify-center mb-4">
                      <button 
                        onClick={() => handleInterest(event.id)}
                        className={`px-4 py-2 rounded-lg text-white font-semibold text-sm
                          bg-gradient-to-r ${event.buttonColor} transform hover:scale-105 hover:shadow-lg
                          transition-all duration-300 w-full flex items-center justify-center gap-2
                          ${event.isInterested ? 'ring-2 ring-yellow-400' : ''}`}
                      >
                        {event.isInterested ? (
                          <>
                            <span>✅</span>
                            Interested ({event.interestedCount})
                          </>
                        ) : (
                          <>
                            <span>🤔</span>
                            I'm Interested ({event.interestedCount})
                          </>
                        )}
                      </button>
                    </div>

                    {/* Posted By - Avatar First, "Posted by" above Name, Time on Right */}
                    <div className="flex items-center justify-between gap-2 pt-3 border-t border-gray-700">
                      <div className="flex items-center gap-2">
                        <img 
                          src={event.postedBy.avatar} 
                          alt={event.postedBy.name}
                          className="w-6 h-6 rounded-full border border-green-500"
                        />
                        <div>
                          <p className="text-xs text-gray-400">Posted by</p>
                          <p className="text-sm font-medium text-white">{event.postedBy.name}</p>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500 bg-gray-800/50 px-2 py-1 rounded">
                        {event.postedTime}
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
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-green-500/20 border-2 border-green-500/30 bg-black">
              <img 
                src={selectedImage} 
                alt="Event Preview" 
                className="max-w-full max-h-[80vh] object-contain"
              />
              
              {/* Loading Indicator */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300">
                <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            </div>

            {/* Navigation Arrows (if you have multiple images) */}
            <button 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/20 backdrop-blur-md text-white rounded-full hover:bg-white/30 transition-all duration-200 border border-white/30 hover:scale-110"
              onClick={() => {
                // Add navigation logic here if needed
              }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button 
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/20 backdrop-blur-md text-white rounded-full hover:bg-white/30 transition-all duration-200 border border-white/30 hover:scale-110"
              onClick={() => {
                // Add navigation logic here if needed
              }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
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
                <h2 className="text-2xl font-bold text-white bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
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
                      name="organizer"
                      value={formData.organizer}
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
                      type="text"
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., 9:00 AM - 5:00 PM"
                      className="w-full bg-[#1E2130] border-2 border-[#2A2D3A] rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/30 transition-all"
                    />
                  </div>
                </div>

                {/* Event Type & Location */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-semibold mb-2">🎯 Event Type *</label>
                    <select
                      name="type"
                      value={formData.type}
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
                      <option value="Networking">Networking</option>
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
                  <label className="block text-white font-semibold mb-2">🖼️ Event Image *</label>
                  <div className="flex items-center gap-4">
                    <input
                      type="file"
                      name="image"
                      onChange={handleImageChange}
                      accept="image/*"
                      required
                      className="w-full bg-[#1E2130] border-2 border-[#2A2D3A] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/30 transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-500 file:text-white hover:file:bg-green-600"
                    />
                  </div>
                  <p className="text-gray-400 text-sm mt-2">Upload a cover image for your event</p>
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