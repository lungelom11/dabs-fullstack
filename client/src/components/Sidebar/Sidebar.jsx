import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./sidebar.css";

const Sidebar = () => {
  const [isActive, setIsActive] = useState(false);
  const location = useLocation();

  const toggleSection = () => {
    setIsActive(!isActive);
  };

  const navigationLinks = [
    {
      href: "/patient",
      iconClass: "fa-regular fa-building",
      text: "Home",
    },
    {
      href: "/patient/book",
      iconClass: "fa-regular fa-hard-drive",
      text: "Book Appointment",
    },
    {
      href: "/patient/view",
      iconClass: "fa-regular fa-lightbulb",
      text: "View Appointment",
    },
    {
      href: "/patient/inbox",
      iconClass: "fa-regular fa-user",
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
      <aside className={isActive ? "active" : ""}>
        <div className="button" onClick={toggleSection}>
          <i className="fa-solid fa-bars" />
        </div>
        <div className="sidebar">
          <ul>
            {navigationLinks.map((link, index) => (
              <li key={index}>
                <Link
                  to={link.href}
                  className={
                    location.pathname === link.href ? "active-page" : ""
                  }
                >
                  <span className="icon">
                    <i className={link.iconClass} />
                  </span>
                  <span className="item">{link.text}</span>
                  {link.count && <span className="count">{link.count}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
