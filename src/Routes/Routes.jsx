import { createBrowserRouter } from "react-router-dom";
import Client from "../Layout/Client";
import AdminLayout from "../Layout/AdminLayout";
import NotFound from "../pages/NotFound";
import Landing from "../Pages/Client/Landing";
import Login from "../Pages/Client/Authentication/Login";
import Signup from "../Pages/Client/Authentication/Signup";
import AdminSignUp from "../Pages/Client/Authentication/AdminSignUp";
import HomePage from "../Pages/Client/Home/HomePage";
import AllStudentsPage from "../Pages/Client/AllStudents/AllStudentsPage";
import Profile from "../Pages/Client/Profile/Profile";
import ProfileEdit from "../Pages/Client/Profile/ProfileEdit";
import NoteSharing from "../Pages/Client/NoteSharing/NoteSharing";
import JobPage from "../Pages/Client/Job/JobPage";
import UpcomingEvents from "../Pages/Client/UpcomingEvents/UpcomingEvents";
import Announcement from "../Pages/Client/Announcement/Announcement";
import Dashboard from "../Pages/Admin/Dashboard/Dashboard";
import AllStudents from "../Pages/Admin/AllStudents/AllStudents";
import ForgetPassword from "../Pages/Client/Authentication/ForgetPassword";
import CintraconAI from "../Pages/Client/CintraconAI/CintraconAI";
import OTP from "../Pages/Client/Authentication/OTP";
import ConfirmPass from "../Pages/Client/Authentication/ConfirmPass";
import ForumPage from "../Pages/Client/Forum/ForumPage";
import ForumManage from "../Pages/Admin/Forum/ForumManage";
import NotesManage from "../Pages/Admin/Notes/NotesManage";
import JobsManage from "../Pages/Admin/Jobs/JobsManage";
import EventsManage from "../Pages/Admin/Events/EventsManage";
import AnnouncementManage from "../Pages/Admin/Announcement/AnnouncementManage";
import Settings from "../Pages/Admin/Settings/Settings";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Client />,
    children: [
      // Client Section
      { path: "/", element: <Landing /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/admin-signup", element: <AdminSignUp /> }, 
      { path: "/send-otp", element: <ForgetPassword /> },
      { path: "/check-otp", element: <OTP /> },
      { path: "/reset-password", element: <ConfirmPass /> },
      { path: "/home", element: <HomePage /> },
      { path: "/all-students", element: <AllStudentsPage /> },
      { path: "/profile", element: <Profile /> },
      { path: "/profile-edit", element: <ProfileEdit /> },
      { path: "/note-sharing", element: <NoteSharing /> },
      { path: "/jobs", element: <JobPage /> },
      { path: "/forum", element: <ForumPage /> },
      { path: "/upcoming-events", element: <UpcomingEvents /> },
      { path: "/announcement", element: <Announcement /> },
      { path: "/cintracon-ai", element: <CintraconAI /> },
      
      // Admin Section
      { path: "/admin", element: <AdminLayout />,
        children: [
          { path: "dashboard", element: <Dashboard /> },
          { path: "all-students", element: <AllStudents /> },
          { path: "forum", element: <ForumManage /> },
          { path: "notes", element: <NotesManage /> },
          { path: "jobs", element: <JobsManage /> },
          { path: "events", element: <EventsManage /> },
          { path: "announcement", element: <AnnouncementManage /> },
          { path: "settings", element: <Settings /> },
          { path: "*", element: <Dashboard /> },
        ],
      },
      
      { path: "*", element: <NotFound /> },
    ],
  },
]);