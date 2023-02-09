import React, { useState, Fragment } from "react";
import AppointmentBanner from "./AppointmentBanner/AppointmentBanner";
import AvailableAppointment from "./AvailableAppointment/AvailableAppointment";

const Appointment = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  return (
    <Fragment>
      <AppointmentBanner
        onSelectedDate={selectedDate}
        onSetSelectedDate={setSelectedDate}
      />
      <AvailableAppointment onSelectedDate={selectedDate} />
    </Fragment>
  );
};

export default Appointment;
