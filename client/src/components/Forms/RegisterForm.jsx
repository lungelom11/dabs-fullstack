import Navbar from "../Navbar/Navbar";
import "./form.css";
import formImg from "../../images/person.png";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const initialRef = useRef(null);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [suburb, setSuburb] = useState("");
  const [city, setCity] = useState("");
  const [code, setCode] = useState("");
  const [currentMedications, setCurrentMedications] = useState("");
  const [medicalHistory, setMedicalHistory] = useState("");
  const [emergencyContactName, setEmergencyContactName] = useState("");
  const [emergencyContactPhone, setEmergencyContactPhone] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [isLoading, setIsLoading] = useState(false);
  const url = "http://127.0.0.1:8000/patients";
  const navigate = useNavigate();
  const toast = useToast();

  const patientData = {
    firstname,
    lastname,
    email,
    idNumber,
    phone,
    password,
    address: {
      street,
      suburb,
      city,
      code,
    },
    currentMedications,
    medicalHistory,
    emergencyContactName,
    emergencyContactPhone,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(url, patientData);
      if (response.status == 201) {
        const { access_token } = response.data;
        localStorage.setItem("patientToken", access_token); // Store the token
        toast({
          title: "Registered Successfully",
          description: "Redirecting to the dashboard",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setIsLoading(false);
        navigate("/patient");
      }
    } catch (err) {
      if (err.response.status == 409) {
        toast({
          title: "Account already exists",
          description: "Please login or contact us for assistance",
          status: "warning",
          duration: 5000,
          isClosable: true,
        });
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="register-container">
        <div className="form-container">
          <div className="form-img">
            <img src={formImg} />
          </div>
          <form className="form" onSubmit={handleSubmit}>
            <FormLabel>Personal Info:</FormLabel>
            <div className="personal-info">
              <FormControl>
                <Input
                  focusBorderColor="#2713fc"
                  ref={initialRef}
                  placeholder="Firstname"
                  htmlSize={15}
                  width="auto"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  name="firstname"
                />
              </FormControl>
              <FormControl>
                <Input
                  focusBorderColor="#2713fc"
                  ref={initialRef}
                  placeholder="Lastname"
                  htmlSize={15}
                  width="auto"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  name="lastname"
                />
              </FormControl>
              <FormControl>
                <Input
                  focusBorderColor="#2713fc"
                  ref={initialRef}
                  placeholder="Email"
                  htmlSize={15}
                  width="auto"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                />
              </FormControl>
              <FormControl>
                <Input
                  focusBorderColor="#2713fc"
                  ref={initialRef}
                  placeholder="ID Number"
                  htmlSize={15}
                  width="auto"
                  value={idNumber}
                  onChange={(e) => setIdNumber(e.target.value)}
                  name="idNumber"
                />
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    fontSize="1.2em"
                    color="gray.300"
                    pointerEvents="none"
                  >
                    <i className="fa-solid fa-phone"></i>
                  </InputLeftElement>
                  <Input
                    focusBorderColor="#2713fc"
                    htmlSize={12}
                    width="auto"
                    placeholder="Phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </InputGroup>
              </FormControl>
            </div>
            <FormLabel>Address:</FormLabel>
            <div className="personal-info">
              <FormControl>
                <Input
                  focusBorderColor="#2713fc"
                  placeholder="Street"
                  htmlSize={15}
                  width="auto"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  name="street"
                />
              </FormControl>
              <FormControl>
                <Input
                  focusBorderColor="#2713fc"
                  placeholder="Suburb"
                  htmlSize={15}
                  width="auto"
                  value={suburb}
                  onChange={(e) => setSuburb(e.target.value)}
                  name="suburb"
                />
              </FormControl>
              <FormControl>
                <Input
                  focusBorderColor="#2713fc"
                  ref={initialRef}
                  placeholder="City"
                  htmlSize={15}
                  width="auto"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  name="city"
                />
              </FormControl>
              <FormControl>
                <Input
                  focusBorderColor="#2713fc"
                  ref={initialRef}
                  placeholder="Postal Code"
                  htmlSize={15}
                  width="auto"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  name="code"
                />
              </FormControl>
            </div>
            <FormLabel>Medical:</FormLabel>
            <Stack spacing={5} style={{ marginBottom: "15px" }}>
              <Textarea
                placeholder="Medical history"
                value={medicalHistory}
                onChange={(e) => setMedicalHistory(e.target.value)}
                name="medicalHistory"
              />
              <Textarea
                placeholder="Current Medications"
                value={currentMedications}
                onChange={(e) => setCurrentMedications(e.target.value)}
                name="currentMedications"
              />
            </Stack>
            <FormLabel>Emergency Info:</FormLabel>
            <Stack spacing={5} style={{ marginBottom: "10px" }}>
              <FormControl>
                <Input
                  focusBorderColor="#2713fc"
                  placeholder="Emergency Contact Name"
                  value={emergencyContactName}
                  onChange={(e) => setEmergencyContactName(e.target.value)}
                  name="emergencyContactName"
                />
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    fontSize="1.2em"
                    color="gray.300"
                    pointerEvents="none"
                  >
                    <i className="fa-solid fa-phone"></i>
                  </InputLeftElement>
                  <Input
                    focusBorderColor="#2713fc"
                    placeholder="Emergency Contact Phone"
                    value={emergencyContactPhone}
                    onChange={(e) => setEmergencyContactPhone(e.target.value)}
                    name="emergencyContactPhone"
                  />
                </InputGroup>
              </FormControl>
            </Stack>
            <FormLabel>Password:</FormLabel>
            <Stack spacing={5} style={{ marginBottom: "15px" }}>
              <InputGroup>
                <Input
                  pr="4.5rem"
                  type={show ? "text" : "password"}
                  placeholder="Enter password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <InputGroup>
                <Input
                  pr="4.5rem"
                  type={show ? "text" : "password"}
                  placeholder="Confirm Passoword"
                  name="confirmPassword"
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </Stack>

            <Button
              isLoading={isLoading}
              loadingText="Submitting"
              colorScheme="blue"
              size="md"
              bgColor={"blue"}
              height="48px"
              width="150px"
              type="submit"
            >
              Register
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
