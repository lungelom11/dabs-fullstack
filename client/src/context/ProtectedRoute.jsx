/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import { Navigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("patientToken");
  const toast = useToast();
  const toastIdRef = useRef(null);

  useEffect(() => {
    if (!token && !toastIdRef.current) {
      toastIdRef.current = toast({
        title: "Unauthorized Access",
        description: "Please log in to access this page.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [token, toast]);

  if (!token) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
