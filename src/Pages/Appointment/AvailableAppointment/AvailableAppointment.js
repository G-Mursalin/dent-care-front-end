import { format } from "date-fns";
import React, { useState } from "react";
import { useQuery } from "react-query";
import ErrorMessage from "../../Shared/ErrorMessage/ErrorMessage";
import Loading from "../../Shared/Loading/Loading";
import AppointmentBookingModal from "../AppointmentBookingModal/AppointmentBookingModal";
import AppointmentOptions from "../AppointmentOptions/AppointmentOptions";

const AvailableAppointment = ({ onSelectedDate }) => {
  const [treatment, setTreatment] = useState(null);
  let formattedDate = "";
  if (onSelectedDate) {
    formattedDate = format(onSelectedDate, "PP");
  }

  // Get Data From Backend
  const {
    isLoading,
    data: services,
    refetch,
  } = useQuery(["services", formattedDate], () =>
    fetch(
      `https://dent-care.onrender.com/api/v1/services?date=${formattedDate}`,
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    ).then((res) => res.json())
  );

  // Handle Errors and Loading
  if (isLoading) return <Loading />;
  if (services.status === "fail")
    return <ErrorMessage message={services.message} />;
  if (services.status === "error")
    return <ErrorMessage message={services.message} />;

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
        {services.data.services.map((service, i) => (
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
          refetch={refetch}
          date={onSelectedDate}
        />
      )}
    </section>
  );
};

export default AvailableAppointment;
