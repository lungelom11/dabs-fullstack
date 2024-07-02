import { useState, useEffect } from "react";
import usePatientData from "../../../hooks/usePatientData";
import "./patientprofile.css";
import { useNavigate } from "react-router-dom";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  Stack,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const PatientProfile = () => {
  const { patientData } = usePatientData();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [currentMedications, setCurrentMedications] = useState("");
  const [medicalHistory, setMedicalHistory] = useState("");
  const [emergencyContactName, setEmergencyContactName] = useState("");
  const [emergencyContactPhone, setEmergencyContactPhone] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    if (patientData) {
      setFirstname(patientData.firstname);
      setLastname(patientData.lastname);
      setEmail(patientData.email);
      setIdNumber(patientData.idNumber);
      setPhone(patientData.phone);
      setCurrentMedications(patientData.currentMedications);
      setMedicalHistory(patientData.medicalHistory);
      setEmergencyContactName(patientData.emergencyContactName);
      setEmergencyContactPhone(patientData.emergencyContactPhone);
    }
  }, [patientData]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const updatedData = {
      firstname,
      lastname,
      email,
      idNumber,
      phone,
      currentMedications,
      medicalHistory,
      emergencyContactName,
      emergencyContactPhone,
    };

    try {
      const token = localStorage.getItem("patientToken");
      if (token) {
        const decoded = jwtDecode(token);
        const id = decoded.id;
        const response = await axios.put(
          `http://127.0.0.1:8000/patients/${id}`,
          updatedData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          toast({
            title: "Updated Successfully",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          setIsLoading(false);
          navigate("/patient/profile");
        }
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  return (
    <div className="profile-container">
      <h2 style={{ textAlign: "center" }}>My Profile</h2>
      <form className="update-form" onSubmit={handleUpdate}>
        {patientData ? (
          <>
            <FormLabel>Personal Info:</FormLabel>
            <div className="update-info">
              <FormControl>
                <Input
                  focusBorderColor="#2713fc"
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
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </InputGroup>
              </FormControl>
            </div>
            <div className="update-info">
              <div className="medical">
                <FormLabel>Medical:</FormLabel>
                <Stack spacing={5} style={{ marginBottom: "15px" }}>
                  <Textarea
                    value={medicalHistory}
                    onChange={(e) => setMedicalHistory(e.target.value)}
                    name="medicalHistory"
                  />
                  <Textarea
                    value={currentMedications}
                    onChange={(e) => setCurrentMedications(e.target.value)}
                    name="currentMedications"
                  />
                </Stack>
              </div>
              <div className="emergency">
                <FormLabel>Emergency Info:</FormLabel>
                <Stack spacing={5} style={{ marginBottom: "10px" }}>
                  <FormControl>
                    <Input
                      focusBorderColor="#2713fc"
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
                        value={emergencyContactPhone}
                        onChange={(e) =>
                          setEmergencyContactPhone(e.target.value)
                        }
                        name="emergencyContactPhone"
                      />
                    </InputGroup>
                  </FormControl>
                </Stack>
              </div>
            </div>
          </>
        ) : (
          <div className="loading">
            <Spinner />
          </div>
        )}

        <Button
          isLoading={isLoading}
          loadingText="Submitting"
          colorScheme="yellow"
          size="md"
          height="48px"
          width="250px"
          type="submit"
        >
          Update
        </Button>
      </form>

      <Button
        colorScheme="red"
        size="md"
        height="48px"
        width="250px"
        type="submit"
      >
        Delete Profile
      </Button>
    </div>
  );
};

export default PatientProfile;
