import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import LeftSideBar from '../../../Components/LeftSideBar';
import NavbarMain from '../../../Ui/NavbarMain';

const NoteSharing = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('All');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [expandedNote, setExpandedNote] = useState(null);
  const [isClosing, setIsClosing] = useState(false);

  // Enhanced Vibrant Semester Colors with better visibility
  const semesterColors = {
    '1.1': { 
      primary: '#FF4757', 
      secondary: 'rgba(255, 71, 87, 0.25)', 
      gradient: 'linear-gradient(135deg, #FF4757 0%, #FF6B81 100%)',
      light: '#FF6B81'
    },
    '1.2': { 
      primary: '#2ED573', 
      secondary: 'rgba(46, 213, 115, 0.25)', 
      gradient: 'linear-gradient(135deg, #2ED573 0%, #32FF7E 100%)',
      light: '#32FF7E'
    },
    '2.1': { 
      primary: '#1B9CFC', 
      secondary: 'rgba(27, 156, 252, 0.25)', 
      gradient: 'linear-gradient(135deg, #1B9CFC 0%, #48DBFB 100%)',
      light: '#48DBFB'
    },
    '2.2': { 
      primary: '#FF9F1A', 
      secondary: 'rgba(255, 159, 26, 0.25)', 
      gradient: 'linear-gradient(135deg, #FF9F1A 0%, #FFC048 100%)',
      light: '#FFC048'
    },
    '3.1': { 
      primary: '#9C42F5', 
      secondary: 'rgba(156, 66, 245, 0.25)', 
      gradient: 'linear-gradient(135deg, #9C42F5 0%, #BA6AF5 100%)',
      light: '#BA6AF5'
    },
    '3.2': { 
      primary: '#FF3838', 
      secondary: 'rgba(255, 56, 56, 0.25)', 
      gradient: 'linear-gradient(135deg, #FF3838 0%, #FF6B6B 100%)',
      light: '#FF6B6B'
    },
    '4.1': { 
      primary: '#00CEC9', 
      secondary: 'rgba(0, 206, 201, 0.25)', 
      gradient: 'linear-gradient(135deg, #00CEC9 0%, #00FFEA 100%)',
      light: '#00FFEA'
    },
    '4.2': { 
      primary: '#FFAF40', 
      secondary: 'rgba(255, 175, 64, 0.25)', 
      gradient: 'linear-gradient(135deg, #FFAF40 0%, #FFD280 100%)',
      light: '#FFD280'
    },
    'Others': { 
      primary: '#7158E2', 
      secondary: 'rgba(113, 88, 226, 0.25)', 
      gradient: 'linear-gradient(135deg, #7158E2 0%, #9B87F5 100%)',
      light: '#9B87F5'
    }
  };

  // Department Colors
  const departmentColors = {
    'CSE': { primary: '#1B9CFC', secondary: 'rgba(27, 156, 252, 0.15)' },
    'EEE': { primary: '#FF9F1A', secondary: 'rgba(255, 159, 26, 0.15)' },
    'BBA': { primary: '#2ED573', secondary: 'rgba(46, 213, 115, 0.15)' },
    'Pharm': { primary: '#FF4757', secondary: 'rgba(255, 71, 87, 0.15)' },
    'Civil': { primary: '#9C42F5', secondary: 'rgba(156, 66, 245, 0.15)' },
    'English': { primary: '#00CEC9', secondary: 'rgba(0, 206, 201, 0.15)' },
    'Law': { primary: '#FFAF40', secondary: 'rgba(255, 175, 64, 0.15)' },
    'General': { primary: '#7158E2', secondary: 'rgba(113, 88, 226, 0.15)' }
  };

  // Sample notes data
  const notesData = [
    { 
      id: 1, 
      title: "Data Structures and Algorithms Complete Guide", 
      semester: "3.1", 
      department: "CSE", 
      uploader: "John Doe", 
      date: "2024-01-15", 
      downloads: 145, 
      type: "pdf",
      rating: 4.8,
      fileSize: "2.4 MB",
      description: "Complete guide to data structures including arrays, linked lists, trees, and graphs with implementation examples. Covers time complexity analysis and practical coding problems.",
      tags: ["DSA", "Algorithms", "Programming", "C++", "Java"]
    },
    { 
      id: 2, 
      title: "Calculus and Mathematical Foundations", 
      semester: "1.1", 
      department: "CSE", 
      uploader: "Jane Smith", 
      date: "2024-01-12", 
      downloads: 89, 
      type: "pdf",
      rating: 4.5,
      fileSize: "1.8 MB",
      description: "Fundamental calculus concepts with solved examples and practice problems. Includes limits, derivatives, integrals, and their applications.",
      tags: ["Calculus", "Mathematics", "Foundations"]
    },
    { 
      id: 3, 
      title: "Object Oriented Programming Principles", 
      semester: "2.1", 
      department: "CSE", 
      uploader: "Mike Johnson", 
      date: "2024-01-10", 
      downloads: 167, 
      type: "pdf",
      rating: 4.9,
      fileSize: "3.2 MB",
      description: "Comprehensive OOP concepts with Java and C++ implementation examples. Covers inheritance, polymorphism, encapsulation, and abstraction.",
      tags: ["OOP", "Java", "C++", "Programming"]
    },
    { 
      id: 4, 
      title: "Database Management Systems", 
      semester: "3.1", 
      department: "CSE", 
      uploader: "Sarah Wilson", 
      date: "2024-01-08", 
      downloads: 203, 
      type: "pdf",
      rating: 4.7,
      fileSize: "4.1 MB",
      description: "SQL, normalization, and database design principles with real-world examples. Includes ER diagrams and transaction management.",
      tags: ["DBMS", "SQL", "Database", "Normalization"]
    },
    { 
      id: 5, 
      title: "Computer Networks Fundamentals", 
      semester: "4.1", 
      department: "CSE", 
      uploader: "Alex Brown", 
      date: "2024-01-05", 
      downloads: 98, 
      type: "pdf",
      rating: 4.6,
      fileSize: "2.9 MB",
      description: "OSI model, TCP/IP protocols, and network security fundamentals. Covers routing algorithms and network architecture.",
      tags: ["Networks", "TCP/IP", "Security", "Protocols"]
    },
    { 
      id: 6, 
      title: "Machine Learning Basics", 
      semester: "4.2", 
      department: "CSE", 
      uploader: "David Lee", 
      date: "2024-01-03", 
      downloads: 234, 
      type: "pdf",
      rating: 4.9,
      fileSize: "5.2 MB",
      description: "Introduction to ML algorithms, neural networks, and practical implementations. Includes Python code examples and datasets.",
      tags: ["Machine Learning", "AI", "Python", "Neural Networks"]
    }
  ];

  // Enhanced Upload Modal Component
  const UploadModal = () => {
    const [formData, setFormData] = useState({
      title: '',
      semester: '',
      department: '',
      courseCode: '',
      description: '',
      file: null
    });
    const [isUploading, setIsUploading] = useState(false);

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };

    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setFormData(prev => ({
          ...prev,
          file: file
        }));
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsUploading(true);
      
      setTimeout(() => {
        console.log('Uploading note:', formData);
        setIsUploading(false);
        setShowUploadModal(false);
        setFormData({
          title: '',
          semester: '',
          department: '',
          courseCode: '',
          description: '',
          file: null
        });
      }, 2000);
    };

    const handleClose = () => {
      setShowUploadModal(false);
      setFormData({
        title: '',
        semester: '',
        department: '',
        courseCode: '',
        description: '',
        file: null
      });
    };

    if (!showUploadModal) return null;

    return (
      <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm transition-opacity duration-300 ${
        isClosing ? 'opacity-0' : 'opacity-100'
      }`}>
        <div className={`relative w-full max-w-2xl bg-gradient-to-br from-[#1E2130] to-[#181820] rounded-3xl border-2 border-purple-500/50 shadow-2xl shadow-purple-500/30 transform transition-all duration-300 ${
          isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
        }`}>
          
          {/* Modal Header */}
          <div className="relative p-6 border-b border-purple-500/30">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                📤 Upload New Note
              </h2>
              <button
                onClick={handleClose}
                className="w-8 h-8 flex items-center justify-center bg-red-500/30 text-red-400 rounded-full hover:bg-red-500/50 transition-colors duration-200 border border-red-500/30"
              >
                ✕
              </button>
            </div>
            <p className="text-gray-300 mt-2">Share your knowledge with the community</p>
          </div>

          {/* Modal Content */}
          <div className="p-6 max-h-96 overflow-y-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Note Title */}
              <div>
                <label className="block text-white font-semibold mb-2">📝 Note Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter descriptive title for your note"
                  className="w-full bg-[#1E2130] border-2 border-[#2A2D3A] rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all"
                />
              </div>

              {/* Semester & Department */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-semibold mb-2">🎓 Semester *</label>
                  <select
                    name="semester"
                    value={formData.semester}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-[#1E2130] border-2 border-[#2A2D3A] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all"
                  >
                    <option value="">Select Semester</option>
                    <option value="1.1">Semester 1.1</option>
                    <option value="1.2">Semester 1.2</option>
                    <option value="2.1">Semester 2.1</option>
                    <option value="2.2">Semester 2.2</option>
                    <option value="3.1">Semester 3.1</option>
                    <option value="3.2">Semester 3.2</option>
                    <option value="4.1">Semester 4.1</option>
                    <option value="4.2">Semester 4.2</option>
                    <option value="Others">Others</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">🏛️ Department *</label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-[#1E2130] border-2 border-[#2A2D3A] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all"
                  >
                    <option value="">Select Department</option>
                    <option value="CSE">Computer Science & Engineering</option>
                    <option value="EEE">Electrical & Electronic Engineering</option>
                    <option value="BBA">Business Administration</option>
                    <option value="Pharm">Pharmacy</option>
                    <option value="Civil">Civil Engineering</option>
                    <option value="English">English</option>
                    <option value="Law">Law</option>
                  </select>
                </div>
              </div>

              {/* Course Code */}
              <div>
                <label className="block text-white font-semibold mb-2">📚 Course Code</label>
                <input
                  type="text"
                  name="courseCode"
                  value={formData.courseCode}
                  onChange={handleInputChange}
                  placeholder="e.g., CSE-101, MAT-201"
                  className="w-full bg-[#1E2130] border-2 border-[#2A2D3A] rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-white font-semibold mb-2">📋 Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Brief description of the note content, topics covered, etc."
                  className="w-full bg-[#1E2130] border-2 border-[#2A2D3A] rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all resize-vertical"
                />
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-white font-semibold mb-2">📎 Upload File *</label>
                <div
                  className={`border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer ${
                    formData.file 
                      ? 'border-green-500 bg-green-500/10' 
                      : 'border-purple-500/50 bg-purple-500/5 hover:border-purple-400 hover:bg-purple-500/10'
                  }`}
                  onClick={() => document.getElementById('file-upload').click()}
                >
                  <input
                    type="file"
                    id="file-upload"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                    required
                    className="hidden"
                  />
                  
                  <div className="text-4xl mb-3">
                    {formData.file ? '📁' : '📤'}
                  </div>
                  
                  {formData.file ? (
                    <div>
                      <p className="text-white font-semibold">{formData.file.name}</p>
                      <p className="text-gray-300 text-sm">Click to change file</p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-white font-semibold">Click to select file</p>
                      <p className="text-gray-300 text-sm">Supports PDF, DOC, DOCX, TXT, JPG, PNG (Max 10MB)</p>
                    </div>
                  )}
                </div>
              </div>
            </form>
          </div>

          {/* Modal Footer */}
          <div className="p-6 border-t border-purple-500/30 flex justify-end gap-3">
            <button
              onClick={handleClose}
              disabled={isUploading}
              className="px-6 py-2 bg-gray-600 text-white font-medium rounded-xl hover:bg-gray-700 transition-all duration-200 border border-gray-500/30"
            >
              Cancel
            </button>
            
            <button
              onClick={handleSubmit}
              disabled={isUploading}
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-xl hover:from-purple-500 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-lg shadow-purple-500/25 flex items-center gap-2 border border-purple-500/30"
            >
              {isUploading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <span>🚀</span>
                  Upload Note
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Note Detail Modal
  const NoteDetailModal = () => {
    if (!expandedNote) return null;

    const colors = semesterColors[expandedNote.semester];
    const deptColors = departmentColors[expandedNote.department] || departmentColors['General'];

    const handleCloseModal = () => {
      setIsClosing(true);
      setTimeout(() => {
        setExpandedNote(null);
        setIsClosing(false);
      }, 300);
    };

    const handleDownload = () => {
      console.log('Downloading:', expandedNote.title);
      // Download logic here
    };

    return (
      <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm transition-opacity duration-300 ${
        isClosing ? 'opacity-0' : 'opacity-100'
      }`}>
        <div className={`relative w-full max-w-4xl bg-gradient-to-br from-[#1E2130] to-[#181820] rounded-3xl border-2 border-purple-500/50 shadow-2xl shadow-purple-500/30 transform transition-all duration-300 ${
          isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
        }`}>
          
          {/* Header */}
          <div className="relative p-6 border-b border-purple-500/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 text-white text-sm font-bold rounded-full border shadow-lg"
                      style={{ 
                        background: colors.gradient,
                        borderColor: colors.primary
                      }}>
                  🎓 Sem {expandedNote.semester}
                </span>
                <span className="px-3 py-1 text-white text-sm font-bold rounded-full border shadow-lg"
                      style={{ 
                        background: deptColors.secondary,
                        borderColor: deptColors.primary,
                        color: deptColors.primary
                      }}>
                  🏛️ {expandedNote.department}
                </span>
              </div>
              <button
                onClick={handleCloseModal}
                className="w-8 h-8 flex items-center justify-center bg-red-500/30 text-red-400 rounded-full hover:bg-red-500/50 transition-colors duration-200 border border-red-500/30"
              >
                ✕
              </button>
            </div>
            
            <h2 className="text-2xl font-bold text-white mt-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {expandedNote.title}
            </h2>
            
            <div className="flex items-center gap-4 mt-3 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-xs font-bold">
                    {expandedNote.uploader.charAt(0)}
                  </span>
                </div>
                <span className="text-gray-300 font-semibold">{expandedNote.uploader}</span>
              </div>
              <span className="text-gray-500">•</span>
              <span className="text-gray-300">📅 {new Date(expandedNote.date).toLocaleDateString()}</span>
              <span className="text-gray-500">•</span>
              <span className="text-gray-300">💾 {expandedNote.fileSize}</span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 max-h-96 overflow-y-auto">
            <div className="mb-6">
              <h3 className="text-white font-semibold mb-2 text-lg">📖 Description</h3>
              <p className="text-gray-300 leading-relaxed bg-gray-800/30 p-4 rounded-xl border border-gray-700/50">
                {expandedNote.description}
              </p>
            </div>

            {/* Tags */}
            <div className="mb-6">
              <h3 className="text-white font-semibold mb-2 text-lg">🏷️ Tags</h3>
              <div className="flex flex-wrap gap-2">
                {expandedNote.tags?.map((tag, index) => (
                  <span key={index} 
                        className="px-3 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 rounded-xl text-sm border border-blue-500/30 shadow-lg">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20 shadow-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400 flex items-center justify-center gap-1">
                  ⭐ {expandedNote.rating}
                </div>
                <div className="text-gray-300 text-sm mt-1">Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400 flex items-center justify-center gap-1">
                  📥 {expandedNote.downloads}
                </div>
                <div className="text-gray-300 text-sm mt-1">Downloads</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400 flex items-center justify-center gap-1">
                  💾 {expandedNote.fileSize}
                </div>
                <div className="text-gray-300 text-sm mt-1">File Size</div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-purple-500/30 flex justify-between items-center">
            <button
              onClick={handleDownload}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl hover:from-green-400 hover:to-emerald-500 transform hover:scale-105 transition-all duration-200 shadow-lg shadow-green-500/25 flex items-center gap-2 border border-green-500/30"
            >
              <span>📥</span>
              Download Now
            </button>
            
            <div className="flex items-center gap-2 text-gray-300 bg-gray-800/50 px-4 py-2 rounded-xl border border-gray-700/50">
              <span>🔥</span>
              <span className="font-semibold">{expandedNote.downloads} downloads</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Semester counts
  const semesterCounts = useMemo(() => {
    const counts = {};
    notesData.forEach(note => {
      counts[note.semester] = (counts[note.semester] || 0) + 1;
    });
    return counts;
  }, []);

  // Filtered notes
  const filteredNotes = useMemo(() => {
    return notesData.filter(note => {
      const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           note.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSemester = selectedSemester === 'All' || note.semester === selectedSemester;
      const matchesDepartment = selectedDepartment === 'All' || note.department === selectedDepartment;
      return matchesSearch && matchesSemester && matchesDepartment;
    });
  }, [searchTerm, selectedSemester, selectedDepartment]);

  const semesters = ['All', '1.1', '1.2', '2.1', '2.2', '3.1', '3.2', '4.1', '4.2', 'Others'];
  const departments = ['All', 'CSE', 'EEE', 'BBA', 'Pharm', 'Civil', 'English', 'Law'];

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedSemester('All');
    setSelectedDepartment('All');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f23] via-[#1a1a2e] to-[#16213e]">
      <NavbarMain />

      {/* Modals */}
      <UploadModal />
      <NoteDetailModal />

      {/* Page Container */}
      <div className="max-w-7xl mx-auto px-3 md:px-6 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
          
          {/* Left Sidebar */}
          <aside className="hidden lg:block">
            <LeftSideBar />
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            
            {/* Header Section */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-white mb-3 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                📚 Study Materials 
              </h1>
              <p className="text-gray-300 text-lg mb-6">
                Discover and share academic resources with your peers
              </p>

              {/* Upload Button */}
              <button
                onClick={() => setShowUploadModal(true)}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:from-purple-500 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-purple-500/25 flex items-center gap-2 border border-purple-500/30"
              >
                <span>🚀</span>
                Upload New Note
              </button>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-[300px_1fr] gap-6">
              
              {/* Semester Filter Section */}
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-[#1E2130] to-[#181820] rounded-2xl p-6 border-2 border-purple-500/30 shadow-2xl shadow-purple-500/20">
                  <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                    <span>🎯</span>
                    Filter by Semester
                  </h3>
                  <div className="space-y-3">
                    {semesters.filter(sem => sem !== 'All').map((semester) => (
                      <div
                        key={semester}
                        onClick={() => setSelectedSemester(semester)}
                        className={`flex justify-between items-center p-4 rounded-xl cursor-pointer transition-all duration-300 border-2 shadow-lg ${
                          selectedSemester === semester 
                            ? 'scale-105 shadow-xl' 
                            : 'border-transparent hover:border-gray-600 hover:scale-102'
                        }`}
                        style={{
                          background: selectedSemester === semester 
                            ? semesterColors[semester].secondary
                            : 'rgba(255, 255, 255, 0.05)',
                          borderColor: selectedSemester === semester 
                            ? semesterColors[semester].primary
                            : 'transparent'
                        }}
                      >
                        <span className="text-white font-semibold text-sm flex items-center gap-2">
                          <span>📅</span>
                          Sem {semester}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-400 text-xs">Notes</span>
                          <span className="px-2 py-1 text-white text-xs font-bold rounded-lg min-w-8 text-center shadow-lg"
                                style={{ background: semesterColors[semester].gradient }}>
                            {semesterCounts[semester] || 0}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Notes Content Area */}
              <div className="space-y-6">
                
                {/* Filters Section */}
                <div className="bg-gradient-to-br from-[#1E2130] to-[#181820] rounded-2xl p-6 border-2 border-purple-500/30 shadow-2xl shadow-purple-500/20">
                  <div className="flex flex-col lg:flex-row gap-4 items-end">
                    
                    {/* Search Bar */}
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        placeholder="🔍 Search notes by title or description..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-[#1E2130] border-2 border-[#2A2D3A] rounded-xl px-4 py-3 pl-12 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all"
                      />
                      <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400 text-lg">
                        🔍
                      </span>
                    </div>

                    {/* Department Filter */}
                    <select
                      value={selectedDepartment}
                      onChange={(e) => setSelectedDepartment(e.target.value)}
                      className="bg-[#1E2130] border-2 border-[#2A2D3A] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all"
                    >
                      {departments.map(dept => (
                        <option key={dept} value={dept}>
                          {dept === 'All' ? '🏛️ All Departments' : dept}
                        </option>
                      ))}
                    </select>

                    {/* Reset Button */}
                    <button
                      onClick={clearFilters}
                      className="px-4 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl hover:from-gray-500 hover:to-gray-600 transition-all duration-200 border border-gray-500/30 shadow-lg"
                    >
                      🔄 Reset
                    </button>
                  </div>
                </div>

                {/* Notes Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredNotes.map((note, index) => {
                    const colors = semesterColors[note.semester];
                    const deptColors = departmentColors[note.department] || departmentColors['General'];
                    
                    return (
                      <div
                        key={note.id}
                        onClick={() => setExpandedNote(note)}
                        className="group relative rounded-2xl p-6 border-2 cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-float"
                        style={{ 
                          animationDelay: `${index * 0.1}s`,
                          background: `linear-gradient(135deg, ${colors.secondary}, rgba(30, 33, 48, 0.9))`,
                          borderColor: colors.primary,
                          boxShadow: `0 8px 32px ${colors.primary}30`
                        }}
                      >
                        
                        {/* Glow Effect */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600/0 via-pink-600/5 to-blue-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        {/* Header */}
                        <div className="relative flex items-start justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <span className="px-3 py-1 text-white text-xs font-bold rounded-full border shadow-lg"
                                  style={{ 
                                    background: colors.gradient,
                                    borderColor: colors.primary
                                  }}>
                              🎓 Sem {note.semester}
                            </span>
                            <span className="px-2 py-1 text-xs font-bold rounded-full border shadow-lg"
                                  style={{ 
                                    background: deptColors.secondary,
                                    borderColor: deptColors.primary,
                                    color: deptColors.primary
                                  }}>
                              🏛️ {note.department}
                            </span>
                          </div>
                          <div className="text-yellow-400 text-sm font-bold flex items-center gap-1 bg-yellow-500/20 px-2 py-1 rounded-lg border border-yellow-500/30">
                            ⭐ {note.rating}
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="relative text-white font-bold text-lg mb-3 leading-tight group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300">
                          {note.title}
                        </h3>

                        {/* Description */}
                        <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-2">
                          {note.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 mb-4">
                          {note.tags?.slice(0, 2).map((tag, idx) => (
                            <span key={idx} 
                                  className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded border border-blue-500/30 shadow">
                              #{tag}
                            </span>
                          ))}
                          {note.tags?.length > 2 && (
                            <span className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded border border-purple-500/30 shadow">
                              +{note.tags.length - 2}
                            </span>
                          )}
                        </div>

                        {/* Footer */}
                        <div className="relative flex items-center justify-between pt-4 border-t border-white/10">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
                              <span className="text-white text-xs font-bold">
                                {note.uploader.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <p className="text-white text-sm font-semibold">{note.uploader}</p>
                              <p className="text-gray-300 text-xs">📥 {note.downloads} downloads</p>
                            </div>
                          </div>
                          
                          <button className="px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-bold rounded-lg transform group-hover:scale-110 transition-all duration-200 shadow-lg shadow-purple-500/25 border border-purple-500/30">
                            👀 View
                          </button>
                        </div>

                        {/* Shine Effect */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                      </div>
                    );
                  })}
                </div>

                {/* Empty State */}
                {filteredNotes.length === 0 && (
                  <div className="text-center py-16">
                    <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center border-2 border-purple-500/30">
                      <span className="text-4xl">📚</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      No notes found
                    </h3>
                    <p className="text-gray-300 text-lg">Try adjusting your search or filters</p>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default NoteSharing;