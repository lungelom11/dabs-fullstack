import "./patientview.css";
import {
  Button,
  Modal,
  ModalOverlay,
  Stack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import ModalInformation from "./ModalContent";
import useAppointmentData from "../../../hooks/useAppointmentData"
import axios from "axios";
import { Link } from "react-router-dom";

const PatientView = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {bookedAppointment} = useAppointmentData()
  const toast = useToast()

const handleCancel = async (e) => {
  const updatedStatus = {
    ...bookedAppointment,
    status: 'Cancelled',
  };

  try {
    const response = await axios.put(`http://127.0.0.1:8000/appointments/${bookedAppointment._id}`, updatedStatus, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      toast({
        title: "Cancellation request sent successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      window.location.href = "/patient/view"
    } else {
      toast({
        title: "An error occured",
        description: "Please contact admin",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  } catch (error) {
    // Handle network error
    toast({
      title: "An error occured",
      description: "Please contact admin",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
    console.error('An error occurred:', error);
  }
}

  return (
    <>
      <div className="view-appointment-container">
        {bookedAppointment ? <div className="appointment-data-container">
        <div className="header">
            <h2>{bookedAppointment.patient_id}</h2>
          </div>
          <div className="appointment-data">
            <p>
              <span className="data">Appointment ID:</span> {bookedAppointment._id}
            </p>
            <p>
              <span className="data">Date:</span>{bookedAppointment.appointment_date}
            </p>
            <p>
              <span className="data">Time:</span>
              {bookedAppointment.appointment_time}
            </p>
            <p>
              <span className="data">Branch:</span>{bookedAppointment.branch}
            </p>
            <p>
              <span className="data">Reason:</span>
              {bookedAppointment.reason}
            </p>
            <p>
              <span className="data">Status:</span>
              <span className={bookedAppointment.status == "Pending" ? "pending": bookedAppointment.status == "Cancelled"? "cancelled": "schedulled" }>{bookedAppointment.status}</span>
            </p>
            <p>
              <span className="data">Notes:</span>{bookedAppointment.notes}
            </p>
          </div>
          <div className="buttons">
            <Stack spacing={5}>
              <Button colorScheme="green" variant="outline" onClick={onOpen}>
                Edit Appointment
              </Button>
              <Button colorScheme="red" variant="outline"  onClick={() => {
                  if (confirm("Are you sure you want to cancel?")) {
                      handleCancel();
                  }
              }}>
                Cancel Appointment
              </Button>
            </Stack>
          </div>
        </div> : <div className="not-found">
              <h3>Appointment Not Found</h3>
              <Link to="/patient/book"><p>Book Here</p></Link>
          </div>}
      </div>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalInformation onClose={onClose} />
      </Modal>
    </>
  );
};

export default PatientView;

