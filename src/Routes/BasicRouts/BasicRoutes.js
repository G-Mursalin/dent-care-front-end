import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../Layout/DashboardLayout";
import Main from "../../Layout/Main";
import AboutUs from "../../Pages/AboutUs/AboutUs";
import Appointment from "../../Pages/Appointment/Appointment";
import Login from "../../Pages/Authentication/Login/Login";
import { Signup } from "../../Pages/Authentication/Signup/Signup";
import ContactUs from "../../Pages/ContactUs/ContactUs";
import AllUsers from "../../Pages/Dashboard/AllUsers";
import MyAppointments from "../../Pages/Dashboard/MyAppointments";
import Home from "../../Pages/Home/Home";
import Reviews from "../../Pages/Reviews/Reviews";
import PageNotFound from "../../Pages/Shared/PageNotFound/PageNotFound";
import AdminRoute from "../PrivateRoute/AdminRoute";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/home", element: <Home /> },
      {
        path: "/appointment",
        element: (
          <PrivateRoute>
            <Appointment />
          </PrivateRoute>
        ),
      },
      { path: "/reviews", element: <Reviews /> },
      { path: "/about-us", element: <AboutUs /> },
      { path: "/contact-us", element: <ContactUs /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: <MyAppointments />,
      },
      {
        path: "/dashboard/all-users",
        element: (
          <AdminRoute>
            <AllUsers />
          </AdminRoute>
        ),
      },
    ],
  },

  {
    path: "*",
    element: <PageNotFound />,
  },
]);
