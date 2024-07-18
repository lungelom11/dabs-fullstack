import "./navbar.css";
import { Link } from "react-router-dom";
import { Modal, ModalOverlay, Button, Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,useDisclosure } from "@chakra-ui/react";
import {ChevronDownIcon} from "@chakra-ui/icons"
import ModalBody from "../ModalBody";
import Logo from "../../images/logo.png";
import { useRef } from "react";
import usePatientData from "../../hooks/usePatientData";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const token = localStorage.getItem("patientToken");
  const { patientData } = usePatientData();

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
                      <h4>
                        {patientData
                          ? `${patientData.firstname} ${patientData.lastname}`
                          : "Patient name"}
                      </h4>
                      <p>{patientData ? patientData.email : "email"}</p>
                    </div>
                  </div>
                ) : (
                  <div style={{display:"flex", gap:"10px"}}>
                    <>
                        <Menu>
                          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                            Admin Area
                          </MenuButton>
                          <MenuList>
                            <Link to="/doctor/home"><MenuItem>Doctor</MenuItem></Link>
                            <Link to="/receptionist/home"><MenuItem>Receptionist</MenuItem></Link>
                            <Link to="/admin/home"><MenuItem>Administrator</MenuItem></Link>
                          </MenuList>
                        </Menu>
                   </>
                    <Button colorScheme="blue" mr={4} variant="outline"  onClick={onOpen}>
                      Login
                    </Button>
                    <Link to="/register">
                      <Button colorScheme="blue">Register</Button>
                    </Link>
                  </div>
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
