// React
import { useEffect, useState } from "react";

const useToken = (email) => {
  const [token, setToken] = useState("");

  useEffect(() => {
    if (email) {
      fetch(`https://dent-care.onrender.com/api/v1/users/jwt?email=${email}`, {
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          localStorage.setItem("accessToken", data.accessToken);
          setToken(data.accessToken);
        });
    }
  }, [email]);

  return [token];
};

export default useToken;
