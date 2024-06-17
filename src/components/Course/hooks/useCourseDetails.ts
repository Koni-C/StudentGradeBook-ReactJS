import React, { useState, useCallback } from "react";
import { CourseType, StatusType } from "../../../common/type";
import { apiRequest } from "../../../common/api/apiRequest";

const useCourseDetails = (CourseId: number) => {
  const [fetchStatus, setFetchStatus] = useState<StatusType>("idle");
  const [fetchData, setFetchData] = useState({} as CourseType);

  const [deleteStatus, setDeleteStatus] = useState<StatusType>("idle");
  const [putStatus, setPutStatus] = useState<StatusType>("idle");

  const fetchCourseDetail = async () => {
    try {
      setFetchStatus("pending");
      const data = await apiRequest<CourseType>(
        `http://127.0.0.1:8000/api/course_detail/${CourseId}/`,
        "GET"
      );
      setFetchData(data);
      setFetchStatus("success");
    } catch {
      setFetchStatus("failure");
    }
  };

  const putCourseDetail = useCallback(
    async (newCourseDetail: any) => {
      try {
        setPutStatus("pending");
        await apiRequest(
          `http://127.0.0.1:8000/api/course_detail/${CourseId}/`,
          "PUT",
          newCourseDetail
        );

        setPutStatus("success");
      } catch {
        setPutStatus("failure");
      }
    },
    [CourseId]
  );

  const deleteCourseDetail = useCallback(async () => {
    try {
      setDeleteStatus("pending");
      await apiRequest(
        `http://127.0.0.1:8000/api/course_detail/${CourseId}/`,
        "DELETE"
      );

      setDeleteStatus("success");
    } catch {
      setDeleteStatus("failure");
    }
  }, [CourseId]);

  return {
    deleteCourseDetail,
    putCourseDetail,
    fetchCourseDetail,
    fetchStatus,
    fetchData,
    putStatus,
    deleteStatus,
  };
};

export default useCourseDetails;
