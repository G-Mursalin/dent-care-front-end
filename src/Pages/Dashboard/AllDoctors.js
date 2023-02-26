import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useQuery } from "react-query";
import ConfirmationModal from "../Shared/ConfirmationModal/ConfirmationModal";
import ErrorMessage from "../Shared/ErrorMessage/ErrorMessage";
import Loading from "../Shared/Loading/Loading";

const AllDoctors = () => {
  const [deletingDoctor, setDeletingDoctor] = useState(null);

  // Get Doctors Data From Backend
  const {
    isLoading,
    data: doctors,
    refetch,
  } = useQuery(["doctors"], () =>
    fetch("https://dent-care.onrender.com/api/v1/doctors", {
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );

  //   Handle Close Modal
  const handleCloseModal = () => {
    setDeletingDoctor(null);
  };

  //   Handle Delete Doctor
  const handleDeleteDoctor = (data) => {
    // Send Data to Backend
    fetch(`https://dent-care.onrender.com/api/v1/doctors/${data._id}`, {
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

  // Handle Errors and Loading
  if (isLoading) return <Loading />;
  if (doctors.status === "fail")
    return <ErrorMessage message={doctors.message} />;
  if (doctors.status === "error")
    return <ErrorMessage message={doctors.message} />;

  return (
    <section>
      <h2 className="my-3 text-2xl px-3">Total Doctors: {doctors.results} </h2>
      <div className="overflow-x-auto px-5 mt-5">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Image</th>
              <th>Name</th>
              <th>Specialty</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {doctors.data.doctors.map((val, i) => (
              <tr className="hover" key={val._id}>
                <th>{i + 1}</th>
                <td>
                  <div className="avatar">
                    <div className="w-12 h-12 rounded-full">
                      <img src={val.imgUrl} alt={val.name} />
                    </div>
                  </div>
                </td>
                <td>{val.name}</td>
                <td>{val.specialty}</td>
                <td>{val.email} </td>
                <td>
                  <label
                    onClick={() => setDeletingDoctor(val)}
                    htmlFor="confirm-modal"
                    className="btn btn-xs btn-error"
                  >
                    Delete
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {deletingDoctor && (
        <ConfirmationModal
          title="Are You Sure ?"
          message={`If you delete ${deletingDoctor.name}, data can't be recover!!`}
          handleCloseModal={handleCloseModal}
          modalData={deletingDoctor}
          successAction={handleDeleteDoctor}
        />
      )}
    </section>
  );
};

export default AllDoctors;
