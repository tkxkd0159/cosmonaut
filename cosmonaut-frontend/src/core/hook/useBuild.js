// import { useCallback, useState } from "react";

// export const useBuild = () => {
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [isError, setIsError] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [executeRes, setExecuteRes] = useState({});
//   const [queryRes, setQueryRes] = useState({});

//   const postBuild = useCallback(async (lessonID, chID, files) => {
//     setIsError(false);
//     setIsLoading(true);
//     setIsSuccess(false);

//     const option = {
//       method: "POST",
//       credentials: "include",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         lesson: lessonID,
//         chapter: chID,
//         files: files,
//       }),
//     };

//     try {
//       let res = await fetch(
//         `${process.env.REACT_APP_API_ADDR}/v1/cosm/build`,
//         option
//       );
//       let data = await res.json();

//       if (res.status === 200) {
//         setIsSuccess(true);
//       } else if (res.status === 400) {
//         alert("Try Again!");
//       } else if (res.status === 500) {
//         setIsError(true);
//         setExecuteRes([data.message]);
//       }

//       setExecuteRes(data.result[0]);
//       setQueryRes(data.result[1]);
//     } catch (error) {
//       setIsError(true);
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   return { postBuild, isSuccess, isError, isLoading, executeRes, queryRes };
// };

import { useState } from "react";
// import { useParams } from "react-router-dom";

export const useBuild = () => {
  // const { lessonID, chID } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [executeRes, setExecuteRes] = useState("");
  const [queryRes, setQueryRes] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const fetchData = async (lessonID, chID, files) => {
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

    setIsError(false);
    setIsLoading(true);
    setIsSuccess(false);
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
  };

  return { fetchData, isSuccess, isError, isLoading, executeRes, queryRes };
};
