import "./calendar.css";
import { DateCalendar } from "@mui/x-date-pickers";
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

const BookCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs("11 July 2024"));
  return (
    <div className="calendar">
      <ThemeProvider theme={theme}>
        <DateCalendar
          value={selectedDate}
          onChange={(newValue) => setSelectedDate(newValue)}
        />
      </ThemeProvider>
    </div>
  );
};

export default BookCalendar;
