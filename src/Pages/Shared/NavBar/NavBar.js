import React, { Fragment, useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Contexts/AuthProvider";

const NavBar = () => {
  const [showNavItems, setShowNavItems] = useState(false);
  const { user, userLogOut, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  // Handle Logout
  const handleLogOut = () => {
    userLogOut()
      .then(() => {
        toast.success("Successfully LogOut");
        navigate("/");
      })
      .catch((error) => {
        toast.error("Please Try Again");
      });
  };

  // Navbar Items
  const navItems = (
    <Fragment>
      <li>
        <Link to="/home">Home</Link>
      </li>
      <li>
        <Link to="/appointment">Appointment</Link>
      </li>
      <li>
        <Link to="/reviews">Reviews</Link>
      </li>
      <li>
        <Link to="/about-us">About Us</Link>
      </li>
      <li>
        <Link to="/contact-us">Contact Us</Link>
      </li>
      {user && (
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
      )}
      {!user && !loading && (
        <>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
        </>
      )}
    </Fragment>
  );

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div
          onClick={() => setShowNavItems((preState) => !preState)}
          className="dropdown"
        >
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          {showNavItems && (
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navItems}
            </ul>
          )}
        </div>
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          Dent Care
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navItems}</ul>
      </div>

      <div className="navbar-end">
        {/* If User Login Then Show It */}
        {user?.uid ? (
          <button onClick={handleLogOut} className="btn btn-sm btn-outline">
            Logout
          </button>
        ) : null}
      </div>
      <label
        tabIndex={0}
        role="button"
        htmlFor="dashboard-drawer"
        className="btn btn-ghost drawer-button lg:hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16"
          />
        </svg>
      </label>
    </div>
  );
};

export default NavBar;
