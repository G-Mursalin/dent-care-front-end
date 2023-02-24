import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useLoaderData, useNavigation } from "react-router-dom";
import ErrorMessage from "../../Shared/ErrorMessage/ErrorMessage";
import Loading from "../../Shared/Loading/Loading";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const Payment = () => {
  const data = useLoaderData();
  const navigation = useNavigation();

  const {
    _id,
    serviceName,
    servicePrice,
    slot,
    appointmentDate,
    patientName,
    patientEmail,
    paid,
  } = data.data.bookings[0];

  // Handle Errors From Server and Loading
  if (navigation.status === "loading") return <Loading />;
  if (data.status === "fail") return <ErrorMessage message={data.message} />;
  if (data.status === "error") return <ErrorMessage message={data.message} />;

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
        <div className="card text-primary-content shadow-lg">
          <div className="card-body">
            <Elements stripe={stripePromise}>
              <CheckoutForm
                patientName={patientName}
                patientEmail={patientEmail}
                servicePrice={servicePrice}
                _id={_id}
                paid={paid}
              />
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
