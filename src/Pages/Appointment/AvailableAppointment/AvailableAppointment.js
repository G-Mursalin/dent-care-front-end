import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import AppointmentBookingModal from "../AppointmentBookingModal/AppointmentBookingModal";
import AppointmentOptions from "../AppointmentOptions/AppointmentOptions";

const AvailableAppointment = ({ onSelectedDate }) => {
  const [treatment, setTreatment] = useState(null);
  const [appointmentOptions, setAppointmentOptions] = useState([]);
  let formattedDate = "";
  if (onSelectedDate) {
    formattedDate = format(onSelectedDate, "PP");
  }

  //   Fetch Appointment Options
  useEffect(() => {
    fetch("appointmentOptions.json")
      .then((res) => res.json())
      .then((data) => setAppointmentOptions(data));
  }, []);

  return (
    <section className="md:px-16 px-5 mb-32">
      <h3 className="font-bold text-secondary text-center lg:mb-24 mb-14">
        {onSelectedDate ? (
          <span>Available Services on {format(onSelectedDate, "PP")}</span>
        ) : (
          <span className="text-red-600">NO DATE SELECTED!!</span>
        )}
      </h3>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-col-1 gap-8">
        {appointmentOptions.map((service, i) => (
          <AppointmentOptions
            key={i}
            service={service}
            onSetTreatment={setTreatment}
          />
        ))}
      </div>
      {treatment && (
        <AppointmentBookingModal
          setTreatment={setTreatment}
          treatment={treatment}
          date={onSelectedDate}
        />
      )}
    </section>
  );
};

export default AvailableAppointment;
