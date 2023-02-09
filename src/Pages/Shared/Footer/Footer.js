import React from "react";
import { Link } from "react-router-dom";
import footer from "./../../../assets/images/footer.png";

const Footer = () => {
  return (
    <footer
      className="p-10 md:px-16 px-5"
      style={{
        backgroundImage: `url(${footer})`,
        backgroundSize: "cover",
        backgroundPositionY: "-180px",
      }}
    >
      <div className="footer">
        <div>
          <span className="footer-title">Services</span>
          <Link to="/" className="link link-hover">
            Emergency Checkup
          </Link>
          <Link to="/" className="link link-hover">
            Monthly Checkup
          </Link>
          <Link to="/" className="link link-hover">
            Weekly Checkup
          </Link>
          <Link to="/" className="link link-hover">
            Deep Checkup
          </Link>
        </div>
        <div>
          <span className="footer-title">ORAL HEALTH</span>
          <Link to="/" className="link link-hover">
            Fluoride Treatment
          </Link>
          <Link to="/" className="link link-hover">
            Cavity Filling
          </Link>
          <Link to="/" className="link link-hover">
            Teath Whitening
          </Link>
        </div>
        <div>
          <span className="footer-title">OUR ADDRESS</span>
          <p>Brooklyn, NY 10036, United States</p>
        </div>
      </div>
      <div className="text-center mt-20">
        <p>Copyright &copy; {new Date().getFullYear()} - All right reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
