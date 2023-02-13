import { format } from "date-fns";
import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../../Contexts/AuthProvider";

const AppointmentBookingModal = ({
  setTreatment,
  treatment,
  date,
  refetch,
}) => {
  const { _id, name, slots, price } = treatment;
  const [isDateSelected, setIsDateSelected] = useState(true);
  const { user } = useContext(AuthContext);

  //   Handle User Bookings
  const handleBooking = (e) => {
    e.preventDefault();
    const date = e.target.date.value;
    const slot = e.target.slot.value;
    const userName = e.target.userName.value;
    const email = e.target.email.value;
    const phone = e.target.phone.value;
    if (!/\d/.test(date)) {
      setIsDateSelected(false);
      return;
    }

    const booking = {
      serviceId: _id,
      serviceName: name,
      servicePrice: price,
      appointmentDate: date,
      slot,
      patientName: userName,
      patientEmail: email,
      patientPhone: phone,
    };

    //  Sent Booking data to the server
    fetch("http://localhost:5000/api/v1/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "fail") {
          toast.error(data.message);
        } else {
          toast.success(data.status);
        }
        refetch();
        setTreatment(null);
      });
  };

  return (
    <div>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <label
            htmlFor="booking-modal"
            onClick={() => setIsDateSelected(true)}
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="font-bold text-lg mb-3 text-secondary">
            Appointment for {name}
          </h3>
          <form className="grid grid-cols-1 gap-3" onSubmit={handleBooking}>
            <input
              type="text"
              name="date"
              disabled
              value={date ? format(date, "PP") : "No date selected"}
              className="input input-bordered border-secondary w-full"
            />
            {!isDateSelected ? (
              <p className="text-red-600 text-sm ml-3 -mt-3">
                *Please select a date from calender
              </p>
            ) : (
              ""
            )}
            <input
              type="text"
              name="price"
              disabled
              value={`$${price}`}
              className="input input-bordered border-secondary w-full"
            />
            <select
              name="slot"
              className="select select-bordered border-secondary w-full"
            >
              {slots.map((slot, i) => (
                <option key={i} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
            <input
              type="text"
              required
              name="userName"
              placeholder="User Name"
              value={user?.displayName}
              disabled
              className="input input-bordered border-secondary w-full"
            />
            <input
              type="email"
              required
              name="email"
              placeholder="Email Address"
              value={user?.email}
              disabled
              className="input input-bordered border-secondary w-full"
            />
            <input
              type="text"
              required
              name="phone"
              placeholder="Phone Number"
              className="input input-bordered border-secondary w-full"
            />
            <input
              type="submit"
              value="submit"
              className="btn btn-secondary w-full"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default AppointmentBookingModal;
