import { useState, useEffect } from "react";

const useAdmin = () => {
  const [admin, setAdmin] = useState(false);
  const [adminIsLoading, setAdminIsLoading] = useState(true);
  useEffect(() => {
    fetch("https://dent-care.onrender.com/api/v1/users/admin", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setAdmin(data.isAdmin);
        setAdminIsLoading(false);
      });
  }, []);

  return [admin, adminIsLoading];
};

export default useAdmin;
