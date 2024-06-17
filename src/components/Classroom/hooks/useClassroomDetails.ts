import React, { useState, useCallback } from "react";
import { ClassroomType, StatusType } from "../../../common/type";
import { apiRequest } from "../../../common/api/apiRequest";

const useClassroomDetails = (ClassroomId: number) => {
  const [fetchStatus, setFetchStatus] = useState<StatusType>("idle");
  const [fetchData, setFetchData] = useState({} as ClassroomType);

  const [deleteStatus, setDeleteStatus] = useState<StatusType>("idle");
  const [putStatus, setPutStatus] = useState<StatusType>("idle");

  const fetchClassroomDetail = async () => {
    try {
      setFetchStatus("pending");
      const data = await apiRequest<ClassroomType>(
        `http://127.0.0.1:8000/api/classroom_detail/${ClassroomId}/`,
        "GET"
      );
      setFetchData(data);
      setFetchStatus("success");
    } catch {
      setFetchStatus("failure");
    }
  };

  const putClassroomDetail = useCallback(
    async (newClassroomDetail: any) => {
      try {
        setPutStatus("pending");
        await apiRequest(
          `http://127.0.0.1:8000/api/classroom_detail/${ClassroomId}/`,
          "PUT",
          newClassroomDetail
        );

        setPutStatus("success");
      } catch {
        setPutStatus("failure");
      }
    },
    [ClassroomId]
  );

  const deleteClassroomDetail = useCallback(async () => {
    try {
      setDeleteStatus("pending");
      await apiRequest(
        `http://127.0.0.1:8000/api/classroom_detail/${ClassroomId}/`,
        "DELETE"
      );

      setDeleteStatus("success");
    } catch {
      setDeleteStatus("failure");
    }
  }, [ClassroomId]);

  return {
    deleteClassroomDetail,
    putClassroomDetail,
    fetchClassroomDetail,
    fetchStatus,
    fetchData,
    putStatus,
    deleteStatus,
  };
};

export default useClassroomDetails;
