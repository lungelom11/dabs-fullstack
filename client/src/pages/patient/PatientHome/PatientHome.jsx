import { Button } from "@chakra-ui/react";
import {Link} from "react-router-dom";
import "./patienthome.css";
import usePatientData from "../../../hooks/usePatientData";
import useAppointmentData from "../../../hooks/useAppointmentData";

const PatientHome = () => {
  const { patientData } = usePatientData();
  const { bookedAppointment } = useAppointmentData();

  return (
    <div className="patient-home-container">
      <div className="left-container">
        <h2>Welcome {patientData ? patientData.firstname : "Name"}</h2>
      </div>
      <div className="right-container">
        <h4>Messages and Notifications <span style={{marginLeft: "10px", color:"green"}}> <i className="fa-solid fa-bell"></i></span></h4>

        <div className="notifications-container">
          <h3>Upcoming Appointment</h3>

          <div className="upcoming-appointment">
            { bookedAppointment ? <>
            <p> <span style={{marginRight: "10px"}}><i className="fa-solid fa-calendar"></i></span> {bookedAppointment.appointment_date}</p>
            <p> <span style={{marginRight: "10px"}}><i className="fa-solid fa-clock"></i></span> {bookedAppointment.appointment_time}</p>
            <p> <span style={{marginRight: "10px"}}><i className="fa-solid fa-hospital"></i></span>{bookedAppointment.branch}</p>
            <Link to="/patient/view"><Button colorScheme="yellow">Reschedule</Button></Link> </> : <h4>No appointment</h4>}
          </div>

          <h3>Inbox Summary</h3>
          <div className="inbox-summary">
            
            <p>No Messages</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientHome;
