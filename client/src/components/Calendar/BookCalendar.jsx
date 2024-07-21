/* eslint-disable react/prop-types */
import "./calendar.css";
import { DateCalendar } from "@mui/x-date-pickers";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
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
  const [displayDate, setDisplayDate] = useState("__");

  useEffect(() => {
    setDisplayDate(dayjs(appointment_date).format("DD MMM"))
  
  }, [appointment_date])

  return (
    <div className="calendar">
      <ThemeProvider theme={theme}>
      <div style={{display:"flex", justifyContent:"center", alignItems:"center",gap:"15px"}}
      >
      <h3>{displayDate}</h3>
        <DateCalendar
          value={appointment_date}
          onChange={(newValue) => setAppointmentDate(newValue)}
          disablePast={true}
        />
      </div>
      </ThemeProvider>
    </div>
  );
};

export default BookCalendar;
