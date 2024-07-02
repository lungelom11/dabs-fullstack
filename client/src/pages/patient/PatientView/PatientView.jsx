import "./patientview.css";
import { Button, Stack } from "@chakra-ui/react";

const PatientView = () => {
  return (
    <>
      <div className="view-appointment-container">
        <div className="appointment-data-container">
          <div className="header">
            <h2>P79332234</h2>
          </div>
          <div className="appointment-data">
            <p>
              <span className="data">Appointment ID:</span>
            </p>
            <p>
              <span className="data">Date:</span>
            </p>
            <p>
              <span className="data">Time:</span>
            </p>
            <p>
              <span className="data">Reason:</span>
            </p>
            <p>
              <span className="data">Status:</span>
            </p>
            <p>
              <span className="data">Notes:</span>
            </p>
          </div>
          <div className="buttons">
            <Stack spacing={5}>
              <Button colorScheme="green" variant="outline">
                Edit Appointment
              </Button>
              <Button colorScheme="red" variant="outline">
                Cancel Appointment
              </Button>
            </Stack>
          </div>
        </div>
      </div>
    </>
  );
};

export default PatientView;
