import { useState } from "react";

export const useGetLessonPic = (lessonID) => {
  const [response, setResponse] = useState({});

  const option = {
    method: "GET",
    credentials: "include",
  };
  console.log(`lessonID: ${lessonID}, type: ${typeof lessonID}`);

  const fetchData = async () => {
    try {
      let res = await fetch(
        `${process.env.REACT_APP_API_ADDR}/v1/cosm/picture?lesson=${lessonID}`,
        option
      );
      const data = await res.blob();
      let imgObjectURL = URL.createObjectURL(data);
      setResponse(imgObjectURL);
      console.log(`getImage: ${response}`);
    } catch (error) {
      console.log(error);
    }
  };
  return [response, fetchData];
};
