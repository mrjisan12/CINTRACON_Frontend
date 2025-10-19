import React, { useState } from 'react';
import NavbarMain from '../../../Ui/NavbarMain';
import LeftSideBar from '../../../Components/LeftSideBar';
import RightSideBar from '../../../Components/RightSideBar';
import CreatePost from './CreatePost';

import NewsFeed from './NewsFeed';

const HomePage = () => {

 const [refreshKey, setRefreshKey] = useState(0);

  const handlePostCreated = () => {
    // This will trigger NewsFeed to refresh and show the new post at the top
    setRefreshKey(prev => prev + 1);
  };


  return (
    <div className="min-h-screen bg-[#181820]" >
      <NavbarMain />
      <div className="max-w-7xl mx-auto px-2 md:px-6 py-8 flex gap-6">
        {/* Left Sidebar */}
  <div className="hidden lg:flex w-1/5 flex-col gap-6">
          <LeftSideBar />
        </div>
        {/* Main Content */}
        <div className="flex-1 max-w-2xl mx-auto flex flex-col gap-6">
          <CreatePost onPostCreated={handlePostCreated} />
          <NewsFeed key={refreshKey} />
        </div>
        {/* Right Sidebar */}
        <div className="hidden xl:block w-1/4">
          <div className="h-full flex flex-col justify-between gap-6">
            <RightSideBar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;