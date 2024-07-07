import { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const useAppointmentData = () => {
  const [bookedAppointment, setAppointmentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // eslint-disable-next-line no-unused-vars
  const [patientId, setPatientId] = useState(null);

  useEffect(() => {
    const fetchAppointmentData = async () => {
      setLoading(true); // Set loading to true before fetching data
      setError(null); // Reset error state

      const token = localStorage.getItem("patientToken");

      if (token) {
        const {patient_id} = jwtDecode(token);
        setPatientId(patient_id); 

        const url = `http://127.0.0.1:8000/appointments/${patient_id}`;
        try {
          const response = await axios.get(url);
          setAppointmentData(response.data); // Set patientData state with fetched data
        } catch (error) {
          setError("Failed to fetch appointment data");
        }
      } else {
        setError("Token not found"); // Handle case where token is missing
      }

      setLoading(false); // Set loading to false after fetching data
    };

    fetchAppointmentData();
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return { bookedAppointment, loading, error };
};

export default useAppointmentData;
