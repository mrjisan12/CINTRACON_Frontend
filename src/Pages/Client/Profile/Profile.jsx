
import NavbarMain from '../../../Ui/NavbarMain';
import NewsFeed from '../Home/NewsFeed';
import IntroSidebar from './IntroSidebar';
import PlanningSidebar from './PlanningSidebar';
import ProfileHeader from './ProfileHeader';

const Profile = () => {
  return (
    <div className="min-h-screen bg-[#181820]">
      <NavbarMain />
      <ProfileHeader />
      <div className="max-w-7xl mx-auto px-2 md:px-6 flex gap-6">
        {/* Left Sidebar */}
        <div className="hidden lg:block w-1/4">
          <IntroSidebar />
        </div>
        {/* Main Content */}
        <div className="flex-1 max-w-2xl mx-auto flex flex-col gap-6">
          <NewsFeed />
        </div>
        {/* Right Sidebar */}
        <div className="hidden xl:block w-1/4">
          <PlanningSidebar />
        </div>
      </div>
    </div>
  );
};

export default Profile;