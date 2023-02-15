import React from "react";
import { toast } from "react-hot-toast";
import { useQuery } from "react-query";
import ErrorMessage from "../Shared/ErrorMessage/ErrorMessage";
import Loading from "../Shared/Loading/Loading";

const AllUsers = () => {
  // Get Data From Backend
  const {
    isLoading,
    data: users,
    refetch,
  } = useQuery(["users"], () =>
    fetch("http://localhost:5000/api/v1/users", {
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );

  // Handle Errors and Loading
  if (isLoading) return <Loading />;
  if (users.status === "fail") return <ErrorMessage message={users.message} />;
  if (users.status === "error") return <ErrorMessage message={users.message} />;

  const handleMakeAdmin = (id) => {
    console.log(id);
    fetch(`http://localhost:5000/api/v1/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        toast.success(data.status);
        refetch();
      });
  };

  return (
    <section>
      <h2 className="my-3 text-2xl">Total Users: {users.results}</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Admin</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.data.users.map((val, i) => (
              <tr className="hover" key={val._id}>
                <th>{i + 1}</th>
                <td>{val.name}</td>
                <td>{val.email}</td>
                <td>{val.role}</td>
                <td>
                  {val.role !== "admin" && (
                    <button
                      onClick={() => handleMakeAdmin(val._id)}
                      className="btn btn-xs btn-primary"
                    >
                      Make Admin
                    </button>
                  )}
                </td>
                <td>
                  <button className="btn btn-xs">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AllUsers;
