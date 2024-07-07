import { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  FormLabel,
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
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { InfoIcon } from "@chakra-ui/icons";
import "./patientbook.css";
import BookCalendar from "../../../components/Calendar/BookCalendar";
import dayjs from "dayjs";

const PatientBook = () => {
  const [timeSlot, setTimeSlot] = useState();
  const [appointment_date, setAppointmentDate] = useState(dayjs("11 July 2024"));
  const [appointment_time, setAppointmentTime] = useState();
  const [selectedReason, setSelectedReason] = useState('');
  const [status,setStatus] = useState()
  const [reason,setReason] = useState()
  const [notes,setNotes] = useState()

  const selectedDate = dayjs(appointment_date).format("DD MMM YYYY")

  const appointmentData = {
    patient_id: "P2321213",
    doc_id: "D2311",
    appointment_date: selectedDate,
    appointment_time,
    reason,
    status,
    notes
  }

  useEffect(() => {
    getTime();
  }, []);

  const handleReasonChange = (event) => {
    setSelectedReason(event.target.value);
  };
  
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


  return (
    <>
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
            <BookCalendar appointment_date={appointment_date} setAppointmentDate={setAppointmentDate}/>

            <h3>Selected slot:</h3>
          </div>
          <div className="time-pick-container">
            <span className="time-header">
              <i className="fa-regular fa-clock"></i>
              Select Time
            </span>

            <div className="book-input" style={{marginBottom: "10px"}}>
              <div className="slots" >
                {timeSlot?.map((slot, index) => (
                  <p key={index} className="selected-slot"> {slot.time} </p>
                ))}
              </div>
                <Stack spacing={5}>
                <FormControl>
                <FormLabel>Reason:</FormLabel>
                <Select placeholder='Select Reason' onChange={handleReasonChange} value={selectedReason}>
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
                <Textarea placeholder="Enter note (Optional)" />
              </FormControl>
                </Stack>
            </div>

            <div className="book-btn">
              <Button colorScheme="blue" size="lg" width="150px">
                Book
              </Button>
            </div>
          </div>
        </div>
        <div className="my-appointment-section">
          <h3>My Appointment</h3>
          <div className="table-container">
            <TableContainer>
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
                    <Td>2355</Td>
                    <Td>11 July</Td>
                    <Td> 9:30 AM</Td>
                    <Td>Scheduled</Td>
                    <Td style={{ textDecoration: "underline" }}>
                      <Link to="/patient/view">View/Edit</Link>
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </section>
    </>
  );
};

export default PatientBook;
