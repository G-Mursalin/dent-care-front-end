import React, { useContext } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthProvider";
import ErrorMessage from "../Shared/ErrorMessage/ErrorMessage";
import Loading from "../Shared/Loading/Loading";

const MyAppointments = () => {
  const { user } = useContext(AuthContext);

  // Get Data From Backend
  const { isLoading, data: appointments } = useQuery(
    ["appointments", user?.email],
    () =>
      fetch(
        `http://localhost:5000/api/v1/bookings?patientEmail=${user?.email}`,
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
  if (appointments.status === "fail")
    return <ErrorMessage message={appointments.message} />;
  if (appointments.status === "error")
    return <ErrorMessage message={appointments.message} />;

  return (
    <section>
      <h2 className="my-3 text-2xl px-3">
        My Total Appointment: {appointments.results}
      </h2>
      <div className="overflow-x-auto px-5 mt-5">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Treatment</th>
              <th>Price</th>
              <th>Action</th>
              <th>Transaction ID</th>
            </tr>
          </thead>
          <tbody>
            {appointments.data.bookings.map((val, i) => (
              <tr className="hover" key={val._id}>
                <th>{i + 1}</th>
                <td>{val.patientName}</td>
                <td>{val.appointmentDate}</td>
                <td>{val.slot}</td>
                <td>{val.serviceName}</td>
                <td>{val.servicePrice}</td>
                <td>
                  {val.servicePrice && !val.paid && (
                    <Link to={`/dashboard/payment/${val._id}`}>
                      <button className="btn btn-xs btn-primary">Pay</button>
                    </Link>
                  )}
                  {val.servicePrice && val.paid && (
                    <span className="text-success">Paid</span>
                  )}
                </td>
                <td>
                  {val.servicePrice && val.paid && val.transactionId && (
                    <span>{val.transactionId}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default MyAppointments;
