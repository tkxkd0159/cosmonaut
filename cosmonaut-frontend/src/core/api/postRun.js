import { useState } from "react";
import { useParams } from "react-router-dom";

export const useRunApi = (files) => {
  const { lessonID, chID } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [executeRes, setExecuteRes] = useState("");
  const [queryRes, setQueryRes] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  let option = {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      lesson: Number(lessonID),
      chapter: Number(chID),
      files: files,
    }),
  };
  console.log("api_body_files", files);

  const fetchData = async () => {
    setIsError(false);
    setIsLoading(true);
    setIsSuccess(false);
    try {
      let res = await fetch(
        `${process.env.REACT_APP_API_ADDR}/v1/cosm/build`,
        option
      );
      console.log("api_option", option);
      console.log("api_response", res);
      let data = await res.json();
      console.log("api_data", data);

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
  };

  return [executeRes, queryRes, isLoading, isSuccess, isError, fetchData];
};
