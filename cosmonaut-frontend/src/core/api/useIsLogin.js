import { useState } from "react";

export const useIsLogin = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [username, setUsername] = useState("");

  const opt = {
    method: "GET",
    credentials: "include",
  };

  const fetchData = async () => {
    try {
      let res = await fetch(
        `${process.env.REACT_APP_API_ADDR}/auth/check`,
        opt
      );
      const data = await res.json();
      const onLogin = data.isLogin;
      const name = data.info.username;

      setUsername(name);
      setIsLogin(onLogin);
    } catch (error) {
      console.log(error);
    }
  };

  return [isLogin, username, fetchData];
};
