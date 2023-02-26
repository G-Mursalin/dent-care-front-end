import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useQuery } from "react-query";
import ConfirmationModal from "../Shared/ConfirmationModal/ConfirmationModal";
import ErrorMessage from "../Shared/ErrorMessage/ErrorMessage";
import Loading from "../Shared/Loading/Loading";

const AllAppointments = () => {
  const [deletingBooking, setDeletingBooking] = useState(null);

  // Get Data From Backend
  const {
    isLoading,
    data: bookingsGroup,
    refetch,
  } = useQuery(["bookingGroup"], () =>
    fetch(
      "https://dent-care.onrender.com/api/v1/bookings/bookings-group-date",
      {
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    ).then((res) => res.json())
  );

  // Handle Errors and Loading
  if (isLoading) return <Loading />;
  if (bookingsGroup.status === "fail")
    return <ErrorMessage message={bookingsGroup.message} />;
  if (bookingsGroup.status === "error")
    return <ErrorMessage message={bookingsGroup.message} />;

  //   Handle Close Modal
  const handleCloseModal = () => {
    setDeletingBooking(null);
  };

  //   Handle Delete Booking
  const handleDeleteBooking = (data) => {
    // Send Data to Backend
    fetch(`https://dent-care.onrender.com/api/v1/bookings/${data._id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "fail") {
          toast.error(data.message);
        } else if (data.status === "error") {
          toast.error(data.message);
        } else {
          toast.success(data.status);
          refetch();
        }
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <section>
      <h2 className="my-3 text-2xl px-3">All Appointments</h2>
      {bookingsGroup.data.bookings.map((val, i) => (
        <div key={i} className="overflow-x-auto mb-5 px-5 mt-5">
          <table className="table w-full">
            <thead>
              <tr>
                <th>{val._id}</th>
                <th>Name</th>
                <th>Time</th>
                <th>Treatment</th>
                <th>Price</th>
                <th>Paid</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {val.bookingOnThisDay.map((val, i) => (
                <tr className="hover" key={val._id}>
                  <th>{i + 1}</th>
                  <td>{val.patientName}</td>
                  <td>{val.slot}</td>
                  <td>{val.serviceName}</td>
                  <td>{val.servicePrice}</td>
                  <td>{val.paid ? <span>Yes</span> : <span>No</span>}</td>
                  <td>
                    <label
                      onClick={() => setDeletingBooking(val)}
                      htmlFor="confirm-modal"
                      className="btn btn-xs btn-error"
                    >
                      Delete
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
      {deletingBooking && (
        <ConfirmationModal
          title="Are You Sure ?"
          message={`Patient Name: ${deletingBooking.patientName}\nTreatment Name: ${deletingBooking.serviceName}, data can't be recover!!`}
          handleCloseModal={handleCloseModal}
          modalData={deletingBooking}
          successAction={handleDeleteBooking}
        />
      )}
    </section>
  );
};

export default AllAppointments;
