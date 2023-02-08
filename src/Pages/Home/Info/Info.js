import React from "react";
import clock from "./../../../assets/icons/clock.svg";
import marker from "./../../../assets/icons/marker.svg";
import phone from "./../../../assets/icons/phone.svg";

const Info = () => {
  const infoData = [
    {
      id: 1,
      img: clock,
      title: "Opening Hours",
      description: "10:00 AM - 5:30 PM",
      bgColor: "bg-gradient-to-r from-secondary to-primary",
    },
    {
      id: 2,
      img: marker,
      title: "Visit our location",
      description: "Brooklyn, NY 10036, United States",
      bgColor: "bg-accent",
    },
    {
      id: 3,
      img: phone,
      title: "Contact us now",
      description: "+000 123 456789",
      bgColor: "bg-gradient-to-r from-secondary to-primary",
    },
  ];

  return (
    <section className="grid lg:grid-cols-3 md:grid-cols-2 grid-col-1 gap-8 md:px-16 px-5 mt-20">
      {infoData.map((info) => (
        <div
          key={info.id}
          className={`card lg:card-side bg-base-100 shadow-xl lg:px-8 lg:py-0 py-8 ${info.bgColor}`}
        >
          <figure>
            <img src={info.img} alt="title" />
          </figure>
          <div className="card-body text-white">
            <h2 className="card-title">{info.title}</h2>
            <p>{info.description}</p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Info;
