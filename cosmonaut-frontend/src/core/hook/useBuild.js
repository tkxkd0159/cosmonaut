import { useCallback, useState } from "react";

export const useBuild = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [executeRes, setExecuteRes] = useState({});
  const [queryRes, setQueryRes] = useState({});

  const postBuild = useCallback(async (lessonID, chID, files) => {
    setIsError(false);
    setIsLoading(true);
    setIsSuccess(false);

    let option = {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lesson: lessonID,
        chapter: chID,
        files: files,
      }),
    };

    try {
      let res = await fetch(
        `${process.env.REACT_APP_API_ADDR}/v1/cosm/build`,
        option
      );
      let data = await res.json();

      if (res.status === 200) {
        setIsSuccess(true);
      } else if (res.status === 400) {
        alert("Try Again!");
      } else if (res.status === 500) {
        setIsError(true);
        setExecuteRes([data.message]);
      }

      setExecuteRes(data.result[0]);
      setQueryRes(data.result[1]);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { postBuild, isSuccess, isError, isLoading, executeRes, queryRes };
};
