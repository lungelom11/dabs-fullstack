import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import "./dashboard.css";
import "../../components/Sidebar/sidebar.css";
import { useState } from "react";

const Dashboard = () => {
  const [isActive, setIsActive] = useState(false);
  const navigationLinks = [
    {
      href: "/patient/home",
      iconClass: "fa-solid fa-house-user",
      text: "Home",
    },
    {
      href: "/patient/book",
      iconClass: "fa-regular fa-calendar-check",
      text: "Book Appointment",
    },
    {
      href: "/patient/view",
      iconClass: "fa-solid fa-pen-to-square",
      text: "View Appointment",
    },
    {
      href: "/patient/inbox",
      iconClass: "fa-solid fa-inbox",
      text: "Inbox",
      count: 11,
    },
    {
      href: "/patient/profile",
      iconClass: "fa-regular fa-user",
      text: "Profile",
    },
    {
      href: "/logout",
      iconClass: "fa-solid fa-right-from-bracket",
      text: "Logout",
    },
  ];
  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <div className="sidebar-container">
          <Sidebar isActive={isActive} setIsActive={setIsActive} navigationLinks ={navigationLinks} />
        </div>
        <div className={isActive ? "main-content-active" : "main-content"}>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
