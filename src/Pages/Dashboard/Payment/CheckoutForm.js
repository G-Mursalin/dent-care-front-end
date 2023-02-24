import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import ErrorMessage from "../../Shared/ErrorMessage/ErrorMessage";

const CheckoutForm = ({
  patientName,
  patientEmail,
  servicePrice,
  _id,
  paid,
}) => {
  const [cardError, setCardError] = useState("");
  const [success, setSuccess] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [bookingUpdate, setBookingUpdate] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/payment/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({ price: servicePrice }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
          setClientSecret(data);
        }
      });
  }, [servicePrice]);

  // Handle Errors From Backend
  if (clientSecret.status === "fail" || bookingUpdate.status === "fail")
    return <ErrorMessage message={clientSecret.message} />;
  if (clientSecret.status === "error" || bookingUpdate.status === "error")
    return <ErrorMessage message={clientSecret.message} />;

  // Form Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    if (!stripe || !elements || paid) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    setCardError(error?.message || "");
    setSuccess("");
    //confirm card payment
    const { paymentIntent, error: intentError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: patientName,
            email: patientEmail,
          },
        },
      });

    if (intentError) {
      setCardError(intentError?.message);
    } else {
      setCardError("");
      setTransactionId(paymentIntent.id);
      setSuccess("Congrats! your payment is completed.");
    }

    // Update Booking to database
    const payment = {
      transactionId: paymentIntent.id,
      paid: true,
    };

    fetch(`http://localhost:5000/api/v1/bookings/${_id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(payment),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "successfully paid") {
          toast.success(data.status);
        } else {
          setBookingUpdate(data);
        }

        setProcessing(false);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      {cardError && <p className="mt-3 text-red-500">{cardError}</p>}
      {success && (
        <p className="mt-3 text-green-500">
          {success}
          <span className="block font-bold">Your Transaction ID:</span>
          {transactionId}
        </p>
      )}

      {!paid && (
        <button
          className="btn btn-sm btn-primary mt-3"
          type="submit"
          disabled={!stripe || !clientSecret || success || processing}
        >
          Pay
        </button>
      )}
      {paid && <p className="mt-3">You already pay for this service</p>}
    </form>
  );
};

export default CheckoutForm;
