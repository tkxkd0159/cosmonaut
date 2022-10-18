import { useState } from "react";

export const useLogOut = () => {
  const option = {
    method: "GET",
    credentials: "include",
  };
  const [logout, setLogout] = useState(false);

  const fetchData = async () => {
    try {
      let res = await fetch(`${process.env.REACT_APP_API_ADDR}/auth/logout`, option);
      console.log(res);
      setLogout(res.ok);
    } catch (error) {
      console.log(error);
    }
  };

  return [logout, fetchData];
};
