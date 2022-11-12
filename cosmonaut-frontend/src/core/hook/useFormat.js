import { useState } from "react";

export const useFormat = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [response, setResponse] = useState("");

  const postFormat = async (files) => {
    const option = {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ files }),
    };

    try {
      let res = await fetch(
        `${process.env.REACT_APP_API_ADDR}/v1/rust/fmt`,
        option
      );
      const data = await res.json();
      let responseResult = await Object.fromEntries(
        Object.entries(data.result).map(([key, value]) => [
          key,
          window.atob(value),
        ])
      );

      setResponse(responseResult);
      setIsSuccess(true);
    } catch (err) {
      alert(err);
    } finally {
      setIsLoading(false);
    }
  };

  console.log("format response", response);
  console.log("format loading", isLoading);
  return [response, isLoading, isSuccess, postFormat];
};
