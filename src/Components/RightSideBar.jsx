import React from 'react';

const topMembers = [
  {
    name: 'Miznur Rahman Jisan',
    score: 925,
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    name: 'Shahid Al Mamin',
    score: 900,
    avatar: 'mamim.jpg',
  },
  {
    name: 'Nashrah Zakir Nawmi',
    score: 875,
    avatar: 'nawmi.jpg',
  },
  {
    name: 'Lamia Akter Jesmin',
    score: 850,
    avatar: 'jesmin.jpeg',
  },
  {
    name: 'Alif Mahmud Talha',
    score: 825,
    avatar: 'alif.jpg',
  },
  {
    name: 'Lubna Akter',
    score: 800,
    avatar: 'lubna.jpg',
  },
  {
    name: 'Nishat Anjum',
    score: 775,
    avatar: 'nishat.jpg',
  },
  {
    name: 'Hridita Ridi',
    score: 750,
    avatar: 'ridi.jpg',
  },
  {
    name: 'Sharmin Sultana Annie',
    score: 700,
    avatar: 'anni.jpg',
  },
  {
    name: 'Mark Zukerburg',
    score: 500,
    avatar: 'https://randomuser.me/api/portraits/men/36.jpg',
  },
];

const RightSideBar = () => {
  return (
    <aside className="bg-[#20222B] rounded-2xl shadow p-4 mb-6 flex flex-col gap-8 sticky top-20 min-h-[600px] w-full max-w-[300px] mx-auto">
      {/* Active Stat */}
      <div className="bg-[#23242C] rounded-xl px-4 py-4 mb-2 flex flex-col items-center">
        <div className="flex items-center w-full mb-1">
          <span className="block h-3 w-3 rounded-full bg-green-400 mr-2"></span>
          <span className="text-white text-base font-medium">Active</span>
        </div>
        {/* Chart SVG */}
        <svg width="180" height="48" viewBox="0 0 180 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 40 Q 20 10 40 30 T 80 25 T 120 40 T 160 20 T 180 40 V48 H0Z" fill="#3DDC97" fillOpacity="0.7" />
        </svg>
        <span className="text-white text-6xl font-bold -mt-4">120</span>
      </div>
      {/* Top Active Members */}
      <div>
        <div className="text-gray-200 font-semibold text-base mb-0">Top Active Members</div>
        <div className="text-xs text-gray-400 mb-3">Last - 7 Days</div>
        <ul className="flex flex-col gap-2">
          {topMembers.map((m, idx) => (
            <li key={idx} className="flex items-center gap-3 text-gray-100 text-base">
              <img src={m.avatar} alt={m.name} className="h-8 w-8 rounded-full object-cover" />
              <span className="flex-1 font-medium">{m.name}</span>
              <span className="flex items-center gap-1 font-bold text-base">
                <img src="/diamond.png" alt="Diamond" className="h-5 w-5 object-contain inline-block" />
                {m.score}
              </span>
            </li>
          ))}
        </ul>
      </div>

    </aside>
  );
};

export default RightSideBar;