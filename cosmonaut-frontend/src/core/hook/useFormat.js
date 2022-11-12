import { useState } from "react";

export const useFormat = (files) => {
  const [response, setResponse] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const option = {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ files }),
  };

  const fetchData = async () => {
    try {
      let res = await fetch(
        `${process.env.REACT_APP_API_ADDR}/v1/rust/fmt`,
        option
      );
      const data = await res.json();
      let resResult = await Object.fromEntries(
        Object.entries(data.result).map(([key, value]) => [
          key,
          window.atob(value),
        ])
      );

      setResponse(resResult);
      setIsSuccess(true);
    } catch (error) {
      alert(error);
    }
  };

  return [response, isSuccess, fetchData];
};
