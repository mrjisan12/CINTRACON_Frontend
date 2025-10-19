import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LeftSideBar from "../../../Components/LeftSideBar";
import NavbarMain from "../../../Ui/NavbarMain";
import { getAllStudentsInfo } from "../../../api/allStudentsApi"; 

// filter options
const DEPARTMENTS = ["All", "CSE", "EEE", "BBA", "Pharm", "Civil", "English", "Law"];
const SEMESTERS = ["All", "1.1", "1.2", "2.1", "2.2", "3.1", "3.2", "4.1", "4.2"];

// Different colors for each card border
const cardColors = [
  "#8B5CF6", // Purple
  "#06B6D4", // Cyan
  "#10B981", // Emerald
  "#F59E0B", // Amber
  "#EF4444", // Red
  "#EC4899", // Pink
];

const AllStudentsPage = () => {
  const [query, setQuery] = useState("");
  const [dept, setDept] = useState("All");
  const [sem, setSem] = useState("All");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // API থেকে students ডেটা fetch করা
  const fetchStudents = async (searchQuery = "", department = "All", semester = "All") => {
    try {
      setLoading(true);
      setError(null);
      
      const token = localStorage.getItem("accessToken");
      
      if (!token) {
        setError("Please login to view students");
        setLoading(false);
        return;
      }

      // Prepare filters for API
      const filters = {
        page: 1,
        size: 50, // You can adjust this as needed
        search: searchQuery,
        department: department === "All" ? "" : department.toLowerCase(),
        semester: semester === "All" ? "" : semester
      };

      const response = await getAllStudentsInfo(token, filters);
      console.log("Fetched students data:", response.data);
      
      if (response.data.success) {
        setStudents(response.data.data);
      } else {
        setError("Failed to fetch students");
      }
    } catch (err) {
      setError("Error fetching students data");
      console.error("Error fetching students:", err);
    } finally {
      setLoading(false);
    }
  };

  // Initial load and when filters change
  useEffect(() => {
    // Debounce search to avoid too many API calls
    const timeoutId = setTimeout(() => {
      fetchStudents(query, dept, sem);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [query, dept, sem]);

  // Filtering logic (now handled by API, but keeping for any client-side filtering if needed)
  const filtered = useMemo(() => {
    // Since we're filtering via API, we can just return all students
    // But keeping this for any additional client-side filtering if needed
    return students;
  }, [students]);

  const clearFilters = () => {
    setQuery("");
    setDept("All");
    setSem("All");
  };

  // Handle view profile button click
  const handleViewProfile = (studentId) => {
    navigate(`/user-profile/${studentId}`);
  };

  // Loading state
  if (loading && students.length === 0) {
    return (
      <div className="min-h-screen bg-[#181820]">
        <NavbarMain />
        <div className="max-w-7xl mx-auto px-3 md:px-6 pt-6">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
            <aside className="hidden lg:block">
              <LeftSideBar />
            </aside>
            <main className="flex-1 flex justify-center items-center h-64">
              <div className="text-white text-lg">Loading students...</div>
            </main>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error && students.length === 0) {
    return (
      <div className="min-h-screen bg-[#181820]">
        <NavbarMain />
        <div className="max-w-7xl mx-auto px-3 md:px-6 pt-6">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
            <aside className="hidden lg:block">
              <LeftSideBar />
            </aside>
            <main className="flex-1 flex justify-center items-center h-64">
              <div className="text-red-400 text-lg">{error}</div>
              <button 
                onClick={() => fetchStudents(query, dept, sem)}
                className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Retry
              </button>
            </main>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#181820]">
      <NavbarMain />

      {/* page container */}
      <div className="max-w-7xl mx-auto px-3 md:px-6 pt-6">
        {/* layout: fixed left sidebar + fluid content */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
          {/* Left Sidebar (fixed width on lg+) */}
          <aside className="hidden lg:block">
            <LeftSideBar />
          </aside>

          {/* Main Content (uses all remaining width) */}
          <main className="flex-1">
            {/* header + toolbar */}
            <div className="mb-6 flex flex-col gap-4 sm:gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white mb-1">All Students</h1>
                <p className="text-gray-400">Connect and build your network</p>
              </div>

              {/* toolbar */}
              <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-3 sm:items-center">
                {/* search */}
                <div className="relative sm:w-64">
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search by name…"
                    className="w-full rounded-xl bg-[#1E2130] text-white placeholder-gray-400 border border-[#2A2D3A] px-10 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  <svg
                    className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-4.35-4.35M10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z" />
                  </svg>
                </div>

                {/* department filter */}
                <select
                  value={dept}
                  onChange={(e) => setDept(e.target.value)}
                  className="sm:w-44 rounded-xl bg-[#1E2130] text-white border border-[#2A2D3A] px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  title="Filter by department"
                >
                  {DEPARTMENTS.map((d) => (
                    <option key={d} value={d}>{d === "All" ? "All Departments" : d}</option>
                  ))}
                </select>

                {/* semester filter */}
                <select
                  value={sem}
                  onChange={(e) => setSem(e.target.value)}
                  className="sm:w-36 rounded-xl bg-[#1E2130] text-white border border-[#2A2D3A] px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  title="Filter by semester"
                >
                  {SEMESTERS.map((s) => (
                    <option key={s} value={s}>{s === "All" ? "All Semesters" : s}</option>
                  ))}
                </select>

                {/* clear */}
                <button
                  onClick={clearFilters}
                  className="rounded-xl border border-[#2A2D3A] text-gray-200 px-4 py-2.5 hover:bg-[#23283a] transition"
                  title="Clear all filters"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Loading indicator when filtering */}
            {loading && students.length > 0 && (
              <div className="text-center text-blue-400 mb-4">
                Updating results...
              </div>
            )}

            {/* Error message when filtering with existing data */}
            {error && students.length > 0 && (
              <div className="text-center text-red-400 mb-4">
                {error}
                <button 
                  onClick={() => fetchStudents(query, dept, sem)}
                  className="ml-2 text-blue-400 hover:text-blue-300 underline"
                >
                  Retry
                </button>
              </div>
            )}

            {/* cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 xl:gap-8">
              {filtered.map((student, idx) => (
                <div
                  key={student.id}
                  className="group h-full w-full rounded-3xl p-6 xl:p-7 bg-gradient-to-b from-[#20222B] to-[#1b1d25] ring-1 ring-[#2A2D3A] shadow-sm
                             hover:shadow-xl hover:ring-[#3a3f51] transition relative overflow-hidden"
                  style={{
                    border: `2px solid ${cardColors[idx % cardColors.length]}`,
                  }}
                >
                  {/* top gradient bar */}
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-1 opacity-0 group-hover:opacity-100 transition bg-gradient-to-r from-blue-600 to-purple-600" />

                  {/* avatar */}
                  <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-[#232A36] shadow mb-4">
                    <img 
                      src={student.profile_photo || "/default-avatar.png"} 
                      alt={student.full_name} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "/default-avatar.png";
                      }}
                    />
                  </div>

                  {/* name */}
                  <h3 className="text-white font-semibold text-lg text-center group-hover:text-blue-400 transition">
                    {student.full_name}
                  </h3>

                  {/* meta */}
                  <p className="text-gray-400 text-sm text-center mt-1">
                    {student.department.toUpperCase()} | {student.semester} Semester
                  </p>
                  <p className="text-gray-400 text-sm text-center">
                    {student.section} Section | Batch {student.batch_no}
                  </p>

                  {/* points */}
                  <div className="flex items-center justify-center gap-2 mt-4">
                    <img src="/diamond.png" alt="diamond" className="w-6 h-6 object-contain" />
                    <span className="text-white font-bold text-lg">{student.points}</span>
                    <span className="text-gray-400 text-xs">Points</span>
                  </div>

                  {/* button */}
                  <button
                    onClick={() => handleViewProfile(student.id)}
                    className="mt-6 w-full rounded-full font-semibold py-2.5
                               bg-gradient-to-r from-blue-700 to-purple-700 text-white
                               hover:from-blue-600 hover:to-purple-800 shadow transition"
                  >
                    View Profile
                  </button>
                </div>
              ))}
            </div>

            {/* empty state */}
            {filtered.length === 0 && !loading && (
              <div className="mt-10 text-center text-gray-400">
                No students found for the current filters.
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AllStudentsPage;