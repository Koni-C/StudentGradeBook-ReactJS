import React, { useState, useCallback } from "react";
import { CourseType, StatusType } from "../../../common/type";
import { apiRequest } from "../../../common/api/apiRequest";

const useCourse = () => {
  const [fetchStatus, setFetchStatus] = useState<StatusType>("idle");
  const [fetchData, setFetchData] = useState([] as CourseType[]);

  const [updateStatus, setUpdateStatus] = useState<StatusType>("idle");

  const fetchCourse = async () => {
    try {
      setFetchStatus("pending");
      const data = await apiRequest<CourseType[]>(
        "http://127.0.0.1:8000/api/course/",
        "GET"
      );
      setFetchData(data);
      setFetchStatus("success");
    } catch {
      setFetchStatus("failure");
    }
  };

  const updateCourse = async (newCourse: any) => {
    try {
      setUpdateStatus("pending");
      await apiRequest("http://127.0.0.1:8000/api/course/", "POST", newCourse);

      setUpdateStatus("success");
    } catch {
      setUpdateStatus("failure");
    }
  };

  return {
    updateCourse,
    fetchCourse,
    fetchStatus,
    fetchData,
    updateStatus,
  };
};

export default useCourse;
