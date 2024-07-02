/* eslint-disable react/prop-types */

import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ isActive, setIsActive }) => {
  const location = useLocation();
  const toggleSection = () => {
    setIsActive(!isActive);
  };

  const navigationLinks = [
    {
      href: "/patient",
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
