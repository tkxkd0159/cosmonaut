import { useCallback, useState } from "react";

export const useTargetCode = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [example, setExample] = useState({});

  const getTargetCode = useCallback(async (lessonID, chID) => {
    const option = {
      method: "GET",
      credential: "include",
    };
    if (lessonID == null || chID == null) {
      return;
    }

    try {
      let res = await fetch(
        `${process.env.REACT_APP_API_ADDR}/v1/cosm/code?lesson=${lessonID}&chapter=${chID}`,
        option
      );
      let data = await res.json();
      let result = Object.fromEntries(
        Object.entries(data).map(([key, value]) => [key, window.atob(value)])
      );
      setExample(result);
    } catch (err) {
      console.err(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return [getTargetCode, example, isLoading];
};
