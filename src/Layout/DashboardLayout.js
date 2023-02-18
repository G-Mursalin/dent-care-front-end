import React from "react";
import { Link, Outlet } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
import Loading from "../Pages/Shared/Loading/Loading";
import NavBar from "../Pages/Shared/NavBar/NavBar";

const DashboardLayout = () => {
  const [admin, adminIsLoading] = useAdmin();

  if (adminIsLoading) {
    return <Loading />;
  }

  return (
    <main>
      <NavBar />
      <div className="drawer drawer-mobile">
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content">
          <Outlet />
        </div>
        <div className="drawer-side">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 text-base-content">
            <li>
              <Link to="/dashboard">My Appointments</Link>
            </li>
            {admin && (
              <li>
                <Link to="/dashboard/all-users">All Users</Link>
              </li>
            )}
            {admin && (
              <li>
                <Link to="/dashboard/add-doctor">Add Doctor</Link>
              </li>
            )}
            {admin && (
              <li>
                <Link to="/dashboard/all-doctors">All Doctors</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </main>
  );
};

export default DashboardLayout;
