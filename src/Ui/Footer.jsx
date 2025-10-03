import React from 'react';

const Footer = () => {
  return (
    <div className="w-full bg-black text-white">
      {/* Main Footer Content */}
      <div className="max-w-4xl mx-auto px-6 py-20">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center shadow-2xl">
              <span className="text-white font-bold text-3xl">C</span>
            </div>
            <h1 className="text-6xl font-bold bg-gradient-to-r from-white via-blue-100 to-gray-300 bg-clip-text text-transparent">
              CINTRACON
            </h1>
          </div>
          <p className="text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed font-light">
            University of Asia Pacific
          </p>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          
          {/* Contact Information */}
          <div className="space-y-6">
            {/* Phone */}
            <div className="group">
              <div className="flex items-center space-x-6 p-8 bg-gradient-to-r from-gray-900 to-black rounded-3xl border-2 border-gray-800 hover:border-blue-500 transition-all duration-500">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center shadow-xl">
                  <span className="text-3xl">📞</span>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-2 font-medium">PHONE NUMBER</p>
                  <p className="text-3xl font-bold text-white">01752730364</p>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="group">
              <div className="flex items-center space-x-6 p-8 bg-gradient-to-r from-gray-900 to-black rounded-3xl border-2 border-gray-800 hover:border-green-500 transition-all duration-500">
                <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-800 rounded-2xl flex items-center justify-center shadow-xl">
                  <span className="text-3xl">✉️</span>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-2 font-medium">EMAIL ADDRESS</p>
                  <p className="text-xl font-bold text-white">cintraconofficial@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className="group">
            <div className="h-full p-8 bg-gradient-to-br from-gray-900 to-black rounded-3xl border-2 border-gray-800 hover:border-purple-500 transition-all duration-500">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl flex items-center justify-center">
                  <span className="text-3xl">📍</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">OUR LOCATION</h3>
                  <p className="text-gray-400 text-sm">Visit us at our campus</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-black rounded-xl border border-gray-800">
                  <span className="text-blue-400 text-2xl">🏛️</span>
                  <div>
                    <p className="text-lg font-semibold text-white">University of Asia Pacific</p>
                    <p className="text-gray-400">Premier educational institution</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-black rounded-xl border border-gray-800">
                  <span className="text-green-400 text-2xl">🛣️</span>
                  <div>
                    <p className="text-lg font-semibold text-white">Green Road, Farmget</p>
                    <p className="text-gray-400">Prime location in Dhaka</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-black rounded-xl border border-gray-800">
                  <span className="text-purple-400 text-2xl">🌆</span>
                  <div>
                    <p className="text-lg font-semibold text-white">Dhaka-1205</p>
                    <p className="text-gray-400">Bangladesh</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center">
          <div className="inline-flex items-center space-x-6 p-6 bg-gradient-to-r from-gray-900 to-black rounded-2xl border-2 border-gray-800">
            <div className="w-14 h-14 bg-gradient-to-br from-yellow-600 to-yellow-800 rounded-2xl flex items-center justify-center">
              <span className="text-2xl">🕒</span>
            </div>
            <div className="text-left">
              <p className="text-gray-400 text-sm font-medium">OFFICE HOURS</p>
              <p className="text-xl font-bold text-white">9:00 AM - 5:00 PM</p>
              <p className="text-gray-500">Monday to Friday</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 bg-gray-900">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="text-center">
            <p className="text-gray-400 text-lg">
              © 2023 <span className="text-white font-bold">CINTRACON</span> - University of Asia Pacific
            </p>
            <p className="text-gray-500 text-sm mt-2">Green Road, Farmget, Dhaka-1205, Bangladesh</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;