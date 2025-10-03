import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../Ui/Navbar";
import Footer from "../../Ui/Footer";

// Add Audiowide font in index.html <head>:
// <link href="https://fonts.googleapis.com/css2?family=Audiowide&display=swap" rel="stylesheet">

const Landing = () => {
  return (
    <div className="bg-gradient-to-b from-black via-[#0a0a2a] to-black text-white relative overflow-hidden">
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-40 relative">
        {/* Top-left Gradient */}
        <div className="absolute top-1 right-2 w-[600px] h-[600px] bg-gradient-to-tr from-[#5C4FEF] to-transparent rounded-full blur-3xl opacity-80 z-0"></div>

       {/* Left Text Content */}
<div className="max-w-lg z-20 mb-10 md:mb-0 ml-auto md:ml-80">
  <h2 className="text-7xl font-bold text-left leading-tight">
    Welcome to{" "}
    <span
      className="text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text"
      style={{ fontFamily: "'Audiowide', sans-serif" }}
    >
      CINTRACON
    </span>
  </h2>
  <p className="text-gray-300 text-2xl mt-8 text-left leading-relaxed">
    A Student-driven Platform for Connecting, Sharing and Growing{" "}
    <span
      className="text-transparent bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text font-semibold"
      style={{ fontFamily: "'Playfair Display', sans-serif" }}
    >
      Together...
    </span>
          </p>
          <div className="flex space-x-5 justify-center mt-8">
            <Link to="/signup">
    <button className="bg-[#030D37] hover:bg-[#061050] px-7 py-3 rounded-full font-medium">
      Signup
    </button>
  </Link>
  <Link to="/login">
    <button className="bg-[#030D37] hover:bg-[#061050] px-7 py-3 rounded-full font-medium">
      Login
    </button>
  </Link>
          </div>
        </div>

        {/* Right Robot Image with Dark Circle */}
        <div className="relative mb-10 md:mb-0 -translate-y-10">
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Dark black circle behind robot */}
            <div className="w-[520px] h-[520px] rounded-full bg-black opacity-80"></div>
          </div>
          <img
            src="/images/picRobot.png"
            alt="Robot"
            className="relative w-[550px] md:w-[550px] transform scale-x-[-1]"
          />
        </div>
      </section>

      {/* About Section */}
      <section className="px-6 md:px-20 py-40 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h2 className="text-7xl font-bold mb-4">
            What is{" "}
            <span className="text-cyan-400" style={{ fontFamily: "'Audiowide', sans-serif" }}>
              CINTRACON ?
            </span>
          </h2>
          <p className="text-gray-300 text-3xl mt-8 text-left">
            CINTRACON is a student-driven platform that connects students,
            alumni, and professionals, enabling them to share knowledge,
            experiences, and opportunities.
          </p>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <img
            src="/images/homePage.jpg"
            alt="home page"
            className="rounded-lg shadow-lg w-[700px]"
          />
        </div>
      </section>

      {/* Goal Section */}
      <section className="px-6 md:px-20 py-20 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 order-2 md:order-1 flex justify-center">
          <img
            src="/images/pic1.png"
            alt="Goal"
            className="w-[320px] md:w-[500px]"
          />
        </div>
        <div className="md:w-1/2 order-1 md:order-2 mb-10 md:mb-0">
          <h2 className="text-7xl font-bold mb-4">
            What is our{" "}
            <span className="text-cyan-400" style={{ fontFamily: "'Audiowide', sans-serif" }}>
              Goal?
            </span>
          </h2>
          <p className="text-gray-300 text-3xl mt-8 text-left">
            Our goal is to create an environment where students can easily
            interact, collaborate, share academic resources, and support each
            other in their educational journey.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section id="developers" className="px-6 md:px-10 py-10">
        <h2 className="text-6xl font-bold text-center mb-30">
          Developed by Team{" "}
          <span className="text-cyan-400" style={{ fontFamily: "'Audiowide', sans-serif" }}>
            CINTRACON
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-center">
          <div>
            <img
              src="/images/jisan.jpg"
              alt="Mizanur"
              className="w-90 h-90 mx-auto rounded-lg object-cover"
            />
            <h3 className="mt-4 font-semibold">Md.Mizanur Rahman</h3>
            <p className="text-gray-400 text-2xl">Lead Software Engineer</p>
          </div>
          <div>
            <img
              src="/images/mamim.jpg"
              alt="Mamim"
              className="w-90 h-90 mx-auto rounded-lg object-cover"
            />
            <h3 className="mt-4 font-semibold">Md.Shahid Al Mamim</h3>
            <p className="text-gray-400 text-2xl">SQA Engineer</p>
          </div>
          <div>
            <img
              src="/images/lamia.jpg"
              alt="Lamia"
              className="w-90 h-90 mx-auto rounded-lg object-cover"
            />
            <h3 className="mt-4 font-semibold">Lamia Akter Jesmin</h3>
            <p className="text-gray-400 text-2xl">Frontend Developer</p>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="feedback" className="px-6 md:px-20 py-20 bg-black">
  <h2 className="text-6xl font-bold text-center mb-5 text-white">Our Reviews</h2>
  <p className="text-gray-400 text-center text-2xl mb-12">People use it, they love it</p>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    
    {/* Card 1 */}
<div className="relative bg-gradient-to-br from-gray-900/90 via-blue-900/30 to-purple-900/20 backdrop-blur-xl p-8 rounded-3xl border border-gray-700/40 hover:border-transparent transition-all duration-700 hover:scale-105 group hover:shadow-2xl hover:shadow-blue-500/40">
  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/8 to-pink-600/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
  <div className="absolute -top-2 -left-2 w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
  <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-purple-500 rounded-full animate-pulse"></div>
  <div className="relative z-10">
    <div className="text-5xl mb-4 text-blue-400/40 group-hover:text-blue-400/70 transition-all duration-500">"</div>
    <p className="text-gray-300 mb-6 text-lg leading-relaxed font-light">
      CINTRACON helps us with providing important Notes, helpful communities and so on. 
      Really Enjoying using this website. Especially it's a very proud for us that our 
      students is the developer behind this awesome platform.
    </p>
    <div className="flex items-center gap-4 border-t border-gray-700/40 pt-4 group-hover:border-gray-600/60 transition-colors">
      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center overflow-hidden">
        <img
          src="/images/mamim.jpg"
          alt="Mamim"
          className="w-full h-full object-cover"
        />
      </div>
      <div>
        <h4 className="font-bold text-white text-xl mb-1">S. Al Mamim</h4>
        <p className="text-gray-400 text-sm font-medium">SQA Engineer</p>
      </div>
    </div>
  </div>
</div>

    {/* Card 2 */}
<div className="relative bg-gradient-to-br from-gray-900/90 via-purple-900/30 to-pink-900/20 backdrop-blur-xl p-8 rounded-3xl border border-gray-700/40 hover:border-transparent transition-all duration-700 hover:scale-105 group hover:shadow-2xl hover:shadow-purple-500/40">
  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-pink-600/8 to-red-600/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
  <div className="absolute -top-2 -left-2 w-4 h-4 bg-purple-500 rounded-full animate-pulse"></div>
  <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-pink-500 rounded-full animate-pulse"></div>
  <div className="relative z-10">
    <div className="text-5xl mb-4 text-purple-400/40 group-hover:text-purple-400/70 transition-all duration-500">"</div>
    <p className="text-gray-300 mb-6 text-lg leading-relaxed font-light">
      It's really great and interesting when CINTRACON AI is answering my all confusion 
      related to varsity information. Also getting all of my Study materials from here when needed.
    </p>
    <div className="flex items-center gap-4 border-t border-gray-700/40 pt-4 group-hover:border-gray-600/60 transition-colors">
      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center overflow-hidden">
        <img
          src="/images/nashrah.jpg"
          alt="Nashrah"
          className="w-full h-full object-cover"
        />
      </div>
      <div>
        <h4 className="font-bold text-white text-xl mb-1">Nashrah Zakir</h4>
        <p className="text-gray-400 text-sm font-medium">Software Engr.</p>
      </div>
    </div>
  </div>
</div>

   {/* Card 3 */}
<div className="relative bg-gradient-to-br from-gray-900/90 via-green-900/30 to-cyan-900/20 backdrop-blur-xl p-8 rounded-3xl border border-gray-700/40 hover:border-transparent transition-all duration-700 hover:scale-105 group hover:shadow-2xl hover:shadow-green-500/40">
  <div className="absolute inset-0 bg-gradient-to-br from-green-600/10 via-cyan-600/8 to-blue-600/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
  <div className="absolute -top-2 -left-2 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
  <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-cyan-500 rounded-full animate-pulse"></div>
  <div className="relative z-10">
    <div className="text-5xl mb-4 text-green-400/40 group-hover:text-green-400/70 transition-all duration-500">"</div>
    <p className="text-gray-300 mb-6 text-lg leading-relaxed font-light">
      The Job Circular Features of CINTRACON impressed me quite well, It's a very good 
      opportunities for every student to earn some real world experience by their work 
      also get some pocket money.
    </p>
    <div className="flex items-center gap-4 border-t border-gray-700/40 pt-4 group-hover:border-gray-600/60 transition-colors">
      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-cyan-600 rounded-full flex items-center justify-center overflow-hidden">
        <img
          src="/images/lamia.jpg"
          alt="Jesmin"
          className="w-full h-full object-cover"
        />
      </div>
      <div>
        <h4 className="font-bold text-white text-xl mb-1">L.A Jesmin</h4>
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
