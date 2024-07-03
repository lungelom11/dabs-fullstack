import { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Table,
  TableContainer,
  Tbody,
  Td,
  Textarea,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import "./patientbook.css";

const PatientBook = () => {
  const [timeSlot, setTimeSlot] = useState();

  useEffect(() => {
    getTime();
  }, []);

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
            <span className="calendar-header">
              <i className="fa-regular fa-calendar"></i>
              Select Date
            </span>
          </div>
          <div className="time-pick-container">
            <span className="time-header">
              <i className="fa-regular fa-clock"></i>
              Select Time
            </span>

            <div className="book-input">
              <div className="slots">
                {timeSlot?.map((slot, index) => (
                  <p key={index}> {slot.time} </p>
                ))}
              </div>

              <FormControl>
                <FormLabel>Note: </FormLabel>
                <Textarea placeholder="Enter note (Optional)" />
              </FormControl>
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
                    <Td> 9: 30</Td>
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
