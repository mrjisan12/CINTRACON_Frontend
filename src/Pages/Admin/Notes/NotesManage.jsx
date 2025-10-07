import React, { useState, useMemo } from 'react';

const NotesManage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('All');
  const [selectedDepartment, setSelectedDepartment] = useState('All');

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

  // Filtered notes
  const filteredNotes = useMemo(() => {
    return notesData.filter(note => {
      const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           note.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           note.id.toString().includes(searchTerm);
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
    <div className="min-h-screen bg-[#181820] p-6">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Notes Management</h1>
        <p className="text-gray-400 mb-6">
          Admin panel for managing all uploaded notes
        </p>
      </div>

      {/* Filters Section */}
      <div className="bg-[#1E2130] rounded-2xl p-6 border border-[#2A2D3A] mb-6">
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          
          {/* Search Bar */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by ID, title or description..."
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

      {/* Notes Table */}
      <div className="bg-[#1E2130] rounded-2xl border border-[#2A2D3A] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#2A2D3A] border-b border-[#3A3D4A]">
                <th className="px-6 py-4 text-left text-white font-semibold">ID</th>
                <th className="px-6 py-4 text-left text-white font-semibold">Title</th>
                <th className="px-6 py-4 text-left text-white font-semibold">Semester</th>
                <th className="px-6 py-4 text-left text-white font-semibold">Department</th>
                <th className="px-6 py-4 text-left text-white font-semibold">Uploader</th>
                <th className="px-6 py-4 text-left text-white font-semibold">Date</th>
                <th className="px-6 py-4 text-left text-white font-semibold">Downloads</th>
                <th className="px-6 py-4 text-left text-white font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredNotes.map((note) => (
                <tr 
                  key={note.id} 
                  className="border-b border-[#3A3D4A] hover:bg-[#2A2D3A] transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="text-purple-400 font-bold">{note.id}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-white font-medium">
                      {note.title}
                    </div>
                    <div className="text-gray-400 text-sm mt-1 line-clamp-1">
                      {note.description}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-white">{note.semester}</td>
                  <td className="px-6 py-4 text-white">{note.department}</td>
                  <td className="px-6 py-4 text-white">{note.uploader}</td>
                  <td className="px-6 py-4 text-gray-400">{note.date}</td>
                  <td className="px-6 py-4 text-white">{note.downloads}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="px-3 py-1 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 transition-colors">
                        View
                      </button>
                      <button className="px-3 py-1 bg-red-600 text-white text-xs rounded-lg hover:bg-red-700 transition-colors">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
      </div>
    </div>
  );
}

export default NotesManage;