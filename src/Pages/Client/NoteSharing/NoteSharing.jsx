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

  // Semester colors matching your theme
  const semesterColors = {
    '1.1': '#8B5CF6',
    '1.2': '#06B6D4', 
    '2.1': '#10B981',
    '2.2': '#F59E0B',
    '3.1': '#EF4444',
    '3.2': '#EC4899',
    '4.1': '#8B5CF6',
    '4.2': '#06B6D4',
    'Others': '#10B981'
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
      description: "Complete guide to data structures including arrays, linked lists, trees, and graphs with implementation examples.",
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
      description: "Fundamental calculus concepts with solved examples and practice problems.",
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
      description: "Comprehensive OOP concepts with Java and C++ implementation examples.",
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
      description: "SQL, normalization, and database design principles with real-world examples.",
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
      description: "OSI model, TCP/IP protocols, and network security fundamentals.",
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
      description: "Introduction to ML algorithms, neural networks, and practical implementations.",
    }
  ];

  // Upload Modal Component
  const UploadModal = () => {
    const [formData, setFormData] = useState({
      title: '',
      semester: '',
      department: '',
      description: '',
      file: null
    });

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
      console.log('Uploading note:', formData);
      setShowUploadModal(false);
      setFormData({
        title: '',
        semester: '',
        department: '',
        description: '',
        file: null
      });
    };

    const handleClose = () => {
      setShowUploadModal(false);
      setFormData({
        title: '',
        semester: '',
        department: '',
        description: '',
        file: null
      });
    };

    if (!showUploadModal) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        <div className="relative w-full max-w-2xl bg-gradient-to-br from-[#1E2130] to-[#181820] rounded-3xl border-2 border-purple-500/50 shadow-2xl shadow-purple-500/30">
          
          {/* Modal Header */}
          <div className="relative p-6 border-b border-purple-500/30">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">
                Upload New Note
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
                <label className="block text-white font-semibold mb-2">Note Title</label>
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
                  <label className="block text-white font-semibold mb-2">Semester</label>
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
                  </select>
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">Department</label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-[#1E2130] border-2 border-[#2A2D3A] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all"
                  >
                    <option value="">Select Department</option>
                    <option value="CSE">CSE</option>
                    <option value="EEE">EEE</option>
                    <option value="BBA">BBA</option>
                    <option value="Pharm">Pharm</option>
                    <option value="Civil">Civil</option>
                    <option value="English">English</option>
                    <option value="Law">Law</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-white font-semibold mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="Brief description of the note content"
                  className="w-full bg-[#1E2130] border-2 border-[#2A2D3A] rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all resize-vertical"
                />
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-white font-semibold mb-2">Upload File</label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.txt"
                  required
                  className="w-full bg-[#1E2130] border-2 border-[#2A2D3A] rounded-xl px-4 py-3 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-purple-600 file:to-pink-600 file:text-white hover:file:from-purple-500 hover:file:to-pink-700"
                />
              </div>
            </form>
          </div>

          {/* Modal Footer */}
          <div className="p-6 border-t border-purple-500/30 flex justify-end gap-3">
            <button
              onClick={handleClose}
              className="px-6 py-2 bg-[#2A2D3A] text-white font-medium rounded-xl hover:bg-[#3A3D4A] transition-all duration-200 border border-[#3A3D4A]"
            >
              Cancel
            </button>
            
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-xl hover:from-purple-500 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-lg shadow-purple-500/25 border border-purple-500/30"
            >
              Upload Note
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Note Detail Modal
  const NoteDetailModal = () => {
    if (!expandedNote) return null;

    const handleCloseModal = () => {
      setExpandedNote(null);
    };

    const handleDownload = () => {
      console.log('Downloading:', expandedNote.title);
    };

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        <div className="relative w-full max-w-4xl bg-gradient-to-br from-[#1E2130] to-[#181820] rounded-3xl border-2 border-purple-500/50 shadow-2xl shadow-purple-500/30">
          
          {/* Header */}
          <div className="relative p-6 border-b border-purple-500/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 text-white text-sm font-bold rounded-full border shadow-lg"
                      style={{ 
                        borderColor: semesterColors[expandedNote.semester]
                      }}>
                  Sem {expandedNote.semester}
                </span>
                <span className="px-3 py-1 text-white text-sm font-bold rounded-full border border-gray-500 shadow-lg">
                  {expandedNote.department}
                </span>
              </div>
              <button
                onClick={handleCloseModal}
                className="w-8 h-8 flex items-center justify-center bg-red-500/30 text-red-400 rounded-full hover:bg-red-500/50 transition-colors duration-200 border border-red-500/30"
              >
                ✕
              </button>
            </div>
            
            <h2 className="text-2xl font-bold text-white mt-4">
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
              <span className="text-gray-300">{new Date(expandedNote.date).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 max-h-96 overflow-y-auto">
            <div className="mb-6">
              <h3 className="text-white font-semibold mb-2 text-lg">Description</h3>
              <p className="text-gray-300 leading-relaxed bg-gray-800/30 p-4 rounded-xl border border-gray-700/50">
                {expandedNote.description}
              </p>
            </div>

            {/* Stats - Simplified */}
            <div className="p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20 shadow-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">
                  {expandedNote.downloads} Downloads
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-purple-500/30 flex justify-between items-center">
            <button
              onClick={handleDownload}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl hover:from-green-400 hover:to-emerald-500 transform hover:scale-105 transition-all duration-200 shadow-lg shadow-green-500/25 border border-green-500/30"
            >
              Download Now
            </button>
            
            <div className="text-gray-300 bg-gray-800/50 px-4 py-2 rounded-xl border border-gray-700/50">
              {expandedNote.downloads} downloads
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

  const semesters = ['All', '1.1', '1.2', '2.1', '2.2', '3.1', '3.2', '4.1', '4.2'];
  const departments = ['All', 'CSE', 'EEE', 'BBA', 'Pharm', 'Civil', 'English', 'Law'];

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedSemester('All');
    setSelectedDepartment('All');
  };

  return (
    <div className="min-h-screen bg-[#181820]">
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
              <h1 className="text-3xl font-bold text-white mb-2">Study Materials</h1>
              <p className="text-gray-400 mb-6">
                Discover and share academic resources
              </p>

              {/* Upload Button */}
              <button
                onClick={() => setShowUploadModal(true)}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:from-purple-500 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-purple-500/25 border border-purple-500/30"
              >
                Upload New Note
              </button>
            </div>

            {/* Filters Section */}
            <div className="bg-[#1E2130] rounded-2xl p-6 border border-[#2A2D3A] mb-6">
              <div className="flex flex-col lg:flex-row gap-4 items-center">
                
                {/* Search Bar */}
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search notes by title or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-[#1E2130] border-2 border-[#2A2D3A] rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all"
                  />
                </div>

                {/* Department Filter */}
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="w-full lg:w-48 bg-[#1E2130] border-2 border-[#2A2D3A] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all"
                >
                  {departments.map(dept => (
                    <option key={dept} value={dept}>
                      {dept === 'All' ? 'All Departments' : dept}
                    </option>
                  ))}
                </select>

                {/* Semester Filter */}
                <select
                  value={selectedSemester}
                  onChange={(e) => setSelectedSemester(e.target.value)}
                  className="w-full lg:w-48 bg-[#1E2130] border-2 border-[#2A2D3A] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all"
                >
                  {semesters.map(sem => (
                    <option key={sem} value={sem}>
                      {sem === 'All' ? 'All Semesters' : `Sem ${sem}`}
                    </option>
                  ))}
                </select>

                {/* Reset Button */}
                <button
                  onClick={clearFilters}
                  className="w-full lg:w-auto px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl hover:from-gray-500 hover:to-gray-600 transition-all duration-200 border border-gray-500/30 shadow-lg"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Notes Grid with SIMPLIFIED Card Design */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredNotes.map((note) => {
                const borderColor = semesterColors[note.semester];
                
                return (
                  <div
                    key={note.id}
                    onClick={() => setExpandedNote(note)}
                    className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
                  >
                    <div 
                      className="relative h-auto bg-gradient-to-br from-[#1E2130] to-[#181820] border-2 rounded-xl p-6 shadow-2xl backdrop-blur-sm flex flex-col"
                      style={{ borderColor: borderColor }}
                    >
                      {/* Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: borderColor }}></div>
                          <span 
                            className="px-3 py-1 text-white text-xs font-bold rounded-full border"
                            style={{ borderColor: borderColor }}
                          >
                            Sem {note.semester}
                          </span>
                          <span className="px-2 py-1 text-white text-xs font-bold rounded-full border border-gray-500">
                            {note.department}
                          </span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-white font-bold text-lg mb-3 leading-tight overflow-hidden"
                          style={{ 
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical'
                          }}>
                        {note.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-400 text-sm leading-relaxed mb-4 overflow-hidden flex-grow"
                         style={{ 
                           display: '-webkit-box',
                           WebkitLineClamp: 2,
                           WebkitBoxOrient: 'vertical'
                         }}>
                        {note.description}
                      </p>

                      {/* Stats */}
                      <div className="bg-white/5 rounded-lg p-3 mb-4 border-l-4" style={{ borderColor: borderColor }}>
                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Downloads</p>
                        <p className="text-2xl font-bold text-white">{note.downloads}</p>
                      </div>

                      {/* Footer */}
                      <div className="flex justify-between items-center text-sm text-gray-400">
                        <span className="text-white font-semibold">{note.uploader}</span>
                        <button 
                          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-bold rounded-lg hover:from-purple-500 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-lg border border-purple-500/30"
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpandedNote(note);
                          }}
                        >
                          View
                        </button>
                      </div>

                      {/* Left border accent */}
                      <div className="absolute inset-y-0 left-0 w-2 rounded-l-xl" style={{ backgroundColor: borderColor }}></div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Empty State */}
            {filteredNotes.length === 0 && (
              <div className="text-center py-16">
                <h3 className="text-2xl font-bold text-white mb-3">
                  No notes found
                </h3>
                <p className="text-gray-400">Try adjusting your search or filters</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default NoteSharing;
