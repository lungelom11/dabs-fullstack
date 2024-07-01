import "./navbar.css";
import { Link } from "react-router-dom";
import { Modal, ModalOverlay } from "@chakra-ui/react";
import ModalBody from "../ModalBody";
import Logo from "../../images/logo.png";
import { useDisclosure } from "@chakra-ui/react";
import { useRef } from "react";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const token = localStorage.getItem("token");

  return (
    <>
      <div className="nav-container">
        <nav>
          <Link to="/">
            <div className="logo">
              <span>
                <img src={Logo} />
              </span>
              <h3>DABS Web App</h3>
            </div>
          </Link>

          <div className="menu">
            <ul className="menu-items">
              <li>
                <Link className="menu-link" to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="menu-link" to="/about">
                  About
                </Link>
              </li>
              <li>
                <Link className="menu-link" to="/contact">
                  Contact
                </Link>
              </li>
              <li>
                {token ? (
                  <div className="profile">
                    <div className="pro_img">
                      <img
                        src="https://i.imgur.com/rgiY5VZ.png"
                        alt="profile_picture"
                      />
                    </div>
                    <div className="pro_info">
                      <h4>Patient Name</h4>
                      <p>patient@dabs.com</p>
                    </div>
                  </div>
                ) : (
                  <button className="login-btn" onClick={onOpen}>
                    Login
                  </button>
                )}
              </li>
              <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
              >
                <ModalOverlay />
                <ModalBody initialRef={initialRef} />
              </Modal>
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
