import { useState, useEffect, useRef } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Table,
  TableContainer,
  Tbody,
  Td,
  Stack,
  Textarea,
  Select,
  Th,
  Thead,
  Tr,
  useToast,
  useDisclosure,
  InputGroup,
  InputLeftElement,
  Input,
  Spinner,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { InfoIcon } from "@chakra-ui/icons";
import "./patientbook.css";
import BookCalendar from "../../../components/Calendar/BookCalendar";
import dayjs from "dayjs";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import useAppointmentData from "../../../hooks/useAppointmentData";
import DoctorSearch from "./DoctorSearch";

const PatientBook = () => {
  const url = "http://127.0.0.1:8000/appointments";
  const [timeSlot, setTimeSlot] = useState([]);
  const today = dayjs();
  const [appointment_date, setAppointmentDate] = useState(today);
  const [appointment_time, setAppointmentTime] = useState(null);
  const [reason, setReason] = useState('');
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const [patientId, setPatientId] = useState(null);
  const token = localStorage.getItem("patientToken");
  const {bookedAppointment} = useAppointmentData();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const selectedDate = dayjs(appointment_date).format("DD MMM YYYY");
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const [doctors, setDoctors] = useState([]);
  const [searchDoctor, setSearchDoctor] = useState("");
  const [doc_id, setDoctorId]  = useState("");
  const [branch, setBranch] = useState();
  const [bookedSlots, setBookedSlots] = useState([""]);
 
  
  useEffect(()=>{
    const {patient_id} = jwtDecode(token);
    setPatientId(patient_id);
    const fetchDoctors = async () =>{
      try {
        const response = await axios.get("http://127.0.0.1:8000/admin/?role=doctor")
        setDoctors(response.data);

      } catch (error) {
        console.log(error)
      }
    }
    fetchDoctors()
  },[])


  //Handling available and not available slots
  useEffect(() =>{
    const fetchBookedSlots = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/appointments/?appointment_date=${selectedDate}`);
        setBookedSlots(response.data)
        
      } catch (error) {
        console.log(error)
      }
    }
    
    //fetch timeslots of this specific dat
    fetchBookedSlots()
    getTime();
  }, [selectedDate])

  const appointmentData = {
    patient_id: patientId,
    doc_id,
    appointment_date: selectedDate,
    appointment_time,
    reason,
    status: "Pending",
    branch,
    notes
  };

  const handleReasonChange = (event) => {
    setReason(event.target.value);
  };

  const handleSlotSelect = (slot) => {
    setAppointmentTime(slot);
  };

  const handleSearch = (e) => {
    setSearchDoctor(e.target.value)
  }
  const getTime = () => {
    const timeList = [];
    for (let i = 8; i <= 12; i++) {
      timeList.push({
        time: i + ":00 AM",
      });
      timeList.push({
        time: i + ":30 AM",
      });
    }
    for (let i = 1; i <= 4; i++) {
      timeList.push({
        time: i + ":00 PM",
      });
      timeList.push({
        time: i + ":30 PM",
      });
    }

    setTimeSlot(timeList);
  };

  const handleAppointmentData = async () => {
    if (!appointment_time || !reason) {
      toast({
        title: "Please select a time slot and reason",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    setIsLoading(true);
    console.log(appointmentData)

    try {
      const response = await axios.post(url, appointmentData);
      if (response.status === 201) {
        toast({
          title: "Appointment Booked Successfully",
          description: "Confirmation Email Sent",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setIsLoading(false);
        navigate("/patient/view");
      }
    } catch (err) {
      if (err.response && err.response.status === 409) {
        toast({
          title: "Appointment already booked",
          status: "warning",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: "An error occurred",
          description: "Unable to book appointment",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
      setIsLoading(false);
    }
  };

  const filteredDoctors = doctors ? doctors.filter(doctor => 
    doctor.firstname.toLowerCase().includes(searchDoctor.toLowerCase()) || 
    doctor.lastname.toLowerCase().includes(searchDoctor.toLowerCase())
  ) : [];

  return (
    <section className="patient-book-container">
      <div className="book-appointment-container">
        <div className="calendar-container">
          <span className="info-icon">
            <Popover>
              <PopoverTrigger>
                <InfoIcon boxSize={6} />
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Date Statuses</PopoverHeader>
                <PopoverBody>
                  <div className="info-colors">
                    <div className="green">
                      <div className="color"></div> Fully Available
                    </div>
                    <div className="gold">
                      <div className="color"></div> Partially Booked
                    </div>
                    <div className="red">
                      <div className="color"></div> Fully Booked
                    </div>
                  </div>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </span>
          <span className="calendar-header">
            <i className="fa-regular fa-calendar"></i>
            Select Date
          </span>
          <BookCalendar appointment_date={appointment_date} setAppointmentDate={setAppointmentDate} />
         
        </div>
        <div className="time-pick-container">
          <span className="time-header">
            <i className="fa-regular fa-clock"></i>
            Select Time
          </span>
          <div className="book-input" style={{ marginBottom: "10px" }}>
            <div className="slots">
              {timeSlot?.map((slot, index) => (
                <button
                key={index}
                onClick={() => handleSlotSelect(slot.time)}
                style={{
                  backgroundColor: bookedSlots.some((booked) => booked.appointment_time === slot.time)
                    ? '' 
                    : appointment_time === slot.time
                    ? 'green'
                    : ''
                }}
                className={bookedSlots.some((booked) => booked.appointment_time === slot.time) ? "booked" : ""}
                title={bookedSlots.some((booked) => booked.appointment_time === slot.time) ? "Slot already booked" : ""}
              >
                {slot.time}
              </button>
              
              ))}
            </div>
            <Stack spacing={5}>
              <FormControl>
                <FormLabel>Reason:</FormLabel>
                <Select placeholder='Select Reason' onChange={handleReasonChange} value={reason}>
                  <option value='Regular check-up'>Regular check-up</option>
                  <option value='Follow-up visit'>Follow-up visit</option>
                  <option value='Consultation'>Consultation</option>
                  <option value="Specialist referral">Specialist referral</option>
                  <option value="Nutritional advice">Nutritional advice</option>
                  <option value="Disease prevention">Disease prevention</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Note: </FormLabel>
                <Textarea placeholder="Enter note (Optional)" value={notes} onChange={(e) => setNotes(e.target.value)} />
              </FormControl>

              <FormControl>
                <FormLabel> <span style={{marginRight: "5px"}}><i className="fa-solid fa-hospital"></i></span>Select Branch:</FormLabel>
                <Button colorScheme="yellow" onClick={onOpen}>Choose</Button>
              </FormControl>
            </Stack>
          </div>
          <div className="book-btn">
            <Button colorScheme="blue" size="lg" width="150px" onClick={handleAppointmentData} isLoading={isLoading}>
              Book
            </Button>
          </div>
        </div>
      </div>
      <div className="my-appointment-section">
        <h3>My Appointment</h3>
        <div className="table-container">
          {bookedAppointment ? <TableContainer>
            <Table variant="simple">
              <Thead style={{ borderBottom: "2px solid gray" }}>
                <Tr>
                  <Th>APPOINTMENT ID</Th>
                  <Th>DATE</Th>
                  <Th>TIME</Th>
                  <Th>STATUS</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr style={{ fontWeight: "600" }}>
                  <Td>{bookedAppointment._id}</Td>
                  <Td>{bookedAppointment.appointment_date}</Td>
                  <Td>{bookedAppointment.appointment_time}</Td>
                  <Td>{bookedAppointment.status}</Td>
                  <Td style={{ textDecoration: "underline" }}>
                    <Link to="/patient/view">View/Edit</Link>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer> : <p>No Appointment</p>}
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={onClose}
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select Branch</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="select-branch-container">
            <InputGroup>
              <InputLeftElement pointerEvents='none'>
                <i className="fa-solid fa-magnifying-glass"></i>
              </InputLeftElement>
              <Input type='text' placeholder='Search Doctor' ref={initialRef} value={searchDoctor} onChange={handleSearch}/>
            </InputGroup>     
            {doctors ? (
              filteredDoctors.length > 0 ? (
                <DoctorSearch doctors={filteredDoctors} setDoctorId={setDoctorId} setBranch={setBranch} selectedBranch= {branch}/>
              ) : (
                <p>Doctor not found</p>
              )
            ) : (
              <Spinner />
            )}
              
            </div>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='green' mr={3} onClick={onClose}>
              Done
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </section>
  );
};

export default PatientBook;
