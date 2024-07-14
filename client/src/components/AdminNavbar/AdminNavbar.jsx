import "../Navbar/navbar.css";
import { Link } from "react-router-dom";
import { Modal, ModalOverlay, useDisclosure, Button } from "@chakra-ui/react";
import ModalBody from "../AdminModal";
import Logo from "../../images/logo.png";
import { useRef } from "react";
import useAdminData from "../../hooks/useAdminData";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const { adminData, loading, error } = useAdminData();

  return (
    <>
      <div className="nav-container">
        <nav>
          <Link to="/admin-area">
            <div className="logo">
              <span>
                <img src={Logo} alt="Logo" />
              </span>
              <h3>DABS Web App</h3>
            </div>
          </Link>

          <div className="menu">
            <ul className="menu-items">
              <li>
                <Link className="menu-link" to="/admin-area">
                  Home
                </Link>
              </li>
              <li>
                {loading ? (
                  <p>Loading...</p>
                ) : error ? (
                  <p>{error}</p>
                ) : adminData ? (
                  <div className="profile">
                    <div className="pro_img">
                      <img
                        src={adminData.image_url ? adminData.image_url : "https://i.imgur.com/rgiY5VZ.png"}
                        alt="profile_picture"
                      />
                    </div>
                    <div className="pro_info">
                      <h4>
                        {adminData.firstname} {adminData.lastname}
                      </h4>
                      <p>{adminData.email}</p>
                    </div>
                  </div>
                ) : (
                  <Button colorScheme="blue" onClick={onOpen}>
                    Admin Login
                  </Button>
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
