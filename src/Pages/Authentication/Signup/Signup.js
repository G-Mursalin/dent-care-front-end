import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Contexts/AuthProvider";
import useToken from "../../../Hooks/useToken";
import uploadImageToImbbAndGetLink from "../../../utils/uploadImageToImbbAndGetLink";
import GoogleSignUp from "../SocialSignUp/GoogleSignUp";

export const Signup = () => {
  const { createUser, userUpdateProfile, verifyEmail } =
    useContext(AuthContext);
  const [error, setError] = useState("");
  const [createdUserEmail, setCreatedUserEmail] = useState("");
  const [token] = useToken(createdUserEmail);
  const [wait, setWait] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  if (token) {
    navigate("/");
  }

  // SignUp Handler
  const onSubmitForm = async (data) => {
    setWait(true);
    // Upload Image to Imbb and Get Link
    const photoURL = await uploadImageToImbbAndGetLink(data.photo[0]);

    // Create User Via firebase
    createUser(data.email, data.password)
      .then((userCredential) => {
        setError("");
        handleUpdateUserProfile(data.name, photoURL, data.email);
        handleEmailVerification();
        toast.success(
          "Successfully created your account. A verification link sends to your email. Please verify your email. (Check the spam folder if it's not in the inbox)"
        );
        setWait(false);
      })
      .catch((error) => {
        setWait(false);
        setError(error.message);
      });
  };

  // Save User To Backend Database
  const saveUserToDatabase = (email) => {
    fetch("http://localhost:5000/api/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setCreatedUserEmail(email);
        }
      })
      .catch((err) => {
        toast.error("Error");
      });
  };

  // Handle Update User Profile
  const handleUpdateUserProfile = (displayName, photoURL, email) => {
    userUpdateProfile({ displayName, photoURL })
      .then(() => {
        saveUserToDatabase(email);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  // Handle Email Verification
  const handleEmailVerification = () => {
    verifyEmail()
      .then(() => {})
      .catch((error) => {
        toast.error(error.message);
      });
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
            {error ? <span className="text-red-600">{error}</span> : null}
            <button
              type="submit"
              className="btn text-white mt-2 bg-accent border-0 py-2 px-6 w-full focus:outline-none cursor-pointer rounded-lg text-lg"
            >
              {wait ? "Please Wait..." : "Signup"}
            </button>
          </form>
          <p className="text-center">
            Already have an account?
            <Link to="/login" className="text-secondary">
              &nbsp;LogIn
            </Link>
          </p>
          <div className="divider">OR</div>
          <GoogleSignUp />
        </div>
      </div>
    </div>
  );
};
