/* eslint-disable react/prop-types */

import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ isActive, setIsActive, navigationLinks }) => {
  const location = useLocation();
  const toggleSection = () => {
    setIsActive(!isActive);
  };

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
