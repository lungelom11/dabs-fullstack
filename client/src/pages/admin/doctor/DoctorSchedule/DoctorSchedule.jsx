import { Calendar,dayjsLocalizer } from 'react-big-calendar'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import "../doctor.css"

const DoctorSchedule = () => {
    dayjs.extend(timezone)
    const localizer = dayjsLocalizer(dayjs)

    const events = [
          {
            title: 'Consultation',
            start: dayjs.tz('11 Jul 2024 10 30 00', 'DD MMM YYYY HH mm ss', 'Africa/Johannesburg').toDate(), // July 10, 2024, 10:00 AM
            end: dayjs.tz('11 Jul 2024 11 00 00', 'DD MMM YYYY HH mm ss', 'Africa/Johannesburg').toDate(), // July 10, 2024, 12:00 PM
          },
    ]
    // const events = [
    //   {
    //     title: 'Board Meeting',
    //     start: dayjs.tz('10 Jul 2024 10 00 00', 'DD MMM YYYY HH mm ss', 'Africa/Johannesburg').toDate(), // July 10, 2024, 10:00 AM
    //     end: dayjs.tz('10 Jul 2024 12 00 00', 'DD MMM YYYY HH mm ss', 'Africa/Johannesburg').toDate(), // July 10, 2024, 12:00 PM
    //   },
    //   {
    //     title: 'Team Stand-up',
    //     start: dayjs.tz('11 Jul 2024 09 00 00', 'DD MMM YYYY HH mm ss', 'Africa/Johannesburg').toDate(), // July 11, 2024, 9:00 AM
    //     end: dayjs.tz('11 Jul 2024 09 30 00', 'DD MMM YYYY HH mm ss', 'Africa/Johannesburg').toDate(), // July 11, 2024, 9:30 AM
    //   },
    //   {
    //     title: 'Conference',
    //     start: dayjs.tz('12 Jul 2024 00 00 00', 'DD MMM YYYY HH mm ss', 'Africa/Johannesburg').startOf('day').toDate(), // All day event on July 12, 2024
    //     end: dayjs.tz('14 Jul 2024 23 59 59', 'DD MMM YYYY HH mm ss', 'Africa/Johannesburg').endOf('day').toDate(), // All day event ending on July 14, 2024
    //     allDay: true,
    //   },
    //   {
    //     title: 'Lunch with Sarah',
    //     start: dayjs.tz('13 Jul 2024 12 00 00', 'DD MMM YYYY HH mm ss', 'Africa/Johannesburg').toDate(), // July 13, 2024, 12:00 PM
    //     end: dayjs.tz('13 Jul 2024 13 00 00', 'DD MMM YYYY HH mm ss', 'Africa/Johannesburg').toDate(), // July 13, 2024, 1:00 PM
    //   }
    // ];

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