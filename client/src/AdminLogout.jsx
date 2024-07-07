import { useToast } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogout = () => {
    const navigate = useNavigate();
    const toast = useToast();
    const toastIdRef = useRef(null);

    useEffect(() => {
        localStorage.removeItem("adminToken"); // Remove the token
        if (!toastIdRef.current) {
          toastIdRef.current = toast({
            title: "Logged out successful",
            description: "Redirecting to home page",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        }
        navigate("/admin-area"); // Redirect to Home page
      }, [navigate, toast]);
    
      return null; // No UI needed for this component
}

export default AdminLogout