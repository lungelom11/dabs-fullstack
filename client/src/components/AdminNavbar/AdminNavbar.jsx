import "../Navbar/navbar.css";
import { Link } from "react-router-dom";
import { Button, Modal, ModalOverlay, useDisclosure } from "@chakra-ui/react";
// import { Modal, ModalOverlay } from "@chakra-ui/react";
import AdminForm from "../AdminModal";
import Logo from "../../images/logo.png";
import { useRef } from "react";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const finalRef = useRef(null);

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
              <Button colorScheme="blue" onClick={onOpen}>
                  Admin Login
                </Button>
              </li>
              <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
              >
                <ModalOverlay />
                <AdminForm initialRef={initialRef} />
              </Modal>
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
