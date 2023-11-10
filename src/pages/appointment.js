import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import SMNavbar from '../config/components/SMNavbar';

export default function Appointment() {


  const appointments = useSelector((a) => a.Appointment)


  const data = appointments.items;
  const minHour = appointments.min_hour;
  const maxHour = appointments.max_hour;


  // method to convert hours into array form according to the max and min hours
  let isAM = true;
  const hoursArray = Array.from({ length: maxHour - minHour + 1 }, (_, index) => {
    const hour = (index + minHour) % 12 || 12; // Convert to 12-hour format
    if (hour === 12) { isAM = false };
    const period = isAM ? 'AM' : 'PM';
    return `${hour} ${period}`;
  });


  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <>
      <SMNavbar />


      <div style={{ overflowX: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: "35px", marginBottom: "35px" }}>
        <table style={{ minWidth: '75%', maxWidth: '100%' }}>
          <thead>
            <tr>
              <th></th>
              <th>Monday</th>
              <th>Tuesday</th>
              <th>Wednesday</th>
              <th>Thursday</th>
              <th>Friday</th>
              <th>Saturday</th>
              <th>Sunday</th>
            </tr>
          </thead>

          <tbody>
            {hoursArray?.map((hour, index) => {
              return (
                <tr key={index}>
                  <th>{hour}</th>
                  {daysOfWeek?.map((day, dayIndex) => {
                    return (
                      <td key={dayIndex}>
                        {data != null ? data.map((appointment, dataIndex) => (
                          (appointment.weekDay === day && appointment.startTimeFormatted === `${hour}`) ? <div key={dataIndex} style={{ height: '10px', backgroundColor: "lightblue", fontSize: "12px", zIndex: `${dayIndex}+1`, padding: '5px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>{appointment.name}</div> : null
                        )) : ""}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

    </>
  )
}
