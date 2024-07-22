/* eslint-disable react/prop-types */
import "./calendar.css";
import { DateCalendar  } from "@mui/x-date-pickers";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import dayjs from "dayjs";


const theme = createTheme({
  typography: {
    body1: {
      fontSize: "1.5rem",
    },
    // Define other typography variants as needed
  },
});

const BookCalendar = ({appointment_date,setAppointmentDate}) => {

  const [date, setDate] = useState("__")

  const handleDateChange = (newValue) => {
    setAppointmentDate(newValue)
    setDate(dayjs(newValue).format("DD MMMM"))
  }
  
  return (
    <div className="calendar">
      <ThemeProvider theme={theme}>
        <div style={{display:"flex",justifyContent:"center", alignItems:"center"}}>
        <h3>{date}</h3>
        <DateCalendar
          value={appointment_date}
          defaultValue={appointment_date}
          onChange={(newValue) => handleDateChange(newValue)}
          orientation="landscape" 
          disablePast = {true}
          reduceAnimations ={true}
          
          />
        </div>
      </ThemeProvider>
    </div>
  );
};

export default BookCalendar;
