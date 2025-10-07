import React, { useMemo, useState } from "react";
import LeftSideBar from "../../../Components/LeftSideBar";
import NavbarMain from "../../../Ui/NavbarMain";

const students = [
  { name: "Mizanur Rahman Jisan", avatar: "jisan.jpg", department: "CSE", semester: "3.2", section: "D", batch: "52", points: 925 },
  { name: "Shahid AL Mamim", avatar: "mamim.jpg", department: "EEE", semester: "2.1", section: "A", batch: "53", points: 870 },
  { name: "Nashra Zakir Nawmi", avatar: "nawmi.jpg", department: "BBA", semester: "1.2", section: "B", batch: "54", points: 790 },
  { name: "Alif Mahmud Talha", avatar: "alif.jpg", department: "CSE", semester: "3.1", section: "C", batch: "52", points: 910 },
  { name: "Lubna Akter", avatar: "lubna.jpg", department: "CSE", semester: "3.2", section: "D", batch: "52", points: 925 },
];

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

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return students.filter((s) => {
      const matchesName =
        !q ||
        s.name.toLowerCase().includes(q);
      const matchesDept = dept === "All" || s.department === dept;
      const matchesSem = sem === "All" || s.semester === sem;
      return matchesName && matchesDept && matchesSem;
    });
  }, [query, dept, sem]);

  const clearFilters = () => {
    setQuery("");
    setDept("All");
    setSem("All");
  };

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

            {/* cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 xl:gap-8">
              {filtered.map((student, idx) => (
                <div
                  key={idx}
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
                    <img src={student.avatar} alt={student.name} className="w-full h-full object-cover" />
                  </div>

                  {/* name */}
                  <h3 className="text-white font-semibold text-lg text-center group-hover:text-blue-400 transition">
                    {student.name}
                  </h3>

                  {/* meta */}
                  <p className="text-gray-400 text-sm text-center mt-1">
                    {student.department} | {student.semester} Semester
                  </p>
                  <p className="text-gray-400 text-sm text-center">
                    {student.section} Section | Batch {student.batch}
                  </p>

                  {/* points */}
                  <div className="flex items-center justify-center gap-2 mt-4">
                    <img src="/diamond.png" alt="diamond" className="w-6 h-6 object-contain" />
                    <span className="text-white font-bold text-lg">{student.points}</span>
                    <span className="text-gray-400 text-xs">Points</span>
                  </div>

                  {/* button */}
                  <button
                    className="mt-6 w-full rounded-full font-semibold py-2.5
                               bg-gradient-to-r from-blue-700 to-purple-700 text-white
                               hover:from-blue-600 hover:to-purple-800 shadow"
                  >
                    View Profile
                  </button>
                </div>
              ))}
            </div>

            {/* empty state */}
            {filtered.length === 0 && (
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