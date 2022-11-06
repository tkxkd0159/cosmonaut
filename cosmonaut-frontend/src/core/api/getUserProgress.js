import { useState } from "react";

export const useGetUserProgress = (lessonID) => {
  const [response, setResponse] = useState(-1);
  const [isLoading, setLoading] = useState(true);
  const option = {
    method: "GET",
    credentials: "include",
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      let res = await fetch(
        `${process.env.REACT_APP_API_ADDR}/v1/cosm/progress?lesson=${lessonID}`,
        option
      );
      const data = await res.json();
      setResponse(data.chapter);
      console.log(`userProgress API: ${response}`);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  return [isLoading, response, fetchData];
};
