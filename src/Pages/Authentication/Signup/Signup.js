import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export const Signup = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmitForm = (data) => {
    console.log(data);
  };
  return (
    <div className="flex h-screen justify-center items-center mb-10 md:mt-10 mt-4 md:px-16 px-5">
      <div className="card w-[500px] bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title mx-auto">SignUp</h2>
          <form onSubmit={handleSubmit(onSubmitForm)}>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">User Name</span>
              </label>
              <input
                type="text"
                placeholder="Your Name"
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
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">
                  Profile Photo (PNG, JPG or JPEG)
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
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Your Email"
                className="input input-bordered w-full"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email is required",
                  },
                  pattern: {
                    value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
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
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Password must be 6 characters or longer"
                className="input input-bordered w-full"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is required",
                  },
                  minLength: {
                    value: 6,
                    message: "Password must be more than 6 character",
                  },
                })}
              />
              <label className="label">
                {errors.password?.type === "required" && (
                  <span className="label-text-alt text-red-500">
                    {errors.password.message}
                  </span>
                )}
                {errors.password?.type === "minLength" && (
                  <span className="label-text-alt text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </label>
            </div>
            <input
              type="submit"
              value="SIGNUP"
              className="btn text-white bg-accent border-0 py-2 px-6 w-full focus:outline-none cursor-pointer rounded-lg text-lg"
            />
          </form>
          <p className="text-center">
            Already have an account?
            <Link to="/login" className="text-secondary">
              &nbsp;LogIn
            </Link>
          </p>
          <div className="divider">OR</div>
          <button className="btn btn-outline btn-accent uppercase">
            Continue with google
          </button>
        </div>
      </div>
    </div>
  );
};
