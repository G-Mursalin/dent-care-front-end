import React, { useContext } from "react";
import { AuthContext } from "../../../Contexts/AuthProvider";
import { GoogleAuthProvider } from "firebase/auth";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

const provider = new GoogleAuthProvider();

const GoogleSignUp = () => {
  const { providerLogin } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const handleGoogleSignUp = () => {
    providerLogin(provider)
      .then((result) => {
        toast.success("Successfully Login");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <button
      onClick={handleGoogleSignUp}
      className="btn btn-outline btn-accent uppercase"
    >
      Continue with google
    </button>
  );
};

export default GoogleSignUp;
