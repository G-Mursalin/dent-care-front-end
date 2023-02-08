import React from "react";
import quot from "./../../../assets/icons/quote.svg";
import people1 from "./../../../assets/images/people1.png";
import people2 from "./../../../assets/images/people2.png";
import people3 from "./../../../assets/images/people3.png";
import TestimonialCard from "./TestimonialCard";

const Testimonial = () => {
  const testInfos = [
    {
      name: "Winson Harry",
      img: people1,
      address: "California",
      description:
        "All of the experience was amazing. Nice people and great work! I will remember this forever and I will be happy with my new teeth for the rest of my life!",
    },
    {
      name: "Winson Harry",
      img: people2,
      address: "California",
      description:
        "I almost didn't have any teeth left. These ones are all white, original and I can again eat, drink anything. I don't know what to say but they are just so perfect, so beautiful.Everybody was so nice and helped me out a lot. I would never have believed that I could get teeth like these. It's been the best thing in my life… my ticket to Croatia!",
    },
    {
      name: "Winson Harry",
      img: people3,
      address: "California",
      description:
        "The doctor was very knowledgeable and did a very good job explaining my options. The staff was the most friendly and courteous I have experienced in a long time!",
    },
  ];
  return (
    <section className="md:px-16 px-5 mt-20">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-bold text-secondary">Testimonial</h3>
          <h1 className="text-3xl text-accent">What Our Patients Says</h1>
        </div>
        <div>
          <img className="md:w-36 w-32" src={quot} alt="quot" />
        </div>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-col-1 gap-8 mt-6">
        {testInfos.map((info, i) => (
          <TestimonialCard key={i} info={info} />
        ))}
      </div>
    </section>
  );
};

export default Testimonial;
