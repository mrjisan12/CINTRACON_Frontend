import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LeftSideBar from '../../../Components/LeftSideBar';
import NavbarMain from '../../../Ui/NavbarMain';
import { getAllNotes, getNoteDetail, createNote, increaseDownloadCount } from '../../../api/noteSharingApi';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const NoteSharing = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('All');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [expandedNote, setExpandedNote] = useState(null);
  const [notesData, setNotesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

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

  // Fetch notes from API
  const fetchNotes = async (page = 1, size = 10) => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('accessToken');
      
      const filters = {};
      if (selectedDepartment !== 'All') filters.department = selectedDepartment.toLowerCase();
      if (selectedSemester !== 'All') filters.semester = selectedSemester;
      if (searchTerm) filters.search = searchTerm;

      const response = await getAllNotes(page, size, filters, token);
      
      if (response.success) {
        if (page === 1) {
          setNotesData(response.data);
        } else {
          setNotesData(prev => [...prev, ...response.data]);
        }
        setHasMore(response.data.length === size);
        setCurrentPage(page);
      } else {
        toast.error('Failed to fetch notes');
      }
    } catch (error) {
      console.error('Error fetching notes:', error);
      toast.error('Error fetching notes');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch note details
  const fetchNoteDetail = async (noteId) => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await getNoteDetail(noteId, token);
      
      if (response.success) {
        setExpandedNote(response.data);
      } else {
        toast.error('Failed to fetch note details');
      }
    } catch (error) {
      console.error('Error fetching note details:', error);
      toast.error('Error fetching note details');
    }
  };

  // Load more notes
  const loadMoreNotes = () => {
    if (hasMore && !isLoading) {
      fetchNotes(currentPage + 1, 10);
    }
  };

  // Initial fetch and when filters change
  useEffect(() => {
    fetchNotes(1, 10);
  }, [searchTerm, selectedSemester, selectedDepartment]);

  // Upload Modal Component
  const UploadModal = () => {
    const [formData, setFormData] = useState({
      title: '',
      semester: '',
      department: '',
      description: '',
      section: '',
      drive_link: '',
      note_file: null
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

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
          note_file: file
        }));
      }
    };

   
    const handleSubmit = async (e) => {
      e.preventDefault();
      
      if (!formData.note_file && !formData.drive_link) {
        toast.error('Please upload a file or provide a drive link');
        return;
      }

      try {
        setIsSubmitting(true);
        const token = localStorage.getItem('accessToken');
        
        const submitData = new FormData();
        submitData.append('title', formData.title);
        submitData.append('semester', formData.semester);
        submitData.append('department', formData.department.toLowerCase());
        submitData.append('section', formData.section);
        submitData.append('description', formData.description);
        submitData.append('drive_link', formData.drive_link);
        if (formData.note_file) {
          submitData.append('note_file', formData.note_file);
        }

        // Debug: FormData content দেখুন
        console.log('FormData content:');
        for (let [key, value] of submitData.entries()) {
          console.log(key, value);
        }

        const response = await createNote(submitData, token);
        
        if (response.success) {
          toast.success('Note uploaded successfully!');
          setShowUploadModal(false);
          setFormData({
            title: '',
            semester: '',
            department: '',
            description: '',
            section: '',
            drive_link: '',
            note_file: null
          });
          fetchNotes(1, 10);
        } else {
          console.log('Upload failed response:', response);
          toast.error(response.msg || 'Failed to upload note');
        }
      } catch (error) {
        console.error('Full error object:', error);
        console.error('Error response data:', error.response?.data);
        
        // Specific validation errors দেখুন
        if (error.response?.data?.data) {
          const validationErrors = error.response.data.data;
          console.log('Validation errors:', validationErrors);
          
          let errorMessage = 'Validation errors: ';
          Object.keys(validationErrors).forEach(key => {
            errorMessage += `${key}: ${validationErrors[key]}. `;
          });
          toast.error(errorMessage);
        } else {
          toast.error(error.response?.data?.msg || 'Error uploading note');
        }
      } finally {
        setIsSubmitting(false);
      }
    };



    const handleClose = () => {
      setShowUploadModal(false);
      setFormData({
        title: '',
        semester: '',
        department: '',
        description: '',
        section: '',
        drive_link: '',
        note_file: null
      });
    };

    if (!showUploadModal) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm ">
        <div className="relative w-full max-w-2xl bg-gradient-to-br from-[#1E2130] to-[#181820] rounded-3xl border-2 border-purple-500/50 shadow-2xl shadow-purple-500/30 ">
          
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
                <label className="block text-white font-semibold mb-2">Note Title *</label>
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
                  <label className="block text-white font-semibold mb-2">Semester *</label>
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
                  <label className="block text-white font-semibold mb-2">Department *</label>
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

              {/* Section */}
              <div>
                <label className="block text-white font-semibold mb-2">Section</label>
                <input
                  type="text"
                  name="section"
                  value={formData.section}
                  onChange={handleInputChange}
                  placeholder="e.g., A, B, C"
                  className="w-full bg-[#1E2130] border-2 border-[#2A2D3A] rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all"
                />
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

              {/* Drive Link */}
              <div>
                <label className="block text-white font-semibold mb-2">Google Drive Link</label>
                <input
                  type="url"
                  name="drive_link"
                  value={formData.drive_link}
                  onChange={handleInputChange}
                  placeholder="https://drive.google.com/..."
                  className="w-full bg-[#1E2130] border-2 border-[#2A2D3A] rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all"
                />
              </div>

              {/* File Upload */}
              {/* <div>
                <label className="block text-white font-semibold mb-2">Upload File</label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.txt"
                  className="w-full bg-[#1E2130] border-2 border-[#2A2D3A] rounded-xl px-4 py-3 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-purple-600 file:to-pink-600 file:text-white hover:file:from-purple-500 hover:file:to-pink-700"
                />
                <p className="text-gray-400 text-sm mt-1">Upload a file OR provide a Google Drive link</p>
              </div> */}


            </form>
          </div>

          {/* Modal Footer */}
          <div className="p-6 border-t border-purple-500/30 flex justify-end gap-3">
            <button
              onClick={handleClose}
              disabled={isSubmitting}
              className="px-6 py-2 bg-[#2A2D3A] text-white font-medium rounded-xl hover:bg-[#3A3D4A] transition-all duration-200 border border-[#3A3D4A] disabled:opacity-50"
            >
              Cancel
            </button>
            
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-xl hover:from-purple-500 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-lg shadow-purple-500/25 border border-purple-500/30 flex items-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Uploading...
                </>
              ) : (
                'Upload Note'
              )}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Note Detail Modal
  const NoteDetailModal = () => {
    const [isDownloading, setIsDownloading] = useState(false);

    const handleCloseModal = () => {
      setExpandedNote(null);
    };

    const handleDownload = async () => {
      if (!expandedNote) return;

      try {
        setIsDownloading(true);
        const token = localStorage.getItem('accessToken');
        
        // Increase download count
        await increaseDownloadCount(expandedNote.id, token);
        
        // Download the file
        const downloadUrl = expandedNote.note_file || expandedNote.drive_link;
        if (downloadUrl) {
          const link = document.createElement('a');
          link.href = downloadUrl;
          link.setAttribute('download', `${expandedNote.title}.pdf`);
          link.setAttribute('target', '_blank');
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
        
        // Update local state to reflect new download count
        setExpandedNote(prev => ({
          ...prev,
          total_downloads: prev.total_downloads + 1
        }));
        
        // Update the note in the list
        setNotesData(prev => prev.map(note => 
          note.id === expandedNote.id 
            ? { ...note, total_downloads: note.total_downloads + 1 }
            : note
        ));

        toast.success('Download started!');
      } catch (error) {
        console.error('Error downloading note:', error);
        toast.error('Error downloading note');
      } finally {
        setIsDownloading(false);
      }
    };

    const handleDriveLink = async () => {

       if (!expandedNote) return;

      try {
        setIsDownloading(true);
        const token = localStorage.getItem('accessToken');
        
        // Increase download count
        await increaseDownloadCount(expandedNote.id, token);

        if (expandedNote?.drive_link) {
        window.open(expandedNote.drive_link, '_blank');
      }
        
        // Update local state to reflect new download count
        setExpandedNote(prev => ({
          ...prev,
          total_downloads: prev.total_downloads + 1
        }));
        
        // Update the note in the list
        setNotesData(prev => prev.map(note => 
          note.id === expandedNote.id 
            ? { ...note, total_downloads: note.total_downloads + 1 }
            : note
        ));

        toast.success('1 Views Counted!');
      } catch (error) {
        console.error('Error Counting View:', error);
        toast.error('Error Counting View');
      } finally {
        setIsDownloading(false);
      }
      
    };

    if (!expandedNote) return null;

    const borderColor = semesterColors[expandedNote.semester] || semesterColors['Others'];

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        <div className="relative w-full max-w-4xl bg-gradient-to-br from-[#1E2130] to-[#181820] rounded-3xl border-2 border-purple-500/50 shadow-2xl shadow-purple-500/30">
          
          {/* Header */}
          <div className="relative p-6 border-b border-purple-500/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 text-white text-sm font-bold rounded-full border shadow-lg"
                      style={{ borderColor: borderColor }}>
                  Sem {expandedNote.semester}
                </span>
                <span className="px-3 py-1 text-white text-sm font-bold rounded-full border border-gray-500 shadow-lg">
                  {expandedNote.department?.toUpperCase()}
                </span>
                {expandedNote.section && (
                  <span className="px-3 py-1 text-white text-sm font-bold rounded-full border border-gray-500 shadow-lg">
                    Section {expandedNote.section}
                  </span>
                )}
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
              <Link 
                to={`/user-profile/${expandedNote.user?.id}`}
                className="flex items-center gap-2 group cursor-pointer hover:opacity-80 transition-opacity duration-200"
              >
                <img 
                  src={expandedNote.user?.profile_photo || '/default-avatar.png'} 
                  alt={expandedNote.user?.full_name}
                  className="w-8 h-8 rounded-full border-2 border-purple-500 group-hover:border-purple-300 transition-all duration-200"
                />
                <span className="text-gray-300 font-semibold group-hover:text-purple-300 group-hover:underline transition-all duration-200">
                  {expandedNote.user?.full_name}
                </span>
              </Link>
              <span className="text-gray-500">•</span>
              <span className="text-gray-300">{new Date(expandedNote.uploaded_at).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 max-h-96 overflow-y-auto">
            <div className="mb-6">
              <h3 className="text-white font-semibold mb-2 text-lg">Description</h3>
              <p className="text-gray-300 leading-relaxed bg-gray-800/30 p-4 rounded-xl border border-gray-700/50">
                {expandedNote.description || 'No description provided.'}
              </p>
            </div>

            {/* Stats */}
            <div className="p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20 shadow-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">
                  {expandedNote.total_downloads} Views
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-purple-500/30 flex justify-end items-center">
            
            {/* Backup Code */}

            {/* {expandedNote.note_file && (
              <button
                onClick={handleDownload}
                disabled={isDownloading}
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl hover:from-green-400 hover:to-emerald-500 transform hover:scale-105 transition-all duration-200 shadow-lg shadow-green-500/25 border border-green-500/30 disabled:opacity-50 flex items-center gap-2"
              >
                {isDownloading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Opening...
                  </>
                ) : (
                  'Open Drive Link'
                )}
              </button>
            )} */}
            
            {/* {expandedNote.drive_link && (
              <button
                onClick={handleDriveLink}
                className="px-6 py-3 bg-gradient-to-r  from-green-500 to-emerald-600 text-white font-bold rounded-xl hover:from-blue-400 hover:to-violet-500 transform hover:scale-105 transition-all duration-200 shadow-lg shadow-blue-500/25 border border-blue-500/30"
              >
                Open Drive Link
              </button>
            )} */}


            {expandedNote.drive_link && (
              <button
                onClick={handleDriveLink}
                disabled={isDownloading}
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl hover:from-green-400 hover:to-emerald-500 transform hover:scale-105 transition-all duration-200 shadow-lg shadow-green-500/25 border border-green-500/30 disabled:opacity-50 flex items-center gap-2"
              >
                {isDownloading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Opening...
                  </>
                ) : (
                  'Open Drive Link'
                )}
              </button>
            )}


          </div>
        </div>
      </div>
    );
  };

  // Filtered notes
  const filteredNotes = useMemo(() => {
    return notesData.filter(note => {
      const matchesSearch = searchTerm === '' || 
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (note.description && note.description.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesSemester = selectedSemester === 'All' || note.semester === selectedSemester;
      const matchesDepartment = selectedDepartment === 'All' || note.department === selectedDepartment.toLowerCase();
      return matchesSearch && matchesSemester && matchesDepartment;
    });
  }, [notesData, searchTerm, selectedSemester, selectedDepartment]);

  const semesters = ['All', '1.1', '1.2', '2.1', '2.2', '3.1', '3.2', '4.1', '4.2'];
  const departments = ['All', 'CSE', 'EEE', 'BBA', 'Pharm', 'Civil', 'English', 'Law'];

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedSemester('All');
    setSelectedDepartment('All');
  };

  const handleNoteClick = (note) => {
    fetchNoteDetail(note.id);
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
            
            {/* Header Section with Upload Button on Right */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
              {/* Page Title on Left */}
              <div className="mb-4 lg:mb-0">
                <h1 className="text-3xl font-bold text-white">Study Materials</h1>
                <p className="text-gray-400">
                  Discover and share academic resources
                </p>
              </div>

              {/* Upload Button - Smaller on Right */}
              <button
                onClick={() => setShowUploadModal(true)}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-500 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-purple-500/25 border border-purple-500/30 flex items-center gap-2 text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Upload Note
              </button>
            </div>

            {/* Slim Filters Section */}
            <div className="bg-[#1E2130] rounded-xl p-4 border border-[#2A2D3A] mb-6">
              <div className="flex flex-col lg:flex-row gap-3 items-center">
                
                {/* Search Bar - Slim */}
                <div className="flex-1 w-full">
                  <input
                    type="text"
                    placeholder="Search notes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-[#1E2130] border border-[#2A2D3A] rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/30 transition-all text-sm"
                  />
                </div>

                {/* Department Filter - Slim */}
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="w-full lg:w-32 bg-[#1E2130] border border-[#2A2D3A] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/30 transition-all text-sm"
                >
                  {departments.map(dept => (
                    <option key={dept} value={dept}>
                      {dept === 'All' ? 'All Depts' : dept}
                    </option>
                  ))}
                </select>

                {/* Semester Filter - Slim */}
                <select
                  value={selectedSemester}
                  onChange={(e) => setSelectedSemester(e.target.value)}
                  className="w-full lg:w-32 bg-[#1E2130] border border-[#2A2D3A] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/30 transition-all text-sm"
                >
                  {semesters.map(sem => (
                    <option key={sem} value={sem}>
                      {sem === 'All' ? 'All Sem' : `Sem ${sem}`}
                    </option>
                  ))}
                </select>

                {/* Reset Button - Slim */}
                <button
                  onClick={clearFilters}
                  className="w-full lg:w-auto px-3 py-2 bg-[#2A2D3A] text-white rounded-lg hover:bg-[#3A3D4A] transition-all duration-200 border border-[#3A3D4A] text-sm font-medium"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Loading State */}
            {isLoading && notesData.length === 0 && (
              <div className="flex justify-center items-center py-20">
                <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}

            {/* Notes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredNotes.map((note) => {
                const borderColor = semesterColors[note.semester] || semesterColors['Others'];
                
                return (
                  <div
                    key={note.id}
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
                            {note.department?.toUpperCase()}
                          </span>
                          <span className="px-2 py-1 text-white text-xs font-bold rounded-full border border-gray-500">
                            {note.section?.toUpperCase()}
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
                        {note.description || 'No description available.'}
                      </p>

                      {/* Stats */}
                      <div className="bg-white/5 rounded-lg p-3 mb-4 border-l-4" style={{ borderColor: borderColor }}>
                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Total Views</p>
                        <p className="text-2xl font-bold text-white">{note.total_downloads}</p>
                      </div>

                      {/* Footer */}
                      <div className="flex justify-between items-center text-sm text-gray-400">
                        <Link 
                          to={`/user-profile/${note.user?.id}`}
                          className="flex items-center gap-2 group cursor-pointer hover:opacity-80 transition-opacity duration-200"
                        >
                          {/* Profile Photo Circle */}
                          <div className="w-6 h-6 rounded-full overflow-hidden border border-blue-500">
                            <img 
                              src={note.user?.profile_photo || '/default-avatar.png'} 
                              alt={note.user?.full_name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="text-white font-semibold hover:underline">
                            {note.user?.full_name}
                          </span>
                        </Link>
                        <button 
                          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-bold rounded-lg hover:from-purple-500 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-lg border border-purple-500/30"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleNoteClick(note);
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

            {/* Load More Button */}
            {hasMore && filteredNotes.length > 0 && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={loadMoreNotes}
                  disabled={isLoading}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-500 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Loading...' : 'Load More Notes'}
                </button>
              </div>
            )}

            {/* Empty State */}
            {!isLoading && filteredNotes.length === 0 && (
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