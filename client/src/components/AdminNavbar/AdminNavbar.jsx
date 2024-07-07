import "../Navbar/navbar.css";
import { Link } from "react-router-dom";
import { Modal, ModalOverlay, useDisclosure } from "@chakra-ui/react";
// import { Modal, ModalOverlay } from "@chakra-ui/react";
import ModalBody from "../AdminModal";
import Logo from "../../images/logo.png";
import { useRef } from "react";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const token = localStorage.getItem("adminToken")

  return (
    <>
      <div className="nav-container">
        <nav>
          <Link to="/admin">
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
                {token ? (<div className="profile">
                    <div className="pro_img">
                      <img
                        src="https://i.imgur.com/rgiY5VZ.png"
                        alt="profile_picture"
                      />
                    </div>
                    <div className="pro_info">
                      <h4>
                        Dr Malen
                      </h4>
                      <p>davidmalen@gmail.com</p>
                    </div>
                  </div>) : <button className="admin-btn" onClick={onOpen}>
                  Admin Login
                </button> }
              
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
