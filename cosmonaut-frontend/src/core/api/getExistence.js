import { useState } from "react";

export const useGetExistence = (lessonID, chID) => {
  const [response, setResponse] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const option = {
    method: "GET",
    credentials: "include",
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      let res = await fetch(
        `${process.env.REACT_APP_API_ADDR}/v1/cosm/existence?lesson=${lessonID}&chapter=${chID}`,
        option
      );
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };
  return [isLoading, response, fetchData];
};
