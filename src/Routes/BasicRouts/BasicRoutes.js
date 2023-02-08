import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main";
import AboutUs from "../../Pages/AboutUs/AboutUs";
import Appointment from "../../Pages/Appointment/Appointment";
import Login from "../../Pages/Authentication/Login/Login";
import { Signup } from "../../Pages/Authentication/Signup/Signup";
import ContactUs from "../../Pages/ContactUs/ContactUs";
import Home from "../../Pages/Home/Home";
import Reviews from "../../Pages/Reviews/Reviews";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/home", element: <Home /> },
      { path: "/appointment", element: <Appointment /> },
      { path: "/reviews", element: <Reviews /> },
      { path: "/about-us", element: <AboutUs /> },
      { path: "/contact-us", element: <ContactUs /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
    ],
  },
]);