import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../Layout/DashboardLayout";
import Main from "../../Layout/Main";
import AboutUs from "../../Pages/AboutUs/AboutUs";
import Appointment from "../../Pages/Appointment/Appointment";
import Login from "../../Pages/Authentication/Login/Login";
import { Signup } from "../../Pages/Authentication/Signup/Signup";
import ContactUs from "../../Pages/ContactUs/ContactUs";
import AddDoctor from "../../Pages/Dashboard/AddDoctor";
import AllDoctors from "../../Pages/Dashboard/AllDoctors";
import AllUsers from "../../Pages/Dashboard/AllUsers";
import MyAppointments from "../../Pages/Dashboard/MyAppointments";
import Payment from "../../Pages/Dashboard/Payment/Payment";
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
      {
        path: "/login",
        element: <Login />,
      },
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
      {
        path: "/dashboard/add-doctor",
        element: (
          <AdminRoute>
            <AddDoctor />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/all-doctors",
        element: (
          <AdminRoute>
            <AllDoctors />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/payment/:id",
        element: (
          <AdminRoute>
            <Payment />
          </AdminRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/api/v1/bookings?_id=${params.id}`, {
            headers: {
              "Content-type": "application/json",
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }),
      },
    ],
  },

  {
    path: "*",
    element: <PageNotFound />,
  },
]);
