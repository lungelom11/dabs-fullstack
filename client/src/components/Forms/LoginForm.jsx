/* eslint-disable react/prop-types */
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  ModalBody,
  ModalFooter,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const LoginForm = ({ initialRef }) => {
  const URL = "http://127.0.0.1:8000/login";
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(URL, {
        email,
        password,
      });
      const { access_token } = response.data;
      localStorage.setItem("patientToken", access_token); // Store the token
      // Redirect to protected route
      navigate("/patient/home"); // Replace with your protected route
      toast({
        title: "Logged In Successfully",
        description: "Redirecting to the dashboard",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setIsLoading(false);
    } catch (err) {
      if (err.response.status == 404) {
        setError("User doesn't exist");
      } else if (err.response.status == 403) {
        setError("Invalid login credentials");
      }
      setIsLoading(false);
    }
  };
  return (
    <>
      <form onSubmit={handleLogin}>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              focusBorderColor="#2713fc"
              ref={initialRef}
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Password</FormLabel>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type={show ? "text" : "password"}
                placeholder="Enter password"
                focusBorderColor="#2713fc"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            type="submit"
            bgColor={"blue"}
            size={"md"}
            color={"white"}
            isLoading={isLoading}
            colorScheme="blue"
          >
            Login
          </Button>
        </ModalFooter>
      </form>
      <p className="register-link">
        Not registered yet? Register{" "}
        <span>
          <Link to="/register">here</Link>
        </span>
      </p>
    </>
  );
};

export default LoginForm;
