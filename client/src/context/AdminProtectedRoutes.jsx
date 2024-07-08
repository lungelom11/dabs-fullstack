/* eslint-disable react/prop-types */
import { useToast } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { Navigate } from "react-router-dom";

const AdminProtectedRoutes = ({children}) => {
  const token = localStorage.getItem("adminToken");
  const toast = useToast();
  const toastIdRef = useRef(null);
  
  useEffect(() => {
    if (!token && !toastIdRef.current) {
      toastIdRef.current = toast({
        title: "Access Denied!",
        description: "Please log in to access this page.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [token, toast]);

  if (!token) {
    return <Navigate to="/admin-area" />;
  }

  return children;
}

export default AdminProtectedRoutes