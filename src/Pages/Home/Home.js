import React from "react";
import Banner from "./Banner/Banner";
import HomeServices from "./HomeServices/HomeServices";
import Info from "./Info/Info";

const Home = () => {
  return (
    <React.Fragment>
      <Banner />
      <Info />
      <HomeServices />
    </React.Fragment>
  );
};

export default Home;
