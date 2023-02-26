import React, { useContext, useState } from "react";
import { AuthContext } from "../../../Contexts/AuthProvider";
import { GoogleAuthProvider } from "firebase/auth";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import useToken from "../../../Hooks/useToken";

const provider = new GoogleAuthProvider();

const GoogleSignUp = () => {
  const { providerLogin } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [createdUserEmail, setCreatedUserEmail] = useState("");
  const [token] = useToken(createdUserEmail);
  const from = location.state?.from?.pathname || "/";

  if (token) {
    navigate(from, { replace: true });
  }

  const handleGoogleSignUp = () => {
    providerLogin(provider)
      .then((result) => {
        toast.success("Successfully Login");
        saveUserToDatabase(result.user.email);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  // Save User To Backend Database
  const saveUserToDatabase = (email) => {
    fetch("https://dent-care.onrender.com/api/v1/users", {
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
