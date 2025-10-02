import { createBrowserRouter } from "react-router-dom";
import Client from "../Layout/Client";
import NotFound from "../pages/NotFound";
import Landing from "../Pages/Client/Landing";
import Login from "../Pages/Client/Authentication/Login";
import Signup from "../Pages/Client/Authentication/Signup";
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

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Client />,
    children: [

      // Client Section

      { path: "/", element: <Landing /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/home", element: <HomePage /> },
      { path: "/all-students", element: <AllStudentsPage /> },
      { path: "/profile", element: <Profile /> },
      { path: "/profile-edit", element: <ProfileEdit /> },
      { path: "/note-sharing", element: <NoteSharing /> },
      { path: "/jobs", element: <JobPage /> },
      { path: "/upcoming-events", element: <UpcomingEvents /> },
      { path: "/announcement", element: <Announcement /> },




      // Admin Section
      { path: "/admin/dashboard", element: <Dashboard /> },
      { path: "/admin/all-students", element: <AllStudents /> },






      { path: "*", element: <NotFound /> },
    ],
  },
]);
