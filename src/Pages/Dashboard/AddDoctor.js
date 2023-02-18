import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import ErrorMessage from "../Shared/ErrorMessage/ErrorMessage";
import Loading from "../Shared/Loading/Loading";

const AddDoctor = () => {
  const [wait, setWait] = useState(false);
  const [error, setError] = useState("");
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  // Get services-name From Backend
  const { isLoading, data: servicesName } = useQuery(["servicesName"], () =>
    fetch("http://localhost:5000/api/v1/services/name").then((res) =>
      res.json()
    )
  );

  // Handle Errors and Loading
  if (isLoading) return <Loading />;
  if (servicesName.status === "fail")
    return <ErrorMessage message={servicesName.message} />;
  if (servicesName.status === "error")
    return <ErrorMessage message={servicesName.message} />;

  // Form Handler
  const onSubmitForm = async (data) => {
    console.log(data);
  };

  return (
    <section>
      <h2 className="my-3 text-2xl">Add Doctor</h2>
      <div className="flex mb-10 md:mt-10 mt-4 md:px-16 px-5">
        <div className="card w-[500px] bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title mx-auto">SignUp</h2>
            <form onSubmit={handleSubmit(onSubmitForm)}>
              {/* Name */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Doctor Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Doctor Name"
                  className="input input-bordered w-full"
                  {...register("name", {
                    required: {
                      value: true,
                      message: "Name is required",
                    },
                  })}
                />
                <label className="label">
                  {errors.name?.type === "required" && (
                    <span className="label-text-alt text-red-500">
                      {errors.name.message}
                    </span>
                  )}
                </label>
              </div>
              {/* Email */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Doctor Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Doctor Email"
                  className="input input-bordered w-full"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Email is required",
                    },
                    pattern: {
                      value:
                        /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/,
                      message: "Provide a valid email",
                    },
                  })}
                />
                <label className="label">
                  {errors.email?.type === "required" && (
                    <span className="label-text-alt text-red-500">
                      {errors.email.message}
                    </span>
                  )}
                  {errors.email?.type === "pattern" && (
                    <span className="label-text-alt text-red-500">
                      {errors.email.message}
                    </span>
                  )}
                </label>
              </div>
              {/* Specialty */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Doctor Specialty</span>
                </label>
                <select
                  className="input input-bordered w-full"
                  {...register("specialty", {
                    required: {
                      value: true,
                      message: "Please Select Specialty",
                    },
                  })}
                >
                  {servicesName.data.servicesName.map((val) => (
                    <option key={val._id} value={val.name}>
                      {val.name}
                    </option>
                  ))}
                </select>
                <label className="label">
                  {errors.email?.type === "required" && (
                    <span className="label-text-alt text-red-500">
                      {errors.email.message}
                    </span>
                  )}
                  {errors.email?.type === "pattern" && (
                    <span className="label-text-alt text-red-500">
                      {errors.email.message}
                    </span>
                  )}
                </label>
              </div>
              {/* Image */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">
                    Doctor Photo (PNG, JPG or JPEG)
                  </span>
                </label>
                <input
                  type="file"
                  placeholder="Select Your Profile Picture"
                  className="file-input file-input-bordered w-full"
                  {...register("photo", {
                    required: {
                      value: true,
                      message: "User image is required.",
                    },
                    validate: {
                      acceptedFormats: (files) =>
                        ["image/jpeg", "image/png"].includes(files[0]?.type) ||
                        "Only PNG, JPG or JPEG Accepted",
                    },
                  })}
                />
                <label className="label">
                  {errors.photo?.type === "required" && (
                    <span className="label-text-alt text-red-500">
                      {errors.photo?.message}
                    </span>
                  )}
                  {errors.photo?.type === "acceptedFormats" && (
                    <span className="label-text-alt text-red-500">
                      {errors.photo?.message}
                    </span>
                  )}
                </label>
              </div>

              {error ? <span className="text-red-600">{error}</span> : null}
              <button
                type="submit"
                className="btn text-white mt-2 bg-accent border-0 py-2 px-6 w-full focus:outline-none cursor-pointer rounded-lg text-lg"
              >
                {wait ? "Please Wait..." : "Add"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddDoctor;
