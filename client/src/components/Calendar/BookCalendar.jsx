/* eslint-disable react/prop-types */
import "./calendar.css";
import { DateCalendar } from "@mui/x-date-pickers";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    body1: {
      fontSize: "1.5rem",
    },
    // Define other typography variants as needed
  },
});

const BookCalendar = ({appointment_date,setAppointmentDate}) => {
  
  return (
    <div className="calendar">
      <ThemeProvider theme={theme}>
        <DateCalendar
          value={appointment_date}
          onChange={(newValue) => setAppointmentDate(newValue)}
        />
      </ThemeProvider>
    </div>
  );
};

export default BookCalendar;
