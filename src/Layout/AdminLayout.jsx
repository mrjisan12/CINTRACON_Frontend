import React from "react";
import AdminNavbar from "../Ui/AdminNavbar";
import AdminSidebar from "../Components/AdminSidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => (
  <div className="min-h-screen flex flex-col bg-[#16181d]">
    <AdminNavbar />
    <div className="flex flex-1 bg-[#16181d]">
      <AdminSidebar />
      <main className="flex-1 p-6 overflow-y-auto bg-[#181a20]">
        <Outlet />
      </main>
    </div>
  </div>
);

export default AdminLayout;