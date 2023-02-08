import React from "react";
import PrimaryButton from "../../Shared/Buttons/PrimaryButton";
import treatment from "./../../../assets/images/treatment.png";

const ServicesBanner = () => {
  return (
    <section className="hero min-h-screen md:px-16 px-5 mt-20">
      <div className="flex justify-center items-center flex-col lg:flex-row">
        <img
          src={treatment}
          alt="treatment"
          className="md:max-w-md w-sm rounded-lg shadow-2xl"
        />
        <div className="lg:ml-14 ml-0 mt-8">
          <h1 className="text-5xl font-bold">
            Exceptional Dental Care, on Your Terms
          </h1>
          <p className="py-6">
            We are professionals in dental hygiene and teeth whitening. Our goal
            is to provide superior services in the field of teeth whitening and
            dental hygiene, which include an individual approach, customer
            education, and various benefits that customers can use. We perform
            professional dental hygiene and gentle teeth whitening without
            hydrogen peroxide in our modern premises, using the most modern
            methods and technologies in our work.
          </p>
          <PrimaryButton>Get Started</PrimaryButton>
        </div>
      </div>
    </section>
  );
};

export default ServicesBanner;
