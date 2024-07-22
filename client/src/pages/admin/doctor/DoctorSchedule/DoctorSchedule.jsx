import { Calendar,dayjsLocalizer } from 'react-big-calendar'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import "../doctor.css"
import { useEffect, useState } from 'react'
import axios from "axios"
import "./schedule.css"

const DoctorSchedule = () => {
    dayjs.extend(timezone)
    const localizer = dayjsLocalizer(dayjs)
    const [scheduledAppointments, setScheduledAppointments] = useState([]);


    //Fetching all Scheduled Appointments
    useEffect(() =>{
        const fetchScheduledAppointments = async () => {
          const url = "http://127.0.0.1:8000/appointments/?status=Scheduled"
          try {
            const response = await axios.get(url)
            if(response.status == 200){
              setScheduledAppointments(response.data)
            } else{
              console.log("Error fetching data")
            }

          } catch (error) {
            console.log(error)
          }

        }

        fetchScheduledAppointments()
    }, [])

    console.log(scheduledAppointments)

    const events = [
      {
        title: 'Consultation',
        start: dayjs.tz('11 Jul 2024 10 30 00', 'DD MMM YYYY HH mm ss', 'Africa/Johannesburg').toDate(), // July 10, 2024, 10:00 AM
        end: dayjs.tz('11 Jul 2024 11 00 00', 'DD MMM YYYY HH mm ss', 'Africa/Johannesburg').toDate(), // July 10, 2024, 12:00 PM
      },
]

  return (
    <>
      <div className="schedule-container">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
      />
    </div>
    </>
  )
}

export default DoctorSchedule