import React from "react";
import { useLoaderData } from "react-router-dom";

const Payment = () => {
  const data = useLoaderData();
  const { serviceName, servicePrice, slot, appointmentDate, patientName } =
    data.data.bookings[0];

  return (
    <div>
      <h2 className="my-3 text-2xl text-accent font-bold">
        <span className="text-green-500">Pay For:</span> {serviceName}
      </h2>
      <div className="px-8 mt-6">
        <div className="card text-primary-content shadow-lg">
          <div className="card-body">
            <h2 className="card-title text-green-500 font-bold">
              Hello, {patientName}
            </h2>
            <p className="text-lg font-bold">
              Your appointment:&nbsp;
              <span className="text-red-500 font-bold">{appointmentDate}</span>
              &nbsp;at&nbsp;
              <span className="text-red-500 font-bold">{slot}</span>
            </p>
            <p className="text-lg font-bold">
              Please Pay:&nbsp;
              <span className="font-normal">${servicePrice}</span>
            </p>
            <p className="text-lg font-bold">
              Card Number:&nbsp;
              <span className="font-normal">4242 4242 4242 4242</span>
            </p>
            <p className="text-lg font-bold">
              MM/YY:&nbsp;
              <span className="font-normal">Any Future Month and Year</span>
            </p>
            <p className="text-lg font-bold">
              CVC:&nbsp;<span className="font-normal">Any 3 Digits</span>{" "}
            </p>
            <p className="text-lg font-bold">
              ZIP:&nbsp;<span className="font-normal">Any 5 Digits</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
