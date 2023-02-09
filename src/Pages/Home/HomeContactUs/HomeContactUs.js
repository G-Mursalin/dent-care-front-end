import React from "react";
import PrimaryButton from "../../Shared/Buttons/PrimaryButton";
import appointment from "./../../../assets/images/appointment.png";

const HomeContactUs = () => {
  const handleHomeForm = (e) => {
    e.preventDefault();
  };

  return (
    <section
      className="flex justify-center items-center mt-36"
      style={{ backgroundImage: `url(${appointment})` }}
    >
      <form className="lg:w-1/3 sm:w-1/2 py-16 px-5" onSubmit={handleHomeForm}>
        <div className="text-center">
          <h3 className="font-bold text-secondary">Contact Us</h3>
          <h1 className="text-3xl text-white">Stay connected with us</h1>
        </div>
        <div className="space-y-3 mt-11">
          <input
            type="email"
            placeholder="Email"
            required
            className="input input-sm w-full "
          />
          <input
            type="text"
            placeholder="Subject"
            className="input input-sm w-full "
          />
          <textarea
            className="textarea textarea-bordered w-full h-32 max-h-40"
            placeholder="Your Message"
          ></textarea>
          <div className="text-center">
            <PrimaryButton>Submit</PrimaryButton>
          </div>
        </div>
      </form>
    </section>
  );
};

export default HomeContactUs;
