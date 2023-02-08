import React from "react";
import PrimaryButton from "../../Shared/Buttons/PrimaryButton";
import chair from "./../../../assets/images/chair.png";
import bg from "./../../../assets/images/bg.png";

const Banner = () => {
  return (
    <section
      className="hero min-h-screen md:px-16 px-5"
      style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover" }}
    >
      <div className="flex justify-center items-center flex-col lg:flex-row-reverse">
        <img
          src={chair}
          alt="chair"
          className="md:max-w-2xl w-sm rounded-lg shadow-2xl"
        />
        <div className="mr-0 lg:mr-8 lg:mt-0 mt-8">
          <h1 className="text-5xl font-bold">Your New Smile Starts Here</h1>
          <p className="py-6">
            Our goal is to provide each customer with above-standard services
            with an individual approach. We work in modern premises with the
            most modern technologies. Book your appointment today
          </p>
          <PrimaryButton>Get Started</PrimaryButton>
        </div>
      </div>
    </section>
  );
};

export default Banner;
