import React from 'react'
import NavbarMain from '../../../Ui/NavbarMain'
import LeftSideBar from '../../../Components/LeftSideBar'

const JobPage = () => {
  const jobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "TechNova Solutions",
      salary: "৳60,000 - ৳80,000",
      location: "Dhaka, Bangladesh",
      type: "Full-time",
      deadline: "Dec 30, 2024",
      duration: "9:00 AM - 6:00 PM",
      postedBy: {
        name: "Shahid Al Mamin",
        avatar: "/mamim.jpg"
      },
      image: "/job1.jpg",
      cardGradient: "from-blue-100/10 via-purple-100/5 to-indigo-100/10",
      borderGradient: "from-blue-200 to-purple-200",
      imageOverlay: "from-blue-100/30 via-purple-100/20 to-indigo-100/40",
      buttonColor: "from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600",
      accentColor: "blue"
    },
    {
      id: 2,
      title: "Backend Engineer",
      company: "CodeHub Technologies",
      salary: "৳70,000 - ৳90,000",
      location: "Remote",
      type: "Contract",
      deadline: "Jan 15, 2025",
      duration: "10:00 AM - 7:00 PM",
      postedBy: {
        name: "Lamia Akter Jesmin",
        avatar: "/jesmin.jpeg"
      },
      image: "/job2.png",
      cardGradient: "from-emerald-100/10 via-teal-100/5 to-green-100/10",
      borderGradient: "from-emerald-200 to-teal-200",
      imageOverlay: "from-emerald-100/30 via-teal-100/20 to-green-100/40",
      buttonColor: "from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600",
      accentColor: "emerald"
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
      image: "/job3.png",
      cardGradient: "from-pink-100/10 via-rose-100/5 to-fuchsia-100/10",
      borderGradient: "from-pink-200 to-rose-200",
      imageOverlay: "from-pink-100/30 via-rose-100/20 to-fuchsia-100/40",
      buttonColor: "from-pink-400 to-rose-500 hover:from-pink-500 hover:to-rose-600",
      accentColor: "pink"
    },
    {
      id: 4,
      title: "Data Scientist",
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
      image: "/job4.png",
      cardGradient: "from-amber-100/10 via-orange-100/5 to-red-100/10",
      borderGradient: "from-amber-200 to-orange-200",
      imageOverlay: "from-amber-100/30 via-orange-100/20 to-red-100/40",
      buttonColor: "from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600",
      accentColor: "amber"
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
        name: "Miznur Rahman Jisan",
        avatar: "/jisan.jpg"
      },
      image: "/job5.png",
      cardGradient: "from-indigo-100/10 via-blue-100/5 to-violet-100/10",
      borderGradient: "from-indigo-200 to-blue-200",
      imageOverlay: "from-indigo-100/30 via-blue-100/20 to-violet-100/40",
      buttonColor: "from-indigo-400 to-blue-500 hover:from-indigo-500 hover:to-blue-600",
      accentColor: "indigo"
    },
    {
      id: 6,
      title: "Mobile App Developer",
      company: "AppCraft Studios",
      salary: "৳55,000 - ৳75,000",
      location: "Remote",
      type: "Contract",
      deadline: "Dec 28, 2024",
      duration: "Flexible Hours",
      postedBy: {
        name: "Shahid Al Mamin",
        avatar: "/mamim.jpg"
      },
      image: "/job6.png",
      cardGradient: "from-cyan-100/10 via-sky-100/5 to-blue-100/10",
      borderGradient: "from-cyan-200 to-sky-200",
      imageOverlay: "from-cyan-100/30 via-sky-100/20 to-blue-100/40",
      buttonColor: "from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600",
      accentColor: "cyan"
    }
  ];

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
            <button className="ml-auto px-6 py-2 rounded-lg text-white font-semibold shadow-lg 
              bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 
              transform hover:scale-105 transition-all duration-300 text-sm">
              Post a Job 
            </button>
          </div>

          {/* Job Cards Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
            {jobs.map((job) => (
              <div 
                key={job.id}
                className={`relative bg-gradient-to-br ${job.cardGradient} backdrop-blur-sm rounded-xl overflow-hidden 
                  border border-gray-500/20 transition-all duration-300 group cursor-pointer
                  hover:scale-[1.02] hover:shadow-xl hover:border-${job.accentColor}-300/50`}
              >
                {/* Light Border Glow */}
                <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${job.borderGradient} opacity-0 
                  group-hover:opacity-30 transition-opacity duration-300 -z-10`}></div>
                
                <div className="relative">
                  {/* Job Image */}
                  <div className="relative h-48 w-full rounded-t-xl overflow-hidden">
                    <img 
                      src={job.image} 
                      alt={job.title} 
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                    {/* Light Image Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t ${job.imageOverlay} opacity-50 
                      group-hover:opacity-60 transition-opacity duration-300`}></div>
                    
                    {/* Job Type Badge */}
                    <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-md text-white text-xs font-bold px-2 py-1 rounded-full">
                      {job.type}
                    </div>

                    {/* Company Name on Image */}
                    <div className="absolute bottom-3 left-3">
                      <p className="text-gray-200 text-sm drop-shadow-lg font-medium">{job.company}</p>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-4">
                    {/* Job Title - Below Image */}
                    <div className="mb-3">
                      <h2 className="text-lg font-bold text-white">
                        {job.title}
                      </h2>
                    </div>

                    {/* Job Details */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-gray-300">
                          <span className="text-green-300 text-sm">💰</span>
                          <span className="text-xs font-medium">{job.salary}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-300">
                          <span className="text-blue-300 text-sm">📍</span>
                          <span className="text-xs">{job.location}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-gray-300">
                          <span className="text-red-300 text-sm">🗓️</span>
                          <span className="text-xs">Deadline: {job.deadline}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-300">
                          <span className="text-purple-300 text-sm">⏰</span>
                          <span className="text-xs">{job.duration}</span>
                        </div>
                      </div>
                    </div>

                    {/* Apply Button */}
                    <div className="flex justify-center mb-3">
                      <button className={`px-4 py-1.5 rounded text-white font-semibold text-xs
                        bg-gradient-to-r ${job.buttonColor} transform hover:scale-105 hover:shadow-lg
                        transition-all duration-300 w-2/3`}>
                        Apply Now
                      </button>
                    </div>

                    {/* Posted By - With Avatar First */}
                    <div className="flex items-center gap-2 pt-3 border-t border-gray-600/30">
                      <img 
                        src={job.postedBy.avatar} 
                        alt={job.postedBy.name}
                        className="w-6 h-6 rounded-full border border-blue-400"
                      />
                      <div>
                        <p className="text-xs text-gray-400">Posted by</p>
                        <p className="text-sm font-medium text-white">{job.postedBy.name}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobPage