import React from 'react';

const IntroSidebar = () => (
  <aside className="bg-[#20222B] rounded-2xl shadow p-4 flex flex-col gap-6 min-w-[250px] max-w-[300px] mx-auto">
    <div className="text-white font-bold text-lg mb-2">Intro</div>
    <div className="text-gray-300 text-sm mb-4">এইটা আপনার ইনট্রো, নিজের সম্পর্কে তথ্য এখানে এডিট করতে পারবেন।</div>
    <ul className="text-gray-200 text-sm flex flex-col gap-2">
      <li><span className="font-semibold">Department:</span> CSE</li>
      <li><span className="font-semibold">Batch:</span> 52</li>
      <li><span className="font-semibold">Semester:</span> 3.2</li>
      <li><span className="font-semibold">Section:</span> D</li>
      <li><span className="font-semibold">Blood Group:</span> O+</li>
      <li><span className="font-semibold">Email:</span> 2210918@ug.cu.ac.bd</li>
      <li><span className="font-semibold">Phone:</span> 0179270364</li>
    </ul>
    <div className="mt-4">
      <div className="text-white font-semibold mb-1">Social Media</div>
      <div className="flex gap-3">
        <a href="#" className="text-blue-500 text-2xl"><i className="fab fa-facebook"></i></a>
        <a href="#" className="text-blue-400 text-2xl"><i className="fab fa-instagram"></i></a>
        <a href="#" className="text-blue-700 text-2xl"><i className="fab fa-linkedin"></i></a>
      </div>
    </div>
  </aside>
);

export default IntroSidebar;
