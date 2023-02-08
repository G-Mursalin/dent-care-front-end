import React from "react";
import doctor from "./../../../assets/images/doctor-small.png";
import appointment from "./../../../assets/images/appointment.png";
import PrimaryButton from "../../Shared/Buttons/PrimaryButton";
import { useNavigate } from "react-router-dom";

const HomeAppointment = () => {
  const navigate = useNavigate();

  return (
    <section
      className="flex justify-center items-center flex-col lg:flex-row mt-40"
      style={{
        backgroundImage: `url(${appointment})`,
      }}
    >
      <div className="flex-1 mt-[-100px]">
        <img src={doctor} alt="doctor" />
      </div>
      <div className="flex-1 space-y-4 md:px-16 px-5 mt-4 py-8">
        <h3 className="font-bold text-secondary">Appointment</h3>
        <h1 className="text-3xl text-white font-bold">
          Make an appointment Today
        </h1>
        <p className="text-white">
          Our goal is to provide each customer with above-standard services with
          an individual approach. We work in modern premises with the most
          modern technologies. Book your appointment today.
        </p>
        <div onClick={() => navigate("/appointment")}>
          <PrimaryButton>Get Started</PrimaryButton>
        </div>
      </div>
    </section>
  );
};

export default HomeAppointment;
