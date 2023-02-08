import React from "react";
import Banner from "./Banner/Banner";
import HomeAppointment from "./HomeAppointment/HomeAppointment";
import HomeServices from "./HomeServices/HomeServices";
import Info from "./Info/Info";
import ServicesBanner from "./ServicesBanner/ServicesBanner";
import Testimonial from "./Testimonial/Testimonial";

const Home = () => {
  return (
    <React.Fragment>
      <Banner />
      <Info />
      <HomeServices />
      <ServicesBanner />
      <HomeAppointment />
      <Testimonial />
    </React.Fragment>
  );
};

export default Home;
