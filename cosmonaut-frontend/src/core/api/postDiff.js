import { useState } from "react";
import { useParams } from "react-router-dom";

export const useDiffApi = (isLast) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [response, setResponse] = useState({});
  const { lessonID, chID, uID } = useParams();

  const option = {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      lesson: Number(lessonID),
      chapter: Number(chID),
      subchapter: Number(uID),
      isLast: isLast,
    }),
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      let res = await fetch(
        `${process.env.REACT_APP_API_ADDR}/v1/cosm/diff`,
        option
      );
      const data = await res.json();

      let resResult = Object.fromEntries(
        Object.entries(data).map(([key, value]) => [key, window.atob(value)])
      );

      setResponse(resResult);
      setIsSuccess(true);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return [response, isLoading, isSuccess, fetchData];
};
