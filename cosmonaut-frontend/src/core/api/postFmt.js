import { useState } from "react";

export const useFmtApi = (files, tab) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [response, setResponse] = useState("");

  const option = {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ files }),
  };

  const fetchData = async () => {
    setIsError(false);
    setIsLoading(true);

    try {
      let res = await fetch(
        `${process.env.REACT_APP_API_ADDR}/v1/rust/fmt`,
        option
      );
      const data = await res.json();
      let resResult = await Object.fromEntries(
        Object.entries(data.result).map(([key, value]) => [key, atob(value)])
      );

      setResponse(resResult);
      setIsSuccess(true);
    } catch (error) {
      alert(error);
      setIsError(true);
    }

    setIsLoading(false);
  };

  return [response, isLoading, isSuccess, isError, fetchData];
};
