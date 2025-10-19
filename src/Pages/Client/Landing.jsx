import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../Ui/Navbar";
import Footer from "../../Ui/Footer";

const Landing = () => {
  return (
    <div className="bg-gradient-to-b from-black via-[#0a0a2a] to-black text-white relative overflow-hidden">
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="flex flex-col md:flex-row items-center justify-between px-4 sm:px-6 md:px-20 py-20 md:py-40 relative">
        {/* Top-right Gradient */}
        <div className="absolute top-0 right-0 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-gradient-to-tr from-[#5C4FEF] to-transparent rounded-full blur-3xl opacity-80 z-0"></div>

        {/* Left Text Content */}
        <div className="max-w-full md:max-w-lg z-20 mb-10 md:mb-0 md:ml-auto md:mr-10 lg:ml-80 order-2 md:order-1">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center md:text-left leading-tight">
            Welcome to{" "}
            <span
              className="text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text block md:inline"
              style={{ fontFamily: "'Audiowide', sans-serif" }}
            >
              CINTRACON
            </span>
          </h2>
          <p className="text-gray-300 text-lg sm:text-xl md:text-2xl mt-6 md:mt-8 text-center md:text-left leading-relaxed">
            A Student-driven Platform for Connecting, Sharing and Growing{" "}
            <span
              className="text-transparent bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text font-semibold block"
              style={{ fontFamily: "'Playfair Display', sans-serif" }}
            >
              Together...
            </span>
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-5 justify-center md:justify-start mt-6 md:mt-8">
            <Link to="/signup" className="w-full sm:w-auto">
              <button className="bg-[#030D37] hover:bg-[#061050] w-full sm:w-auto px-6 py-3 rounded-full font-medium transition-colors duration-300">
                Signup
              </button>
            </Link>
            <Link to="/login" className="w-full sm:w-auto">
              <button className="bg-[#030D37] hover:bg-[#061050] w-full sm:w-auto px-6 py-3 rounded-full font-medium transition-colors duration-300">
                Login
              </button>
            </Link>
          </div>
        </div>

        {/* Right Robot Image with Dark Circle */}
        <div className="relative mb-8 md:mb-0 -translate-y-5 md:-translate-y-10 order-1 md:order-2">
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Responsive dark circle behind robot */}
            <div className="w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px] lg:w-[520px] lg:h-[520px] rounded-full bg-black opacity-80"></div>
          </div>
          <img
            src="/images/picRobot.png"
            alt="Robot"
            className="relative w-[300px] sm:w-[370px] md:w-[420px] lg:w-[550px] transform scale-x-[-1] mx-auto"
          />
        </div>
      </section>

      {/* About Section */}
      <section className="px-4 sm:px-6 md:px-20 py-20 md:py-40 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 text-center md:text-left">
            What is{" "}
            <span className="text-cyan-400 block md:inline" style={{ fontFamily: "'Audiowide', sans-serif" }}>
              CINTRACON ?
            </span>
          </h2>
          <p className="text-gray-300 text-lg sm:text-xl md:text-2xl lg:text-3xl mt-6 md:mt-8 text-center md:text-left">
            CINTRACON is a student-driven platform that connects students,
            alumni, and professionals, enabling them to share knowledge,
            experiences, and opportunities.
          </p>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <img
            src="/images/homePage.jpg"
            alt="home page"
            className="rounded-lg shadow-lg w-full max-w-[500px] md:max-w-[700px]"
          />
        </div>
      </section>

      {/* Goal Section */}
      <section className="px-4 sm:px-6 md:px-20 py-20 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 order-2 md:order-1 flex justify-center">
          <img
            src="/images/pic1.png"
            alt="Goal"
            className="w-[250px] sm:w-[300px] md:w-[400px] lg:w-[500px]"
          />
        </div>
        <div className="md:w-1/2 order-1 md:order-2 mb-10 md:mb-0">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 text-center md:text-left">
            What is our{" "}
            <span className="text-cyan-400 block md:inline" style={{ fontFamily: "'Audiowide', sans-serif" }}>
              Goal?
            </span>
          </h2>
          <p className="text-gray-300 text-lg sm:text-xl md:text-2xl lg:text-3xl mt-6 md:mt-8 text-center md:text-left">
            Our goal is to create an environment where students can easily
            interact, collaborate, share academic resources, and support each
            other in their educational journey.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section id="developers" className="px-4 sm:px-6 md:px-10 py-10 md:py-20">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-10 md:mb-20">
          Developed by Team{" "}
          <span className="text-cyan-400" style={{ fontFamily: "'Audiowide', sans-serif" }}>
            CINTRACON
          </span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 text-center max-w-6xl mx-auto">
          <div className="bg-gray-900/50 rounded-xl p-6 backdrop-blur-sm border border-gray-700/50">
            <img
              src="/images/jisan.jpg"
              alt="Mizanur"
              className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 mx-auto rounded-lg object-cover"
            />
            <h3 className="mt-4 font-semibold text-lg md:text-xl">Md.Mizanur Rahman</h3>
            <p className="text-gray-400 text-base md:text-lg lg:text-xl">Lead Software Engineer</p>
          </div>
          <div className="bg-gray-900/50 rounded-xl p-6 backdrop-blur-sm border border-gray-700/50">
            <img
              src="/images/mamim.jpg"
              alt="Mamim"
              className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 mx-auto rounded-lg object-cover"
            />
            <h3 className="mt-4 font-semibold text-lg md:text-xl">Md.Shahid Al Mamim</h3>
            <p className="text-gray-400 text-base md:text-lg lg:text-xl">SQA Engineer</p>
          </div>
          <div className="bg-gray-900/50 rounded-xl p-6 backdrop-blur-sm border border-gray-700/50 sm:col-span-2 lg:col-span-1">
            <img
              src="/images/lamia.jpg"
              alt="Lamia"
              className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 mx-auto rounded-lg object-cover"
            />
            <h3 className="mt-4 font-semibold text-lg md:text-xl">Lamia Akter Jesmin</h3>
            <p className="text-gray-400 text-base md:text-lg lg:text-xl">Frontend Developer</p>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="feedback" className="px-4 sm:px-6 md:px-20 py-16 md:py-20 bg-black">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-4 text-white">Our Reviews</h2>
        <p className="text-gray-400 text-center text-lg sm:text-xl md:text-2xl mb-8 md:mb-12">People use it, they love it</p>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 max-w-7xl mx-auto">
          
          {/* Card 1 */}
          <div className="relative bg-gradient-to-br from-gray-900/90 via-blue-900/30 to-purple-900/20 backdrop-blur-xl p-6 md:p-8 rounded-3xl border border-gray-700/40 hover:border-transparent transition-all duration-700 hover:scale-105 group hover:shadow-2xl hover:shadow-blue-500/40">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/8 to-pink-600/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute -top-2 -left-2 w-3 h-3 md:w-4 md:h-4 bg-blue-500 rounded-full animate-pulse"></div>
            <div className="absolute -bottom-2 -right-2 w-3 h-3 md:w-4 md:h-4 bg-purple-500 rounded-full animate-pulse"></div>
            <div className="relative z-10">
              <div className="text-4xl md:text-5xl mb-4 text-blue-400/40 group-hover:text-blue-400/70 transition-all duration-500">"</div>
              <p className="text-gray-300 mb-6 text-base md:text-lg leading-relaxed font-light">
                CINTRACON helps us with providing important Notes, helpful communities and so on. 
                Really Enjoying using this website. Especially it's a very proud for us that our 
                students is the developer behind this awesome platform.
              </p>
              <div className="flex items-center gap-4 border-t border-gray-700/40 pt-4 group-hover:border-gray-600/60 transition-colors">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center overflow-hidden">
                  <img
                    src="/images/mamim.jpg"
                    alt="Mamim"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg md:text-xl mb-1">S. Al Mamim</h4>
                  <p className="text-gray-400 text-sm font-medium">SQA Engineer</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="relative bg-gradient-to-br from-gray-900/90 via-purple-900/30 to-pink-900/20 backdrop-blur-xl p-6 md:p-8 rounded-3xl border border-gray-700/40 hover:border-transparent transition-all duration-700 hover:scale-105 group hover:shadow-2xl hover:shadow-purple-500/40">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-pink-600/8 to-red-600/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute -top-2 -left-2 w-3 h-3 md:w-4 md:h-4 bg-purple-500 rounded-full animate-pulse"></div>
            <div className="absolute -bottom-2 -right-2 w-3 h-3 md:w-4 md:h-4 bg-pink-500 rounded-full animate-pulse"></div>
            <div className="relative z-10">
              <div className="text-4xl md:text-5xl mb-4 text-purple-400/40 group-hover:text-purple-400/70 transition-all duration-500">"</div>
              <p className="text-gray-300 mb-6 text-base md:text-lg leading-relaxed font-light">
                It's really great and interesting when CINTRACON AI is answering my all confusion 
                related to varsity information. Also getting all of my Study materials from here when needed.
              </p>
              <div className="flex items-center gap-4 border-t border-gray-700/40 pt-4 group-hover:border-gray-600/60 transition-colors">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center overflow-hidden">
                  <img
                    src="/images/nashrah.jpg"
                    alt="Nashrah"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg md:text-xl mb-1">Nashrah Zakir</h4>
                  <p className="text-gray-400 text-sm font-medium">Software Engr.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="relative bg-gradient-to-br from-gray-900/90 via-green-900/30 to-cyan-900/20 backdrop-blur-xl p-6 md:p-8 rounded-3xl border border-gray-700/40 hover:border-transparent transition-all duration-700 hover:scale-105 group hover:shadow-2xl hover:shadow-green-500/40 lg:col-span-2 xl:col-span-1">
            <div className="absolute inset-0 bg-gradient-to-br from-green-600/10 via-cyan-600/8 to-blue-600/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute -top-2 -left-2 w-3 h-3 md:w-4 md:h-4 bg-green-500 rounded-full animate-pulse"></div>
            <div className="absolute -bottom-2 -right-2 w-3 h-3 md:w-4 md:h-4 bg-cyan-500 rounded-full animate-pulse"></div>
            <div className="relative z-10">
              <div className="text-4xl md:text-5xl mb-4 text-green-400/40 group-hover:text-green-400/70 transition-all duration-500">"</div>
              <p className="text-gray-300 mb-6 text-base md:text-lg leading-relaxed font-light">
                The Job Circular Features of CINTRACON impressed me quite well, It's a very good 
                opportunities for every student to earn some real world experience by their work 
                also get some pocket money.
              </p>
              <div className="flex items-center gap-4 border-t border-gray-700/40 pt-4 group-hover:border-gray-600/60 transition-colors">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-green-500 to-cyan-600 rounded-full flex items-center justify-center overflow-hidden">
                  <img
                    src="/images/lamia.jpg"
                    alt="Jesmin"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg md:text-xl mb-1">L.A Jesmin</h4>
                  <p className="text-gray-400 text-sm font-medium">Software Engr.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;