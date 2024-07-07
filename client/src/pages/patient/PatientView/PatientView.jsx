import "./patientview.css";
import {
  Button,
  Modal,
  ModalOverlay,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import ModalInformation from "./ModalContent";
import useAppointmentData from "../../../hooks/useAppointmentData"

const PatientView = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {appointmentData} = useAppointmentData()

  return (
    <>
      <div className="view-appointment-container">
        <div className="appointment-data-container">
          {appointmentData ? <><div className="header">
            <h2>{appointmentData.patient_id}</h2>
          </div>
          <div className="appointment-data">
            <p>
              <span className="data">Appointment ID:</span> {appointmentData._id}
            </p>
            <p>
              <span className="data">Date:</span>{appointmentData.appointment_date}
            </p>
            <p>
              <span className="data">Time:</span>
              {appointmentData.appointment_time}
            </p>
            <p>
              <span className="data">Reason:</span>
              {appointmentData.reason}
            </p>
            <p>
              <span className="data">Status:</span>
              <span className="status">{appointmentData.status}</span>
            </p>
            <p>
              <span className="data">Notes:</span>{appointmentData.notes}
            </p>
          </div></>: <p>Loading...</p>}
          <div className="buttons">
            <Stack spacing={5}>
              <Button colorScheme="green" variant="outline" onClick={onOpen}>
                Edit Appointment
              </Button>
              <Button colorScheme="red" variant="outline">
                Cancel Appointment
              </Button>
            </Stack>
          </div>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalInformation onClose={onClose} />
      </Modal>
    </>
  );
};

export default PatientView;

{
  /* <AlertDialog
isOpen={isAlertOpen}
leastDestructiveRef={cancelRef}
onClose={onAlertClose}
>
<AlertDialogOverlay>
  <AlertDialogContent>
    <AlertDialogHeader fontSize="lg" fontWeight="bold">
      Delete Customer
    </AlertDialogHeader>

    <AlertDialogBody>
      Are you sure? You can not undo this action afterwards.
    </AlertDialogBody>

    <AlertDialogFooter>
      <Button ref={cancelRef} onClick={onAlertClose}>
        Cancel
      </Button>
      <Button colorScheme="red" onClick={onAlertClose} ml={3}>
        Delete
      </Button>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialogOverlay>
</AlertDialog> */
}
