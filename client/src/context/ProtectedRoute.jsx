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

// /* eslint-disable react/prop-types */
// import { useEffect, useState, useRef } from "react";
// import { Navigate } from "react-router-dom";
// import { useToast } from "@chakra-ui/react";
// import axios from "axios";

// const PrivateRoute = ({ children }) => {
//   const [isTokenValid, setIsTokenValid] = useState(null);
//   const toast = useToast();
//   const toastIdRef = useRef(null);
//   const token = localStorage.getItem("patientToken");

//   useEffect(() => {
//     const validateToken = async () => {
//       try {
//         const response = await axios.post("/api/validate-token", { token });
//         if (response.data.valid) {
//           setIsTokenValid(true);
//         } else {
//           setIsTokenValid(false);
//           if (!toastIdRef.current) {
//             toastIdRef.current = toast({
//               title: "Session Expired",
//               description: "Your session has expired. Please log in again.",
//               status: "error",
//               duration: 5000,
//               isClosable: true,
//             });
//           }
//         }
//       } catch (error) {
//         setIsTokenValid(false);
//         if (!toastIdRef.current) {
//           toastIdRef.current = toast({
//             title: "Unauthorized Access",
//             description: "Please log in to access this page.",
//             status: "error",
//             duration: 5000,
//             isClosable: true,
//           });
//         }
//       }
//     };

//     if (token) {
//       validateToken();
//     } else {
//       setIsTokenValid(false);
//       if (!toastIdRef.current) {
//         toastIdRef.current = toast({
//           title: "Unauthorized Access",
//           description: "Please log in to access this page.",
//           status: "error",
//           duration: 5000,
//           isClosable: true,
//         });
//       }
//     }
//   }, [token, toast]);

//   if (isTokenValid === null) {
//     return null; // Optionally, show a loading spinner or placeholder while the token is being validated
//   }

//   if (!isTokenValid) {
//     return <Navigate to="/" />;
//   }

//   return children;
// };

// export default PrivateRoute;
