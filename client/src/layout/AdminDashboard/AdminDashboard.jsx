import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import AdminNavbar from "../../components/AdminNavbar/AdminNavbar";
import "../Dashboard/dashboard.css";
import "../../components/Sidebar/sidebar.css";
import { useState } from "react";

const Dashboard = () => {
  const [isActive, setIsActive] = useState(false);

  const navigationLinks = [
    {
      href: "/admin/home",
      iconClass: "fa-solid fa-house-user",
      text: "Dashboard",
    },
    {
      href: "/admin/users",
      iconClass: "fa-solid fa-users",
      text: "Manage Users",
    },
    {
      href: "/admin/inbox",
      iconClass: "fa-solid fa-inbox",
      text: "Inbox",
      count: 11,
    },
    {
      href: "/admin/logout",
      iconClass: "fa-solid fa-right-from-bracket",
      text: "Logout",
    },
  ];

  return (
    <>
      <AdminNavbar />
      <div className="dashboard-container">
        <div className="sidebar-container">
          <Sidebar isActive={isActive} setIsActive={setIsActive} navigationLinks={navigationLinks} />
        </div>
        <div className={isActive ? "main-content-active" : "main-content"}>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
