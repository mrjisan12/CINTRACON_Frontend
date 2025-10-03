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
      postedTime: "2 hours ago",
      postedBy: {
        name: "Shahid Al Mamin",
        avatar: "/mamim.jpg"
      },
      image: "/job1.jpg",
      gradient: "from-blue-500 to-purple-600",
      buttonColor: "from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
    },
    {
      id: 2,
      title: "Backend Engineer",
      company: "CodeHub Technologies",
      salary: "৳70,000 - ৳90,000",
      location: "Remote",
      type: "Contract",
      deadline: "Jan 15, 2025",
      postedTime: "5 hours ago",
      postedBy: {
        name: "Lamia Akter Jesmin",
        avatar: "/jesmin.jpeg"
      },
      image: "/job2.png",
      gradient: "from-green-500 to-teal-600",
      buttonColor: "from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700"
    },
    {
      id: 3,
      title: "UI/UX Designer",
      company: "DesignPro Studio",
      salary: "৳45,000 - ৳65,000",
      location: "Uttara, Dhaka",
      type: "Part-time",
      deadline: "Dec 25, 2024",
      postedTime: "1 day ago",
      postedBy: {
        name: "Nashrah Zakir Nawmi",
        avatar: "/nawmi.jpg"
      },
      image: "/job3.png",
      gradient: "from-pink-500 to-rose-600",
      buttonColor: "from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700"
    },
    {
      id: 4,
      title: "Data Scientist",
      company: "AI Innovations Ltd",
      salary: "৳80,000 - ৳1,00,000",
      location: "Gulshan, Dhaka",
      type: "Full-time",
      deadline: "Jan 10, 2025",
      postedTime: "3 hours ago",
      postedBy: {
        name: "Alif Mahmud Talha",
        avatar: "/alif.jpg"
      },
      image: "/job4.png",
      gradient: "from-orange-500 to-red-600",
      buttonColor: "from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
    },
    {
      id: 5,
      title: "DevOps Engineer",
      company: "Cloud Systems Inc",
      salary: "৳75,000 - ৳95,000",
      location: "Banani, Dhaka",
      type: "Full-time",
      deadline: "Jan 5, 2025",
      postedTime: "8 hours ago",
      postedBy: {
        name: "Miznur Rahman Jisan",
        avatar: "/jisan.jpg"
      },
      image: "/job5.png",
      gradient: "from-indigo-500 to-blue-600",
      buttonColor: "from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700"
    },
    {
      id: 6,
      title: "Mobile App Developer",
      company: "AppCraft Studios",
      salary: "৳55,000 - ৳75,000",
      location: "Remote",
      type: "Contract",
      deadline: "Dec 28, 2024",
      postedTime: "6 hours ago",
      postedBy: {
        name: "Shahid Al Mamin",
        avatar: "/mamim.jpg"
      },
      image: "/job6.png",
      gradient: "from-cyan-500 to-blue-600",
      buttonColor: "from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
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
          <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
            <div className="text-center flex-1">
              <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                Find Your Dream Job
              </h1>
              <p className="text-gray-300 text-sm mt-2">
                Discover amazing opportunities and take the next step in your career
              </p>
            </div>
            <button className="ml-auto px-8 py-3 rounded-xl text-white font-semibold shadow-xl 
              bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 
              transform hover:scale-105 transition-all duration-300">
              Post a Job 
            </button>
          </div>

          {/* Job Cards Grid */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
            {jobs.map((job) => (
              <div 
                key={job.id}
                className="relative group bg-[#20222B] rounded-2xl overflow-hidden shadow-2xl border border-[#232A36] 
                  hover:border-blue-500/50 transition-all duration-500 hover:transform hover:scale-105"
              >
                {/* Subtle Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${job.gradient} opacity-3 group-hover:opacity-5 transition-opacity duration-500`}></div>
                
                <div className="relative p-6">
                  {/* Job Image */}
                  <div className="relative h-40 w-full mb-4 rounded-xl overflow-hidden">
                    <img 
                      src={job.image} 
                      alt={job.title} 
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${job.gradient} opacity-30 group-hover:opacity-40 transition-opacity duration-500`}></div>
                  </div>

                  {/* Job Title & Company */}
                  <div className="mb-4">
                    <h2 className="text-xl font-bold text-white mb-1">
                      {job.title}
                    </h2>
                    <p className="text-gray-400 text-sm">{job.company}</p>
                  </div>

                  {/* Job Details - Clean & Simple */}
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <span className="text-green-400">💰</span>
                      {job.salary}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <span className="text-blue-400">📍</span>
                      {job.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <span className="text-purple-400">⏱️</span>
                      {job.type}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <span className="text-red-400">🗓️</span>
                      Deadline: {job.deadline}
                    </div>
                  </div>

                  {/* Apply Button - Centered */}
                  <div className="flex justify-center mb-4">
                    <button className={`px-12 py-3 rounded-lg text-white font-semibold 
                      bg-gradient-to-r ${job.buttonColor} transform hover:scale-105 
                      transition-all duration-300 shadow-lg w-full max-w-xs`}>
                      Apply Now
                    </button>
                  </div>

                  {/* Posted By - Simple & Clean */}
                  <div className="flex items-center justify-center gap-2 pt-3 border-t border-gray-700">
                    <img 
                      src={job.postedBy.avatar} 
                      alt={job.postedBy.name}
                      className="w-6 h-6 rounded-full border border-blue-500"
                    />
                    <div className="text-center">
                      <p className="text-xs text-gray-400">Posted by {job.postedBy.name}</p>
                      <p className="text-xs text-gray-500">{job.postedTime}</p>
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