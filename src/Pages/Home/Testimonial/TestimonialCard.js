import React from "react";

const TestimonialCard = ({ info }) => {
  const { name, address, img, description } = info;
  return (
    <div className="card bg-base-100 shadow-2xl py-6">
      <div className="card-body">
        <p>{description}</p>
      </div>
      <div className="flex items-center px-8">
        <div className="avatar mr-6">
          <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src={img} alt={name} />
          </div>
        </div>
        <div>
          <h1>{name}</h1>
          <h3>{address}</h3>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
