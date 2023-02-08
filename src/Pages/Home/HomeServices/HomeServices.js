import React from "react";
import fluoride from "./../../../assets/images/fluoride.png";
import cavity from "./../../../assets/images/cavity.png";
import whitening from "./../../../assets/images/whitening.png";
import HomeServicesCard from "./HomeServicesCard";

const HomeServices = () => {
  const servicesInfo = [
    {
      img: fluoride,
      title: "Fluoride Treatment",
      description:
        "Fluoride varnish is a dental treatment that can help prevent tooth decay, slow it down, or stop it from getting worse",
    },
    {
      img: cavity,
      title: "Cavity Filling",
      description:
        "Cavity Filling is to treat a cavity your dentist will remove the decayed portion of the tooth and then 'fill' the area on the tooth where the decayed material was removed",
    },
    {
      img: whitening,
      title: "Teeth Whitening",
      description:
        "Teeth whitening involves bleaching your teeth to make them lighter. It can't make your teeth brilliant white, but it can lighten the existing colour by several shades.",
    },
  ];
  return (
    <section className="mt-32 md:px-16 px-5">
      <div className="text-center">
        <h3 className="font-bold uppercase text-secondary">Our Services</h3>
        <h1 className="text-3xl text-accent">Services We Provide</h1>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 mt-16">
        {servicesInfo.map((serviceInfo, i) => (
          <HomeServicesCard key={i} serviceInfo={serviceInfo} />
        ))}
      </div>
    </section>
  );
};

export default HomeServices;
