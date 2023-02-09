import React from "react";
import { DayPicker } from "react-day-picker";
import chair from "./../../../assets/images/chair.png";
import "react-day-picker/dist/style.css";

const AppointmentBanner = ({ onSelectedDate, onSetSelectedDate }) => {
  return (
    <section className="min-h-screen flex justify-center items-center md:px-16 px-5 lg:mb-0 mb-24">
      <div className="flex justify-evenly items-center flex-col-reverse lg:flex-row w-full">
        <div className="mt-5">
          <DayPicker
            mode="single"
            selected={onSelectedDate}
            onSelect={onSetSelectedDate}
          />
        </div>
        <img
          src={chair}
          alt="chair"
          className="md:max-w-2xl w-sm rounded-lg shadow-2xl"
        />
      </div>
    </section>
  );
};

export default AppointmentBanner;
