import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import "./dashboard.css";
import "../../components/Sidebar/sidebar.css";
import { useState } from "react";

const Dashboard = () => {
  const [isActive, setIsActive] = useState(false);
  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <div className="sidebar-container">
          <Sidebar isActive={isActive} setIsActive={setIsActive} />
        </div>
        <div className={isActive ? "main-content-active" : "main-content"}>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
