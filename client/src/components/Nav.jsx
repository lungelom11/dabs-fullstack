import "../styles/nav.css";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <>
      <nav className="nav-container">
        <div className="logo">
          <h2>DOCTOR APPOINTMENT</h2>
        </div>
        <div className="navigation">
          <ul className="menu">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>Login</li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        </div>
      </nav>
      <div className="line"></div>
    </>
  );
};

export default Nav;
