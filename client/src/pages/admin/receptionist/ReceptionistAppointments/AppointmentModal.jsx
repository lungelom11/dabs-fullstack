import {
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useToast,
} from "@chakra-ui/react"
import axios from "axios";
import { useEffect, useState } from "react"

const AppointmentModal = ({selectedAppointment}) => {

    const [patientData,setPatientData] = useState("");
    const url = `http://127.0.0.1:8000/patients/${selectedAppointment.patient_id}`
    const toast = useToast()

    useEffect(() => {
        //Fetch patient data
        const fetchPatientData = async () =>{
            try {
                const response = await axios.get(url);
                setPatientData(response.data); // Set patientData state with fetched data
              } catch (error) {
                console.log(error)
              }
        }

        fetchPatientData()
    }, [])

    const handleCancel = async (e) => {
        const updatedStatus = {
          ...selectedAppointment,
          status: 'Cancelled',
        };
      
        try {
          const response = await axios.put(`http://127.0.0.1:8000/appointments/${selectedAppointment._id}`, updatedStatus, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
          if (response.status === 200) {
            toast({
              title: "Cancelled successfully",
              status: "success",
              duration: 5000,
              isClosable: true,
            });
            window.location.href = "/receptionist/appointments"
          } else {
            toast({
              title: "An error occured",
              status: "error",
              duration: 5000,
              isClosable: true,
            });
          }
        } catch (error) {
          // Handle network error
          toast({
            title: "An error occured",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
          console.error('An error occurred:', error);
        }
      }

      const handleSchedule = async (e) => {
        const updatedStatus = {
          ...selectedAppointment,
          status: 'Scheduled',
        };
      
        try {
          const response = await axios.put(`http://127.0.0.1:8000/appointments/${selectedAppointment._id}`, updatedStatus, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
          if (response.status === 200) {
            toast({
              title: "Scheduled successfully",
              status: "success",
              duration: 5000,
              isClosable: true,
            });
            window.location.href = "/receptionist/appointments"
          } else {
            toast({
              title: "An error occured",
              status: "error",
              duration: 5000,
              isClosable: true,
            });
          }
        } catch (error) {
          // Handle network error
          toast({
            title: "An error occured",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
          console.error('An error occurred:', error);
        }
      }

  return (
    <>
        <ModalContent>
            <ModalHeader><h2>{patientData.firstname} {patientData.lastname}</h2></ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <div className="appointment-data">
            <p>
              <span className="data">Appointment ID:</span> {selectedAppointment._id}
            </p>
            <p>
              <span className="data">Date:</span>{selectedAppointment.appointment_date}
            </p>
            <p>
              <span className="data">Time:</span>
              {selectedAppointment.appointment_time}
            </p>
            <p>
              <span className="data">Branch:</span>{selectedAppointment.branch}
            </p>
            <p>
              <span className="data">Reason:</span>
              {selectedAppointment.reason}
            </p>
            <p>
              <span className="data">Status:</span>
              <span className={selectedAppointment.status == "Pending" ? "pending": selectedAppointment.status == "Cancelled"? "cancelled": "schedulled" }>{selectedAppointment.status}</span>
            </p>
            <p>
              <span className="data">Notes:</span>{selectedAppointment.notes}
            </p>
          </div>
            </ModalBody>
                    
            <ModalFooter>
                <div className="appointment-actions">
                    <Button colorScheme="green" variant="outline" onClick={() => {
                  if (confirm("Schedule Appointment for doctor?")) {
                      handleSchedule();
                  }
              }}>Schedule</Button>
                    <Button colorScheme="red" variant="outline" onClick={() => {
                  if (confirm("Are you sure you want to cancel?")) {
                      handleCancel();
                  }
              }}>Cancel</Button>
                    <Button colorScheme="yellow" variant="outline">Send note</Button>
                </div>
            </ModalFooter>           
    </ModalContent>
    </>
  )
}

export default AppointmentModal