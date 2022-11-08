import { useState } from "react";

export const usePostInitial = (lessonID, chID, build) => {
  const [response, setResponse] = useState();
  const [isLoading, setIsLoading] = useState(false);

  let option = {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      lesson: Number(lessonID),
      chapter: Number(chID),
      needBuild: build,
    }),
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      let res = await fetch(
        `${process.env.REACT_APP_API_ADDR}/v1/cosm/init`,
        option
      );
      setResponse(res);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return [isLoading, response, fetchData];
};
