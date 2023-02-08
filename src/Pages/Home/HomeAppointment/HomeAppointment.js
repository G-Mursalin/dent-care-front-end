import React from "react";
import doctor from "./../../../assets/images/doctor-small.png";
import appointment from "./../../../assets/images/appointment.png";
import PrimaryButton from "../../Shared/Buttons/PrimaryButton";

const HomeAppointment = () => {
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
          modern technologies. Book your appointment today. We are professionals
          in dental hygiene and teeth whitening. Our goal is to provide superior
          services in the field of teeth whitening and dental hygiene, which
          include an individual approach, customer education, and various
          benefits that customers can use. We perform professional dental
          hygiene and gentle teeth whitening without hydrogen peroxide in our
          modern premises, using the most modern methods and technologies in our
          work.
        </p>
        <PrimaryButton>Get Started</PrimaryButton>
      </div>
    </section>
  );
};

export default HomeAppointment;
