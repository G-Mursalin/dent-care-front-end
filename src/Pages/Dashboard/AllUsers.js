import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { useQuery } from "react-query";
import { AuthContext } from "../../Contexts/AuthProvider";
import ConfirmationModal from "../Shared/ConfirmationModal/ConfirmationModal";
import ErrorMessage from "../Shared/ErrorMessage/ErrorMessage";
import Loading from "../Shared/Loading/Loading";

const AllUsers = () => {
  const [deletingUser, setDeletingUser] = useState(null);
  const { user } = useContext(AuthContext);

  //   Handle Close Modal
  const handleCloseModal = () => {
    setDeletingUser(null);
  };

  //   Handle Delete Doctor
  const handleDeleteUser = (data) => {
    console.log(data._id);
    // Send Data to Backend
    fetch(`http://localhost:5000/api/v1/users/${data._id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "fail") {
          toast.error(data.message);
        } else if (data.status === "error") {
          toast.error(data.message);
        } else {
          toast.success(data.status);
          refetch();
        }
      })
      .catch((err) => toast.error(err.message));
  };

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
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.data.users.map((val, i) => (
              <tr className="hover" key={val._id}>
                <th>{i + 1}</th>
                <td>
                  {val.email}
                  {val.email === user.email && (
                    <span className="font-bold">(You)</span>
                  )}
                </td>
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
                  {val.email !== user.email && (
                    <label
                      onClick={() => setDeletingUser(val)}
                      htmlFor="confirm-modal"
                      className="btn btn-xs btn-error"
                    >
                      Delete
                    </label>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {deletingUser && (
        <ConfirmationModal
          title="Are You Sure ?"
          message={`If you delete ${deletingUser.email}, data can't be recover!!`}
          handleCloseModal={handleCloseModal}
          modalData={deletingUser}
          successAction={handleDeleteUser}
        />
      )}
    </section>
  );
};

export default AllUsers;
