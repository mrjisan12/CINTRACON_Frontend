import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-black text-white px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <img
          src="/logo.png" // replace with your logo later
          alt="Logo"
          className="w-10 h-10"
        />
        <span className="font-bold text-xl">CINTRACON</span>
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex space-x-6">
        <a
          href="#home"
          className="hover:text-blue-400 transition-colors duration-200"
        >
          Home
        </a>
        <a
          href="#developers"
          className="hover:text-blue-400 transition-colors duration-200"
        >
          Developers
        </a>
        <a
          href="#feedback"
          className="hover:text-blue-400 transition-colors duration-200"
        >
          Feedback
        </a>
      </div>

      {/* Get Started Button */}
      <div>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-5 py-2 rounded-full transition-colors duration-200">
          Get Started
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
