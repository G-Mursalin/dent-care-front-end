import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Contexts/AuthProvider";

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { userLogin, setUser, setLoading } = useContext(AuthContext);
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const onSubmitForm = (data) => {
    // Firebase Login
    userLogin(data.email, data.password)
      .then((userCredential) => {
        setError("");
        toast.success("Successfully Login");
        setUser(userCredential?.user);
        navigate(from, { replace: true });
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex h-screen justify-center items-center  md:mt-0 mt-4 md:px-16 px-5">
      <div className="card w-[500px] bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title mx-auto">Login</h2>
          <form onSubmit={handleSubmit(onSubmitForm)}>
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
                placeholder="Your Password"
                className="input input-bordered w-full"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is required",
                  },
                })}
              />
              <label className="label">
                {errors.password?.type === "required" && (
                  <span className="label-text-alt text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </label>
            </div>
            {error ? <span className="text-red-600">{error}</span> : null}
            <input
              type="submit"
              value="LOGIN"
              className="btn text-white bg-accent mt-2 border-0 py-2 px-6 w-full focus:outline-none cursor-pointer rounded-lg text-lg"
            />
          </form>
          <p className="text-center">
            New to Dent Care?
            <Link to="/signup" className="text-secondary">
              &nbsp; Create New Account
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

export default Login;
