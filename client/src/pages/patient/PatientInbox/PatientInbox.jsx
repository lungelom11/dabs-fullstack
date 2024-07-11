import "./patientinbox.css";

const PatientInbox = () => {
  return (
    <>
      <div className="inbox-container">

        <h3>Appointment Updates</h3>

        <div className="updates-container">
          <ul>
            <li>Patients gets updates about current status of their appointment</li>
            <li>Updates from the doctor or receptionists</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default PatientInbox;
