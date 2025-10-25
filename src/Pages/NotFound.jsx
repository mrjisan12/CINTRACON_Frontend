import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Vector Illustration */}
        <div className="mb-0">
          <img 
            src="/images/not_f.png" 
            alt="404 Not Found" 
            className="w-80 h-80 mx-auto animate-float"
          />
        </div>

        {/* Content */}
        <div className="space-y-2">
          <div className="relative">
            <h1 className="text-7xl md:text-9xl font-black text-slate-800 mb-4">
              404
            </h1>
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-amber-400 rounded-full animate-pulse"></div>
            <div className="absolute -bottom-2 -left-4 w-6 h-6 bg-indigo-400 rounded-full animate-pulse"></div>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
            Oops! Page Not Found
          </h2>
          
          <p className="text-lg text-slate-600 max-w-md mx-auto leading-relaxed">
            The page you're looking for seems to have wandered off into the digital void. 
            Don't worry, even the best explorers get lost sometimes.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-4">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-medium hover:bg-slate-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Back to Home
            </Link>
            
            <button 
              onClick={() => window.history.back()} 
              className="inline-flex items-center gap-2 border border-slate-300 text-slate-700 px-6 py-3 rounded-xl font-medium hover:bg-white hover:border-slate-400 transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Go Back
            </button>
          </div>

          {/* Additional Help */}
          <div className="mt-2 pt-6 border-t border-slate-200">
            <p className="text-sm text-slate-500">
              Need help? <Link to="/contact" className="text-indigo-600 hover:text-indigo-700 font-medium">Contact our support team</Link>
            </p>
          </div>
        </div>
      </div>

      {/* Floating Background Elements */}
      <div className="absolute top-1/4 left-10 w-4 h-4 bg-blue-300 rounded-full opacity-60 animate-bounce"></div>
      <div className="absolute top-1/3 right-20 w-6 h-6 bg-purple-300 rounded-full opacity-40 animate-pulse"></div>
      <div className="absolute bottom-1/4 left-20 w-3 h-3 bg-amber-300 rounded-full opacity-70 animate-bounce delay-1000"></div>
      <div className="absolute bottom-1/3 right-10 w-5 h-5 bg-indigo-300 rounded-full opacity-50 animate-pulse delay-500"></div>
    </div>
  );
}