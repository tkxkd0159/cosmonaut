import { useState } from "react";
import { useParams } from "react-router-dom";

export const useCodeEx = () => {
  const { lessonID, chID } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [response, setResponse] = useState({});
  const option = {
    method: "GET",
    credentials: "include",
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      let res = await fetch(
        `${process.env.REACT_APP_API_ADDR}/v1/cosm/code?lesson=${lessonID}&chapter=${chID}`,
        option
      );
      const data = await res.json();
      let resResult = Object.fromEntries(
        Object.entries(data).map(([key, value]) => [key, window.atob(value)])
      );
      setResponse(resResult);
    } catch (error) {}
    setIsLoading(false);
  };

  return [response, isLoading, fetchData];
};
